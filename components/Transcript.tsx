
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { 
  User, 
  Terminal, 
  Headset, 
  Zap, 
  Activity,
  ShieldCheck,
  PhoneForwarded,
  Sparkles,
  AlertTriangle,
  Info
} from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
  persona?: 'sarah' | 'marcus';
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
          label: 'CUSTOMER',
          icon: <User className="w-6 h-6" />,
          avatarClass: 'bg-white/30 text-white border-2 border-white/50 w-16 h-16 rounded-2xl shadow-xl',
          contentClass: 'text-white font-semibold bg-white/10 border-2 border-white/30 p-8 rounded-3xl backdrop-blur-md border-l-8 border-l-white/60 shadow-2xl'
        };
      case 'agent':
        const isMarcus = persona === 'marcus';
        return {
          label: isMarcus ? 'DISPATCH: MARCUS' : 'ADVISOR: SARAH',
          icon: isMarcus ? <Zap className="w-6 h-6 fill-current" /> : <Headset className="w-6 h-6" />,
          avatarClass: isMarcus 
            ? 'bg-rose-600 text-white shadow-2xl w-16 h-16 rounded-2xl border-2 border-rose-400' 
            : 'bg-blue-600 text-white shadow-2xl w-16 h-16 rounded-2xl border-2 border-blue-400',
          contentClass: isMarcus
            ? 'text-white font-bold bg-rose-950/50 border-2 border-rose-500/60 p-10 rounded-3xl border-l-[16px] border-l-rose-600 shadow-2xl'
            : 'text-white font-bold bg-blue-950/50 border-2 border-blue-500/60 p-10 rounded-3xl border-l-[16px] border-l-blue-600 shadow-2xl'
        };
      case 'system':
        return {
          label: 'SYSTEM LOG',
          icon: <Info className="w-4 h-4" />,
          avatarClass: 'bg-white/20 text-white border border-white/40 w-10 h-10 rounded-xl mt-2',
          contentClass: 'text-white font-sans text-sm pl-6 border-l-4 border-white/50 py-3 italic bg-white/10 rounded-r-2xl shadow-lg'
        };
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-60">
             <Activity className="w-20 h-20 text-white animate-pulse" />
             <span className="text-[14px] font-black uppercase tracking-[0.8em] text-white ml-[0.8em]">AWAITING TRANSMISSION</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isSystem = msg.role === 'system';
          const isMarcus = persona === 'marcus';

          return (
            <div key={msg.id} className={`flex gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700 ${isSystem ? 'opacity-100 scale-[0.98]' : ''}`}>
              <div className="flex flex-col items-center pt-2 shrink-0">
                 <div className={`relative flex items-center justify-center transition-all ${config.avatarClass}`}>
                   {isAgent && (
                     <div className={`absolute -top-2 -right-2 p-2 bg-white rounded-xl shadow-2xl flex items-center justify-center ring-4 ring-black/60`}>
                       {isMarcus ? <AlertTriangle className="w-4 h-4 text-rose-600" /> : <ShieldCheck className="w-4 h-4 text-blue-600" />}
                     </div>
                   )}
                   <div className="relative z-10">
                    {config.icon}
                   </div>
                 </div>
              </div>
              
              <div className="flex-1">
                <div className={`flex items-center justify-between mb-4`}>
                   <div className="flex items-center gap-4">
                      <span className={`text-[12px] font-black uppercase tracking-widest ${
                        isAgent ? (isMarcus ? 'text-rose-400' : 'text-blue-300') : 
                        isSystem ? 'text-white/90' : 'text-white'
                      }`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full border-2 border-white/30 transition-all ${isMarcus ? 'bg-rose-500/40' : 'bg-blue-500/40'}`}>
                           <div className={`w-2 h-2 rounded-full animate-pulse ${isMarcus ? 'bg-rose-400' : 'bg-blue-400'}`} />
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE AUDIO</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[11px] text-white/70 font-black uppercase tracking-widest tabular-nums">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`transition-all duration-700 relative ${
                  isSystem ? '' : 'text-3xl leading-snug'
                } ${config.contentClass}`}>
                  <span className="relative z-10">{msg.text}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
