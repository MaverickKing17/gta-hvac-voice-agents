import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Search,
  ChevronUp,
  Flame,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Zap,
  Building2,
  PhoneCall,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const App: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Smooth scroll helper to make links "work"
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollToSection(target);
  };

  // Fix: Added missing toggleFaq function to handle accordion item expansion and collapse
  const toggleFaq = (index: number) => {
    setActiveFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-red-100 selection:text-red-600">
      {/* Top Bar Navigation */}
      <div className="bg-[#f8f9fa] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <div className="flex gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#003366] transition-colors">Home</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#003366] transition-colors">Commercial</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#003366] transition-colors">Careers</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#003366] transition-colors">News & Articles</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                   <img src="https://torontoairsystems.ca/wp-content/uploads/2023/10/tas-logo.png" alt="TAS Logo" className="h-10 w-auto" onError={(e) => {
                     (e.target as HTMLImageElement).src = "https://via.placeholder.com/150x50?text=TAS+HVAC";
                   }} />
                </div>
                <div className="ml-3 flex flex-col">
                  <span className="text-2xl font-black text-[#003366] leading-none tracking-tighter uppercase italic">
                    TORONTO AIR <span className="text-[#d6001c]">SYSTEMS</span>
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mt-1">
                    Your Passport to Perfect Climate
                  </span>
                </div>
             </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-[12px] font-black uppercase tracking-widest text-gray-600">
            <div className="group relative cursor-pointer flex items-center gap-1 hover:text-[#d6001c] transition-colors" onClick={(e) => handleLinkClick(e, 'heating')}>
              Heating <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </div>
            <div className="group relative cursor-pointer flex items-center gap-1 hover:text-[#d6001c] transition-colors" onClick={(e) => handleLinkClick(e, 'cooling')}>
              Cooling <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </div>
            <a href="#other" onClick={(e) => e.preventDefault()} className="hover:text-[#d6001c] transition-colors">Other Services</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'why-choose')} className="hover:text-[#d6001c] transition-colors">About Us</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'footer')} className="hover:text-[#d6001c] transition-colors">Contact</a>
            <a href="#rebates" onClick={(e) => e.preventDefault()} className="hover:text-[#d6001c] transition-colors text-[#d6001c]">Rebates</a>
          </nav>

          <div className="flex items-center gap-5 border-l border-gray-200 pl-8">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Call Center</span>
              <a href="tel:+16479534252" className="text-xl font-black text-[#003366] hover:text-[#d6001c] transition-colors">+1 (647) 953-4252</a>
            </div>
            <a href="tel:+16479534252" className="bg-[#003366] p-3 rounded-full text-white hover:bg-[#d6001c] transition-all shadow-lg hover:shadow-red-200">
              <PhoneCall className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[650px] overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
          alt="HVAC installation professional" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001529]/90 via-[#001529]/60 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 w-full text-white space-y-10">
          <div className="space-y-4 animate-fade-in">
            <span className="inline-block bg-red-600 px-4 py-1 text-[11px] font-black uppercase tracking-widest">Reliable & Professional</span>
            <h2 className="text-7xl font-black max-w-3xl leading-[1.05] tracking-tight uppercase italic">
              The Gold Standard <br/>in HVAC Services <br/><span className="text-white/80 not-italic">in Toronto</span>
            </h2>
            <p className="text-xl text-white/70 max-w-xl font-medium tracking-tight">
              From historic heritage homes to modern skyscrapers, we deliver climate perfection with 24/7 priority support.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 pt-6">
            <button 
              onClick={(e) => handleLinkClick(e, 'heating')}
              className="flex items-center gap-5 group bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-2xl hover:bg-red-600 transition-all active:scale-95"
            >
               <div className="bg-red-600 p-4 rounded-full group-hover:bg-white transition-all shadow-xl">
                  <Flame className="w-6 h-6 text-white group-hover:text-red-600" />
               </div>
               <div className="text-left">
                  <span className="block text-sm font-black uppercase tracking-widest">Heating</span>
                  <span className="text-[10px] text-gray-300 flex items-center gap-1 group-hover:text-white">View All Heating Services <ChevronRight className="w-3 h-3" /></span>
               </div>
            </button>
            <button 
              onClick={(e) => handleLinkClick(e, 'cooling')}
              className="flex items-center gap-5 group bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-2xl hover:bg-[#003366] transition-all active:scale-95"
            >
               <div className="bg-blue-500 p-4 rounded-full group-hover:bg-white transition-all shadow-xl">
                  <Snowflake className="w-6 h-6 text-white group-hover:text-blue-500" />
               </div>
               <div className="text-left">
                  <span className="block text-sm font-black uppercase tracking-widest">Cooling</span>
                  <span className="text-[10px] text-gray-300 flex items-center gap-1 group-hover:text-white">View All Cooling Services <ChevronRight className="w-3 h-3" /></span>
               </div>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-[#003366] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="text-white max-w-md">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 italic leading-tight">Trusted Source for Every Heating Need</h3>
            <p className="text-xs text-blue-100 font-medium opacity-70 uppercase leading-relaxed tracking-wider">
              We have supplied outdoor heating equipment to some of the largest corporations and institutions in the Greater Toronto Area.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-70 grayscale invert brightness-200">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg" alt="IKEA" className="h-7" />
            <img src="https://www.tridel.com/wp-content/themes/tridel/assets/images/tridel-logo.svg" alt="TRIDEL" className="h-7" />
            <span className="text-2xl font-black text-white uppercase italic tracking-tighter">Toronto Metropolitan</span>
          </div>
        </div>
      </div>

      {/* Heating Services Grid */}
      <section id="heating" className="py-28 max-w-7xl mx-auto px-4 text-center">
        <div className="space-y-5 mb-24">
          <div className="inline-block bg-red-50 px-4 py-1 rounded-full">
            <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Winter Preparedness</span>
          </div>
          <h2 className="text-5xl font-black text-[#003366] uppercase italic tracking-tighter leading-none">Heating Services</h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From emergency furnace repairs to high-efficiency heat pump installations, we ensure your Toronto home stays warm all winter long.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-20 gap-x-12">
          <ServiceItem icon={<Flame />} title="Furnaces" />
          <ServiceItem icon={<Thermometer />} title="Boilers" />
          <ServiceItem icon={<Flame />} title="Gas Fireplaces" />
          <ServiceItem icon={<Wind />} title="Outdoor Heating" />
          <ServiceItem icon={<Droplets />} title="Water Heaters" />
          <ServiceItem icon={<Zap />} title="Heat Pumps" />
          <ServiceItem icon={<Thermometer />} title="Floor Heating" />
          <ServiceItem icon={<Snowflake />} title="Snow Melting" />
        </div>
      </section>

      {/* Cooling Services Grid */}
      <section id="cooling" className="py-28 bg-[#f8f9fa] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-5 mb-24">
            <div className="inline-block bg-blue-50 px-4 py-1 rounded-full">
              <span className="text-[11px] font-black text-[#003366] uppercase tracking-widest">Summer Comfort</span>
            </div>
            <h2 className="text-5xl font-black text-[#003366] uppercase italic tracking-tighter leading-none">Cooling Services</h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Brace for the Toronto heat with our premium cooling solutions, including central air, ductless splits, and high-performance chillers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-20 gap-x-8">
            <ServiceItem icon={<Zap />} title="Heat Pumps" />
            <ServiceItem icon={<Wind />} title="Ductless A/C" />
            <ServiceItem icon={<Droplets />} title="AC Repair" />
            <ServiceItem icon={<Snowflake />} title="New AC Install" />
            <ServiceItem icon={<Wind />} title="Chillers" />
          </div>
          <div className="flex justify-center mt-16 pt-8 border-t border-gray-200">
            <ServiceItem icon={<Building2 className="w-10 h-10 text-[#003366] mx-auto" />} title="Commercial HVAC" />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-28 max-w-7xl mx-auto px-4 text-center">
        <div className="space-y-4 mb-20">
          <h2 className="text-4xl font-black text-[#003366] uppercase italic tracking-tighter">Brands We Carry</h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Authorized dealer for the world's most efficient HVAC manufacturers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-100 rounded-3xl overflow-hidden shadow-2xl">
           {[
             "BOSCH", "Panasonic", "GREE", "MITSUBISHI",
             "INFRATECH", "BROMIC", "LG", "Dimplex"
           ].map((brand, i) => (
             <div key={i} className="h-36 flex items-center justify-center p-10 border border-gray-50 grayscale hover:grayscale-0 transition-all cursor-pointer bg-white group">
                <span className="text-2xl font-black tracking-tighter uppercase italic text-gray-400 group-hover:text-[#003366] transition-colors">{brand}</span>
             </div>
           ))}
        </div>
      </section>

      {/* Vapi AI Slot Placeholder */}
      <section className="bg-[#000814] py-36 relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }} />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 text-[11px] font-black uppercase tracking-widest mb-10 animate-pulse">
            <Wind className="w-4 h-4" /> Priority AI Dispatch Active
          </div>
          <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-10 leading-none">
            Speak With Our <br/><span className="text-red-600 not-italic">Voice Assistant</span>
          </h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto text-xl leading-relaxed">
            Need a rebate assessment or an emergency dispatch? Click below to start a live voice conversation with our AI service agent.
          </p>
          
          <div className="p-2 w-full max-w-3xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-[#d6001c] via-[#003366] to-[#000814] shadow-[0_0_120px_rgba(214,0,28,0.2)] hover:shadow-[0_0_150px_rgba(214,0,28,0.3)] transition-all duration-700">
            <div className="bg-black/60 backdrop-blur-3xl rounded-[3.4rem] p-24 flex flex-col items-center justify-center border border-white/10 group cursor-pointer active:scale-[0.98] transition-all">
                <div className="w-28 h-28 rounded-full bg-white/5 flex items-center justify-center mb-10 ring-8 ring-white/5 group-hover:ring-red-500/20 transition-all">
                  <Phone className="w-12 h-12 text-white fill-current animate-bounce" />
                </div>
                <div className="text-white/40 font-mono text-[11px] uppercase tracking-[0.5em] mb-4">
                   Integration Slot: Vapi AI Embed
                </div>
                <button 
                  onClick={() => alert("Vapi AI Assistant: Ready for Embed Hook.")}
                  className="bg-red-600 text-white px-14 py-6 rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-red-700 transition-all shadow-2xl shadow-red-900/40"
                >
                  Start Live Demo Call
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className="py-32 bg-[#001529] text-white overflow-hidden relative">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                Toronto Air Systems: <br/><span className="text-red-600 not-italic">Our Advantage</span>
              </h2>
              <p className="text-blue-100/60 leading-relaxed text-lg font-medium tracking-wide">
                We are more than just repair technicians—we are your home comfort strategists. Specializing in high-efficiency heat pumps and Victorian heritage retrofits.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-6">
                <AdvantageItem title="Expertise & Heritage" desc="Specialized experience in Toronto's Victorian and Edwardian home structures." />
                <AdvantageItem title="Customer Priority" desc="24/7 emergency dispatch for our members with a 2-hour response guarantee." />
                <AdvantageItem title="Premium Brands Only" desc="We exclusively install high-tier brands like Bosch, Mitsubishi, and Carrier." />
                <AdvantageItem title="Transparent Pricing" desc="Up-front flat-rate pricing with no hidden diagnostic fees or weekend surcharges." />
              </div>
            </div>
            
            <div className="relative group">
               <div className="absolute inset-0 bg-red-600 rounded-[3rem] rotate-3 transition-transform group-hover:rotate-6 -z-10" />
               <div className="h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-[#003366]">
                  <img 
                    src="https://images.unsplash.com/photo-1599806112354-67f8b5425a06?q=80&w=800&auto=format&fit=crop" 
                    alt="HVAC work in progress" 
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl p-10 rounded-[2rem] border border-white/20">
                     <h4 className="text-2xl font-black uppercase italic mb-3">GTA Wide Coverage</h4>
                     <p className="text-sm text-white/70 font-medium">Serving downtown Toronto, Mississauga, Brampton, and Etobicoke with rapid response teams.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Simple Steps */}
      <section id="steps" className="py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="flex-1 relative order-2 lg:order-1">
                 <div className="relative z-10 transform lg:scale-125">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Map_of_the_Greater_Toronto_Area.svg/800px-Map_of_the_Greater_Toronto_Area.svg.png" alt="GTA Coverage Map" className="w-full h-auto opacity-10 grayscale" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <h2 className="text-[140px] font-black text-gray-100 italic leading-none whitespace-nowrap -rotate-12 select-none">GTA EXPERTS</h2>
                    </div>
                 </div>
              </div>

              <div className="flex-1 space-y-16 order-1 lg:order-2">
                 <div className="space-y-6">
                   <div className="inline-block bg-red-600 px-5 py-1 text-[11px] font-black text-white uppercase tracking-[0.3em]">Our Protocol</div>
                   <h2 className="text-6xl font-black text-[#003366] italic uppercase leading-none tracking-tighter">Getting Started In <br/><span className="text-red-600 not-italic">5 Simple Steps</span></h2>
                   <p className="text-gray-500 text-lg font-medium leading-relaxed">We’ve streamlined the process to ensure your comfort is restored without the typical HVAC headaches.</p>
                 </div>

                 <div className="space-y-10">
                    <StepItem num={1} title="Instant Consultation" desc="Reach out via call, text, or speak to our AI assistant to determine your immediate needs." />
                    <StepItem num={2} title="On-Site Evaluation" desc="Our senior tech performs a comprehensive diagnostic of your heritage or modern system." />
                    <StepItem num={3} title="Comfort Blueprint" desc="We provide a detailed quote and energy savings plan tailored to your budget." />
                    <StepItem num={4} title="Seamless Execution" desc="Licensed TAS professionals handle the installation with surgical precision." />
                    <StepItem num={5} title="Post-Service Support" desc="Enjoy peace of mind with our 10-year parts & labor warranty and ongoing tune-ups." />
                 </div>

                 <button 
                  onClick={(e) => handleLinkClick(e, 'footer')}
                  className="bg-[#003366] text-white px-14 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl shadow-[#003366]/20 active:scale-95 flex items-center gap-4"
                 >
                    BOOK YOUR QUOTE NOW <ChevronRight className="w-6 h-6" />
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-36 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-5 mb-24">
            <h2 className="text-6xl font-black text-[#003366] uppercase italic tracking-tighter leading-none">FAQ</h2>
            <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[11px]">Answers to your most frequent comfort queries</p>
          </div>

          <div className="space-y-5 text-left">
            {[
              "What makes Toronto Air Systems different from local contractors?",
              "Do you provide 24/7 emergency service in downtown Toronto?",
              "How can I qualify for the $10,000 Ontario Heat Pump Rebate?",
              "Are your technicians licensed for heritage home gas-to-electric retrofits?",
              "What is your typical response time for a 'No Heat' emergency?",
              "Do you offer financing for new furnace and AC installations?",
              "Is there a warranty on repairs and new equipment installations?"
            ].map((q, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-xl hover:border-red-100">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full p-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-[15px] font-black uppercase tracking-wider transition-colors ${activeFaq === i ? 'text-red-600' : 'text-[#003366] group-hover:text-red-600'}`}>
                    {q}
                  </span>
                  <div className={`p-3 rounded-xl transition-all ${activeFaq === i ? 'bg-red-600 text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                {activeFaq === i && (
                  <div className="px-10 pb-10 text-base text-gray-500 leading-relaxed border-t border-gray-50 pt-8 animate-in slide-in-from-top-4 duration-500">
                    {i === 2 ? 
                      "Our rebate specialists handle the entire Enbridge and Canada Greener Homes Grant process for you. Currently, eligible homeowners can receive up to $10,000 for switching to a dual-fuel hybrid heat pump system." : 
                      "Toronto Air Systems sets the gold standard by employing only Red Seal certified technicians. We specialize in the unique complexities of GTA heritage properties and provide a transparent, flat-rate pricing model backed by a 10-year guarantee."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
           <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[11px]">Limited Time Incentives Available</span>
           <h2 className="text-6xl font-black text-[#003366] uppercase italic tracking-tighter max-w-4xl mx-auto leading-none">
              Restore Your Home's Climate To The <span className="text-red-600 not-italic">TAS Gold Standard</span>
           </h2>
           <div className="flex justify-center gap-6">
              <a 
                href="tel:+16479534252" 
                className="bg-[#003366] text-white px-14 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-[#002244] transition-all flex items-center gap-4 shadow-2xl active:scale-95"
              >
                <Phone className="w-6 h-6" /> CALL NOW
              </a>
              <button 
                onClick={(e) => handleLinkClick(e, 'steps')}
                className="bg-red-600 text-white px-14 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-red-700 transition-all shadow-2xl active:scale-95"
              >
                BOOK INSPECTION
              </button>
           </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer id="footer" className="bg-[#000d1a] text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
              <div className="lg:col-span-2 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                    <img src="https://torontoairsystems.ca/wp-content/uploads/2023/10/tas-logo.png" alt="TAS" className="h-8 brightness-0 invert" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black italic uppercase leading-none tracking-tighter">
                      TORONTO AIR <span className="text-red-600">SYSTEMS</span>
                    </span>
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                      Your Passport to Perfect Climate
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-medium">
                  Toronto's premier choice for residential and commercial HVAC solutions. Family owned and operated since 2008.
                </p>

                <div className="flex gap-4">
                   <SocialIcon icon={<Facebook />} />
                   <SocialIcon icon={<Twitter />} />
                   <SocialIcon icon={<Instagram />} />
                   <SocialIcon icon={<Linkedin />} />
                </div>
              </div>

              <FooterNav title="Heating" items={["Furnaces", "Boilers", "Heat Pumps", "Water Heaters", "Gas Lines"]} />
              <FooterNav title="Cooling" items={["Central Air", "Ductless Split", "AC Repair", "Maintenance", "Commercial"]} />
              <FooterNav title="Our Company" items={["About TAS", "Careers", "News", "Privacy Policy", "Contact"]} />
           </div>

           <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-white/5 text-[11px] font-black text-gray-600 uppercase tracking-[0.2em] gap-8">
              <div className="flex flex-col md:flex-row items-center gap-10">
                 <button className="bg-white/5 text-white px-8 py-3 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-all border border-white/10">
                   <MapPin className="w-4 h-4 text-red-600" /> TORONTO HQ
                 </button>
                 <span>© 2025 TORONTO AIR SYSTEMS. ALL RIGHTS RESERVED.</span>
              </div>
              <div className="flex items-center gap-10 opacity-30">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-3" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3" />
                 <span className="text-white font-black italic text-sm">NORTON SECURED</span>
              </div>
           </div>
        </div>

        {/* Floating Scroll Top */}
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="fixed bottom-12 right-12 bg-red-600 text-white shadow-2xl p-4 rounded-2xl hover:bg-red-700 transition-all active:scale-90 z-50 animate-in fade-in zoom-in"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: #000814; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border: 3px solid #000814; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #d6001c; }
      `}</style>
    </div>
  );
};

const ServiceItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="group cursor-pointer">
    <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center bg-gray-50 rounded-3xl border-2 border-transparent group-hover:border-red-500 group-hover:bg-white transition-all shadow-lg group-hover:shadow-red-100">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-10 h-10 text-[#003366] transition-all group-hover:scale-110 group-hover:text-red-600' })}
    </div>
    <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-3 italic">{title}</h4>
    <div className="w-8 h-1 bg-red-600 mx-auto opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-500 rounded-full" />
  </div>
);

const AdvantageItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="space-y-4 group">
    <div className="flex items-center gap-4">
      <div className="bg-red-600/20 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
        <CheckCircle2 className="w-5 h-5 text-red-500 group-hover:text-white" />
      </div>
      <h5 className="text-[14px] font-black uppercase tracking-widest italic">{title}</h5>
    </div>
    <p className="text-sm text-blue-100/40 leading-relaxed font-medium group-hover:text-blue-100/70 transition-colors">{desc}</p>
  </div>
);

