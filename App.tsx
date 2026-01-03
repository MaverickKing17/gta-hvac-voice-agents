
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { MicOff, PhoneCall, AlertCircle, Snowflake, Loader2, Activity, Globe, Shield, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({});
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  
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
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  // Timer logic for active dispatch link
  useEffect(() => {
    let interval: number | undefined;
    
    if (isConnected) {
      const startTime = Date.now();
      interval = window.setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setSessionDuration(0);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Premium Background Layering */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b_0%,transparent_50%)] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none brightness-50" />
      
      {/* Precision Command Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/[0.03] bg-[#020617]/80 backdrop-blur-2xl px-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
           <div className="relative group">
              <div className="absolute -inset-1 bg-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border border-blue-400/30">
                 <Snowflake className="w-7 h-7 text-white" />
              </div>
           </div>
           
           <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight text-white uppercase italic leading-none">
                  Toronto Air <span className="text-blue-500 font-medium tracking-normal not-italic">Systems</span>
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Intelligence Core</span>
              </div>
           </div>
           
           {isConnected && (
             <div className="hidden xl:flex items-center gap-10 ml-12 pl-12 border-l border-white/10">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Clock className="w-2 h-2" /> Link Duration
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-400 tabular-nums">
                      {formatDuration(sessionDuration)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Globe className="w-2 h-2" /> Global Sync
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">EST // TORONTO</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Shield className="w-2 h-2" /> Security
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">ENCRYPTED</span>
                </div>
             </div>
           )}
        </div>

        <div className="flex items-center gap-6">
           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-[11px] transition-all active:scale-95 border-2 uppercase tracking-[0.15em] ${
                  isConnected 
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20' 
                  : isConnecting
                    ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-white text-black border-white hover:bg-blue-500 hover:border-blue-400 hover:text-white shadow-[0_20px_40px_-15px_rgba(255,255,255,0.15)]'
              }`}
           >
              {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : isConnected ? <MicOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
              {isConnecting ? 'Initializing Neural Link' : isConnected ? 'Terminate Session' : 'Establish Dispatch Link'}
           </button>
        </div>
      </header>

      <main className="pt-24 h-screen flex relative z-10">
        
        {/* Left: Tactical Operation Area */}
        <section className="flex-1 flex flex-col border-r border-white/[0.03] overflow-hidden bg-black/10">
            
            {/* High-Fidelity Visualizer */}
            <div className="h-1/3 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
                <div className="w-full h-full max-w-lg">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-3xl">
                   <Activity className="w-3.5 h-3.5 text-blue-500" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Response Monitor</span>
                </div>
            </div>

            {/* Tactical Log */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-hidden">
                    <Transcript messages={messages} />
                </div>
            </div>
        </section>

        {/* Right: Intelligence & Data Acquisition */}
        <aside className="w-[480px] flex flex-col bg-[#020617]/40 backdrop-blur-sm">
            <InfoPanel lead={leadDetails} isConnected={isConnected} />
        </aside>

      </main>

      {/* Global Error Toast */}
      {error && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-rose-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10">
              <AlertCircle className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Uplink Interrupted</span>
                <span className="text-sm font-bold">{error}</span>
              </div>
          </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default App;
