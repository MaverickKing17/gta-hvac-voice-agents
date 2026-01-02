import React from 'react';
import { LeadDetails } from '../types';
import { CheckCircle, Clock, Thermometer, User, Phone, ClipboardList, MapPin, Zap } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col shadow-2xl relative overflow-hidden group">
      {/* Decorative gradients */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl group-hover:bg-sky-500/30 transition-all duration-1000" />
      
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 tracking-tight">
        <div className="p-1.5 bg-sky-500/20 rounded-lg">
             <ClipboardList className="w-5 h-5 text-sky-400" />
        </div>
        Lead Capture Intelligence
      </h3>

      <div className="space-y-4 flex-1">
        {/* Status Card */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col gap-3">
           <div className="flex items-center justify-between">
             <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Status</span>
             <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-sky-400 animate-pulse' : 'bg-red-500'}`} />
                 <span className={`text-xs font-bold ${isConnected ? 'text-sky-400' : 'text-slate-500'}`}>
                    {isConnected ? 'DISPATCH ONLINE' : 'OFFLINE'}
                 </span>
             </div>
           </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-32 bg-slate-800/50 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center group/map">
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            {lead.address ? (
                 <div className="flex flex-col items-center gap-1 z-10 animate-in fade-in zoom-in duration-500">
                    <MapPin className="w-8 h-8 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <span className="text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">Location Detected</span>
                 </div>
            ) : (
                 <div className="flex flex-col items-center gap-2 z-10 opacity-50">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-600 border-dashed animate-[spin_10s_linear_infinite]" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Scanning Address...</span>
                 </div>
            )}
        </div>

        {/* Data Fields */}
        <div className="space-y-3">
            <Field label="Customer" value={lead.name} icon={<User className="w-3.5 h-3.5" />} />
            <Field label="Contact" value={lead.phone} icon={<Phone className="w-3.5 h-3.5" />} />
            <Field label="Location" value={lead.address} icon={<MapPin className="w-3.5 h-3.5" />} />
            
            <div className="grid grid-cols-2 gap-3 mt-2">
                 <div className={`p-3 rounded-xl border ${lead.type ? 'bg-sky-500/10 border-sky-500/30' : 'bg-white/5 border-white/5'}`}>
                    <div className="text-[10px] text-slate-400 uppercase mb-1">Type</div>
                    <div className="text-sm font-medium text-white capitalize truncate">{lead.type || '-'}</div>
                 </div>
                 <div className={`p-3 rounded-xl border ${lead.heatingSource ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/5'}`}>
                    <div className="text-[10px] text-slate-400 uppercase mb-1">Heating</div>
                    <div className="text-sm font-medium text-white capitalize truncate">{lead.heatingSource || '-'}</div>
                 </div>
            </div>
        </div>
      </div>
      
      {/* Rebate Footer */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Campaign</div>
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white">2026 HRS</div>
        </div>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-sky-400" />
            </div>
            <div>
                <div className="text-xs text-slate-400">Potential Savings</div>
                <div className="text-xl font-bold text-white tracking-tight">$7,500.00</div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, icon }: { label: string, value?: string, icon: React.ReactNode }) => (
    <div className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-500 ${value ? 'bg-slate-800/80 border-slate-700 shadow-lg' : 'bg-white/5 border-transparent'}`}>
        <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${value ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-700/50 text-slate-500'}`}>
                {icon}
            </div>
            <span className="text-xs font-medium text-slate-400">{label}</span>
        </div>
        <span className={`text-sm font-semibold ${value ? 'text-white' : 'text-slate-600'}`}>
            {value || '...'}
        </span>
    </div>
);