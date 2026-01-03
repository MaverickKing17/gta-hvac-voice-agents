
import React from 'react';
import { LeadDetails } from '../types';
import { ShieldCheck, User, Phone, MapPin, Zap, CheckCircle2 } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="h-full flex flex-col p-12 relative overflow-hidden">
      
      <div className="mb-12">
        <h3 className="text-xs font-black text-sky-500 uppercase tracking-[0.3em] mb-2">Lead Processing</h3>
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
            Intelligence <br/> Unit
        </h2>
      </div>

      <div className="space-y-6 flex-1">
        <DataRow 
          label="Customer Name" 
          value={lead.name} 
          icon={<User className="w-5 h-5" />} 
          verified={!!lead.name}
        />
        <DataRow 
          label="Contact Number" 
          value={lead.phone} 
          icon={<Phone className="w-5 h-5" />} 
          verified={!!lead.phone}
        />
        <DataRow 
          label="Service Address" 
          value={lead.address} 
          icon={<MapPin className="w-5 h-5" />} 
          verified={!!lead.address}
        />

        <div className="pt-4 grid grid-cols-1 gap-4">
             <div className={`p-6 rounded-3xl border transition-all duration-700 ${lead.type ? 'bg-sky-500/5 border-sky-500/30' : 'bg-white/[0.02] border-white/5'}`}>
                <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Inquiry Type</div>
                <div className="text-xl font-black text-white uppercase tracking-tighter">
                  {lead.type || <span className="text-slate-800 italic">Waiting...</span>}
                </div>
             </div>
             
             <div className={`p-6 rounded-3xl border transition-all duration-700 ${lead.heatingSource ? 'bg-indigo-500/5 border-indigo-500/30' : 'bg-white/[0.02] border-white/5'}`}>
                <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Heating System</div>
                <div className="text-xl font-black text-white uppercase tracking-tighter">
                  {lead.heatingSource || <span className="text-slate-800 italic">Detecting...</span>}
                </div>
             </div>
        </div>
      </div>

      {/* Rebate Highlight */}
      <div className="mt-12 p-8 bg-sky-500 border border-sky-400 rounded-3xl shadow-[0_20px_40px_rgba(14,165,233,0.3)]">
        <div className="text-[10px] font-black text-sky-100 uppercase tracking-[0.2em] mb-2">Estimated 2026 Rebate</div>
        <div className="text-5xl font-black text-white tracking-tighter">$7,500</div>
        <div className="mt-4 flex items-center gap-2 text-sky-100 text-[10px] font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            HRS Program Qualified
        </div>
      </div>
    </div>
  );
};

const DataRow = ({ label, value, icon, verified }: { label: string, value?: string, icon: React.ReactNode, verified: boolean }) => (
    <div className={`flex items-center justify-between py-4 border-b transition-all duration-500 ${verified ? 'border-sky-500/30' : 'border-white/5'}`}>
        <div className="flex items-center gap-6">
            <div className={`${verified ? 'text-sky-400' : 'text-slate-700'}`}>
                {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{label}</span>
              <span className={`text-lg font-bold transition-all ${verified ? 'text-white' : 'text-slate-800 italic'}`}>
                  {value || 'Awaiting input...'}
              </span>
            </div>
        </div>
        {verified && (
          <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in" />
        )}
    </div>
);
