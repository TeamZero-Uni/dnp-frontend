import React, { useState } from 'react';
import { ArrowRight, Cpu, Package, Truck, Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Cpu,
    title: 'Design Your Model',
    description: 'Upload your CAD file or work with our expert designers to bring your concept to life with precision.',
    details: ['Upload STL / OBJ / STEP files', 'Free design consultation', 'Instant quote generation'],
    image: 'https://images.unsplash.com/photo-1631557097-c90cba98aee9?w=600&h=400&fit=crop',
    tag: 'Step One',
  },
  {
    number: '02',
    icon: Package,
    title: 'Precision 3D Printing',
    description: 'State-of-the-art FDM and Resin printers manufacture your part with micron-level accuracy.',
    details: ['FDM & Resin technologies', 'Premium material selection', 'Quality inspection included'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
    tag: 'Step Two',
  },
  {
    number: '03',
    icon: Truck,
    title: 'Secure Fast Delivery',
    description: 'Your finished product is carefully packaged and delivered to your doorstep on schedule.',
    details: ['Island-wide delivery', 'Secure packaging', 'Real-time tracking'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    tag: 'Step Three',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden py-16 px-6 bg-[#f9f8ff]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest font-semibold mb-4 bg-[#5a46c2]/10 text-[#5a46c2] border border-[#5a46c2]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a46c2] animate-pulse" />
                How It Works
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3">
                Turning Ideas into{' '}
                <span className="bg-linear-to-br from-[#5a46c2] to-[#7c5cfc] bg-clip-text text-transparent">
                  Reality
                </span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Our streamlined process ensures your custom parts move from digital files to physical objects seamlessly.
              </p>
            </div>

            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;
              const isDone = i < active;

              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 border ${
                    isActive 
                      ? 'bg-white border-[#5a46c2]/25 shadow-[0_8px_28px_rgba(90,70,194,0.12)] translate-x-1.5' 
                      : 'bg-transparent border-transparent translate-x-0'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'btn-color text-white shadow-[0_4px_14px_rgba(90,70,194,0.35)]' 
                      : 'bg-[#5a46c2]/10 text-[#5a46c2]'
                  }`}>
                    {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#5a46c2]' : 'text-[#c4b5fd]'}`}>
                        Step {step.number}
                      </span>
                      {isDone && (
                        <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                          Done
                        </span>
                      )}
                    </div>
                    <h3 className={`font-bold text-sm transition-colors duration-300 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.title}
                    </h3>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-all duration-300 ${isActive ? 'text-[#5a46c2] opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}

            <button className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm btn-color shadow-[0_8px_24px_rgba(90,70,194,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(90,70,194,0.45)]">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4 mt-0">
            <div className="relative rounded-3xl overflow-hidden h-95 border border-[#5a46c2]/12 shadow-[0_12px_40px_rgba(90,70,194,0.12)]">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0d0828]/75 via-[#5a46c2]/15 to-transparent" />
                </div>
              ))}

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-2 inline-block bg-white/15 text-[#e9d5ff] backdrop-blur-md border border-white/20">
                      {steps[active].tag}
                    </span>
                    <h3 className="text-white font-extrabold text-xl tracking-tight">
                      {steps[active].title}
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActive(a => Math.max(0, a - 1))}
                      disabled={active === 0}
                      className="w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 disabled:text-white/30 text-white bg-white/15"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActive(a => Math.min(steps.length - 1, a + 1))}
                      disabled={active === steps.length - 1}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all duration-200 disabled:text-white/30 text-white ${active === steps.length - 1 ? 'bg-white/10' : 'bg-[#5a46c2]/80'}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/15">
                <div
                  className="h-full transition-all duration-500 bg-linear-to-r from-[#a78bfa] to-[#7c5cfc]"
                  style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 flex flex-col justify-between bg-white border border-[#5a46c2]/12 shadow-[0_4px_16px_rgba(90,70,194,0.07)]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center btn-color text-white shadow-[0_4px_12px_rgba(90,70,194,0.3)]">
                      {React.createElement(steps[active].icon, { className: 'w-4 h-4' })}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#5a46c2]/10 text-[#5a46c2]">
                      Step {steps[active].number}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {steps[active].description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 mt-4">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-[0.4rem] rounded-full transition-all duration-300 ${
                        active === i 
                          ? 'w-6 btn-color' 
                          : 'w-[0.4rem] bg-[#5a46c2]/20'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-gray-400 font-medium ml-1">{active + 1}/{steps.length}</span>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-white border border-[#5a46c2]/12 shadow-[0_4px_16px_rgba(90,70,194,0.07)]">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#5a46c2]" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#5a46c2]">
                    Includes
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {steps[active].details.map((d, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#5a46c2]/10">
                        <Check className="w-3 h-3 text-[#5a46c2]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <div className="h-1 rounded-full bg-[#5a46c2]/10">
                    <div
                      className="h-1 rounded-full transition-all duration-500 btn-color"
                      style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium text-right">
                    Phase {active + 1} of {steps.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}