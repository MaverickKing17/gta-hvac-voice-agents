
import React from 'react';
import { LeadDetails } from '../types';
import { ShieldCheck, User, Phone, MapPin, Database, Zap, Cpu, ArrowRight } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="h-full flex flex-col p-12 relative overflow-hidden">
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">Dispatch Intelligence</h3>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">
            Live Acquisition
        </h2>
      </div>

      <div className="space-y-1 flex-1">
        <LeadField 
          label="Subject Identity" 
          value={lead.name} 
          icon={<User className="w-5 h-5" />} 
          active={isConnected}
        />
        <LeadField 
          label="Secure Contact Link" 
          value={lead.phone} 
          icon={<Phone className="w-5 h-5" />} 
          active={isConnected}
        />
        <LeadField 
          label="Geospatial Address" 
          value={lead.address} 
          icon={<MapPin className="w-5 h-5" />} 
          active={isConnected}
        />

        <div className="pt-8 grid grid-cols-2 gap-4">
             <div className={`group p-6 rounded-2xl border transition-all duration-700 ${lead.type ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                   <Database className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                   <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Inquiry Vector</div>
                </div>
                <div className={`text-sm font-black uppercase tracking-tight ${lead.type === 'emergency' ? 'text-rose-600' : lead.type ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                  {lead.type || 'STANDBY'}
                </div>
             </div>
             
             <div className={`group p-6 rounded-2xl border transition-all duration-700 ${lead.heatingSource ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                   <Zap className="w-3 h-3 text-slate-400 group-hover:text-amber-500 transition-colors" />
                   <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Energy Grid</div>
                </div>
                <div className={`text-sm font-black uppercase tracking-tight ${lead.heatingSource ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                  {lead.heatingSource || 'DETECTING'}
                </div>
             </div>
        </div>
      </div>

      {/* Verified Rebate Card - "Holographic" Certificate Style */}
      <div className="mt-10 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-sky-400 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
               <Cpu className="w-32 h-32 text-blue-600" />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">2026 HRS Incentive Program</span>
                    <div className="px-2 py-1 bg-emerald-50 rounded-lg flex items-center gap-1.5">
                       <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                       <span className="text-[8px] font-black text-emerald-600 uppercase">Verified</span>
                    </div>
                </div>
                <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">
                      ${lead.heatingSource === 'electric' ? '7,500' : lead.heatingSource === 'gas' ? '2,000' : '7,500'}
                    </span>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Grant Cap</span>
                </div>
                <button className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                  Generate Formal Proposal <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const LeadField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`group flex items-center justify-between py-5 transition-all duration-500 border-b border-slate-100`}>
        <div className="flex items-center gap-6">
            <div className={`p-2.5 rounded-xl transition-all duration-500 ${value ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mb-0.5">{label}</span>
              <span className={`text-base font-bold transition-all ${value ? 'text-slate-900' : active ? 'text-slate-300 italic' : 'text-slate-200'}`}>
                  {value || (active ? 'Monitoring stream...' : 'Terminal Off')}
              </span>
            </div>
        </div>
        {value && (
          <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-in zoom-in" />
        )}
    </div>
);
