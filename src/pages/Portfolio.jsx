import React, { useState } from "react";
import {
  FiX, FiCalendar, FiUser, FiTag, FiArrowRight,
  FiChevronLeft, FiChevronRight, FiExternalLink,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineBarChart } from "react-icons/md";
import Banner from "../components/layout/Banner";

const PROJECTS = [
  {
    id: 1,
    title: "Architectural Scale Model",
    category: "3D Printing",
    client: "Nexus Architecture Co.",
    date: "Jan 2025",
    description: "A 1:50 scale model of a luxury residential complex built for a client presentation. Printed in sections and hand-assembled with interior lighting.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    ],
    stats: [
      { label: "Parts Printed", value: "124" },
      { label: "Print Hours",   value: "86h" },
      { label: "Scale",         value: "1:50" },
    ],
    tags: ["FDM", "Architecture", "Multi-part"],
    featured: true,
  },
  {
    id: 2,
    title: "Custom Resin Jewelry Collection",
    category: "3D Resin Printing",
    client: "Amara Jewels",
    date: "Feb 2025",
    description: "High-detail resin prints for a boutique jewelry designer — rings, pendants, and earring prototypes used directly for lost-wax casting.",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800",
    images: [
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    ],
    stats: [
      { label: "Pieces",     value: "32"   },
      { label: "Resolution", value: "25µm" },
      { label: "Turnaround", value: "3 days" },
    ],
    tags: ["Resin", "Jewelry", "High Detail"],
  },
  {
    id: 3,
    title: "Branded Acrylic Signage",
    category: "Laser Cutting & Engraving",
    client: "The Roast Room Café",
    date: "Mar 2025",
    description: "Full interior signage package for a specialty coffee shop — menu boards, wall lettering, and table numbers, laser cut from 5mm frosted acrylic.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800",
    ],
    stats: [
      { label: "Signs",    value: "18"  },
      { label: "Material", value: "Acrylic" },
      { label: "Days",     value: "5"   },
    ],
    tags: ["Laser Cut", "Signage", "Acrylic"],
  },
  {
    id: 4,
    title: "Wedding LED Light Letters",
    category: "Light Letters",
    client: "Private Client",
    date: "Mar 2025",
    description: "Customised LED-backlit letter props for a luxury beach wedding. Warm-white LEDs, remote-dimming, and weather-resistant finish for outdoor use.",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    ],
    stats: [
      { label: "Letters",  value: "6"     },
      { label: "Height",   value: "60cm"  },
      { label: "Battery",  value: "8h run" },
    ],
    tags: ["LED", "Wedding", "Custom"],
  },
  {
    id: 5,
    title: "Industrial Plastic Housing",
    category: "Injection Molding",
    client: "TechParts Lanka",
    date: "Apr 2025",
    description: "Mass production of an ABS enclosure for an IoT sensor device. Tooling designed in-house with a 2-cavity mold for efficient cycle times.",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800",
    images: [
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    ],
    stats: [
      { label: "Units",      value: "2,000"  },
      { label: "Cycle Time", value: "28s"    },
      { label: "Material",   value: "ABS"    },
    ],
    tags: ["Injection", "Mass Production", "ABS"],
    featured: true,
  },
  {
    id: 6,
    title: "Drone Body Prototype",
    category: "3D Printing",
    client: "AeroLab Sri Lanka",
    date: "May 2025",
    description: "Rapid prototyping of a lightweight drone chassis for a university research team — iterative prints in PETG with carbon fibre reinforcement inserts.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800",
    ],
    stats: [
      { label: "Iterations", value: "7"    },
      { label: "Weight",     value: "310g" },
      { label: "Material",   value: "PETG" },
    ],
    tags: ["Prototype", "PETG", "R&D"],
  },
];

const CATEGORIES = ["All", "3D Printing", "3D Resin Printing", "Laser Cutting & Engraving", "Light Letters", "Injection Molding"];

const ACCENT = {
  "3D Printing":               { dot: "bg-violet-500",  pill: "bg-violet-100 text-violet-700",  border: "border-violet-200" },
  "3D Resin Printing":         { dot: "bg-sky-500",     pill: "bg-sky-100 text-sky-700",        border: "border-sky-200"    },
  "Laser Cutting & Engraving": { dot: "bg-amber-500",   pill: "bg-amber-100 text-amber-700",    border: "border-amber-200"  },
  "Light Letters":             { dot: "bg-rose-500",    pill: "bg-rose-100 text-rose-700",      border: "border-rose-200"   },
  "Injection Molding":         { dot: "bg-emerald-500", pill: "bg-emerald-100 text-emerald-700",border: "border-emerald-200"},
};

