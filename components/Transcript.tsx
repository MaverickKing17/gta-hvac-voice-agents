
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Terminal, CheckCircle2, Sparkles, Cpu, ShieldCheck } from 'lucide-react';

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
          contentClass: 'text-slate-600 font-medium bg-white border border-slate-200/50 p-7 rounded-3xl shadow-sm'
        };
      case 'agent':
        return {
          label: 'DISPATCH: MELISSA',
          icon: <Bot className="w-4 h-4" />,
          avatarClass: 'bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] ring-4 ring-blue-50',
          contentClass: 'text-slate-900 font-semibold bg-blue-50/80 border border-blue-100 p-7 rounded-3xl shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] backdrop-blur-sm'
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
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                        <Sparkles className="w-2 h-2 text-white" />
                     </div>
                   )}
                 </div>
                 <div className="w-px flex-1 bg-slate-200 min-h-[40px]" />
              </div>
              
              {/* Content Column */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${msg.role === 'agent' ? 'text-blue-600' : 'text-slate-400'}`}>
                        {msg.role === 'agent' && (
                          <div className="flex items-center gap-2 px-2 py-0.5 bg-blue-600 rounded-md mr-1 shadow-sm">
                            <ShieldCheck className="w-2.5 h-2.5 text-white" />
                            <span className="text-[8px] text-white font-black">AI CORE</span>
                          </div>
                        )}
                        {config.label}
                      </span>
                   </div>
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[18px] leading-[1.9] tracking-normal transition-all duration-500 ${config.contentClass}`}>
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
