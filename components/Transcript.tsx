
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';

interface TranscriptProps {
  messages: Message[];
}

export const Transcript: React.FC<TranscriptProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col font-sans overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-10 space-y-10 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-800 opacity-20 italic">
            <span className="text-sm font-bold uppercase tracking-[0.5em]">System Ready</span>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${msg.role === 'user' ? 'text-slate-500' : 'text-sky-500'}`}>
              {msg.role === 'user' ? 'Caller' : msg.role === 'agent' ? 'Marcus AI' : 'System'}
            </span>
            
            <div className={`max-w-[80%] text-lg font-medium leading-relaxed ${
              msg.role === 'user' 
                ? 'text-white text-right' 
                : msg.role === 'system' 
                  ? 'text-slate-600 text-sm italic'
                  : 'text-sky-100 bg-sky-500/5 p-6 rounded-3xl border border-sky-500/10'
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
