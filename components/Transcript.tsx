
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { 
  User, 
  Terminal, 
  UserCircle2, 
  AlertTriangle, 
  Hash, 
  Headset, 
  Zap, 
  Radio,
  Activity
} from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
  persona?: 'sarah' | 'mike';
}

export const Transcript: React.FC<TranscriptProps> = ({ messages, persona }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRoleConfig = (role: 'user' | 'agent' | 'system') => {
    switch (role) {
      case 'user':
        return {
          label: 'INCOMING CALLER',
          icon: <User className="w-5 h-5" />,
          avatarClass: 'bg-white/5 text-white/60 border border-white/10 shadow-inner',
          contentClass: 'text-white/80 font-medium bg-white/5 border border-white/10 p-7 rounded-3xl backdrop-blur-md'
        };
      case 'agent':
        const isMike = persona === 'mike';
        return {
          label: isMike ? 'DISPATCH: MIKE' : 'ADVISOR: SARAH',
          icon: isMike ? <Zap className="w-5 h-5 fill-current" /> : <Headset className="w-5 h-5" />,
          avatarClass: isMike 
            ? 'bg-gradient-to-br from-[#ff0000] to-[#990000] text-white shadow-[0_0_25px_rgba(255,0,0,0.5)] border border-rose-400/50 animate-pulse-fast' 
            : 'bg-gradient-to-br from-[#0099ff] to-[#003366] text-white shadow-[0_0_25px_rgba(0,153,255,0.4)] border border-blue-400/50 animate-glow-slow',
          contentClass: isMike
            ? 'text-white font-black bg-[#cc0000]/10 border border-[#cc0000]/20 p-8 rounded-[2rem] shadow-xl border-l-8 border-l-[#cc0000] relative overflow-hidden'
            : 'text-white font-bold bg-[#003366]/20 border border-[#003366]/30 p-8 rounded-[2rem] shadow-xl border-l-8 border-l-[#0099cc] relative overflow-hidden'
        };
      case 'system':
        return {
          label: 'SYSTEM KERNEL',
          icon: <Hash className="w-3.5 h-3.5" />,
          avatarClass: 'bg-white/5 text-white/20 border border-white/5',
          contentClass: 'text-white/30 italic font-mono text-[10px] pl-6 border-l-2 border-white/5 uppercase tracking-[0.2em] py-2'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
             <div className="relative">
                <Terminal className="w-14 h-14 text-white" />
                <div className="absolute inset-0 animate-ping opacity-50"><Terminal className="w-14 h-14 text-white" /></div>
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.8em] text-white">Standby for Link</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';

          return (
            <div key={msg.id} className="flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col items-center pt-1 shrink-0">
                 <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 ${config.avatarClass}`}>
                   {isAgent && (
                     <div className={`absolute -inset-1 rounded-2xl blur-sm opacity-40 transition-all ${persona === 'mike' ? 'bg-rose-500' : 'bg-blue-400'}`} />
                   )}
                   <div className="relative z-10">
                    {config.icon}
                   </div>
                 </div>
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${msg.role === 'agent' ? (persona === 'mike' ? 'text-rose-500' : 'text-[#00ccff]') : 'text-white/30'}`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all ${persona === 'mike' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                           <Activity className={`w-3 h-3 animate-pulse ${persona === 'mike' ? 'text-rose-500' : 'text-blue-400'}`} />
                           <span className={`text-[8px] font-black uppercase tracking-widest ${persona === 'mike' ? 'text-rose-400' : 'text-blue-300'}`}>Live Audio Stream</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[10px] text-white/10 font-black uppercase tracking-widest">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[19px] leading-[1.6] transition-all duration-700 shadow-2xl ${config.contentClass}`}>
                  {isAgent && (
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-20 ${persona === 'mike' ? 'bg-white' : 'bg-blue-300'}`} />
                  )}
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes pulse-fast {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        @keyframes glow-slow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 153, 255, 0.4); }
          50% { box-shadow: 0 0 30px rgba(0, 153, 255, 0.6); }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1s ease-in-out infinite;
        }
        .animate-glow-slow {
          animation: glow-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
