
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { 
  MicOff, 
  PhoneCall, 
  Loader2, 
  Activity, 
  Clock, 
  UserCircle2,
  AlertTriangle,
  Globe,
  Radio,
  Navigation,
  Zap,
  ChevronRight,
  ShieldAlert,
  Cpu,
  Signal,
  Headset,
  CheckCircle2,
  Power
} from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({
    agentPersona: 'sarah',
    marketType: 'residential'
  });
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
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  const isEmergency = leadDetails.agentPersona === 'mike' || leadDetails.type === 'emergency';
  const currentAgentName = leadDetails.agentPersona === 'sarah' ? 'SARAH' : 'MIKE';

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
    return () => { if (interval) clearInterval(interval); };
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePersona = (persona: 'sarah' | 'mike') => {
    setLeadDetails(prev => ({ ...prev, agentPersona: persona }));
  };

  return (
    <div className={`h-screen flex flex-col transition-all duration-1000 font-sans selection:bg-blue-500/30 overflow-hidden relative ${isEmergency ? 'bg-[#050000]' : 'bg-[#00050a]'}`}>
      
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className={`absolute top-[-10%] left-[-5%] w-[70%] h-[70%] blur-[180px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-rose-900/25' : 'bg-blue-900/25'}`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] blur-[180px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-rose-800/15' : 'bg-blue-800/15'}`} />
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent h-40 w-full animate-scan pointer-events-none" />
      </div>

      <header className="h-32 border-b border-white/10 bg-black/70 backdrop-blur-3xl px-12 flex items-center justify-between shadow-[0_15px_60px_rgba(0,0,0,0.9)] z-50 shrink-0">
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-8 pr-12 border-r border-white/20">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-700 relative overflow-hidden group ${isEmergency ? 'bg-rose-600 scale-110 shadow-rose-900/50' : 'bg-blue-700 shadow-blue-900/50'}`}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                 {isEmergency ? <ShieldAlert className="w-10 h-10 text-white animate-pulse relative z-10" /> : <Zap className="w-10 h-10 text-white relative z-10" />}
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none flex items-center gap-4">
                    Toronto Air <span className={`${isEmergency ? 'text-rose-500' : 'text-blue-400'} font-black tracking-normal not-italic`}>Systems</span>
                </h1>
                
                {/* ENHANCED DISPATCHER STATUS MODULE */}
                <div className="flex items-center gap-5 mt-3">
                   <div className={`flex items-center gap-4 px-5 py-2 rounded-xl border-2 transition-all duration-700 ${
                     isConnected 
                      ? (isEmergency ? 'bg-rose-500/20 border-rose-400/60 text-rose-300 shadow-[0_0_30px_rgba(225,29,72,0.5)]' : 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.5)]')
                      : 'bg-white/[0.05] border-white/10 text-white/40'
                   }`}>
                      <div className="relative flex items-center justify-center">
                        <div className={`absolute inset-0 w-4 h-4 rounded-full transition-all duration-500 ${isConnected ? (isEmergency ? 'bg-rose-400 animate-ping opacity-40' : 'bg-emerald-400 animate-ping opacity-50') : 'opacity-0'}`} />
                        <div className={`w-3 h-3 rounded-full transition-colors duration-700 ${isConnected ? (isEmergency ? 'bg-rose-400' : 'bg-emerald-400') : 'bg-white/20'}`} />
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 leading-none">Dispatcher</span>
                           {isConnected && <CheckCircle2 className="w-2.5 h-2.5 text-current opacity-80" />}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                           <span className={`text-sm font-black uppercase tracking-[0.15em] ${isConnected ? 'text-white' : ''}`}>
                             {currentAgentName}
                           </span>
                           <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-md">
                             {isConnected ? 'ONLINE & READY' : 'STANDBY'}
                           </span>
                        </div>
                      </div>
                   </div>
                   
                   <div className="flex flex-col justify-center border-l border-white/10 pl-5 h-10">
                      <div className="flex items-center gap-3">
                        <Signal className={`w-4 h-4 transition-colors ${isConnected ? (isEmergency ? 'text-rose-500' : 'text-blue-500') : 'text-white/10'}`} />
                        <span className={`text-[11px] font-mono font-black tracking-[0.4em] transition-all duration-1000 ${
                          isConnected ? 'text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-white/20'
                        }`}>
                          LINK: ALPHA-01-COMM
                        </span>
                      </div>
                      <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.6em] mt-1">ENCRYPTION: AES-256-LIVE</div>
                   </div>
                </div>
              </div>
           </div>
           
           {/* Agent Switcher */}
           <div className="flex items-center gap-2 bg-white/[0.04] p-1.5 rounded-[1.8rem] border border-white/10 shadow-inner">
              <button 
                onClick={() => togglePersona('sarah')}
                className={`flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden group ${
                  leadDetails.agentPersona === 'sarah' 
                  ? 'bg-white text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,0.25)] scale-105 z-10' 
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                <Headset className={`w-6 h-6 transition-colors ${leadDetails.agentPersona === 'sarah' ? 'text-blue-600' : 'text-current'}`} />
                <div className="flex flex-col items-start leading-none">
                   <span className="text-sm font-black uppercase tracking-widest">Sarah</span>
                   <span className={`text-[9px] font-black uppercase tracking-[0.2em] mt-1.5 ${leadDetails.agentPersona === 'sarah' ? 'text-blue-600/70' : 'text-white/20'}`}>HOME ADVISOR</span>
                </div>
              </button>
              
              <div className="flex items-center justify-center w-6 opacity-10">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>

              <button 
                onClick={() => togglePersona('mike')}
                className={`flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden group ${
                  leadDetails.agentPersona === 'mike' 
                  ? 'bg-rose-600 text-white shadow-[0_10px_45px_rgba(225,29,72,0.5)] scale-105 z-10' 
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                <Radio className={`w-6 h-6 transition-colors ${leadDetails.agentPersona === 'mike' ? 'text-white' : 'text-current'}`} />
                <div className="flex flex-col items-start leading-none">
                   <span className="text-sm font-black uppercase tracking-widest">Mike</span>
                   <span className={`text-[9px] font-black uppercase tracking-[0.2em] mt-1.5 ${leadDetails.agentPersona === 'mike' ? 'text-white/70' : 'text-white/20'}`}>EMERGENCY</span>
                </div>
              </button>
           </div>
        </div>

        <div className="flex items-center gap-10">
           {isConnected && (
             <div className="flex items-center gap-10 pr-10 border-r border-white/10 animate-in fade-in slide-in-from-right-10 duration-700">
                <div className="text-right flex flex-col items-end">
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/30" /> ELAPSED
                    </div>
                    <div className="text-3xl font-mono font-black text-white tabular-nums tracking-tighter">
                      {formatDuration(sessionDuration)}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-white/30" /> NODE
                    </div>
                    <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full border-2 text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-1000 ${isEmergency ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 shadow-[0_0_25px_rgba(225,29,72,0.4)]' : 'bg-blue-500/20 border-blue-500/40 text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.4)]'}`}>
                      GTA-TX-10
                    </div>
                </div>
             </div>
           )}

           {/* HIGH-IMPACT COMMAND BUTTON */}
           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group relative flex items-center gap-8 px-16 py-8 rounded-[2rem] font-black text-[16px] transition-all active:scale-95 uppercase tracking-[0.4em] shadow-2xl overflow-hidden ${
                  isConnected 
                  ? 'bg-rose-950/20 text-rose-500 border-4 border-rose-500/50 hover:bg-rose-900/40 shadow-rose-900/80 scale-105' 
                  : isConnecting
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border-white/10 border-2 scale-100'
                    : 'bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 text-white hover:scale-[1.08] shadow-[0_25px_70px_rgba(59,130,246,0.5)] border-4 border-blue-400/30'
              }`}
           >
              {/* Dynamic Button Background Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent)] opacity-50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-6">
                {isConnecting ? (
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                ) : isConnected ? (
                  <div className="bg-rose-600 p-3 rounded-xl shadow-lg">
                    <Power className="w-7 h-7 text-white" />
                  </div>
                ) : (
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md shadow-lg group-hover:bg-white/30 transition-all duration-500">
                    <PhoneCall className="w-7 h-7 text-white animate-bounce-slow" />
                  </div>
                )}
                
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-black opacity-60 tracking-[0.5em] mb-1.5">COMMAND INTERFACE</span>
                  <span className="text-lg tracking-[0.1em]">
                    {isConnecting ? 'ESTABLISHING...' : isConnected ? 'TERMINATE LINK' : 'ESTABLISH DISPATCH LINK'}
                  </span>
                </div>
              </div>

              {/* Glowing Indicator for the Disconnected State */}
              {!isConnected && !isConnecting && (
                <div className="absolute right-6 w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,1)]" />
              )}
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative z-10">
        
        {/* Core Visual Analytics Hub */}
        <section className="flex-1 flex flex-col bg-black/50 backdrop-blur-md border-r border-white/10 overflow-hidden">
            
            {/* Audio Visualization */}
            <div className={`h-[45%] relative flex items-center justify-center overflow-hidden border-b border-white/10 transition-all duration-1000 ${isEmergency ? 'bg-rose-950/10' : 'bg-blue-950/10'}`}>
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
                
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} isEmergency={isEmergency} />
                </div>
                
                <div className="absolute top-10 left-10 flex flex-col gap-4">
                   <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl backdrop-blur-3xl border shadow-2xl transition-all duration-700 ${isEmergency ? 'bg-rose-500/10 border-rose-500/30' : 'bg-blue-500/10 border-blue-500/40 shadow-blue-900/20'}`}>
                      <Activity className={`w-5 h-5 animate-pulse ${isEmergency ? 'text-rose-500' : 'text-blue-400'}`} />
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">SIGNAL INTERCEPT ACTIVE</span>
                   </div>
                   <div className="flex items-center gap-3 px-6 py-2 opacity-30">
                      <Cpu className="w-3.5 h-3.5 text-white" />
                      <span className="text-[8px] font-bold text-white uppercase tracking-[0.6em]">NEURAL PROCESSING 01.A</span>
                   </div>
                </div>

                <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3">
                   <div className="flex items-center gap-3">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className={`w-1.5 rounded-full transition-all duration-300 ${isSpeaking ? (isEmergency ? 'bg-rose-500' : 'bg-blue-400') : 'bg-white/10'}`} style={{ height: `${12 + Math.random() * 40}px`, opacity: 0.2 + Math.random() * 0.8 }} />
                      ))}
                   </div>
                   <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.6em]">VOICE VELOCITY</div>
                </div>
            </div>

            {/* High-Resolution Live Transcript */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/30 overflow-hidden">
                <Transcript messages={messages} persona={leadDetails.agentPersona} />
            </div>
            
            {/* TACTICAL TICKER */}
            <footer className="h-20 bg-black/80 border-t border-white/20 flex items-center overflow-hidden shrink-0 relative">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 pointer-events-none" />
               <div className="flex items-center gap-24 animate-marquee whitespace-nowrap px-16">
                  <TickerItem label="MISSISSAUGA" status="GRID STABLE" value="24ms" />
                  <TickerItem label="BRAMPTON" status="EMERGENCY DEPLOYED" value="HIGH" color="text-rose-500" />
                  <TickerItem label="GEORGETOWN" status="OPTIMAL LOAD" value="12ms" />
                  <TickerItem label="EAST YORK" status="PEAK PERFORMANCE" value="SYMMETRIC" />
                  <TickerItem label="ETOBICOKE" status="ACTIVE NODES" value="14" />
                  <TickerItem label="SCARBOROUGH" status="SIGNAL VERIFIED" value="100%" />
                  <TickerItem label="DOWNTOWN" status="PRIORITY DISPATCH" value="ACTIVE" color="text-amber-500" />
               </div>
            </footer>
        </section>

        {/* Intelligence Side-Terminal */}
        <aside className="w-[520px] flex-shrink-0 flex flex-col bg-[#fcfdfe] z-20 overflow-hidden shadow-[-30px_0_70px_rgba(0,0,0,0.6)] border-l border-white/10">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan {
          animation: scan 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const TickerItem = ({ label, status, value, color = 'text-blue-500' }: any) => (
  <div className="flex items-center gap-6 group">
    <div className="flex flex-col gap-0.5">
       <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-none">{label}</span>
       <div className="flex items-center gap-3">
          <span className={`text-[13px] font-black uppercase tracking-widest leading-none ${color}`}>{status}</span>
          <div className="h-1 w-1 rounded-full bg-white/20" />
          <span className="text-[11px] font-mono font-bold text-white/60 leading-none">{value}</span>
       </div>
    </div>
    <div className="w-px h-10 bg-white/5 mx-4" />
  </div>
);

export default App;
