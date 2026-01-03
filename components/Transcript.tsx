
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Terminal, Sparkles, Cpu, ShieldCheck, UserCircle2, AlertTriangle } from 'lucide-react';

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
          icon: <User className="w-4 h-4" />,
          avatarClass: 'bg-white text-slate-400 border border-slate-200',
          contentClass: 'text-slate-600 font-medium bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm'
        };
      case 'agent':
        const isMike = persona === 'mike';
        return {
          label: isMike ? 'DISPATCH: MIKE' : 'ADVISOR: SARAH',
          icon: isMike ? <AlertTriangle className="w-4 h-4" /> : <UserCircle2 className="w-4 h-4" />,
          avatarClass: isMike 
            ? 'bg-[#cc0000] text-white shadow-xl ring-4 ring-rose-100' 
            : 'bg-[#003366] text-white shadow-xl ring-4 ring-blue-100',
          contentClass: isMike
            ? 'text-slate-900 font-bold bg-rose-50 border border-rose-200 p-7 rounded-2xl shadow-lg border-l-8 border-l-[#cc0000]'
            : 'text-slate-900 font-semibold bg-blue-50/50 border border-blue-200 p-7 rounded-2xl shadow-lg border-l-8 border-l-[#003366]'
        };
      case 'system':
        return {
          label: 'CORE PROTOCOL',
          icon: <Cpu className="w-3.5 h-3.5" />,
          avatarClass: 'bg-slate-100 text-slate-400',
          contentClass: 'text-slate-400 italic font-sans text-xs pl-4 border-l-2 border-slate-200'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-10 space-y-10 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30">
             <Terminal className="w-10 h-10 text-slate-300" />
             <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-400">Waiting for Link</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);

          return (
            <div key={msg.id} className="flex gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col items-center gap-3 pt-1">
                 <div className={`flex items-center justify-center w-9 h-9 rounded-xl shadow-sm ${config.avatarClass}`}>
                   {config.icon}
                 </div>
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${msg.role === 'agent' ? (persona === 'mike' ? 'text-rose-600' : 'text-[#003366]') : 'text-slate-400'}`}>
                        {config.label}
                      </span>
                   </div>
                   <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest italic">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[17px] leading-[1.7] transition-all duration-500 ${config.contentClass}`}>
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
