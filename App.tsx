
import React, { useState } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { DashboardCharts } from './components/DashboardCharts';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { MicOff, PhoneCall, AlertCircle, Snowflake, Activity, Sliders, Cpu, History, Zap, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-sky-500/30 overflow-hidden relative">
      
      {/* 2026 Architectural Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/20 via-transparent to-indigo-950/20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* Ultra-Premium Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-50">
        <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-10 h-24 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] group transition-transform hover:scale-105">
                <Snowflake className="w-8 h-8 text-white" />
             </div>
             <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none flex items-center gap-3">
                    Toronto Air <span className="text-sky-400">Systems</span>
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                   <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-sky-500/10 rounded-md border border-sky-500/20">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.1em]">Marcus Core Neural v2.6</span>
                   </div>
                   <div className="w-1 h-1 rounded-full bg-slate-700" />
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enterprise Dispatch</span>
                </div>
             </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
             <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2 text-emerald-400">
                    <Zap className="w-3.5 h-3.5 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">System Optimal</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 tracking-tighter">LATENCY: 42ms • UPTIME: 99.9%</span>
             </div>
             <div className="h-10 w-px bg-white/10" />
             <button 
                disabled={isConnecting}
                onClick={() => isConnected ? disconnect() : connect()}
                className={`group flex items-center gap-4 px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all shadow-xl active:scale-95 border-2 ${
                    isConnected 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' 
                    : isConnecting
                      ? 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-sky-500 border-sky-400 text-white hover:bg-sky-400 hover:shadow-sky-500/30'
                }`}
             >
                {isConnecting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isConnected ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                )}
                {isConnecting ? 'CONNECTING...' : isConnected ? 'TERMINATE LINK' : 'ESTABLISH LINK'}
             </button>
          </div>
        </div>
      </header>

      <main className="pt-36 pb-8 px-8 max-w-[1800px] mx-auto h-screen flex flex-col gap-8 relative z-10">
        
        {error && (
            <div className="absolute top-36 left-1/2 -translate-x-1/2 z-50 bg-rose-500/20 border border-rose-500/50 text-rose-100 px-10 py-4 rounded-3xl backdrop-blur-2xl flex items-center gap-4 shadow-3xl animate-in zoom-in slide-in-from-top-6">
                <AlertCircle className="w-6 h-6 text-rose-400" />
                <span className="font-black text-sm tracking-tight uppercase">Security Alert: {error}</span>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
            
            {/* LEFT COLUMN: INTERFACE HUB */}
            <div className="lg:col-span-8 flex flex-col gap-8 h-full">
                
                {/* Visualizer Bento (Sentient Field) */}
                <div className="relative flex-[1.6] bg-[#0f172a]/40 border border-white/5 rounded-[3.5rem] overflow-hidden shadow-3xl backdrop-blur-md group">
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-500/[0.03] to-transparent pointer-events-none" />
                    
                    <div className="absolute top-10 left-12 z-20">
                       <div className="flex items-center gap-3 mb-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-sky-400 animate-pulse shadow-[0_0_10px_#0ea5e9]' : 'bg-slate-700'}`} />
                          <span className="text-xs font-black text-sky-500/60 uppercase tracking-[0.4em]">Neural Uplink</span>
                       </div>
                       <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">
                          {isSpeaking ? 'Marcus Processing' : isConnected ? 'Live Reception' : isConnecting ? 'Initializing Neural Field' : 'Engine Standby'}
                       </h2>
                    </div>

                    {/* HUD Controls */}
                    <div className="absolute top-10 right-12 z-20 flex flex-col items-end gap-3 group/sens">
                        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-2xl px-5 py-3 rounded-2xl border border-white/10 shadow-2xl transition-all group-hover/sens:border-sky-500/50">
                            <Sliders className="w-4 h-4 text-slate-400" />
                            <input 
                                type="range" min="0" max="1" step="0.01" value={micSensitivity}
                                onChange={(e) => setMicSensitivity(parseFloat(e.target.value))}
                                className="w-32 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                            />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] opacity-0 group-hover/sens:opacity-100 transition-opacity uppercase">Input Calibration</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                    </div>

                    {/* Telemetry Footer */}
                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8">
                        <div className="flex gap-12">
                            <TelemetryItem label="Cognitive Load" value={isConnecting ? "Calculating..." : "14.2%"} />
                            <TelemetryItem label="Voice Fidelity" value="High-Res" />
                            <TelemetryItem label="Encryption" value="AES-4096" />
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Local Time (GTA)</span>
                            <span className="text-lg font-mono font-bold text-white uppercase">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} EST</span>
                        </div>
                    </div>
                </div>

                {/* Sub-Bento Row */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[300px]">
                     <div className="bg-[#0f172a]/40 border border-white/5 rounded-[3rem] p-10 backdrop-blur-md overflow-hidden flex flex-col">
                        <DashboardCharts />
                     </div>
                     <div className="h-full bg-[#0f172a]/40 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-md flex flex-col shadow-2xl">
                        <div className="px-10 py-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <History className="w-5 h-5 text-sky-400" />
                              <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Tactical Feed</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-emerald-400 uppercase">{isConnected ? 'Streaming' : 'Offline'}</span>
                              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                           </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                           <Transcript messages={messages} />
                        </div>
                     </div>
                </div>
            </div>

            {/* DATA INTELLIGENCE COLUMN */}
            <div className="lg:col-span-4 h-full">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
            </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

const TelemetryItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.15em] mb-1">{label}</span>
        <span className="text-sm font-mono font-bold text-slate-300">{value}</span>
    </div>
);

export default App;
