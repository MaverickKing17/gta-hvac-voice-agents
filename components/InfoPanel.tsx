
import React from 'react';
import { LeadDetails } from '../types';
import { 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  BadgeAlert,
  Home,
  Waves,
  Cpu,
  TrendingUp,
  Building2,
  HardHat
} from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  const isHeritage = lead.address?.toLowerCase().includes('heritage') || 
                     lead.heatingSource === 'oil';
  const isEmergency = lead.agentPersona === 'mike' || lead.type === 'emergency';
  const isCommercial = lead.marketType === 'commercial';

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Dynamic Header Banner */}
      <div className={`h-52 relative overflow-hidden flex flex-col justify-end p-12 transition-all duration-1000 ${isEmergency ? 'bg-[#2a0000]' : 'bg-[#001f3f]'}`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(#ffffff08 1.5px, transparent 1.5px), linear-gradient(90deg, #ffffff08 1.5px, transparent 1.5px)`, backgroundSize: '20px 20px' }} />
        <div className={`absolute top-0 right-0 w-80 h-80 blur-[120px] rounded-full -mr-40 -mt-40 transition-colors duration-1000 ${isEmergency ? 'bg-rose-500/30' : 'bg-blue-500/20'}`} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
              <div className={`p-2.5 rounded-xl backdrop-blur-md border ${isEmergency ? 'bg-rose-500/20 border-rose-500/30' : 'bg-blue-500/20 border-blue-500/30'}`}>
                <FileText className={`w-4 h-4 ${isEmergency ? 'text-rose-400' : 'text-blue-400'}`} />
              </div>
              <h3 className={`text-[11px] font-black uppercase tracking-[0.5em] ${isEmergency ? 'text-rose-400/80' : 'text-blue-400/80'}`}>
                Active Dispatch Protocol
              </h3>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none italic flex items-center gap-5">
              {isCommercial ? 'Enterprise Ticket' : 'Residential Ticket'}
              <span className={`inline-block w-4 h-4 rounded-full animate-pulse ${isConnected ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]' : 'bg-slate-700'}`} />
          </h2>
        </div>
      </div>

      <div className="p-12 space-y-12">
        {/* Market-Specific Badges */}
        <div className="flex flex-wrap gap-4">
          {isCommercial && (
            <div className="px-5 py-2.5 bg-[#001f3f] text-white rounded-2xl flex items-center gap-3 shadow-2xl animate-in zoom-in duration-500 border border-white/10">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Commercial Facility Protocol</span>
            </div>
          )}
          {isHeritage && (
            <div className="px-5 py-2.5 bg-amber-50 text-amber-700 rounded-2xl flex items-center gap-3 shadow-md animate-in slide-in-from-left duration-500 border border-amber-100">
              <Home className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Heritage Specialist Profile</span>
            </div>
          )}
          <div className="px-5 py-2.5 bg-slate-100 text-slate-500 rounded-2xl flex items-center gap-3 border border-slate-200">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Neural Analysis Active</span>
          </div>
        </div>

        {/* Tactical Lead Fields */}
        <div className="space-y-2">
          <TacticalField 
            label="Customer Identity" 
            value={lead.name} 
            icon={<User className="w-5 h-5" />} 
            active={isConnected}
          />
          <TacticalField 
            label="Verified Contact" 
            value={lead.phone} 
            icon={<Phone className="w-5 h-5" />} 
            active={isConnected}
          />
          <TacticalField 
            label="Dispatch Coordinates" 
            value={lead.address} 
            icon={<MapPin className="w-5 h-5" />} 
            active={isConnected}
          />

          <div className="pt-12 grid grid-cols-2 gap-8">
               <StatusCard 
                  label="Inquiry Classification"
                  value={lead.type || 'Monitoring...'}
                  icon={<BadgeAlert className="w-4 h-4" />}
                  isActive={!!lead.type}
                  isEmergency={isEmergency}
               />
               <StatusCard 
                  label="Energy Vector"
                  value={lead.heatingSource || 'Awaiting Data'}
                  icon={<Zap className="w-4 h-4" />}
                  isActive={!!lead.heatingSource}
                  isEmergency={false}
               />
          </div>
        </div>

        {/* Market IQ: Rebates vs. Commercial Logistics */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-5">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">Incentive & Logistics Engine</span>
            <TrendingUp className="w-4 h-4 text-slate-300" />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {isCommercial ? (
              <LogisticsTier 
                title="Preventative Maintenance Contract"
                subtitle="Quarterly RTU Diagnostic Qualification"
                icon={<HardHat className="w-5 h-5" />}
                status={true}
              />
            ) : (
              <LogisticsTier 
                title="HRS Heat Pump Grant (2026)"
                subtitle="Electric-to-Hydronic Hybrid Conversion"
                icon={<CheckCircle2 className="w-5 h-5" />}
                status={lead.heatingSource === 'electric' || lead.heatingSource === 'oil'}
              />
            )}
            <LogisticsTier 
              title="Fixed Price Quote Guarantee"
              subtitle="Toronto Air Systems Standard Protocol"
              icon={<ShieldCheck className="w-5 h-5" />}
              status={true}
            />
          </div>
        </div>

        {/* Mission Critical Call to Action */}
        <div className="relative group pt-8">
          <div className={`absolute -inset-2 rounded-[3rem] blur-3xl opacity-20 transition duration-1000 ${isEmergency ? 'bg-rose-600' : 'bg-blue-600'}`}></div>
          <div className="relative bg-[#001428] border border-white/5 p-12 rounded-[3rem] shadow-2xl overflow-hidden group/btn">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-[80px] -mr-20 -mt-20" />
              
              <div className="relative z-10 flex flex-col gap-10">
                  <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.5em]">Authorization Token</span>
                        <div className="flex items-center gap-3">
                           <ShieldCheck className="w-5 h-5 text-emerald-400" />
                           <span className="text-sm font-bold text-white uppercase tracking-[0.2em] font-mono">READY FOR DISPATCH</span>
                        </div>
                      </div>
                      <Waves className="w-8 h-8 text-white/10" />
                  </div>

                  <div className="flex items-baseline gap-6 border-l-2 border-white/10 pl-8 py-4">
                      <span className="text-6xl font-black text-white tracking-tighter leading-none font-mono">
                        {lead.heatingSource ? (lead.heatingSource === 'gas' ? 'LOW-G' : 'MAX-G') : 'SYNC...'}
                      </span>
                      <span className="text-[12px] text-white/30 font-bold uppercase tracking-[0.3em]">Grant Tier</span>
                  </div>

                  <button className={`w-full py-7 rounded-[1.5rem] text-[15px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-2xl group-active:scale-95 ${
                    isEmergency 
                    ? 'bg-[#cc0000] text-white hover:bg-[#b00000] shadow-[#cc0000]/20' 
                    : 'bg-white text-[#001428] hover:bg-slate-100 shadow-blue-900/10'
                  }`}>
                    Execute Booking Sequence <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-3 transition-transform duration-500" />
                  </button>
                  
                  <div className="text-[11px] text-white/20 text-center leading-relaxed font-bold uppercase tracking-[0.3em] px-12">
                    Certified Toronto Operations Protocol Node-88
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`p-8 rounded-3xl border-2 transition-all duration-700 relative overflow-hidden ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-100' : 'bg-blue-50/50 border-blue-100') 
      : 'bg-slate-50/50 border-slate-100'
  }`}>
    <div className="flex items-center gap-4 mb-6">
       <div className={`p-2.5 rounded-xl ${isActive ? (isEmergency ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600') : 'bg-slate-100 text-slate-300'}`}>
          {icon}
       </div>
       <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{label}</div>
    </div>
    <div className={`text-xl font-black uppercase tracking-tighter font-mono ${
      isActive 
        ? (isEmergency ? 'text-rose-600' : 'text-[#001f3f]') 
        : 'text-slate-300 italic'
    }`}>
      {value}
    </div>
  </div>
);

