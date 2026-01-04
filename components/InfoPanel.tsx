
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
  BadgeAlert,
  Home,
  Building2,
  Navigation,
  FileText
} from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  const isHeritage = lead.address?.toLowerCase().includes('heritage') || 
                     lead.heatingSource === 'oil';
  const isMarcus = lead.agentPersona === 'marcus';
  const isEmergency = isMarcus || lead.type === 'emergency';
  const isCommercial = lead.marketType === 'commercial';

  return (
    <div className="flex flex-col bg-white relative min-h-full font-sans">
      {/* Professional Service Header */}
      <div className={`h-40 relative overflow-hidden flex flex-col justify-end p-8 transition-all duration-1000 ${isEmergency ? 'bg-rose-900' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
              <div className="p-2.5 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-white">
                LIVE DISPATCH FILE
              </h3>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight uppercase leading-none">
              {isCommercial ? 'Facility Profile' : 'Lead Intelligence'}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Status Badges */}
        <div className="flex flex-wrap gap-3">
          <div className={`px-5 py-2.5 rounded-xl flex items-center gap-3 border-2 transition-all shadow-md ${isCommercial ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}>
            {isCommercial ? <Building2 className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            <span className="text-[11px] font-black uppercase tracking-wider">{lead.marketType} UNIT</span>
          </div>
          {isHeritage && (
            <div className="px-5 py-2.5 bg-amber-100 text-amber-900 rounded-xl flex items-center gap-3 border-2 border-amber-300 shadow-md">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-wider">HERITAGE PROPERTY</span>
            </div>
          )}
          {isConnected && (
            <div className="px-5 py-2.5 bg-emerald-100 text-emerald-900 rounded-xl flex items-center gap-3 border-2 border-emerald-300 animate-pulse shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="text-[11px] font-black uppercase tracking-wider">LIVE SYNC ACTIVE</span>
            </div>
          )}
        </div>

        {/* Customer Details */}
        <div className="space-y-2">
          <TacticalField 
            label="CUSTOMER NAME" 
            value={lead.name} 
            icon={<User />} 
            active={isConnected}
          />
          <TacticalField 
            label="PHONE NUMBER" 
            value={lead.phone} 
            icon={<Phone />} 
            active={isConnected}
          />
          <TacticalField 
            label="SERVICE ADDRESS" 
            value={lead.address} 
            icon={<MapPin />} 
            active={isConnected}
          />
        </div>

        {/* Service Type & Energy Profile */}
        <div className="grid grid-cols-2 gap-5">
           <StatusCard 
              label="REQUEST TYPE"
              value={lead.type || 'ANALYZING...'}
              icon={<BadgeAlert />}
              isActive={!!lead.type}
              isEmergency={isEmergency}
           />
           <StatusCard 
              label="FUEL SOURCE"
              value={lead.heatingSource || 'ANALYZING...'}
              icon={<Zap />}
              isActive={!!lead.heatingSource}
              isEmergency={false}
           />
        </div>

        {/* Dispatch Commitment */}
        <div className="pt-6">
          <div className="p-8 bg-slate-950 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/10">
              <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between border-b border-white/20 pb-8">
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">DISPATCH STATUS</span>
                        <div className="flex items-center gap-4">
                           <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                           <span className="text-sm font-black text-white uppercase tracking-wider">READY FOR DEPLOYMENT</span>
                        </div>
                      </div>
                      <Navigation className="w-8 h-8 text-white/60" />
                  </div>

                  <button className={`w-full py-6 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl border-2 ${
                    isEmergency 
                    ? 'bg-rose-600 border-rose-400 text-white hover:bg-rose-500' 
                    : 'bg-white border-white text-slate-950 hover:bg-slate-50'
                  }`}>
                    BOOK TECHNICIAN <ArrowRight className="w-6 h-6" />
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TacticalField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`flex items-center justify-between py-6 border-b-2 border-slate-100 transition-all duration-500 ${value ? 'bg-slate-50 -mx-6 px-6 rounded-2xl shadow-sm border-b-0' : ''}`}>
        <div className="flex items-center gap-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${
              value ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-110' : 'bg-white text-slate-400 border-slate-200'
            }`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1.5">{label}</span>
              <span className={`text-xl font-black truncate max-w-[260px] transition-all duration-500 ${
                value ? 'text-slate-950' : active ? 'text-slate-500 animate-pulse' : 'text-slate-400'
              }`}>
                  {value || (active ? 'LISTENING...' : 'WAITING')}
              </span>
            </div>
        </div>
    </div>
);

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`p-7 rounded-3xl border-2 transition-all duration-700 shadow-lg ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-300' : 'bg-blue-50 border-blue-300') 
      : 'bg-slate-50 border-slate-200'
  }`}>
    <div className="flex items-center gap-4 mb-5">
       <div className={`p-2.5 rounded-xl border transition-all ${isActive ? (isEmergency ? 'bg-rose-100 text-rose-600 border-rose-200' : 'bg-blue-100 text-blue-600 border-blue-200') : 'bg-white text-slate-400 border-slate-100'}`}>
          {React.cloneElement(icon, { className: 'w-5 h-5' })}
       </div>
       <div className="text-[10px] text-slate-800 uppercase font-black tracking-widest leading-none">{label}</div>
    </div>
    <div className={`text-lg font-black uppercase tracking-tight ${
      isActive 
        ? (isEmergency ? 'text-rose-700' : 'text-slate-950') 
        : 'text-slate-500 italic'
    }`}>
      {value}
    </div>
  </div>
);
