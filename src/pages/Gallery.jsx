import React, { useState } from "react";
import { FiX, FiZoomIn, FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import Banner from "../components/layout/Banner";

/* ─────────────────────────────────────────────
   TEMP DATA — replace with real assets
───────────────────────────────────────────── */
const ITEMS = [
  // 3D Printing
  { id: 1,  category: "3D Printing",               src: "https://images.unsplash.com/photo-1631467174620-8dee3d8c07b5?w=600", title: "Geometric Lamp Shade"   },
  { id: 2,  category: "3D Printing",               src: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600", title: "Mechanical Gear Set"    },
  { id: 3,  category: "3D Printing",               src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600", title: "Abstract Vase"          },
  { id: 4,  category: "3D Printing",               src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600", title: "Circuit Board Model"    },
  { id: 5,  category: "3D Printing",               src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600", title: "Prototype Housing"      },

  // 3D Resin Printing
  { id: 6,  category: "3D Resin Printing",         src: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600",   title: "Resin Figurine"         },
  { id: 7,  category: "3D Resin Printing",         src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600", title: "Dental Model"           },
  { id: 8,  category: "3D Resin Printing",         src: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=600", title: "Jewelry Mold"           },
  { id: 9,  category: "3D Resin Printing",         src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600", title: "Miniature Architecture" },
  { id: 10, category: "3D Resin Printing",         src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600", title: "Custom Ring Band"       },

  // Laser Cutting & Engraving
  { id: 11, category: "Laser Cutting & Engraving", src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600", title: "Engraved Wood Panel"    },
  { id: 12, category: "Laser Cutting & Engraving", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",   title: "Acrylic Name Board"     },
  { id: 13, category: "Laser Cutting & Engraving", src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600", title: "Metal Etching"          },
  { id: 14, category: "Laser Cutting & Engraving", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600", title: "Decorative Pattern"     },
  { id: 15, category: "Laser Cutting & Engraving", src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600", title: "Corporate Trophy"       },

  // Light Letters
  { id: 16, category: "Light Letters",             src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600", title: "Neon Love Sign"         },
  { id: 17, category: "Light Letters",             src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",   title: "Wedding Backdrop"       },
  { id: 18, category: "Light Letters",             src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600", title: "Cafe Signage"           },

  // Injection Molding
  { id: 19, category: "Injection Molding",         src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600", title: "Plastic Component"      },
  { id: 20, category: "Injection Molding",         src: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600", title: "Mold Tooling"           },
  { id: 21, category: "Injection Molding",         src: "https://images.unsplash.com/photo-1631467174620-8dee3d8c07b5?w=600", title: "Mass Production Run"    },
  { id: 22, category: "Injection Molding",         src: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600",   title: "Medical Part"           },
];

const CATEGORIES = [
  { label: "All",                       count: 115 },
  { label: "3D Printing",               count: 12  },
  { label: "3D Resin Printing",         count: 45  },
  { label: "Laser Cutting & Engraving", count: 30  },
  { label: "Light Letters",             count: 8   },
  { label: "Injection Molding",         count: 20  },
];

const ACCENT = {
  "3D Printing":               { dot: "bg-violet-500",  tag: "bg-violet-100 text-violet-700",  glow: "rgba(139,92,246,.25)"  },
  "3D Resin Printing":         { dot: "bg-sky-500",     tag: "bg-sky-100 text-sky-700",        glow: "rgba(14,165,233,.25)"  },
  "Laser Cutting & Engraving": { dot: "bg-amber-500",   tag: "bg-amber-100 text-amber-700",    glow: "rgba(245,158,11,.25)"  },
  "Light Letters":             { dot: "bg-rose-500",    tag: "bg-rose-100 text-rose-700",      glow: "rgba(244,63,94,.25)"   },
  "Injection Molding":         { dot: "bg-emerald-500", tag: "bg-emerald-100 text-emerald-700",glow: "rgba(16,185,129,.25)"  },
};


/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({ item, all, onClose, onNav }) {
  if (!item) return null;
  const idx    = all.findIndex((i) => i.id === item.id);
  const accent = ACCENT[item.category] || { tag: "bg-slate-100 text-slate-600" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(8,6,18,.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 40px 100px rgba(90,70,194,.4)", animation: "lbIn .2s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* image only */}
        <div className="relative bg-slate-100" style={{ maxHeight: "70vh", overflow: "hidden" }}>
          <img src={item.src} alt={item.title} className="w-full h-full object-contain" style={{ maxHeight: "70vh" }} />
        </div>

        {/* info bar */}
        <div className="px-5 py-3.5 flex items-center gap-3 border-t border-slate-100">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${accent.tag}`}>
            {item.category}
          </span>
          <p className="text-sm font-black text-slate-900 flex-1 truncate">{item.title}</p>

          {/* nav */}
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => onNav(-1)} disabled={idx === 0}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-violet-50 hover:text-[#5a46c2] disabled:opacity-25 flex items-center justify-center transition-colors">
              <FiChevronLeft size={14} />
            </button>
            <span className="text-xs font-bold text-slate-400 w-12 text-center">{idx + 1} / {all.length}</span>
            <button onClick={() => onNav(1)} disabled={idx === all.length - 1}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-violet-50 hover:text-[#5a46c2] disabled:opacity-25 flex items-center justify-center transition-colors">
              <FiChevronRight size={14} />
            </button>
            <button onClick={onClose}
              className="ml-1 w-8 h-8 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors">
              <FiX size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GALLERY CARD
───────────────────────────────────────────── */
function GalleryCard({ item, onClick }) {
  const [hov, setHov] = useState(false);
  const accent = ACCENT[item.category] || { dot: "bg-slate-400", tag: "bg-slate-100 text-slate-500", glow: "rgba(0,0,0,.1)" };

  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer bg-slate-200 group"
      style={{
        transition: "box-shadow .25s, transform .25s",
        boxShadow: hov ? `0 20px 48px ${accent.glow}` : "0 2px 12px rgba(0,0,0,.06)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(item)}
    >
      {/* thumbnail */}
      <img
        src={item.src}
        alt={item.title}
        className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* center zoom icon */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hov ? "opacity-100" : "opacity-0"}`}>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white"
          style={{
            background: "linear-gradient(135deg,#5a46c2,#4838a3)",
            boxShadow: "0 4px 20px rgba(90,70,194,.55)",
            transform: hov ? "scale(1)" : "scale(0.7)",
            transition: "transform .25s",
          }}
        >
          <FiZoomIn size={16} />
        </div>
      </div>

      {/* title slide-up */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2.5 transition-transform duration-300"
        style={{ transform: hov ? "translateY(0)" : "translateY(100%)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
          <p className="text-xs font-black text-white truncate leading-none">{item.title}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Gallery() {
  const [activecat, setActivecat] = useState("All");
  const [lightbox, setLightbox]   = useState(null);

  const filtered = ITEMS.filter((i) => activecat === "All" || i.category === activecat);

  const navLightbox = (dir) => {
    const idx  = filtered.findIndex((i) => i.id === lightbox.id);
    const next = filtered[idx + dir];
    if (next) setLightbox(next);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @keyframes lbIn {
          from { opacity:0; transform:scale(.95); }
          to   { opacity:1; transform:scale(1);   }
        }
      `}</style>

      {/* Banner */}
      <Banner
        path="Gallery"
        title={<>Our Work in<br /><span className="text-[#5a46c2]">Full Detail</span></>}
        description="Browse our complete portfolio of 3D printing, resin, laser cutting, light letters and injection molding projects."
        tagLine="DNP 3D Studio"
        imageUrl={null}
        buttonText="Explore Now"
        buttonLink="#gallery"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12" id="gallery">

        {/* ── Header row ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiOutlineSparkles size={13} className="text-[#5a46c2]" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Gallery</p>
            </div>
            <p className="text-2xl font-black text-slate-900 leading-none">
              {filtered.length}
              <span className="text-slate-400 font-semibold text-base ml-1.5">items</span>
            </p>
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(({ label, count }) => {
            const acc     = ACCENT[label];
            const isActive = activecat === label;
            return (
              <button
                key={label}
                onClick={() => setActivecat(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  isActive
                    ? "text-white border-transparent shadow-md shadow-violet-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-violet-200 hover:text-[#5a46c2]"
                }`}
                style={isActive ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}
              >
                {acc && (
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-white/60" : acc.dot}`} />
                )}
                <span>{label}</span>
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Masonry grid ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-slate-300">
            <FiImage size={44} className="mb-3" />
            <p className="text-lg font-bold">No items found</p>
            <p className="text-sm mt-1 text-slate-400">Try a different category or type filter</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-gap:1rem]">
            {filtered.map((item) => (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <GalleryCard item={item} onClick={setLightbox} />
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox */}
      <Lightbox
        item={lightbox}
        all={filtered}
        onClose={() => setLightbox(null)}
        onNav={navLightbox}
      />
    </div>
  );
}