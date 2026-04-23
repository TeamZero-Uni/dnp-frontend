import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Banner from "../components/layout/Banner";
import ReadyToStart from "../components/ReadyToStart";
// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "3d-printing",
    label: "3D Printing",
    icon: "🖨️",
    description: "From rapid prototyping to final production parts — the full range of additive manufacturing technologies.",
    photo: "/assets/images/Services/fdm-printing.jpg",
  },
  {
    id: "modeling-design",
    label: "Modeling & Design",
    icon: "🎨",
    description: "Digital design services that turn your ideas into precise, manufacturable 3D geometry.",
    photo: "/assets/images/Services/3d-modeling.jpg",
  },
  {
    id: "cutting-engraving",
    label: "Cutting & Engraving",
    icon: "⚡",
    description: "Precision subtractive and marking services for clean edges, fine detail, and branded surfaces.",
    photo: "/assets/images/Services/engraving.jpg",
  },
  {
    id: "production-signage",
    label: "Production & Signage",
    icon: "🏭",
    description: "High-volume manufacturing and custom illuminated signage for businesses at any scale.",
    photo: "/assets/images/Services/injection-molding.jpg",
  },
];

const SERVICES = [
  {
    id: "fdm-printing", categoryId: "3d-printing", icon: "🖨️", title: "FDM 3D Printing",
    price: "Starting from Rs. 4,500", shortDesc: "High-quality 3D printing with various materials and finishes.",
    fullDesc: "FDM (Fused Deposition Modeling) is the most widely-used 3D printing technology. We extrude thermoplastic filaments layer-by-layer to build strong, functional parts.",
    features: ["FDM Technology", "Multiple Materials", "SLA/SLS Options", "Fast Turnaround"],
    materials: ["PLA", "ABS", "PETG", "Nylon", "Resin"],
    highlight: "Most Popular", gradient: "from-violet-600 to-indigo-500",
    image: "/assets/images/Services/fdm-printing.jpg",
  },
  {
    id: "sla-printing", categoryId: "3d-printing", icon: "💎", title: "SLA / Resin Printing",
    price: "Starting from Rs. 6,000", shortDesc: "Ultra-high detail resin printing for smooth, precise models.",
    fullDesc: "Stereolithography (SLA) uses a UV laser to cure liquid resin, producing parts with exceptional surface finish and fine detail.",
    features: ["Ultra Fine Detail", "Smooth Surface", "High Accuracy", "Transparent Options"],
    materials: ["Standard Resin", "ABS-Like", "Dental Resin", "Castable"],
    highlight: null, gradient: "from-blue-500 to-cyan-500",
    image: "/assets/images/Services/sla-printing.jpg",
  },
  {
    id: "3d-modeling", categoryId: "modeling-design", icon: "🎨", title: "3D Modeling",
    price: "Starting from Rs. 5,000", shortDesc: "Professional digital design for any concept, from art to engineering.",
    fullDesc: "Our designers create detailed 3D models from scratch using industry-standard tools.",
    features: ["Organic Sculpting", "Rendering", "Parametric Design", "Reverse Engineering"],
    materials: ["STL", "OBJ", "STEP", "IGES"],
    highlight: null, gradient: "from-fuchsia-500 to-violet-600",
    image: "/assets/images/Services/3d-modeling.jpg",
  },
  {
    id: "cad-design", categoryId: "modeling-design", icon: "📐", title: "CAD Design",
    price: "Starting from Rs. 8,000", shortDesc: "Precise Computer-Aided Design for engineering specifications and manufacturing.",
    fullDesc: "We produce accurate 2D drawings and 3D CAD assemblies for manufacturing, tooling, and full documentation.",
    features: ["2D Drafting", "Tolerance Analysis", "3D Assemblies", "BOM Creation"],
    materials: ["Metal", "Plastic", "Sheet Metal", "Assemblies"],
    highlight: null, gradient: "from-sky-500 to-blue-600",
    image: "/assets/images/Services/cad-design.jpg",
  },
  {
    id: "laser-cutting", categoryId: "cutting-engraving", icon: "⚡", title: "Laser Cutting",
    price: "Starting from Rs. 6,000", shortDesc: "Precision laser cutting for various materials with excellent edge quality.",
    fullDesc: "Our CO₂ and fiber laser cutters handle everything from thin paper to thick metal with consistent, burr-free edges.",
    features: ["High Precision", "Complex Designs", "Multiple Materials", "Clean Edges"],
    materials: ["Acrylic", "Wood", "Metal", "Cardboard", "Foam"],
    highlight: null, gradient: "from-orange-500 to-rose-500",
    image: "/assets/images/Services/laser-cutting.jpg",
  },
  {
    id: "engraving", categoryId: "cutting-engraving", icon: "✍️", title: "Engraving",
    price: "Starting from Rs. 3,000", shortDesc: "Professional engraving services for personalization and branding.",
    fullDesc: "We offer both laser and CNC rotary engraving for permanent, high-contrast marking.",
    features: ["Laser Engraving", "CNC Engraving", "Multiple Materials", "Fine Details"],
    materials: ["Metal", "Wood", "Glass", "Acrylic", "Leather"],
    highlight: "Best Value", gradient: "from-emerald-500 to-teal-500",
    image: "/assets/images/Services/engraving.jpg",
  },
  {
    id: "injection-molding", categoryId: "production-signage", icon: "🏭", title: "Injection Molding",
    price: "Starting from Rs. 15,000", shortDesc: "High-volume mass production for plastic components with consistent quality.",
    fullDesc: "Injection molding is the gold standard for high-volume plastic parts.",
    features: ["High Volume", "Complex Geometries", "Low Unit Cost", "Rapid Tooling"],
    materials: ["ABS", "Polypropylene", "Nylon", "Polycarbonate"],
    highlight: null, gradient: "from-slate-500 to-zinc-600",
    image: "/assets/images/Services/injection-molding.jpg",
  },
  {
    id: "led-signage", categoryId: "production-signage", icon: "💡", title: "LED Signage",
    price: "Starting from Rs. 12,000", shortDesc: "Custom illuminated signs to enhance your business visibility and branding.",
    fullDesc: "We design and fabricate custom LED signs — from neon-flex channel letters to backlit acrylic panels.",
    features: ["Custom Shapes", "RGB Options", "Neon Flex", "Weatherproof"],
    materials: ["Acrylic", "LED Flex", "ACP", "PVC"],
    highlight: null, gradient: "from-pink-500 to-fuchsia-600",
    image: "/assets/images/Services/led-signage.jpg",
  },
];

