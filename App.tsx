
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
  ChevronRight
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

  return (
    <div className={`min-h-screen transition-colors duration-1000 font-sans selection:bg-blue-100 overflow-hidden relative ${isEmergency ? 'bg-rose-50' : 'bg-slate-50'}`}>
      
      {/* Brand Accent Bar */}
      <div className={`absolute top-0 left-0 w-full h-2 z-[60] transition-all duration-1000 ${isEmergency ? 'bg-[#cc0000]' : 'bg-[#003366]'}`} />
      
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ 
        backgroundImage: `radial-gradient(${isEmergency ? '#cc0000' : '#003366'} 1.5px, transparent 1.5px)`, 
        backgroundSize: '30px 30px' 
      }} />

      <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-slate-200 bg-white/95 backdrop-blur-md px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-4 border-r border-slate-200 pr-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-700 ${isEmergency ? 'bg-[#cc0000]' : 'bg-[#003366]'}`}>
                 <Snowflake className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter text-[#001f3f] uppercase italic leading-none">
                    Toronto Air <span className={`${isEmergency ? 'text-[#cc0000]' : 'text-[#003366]'} font-bold tracking-normal not-italic`}>Systems</span>
                </h1>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Intelligence Operations Center</span>
              </div>
           </div>
           
           {/* Persona Switcher UI */}
           <div className="flex items-center gap-4 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/60">
              <AgentPill 
                name="Sarah" 
                role="Comfort" 
                active={leadDetails.agentPersona === 'sarah'} 
                icon={<UserCircle2 className="w-3.5 h-3.5" />}
                color="blue"
              />
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <AgentPill 
                name="Mike" 
                role="Dispatch" 
                active={leadDetails.agentPersona === 'mike'} 
                icon={<AlertTriangle className="w-3.5 h-3.5" />}
                color="red"
              />
           </div>
        </div>

        <div className="flex items-center gap-8">
           {isConnected && (
             <div className="flex items-center gap-12 pr-12 border-r border-slate-200">
                <div className="text-right">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-end gap-2">
                      <Clock className={`w-3.5 h-3.5 ${isEmergency ? 'text-[#cc0000]' : 'text-[#003366]'}`} /> Call Logic Time
                    </div>
                    <div className="text-xl font-mono font-black text-[#001f3f] tabular-nums">
                      {formatDuration(sessionDuration)}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-end gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Lead Auth
                    </div>
                    <div className="text-xs font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Verified</div>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-[12px] transition-all active:scale-95 uppercase tracking-[0.2em] shadow-2xl ${
                  isConnected 
                  ? 'bg-white text-[#cc0000] border-2 border-[#cc0000] hover:bg-rose-50' 
                  : isConnecting
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200 border-2'
                    : 'bg-[#003366] text-white hover:bg-[#002244]'
              }`}
           >
              {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : isConnected ? <MicOff className="w-5 h-5" /> : <PhoneCall className="w-5 h-5" />}
              {isConnecting ? 'Linking...' : isConnected ? 'Kill Link' : 'Establish Dispatch'}
           </button>
        </div>
      </header>

      <main className="pt-24 h-screen flex relative z-10">
        
        {/* Left: Communication Hub */}
        <section className="flex-1 flex flex-col border-r border-slate-200 bg-white/40">
            
            {/* Persona-Driven Visualizer */}
            <div className={`h-[42%] relative flex items-center justify-center overflow-hidden border-b border-slate-200 transition-colors duration-1000 ${isEmergency ? 'bg-[#1a0505]' : 'bg-[#001f3f]'}`}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
                  backgroundImage: `linear-gradient(#ffffff08 1.5px, transparent 1.5px), linear-gradient(90deg, #ffffff08 1.5px, transparent 1.5px)`, 
                  backgroundSize: '25px 25px' 
                }} />
                
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} isEmergency={isEmergency} />
                </div>
                
                <div className={`absolute top-8 left-10 flex items-center gap-4 px-5 py-2.5 rounded-xl backdrop-blur-xl border ${isEmergency ? 'bg-rose-500/10 border-rose-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                   <Activity className={`w-4 h-4 animate-pulse ${isEmergency ? 'text-rose-500' : 'text-[#0099cc]'}`} />
                   <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.4em]">Biometric Feedback</span>
                </div>

                {isEmergency && (
                  <div className="absolute top-8 right-10 animate-pulse">
                    <div className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-2xl">
                      <AlertTriangle className="w-4 h-4" />
                      Priority Dispatch Triggered
                    </div>
                  </div>
                )}
            </div>

            {/* Transcript Log */}
            <div className="flex-1 flex flex-col min-h-0 bg-white/80 overflow-hidden">
                <Transcript messages={messages} persona={leadDetails.agentPersona} />
            </div>
        </section>

        {/* Right: Technical Lead & Market Data */}
        <aside className="w-[620px] flex flex-col bg-[#f1f5f9] border-l border-slate-200 shadow-[-20px_0_50px_-20px_rgba(0,0,0,0.05)] z-20 overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
                
                {/* Market Segment Widget */}
                <div className="px-12 pb-12">
                   <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-200 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                         <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Market Segment</div>
                            <div className="text-xl font-black text-[#001f3f] uppercase italic">Diagnostic Context</div>
                         </div>
                         <div className={`p-4 rounded-2xl transition-colors duration-700 ${leadDetails.marketType === 'commercial' ? 'bg-[#003366] text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {leadDetails.marketType === 'commercial' ? <Building2 className="w-6 h-6" /> : <Home className="w-6 h-6" />}
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className={`p-6 rounded-2xl border-2 transition-all cursor-default ${leadDetails.marketType === 'residential' ? 'border-[#003366] bg-blue-50/50' : 'border-slate-100 bg-white'}`}>
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Portfolio</div>
                            <div className="text-sm font-bold text-[#001f3f]">Residential HVAC</div>
                         </div>
                         <div className={`p-6 rounded-2xl border-2 transition-all cursor-default ${leadDetails.marketType === 'commercial' ? 'border-[#003366] bg-blue-50/50' : 'border-slate-100 bg-white'}`}>
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Portfolio</div>
                            <div className="text-sm font-bold text-[#001f3f]">Commercial/Industrial</div>
                         </div>
                      </div>
                   </div>
                </div>
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

const AgentPill = ({ name, role, active, icon, color }: any) => (
  <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-500 ${
    active 
    ? (color === 'red' ? 'bg-rose-600 text-white shadow-lg scale-105' : 'bg-[#003366] text-white shadow-lg scale-105')
    : 'text-slate-400 opacity-60'
  }`}>
    {icon}
    <div className="flex flex-col leading-none">
       <span className="text-[9px] font-black uppercase tracking-widest">{name}</span>
       <span className="text-[7px] font-bold uppercase tracking-tight mt-0.5 opacity-60">{role}</span>
    </div>
    {active && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
  </div>
);

export default App;
