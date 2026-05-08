import React, { useState, useEffect } from "react";
import {
  FiX, FiCalendar, FiUser, FiArrowRight,
  FiChevronLeft, FiChevronRight, FiExternalLink,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineBarChart } from "react-icons/md";
import Banner from "../components/layout/Banner";
import ReadyToStart from "../components/ReadyToStart";
import { getAllProjects } from "../api/portfolioApi";
import { getAllCategories } from "../api/api";

const ACCENT_COLORS = [
  { dot: "bg-violet-500", pill: "bg-violet-100 text-violet-700" },
  { dot: "bg-sky-500",    pill: "bg-sky-100 text-sky-700"       },
  { dot: "bg-amber-500",  pill: "bg-amber-100 text-amber-700"   },
  { dot: "bg-rose-500",   pill: "bg-rose-100 text-rose-700"     },
  { dot: "bg-emerald-500",pill: "bg-emerald-100 text-emerald-700"},
  { dot: "bg-orange-500", pill: "bg-orange-100 text-orange-700" },
];

function getAccent(categoryName, categoryList) {
  const idx = categoryList.findIndex((c) => c.c_type === categoryName);
  return ACCENT_COLORS[(idx >= 0 ? idx : 0) % ACCENT_COLORS.length];
}

function transformApiData(apiProjects, categoryList) {
  return apiProjects.map((project, idx) => {
    const images = project.images?.map((img) => img.imageUrl) || [];
    const mainImage = images[0] || "https://via.placeholder.com/400";
    const tags = project.features?.split(", ").slice(0, 3) || [];
    const category = categoryList.find((c) => c.c_type === project.features?.split(",")[0]?.trim())
      ? project.features.split(",")[0].trim()
      : categoryList[0]?.c_type || "General";

    return {
      id: project.portfolio_id,
      title: project.title,
      category,
      client: "Client Project",
      date: new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "short" }),
      description: project.description,
      image: mainImage,
      images: images.length > 0 ? images : [mainImage],
      stats: [
        { label: "Date",   value: new Date(project.date).getFullYear().toString() },
        { label: "Items",  value: (idx + 1).toString() },
        { label: "Status", value: "Complete" },
      ],
      tags,
      featured: idx < 2,
      socialMediaType: project.socialMediaType,
      linkPath: project.linkPath,
    };
  });
}

function ProjectModal({ project, onClose, categoryList }) {
  const [imgIdx, setImgIdx] = useState(0);
  if (!project) return null;
  const acc = getAccent(project.category, categoryList);

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
        {/* Image carousel */}
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
              <button onClick={() => setImgIdx((i) => Math.max(0, i - 1))} disabled={imgIdx === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 disabled:opacity-30 hover:bg-white transition-all shadow-md">
                <FiChevronLeft size={15} />
              </button>
              <button onClick={() => setImgIdx((i) => Math.min(project.images.length - 1, i + 1))} disabled={imgIdx === project.images.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 disabled:opacity-30 hover:bg-white transition-all shadow-md">
                <FiChevronRight size={15} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`rounded-full transition-all ${i === imgIdx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"}`} />
                ))}
              </div>
            </>
          )}
          {project.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#5a46c2] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              <HiOutlineSparkles size={11} /> Featured
            </div>
          )}
          <button onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-md">
            <FiX size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${acc.pill}`}>
                {project.category}
              </span>
              {project.featured && (
                <span className="ml-2 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-violet-600 text-white">
                  Featured
                </span>
              )}
              <h2 className="text-xl font-black text-slate-900 leading-tight mt-2">{project.title}</h2>
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
              <FiUser size={12} className="text-violet-400" /> {project.client}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <FiCalendar size={12} className="text-violet-400" /> {project.date}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">#{tag}</span>
            ))}
          </div>

          {project.linkPath && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <a href={project.linkPath} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#5a46c2] text-xs font-bold hover:text-violet-700 transition-colors">
                View on {project.socialMediaType} <FiExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick, categoryList }) {
  const [hov, setHov] = useState(false);
  const acc = getAccent(project.category, categoryList);

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
      <div className="relative overflow-hidden" style={{ paddingTop: "60%" }}>
        <img src={project.image} alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hov ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300"
          style={{ opacity: hov ? 1 : 0 }} />
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#5a46c2] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            <HiOutlineSparkles size={10} /> Featured
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ opacity: hov ? 1 : 0 }}>
          <div className="flex items-center gap-2 bg-white text-[#5a46c2] text-xs font-black px-4 py-2 rounded-full shadow-lg">
            View Project <FiArrowRight size={12} />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${acc.dot}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${acc.pill}`}>
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-black text-slate-900 leading-snug mb-1">{project.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{project.description}</p>
        </div>

        <div className="flex gap-2 mt-auto">
          {project.stats.slice(0, 2).map((s) => (
            <div key={s.label} className="flex-1 bg-slate-50 rounded-xl px-2.5 py-2 text-center border border-slate-100">
              <p className="text-sm font-black text-[#5a46c2] leading-none">{s.value}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <FiUser size={10} className="text-violet-400" /> {project.client}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <FiCalendar size={10} className="text-violet-400" /> {project.date}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activecat, setActivecat] = useState("All");
  const [modal, setModal] = useState(null);
  const [projects, setProjects] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsRes, categoriesRes] = await Promise.all([getAllProjects(), getAllCategories()]);

        const cats = categoriesRes.success ? categoriesRes.data : [];
        setCategoryList(cats);

        if (projectsRes.success && projectsRes.data) {
          setProjects(transformApiData(projectsRes.data, cats));
        } else {
          setError("Failed to load projects");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allCategories = ["All", ...categoryList.map((c) => c.c_type)];
  const filtered = projects.filter((p) => activecat === "All" || p.category === activecat);
  const featured = projects.filter((p) => p.featured);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#5a46c2] animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-semibold">Loading projects...</p>
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
        @keyframes modalIn { from{opacity:0;transform:scale(.96) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeImg  { from{opacity:0} to{opacity:1} }
      `}</style>

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

        {/* Featured strip */}
        {featured.length > 0 && activecat === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineSparkles size={13} className="text-[#5a46c2]" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured Projects</p>
              <div className="flex-1 h-px bg-slate-100 ml-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featured.map((p) => <ProjectCard key={p.id} project={p} onClick={setModal} categoryList={categoryList} />)}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">All Projects</p>
            <p className="text-2xl font-black text-slate-900 leading-none">
              {filtered.length}<span className="text-slate-400 font-semibold text-base ml-1.5">projects</span>
            </p>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map((cat, i) => {
            const acc = cat !== "All" ? getAccent(cat, categoryList) : null;
            const isActive = activecat === cat;
            const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            return (
              <button key={cat} onClick={() => setActivecat(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  isActive ? "text-white border-transparent shadow-md shadow-violet-200"
                           : "bg-white border-slate-200 text-slate-600 hover:border-violet-200 hover:text-[#5a46c2]"
                }`}
                style={isActive ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}>
                {acc && <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white/60" : acc.dot}`} />}
                {cat}
                <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-slate-300">
            <MdOutlineBarChart size={44} className="mb-3" />
            <p className="text-lg font-bold text-slate-400">No projects in this category yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => <ProjectCard key={p.id} project={p} onClick={setModal} categoryList={categoryList} />)}
          </div>
        )}

        
      </div>
<ReadyToStart />
      <ProjectModal project={modal} onClose={() => setModal(null)} categoryList={categoryList} />
    </div>
  );
}