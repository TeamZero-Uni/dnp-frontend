import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    category: "3D Printing",
    title: "3D Printing",
    description:
      "Create complex geometries with incredible precision and detail using cutting-edge additive manufacturing.",
    image:
      "assets/images/home/1.jpg",
    number: "01",
    tag: "FDM/Resin",
  },
  {
    category: "Modeling & Design",
    title: "Modeling & Design",
    description:
      "Professional 3D modeling and CAD design services for prototypes, products, and custom projects.",
    image:
      "assets/images/home/2.png",
    number: "02",
    tag: "3D Modeling/CAD",
  },
  {
    category: "Cutting & Engraving",
    title: "Cutting & Engraving",
    description:
      "Precision laser cutting and engraving services for acrylic, wood, metal, and other materials.",
    image:
      "assets/images/home/3.webp",
    number: "03",
    tag: "Laser Cutting/Engraving",
  },
  {
    category: "Production & Signage",
    title: "Production & Signage",
    description:
      "Custom signage and production solutions including LED signs, branding displays, and fabrication.",
    image:
      "assets/images/home/4.png",
    number: "04",
    tag: "Injection Molding/LED Signage",
  },
  {
    category: "Robotic Project",
    title: "Robotic Project",
    description:
      "Innovative robotic and automation projects designed for education, research, and industrial applications.",
    image:
      "assets/images/home/5.webp",
    number: "05",
    tag: "Automation/IoT",
  },
  {
    category: "Light Letters",
    title: "Light Letters",
    description:
      "Custom illuminated light letters and branding solutions for shops, offices, and events.",
    image:
      "assets/images/home/6.png",
    number: "06",
    tag: "LED Letters/Sign Boards",
  },
];

export default function ServiceSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 px-6 animate-appear">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest mb-4 bg-[#5a46c2]/10 text-[#5a46c2] border border-[#5a46c2]/20">
            <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#5a46c2]" />
            What We Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Our <span className="text-[#5a46c2]">Capabilities</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-mb">
            Comprehensive digital manufacturing solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-130">
          <div className="relative rounded-3xl overflow-hidden min-h-105">
            {services.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[rgba(30,10,80,0.75)] via-[rgba(90,70,194,0.15)] to-transparent" />
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3 inline-block bg-white/15 text-[#e0d9ff] backdrop-blur-md border border-white/20">
                {services[active].category}
              </span>
              <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                {services[active].title}
              </h3>
              <p className="text-purple-200 text-sm leading-relaxed max-w-xs">
                {services[active].description}
              </p>
            </div>

            <div className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black bg-white/15 text-white backdrop-blur-md border border-white/25">
              {services[active].number}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 group
                  ${active === index 
                    ? 'btn-color border-transparent shadow-[0_8px_28px_rgba(90,70,194,0.3)] translate-x-1.5' 
                    : 'bg-white border-[#ede9fe] shadow-[0_2px_10px_rgba(90,70,194,0.05)] translate-x-0 border-[1.5px]'
                  }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-bold truncate ${active === index ? 'text-white' : 'text-gray-800'}`}>
                      {service.title}
                    </span>
                    {service.tag && (
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full shrink-0
                        ${active === index ? 'bg-white/20 text-white' : 'bg-[#5a46c2]/10 text-[#5a46c2]'}`}>
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs ${active === index ? 'text-white/70' : 'text-gray-400'}`}>
                    {service.category}
                  </span>
                </div>

                <span className={`text-xs font-black shrink-0 ${active === index ? 'text-white/50' : 'text-[#d8b4fe]'}`}>
                  {service.number}
                </span>

                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
                  ${active === index ? 'bg-white/20' : 'bg-[#5a46c2]/10'}`}>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${active === index ? 'text-white' : 'text-[#5a46c2]'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}