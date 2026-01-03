
import React, { useState } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { MicOff, PhoneCall, AlertCircle, Snowflake, Cpu, Zap, Loader2, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({});
  
  const handleLeadUpdate = (details: Partial<LeadDetails>) => {
    setLeadDetails(prev => ({ ...prev, ...details }));
  };

  const { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting,
    isSpeaking, 
    volume, 
    error,
    micSensitivity,
    setMicSensitivity,
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 font-sans selection:bg-sky-500/30 overflow-hidden relative">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,transparent_70%)] opacity-20" />
      
      {/* High-Contrast Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/5 bg-[#05070a]/80 backdrop-blur-xl px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
           <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)]">
              <Snowflake className="w-7 h-7 text-white" />
           </div>
           <div>
              <h1 className="text-xl font-black tracking-tight text-white uppercase italic leading-none">
                  Toronto Air <span className="text-sky-400">Systems</span>
              </h1>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1 block">Voice Dispatch Command</span>
           </div>
        </div>

        <div className="flex items-center gap-8">
           {isConnected && (
             <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Link Active</span>
             </div>
           )}
           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-xs transition-all shadow-xl active:scale-95 border-2 ${
                  isConnected 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' 
                  : isConnecting
                    ? 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-sky-500 border-sky-400 text-white hover:bg-sky-400'
              }`}
           >
              {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : isConnected ? <MicOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
              {isConnecting ? 'CONNECTING...' : isConnected ? 'END SESSION' : 'START DISPATCH'}
           </button>
        </div>
      </header>

      <main className="pt-24 h-screen flex relative z-10">
        
        {/* Error Notification */}
        {error && (
            <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 bg-rose-500 border border-rose-400 text-white px-8 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in zoom-in">
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold text-sm uppercase">{error}</span>
            </div>
        )}

        {/* Column 1: The Core Experience */}
        <section className="flex-1 flex flex-col border-r border-white/5 overflow-hidden">
            
            {/* Visualizer Section */}
            <div className="h-2/5 relative flex items-center justify-center bg-gradient-to-b from-sky-500/[0.02] to-transparent">
                <div className="absolute top-8 left-12 flex items-center gap-3 opacity-40">
                    <Cpu className="w-4 h-4 text-sky-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Neural Pulse</span>
                </div>
                <div className="w-full h-full max-w-lg">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                </div>
            </div>

            {/* Transcript Section */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/20">
                <div className="px-12 py-6 border-b border-white/5 flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Live Audio Feed</h2>
                </div>
                <div className="flex-1 overflow-hidden">
                    <Transcript messages={messages} />
                </div>
            </div>
        </section>

        {/* Column 2: Lead Intelligence */}
        <aside className="w-[450px] flex flex-col bg-black/40">
            <InfoPanel lead={leadDetails} isConnected={isConnected} />
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
      `}</style>
    </div>
  );
};

export default App;