function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  if (!project) return null;
  const acc = ACCENT[project.category] || { pill: "bg-slate-100 text-slate-600", border: "border-slate-200" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
      style={{ background: "rgba(8,6,18,.9)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden my-auto"
        style={{ boxShadow: "0 40px 100px rgba(90,70,194,.4)", animation: "modalIn .2s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden bg-slate-100" style={{ paddingTop: "52%" }}>
          <img
            key={imgIdx}
            src={project.images[imgIdx]}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: "fadeImg .25s ease both" }}
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx((i) => Math.max(0, i - 1))}
                disabled={imgIdx === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 disabled:opacity-30 hover:bg-white transition-all shadow-md"
              >
                <FiChevronLeft size={15} />
              </button>
              <button
                onClick={() => setImgIdx((i) => Math.min(project.images.length - 1, i + 1))}
                disabled={imgIdx === project.images.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 disabled:opacity-30 hover:bg-white transition-all shadow-md"
              >
                <FiChevronRight size={15} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`rounded-full transition-all ${i === imgIdx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
          {project.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#5a46c2] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              <HiOutlineSparkles size={11} /> Featured
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-md"
          >
            <FiX size={15} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${acc.pill}`}>
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-violet-600 text-white">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">{project.title}</h2>
            </div>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed mb-5">{project.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {project.stats.map((s) => (
              <div key={s.label} className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3 text-center">
                <p className="text-lg font-black text-[#5a46c2] leading-none">{s.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 py-4 border-t border-slate-100 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <FiUser size={12} className="text-violet-400" />
              {project.client}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <FiCalendar size={12} className="text-violet-400" />
              {project.date}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const [hov, setHov] = useState(false);
  const acc = ACCENT[project.category] || { dot: "bg-slate-400", pill: "bg-slate-100 text-slate-600" };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-violet-100 cursor-pointer flex flex-col"
      style={{
        transition: "box-shadow .25s, transform .25s",
        boxShadow: hov ? "0 16px 48px rgba(90,70,194,.15)" : "0 2px 12px rgba(90,70,194,.06)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(project)}
    >
      {/* image */}
      <div className="relative overflow-hidden" style={{ paddingTop: "60%" }}>
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hov ? "scale(1.06)" : "scale(1)" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300"
          style={{ opacity: hov ? 1 : 0 }}
        />
        {/* featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#5a46c2] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            <HiOutlineSparkles size={10} /> Featured
          </div>
        )}
        {/* hover CTA */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: hov ? 1 : 0 }}
        >
          <div className="flex items-center gap-2 bg-white text-[#5a46c2] text-xs font-black px-4 py-2 rounded-full shadow-lg">
            View Project <FiArrowRight size={12} />
          </div>
        </div>
      </div>

      {/* body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* category */}
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${acc.dot}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${acc.pill}`}>
            {project.category}
          </span>
        </div>

        {/* title + desc */}
        <div>
          <h3 className="text-sm font-black text-slate-900 leading-snug mb-1 group-hover:text-[#5a46c2] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{project.description}</p>
        </div>

        {/* stats strip */}
        <div className="flex gap-2 mt-auto">
          {project.stats.slice(0, 2).map((s) => (
            <div key={s.label} className="flex-1 bg-slate-50 rounded-xl px-2.5 py-2 text-center border border-slate-100">
              <p className="text-sm font-black text-[#5a46c2] leading-none">{s.value}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <FiUser size={10} className="text-violet-400" />
            {project.client}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <FiCalendar size={10} className="text-violet-400" />
            {project.date}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Portfolio() {
  const [activecat, setActivecat] = useState("All");
  const [modal, setModal]         = useState(null);

  const filtered = PROJECTS.filter((p) => activecat === "All" || p.category === activecat);
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @keyframes modalIn {
          from { opacity:0; transform:scale(.96) translateY(8px); }
          to   { opacity:1; transform:scale(1)   translateY(0);   }
        }
        @keyframes fadeImg {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>

      {/* Banner */}
      <Banner
        path="Portfolio"
        title={<>Projects We're<br /><span className="text-[#5a46c2]">Proud Of</span></>}
        description="A showcase of our real-world work across 3D printing, resin, laser cutting, light letters and injection molding."
        tagLine="Our Workshop"
        imageUrl={null}
        buttonText="See All Work"
        buttonLink="#portfolio"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12" id="portfolio">

        {/* ── Featured strip ── */}
        {featured.length > 0 && activecat === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineSparkles size={13} className="text-[#5a46c2]" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured Projects</p>
              <div className="flex-1 h-px bg-slate-100 ml-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={setModal} />
              ))}
            </div>
          </div>
        )}

        {/* ── Header + filters ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">All Projects</p>
            <p className="text-2xl font-black text-slate-900 leading-none">
              {filtered.length}
              <span className="text-slate-400 font-semibold text-base ml-1.5">projects</span>
            </p>
          </div>
        </div>

        {/* category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const acc      = ACCENT[cat];
            const isActive = activecat === cat;
            const count    = cat === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActivecat(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  isActive
                    ? "text-white border-transparent shadow-md shadow-violet-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-violet-200 hover:text-[#5a46c2]"
                }`}
                style={isActive ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}
              >
                {acc && <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white/60" : acc.dot}`} />}
                {cat}
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Project grid ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-slate-300">
            <MdOutlineBarChart size={44} className="mb-3" />
            <p className="text-lg font-bold text-slate-400">No projects in this category yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={setModal} />
            ))}
          </div>
        )}

        {/* ── CTA strip ── */}
        <div
          className="mt-14 rounded-3xl px-8 py-8 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative z-10 text-center sm:text-left">
            <p className="text-white font-black text-xl leading-tight mb-1">Have a project in mind?</p>
            <p className="text-white/60 text-sm">Let's bring your idea to life — request a free quote today.</p>
          </div>
          <a
            href="/contact"
            className="relative z-10 shrink-0 flex items-center gap-2 bg-white text-[#5a46c2] font-black text-sm px-6 py-3 rounded-full hover:bg-violet-50 transition-colors shadow-lg"
          >
            Get a Quote <FiArrowRight size={14} />
          </a>
        </div>

      </div>

      {/* Modal */}
      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </div>
  );
}