import { useEffect, useRef, useState } from "react";
import Banner from "../components/layout/Banner";

const stats = [
  { value: 850, suffix: "+", label: "Projects Completed", icon: "🚀" },
  { value: 120, suffix: "+", label: "Repeat Clients", icon: "🤝" },
  { value: 35, suffix: "+", label: "Materials Available", icon: "🧪" },
  { value: 5, suffix: "", label: "Pro-Grade Printers", icon: "🖨️" },
];

function VideoPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Prevent default loop to control it manually
    video.removeAttribute('loop');

    const handleTimeUpdate = () => {
      // Restart video 0.5 seconds before it ends to prevent black flash
      if (video.duration - video.currentTime < 0.5) {
        video.currentTime = 0;
        video.play().catch(err => console.log('Play error:', err));
      }
    };

    const handleEnded = () => {
      // Fallback: immediately restart if video somehow ends
      video.currentTime = 0;
      video.play().catch(err => console.log('Play error:', err));
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      autoPlay 
      muted 
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover scale-150"
      style={{ objectPosition: 'center center' }}
    >
      <source src="/assets/images/about_us/R.mov" type="video/quicktime" />
      <source src="/assets/images/about_us/R.mov" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

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

function useScrollAnimation() {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
}

function StatCard({ value, suffix, label, icon, animate }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div className="group relative flex-1 min-w-[200px]">
      <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="relative flex flex-col gap-3 p-6 rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden text-left">
        <span className="absolute -right-4 -bottom-4 text-[80px] font-black text-primary/5 leading-none select-none pointer-events-none">
          {value}{suffix}
        </span>
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-xl">{icon}</div>
        <div className="flex items-end gap-1">
          <span className="font-black text-5xl leading-none text-accent tabular-nums">{animate ? count : 0}</span>
          <span className="font-black text-3xl leading-none text-accent mb-0.5">{suffix}</span>
        </div>
        <div className="w-10 h-0.5 bg-accent/40 rounded-full" />
        <span className="font-medium text-xs tracking-[0.1em] uppercase text-primary/60 leading-snug">{label}</span>
      </div>
    </div>
  );
}

