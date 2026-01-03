import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Terminal, Sparkles, Cpu } from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
}

export const Transcript: React.FC<TranscriptProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col font-mono text-sm overflow-hidden bg-transparent">
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-6 opacity-40">
            <div className="w-16 h-16 rounded-3xl border-2 border-dashed border-slate-700 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                 <Sparkles className="w-8 h-8" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.4em]">Initialize Neural Uplink</span>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-center gap-3 mb-1 opacity-70 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shadow-sm ${
                msg.role === 'agent' 
                  ? 'bg-sky-500/20 border border-sky-500/30 text-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.3)]' 
                  : 'bg-white/5 border border-white/10 text-slate-500'
              }`}>
                {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : msg.role === 'system' ? <Terminal className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-sans ${msg.role === 'agent' ? 'text-sky-400' : 'text-slate-500'}`}>
                {msg.role === 'user' ? 'Lead Subject' : msg.role === 'system' ? 'Kernel Event' : 'Marcus AI Agent'}
              </span>
            </div>
            
            <div className={`max-w-[85%] px-6 py-4 rounded-[1.5rem] transition-all duration-700 animate-in fade-in slide-in-from-bottom-4 shadow-xl leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-sky-500 text-white border-0 rounded-tr-none shadow-sky-500/10' 
                : msg.role === 'system' 
                  ? 'bg-transparent text-slate-500 text-xs italic border-l-2 border-slate-800 rounded-none'
                  : 'bg-sky-950/30 text-slate-100 border border-sky-500/20 rounded-tl-none backdrop-blur-md shadow-[0_0_20px_rgba(14,165,233,0.05)]'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};