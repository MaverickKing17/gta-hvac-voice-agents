
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
  Globe,
  Radio,
  Navigation,
  Zap,
  ChevronRight,
  ShieldAlert,
  Signal,
  Headset,
  CheckCircle2,
  Power,
  Users,
  ShieldCheck,
  LayoutGrid
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

  const isMarcus = leadDetails.agentPersona === 'marcus';
  const isEmergency = isMarcus || leadDetails.type === 'emergency';
  const currentAgentName = leadDetails.agentPersona === 'sarah' ? 'SARAH' : 'MARCUS';

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

  const togglePersona = (persona: 'sarah' | 'marcus') => {
    setLeadDetails(prev => ({ ...prev, agentPersona: persona }));
  };

  return (
    <div className={`h-screen flex flex-col transition-all duration-1000 font-sans selection:bg-blue-500/30 overflow-hidden relative ${isEmergency ? 'bg-[#0a0202]' : 'bg-[#000814]'}`}>
      
      {/* Background - Professional Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '60px 60px' }} />
        <div className={`absolute top-[-10%] left-[-5%] w-[70%] h-[70%] blur-[150px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-rose-900/30' : 'bg-blue-900/30'}`} />
      </div>

      <header className="h-28 border-b border-white/20 bg-black/80 backdrop-blur-3xl px-12 flex items-center justify-between shadow-2xl z-50 shrink-0">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-6 pr-10 border-r border-white/20">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-700 relative overflow-hidden group ${isEmergency ? 'bg-rose-600 shadow-rose-900/50' : 'bg-blue-600 shadow-blue-900/50'}`}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                 {isEmergency ? <ShieldAlert className="w-8 h-8 text-white animate-pulse relative z-10" /> : <ShieldCheck className="w-8 h-8 text-white relative z-10" />}
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tight text-white uppercase italic leading-none">
                    Toronto Air <span className={`${isEmergency ? 'text-rose-500' : 'text-blue-400'} not-italic`}>Systems</span>
                </h1>
                
                {/* Simplified Status Module */}
                <div className="flex items-center gap-4 mt-2">
                   <div className={`flex items-center gap-3 px-3 py-1 rounded-lg border transition-all duration-700 ${
                     isConnected 
                      ? (isEmergency ? 'bg-rose-500/40 border-rose-500 text-white' : 'bg-emerald-500/40 border-emerald-500 text-white')
                      : 'bg-white/20 border-white/40 text-white'
                   }`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? (isEmergency ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400 animate-pulse') : 'bg-white/60'}`} />
                      <span className="text-[11px] font-black uppercase tracking-wider">
                        {isConnected ? `${currentAgentName} ACTIVE` : 'OFFLINE'}
                      </span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Signal className={`w-3.5 h-3.5 ${isConnected ? 'text-white' : 'text-white/60'}`} />
                      <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">ENCRYPTED</span>
                   </div>
                </div>
              </div>
           </div>
           
           {/* THE TOGGLE BUTTONS - RE-DESIGNED FOR DISPATCH */}
           <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] pl-1">Select Dispatch Department</span>
              <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border-2 border-white/20 shadow-inner">
                  <button 
                    onClick={() => togglePersona('sarah')}
                    className={`flex items-center gap-4 px-8 py-3 rounded-xl transition-all duration-500 border-2 ${
                      leadDetails.agentPersona === 'sarah' 
                      ? 'bg-white border-white text-slate-950 shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-105 z-10' 
                      : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Headset className={`w-4 h-4 ${leadDetails.agentPersona === 'sarah' ? 'text-blue-600' : ''}`} />
                    <span className="text-xs font-black uppercase tracking-widest">Sarah (Sales/Rebates)</span>
                  </button>
                  
                  <button 
                    onClick={() => togglePersona('marcus')}
                    className={`flex items-center gap-4 px-8 py-3 rounded-xl transition-all duration-500 border-2 ${
                      leadDetails.agentPersona === 'marcus' 
                      ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_40px_rgba(225,29,72,0.5)] scale-105 z-10 animate-pulse-subtle' 
                      : 'bg-transparent border-transparent text-white/50 hover:text-rose-400 hover:bg-rose-500/10'
                    }`}
                  >
                    <Radio className={`w-4 h-4 ${leadDetails.agentPersona === 'marcus' ? 'text-white' : ''}`} />
                    <span className="text-xs font-black uppercase tracking-widest">Marcus (EMERGENCY)</span>
                  </button>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-8">
           {isConnected && (
             <div className="flex items-center gap-8 pr-8 border-r border-white/20 animate-in fade-in slide-in-from-right-10">
                <div className="text-right">
                    <div className="text-[9px] font-black text-white uppercase tracking-widest mb-1">CALL DURATION</div>
                    <div className="text-2xl font-mono font-bold text-white tabular-nums leading-none">{formatDuration(sessionDuration)}</div>
                </div>
                <div>
                    <div className="text-[9px] font-black text-white uppercase tracking-widest mb-1">DATA NODE</div>
                    <div className="text-sm font-black text-blue-400 bg-blue-500/20 px-4 py-1.5 rounded-lg border border-blue-500/60 leading-none uppercase">Toronto-Central</div>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group relative flex items-center gap-5 px-12 py-5 rounded-2xl font-black text-sm transition-all active:scale-95 uppercase tracking-[0.2em] shadow-2xl overflow-hidden border-2 ${
                  isConnected 
                  ? 'bg-rose-950/60 text-white border-rose-500' 
                  : isConnecting
                    ? 'bg-white/10 text-white/80 border-white/40'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-400 hover:scale-105'
              }`}
           >
              {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : isConnected ? <Power className="w-5 h-5" /> : <PhoneCall className="w-5 h-5" />}
              <span>{isConnecting ? 'LINKING...' : isConnected ? 'END CALL' : 'ESTABLISH LINK'}</span>
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        {/* Main Work Area */}
        <section className="flex-1 flex flex-col bg-black/40 backdrop-blur-sm border-r border-white/10 overflow-hidden">
            
            {/* Audio Visualization */}
            <div className={`h-[40%] relative flex items-center justify-center overflow-hidden border-b border-white/10 transition-all duration-1000 ${isEmergency ? 'bg-rose-950/20' : 'bg-blue-950/20'}`}>
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} isEmergency={isEmergency} />
                </div>
                
                <div className="absolute top-8 left-8">
                   <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/80 border-2 border-white/40 backdrop-blur-md shadow-2xl">
                      <Activity className={`w-5 h-5 ${isEmergency ? 'text-rose-500' : 'text-blue-400'}`} />
                      <span className="text-[12px] font-black text-white uppercase tracking-[0.3em]">LIVE VOICE MONITOR</span>
                   </div>
                </div>

                {/* Tactical Dispatch Label */}
                <div className="absolute bottom-8 right-8">
                   <div className="flex items-center gap-3 text-white/30 font-mono text-[10px] font-black uppercase tracking-[0.5em]">
                      <Signal className="w-4 h-4" />
                      Frequency: 44.1kHz Sync
                   </div>
                </div>
            </div>

            {/* Transcription Area */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/30 overflow-hidden">
                <Transcript messages={messages} persona={leadDetails.agentPersona} />
            </div>
            
            {/* Ticker */}
            <footer className="h-16 bg-black/90 border-t border-white/20 flex items-center overflow-hidden shrink-0">
               <div className="flex items-center gap-16 animate-marquee whitespace-nowrap px-12">
                  <TickerItem label="MISSISSAUGA" status="TECH AVAILABILITY: HIGH" />
                  <TickerItem label="BRAMPTON" status="NEXT WINDOW: 2PM" />
                  <TickerItem label="GEORGETOWN" status="TECH AVAILABILITY: MED" />
                  <TickerItem label="ETOBICOKE" status="TECH AVAILABILITY: HIGH" />
                  <TickerItem label="DOWNTOWN" status="NEXT WINDOW: 4PM" />
                  <TickerItem label="NORTH YORK" status="GRID STABLE" />
               </div>
            </footer>
        </section>

        {/* Intelligence Side-Terminal */}
        <aside className="w-[480px] flex-shrink-0 flex flex-col bg-white z-20 overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const TickerItem = ({ label, status }: any) => (
  <div className="flex items-center gap-5">
    <span className="text-[11px] font-black text-white uppercase tracking-widest">{label}</span>
    <span className="text-[12px] font-bold text-blue-400 uppercase tracking-tight">{status}</span>
    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
  </div>
);

export default App;
