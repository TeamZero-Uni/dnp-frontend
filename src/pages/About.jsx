import { useEffect, useRef, useState } from "react";
import Banner from "../components/layout/Banner";

const stats = [
  { value: 850, suffix: "+", label: "Projects Completed", icon: "🚀" },
  { value: 120, suffix: "+", label: "Repeat Clients", icon: "🤝" },
  { value: 35, suffix: "+", label: "Materials Available", icon: "🧪" },
  { value: 5, suffix: "", label: "Pro-Grade Printers", icon: "🖨️" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, icon, animate }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div className="group relative flex-1 min-w-[200px]">
      <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="relative flex flex-col gap-4 p-8 rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden text-left">
        <span className="absolute -right-4 -bottom-4 text-[96px] font-black text-primary/5 leading-none select-none pointer-events-none">
          {value}{suffix}
        </span>
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-2xl">{icon}</div>
        <div className="flex items-end gap-1">
          <span className="font-black text-6xl leading-none text-accent tabular-nums">{animate ? count : 0}</span>
          <span className="font-black text-4xl leading-none text-accent mb-1">{suffix}</span>
        </div>
        <div className="w-10 h-0.5 bg-accent/40 rounded-full" />
        <span className="font-medium text-sm tracking-[0.1em] uppercase text-primary/60 leading-snug">{label}</span>
      </div>
    </div>
  );
}

function About() {
  const statsRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-primary min-h-screen">
      {/* 1. Header/Banner Area */}
      <Banner
        title="ABOUT US"
        subtitle="Delivering high-quality 3D printing and digital fabrication solutions tailored to your creative needs"
        breadcrumbs={["Home", "About"]}
        backgroundImage={null}
        icon="rocket"
      />

      {/* 2. Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row gap-16 items-stretch">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-accent/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="font-bold text-xs tracking-[0.1em] uppercase text-accent">Precision Engineering</span>
            </div>
            <h1 className="font-black text-5xl lg:text-[72px] leading-tight tracking-tight text-secondary">About Us</h1>
            <p className="text-lg leading-[1.625] text-secondary/70 max-w-[576px]">
              We bridge the gap between digital imagination and physical production. Whether it's a single prototype or small-batch manufacturing, we make professional 3D design accessible to everyone.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-primary rounded-xl font-bold text-base mt-2 w-fit hover:bg-accent hover:text-secondary transition-colors">
              Explore Our Process →
            </button>
          </div>
          {/* Hero Video Container */}
<div className="flex-1 relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[584px] bg-secondary/5 border border-secondary/10 flex items-center justify-center shadow-2xl">
 <video 
  autoPlay 
  loop 
  muted 
  playsInline 
  className="w-full h-full object-cover"
>
  {/* Remove "../public" and start with "/" */}
  <source src="/assets/images/R.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
</div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section ref={statsRef} className="bg-secondary py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-16 justify-center">
            <div className="h-px flex-1 max-w-[80px] bg-primary/20" />
            <span className="font-bold text-xs tracking-[0.2em] uppercase text-accent">By The Numbers</span>
            <div className="h-px flex-1 max-w-[80px] bg-primary/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} animate={animate} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Story Section */}
      <section className="py-32 px-6" id="our-story">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div className="h-64 rounded-2xl overflow-hidden shadow-lg"><img src="../public/assets/images/about_us/aboutus1.jpg" className="w-full h-full object-cover" /></div>
              <div className="h-48 rounded-2xl overflow-hidden shadow-lg"><img src="../public/assets/images/about_us/aboutus2.jpg" className="w-full h-full object-cover" /></div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <div className="h-48 rounded-2xl overflow-hidden shadow-lg"><img src="../public/assets/images/about_us/aboutus4.jpg" className="w-full h-full object-cover" /></div>
              <div className="h-64 rounded-2xl overflow-hidden shadow-lg"><img src="../public/assets/images/about_us/aboutus3.jpg" className="w-full h-full object-cover" /></div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-black text-4xl text-secondary uppercase tracking-tight">From Hobbyist to Partner</h2>
            <p className="text-lg text-secondary/70">Ten years ago, we started in a garage. Today, we serve as a full-service manufacturing hub for industrial-grade 3D results.</p>
            <ul className="space-y-4">
              {["In-house CAD Experts", "Rapid Iteration Workflows", "Scalable Batch Production"].map((item) => (
                <li key={item} className="flex items-center gap-4 font-bold text-secondary tracking-tight">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. How We Work Section (Short & Sweet) */}
      <section className="py-24 bg-secondary/5" id="process">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-black text-4xl text-secondary mb-4 uppercase tracking-tighter">Our Process</h2>
            <p className="text-secondary/50 text-sm uppercase tracking-[0.3em]">Step-by-Step Excellence</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {[
              { step: "01", title: "Scoping", desc: "24h quote for your sketches or mesh files.", img: "../public/assets/images/about_us/aboutus5.jpg" },
              { step: "02", title: "DFM", desc: "Optimizing material and technology choice.", img: "../public/assets/images/about_us/aboutus6.jpg" },
              { step: "03", title: "Modeling", desc: "Precision CAD and assembly checks.", img: "../public/assets/images/about_us/aboutus7.jpg" },
              { step: "04", title: "QA", desc: "Surface finishing and tolerance audit.", img: "../public/assets/images/about_us/aboutus8.jpg" },
              { step: "05", title: "Delivery", desc: "Secure shipping and digital asset hand-off.", img: "../public/assets/images/about_us/aboutus9.jpg" },
            ].map(({ step, title, desc, img }) => (
              <div key={step} className="group flex flex-col gap-6 text-center lg:text-left">
                <div 
                  onClick={() => setSelectedImg(img)}
                  className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-secondary/5 shadow-md cursor-zoom-in relative"
                >
                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors pointer-events-none" />
                </div>
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <span className="text-[10px] font-black bg-accent text-secondary px-2 py-0.5 rounded uppercase tracking-widest">{step}</span>
                    <h3 className="font-black text-lg text-secondary uppercase">{title}</h3>
                  </div>
                  <p className="text-xs text-secondary/60 leading-relaxed font-medium">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer/CTA Area */}
      <section className="bg-secondary py-32 px-6 relative overflow-hidden text-center text-primary">
        <div className="max-w-[800px] mx-auto relative z-10">
          <h2 className="font-black text-4xl lg:text-6xl mb-10 tracking-tighter uppercase leading-none">Ready to start?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="bg-accent text-secondary py-5 px-10 rounded-2xl font-black text-lg hover:-translate-y-1 transition-transform uppercase tracking-tighter shadow-xl">Upload Files</a>
            <a href="#" className="bg-primary text-secondary py-5 px-10 rounded-2xl font-black text-lg hover:-translate-y-1 transition-transform uppercase tracking-tighter">Contact Us</a>
          </div>
        </div>
      </section>

      {/* 7. POP-UP LIGHTBOX (Simple & Functional) */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center bg-secondary/90 backdrop-blur-md p-6 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)}
        >
          <div 
            className="relative max-w-[500px] w-full animate-in zoom-in-95 duration-300 ease-out"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* The Close Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
              className="absolute -top-12 right-0 bg-accent text-secondary px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-2xl hover:bg-white transition-colors"
            >
              CLOSE ✕
            </button>

            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white p-2">
              <img src={selectedImg} className="w-full h-auto rounded-2xl" alt="Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;