const LogisticsTier = ({ title, subtitle, icon, status }: any) => (
  <div className={`p-8 rounded-3xl border-2 transition-all duration-500 flex items-center justify-between ${
    status ? 'bg-[#001f3f] border-[#001f3f] shadow-2xl scale-[1.02]' : 'bg-white border-slate-100'
  }`}>
    <div className="flex items-center gap-6">
       <div className={`p-3.5 rounded-2xl ${status ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-100 text-slate-300'}`}>
          {icon}
       </div>
       <div className="flex flex-col gap-1">
          <span className={`text-[12px] font-black uppercase tracking-widest ${status ? 'text-white' : 'text-slate-800'}`}>{title}</span>
          <span className={`text-[10px] font-bold ${status ? 'text-blue-400/80' : 'text-slate-400'}`}>{subtitle}</span>
       </div>
    </div>
    {status && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />}
  </div>
);

const TacticalField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className="group">
        <div className={`flex items-center justify-between py-10 transition-all duration-500 border-b border-slate-100 ${value ? 'border-blue-100 translate-x-1' : ''}`}>
            <div className="flex items-center gap-10">
                <div className={`p-5 rounded-2xl transition-all duration-1000 flex items-center justify-center ${
                  value ? 'bg-[#001f3f] text-white shadow-2xl scale-110' : 'bg-slate-50 text-slate-300'
                }`}>
                    {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7' })}
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-2">{label}</span>
                  <span className={`text-3xl font-black tracking-tighter transition-all font-mono ${
                    value ? 'text-[#001f3f]' : active ? 'text-slate-200 italic animate-pulse' : 'text-slate-200'
                  }`}>
                      {value || (active ? 'LISTENING...' : 'OFFLINE')}
                  </span>
                </div>
            </div>
            {value && (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-1">
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">VERIFIED</span>
                   <span className="text-[8px] font-bold text-slate-300 font-mono tracking-widest">SEQ-0x44</span>
                </div>
                <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            )}
        </div>
    </div>
);
