
import React, { useState, useEffect } from 'react';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { 
  PhoneCall, 
  Activity, 
  Radio, 
  Navigation, 
  Signal, 
  Headset, 
  ShieldCheck, 
  ShieldAlert,
  ChevronRight,
  Flame,
  Snowflake,
  Calculator,
  Clock4
} from 'lucide-react';
import { LeadDetails } from './types';

// VAPI INTEGRATION NOTE:
// When you get your Vapi SDK code, you can initialize it here 
// and call vapi.start() inside the handleCallStart function.

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<'sarah' | 'marcus'>('sarah');
  const [isCalling, setIsCalling] = useState(false);
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({
    agentPersona: 'sarah',
    marketType: 'residential'
  });

  const isMarcus = activePersona === 'marcus';
  const isEmergency = isMarcus;

  const handlePersonaSwitch = (persona: 'sarah' | 'marcus') => {
    setActivePersona(persona);
    setLeadDetails(prev => ({ ...prev, agentPersona: persona }));
  };

  const handleCallStart = () => {
    // Placeholder for Vapi.start()
    console.log(`Starting Vapi call with ${activePersona}...`);
    setIsCalling(true);
  };

  const handleCallEnd = () => {
    // Placeholder for Vapi.stop()
    setIsCalling(false);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-1000 font-sans selection:bg-blue-500/30 overflow-hidden relative ${isEmergency ? 'bg-[#0a0202]' : 'bg-[#000814]'}`}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '60px 60px' }} />
        <div className={`absolute top-[-20%] left-[-10%] w-[80%] h-[80%] blur-[180px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-rose-900/40' : 'bg-blue-900/40'}`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] blur-[150px] rounded-full transition-all duration-1000 ${isEmergency ? 'bg-orange-900/20' : 'bg-indigo-900/20'}`} />
      </div>

      <header className="h-28 border-b border-white/10 bg-black/60 backdrop-blur-3xl px-12 flex items-center justify-between shadow-2xl z-50 shrink-0">
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-8 pr-12 border-r border-white/10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-700 relative overflow-hidden group ${isEmergency ? 'bg-rose-600' : 'bg-blue-600'}`}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                 {isEmergency ? <ShieldAlert className="w-8 h-8 text-white animate-pulse relative z-10" /> : <ShieldCheck className="w-8 h-8 text-white relative z-10" />}
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                    TORONTO AIR <span className={`${isEmergency ? 'text-rose-500' : 'text-blue-400'} not-italic`}>SYSTEMS</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                   <Signal className="w-3 h-3 text-emerald-400" />
                   <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Toronto's Heritage HVAC Experts</span>
                </div>
              </div>
           </div>
           
           <nav className="hidden lg:flex items-center gap-10">
              <a href="#" className="text-[12px] font-black text-white/60 hover:text-white uppercase tracking-widest transition-colors">Services</a>
              <a href="#" className="text-[12px] font-black text-white/60 hover:text-white uppercase tracking-widest transition-colors">Rebates</a>
              <a href="#" className="text-[12px] font-black text-white/60 hover:text-white uppercase tracking-widest transition-colors">Heritage Specialists</a>
           </nav>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => handlePersonaSwitch('sarah')}
                className={`px-8 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${activePersona === 'sarah' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                REBATES
              </button>
              <button 
                onClick={() => handlePersonaSwitch('marcus')}
                className={`px-8 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${activePersona === 'marcus' ? 'bg-rose-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                EMERGENCY
              </button>
           </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Landing Content Section */}
        <section className="flex-1 flex flex-col overflow-y-auto custom-scrollbar z-10">
          <div className="p-16 lg:p-24 space-y-24 max-w-5xl">
            
            {/* Hero Section */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
               <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isEmergency ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'}`} />
                  <span className="text-[11px] font-black text-white/80 uppercase tracking-[0.3em]">AI-Powered Dispatch Terminal Active</span>
               </div>
               
               <h2 className="text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
                  {isEmergency ? (
                    <>No Heat? <span className="text-rose-600 not-italic">No Stress.</span><br/>On-Site In 2 Hours Or Less.</>
                  ) : (
                    <>Stop Overpaying To <span className="text-blue-500 not-italic">Heat Your</span><br/>Drafty Toronto Home.</>
                  )}
               </h2>

               <p className="text-xl lg:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl">
                  {isEmergency ? 
                    "Toronto's fastest HVAC response team. No heat? Gas smell? Our AI dispatchers route local techs to your door in minutes, not hours." :
                    "Qualify for up to $10,000 in Ontario Energy Rebates. We specialize in retrofitting heritage properties with ultra-efficient heat pump systems."
                  }
               </p>

               <div className="flex flex-wrap gap-6 pt-6">
                  <button 
                    onClick={isCalling ? handleCallEnd : handleCallStart}
                    className={`group relative flex items-center gap-8 px-12 py-8 rounded-[2rem] font-black text-xl transition-all active:scale-95 uppercase tracking-[0.1em] shadow-2xl overflow-hidden border-2 ${
                      isCalling 
                        ? 'bg-rose-900 border-rose-500 text-white' 
                        : isEmergency 
                          ? 'bg-rose-600 border-rose-400 text-white hover:scale-105' 
                          : 'bg-blue-600 border-blue-400 text-white hover:scale-105'
                    }`}
                  >
                    <div className="relative z-10 flex items-center gap-6">
                      {isCalling ? <Clock4 className="w-8 h-8 animate-spin" /> : <PhoneCall className="w-8 h-8" />}
                      <span>{isCalling ? 'ENDING SESSION...' : `CONNECT WITH ${activePersona.toUpperCase()}`}</span>
                    </div>
                  </button>

                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">Current Wait Time</span>
                    <span className="text-xl font-mono font-black text-emerald-400">00:00:00 <span className="text-white/40 italic font-sans text-sm ml-2">// INSTANT</span></span>
                  </div>
               </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-300">
               <FeatureCard 
                  icon={<Flame />} 
                  title="Heritage Expertise" 
                  desc="Specialized retrofitting for Victorian and Edwardian homes in Old Toronto."
                  color={isEmergency ? 'rose' : 'blue'}
               />
               <FeatureCard 
                  icon={<Snowflake />} 
                  title="Dual Fuel Hybrid" 
                  desc="Intelligent systems that toggle between electric heat and gas for maximum economy."
                  color={isEmergency ? 'rose' : 'blue'}
               />
               <FeatureCard 
                  icon={<Calculator />} 
                  title="Rebate Guarantee" 
                  desc="We handle 100% of the Home Renovation Savings paperwork for you."
                  color={isEmergency ? 'rose' : 'blue'}
               />
               <FeatureCard 
                  icon={<ShieldCheck />} 
                  title="10-Year Protection" 
                  desc="Comprehensive parts and labor warranty on every heritage installation."
                  color={isEmergency ? 'rose' : 'blue'}
               />
            </div>
          </div>

          <footer className="mt-auto h-24 bg-black/80 border-t border-white/10 flex items-center overflow-hidden shrink-0">
             <div className="flex items-center gap-32 animate-marquee whitespace-nowrap px-12">
                <TickerItem label="MISSISSAUGA" status="TECH READY" />
                <TickerItem label="BRAMPTON" status="2H RESPONSE" />
                <TickerItem label="GEORGETOWN" status="TECH READY" />
                <TickerItem label="ETOBICOKE" status="TECH READY" />
                <TickerItem label="DOWNTOWN" status="4H RESPONSE" />
                <TickerItem label="NORTH YORK" status="UPLINK STABLE" />
             </div>
          </footer>
        </section>

        {/* Visual Sidebar */}
        <aside className="hidden xl:flex w-[520px] shrink-0 flex-col bg-black/40 backdrop-blur-3xl border-l border-white/10 z-20 overflow-hidden relative">
            <div className="h-[45%] border-b border-white/10 flex flex-col relative overflow-hidden bg-black/20">
               <div className="absolute inset-0 z-0">
                  <WaveVisualizer isConnected={true} isSpeaking={isCalling} volume={isCalling ? 60 : 15} isEmergency={isEmergency} />
               </div>
               
               <div className="p-10 relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/80 border-2 border-white/10 backdrop-blur-xl shadow-2xl w-fit">
                    <Activity className={`w-5 h-5 ${isEmergency ? 'text-rose-500' : 'text-blue-400'}`} />
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Visual Neural Sync</span>
                  </div>

                  <div className="space-y-4">
                     <div className="text-5xl font-black text-white tabular-nums tracking-tighter">{isCalling ? 'RECORDING' : 'IDLE'}</div>
                     <div className="flex gap-1">
                        {[...Array(20)].map((_, i) => (
                           <div key={i} className={`h-1 flex-1 rounded-full ${i < 12 ? (isEmergency ? 'bg-rose-500' : 'bg-blue-500') : 'bg-white/10'}`} />
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 bg-white overflow-y-auto custom-scrollbar">
                <InfoPanel lead={leadDetails} isConnected={true} />
            </div>
        </aside>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 20px; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }: any) => (
  <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group">
     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all ${color === 'rose' ? 'bg-rose-600/20 text-rose-500 border border-rose-500/30' : 'bg-blue-600/20 text-blue-500 border border-blue-500/30'}`}>
        {React.cloneElement(icon, { className: 'w-7 h-7' })}
     </div>
     <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-3 italic">{title}</h4>
     <p className="text-lg text-white/50 leading-relaxed">{desc}</p>
     <div className="mt-8 flex items-center gap-4 text-white/40 group-hover:text-white transition-colors cursor-pointer">
        <span className="text-[11px] font-black uppercase tracking-widest">Learn More</span>
        <ChevronRight className="w-4 h-4" />
     </div>
  </div>
);

const TickerItem = ({ label, status }: any) => (
  <div className="flex items-center gap-8">
    <span className="text-[14px] font-black text-white/60 uppercase tracking-[0.2em]">{label}</span>
    <span className="text-[16px] font-black text-emerald-400 uppercase tracking-tighter">{status}</span>
    <div className="w-2 h-2 rounded-full bg-white/20" />
  </div>
);

export default App;
