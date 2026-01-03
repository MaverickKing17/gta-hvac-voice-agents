
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 overflow-hidden relative">
      
      {/* Airy Background Layering */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#e0f2fe_0%,transparent_50%)] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-multiply" />
      
      {/* Clean Command Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-slate-200 bg-white/70 backdrop-blur-2xl px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
           <div className="relative group">
              <div className="absolute -inset-1 bg-blue-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center border border-white/20 shadow-lg">
                 <Snowflake className="w-7 h-7 text-white" />
              </div>
           </div>
           
           <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase italic leading-none">
                  Toronto Air <span className="text-blue-600 font-medium tracking-normal not-italic">Systems</span>
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Melissa Intelligence Core</span>
              </div>
           </div>
           
           {isConnected && (
             <div className="hidden xl:flex items-center gap-10 ml-12 pl-12 border-l border-slate-200">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Clock className="w-2 h-2 text-blue-500" /> Dispatch Active
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-600 tabular-nums">
                      {formatDuration(sessionDuration)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Globe className="w-2 h-2 text-slate-400" /> Region Sync
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">EST // TORONTO</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Shield className="w-2 h-2 text-emerald-500" /> Security
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600">ENCRYPTED</span>
                </div>
             </div>
           )}
        </div>

        <div className="flex items-center gap-6">
           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-[11px] transition-all active:scale-95 border uppercase tracking-[0.15em] shadow-sm ${
                  isConnected 
                  ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100' 
                  : isConnecting
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white border-slate-900 hover:bg-blue-600 hover:border-blue-600 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.3)]'
              }`}
           >
              {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : isConnected ? <MicOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
              {isConnecting ? 'Linking Melissa...' : isConnected ? 'Terminate Link' : 'Establish Dispatch Link'}
           </button>
        </div>
      </header>

      <main className="pt-24 h-screen flex relative z-10">
        
        {/* Left: Operations */}
        <section className="flex-1 flex flex-col border-r border-slate-200 overflow-hidden bg-white/40">
            
            {/* Soft Neural Visualizer */}
            <div className="h-1/3 relative flex items-center justify-center overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
                <div className="w-full h-full max-w-lg">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2 bg-white border border-slate-200 rounded-full shadow-sm backdrop-blur-xl">
                   <Activity className="w-3.5 h-3.5 text-blue-600" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Audio Spectrum Analysis</span>
                </div>
            </div>

            {/* Clean Log */}
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
                <Transcript messages={messages} />
            </div>
        </section>

        {/* Right: Lead Intelligence */}
        <aside className="w-[480px] flex flex-col bg-white shadow-[-10px_0_30px_-20px_rgba(0,0,0,0.05)]">
            <InfoPanel lead={leadDetails} isConnected={isConnected} />
        </aside>

      </main>

      {/* Modern Error Toast */}
      {error && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-white border border-rose-100 px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-5 animate-in slide-in-from-bottom-10 border-l-4 border-l-rose-500">
              <div className="p-2 bg-rose-50 rounded-full">
                <AlertCircle className="w-6 h-6 text-rose-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Uplink Failure</span>
                <span className="text-sm font-bold text-slate-700">{error}</span>
              </div>
          </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
};

export default App;
