import React, { useState, useEffect } from "react";
import { FiX, FiZoomIn, FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import Banner from "../components/layout/Banner";
import { getAllGalleries } from "../api/galleryApi";
import { getAllCategories } from "../api/api";

const ACCENT_COLORS = [
  { dot: "bg-violet-500", tag: "bg-violet-100 text-violet-700",  glow: "rgba(139,92,246,.25)"  },
  { dot: "bg-sky-500",    tag: "bg-sky-100 text-sky-700",        glow: "rgba(14,165,233,.25)"  },
  { dot: "bg-amber-500",  tag: "bg-amber-100 text-amber-700",    glow: "rgba(245,158,11,.25)"  },
  { dot: "bg-rose-500",   tag: "bg-rose-100 text-rose-700",      glow: "rgba(244,63,94,.25)"   },
  { dot: "bg-emerald-500",tag: "bg-emerald-100 text-emerald-700",glow: "rgba(16,185,129,.25)"  },
  { dot: "bg-orange-500", tag: "bg-orange-100 text-orange-700",  glow: "rgba(249,115,22,.25)"  },
];

function getAccent(categoryType, categoryList) {
  const idx = categoryList.findIndex((c) => c.c_type === categoryType);
  return ACCENT_COLORS[(idx >= 0 ? idx : 0) % ACCENT_COLORS.length];
}

function transformGalleries(data, categoryList) {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    src: item.image_url,
    category: item.category?.c_type || categoryList[0]?.c_type || "General",
  }));
}

/* ── Lightbox ── */
function Lightbox({ item, all, onClose, onNav, categoryList }) {
  if (!item) return null;
  const idx    = all.findIndex((i) => i.id === item.id);
  const accent = getAccent(item.category, categoryList);

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
        <div className="relative bg-slate-100" style={{ maxHeight: "70vh", overflow: "hidden" }}>
          <img src={item.src} alt={item.title} className="w-full h-full object-contain" style={{ maxHeight: "70vh" }} />
        </div>

        <div className="px-5 py-3.5 flex items-center gap-3 border-t border-slate-100">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${accent.tag}`}>
            {item.category}
          </span>
          <p className="text-sm font-black text-slate-900 flex-1 truncate">{item.title}</p>

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

/* ── Gallery Card ── */
function GalleryCard({ item, onClick, categoryList }) {
  const [hov, setHov] = useState(false);
  const accent = getAccent(item.category, categoryList);

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
      <img src={item.src} alt={item.title}
        className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
        loading="lazy" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hov ? "opacity-100" : "opacity-0"}`}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white"
          style={{
            background: "linear-gradient(135deg,#5a46c2,#4838a3)",
            boxShadow: "0 4px 20px rgba(90,70,194,.55)",
            transform: hov ? "scale(1)" : "scale(0.7)",
            transition: "transform .25s",
          }}>
          <FiZoomIn size={16} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 transition-transform duration-300"
        style={{ transform: hov ? "translateY(0)" : "translateY(100%)" }}>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
          <p className="text-xs font-black text-white truncate leading-none">{item.title}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function Gallery() {
  const [activecat, setActivecat]   = useState("All");
  const [lightbox, setLightbox]     = useState(null);
  const [items, setItems]           = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [galleriesRes, categoriesRes] = await Promise.all([getAllGalleries(), getAllCategories()]);

        const cats = categoriesRes.success ? categoriesRes.data : [];
        setCategoryList(cats);

        if (galleriesRes.success && galleriesRes.data) {
          setItems(transformGalleries(galleriesRes.data, cats));
        } else {
          setError("Failed to load gallery");
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError("Error loading gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allCategories = ["All", ...categoryList.map((c) => c.c_type)];
  const filtered      = items.filter((i) => activecat === "All" || i.category === activecat);

  const navLightbox = (dir) => {
    const idx  = filtered.findIndex((i) => i.id === lightbox.id);
    const next = filtered[idx + dir];
    if (next) setLightbox(next);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#5a46c2] animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-semibold">Loading gallery...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#5a46c2] text-white rounded-full font-bold hover:bg-violet-700 transition-colors">
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @keyframes lbIn { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
      `}</style>

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

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiOutlineSparkles size={13} className="text-[#5a46c2]" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Gallery</p>
            </div>
            <p className="text-2xl font-black text-slate-900 leading-none">
              {filtered.length}<span className="text-slate-400 font-semibold text-base ml-1.5">items</span>
            </p>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map((cat) => {
            const acc     = cat !== "All" ? getAccent(cat, categoryList) : null;
            const isActive = activecat === cat;
            const count   = cat === "All" ? items.length : items.filter((i) => i.category === cat).length;
            return (
              <button key={cat} onClick={() => setActivecat(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  isActive ? "text-white border-transparent shadow-md shadow-violet-200"
                           : "bg-white border-slate-200 text-slate-600 hover:border-violet-200 hover:text-[#5a46c2]"
                }`}
                style={isActive ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}>
                {acc && <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-white/60" : acc.dot}`} />}
                {cat}
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-slate-300">
            <FiImage size={44} className="mb-3" />
            <p className="text-lg font-bold text-slate-400">No items found</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-gap:1rem]">
            {filtered.map((item) => (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <GalleryCard item={item} onClick={setLightbox} categoryList={categoryList} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox item={lightbox} all={filtered} onClose={() => setLightbox(null)} onNav={navLightbox} categoryList={categoryList} />
    </div>
  );
}