function About() {
  const statsRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  
  const [heroRef, heroVisible] = useScrollAnimation();
  const [storyRef, storyVisible] = useScrollAnimation();
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [processRef, processVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

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
      <section ref={heroRef} className={`py-20 lg:py-32 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
          <div className="flex-1 relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[584px] bg-primary">
            <VideoPlayer />
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
      <section ref={storyRef} className={`py-16 px-6 flex flex-col lg:flex-row gap-20 items-stretch transition-all duration-1000 ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} id="our-story">
        <div className="flex-1 flex gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-64 rounded-xl overflow-hidden shadow-lg"><img src="/assets/images/about_us/aboutus1.jpg" className="w-full h-full object-cover" /></div>
            <div className="h-48 rounded-xl overflow-hidden shadow-lg"><img src="/assets/images/about_us/aboutus2.jpg" className="w-full h-full object-cover" /></div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-48 rounded-xl overflow-hidden shadow-lg"><img src="/assets/images/about_us/aboutus4.jpg" className="w-full h-full object-cover" /></div>
            <div className="h-64 rounded-xl overflow-hidden shadow-lg"><img src="/assets/images/about_us/aboutus3.jpg" className="w-full h-full object-cover" /></div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 min-w-0 lg:min-w-[400px]">
          <h2 className="font-black text-4xl leading-[1.11] text-secondary">From Hobbyist to Professional Partner</h2>
          <p className="text-lg leading-[1.625] text-secondary/70">
            Ten years ago, we started in a garage with a single desktop printer and a curiosity for digital geometry. We understood early on that 3D printing wasn't just a tool, but a fundamental shift in how physical objects come to life.
          </p>
          <p className="text-lg leading-[1.625] text-secondary/70">
            Today, we serve as a full-service manufacturing hub. Our mission is to democratize high-end manufacturing, providing industrial-grade results with the personalized touch of a boutique studio.
          </p>
          <ul className="flex flex-col gap-4 pt-2">
            {["In-house CAD Experts", "Rapid Iteration Workflows", "Scalable Batch Production"].map((item) => (
              <li key={item} className="flex items-center gap-3 list-none font-semibold text-base text-secondary relative pl-10">
                <span className="absolute left-0 w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Core Values Section */}
      <section ref={valuesRef} className={`bg-accent/5 py-24 transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16 px-6">
          <h2 className="font-black text-4xl tracking-tight uppercase text-secondary mb-4">What Drives Us</h2>
          <p className="font-medium text-base text-secondary/60">Our commitment to excellence in every layer.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center flex-wrap px-6 max-w-[1280px] mx-auto">
          <div className="w-full md:w-[389px] bg-secondary border border-secondary/5 rounded-2xl p-10 shadow-sm">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl mb-6">⚙</div>
            <h3 className="font-bold text-xl leading-[1.4] text-primary mb-4">Quality Assurance</h3>
            <p className="text-base leading-relaxed text-primary/70">Rigorous physical inspection and tolerance verification on every single part before it leaves our facility.</p>
          </div>
          <div className="w-full md:w-[389px] bg-secondary border border-secondary/5 rounded-2xl p-10 shadow-sm">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl mb-6">🤝</div>
            <h3 className="font-bold text-xl leading-[1.4] text-primary mb-4">Customer Trust</h3>
            <p className="text-base leading-relaxed text-primary/70">Building long-term partnerships through transparent communication and reliable project timelines.</p>
          </div>
          <div className="w-full md:w-[389px] bg-secondary border border-secondary/5 rounded-2xl p-10 shadow-sm">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl mb-6">🏆</div>
            <h3 className="font-bold text-xl leading-[1.4] text-primary mb-4">Industry Recognition</h3>
            <p className="text-base leading-relaxed text-primary/70">Leading the way with advanced DFM and additive manufacturing expertise across multiple industries.</p>
          </div>
        </div>
      </section>

      {/* 6. How We Work Section */}
      <section ref={processRef} className={`py-24 bg-primary transition-all duration-1000 ${processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} id="process">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-black text-4xl text-secondary mb-4">How We Work</h2>
            <p className="text-base text-secondary/60">A technical roadmap from concept to delivery.</p>
          </div>
          <div className="max-w-[1200px] mx-auto relative flex flex-col gap-20">
            {/* Vertical Purple Line with Dots */}
            <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-accent"></div>

            {/* Step 01 - Right Side */}
            <div className="relative flex flex-col lg:flex-row gap-8 items-center">
              {/* Purple Dot */}
              <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-accent border-4 border-primary z-10 items-center justify-center">
                <span className="text-white font-black text-sm">1</span>
              </div>
              
              <div className="flex-1 lg:pr-16 order-2 lg:order-1">
                <div className="bg-secondary/5 rounded-2xl p-8 lg:ml-auto lg:max-w-[500px]">
                  <span className="inline-block px-4 py-1 bg-accent text-secondary rounded-full font-black text-xs mb-4">STEP 01</span>
                  <h3 className="font-black text-2xl leading-tight text-secondary mb-4">Discovery & Scoping</h3>
                  <p className="text-sm leading-relaxed text-secondary/70 mb-4">We begin by analyzing your input—whether it's rough sketches, photos, or existing mesh files. We define project scope and provide a comprehensive quote within 24 hours.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Sketches</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Mesh Analysis</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Costing</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 lg:pl-16 order-1 lg:order-2">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                  <img src="/assets/images/about_us/aboutus5.jpg" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Step 02 - Left Side */}
            <div className="relative flex flex-col lg:flex-row gap-8 items-center">
              {/* Purple Dot */}
              <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-accent border-4 border-primary z-10 items-center justify-center">
                <span className="text-white font-black text-sm">2</span>
              </div>
              
              <div className="flex-1 lg:pr-16">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                  <img src="/assets/images/about_us/aboutus6.jpg" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 lg:pl-16">
                <div className="bg-secondary/5 rounded-2xl p-8 lg:max-w-[500px]">
                  <span className="inline-block px-4 py-1 bg-accent text-secondary rounded-full font-black text-xs mb-4">STEP 02</span>
                  <h3 className="font-black text-2xl leading-tight text-secondary mb-4">Planning & DFM</h3>
                  <p className="text-sm leading-relaxed text-secondary/70 mb-4">Design for Manufacturing (DFM) check. We select the best technology—FDM for strength or Resin for detail—and determine material properties to ensure build success.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">FDM / SLA</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Wall Thickness</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Support Strategy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 03 - Right Side */}
            <div className="relative flex flex-col lg:flex-row gap-8 items-center">
              {/* Purple Dot */}
              <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-accent border-4 border-primary z-10 items-center justify-center">
                <span className="text-white font-black text-sm">3</span>
              </div>
              
              <div className="flex-1 lg:pr-16 order-2 lg:order-1">
                <div className="bg-secondary/5 rounded-2xl p-8 lg:ml-auto lg:max-w-[500px]">
                  <span className="inline-block px-4 py-1 bg-accent text-secondary rounded-full font-black text-xs mb-4">STEP 03</span>
                  <h3 className="font-black text-2xl leading-tight text-secondary mb-4">Modeling & Execution</h3>
                  <p className="text-sm leading-relaxed text-secondary/70 mb-4">Our engineers translate concepts into high-precision CAD models. We perform digital assembly checks and geometry optimization before hitting the "Print" button.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">CAD Design</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">G-Code Gen</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Assembly Simulation</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 lg:pl-16 order-1 lg:order-2">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                  <img src="/assets/images/about_us/aboutus7.jpg" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Step 04 - Left Side */}
            <div className="relative flex flex-col lg:flex-row gap-8 items-center">
              {/* Purple Dot */}
              <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-accent border-4 border-primary z-10 items-center justify-center">
                <span className="text-white font-black text-sm">4</span>
              </div>
              
              <div className="flex-1 lg:pr-16">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                  <img src="/assets/images/about_us/aboutus8.jpg" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 lg:pl-16">
                <div className="bg-secondary/5 rounded-2xl p-8 lg:max-w-[500px]">
                  <span className="inline-block px-4 py-1 bg-accent text-secondary rounded-full font-black text-xs mb-4">STEP 04</span>
                  <h3 className="font-black text-2xl leading-tight text-secondary mb-4">QA & Post-Processing</h3>
                  <p className="text-sm leading-relaxed text-secondary/70 mb-4">Once printed, parts undergo support removal, sanding, or chemical smoothing. Every dimension is checked with calibrated calipers to verify tolerances.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Manual Finishing</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Tolerance Check</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">UV Curing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 05 - Right Side */}
            <div className="relative flex flex-col lg:flex-row gap-8 items-center">
              {/* Purple Dot */}
              <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-accent border-4 border-primary z-10 items-center justify-center">
                <span className="text-white font-black text-sm">5</span>
              </div>
              
              <div className="flex-1 lg:pr-16 order-2 lg:order-1">
                <div className="bg-secondary/5 rounded-2xl p-8 lg:ml-auto lg:max-w-[500px]">
                  <span className="inline-block px-4 py-1 bg-accent text-secondary rounded-full font-black text-xs mb-4">STEP 05</span>
                  <h3 className="font-black text-2xl leading-tight text-secondary mb-4">Delivery & Support</h3>
                  <p className="text-sm leading-relaxed text-secondary/70 mb-4">Physical parts are securely packed and shipped. We also provide all digital assets (STEP, STL, OBJ) and offer ongoing support for your hardware roadmap.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">STEP / OBJ</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Global Shipping</span>
                    <span className="px-3 py-1 bg-accent/10 rounded font-bold text-xs uppercase text-accent">Maintenance</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 lg:pl-16 order-1 lg:order-2">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                  <img src="/assets/images/about_us/aboutus9.jpg" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section ref={ctaRef} className={`bg-secondary py-24 px-6 relative overflow-hidden transition-all duration-1000 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute w-[427px] h-[492px] top-0 right-0 rounded-full bg-accent/20 blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-[896px] mx-auto">
          <h2 className="font-black text-4xl lg:text-5xl leading-none text-primary mb-8">Ready to build your next prototype?</h2>
          <p className="text-xl leading-[1.4] text-primary/70 mb-12">Connect with us today and let's discuss your technical requirements. We're ready when you are.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
            <a href="#" className="inline-flex items-center justify-center gap-3 py-5 px-10 rounded-2xl font-bold text-lg bg-accent text-secondary shadow-xl hover:-translate-y-0.5 transition-transform">📤 Upload Files</a>
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 py-5 px-10 rounded-2xl font-bold text-lg bg-[#25D366] text-white shadow-xl hover:-translate-y-0.5 transition-transform">💬 WhatsApp Chat</a>
            <a href="#" className="inline-flex items-center justify-center gap-3 py-5 px-10 rounded-2xl font-bold text-lg bg-primary text-secondary shadow-sm hover:-translate-y-0.5 transition-transform">✉ Email Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;