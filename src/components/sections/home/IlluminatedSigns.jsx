import React from 'react';
import { Lightbulb, Zap, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const IlluminatedSigns = () => {
  const signs = [
    {
      id: 1,
      title: "Neon Logos",
      image: "assets/images/home/l1.png",
      size: "Large"
    },
    {
      id: 2,
      title: "LED Nameplates",
      image: "assets/images/home/l2.png",
      size: "Small"
    },
    {
      id: 3,
      title: "Backlit Letters",
      image: "assets/images/home/l3.png",
      size: "Medium"
    }
  ];

  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#0a0a0c] overflow-hidden animate-appear">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 bg-[#5a46c2]/20 text-[#7c66e3] border border-[#5a46c2]/30">
              <Zap size={14} className="animate-pulse" />
              Illuminated Solutions
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Light Letters & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a46c2] to-[#a855f7]">
                LED Signs
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">
              Custom illuminated names and logos designed to give your brand a premium edge. 
              Our LED technology ensures <span className="text-white font-semibold">tiny power consumption</span> with a <span className="text-white font-semibold">huge visual impact</span>.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "High-efficiency Samsung LED modules",
                "Custom acrylic & metal housing",
                "App-controlled RGB options available",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-[#5a46c2]/20 flex items-center justify-center text-[#5a46c2]">
                    <Star size={12} fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              className="group relative px-8 py-4 bg-[#5a46c2] text-white rounded-xl font-bold transition-all hover:bg-[#4838a3] hover:shadow-[0_0_30px_-5px_rgba(90,70,194,0.6)]"
              onClick={() => navigate("/quote")}
            >
              Get a Glow Quote
            </button>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-10 bg-[#5a46c2]/20 rounded-full blur-[120px]" />
            
            <div className="relative grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[450px]">
                <img 
                  src={signs[0].image} 
                  alt="Neon Sign" 
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[215px]">
                  <img 
                    src={signs[1].image} 
                    alt="LED Detail" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[215px] relative group">
                  <img 
                    src={signs[2].image} 
                    alt="Signage Design" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[#5a46c2]/40 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                <div className="text-3xl font-black text-white">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Customizable</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IlluminatedSigns;