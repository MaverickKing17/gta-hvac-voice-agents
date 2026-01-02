import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Terminal } from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
}

export const Transcript: React.FC<TranscriptProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-950/50 rounded-xl border border-white/10 overflow-hidden backdrop-blur-md">
      <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-sky-400" />
        <span className="text-xs font-mono text-sky-400/80 tracking-widest uppercase">Live Feed</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-slate-500 text-center mt-10 italic">
            Ready to initialize session...
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role !== 'user' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'system' ? 'bg-slate-800 text-slate-400' : 'bg-sky-500/20 text-sky-400'}`}>
                {msg.role === 'system' ? <Terminal className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
            )}
            
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-slate-200 border border-slate-700' 
                : msg.role === 'system' 
                  ? 'bg-transparent text-slate-500 text-xs w-full'
                  : 'bg-sky-950/30 text-sky-100 border border-sky-500/30'
            }`}>
              {msg.text}
            </div>
            
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};