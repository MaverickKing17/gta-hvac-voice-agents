
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
          avatarClass: 'bg-white text-slate-400 border border-slate-200 shadow-sm',
          contentClass: 'text-slate-600 font-medium bg-white border border-slate-200/50 p-5 rounded-2xl shadow-sm'
        };
      case 'agent':
        return {
          label: 'DISPATCH: MELISSA',
          icon: <Bot className="w-4 h-4" />,
          avatarClass: 'bg-blue-600 text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)]',
          contentClass: 'text-slate-900 font-semibold bg-blue-50/50 border border-blue-100 p-5 rounded-2xl shadow-[0_10px_20px_-10px_rgba(59,130,246,0.1)]'
        };
      case 'system':
        return {
          label: 'SYSTEM PROTOCOL',
          icon: <Cpu className="w-3.5 h-3.5" />,
          avatarClass: 'bg-slate-100 text-slate-400 border border-slate-200',
          contentClass: 'text-slate-400 italic font-sans text-xs pl-4 border-l-2 border-slate-200'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-40">
             <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-3xl bg-white border border-slate-100 shadow-xl flex items-center justify-center text-blue-500">
                  <Terminal className="w-8 h-8" />
                </div>
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-400">Waiting for Uplink</span>
          </div>
        )}
        
        {messages.map((msg, idx) => {
          const config = getRoleConfig(msg.role);

          return (
            <div key={msg.id} className="flex gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500 group">
              {/* Chronology Column */}
              <div className="flex flex-col items-center gap-4 pt-1.5">
                 <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-110 relative ${config.avatarClass}`}>
                   {config.icon}
                   {msg.role === 'agent' && (
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <Sparkles className="w-2 h-2 text-white" />
                     </div>
                   )}
                 </div>
                 <div className="w-px flex-1 bg-slate-200 min-h-[40px]" />
              </div>
              
              {/* Content Column */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${msg.role === 'agent' ? 'text-blue-600' : 'text-slate-400'}`}>
                        {msg.role === 'agent' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />}
                        {config.label}
                      </span>
                   </div>
                   <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                   </span>
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
