
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { 
  MicOff, 
  PhoneCall, 
  Snowflake, 
  Loader2, 
  Activity, 
  ShieldCheck, 
  Clock, 
  UserCircle2,
  AlertTriangle,
  Building2,
  Home,
  ChevronRight,
  Globe,
  Radio,
  Navigation,
  Signal,
  Wifi
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
    <div className={`min-h-screen transition-all duration-700 font-sans selection:bg-blue-200 overflow-hidden relative ${isEmergency ? 'bg-[#0a0202]' : 'bg-[#000a14]'}`}>
      
      {/* Tactical HUD Overlays */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] animate-pulse-slow">
           <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
              <path d="M0 500 L1000 500 M500 0 L500 1000" stroke="white" strokeWidth="1" />
              <circle cx="500" cy="500" r="150" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="500" cy="500" r="300" fill="none" stroke="white" strokeWidth="0.5" />
           </svg>
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/10 bg-[#001428]/95 backdrop-blur-2xl px-12 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-6 border-r border-white/10 pr-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-700 ${isEmergency ? 'bg-[#cc0000] rotate-3 scale-110' : 'bg-[#003366]'}`}>
                 {isEmergency ? <AlertTriangle className="w-8 h-8 text-white animate-pulse" /> : <Snowflake className="w-8 h-8 text-white" />}
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                    Toronto Air <span className={`${isEmergency ? 'text-[#ff4d4d]' : 'text-[#0099cc]'} font-bold tracking-normal not-italic`}>Systems</span>
                </h1>
                
                {/* ENHANCED OPERATIONS LINK SECTION - MADE EVEN CLEARER */}
                <div className="flex items-center gap-3 mt-2.5">
                   <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all duration-500 shadow-lg ${
                     isConnected 
                      ? 'bg-emerald-500/20 border-emerald-500/50 shadow-emerald-500/20' 
                      : 'bg-white/5 border-white/10 shadow-black/40'
                   }`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        isConnected 
                          ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)] animate-pulse' 
                          : 'bg-slate-600 shadow-inner'
                      }`} />
                      <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${isConnected ? 'text-white' : 'text-white/40'}`}>
                        LINK STATUS: <span className={isConnected ? 'text-emerald-400' : 'text-slate-500'}>{isConnected ? 'LIVE & VERIFIED' : 'STANDBY MODE'}</span>
                      </span>
                   </div>
                   
                   {/* Signal Strength Visualizer */}
                   <div className="flex items-end gap-1 h-4 px-2 border-l border-white/10">
                      <div className={`w-1.5 rounded-sm transition-all duration-500 ${isConnected ? 'bg-emerald-500 h-2' : 'bg-white/10 h-1.5'}`} />
                      <div className={`w-1.5 rounded-sm transition-all duration-500 ${isConnected ? 'bg-emerald-500 h-3' : 'bg-white/10 h-1.5'}`} />
                      <div className={`w-1.5 rounded-sm transition-all duration-500 ${isConnected ? 'bg-emerald-500 h-4' : 'bg-white/10 h-1.5'}`} />
                   </div>
                   
                   <span className="text-[9px] font-mono font-black text-white/20 tracking-[0.3em] ml-2">CORE-HUB: 880-ALPHA</span>
                </div>
              </div>
           </div>
           
           {/* INTERACTIVE Tactical Agent Switcher */}
           <div className="flex items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/10 shadow-inner">
              <AgentPill 
                name="Sarah" 
                role="Advisory" 
                active={leadDetails.agentPersona === 'sarah'} 
                onClick={() => togglePersona('sarah')}
                icon={<UserCircle2 className="w-4 h-4" />}
                color="blue"
              />
              <div className="h-10 w-px bg-white/10 mx-1" />
              <AgentPill 
                name="Mike" 
                role="Critical" 
                active={leadDetails.agentPersona === 'mike'} 
                onClick={() => togglePersona('mike')}
                icon={<Radio className="w-4 h-4" />}
                color="red"
              />
           </div>
        </div>

        <div className="flex items-center gap-10">
           {isConnected && (
             <div className="flex items-center gap-12 pr-12 border-r border-white/10">
                <div className="text-right">
                    <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5 flex items-center justify-end gap-2">
                      <Clock className={`w-3.5 h-3.5 ${isEmergency ? 'text-[#ff4d4d]' : 'text-[#0099cc]'}`} /> Signal Duration
                    </div>
                    <div className="text-2xl font-mono font-black text-white tabular-nums tracking-tighter">
                      {formatDuration(sessionDuration)}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Market Sector</div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all duration-700 ${leadDetails.marketType === 'commercial' ? 'bg-amber-500/20 border-amber-500/50 text-amber-500' : 'bg-blue-500/20 border-blue-500/50 text-blue-400'}`}>
                      {leadDetails.marketType === 'commercial' ? <Building2 className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
                      {leadDetails.marketType}
                    </div>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group relative flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-[12px] transition-all active:scale-95 uppercase tracking-[0.2em] shadow-2xl overflow-hidden ${
                  isConnected 
                  ? 'bg-black text-[#ff4d4d] border border-[#ff4d4d]/30 hover:bg-rose-950/20' 
                  : isConnecting
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border-white/5 border'
                    : 'bg-white text-[#001f3f] hover:bg-white/90'
              }`}
           >
              {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : isConnected ? <MicOff className="w-5 h-5" /> : <PhoneCall className="w-5 h-5" />}
              {isConnecting ? 'Linking...' : isConnected ? 'Kill Link' : 'Establish Link'}
           </button>
        </div>
      </header>

      <main className="pt-24 h-screen flex relative z-10">
        
        {/* Left: Communication Hub */}
        <section className="flex-1 flex flex-col border-r border-white/5 bg-black/20">
            
            {/* Persona-Driven Audio Lab */}
            <div className={`h-[48%] relative flex items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000 ${isEmergency ? 'bg-[#1a0000]' : 'bg-[#001326]'}`}>
                {/* Visualizer Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(#ffffff08 1.5px, transparent 1.5px), linear-gradient(90deg, #ffffff08 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
                
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} isEmergency={isEmergency} />
                </div>
                
                {/* HUD Details */}
                <div className="absolute top-10 left-10 flex flex-col gap-3">
                   <div className={`flex items-center gap-4 px-5 py-2.5 rounded-xl backdrop-blur-xl border ${isEmergency ? 'bg-rose-500/10 border-rose-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                      <Activity className={`w-4 h-4 animate-pulse ${isEmergency ? 'text-rose-500' : 'text-[#00ccff]'}`} />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Audio Intercept Active</span>
                   </div>
                   <div className="flex items-center gap-3 text-[9px] font-mono text-white/20 uppercase tracking-widest pl-2">
                      <Globe className="w-3 h-3" /> Toronto Regional Hub - Node 4
                   </div>
                </div>

                <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3">
                   <div className="flex items-center gap-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className={`w-1 h-8 rounded-full transition-all duration-300 ${isSpeaking ? (isEmergency ? 'bg-rose-500' : 'bg-blue-400') : 'bg-white/10'}`} style={{ transform: `scaleY(${isSpeaking ? 0.3 + Math.random() : 0.1})` }} />
                      ))}
                   </div>
                   <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Neural Load Map</div>
                </div>
            </div>

            {/* Transcript Log */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/40 overflow-hidden">
                <Transcript messages={messages} persona={leadDetails.agentPersona} />
            </div>
            
            {/* Toronto Operations Ticker */}
            <footer className="h-10 bg-black/80 border-t border-white/5 flex items-center overflow-hidden">
               <div className="flex items-center gap-12 animate-marquee whitespace-nowrap px-10">
                  <TickerItem label="MISSISSAUGA" status="94% Efficiency" />
                  <TickerItem label="BRAMPTON" status="Emergency Units: 8 Active" />
                  <TickerItem label="VAUGHAN" status="Commercial Grid Stable" />
                  <TickerItem label="SCARBOROUGH" status="Average Response: 3.2m" />
                  <TickerItem label="DOWNTOWN" status="High Density Alert" />
               </div>
            </footer>
        </section>

        {/* Right: Lead Intelligence Processor */}
        <aside className="w-[680px] flex flex-col bg-white z-20 overflow-hidden shadow-[-40px_0_80px_rgba(0,0,0,0.4)]">
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
                
                {/* Secondary Market Widget */}
                <div className="px-10 pb-16 pt-4">
                   <div className="p-10 bg-[#001428] rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                           <div>
                              <div className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">Facility Mapping</div>
                              <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Diagnostic Context</h4>
                           </div>
                           <Navigation className="w-8 h-8 text-white/10" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Technician ETA</div>
                              <div className="text-3xl font-black text-white font-mono tracking-tighter">48m <span className="text-xs text-emerald-400">FAST</span></div>
                           </div>
                           <div className="space-y-4">
                              <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Fleet</div>
                              <div className="text-3xl font-black text-white font-mono tracking-tighter">24 <span className="text-xs text-blue-400">UNITS</span></div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

const TickerItem = ({ label, status }: any) => (
  <div className="flex items-center gap-3">
    <span className="text-[9px] font-black text-[#0099cc] uppercase tracking-widest">{label}:</span>
    <span className="text-[9px] font-bold text-white/40 uppercase tracking-tight">{status}</span>
    <div className="w-1 h-1 rounded-full bg-white/10" />
  </div>
);

const AgentPill = ({ name, role, active, icon, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3.5 rounded-xl transition-all duration-500 group relative overflow-hidden ${
      active 
      ? (color === 'red' ? 'bg-[#cc0000] text-white shadow-[0_0_20px_rgba(204,0,0,0.4)] scale-105 z-10' : 'bg-white text-[#001f3f] shadow-[0_0_25px_rgba(255,255,255,0.2)] scale-105 z-10')
      : 'text-white/20 opacity-40 hover:opacity-100 hover:text-white hover:bg-white/5'
    }`}
  >
    {active && (
      <div className={`absolute inset-0 opacity-10 animate-pulse ${color === 'red' ? 'bg-white' : 'bg-blue-400'}`} />
    )}
    <div className={`p-2 rounded-lg transition-all duration-500 ${active ? (color === 'red' ? 'bg-white/20' : 'bg-[#001f3f]/5') : 'bg-white/5 group-hover:bg-white/10'}`}>
      {icon}
    </div>
    <div className="flex flex-col items-start leading-none relative z-10">
       <span className="text-[11px] font-black uppercase tracking-[0.15em]">{name}</span>
       <span className={`text-[8px] font-black uppercase tracking-widest mt-1 ${active ? (color === 'red' ? 'text-white/70' : 'text-[#001f3f]/60') : 'text-white/20'}`}>{role}</span>
    </div>
  </button>
);

export default App;
