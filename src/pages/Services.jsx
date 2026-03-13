import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  {
    id: "3d-printing",
    label: "3D Printing",
    icon: "🖨️",
    description: "From rapid prototyping to final production parts — the full range of additive manufacturing technologies.",
  },
  {
    id: "modeling-design",
    label: "Modeling & Design",
    icon: "🎨",
    description: "Digital design services that turn your ideas into precise, manufacturable 3D geometry.",
  },
  {
    id: "cutting-engraving",
    label: "Cutting & Engraving",
    icon: "⚡",
    description: "Precision subtractive and marking services for clean edges, fine detail, and branded surfaces.",
  },
  {
    id: "production-signage",
    label: "Production & Signage",
    icon: "🏭",
    description: "High-volume manufacturing and custom illuminated signage for businesses at any scale.",
  },
];

const SERVICES = [
  {
    id: "fdm-printing",
    categoryId: "3d-printing",
    icon: "🖨️",
    title: "FDM 3D Printing",
    price: "Starting from Rs. 4,500",
    shortDesc: "High-quality 3D printing with various materials and finishes.",
    fullDesc: "FDM (Fused Deposition Modeling) is the most widely-used 3D printing technology. We extrude thermoplastic filaments layer-by-layer to build strong, functional parts. Ideal for prototypes, jigs, fixtures, and end-use components with tight dimensional accuracy.",
    features: ["FDM Technology", "Multiple Materials", "SLA/SLS Options", "Fast Turnaround"],
    materials: ["PLA", "ABS", "PETG", "Nylon", "Resin"],
    highlight: "Most Popular",
    gradient: "from-violet-600 to-indigo-500",
  },
  {
    id: "sla-printing",
    categoryId: "3d-printing",
    icon: "💎",
    title: "SLA / Resin Printing",
    price: "Starting from Rs. 6,000",
    shortDesc: "Ultra-high detail resin printing for smooth, precise models.",
    fullDesc: "Stereolithography (SLA) uses a UV laser to cure liquid resin, producing parts with exceptional surface finish and fine detail. Perfect for jewelry masters, dental models, miniatures, and any application where surface quality is paramount.",
    features: ["Ultra Fine Detail", "Smooth Surface", "High Accuracy", "Transparent Options"],
    materials: ["Standard Resin", "ABS-Like", "Dental Resin", "Castable"],
    highlight: null,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "3d-modeling",
    categoryId: "modeling-design",
    icon: "🎨",
    title: "3D Modeling",
    price: "Starting from Rs. 5,000",
    shortDesc: "Professional digital design for any concept, from art to engineering.",
    fullDesc: "Our designers create detailed 3D models from scratch using industry-standard tools. Whether you have a sketch, a reference photo, or just an idea — we translate it into a print-ready or render-ready file. We specialise in both organic sculpting and hard-surface parametric design.",
    features: ["Organic Sculpting", "Rendering", "Parametric Design", "Reverse Engineering"],
    materials: ["STL", "OBJ", "STEP", "IGES"],
    highlight: null,
    gradient: "from-fuchsia-500 to-violet-600",
  },
  {
    id: "cad-design",
    categoryId: "modeling-design",
    icon: "📐",
    title: "CAD Design",
    price: "Starting from Rs. 8,000",
    shortDesc: "Precise Computer-Aided Design for engineering specifications and manufacturing.",
    fullDesc: "We produce accurate 2D drawings and 3D CAD assemblies for manufacturing, tooling, and full documentation. Every file includes proper tolerances, GD&T annotations, and a Bill of Materials. Our engineers work to your specs or help you develop them from scratch.",
    features: ["2D Drafting", "Tolerance Analysis", "3D Assemblies", "BOM Creation"],
    materials: ["Metal", "Plastic", "Sheet Metal", "Assemblies"],
    highlight: null,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "laser-cutting",
    categoryId: "cutting-engraving",
    icon: "⚡",
    title: "Laser Cutting",
    price: "Starting from Rs. 6,000",
    shortDesc: "Precision laser cutting for various materials with excellent edge quality.",
    fullDesc: "Our CO₂ and fiber laser cutters handle everything from thin paper to thick metal with consistent, burr-free edges. We support complex nested layouts to minimise waste and offer same-day turnaround for urgent jobs. Ideal for signage blanks, enclosures, art pieces, and packaging.",
    features: ["High Precision", "Complex Designs", "Multiple Materials", "Clean Edges"],
    materials: ["Acrylic", "Wood", "Metal", "Cardboard", "Foam"],
    highlight: null,
    gradient: "from-orange-500 to-rose-500",
  },
  {
    id: "engraving",
    categoryId: "cutting-engraving",
    icon: "✍️",
    title: "Engraving",
    price: "Starting from Rs. 3,000",
    shortDesc: "Professional engraving services for personalization and branding.",
    fullDesc: "We offer both laser and CNC rotary engraving for permanent, high-contrast marking. From corporate gifts and trophies to industrial part identification — crisp, precise results on virtually any surface. Upload your artwork or logo and we handle the rest.",
    features: ["Laser Engraving", "CNC Engraving", "Multiple Materials", "Fine Details"],
    materials: ["Metal", "Wood", "Glass", "Acrylic", "Leather"],
    highlight: "Best Value",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "injection-molding",
    categoryId: "production-signage",
    icon: "🏭",
    title: "Injection Molding",
    price: "Starting from Rs. 15,000",
    shortDesc: "High-volume mass production for plastic components with consistent quality.",
    fullDesc: "Injection molding is the gold standard for high-volume plastic parts. Once the mould is made, per-unit costs drop dramatically. We offer rapid aluminium tooling for low-to-medium volumes and full steel tools for long production runs. Tight tolerances and excellent surface finishes guaranteed.",
    features: ["High Volume", "Complex Geometries", "Low Unit Cost", "Rapid Tooling"],
    materials: ["ABS", "Polypropylene", "Nylon", "Polycarbonate"],
    highlight: null,
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    id: "led-signage",
    categoryId: "production-signage",
    icon: "💡",
    title: "LED Signage",
    price: "Starting from Rs. 12,000",
    shortDesc: "Custom illuminated signs to enhance your business visibility and branding.",
    fullDesc: "We design and fabricate custom LED signs — from neon-flex channel letters to backlit acrylic panels and full-colour RGB displays. All builds are weatherproof and engineered for 24/7 operation. Perfect for storefronts, trade show booths, reception areas, and event branding.",
    features: ["Custom Shapes", "RGB Options", "Neon Flex", "Weatherproof"],
    materials: ["Acrylic", "LED Flex", "ACP", "PVC"],
    highlight: null,
    gradient: "from-pink-500 to-fuchsia-600",
  },
];

