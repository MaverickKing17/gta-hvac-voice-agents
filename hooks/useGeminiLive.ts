
import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SYSTEM_INSTRUCTION, CAPTURE_LEAD_TOOL } from '../constants';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer } from '../utils/audioUtils';
import { LeadDetails, Message } from '../types';

interface UseGeminiLiveProps {
  onLeadCaptured: (details: Partial<LeadDetails>) => void;
}

export const useGeminiLive = ({ onLeadCaptured }: UseGeminiLiveProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [micSensitivity, setMicSensitivity] = useState(0.8);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const micSensitivityRef = useRef(micSensitivity);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  
  // Transcription buffers
  const currentInputTranscriptRef = useRef('');
  const currentOutputTranscriptRef = useRef('');

  useEffect(() => {
    micSensitivityRef.current = micSensitivity;
  }, [micSensitivity]);

  const addMessage = useCallback((role: 'user' | 'agent' | 'system', text: string) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      role,
      text,
      timestamp: new Date()
    }]);
  }, []);

  const connect = useCallback(async () => {
    try {
      setError(null);
      setIsConnecting(true);
      
      if (!process.env.API_KEY) {
        throw new Error("API Key is missing in the environment.");
      }

      // Initialize or Resume Audio Contexts
      if (!inputAudioContextRef.current) {
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      if (!outputAudioContextRef.current) {
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      await inputAudioContextRef.current.resume();
      await outputAudioContextRef.current.resume();

      if (outputAudioContextRef.current && !outputNodeRef.current) {
          outputNodeRef.current = outputAudioContextRef.current.createGain();
          outputNodeRef.current.connect(outputAudioContextRef.current.destination);
          analyzerRef.current = outputAudioContextRef.current.createAnalyser();
          analyzerRef.current.fftSize = 256;
          outputNodeRef.current.connect(analyzerRef.current);
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {}, 
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [CAPTURE_LEAD_TOOL] }],
        },
        callbacks: {
          onopen: async () => {
            setIsConnected(true);
            setIsConnecting(false);
            addMessage('system', 'Neural uplink established. Marcus is online.');
            
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ 
                  audio: { 
                      echoCancellation: true,
                      noiseSuppression: true,
                      autoGainControl: true
                  } 
              });
              
              if (inputAudioContextRef.current) {
                  const source = inputAudioContextRef.current.createMediaStreamSource(stream);
                  const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                  
                  processor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    let sum = 0;
                    for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
                    const rms = Math.sqrt(sum / inputData.length);
                    const threshold = (1 - micSensitivityRef.current) * 0.05;

                    if (rms < threshold) inputData.fill(0);

                    const pcmBlob = createPcmBlob(inputData);
                    sessionPromiseRef.current?.then((session) => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                  };
                  
                  source.connect(processor);
                  processor.connect(inputAudioContextRef.current.destination);
                  
                  inputSourceRef.current = source;
                  processorRef.current = processor;
              }
            } catch (err) {
                setError("Microphone access denied. Please allow microphone permissions for the demo.");
                setIsConnected(false);
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcription (User & Agent)
            if (message.serverContent?.inputTranscription) {
              currentInputTranscriptRef.current += message.serverContent.inputTranscription.text;
            }
            if (message.serverContent?.outputTranscription) {
              currentOutputTranscriptRef.current += message.serverContent.outputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              if (currentInputTranscriptRef.current) {
                addMessage('user', currentInputTranscriptRef.current);
                currentInputTranscriptRef.current = '';
              }
              if (currentOutputTranscriptRef.current) {
                addMessage('agent', currentOutputTranscriptRef.current);
                currentOutputTranscriptRef.current = '';
              }
            }

            // Handle Tool Calls
            if (message.toolCall) {
                for (const fc of message.toolCall.functionCalls) {
                    if (fc.name === 'captureLeadDetails') {
                        onLeadCaptured(fc.args as unknown as Partial<LeadDetails>);
                        addMessage('system', `AI Analysis: Updated lead parameters detected.`);
                        sessionPromiseRef.current?.then((session) => {
                             session.sendToolResponse({
                                functionResponses: {
                                    id: fc.id,
                                    name: fc.name,
                                    response: { result: "Success" }
                                }
                             });
                        });
                    }
                }
            }

            // Handle Audio
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
                setIsSpeaking(true);
                const audioData = new Uint8Array(base64ToArrayBuffer(base64Audio));
                const audioBuffer = await decodeAudioData(audioData, outputAudioContextRef.current, 24000);
                
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
                const source = outputAudioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current);
                source.addEventListener('ended', () => {
                    activeSourcesRef.current.delete(source);
                    if (activeSourcesRef.current.size === 0) setIsSpeaking(false);
                });
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                activeSourcesRef.current.add(source);
            }

            // Interruption
            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              activeSourcesRef.current.clear();
              setIsSpeaking(false);
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            setIsConnected(false);
            setIsConnecting(false);
            addMessage('system', 'Neural link closed.');
          },
          onerror: (err) => {
            console.error('Gemini Live Error:', err);
            setError(`Link Failure: ${err.message}`);
            setIsConnecting(false);
            setIsConnected(false);
          }
        }
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (err: any) {
      console.error('Connection Exception:', err);
      setError(err.message);
      setIsConnecting(false);
      setIsConnected(false);
    }
  }, [onLeadCaptured, addMessage]);

  const disconnect = useCallback(async () => {
    if (sessionPromiseRef.current) {
        const session = await sessionPromiseRef.current;
        session.close();
    }
    inputSourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    activeSourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    activeSourcesRef.current.clear();
    setIsConnected(false);
    setIsSpeaking(false);
    setIsConnecting(false);
    sessionPromiseRef.current = null;
  }, []);

  useEffect(() => {
    let animationFrame: number;
    const updateVolume = () => {
        if (analyzerRef.current && isSpeaking) {
            const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
            analyzerRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            setVolume(sum / dataArray.length);
        } else if (!isSpeaking) {
            setVolume(0);
        }
        animationFrame = requestAnimationFrame(updateVolume);
    };
    updateVolume();
    return () => cancelAnimationFrame(animationFrame);
  }, [isSpeaking]);

  return { connect, disconnect, isConnected, isConnecting, isSpeaking, volume, error, micSensitivity, setMicSensitivity, messages };
};