const StepItem = ({ num, title, desc }: { num: number, title: string, desc: string }) => (
  <div className="flex gap-10 group">
    <div className="flex flex-col items-center">
       <div className="w-14 h-14 rounded-2xl bg-[#003366] text-white text-xl font-black flex items-center justify-center border-4 border-transparent group-hover:border-[#d6001c] group-hover:bg-white group-hover:text-[#d6001c] transition-all duration-500 shadow-xl">
         {num}
       </div>
       {num < 5 && <div className="flex-1 w-1 bg-gray-100 my-4 rounded-full group-hover:bg-red-50 transition-colors" />}
    </div>
    <div className="pb-12 space-y-3">
       <h4 className="text-xl font-black text-[#003366] uppercase tracking-tighter italic leading-none">{title}</h4>
       <p className="text-base text-gray-400 leading-relaxed font-medium max-w-sm">{desc}</p>
    </div>
  </div>
);

const FooterNav = ({ title, items }: { title: string, items: string[] }) => (
  <div className="space-y-8">
    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">{title}</h4>
    <ul className="text-sm text-gray-500 space-y-5 font-bold uppercase tracking-widest">
      {items.map((item, i) => (
        <li key={i}><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-red-600 transition-colors">{item}</a></li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" onClick={(e) => e.preventDefault()} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-500 transition-all active:scale-90">
    {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
  </a>
);

export default App;