const HOW_IT_WORKS = [
  "Submit your design file or describe your idea",
  "Receive a detailed quote within 24 hours",
  "We manufacture with precision & quality checks",
  "Your order is delivered to your doorstep",
];

const STATS = [
  { value: "8+", label: "Services Offered" },
  { value: "1000+", label: "Projects Delivered" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "24hr", label: "Avg Turnaround" },
];

const getServicesFor = (catId) => SERVICES.filter((s) => s.categoryId === catId);

// ─── THREE.JS PARTICLE BACKGROUND WITH ENHANCED EFFECTS ─────────────────────────────────────────────
function ParticleBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // INCREASED PARTICLE COUNT FOR MORE DENSITY
    const count = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 4 + 0.5;
      
      // Color variation
      const hue = Math.random() * 0.2 + 0.65; // Purple to violet range
      colors[i * 3]     = Math.sin(hue) * 0.8 + 0.6;
      colors[i * 3 + 1] = Math.cos(hue) * 0.5 + 0.4;
      colors[i * 3 + 2] = Math.sin(hue + 1) * 0.9 + 0.7;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12, 
      transparent: true, 
      opacity: 0.7, 
      sizeAttenuation: true,
      vertexColors: true,
      sizeRange: [0.5, 5]
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // MULTIPLE SPHERES WITH DIFFERENT SIZES AND POSITIONS
    const spheres = [
      { size: 1.5, pos: [-8, 4, -5], color: 0x894def, speed: 0.5, rotSpeed: [0.4, 0.3, 0.2] },
      { size: 1.0, pos: [8, -3, -3], color: 0x4838a3, speed: 0.4, rotSpeed: [-0.3, 0.5, 0.25] },
      { size: 0.7, pos: [0, 6, -4], color: 0x6b5ba0, speed: 0.6, rotSpeed: [0.35, -0.4, 0.3] },
      { size: 0.9, pos: [-5, -5, -2], color: 0x7f68d9, speed: 0.45, rotSpeed: [0.25, 0.35, -0.4] },
      { size: 1.2, pos: [6, 2, -6], color: 0x5a46c2, speed: 0.55, rotSpeed: [-0.4, 0.3, 0.35] },
    ];

    spheres.forEach((sphereConfig) => {
      const sphere = new THREE.Mesh(
        new THREE.IcosahedronGeometry(sphereConfig.size, 2),
        new THREE.MeshBasicMaterial({ 
          color: sphereConfig.color, 
          wireframe: true, 
          transparent: true, 
          opacity: 0.12 
        })
      );
      sphere.position.set(...sphereConfig.pos);
      sphere.userData = sphereConfig;
      scene.add(sphere);
    });

    // ADDITIONAL SMALLER FLOATING PARTICLES LAYER
    const floatCount = 200;
    const floatGeometry = new THREE.BufferGeometry();
    const floatPositions = new Float32Array(floatCount * 3);
    const floatSizes = new Float32Array(floatCount);

    for (let i = 0; i < floatCount; i++) {
      floatPositions[i * 3]     = (Math.random() - 0.5) * 25;
      floatPositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      floatPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      floatSizes[i] = Math.random() * 2 + 0.2;
    }

    floatGeometry.setAttribute("position", new THREE.BufferAttribute(floatPositions, 3));
    floatGeometry.setAttribute("size", new THREE.BufferAttribute(floatSizes, 1));

    const floatMaterial = new THREE.PointsMaterial({
      color: 0xb89fff,
      size: 0.06,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    const floatParticles = new THREE.Points(floatGeometry, floatMaterial);
    scene.add(floatParticles);

    camera.position.z = 10;

    let mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = Date.now() * 0.0005;

      // MAIN PARTICLES ROTATION WITH MOUSE
      particles.rotation.y = t * 0.08 + mouse.x * 0.5;
      particles.rotation.x = t * 0.05 + mouse.y * 0.5;

      // FLOATING PARTICLES SLOWER ROTATION
      floatParticles.rotation.y = t * 0.03 + mouse.x * 0.2;
      floatParticles.rotation.x = t * 0.02 + mouse.y * 0.2;

      // ANIMATE ALL SPHERES WITH DIFFERENT SPEEDS
      scene.children.forEach((child, index) => {
        if (child.userData && child.userData.rotSpeed) {
          child.rotation.x += child.userData.rotSpeed[0] * 0.01;
          child.rotation.y += child.userData.rotSpeed[1] * 0.01;
          child.rotation.z += child.userData.rotSpeed[2] * 0.01;
          
          // SUBTLE FLOATING MOVEMENT
          child.position.y += Math.sin(t * child.userData.speed) * 0.02;
          child.position.x += Math.cos(t * child.userData.speed) * 0.015;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── SCROLL REVEAL HOOK ─────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return { ref, isVisible };
}

// ─── ANIMATED SECTION WRAPPER ─────────────────────────────────────────────────
function AnimatedSection({ children, className = "" }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20"
      } ${className}`}
    >
      {children}
    </div>
  );
}
function AnimatedStat({ value, label }) {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const num = parseInt(value.replace(/\D/g, ""));
      if (isNaN(num)) { setDisplayed(value); return; }
      const suffix = value.replace(/[\d]/g, "");
      let start = 0;
      const step = Math.ceil(num / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        setDisplayed(start + suffix);
        if (start >= num) clearInterval(timer);
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-2xl font-black text-accent tabular-nums transition-all duration-300 group-hover:scale-110">{displayed}</div>
      <div className="text-xs text-white/35 font-medium mt-1">{label}</div>
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────
function ServiceCard({ service, onLearnMore, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0)`
          : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        willChange: "transform",
      }}
      className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-accent/30 transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(120deg, transparent 30%, rgba(137,77,239,0.15) 50%, transparent 70%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        {service.highlight && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-accent text-[10px] font-bold tracking-wide rounded-full px-3 py-1 shadow-lg border border-accent/20">
            {service.highlight}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start flex-wrap gap-2 mb-3">
          <h3 className="text-base font-black text-secondary leading-tight">{service.title}</h3>
          <span className={`flex-shrink-0 bg-gradient-to-r ${service.gradient} text-white text-[10px] font-bold rounded-full px-3 py-1 shadow-sm whitespace-nowrap`}>
            {service.price}
          </span>
        </div>
        <p className="text-secondary/55 text-sm leading-relaxed mb-4">{service.shortDesc}</p>

        <p className="text-xs font-bold text-secondary mb-2">Key Features:</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
          {service.features.map((f, i) => (
            <div key={f} className="flex items-center gap-1.5 text-xs text-secondary/65">
              <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">✓</span>
              {f}
            </div>
          ))}
        </div>

        <p className="text-xs font-bold text-secondary mb-2">Available Materials:</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.materials.map((m) => (
            <span key={m} className="bg-gray-50 border border-gray-200 text-secondary/55 text-[11px] font-medium rounded-full px-3 py-1 hover:border-accent/30 hover:bg-accent/5 transition-colors duration-200 cursor-default">
              {m}
            </span>
          ))}
        </div>

        <div className="flex-1" />

        <button
          onClick={() => onLearnMore(service)}
          className="btn-color w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 shadow-md relative overflow-hidden group/btn"
        >
          <span className="relative z-10 flex items-center gap-2">
            Learn More <span className="text-base group-hover/btn:translate-x-1 transition-transform duration-200 inline-block">›</span>
          </span>
          <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [modalService, setModalService] = useState(null);
  const [openCategories, setOpenCategories] = useState(
    () => Object.fromEntries(CATEGORIES.map((c) => [c.id, false]))
  );

  const toggleCategory = (id) =>
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));

  const scrollToCategory = (id) => {
    setOpenCategories((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add highlight animation
        element.style.animation = "categoryPulse 0.6s ease-out";
      }
    }, 100);
  };

  const handleLearnMore = (service) => {
    setModalService(service);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes categoryPulse {
          0% { background-color: rgba(90, 70, 194, 0.05); }
          50% { background-color: rgba(90, 70, 194, 0.15); }
          100% { background-color: transparent; }
        }
        @keyframes smoothFadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(60px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes serviceCardEntrance {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes sectionReveal {
          from {
            opacity: 0;
            transform: translateY(80px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(40px);
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            backdrop-filter: blur(8px);
          }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }
        
        .modal-enter { animation: modalSlideIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .card-grid-enter { animation: serviceCardEntrance 0.6s ease-out both; }
        .section-reveal { animation: sectionReveal 0.8s ease-out both; }
        
        /* Smooth scroll reveal for AnimatedSection */
        .transition-all {
          transition: opacity 0.7s cubic-bezier(0.4, 0.0, 0.2, 1),
                      transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        
        /* Cursor pointer for clickable elements */
        button {
          cursor: pointer;
        }
        
        /* Hand cursor for service cards and category buttons */
        .group button,
        button[class*="btn"],
        [class*="button"] {
          cursor: pointer;
        }
        
        /* Hand cursor for interactive sections */
        section button {
          cursor: pointer;
        }
        
        /* Hand cursor for modal interactions */
        [role="button"] {
          cursor: pointer;
        }
        
        /* Change cursor for draggable items */
        .cursor-pointer {
          cursor: pointer;
        }
        
        .cursor-default {
          cursor: default;
        }
        
        /* Specific cursor changes for hover states */
        button:hover,
        [role="button"]:hover {
          cursor: pointer;
        }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #894def88, #5a46c288);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(to bottom, #894defbb, #5a46c2bb);
          cursor: pointer;
        }
      `}</style>

      <div className="bg-primary min-h-screen">
        
        {/* ── 1. BANNER ── */}
        <Banner
          path="Services"
          title={<>Explore Our<br /><span className="text-[#5a46c2]">Manufacturing Services</span></>}
          description="From 3D printing and digital design to precision cutting and LED signage — we offer comprehensive manufacturing solutions for every project."
          tagLine="What We Offer"
          imageUrl={null}
          buttonText="Browse Services"
          buttonLink="/"
        />

        {/* ── 2. CATEGORY CARDS SECTION WITH THREE.JS ── */}
        <AnimatedSection>
          <section className="relative overflow-hidden bg-gradient-to-br from-[#f0eeff] via-white to-[#eef4ff]">
            <ParticleBackground />
            
            <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/6 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl" />

            <div className="relative z-10 mx-[6%] py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    style={{ animation: "slideInUp 0.6s ease both", animationDelay: `${0.1 + i * 0.08}s` }}
                    className="group text-left bg-white/85 hover:bg-white backdrop-blur-md border border-gray-200/60 hover:border-accent/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Photo area - Fixed */}
                    <div className="relative h-36 overflow-hidden bg-gray-100">
                      <img
                        src={cat.photo}
                        alt={cat.label}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    </div>
                    {/* Text area - compact */}
                    <div className="p-4">
                      <h3 className="font-black text-secondary text-base leading-tight mb-1 group-hover:text-accent transition-colors duration-200">
                        {cat.label}
                      </h3>
                      <p className="text-secondary/50 text-xs">{getServicesFor(cat.id).length} services</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quality Assured Card - More Compact */}
              <div
                className="mt-6 flex items-center gap-3 bg-gradient-to-r from-accent/10 to-violet-500/10 backdrop-blur-md border border-accent/25 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300"
                style={{ animation: "slideInUp 0.6s ease 0.4s both" }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-white text-lg flex-shrink-0 shadow-md">✓</div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-secondary text-sm">Quality Assured</p>
                  <p className="text-secondary/60 text-xs mt-0.5">Trusted by thousands worldwide</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>



        {/* ── 4. SERVICES GRID WITH THREE.JS ── */}
        <AnimatedSection className="relative mx-[6%] rounded-3xl my-8">
          <main className="relative overflow-hidden bg-gradient-to-br from-[#f9f8ff] via-[#faf9ff] to-[#f5f3ff] rounded-3xl">
            <ParticleBackground />
            
            <div className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-violet-400/5 blur-3xl" />
            
            <div className="relative z-10 py-20 px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-secondary mb-3">Our Services</h2>
                <p className="text-secondary/60 text-base max-w-2xl mx-auto leading-relaxed">
                  Click a category to expand and see all available services.
                  Click <strong className="text-secondary/70">Learn More</strong> on any card for full details and pricing.
                </p>
              </div>

            <div className="space-y-16">
              {CATEGORIES.map((cat) => {
                const catServices = getServicesFor(cat.id);
                const isOpen = openCategories[cat.id];

                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-24">

                    {/* Category header */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between gap-6 mb-8 group text-left focus:outline-none transition-all duration-300"
                    >
                      <div className="flex items-center gap-6 flex-1">
                        {/* Photo thumbnail */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-accent/30 group-hover:border-accent group-hover:scale-110 transition-all duration-300 shadow-md">
                          <img
                            src={cat.photo}
                            alt={cat.label}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h2 className="text-3xl font-black text-secondary leading-tight group-hover:text-accent transition-colors duration-200 mb-2">
                            {cat.label}
                          </h2>
                          <p className="text-secondary/50 text-sm hidden sm:block">{cat.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="bg-accent/15 text-accent text-sm font-bold border border-accent/40 rounded-full px-4 py-2 group-hover:bg-accent/25 transition-all duration-200">
                          {catServices.length} service{catServices.length !== 1 ? "s" : ""}
                        </span>
                        <span className={`text-secondary/40 text-2xl transition-transform duration-300 group-hover:text-accent ${isOpen ? "rotate-180" : ""}`}>↓</span>
                      </div>
                    </button>

                    {/* Animated divider */}
                    <div className="relative h-0.5 bg-gray-200 mb-12 overflow-hidden rounded-full">
                      <div className={`absolute left-0 top-0 h-full bg-gradient-to-r from-accent via-violet-500 to-accent transition-all duration-700 ${isOpen ? "w-full" : "w-0"}`} />
                    </div>

                    {/* Cards */}
                    {isOpen && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 card-grid-enter">
                        {catServices.map((service, i) => (
                          <ServiceCard 
                            key={service.id} 
                            service={service} 
                            onLearnMore={setModalService} 
                            index={i} 
                          />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
          </main>
        </AnimatedSection>

        {/* ── 5. CUSTOM CTA SECTION ── */}
        <ReadyToStart/>

        {/* ── MODAL ── */}
        {modalService && (
          <div
            onClick={(e) => { if (e.target === e.currentTarget) setModalService(null); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-md"
            style={{ animation: "fadeIn 0.2s ease both" }}
          >
            <div className="modal-enter relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className={`h-1.5 w-full bg-gradient-to-r ${modalService.gradient} flex-shrink-0`} />

              <div className="relative h-32 overflow-hidden">
                <img src={modalService.image} alt={modalService.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
              </div>

              <button onClick={() => setModalService(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center text-secondary/40 hover:text-secondary transition-all duration-200 text-lg font-light shadow-md">
                ✕
              </button>

              <div className="p-8 pt-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${modalService.gradient} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                    {modalService.icon}
                  </div>
                  <div>
                    {modalService.highlight && (
                      <span className="inline-block mb-1.5 text-[10px] font-bold tracking-widest uppercase bg-accent/10 text-accent border border-accent/25 rounded-full px-3 py-0.5">
                        {modalService.highlight}
                      </span>
                    )}
                    <h2 className="text-2xl font-black text-secondary leading-tight">{modalService.title}</h2>
                    <p className="text-accent font-bold text-sm mt-1">{modalService.price}</p>
                  </div>
                </div>

                <p className="text-secondary/60 text-sm leading-relaxed mb-7">{modalService.fullDesc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-7">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-secondary/35 mb-3">Key Features</p>
                    <ul className="space-y-2.5">
                      {modalService.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-secondary/65">
                          <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-secondary/35 mb-3">Materials / Formats</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {modalService.materials.map((m) => (
                        <span key={m} className="bg-accent/8 border border-accent/20 text-accent text-xs font-semibold rounded-lg px-3 py-1.5 hover:bg-accent/15 transition-colors duration-200">
                          {m}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-secondary/35 mb-3">How It Works</p>
                    <ol className="space-y-2.5">
                      {HOW_IT_WORKS.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-secondary/60">
                          <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${modalService.gradient} text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="btn-color flex-1 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg relative overflow-hidden group">
                    <span className="relative z-10">Get a Quote for This Service →</span>
                    <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                  <button onClick={() => setModalService(null)}
                    className="px-5 py-3.5 rounded-xl font-semibold text-sm text-secondary/45 border border-gray-200 hover:border-gray-300 hover:text-secondary/70 transition-all duration-200">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
