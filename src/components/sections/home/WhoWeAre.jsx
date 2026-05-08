import React from 'react';
import { Shield, Target, Cpu, Zap } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const WhoWeAre = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Precision Engineering', icon: <Target className="w-5 h-5" />, value: '99.9%' },
    { label: 'Turnaround Time', icon: <Zap className="w-5 h-5" />, value: '24/7' },
    { label: 'Modern Tech Stack', icon: <Cpu className="w-5 h-5" />, value: 'Latest' },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden animate-appear">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#5a46c2]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#4838a3]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative group">
            <div className="relative z-10 overflow-hidden rounded-3xl border border-gray-100 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
              <img 
                src="assets/images/home/img1.jpg"               alt="3D Printing in Action" 
                className="w-full h-125 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#4838a3]/40 to-transparent" />
            </div>

            <div className="absolute -bottom-8 -right-8 z-20 hidden md:block w-64 h-64 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" 
                alt="CNC Machining Detail" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -top-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-md">
              <p className="text-4xl font-black text-[#5a46c2]">DNP</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">3D Hobby Lobby</p>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 bg-[#5a46c2]/10 text-[#5a46c2] border border-[#5a46c2]/20">
                <span className="w-2 h-2 rounded-full inline-block bg-[#5a46c2] animate-pulse" />
                Innovating the Future
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Crafting Excellence with <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5a46c2] to-[#4838a3]">
                  Precision Technology
                </span>
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              At DNP 3D Hobby Lobby, we bridge the gap between imagination and reality. 
              Specializing in FDM/Resin 3D printing and precision CNC machining, we 
              empower creators and industries with high-fidelity digital manufacturing 
              prototypes and custom solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-[#5a46c2]/30 transition-colors">
                  <div className="text-[#5a46c2] mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button onClick={() => navigate('/service')} className="px-8 py-4 bg-[#5a46c2] hover:bg-[#4838a3] text-white rounded-xl font-bold shadow-lg shadow-[#5a46c2]/30 transition-all transform hover:-translate-y-1 active:scale-95">
                Explore Our Services
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;