import React, { useState } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { DashboardCharts } from './components/DashboardCharts';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { Mic, MicOff, PhoneCall, AlertCircle, Snowflake, Flame, Activity, Sliders } from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({});
  
  const handleLeadUpdate = (details: Partial<LeadDetails>) => {
    setLeadDetails(prev => ({ ...prev, ...details }));
  };

  const { 
    connect, 
    disconnect, 
    isConnected, 
    isSpeaking, 
    volume, 
    error,
    micSensitivity,
    setMicSensitivity,
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  const toggleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-sky-500/30 overflow-hidden relative">
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-radial-gradient from-sky-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                <Snowflake className="w-6 h-6 text-white" />
             </div>
             <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    Toronto Air Systems
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-sky-400 border border-sky-500/20">AI DISPATCH</span>
                </h1>
                <p className="text-xs text-slate-400 font-mono">Heritage Heating & Rebate Specialist</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 bg-slate-900/50 rounded-full px-4 py-1.5 border border-white/5">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-sky-500 animate-pulse' : 'bg-slate-600'}`} />
                <span className="text-xs font-mono text-slate-400 uppercase">
                    {isConnected ? 'Marcus Online' : 'Offline'}
                </span>
             </div>
             <button 
                className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors border border-white/10 font-medium"
                onClick={() => window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank')}
            >
                API Status
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-6 px-4 md:px-8 max-w-[1600px] mx-auto h-screen flex flex-col gap-6 relative z-10">
        
        {error && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-3 shadow-xl animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{error}</span>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* LEFT COLUMN: VISUALIZER & CONTROLS */}
            <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                
                {/* Main Visualizer Card */}
                <div className="relative flex-[2] bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm group">
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-50" />
                    
                    {/* Top Bar Overlay */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
                         <div className="flex flex-col">
                            <span className="text-xs font-mono text-sky-400/80 tracking-widest uppercase mb-1">Audio Stream</span>
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-sky-500" />
                                <span className="text-lg font-bold text-white tracking-tight">
                                    {isSpeaking ? 'Marcus Speaking' : isConnected ? 'Listening...' : 'Standby'}
                                </span>
                            </div>
                         </div>
                         
                         {/* Sensitivity Control */}
                         <div className="flex flex-col items-end gap-1.5 group/slider">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 transition-colors hover:border-sky-500/30">
                                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.01"
                                    value={micSensitivity}
                                    onChange={(e) => setMicSensitivity(parseFloat(e.target.value))}
                                    className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                                />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono tracking-wider opacity-0 group-hover/slider:opacity-100 transition-opacity">GAIN CONTROL</span>
                         </div>
                    </div>

                    {/* Canvas Container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                        <div className="w-full h-full px-4 md:px-12 pb-24">
                            <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                        </div>
                    </div>

                    {/* Big Connect Button */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
                        <button
                            onClick={toggleConnection}
                            className={`
                                group relative flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.3)]
                                ${isConnected 
                                    ? 'bg-red-500/10 border-2 border-red-500/50 hover:bg-red-500/20' 
                                    : 'bg-sky-500 hover:bg-sky-400 border-0 hover:scale-105 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]'}
                            `}
                        >
                            {isConnected ? (
                                <MicOff className="w-8 h-8 text-red-400 group-hover:scale-90 transition-transform" />
                            ) : (
                                <PhoneCall className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            )}
                            
                            {/* Ripple Effect for Call Button */}
                            {!isConnected && (
                                <span className="absolute inset-0 rounded-2xl border border-sky-500/50 animate-ping-slow pointer-events-none" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Charts & Transcript */}
                <div className="flex-1 min-h-[250px] grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-sm overflow-hidden flex flex-col">
                        <DashboardCharts />
                     </div>
                     <div className="h-full">
                        <Transcript messages={messages} />
                     </div>
                </div>
            </div>

            {/* RIGHT COLUMN: LEAD DATA */}
            <div className="lg:col-span-4 h-full min-h-[600px]">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
            </div>
        </div>
      </main>
      
      {/* Global CSS for animations */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .animate-ping-slow { animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default App;