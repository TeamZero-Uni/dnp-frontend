import React, { useState } from "react";
import { FiPlay, FiClock, FiEye, FiX, FiChevronRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineSubscriptions } from "react-icons/md";
import Banner from "../components/layout/Banner";
import ReadyToStart from "../components/ReadyToStart";

/* ─────────────────────────────────────────────
   TEMP DATA  →  replace with YouTube API response
   Each object maps to: youtube#videoListResource
───────────────────────────────────────────── */
const VIDEOS = [
  {
    id: "dQw4w9WgXcQ",
    title: "FDM 3D Printing: Layer by Layer Explained",
    description: "A deep dive into how Fused Deposition Modeling works — from filament to finished part.",
    duration: "12:34",
    views: "24.8K",
    date: "2 days ago",
    tag: "Tutorial",
  },
  {
    id: "ScMzIvxBSi4",
    title: "Resin vs FDM — Which Should You Choose?",
    description: "We compare resin and FDM printing head-to-head across quality, speed, and cost.",
    duration: "08:21",
    views: "41.2K",
    date: "1 week ago",
    tag: "Comparison",
  },
  {
    id: "jNQXAC9IVRw",
    title: "Designing for 3D Print: Top 10 Mistakes",
    description: "Avoid these critical CAD design errors that ruin 3D prints before they even start.",
    duration: "15:07",
    views: "18.5K",
    date: "2 weeks ago",
    tag: "Design",
  },
  {
    id: "ysz5S6PUM-U",
    title: "How We Built a Full Architectural Model",
    description: "Watch our team create a 1:50 scale architectural model entirely with 3D printing.",
    duration: "22:45",
    views: "9.3K",
    date: "3 weeks ago",
    tag: "Case Study",
  },
  {
    id: "kffacxfA7G4",
    title: "Slicer Settings That Actually Matter",
    description: "Layer height, infill, supports — the settings that have the biggest impact on your print.",
    duration: "11:58",
    views: "33.1K",
    date: "1 month ago",
    tag: "Tutorial",
  },
  {
    id: "2vjPBrBU-TM",
    title: "Behind the Scenes: Our 3D Print Studio",
    description: "A full tour of the DNP 3D studio, our machines, workflow, and quality checking process.",
    duration: "07:13",
    views: "15.7K",
    date: "1 month ago",
    tag: "Studio",
  },
];

const TAG_COLORS = {
  Tutorial:    { bg: "bg-violet-100", text: "text-violet-700" },
  Comparison:  { bg: "bg-sky-100",    text: "text-sky-700"    },
  Design:      { bg: "bg-amber-100",  text: "text-amber-700"  },
  "Case Study":{ bg: "bg-emerald-100",text: "text-emerald-700"},
  Studio:      { bg: "bg-rose-100",   text: "text-rose-700"   },
};

const THUMB = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

/* ─────────────────────────────────────────────
   VIDEO MODAL
───────────────────────────────────────────── */
function VideoModal({ video, onClose }) {
  if (!video) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,13,26,.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        style={{ boxShadow: "0 32px 80px rgba(90,70,194,.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* video embed */}
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* info bar */}
        <div className="px-6 py-4 flex items-start justify-between gap-4 border-t border-slate-100">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {TAG_COLORS[video.tag] && (
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${TAG_COLORS[video.tag].bg} ${TAG_COLORS[video.tag].text}`}>
                  {video.tag}
                </span>
              )}
              <span className="text-xs text-slate-400 font-semibold">{video.date}</span>
            </div>
            <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2">{video.title}</h3>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed line-clamp-2">{video.description}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIDEO CARD
───────────────────────────────────────────── */
function VideoCard({ video, onClick, featured }) {
  const [hovered, setHovered] = useState(false);
  const tag = TAG_COLORS[video.tag] || { bg: "bg-slate-100", text: "text-slate-600" };

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-violet-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
        featured ? "lg:flex" : ""
      }`}
      style={{ boxShadow: hovered ? "0 12px 36px rgba(90,70,194,.15)" : "0 2px 8px rgba(90,70,194,.06)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(video)}
    >
      {/* thumbnail */}
      <div className={`relative overflow-hidden bg-slate-100 ${featured ? "lg:w-72 lg:shrink-0" : ""}`}
        style={{ paddingTop: featured ? undefined : "56.25%", height: featured ? undefined : undefined }}>

        {featured ? (
          <img
            src={THUMB(video.id)}
            alt={video.title}
            className="w-full h-full object-cover lg:h-full transition-transform duration-500 group-hover:scale-105"
            style={{ minHeight: 180 }}
          />
        ) : (
          <img
            src={THUMB(video.id)}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
            style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
            <FiPlay size={18} className="ml-0.5" />
          </div>
        </div>

        {/* duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
          {video.duration}
        </div>
      </div>

      {/* content */}
      <div className={`p-4 flex flex-col gap-2 ${featured ? "flex-1" : ""}`}>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${tag.bg} ${tag.text}`}>
            {video.tag}
          </span>
          <span className="text-xs text-slate-400 font-medium">{video.date}</span>
        </div>

        <h3 className={`font-black text-slate-900 leading-snug group-hover:text-[#5a46c2] transition-colors ${featured ? "text-lg" : "text-sm"}`}>
          {video.title}
        </h3>

        {featured && (
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{video.description}</p>
        )}

        <div className="flex items-center gap-3 mt-auto pt-1">
          <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
            <FiEye size={11} /> {video.views}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
            <FiClock size={11} /> {video.duration}
          </span>
          {featured && (
            <span className="ml-auto text-xs font-bold text-[#5a46c2] flex items-center gap-1 group-hover:gap-2 transition-all">
              Watch Now <FiChevronRight size={12} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Innovation() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [filter, setFilter]           = useState("All");

  const tags     = ["All", ...Array.from(new Set(VIDEOS.map((v) => v.tag)))];
  const filtered = filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.tag === filter);
  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Banner */}
      <Banner
        path="Innovation"
        title={<>Watch, Learn &<br /><span className="text-[#5a46c2]">Get Inspired</span></>}
        description="Explore our video library — tutorials, behind-the-scenes, and 3D printing deep dives straight from the studio."
        tagLine="DNP 3D Channel"
        imageUrl={null}
        buttonText="Subscribe Now"
        buttonLink="https://youtube.com"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Channel stats bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
              style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
              <MdOutlineSubscriptions size={22} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 leading-none">DNP 3D Studio</p>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">6 videos · 2.1K subscribers</p>
            </div>
          </div>

          {/* tag filter pills */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === tag
                    ? "text-white shadow-md shadow-violet-200"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-[#5a46c2]"
                }`}
                style={filter === tag ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-semibold">No videos found.</div>
        ) : (
          <>
            {/* ── Featured video ── */}
            {featured && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineSparkles size={15} className="text-[#5a46c2]" />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Latest Release</p>
                </div>
                <VideoCard video={featured} onClick={setActiveVideo} featured />
              </div>
            )}

            {/* ── Video grid ── */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">More Videos</p>
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs font-bold text-slate-400">{rest.length} videos</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((video) => (
                    <VideoCard key={video.id} video={video} onClick={setActiveVideo} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <ReadyToStart />

      </div>

      {/* Video Modal */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}