const HOW_IT_WORKS = [
  "Submit your design file or describe your idea",
  "Receive a detailed quote within 24 hours",
  "We manufacture with precision & quality checks",
  "Your order is delivered to your doorstep",
];


const getServicesFor = (catId) => SERVICES.filter((s) => s.categoryId === catId);

/* Smooth animated collapse/expand wrapper */
function AnimatedCollapse({ isOpen, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => {
        if (ref.current) setHeight(ref.current.scrollHeight);
      });
    } else {
      setHeight(0);
      const t = setTimeout(() => setVisible(false), 420);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div
      style={{
        height: isOpen ? height : 0,
        overflow: "hidden",
        transition: "height 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

export default function ServicesPage() {
  const [modalService, setModalService] = useState(null);
  const [openCategories, setOpenCategories] = useState(
    () => Object.fromEntries(CATEGORIES.map((c) => [c.id, false]))
  );

  const toggleCategory = (id) =>
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));

  const scrollToCategory = (id) => {
    setOpenCategories((prev) => ({ ...prev, [id]: true }));
    setTimeout(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0eeff] via-white to-[#eef4ff] border-b border-gray-100">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/6 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-4 py-2 text-xs font-semibold text-secondary/50 mb-6 shadow-sm">
              🏠 Home <span className="text-gray-300">›</span>
              <span className="text-secondary">Service</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                ⚙️
              </div>
              <h1 className="text-5xl font-black text-secondary leading-tight tracking-tight">Service</h1>
            </div>
            <p className="text-secondary/50 text-base leading-relaxed mb-6 max-w-md">
              Precision manufacturing from digital design to physical production.
            </p>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-1 rounded-full bg-accent" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/20" />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-4 py-2.5 text-sm font-semibold text-secondary/65 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Trusted Worldwide
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-4 py-2.5 text-sm font-semibold text-secondary/65 shadow-sm">
                ⭐ 5.0 Rating
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => scrollToCategory(cat.id)}
                className="group text-left bg-white/70 hover:bg-white border border-gray-200 hover:border-accent/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-250 hover:-translate-y-0.5">
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <p className="font-black text-secondary text-sm leading-tight mb-1 group-hover:text-accent transition-colors">
                  {cat.label}
                </p>
                <p className="text-secondary/35 text-xs">{getServicesFor(cat.id).length} services</p>
              </button>
            ))}
            <div className="col-span-2 flex items-center gap-4 bg-white/80 border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md">✓</div>
              <div>
                <p className="font-bold text-secondary text-sm">Quality Assured</p>
                <p className="text-secondary/40 text-xs mt-0.5">Trusted by thousands of customers worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-6 py-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-secondary mb-2">Services Grid</h2>
          <p className="text-secondary/40 text-sm max-w-lg mx-auto">
            Click <strong className="text-secondary/60">View Services</strong> to expand a category.
            Click <strong className="text-secondary/60">Learn More</strong> on any card for full details.
          </p>
        </div>

        <div className="space-y-5">
          {CATEGORIES.map((cat) => {
            const catServices = getServicesFor(cat.id);
            const isOpen = openCategories[cat.id];

            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">

                {/* Category row */}
                <div className="flex items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-accent/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-secondary leading-tight">{cat.label}</h2>
                      <p className="text-secondary/40 text-sm mt-0.5 hidden sm:block">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="bg-accent/10 text-accent text-xs font-bold border border-accent/20 rounded-full px-3 py-1">
                      {catServices.length} service{catServices.length !== 1 ? "s" : ""}
                    </span>
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-xs font-bold shadow-md hover:opacity-90 hover:scale-105 transition-all duration-200"
                    >
                      {isOpen ? "Hide Services" : "View Services"}
                      <span className={`text-sm transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>›</span>
                    </button>
                  </div>
                </div>

                {/* Cards with smooth animated expand */}
                <AnimatedCollapse isOpen={isOpen}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 mb-2">
                    {catServices.map((service, i) => (
                      <div key={service.id}
                        style={{
                          animation: isOpen ? `cardFadeUp 0.45s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms both` : "none",
                        }}
                        className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-accent/30 hover:-translate-y-1.5 transition-all duration-300">

                        <style>{`
                          @keyframes cardFadeUp {
                            from { opacity: 0; transform: translateY(22px) scale(0.97); }
                            to   { opacity: 1; transform: translateY(0)    scale(1);    }
                          }
                        `}</style>

                        <div className={`relative h-48 bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                          <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                          <span className="relative text-7xl drop-shadow-md group-hover:scale-110 transition-transform duration-500">
                            {service.icon}
                          </span>
                          {service.highlight && (
                            <span className="absolute top-3 right-3 bg-white/90 text-accent text-[10px] font-bold tracking-wide rounded-full px-3 py-1 shadow">
                              {service.highlight}
                            </span>
                          )}
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
                            {service.features.map((f) => (
                              <div key={f} className="flex items-center gap-1.5 text-xs text-secondary/65">
                                <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">✓</span>
                                {f}
                              </div>
                            ))}
                          </div>

                          <p className="text-xs font-bold text-secondary mb-2">Available Materials:</p>
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {service.materials.map((m) => (
                              <span key={m} className="bg-gray-50 border border-gray-200 text-secondary/55 text-[11px] font-medium rounded-full px-3 py-1">
                                {m}
                              </span>
                            ))}
                          </div>

                          <div className="flex-1" />

                          <button onClick={() => setModalService(service)}
                            className="btn-color w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-md">
                            Learn More <span className="text-base">›</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedCollapse>
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer CTA */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-[#f0eeff] to-white py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-secondary mb-3">Ready to start your project?</h2>
          <p className="text-secondary/45 text-sm leading-relaxed mb-8">
            Tell us your idea and we'll handle everything — from design file to final delivery.
          </p>
          <button className="btn-color px-10 py-4 rounded-2xl font-bold text-base shadow-xl hover:opacity-90 hover:scale-105 transition-all duration-200">
            Get a Free Quote →
          </button>
        </div>
      </section>

      {/* Learn More Modal */}
      {modalService && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setModalService(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[slideIn_0.28s_ease_both] max-h-[90vh] overflow-y-auto">
            <div className={`h-1.5 w-full bg-gradient-to-r ${modalService.gradient} flex-shrink-0`} />
            <button onClick={() => setModalService(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-secondary/40 hover:text-secondary transition-all duration-200 text-lg font-light">
              ✕
            </button>
            <div className="p-8">
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
                      <span key={m} className="bg-accent/8 border border-accent/20 text-accent text-xs font-semibold rounded-lg px-3 py-1.5">
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
                <button className="btn-color flex-1 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg">
                  Get a Quote for This Service →
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
  );
}