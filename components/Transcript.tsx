
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Terminal, CheckCircle2, Sparkles, Cpu } from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
}

export const Transcript: React.FC<TranscriptProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRoleConfig = (role: 'user' | 'agent' | 'system') => {
    switch (role) {
      case 'user':
        return {
          label: 'INCOMING CALLER',
          icon: <User className="w-4 h-4" />,
          avatarClass: 'bg-slate-800 text-slate-400 border border-white/10',
          contentClass: 'text-slate-300 font-medium'
        };
      case 'agent':
        return {
          label: 'DISPATCH: MELISSA',
          icon: <Bot className="w-4 h-4" />,
          avatarClass: 'bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] border border-blue-400 ring-4 ring-blue-500/10',
          contentClass: 'text-white font-semibold bg-gradient-to-r from-blue-600/[0.08] to-transparent border border-blue-500/20 p-5 rounded-2xl shadow-[inset_0_0_40px_rgba(37,99,235,0.05)]'
        };
      case 'system':
        return {
          label: 'SYSTEM PROTOCOL',
          icon: <Cpu className="w-3.5 h-3.5" />,
          avatarClass: 'bg-black text-slate-700 border border-white/5',
          contentClass: 'text-slate-600 italic font-sans text-xs'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-10 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
             <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <Terminal className="w-12 h-12 text-blue-500 relative" />
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.8em] text-blue-500">Establishing Secure Uplink</span>
          </div>
        )}
        
        {messages.map((msg, idx) => {
          const config = getRoleConfig(msg.role);

          return (
            <div key={msg.id} className="flex gap-8 animate-in fade-in slide-in-from-left-4 duration-700 group">
              {/* Chronology Column */}
              <div className="flex flex-col items-center gap-4 pt-1.5">
                 <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 group-hover:scale-110 relative ${config.avatarClass}`}>
                   {config.icon}
                   {msg.role === 'agent' && (
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#020617] shadow-lg">
                        <Sparkles className="w-2 h-2 text-white" />
                     </div>
                   )}
                 </div>
                 <div className="w-px flex-1 bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent min-h-[40px]" />
              </div>
              
              {/* Content Column */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${msg.role === 'agent' ? 'text-blue-400' : 'text-slate-500'}`}>
                        {msg.role === 'agent' && <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />}
                        {config.label}
                      </span>
                      {msg.role === 'agent' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/50" />}
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[9px] text-slate-700 font-bold uppercase tracking-widest font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                   </div>
                </div>
                
                <div className={`text-[15px] leading-[1.7] tracking-tight transition-all duration-500 ${config.contentClass}`}>
                  {msg.text}
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
