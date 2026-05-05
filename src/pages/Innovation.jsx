import React, { useState, useEffect } from "react";
import { FiPlay, FiClock, FiEye, FiX, FiChevronRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineSubscriptions } from "react-icons/md";
import Banner from "../components/layout/Banner";
import ReadyToStart from "../components/ReadyToStart";
import { getYoutubeVideos } from "../api/api";

const TAG_COLORS = {
  Tutorial:     { bg: "bg-violet-100",  text: "text-violet-700"  },
  Comparison:   { bg: "bg-sky-100",     text: "text-sky-700"     },
  Design:       { bg: "bg-amber-100",   text: "text-amber-700"   },
  "Case Study": { bg: "bg-emerald-100", text: "text-emerald-700" },
  Studio:       { bg: "bg-rose-100",    text: "text-rose-700"    },
};

const THUMB = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

// YouTube API response → ඔබේ component format එකට map කරනවා
const mapVideo = (item) => ({
  id: item.videoId,
  title: item.title,
  description: item.description,
  duration: item.duration || "",   // backend වලින් duration නැත්නම් blank
  views: item.views || "",
  date: new Date(item.publishedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  }),
  tag: item.tag || "Tutorial",     // backend tag field add කළොත් use කරනවා
});

/* ── Video Modal ── */
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
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
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

/* ── Video Card ── */
function VideoCard({ video, onClick, featured }) {
  const [hovered, setHovered] = useState(false);
  const tag = TAG_COLORS[video.tag] || { bg: "bg-slate-100", text: "text-slate-600" };

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-violet-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${featured ? "lg:flex" : ""}`}
      style={{ boxShadow: hovered ? "0 12px 36px rgba(90,70,194,.15)" : "0 2px 8px rgba(90,70,194,.06)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(video)}
    >
      <div className={`relative overflow-hidden bg-slate-100 ${featured ? "lg:w-72 lg:shrink-0" : ""}`}
        style={{ paddingTop: featured ? undefined : "56.25%" }}>
        {featured ? (
          <img src={THUMB(video.id)} alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ minHeight: 180 }} />
        ) : (
          <img src={THUMB(video.id)} alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
            <FiPlay size={18} className="ml-0.5" />
          </div>
        </div>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            {video.duration}
          </div>
        )}
      </div>

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
          {video.views && (
            <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
              <FiEye size={11} /> {video.views}
            </span>
          )}
          {video.duration && (
            <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
              <FiClock size={11} /> {video.duration}
            </span>
          )}
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

/* ── Skeleton Loader ── */
function SkeletonCard({ featured }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-violet-100 animate-pulse ${featured ? "lg:flex" : ""}`}>
      <div className={`bg-slate-200 ${featured ? "lg:w-72 lg:shrink-0 min-h-[180px]" : "w-full"}`}
        style={{ paddingTop: featured ? undefined : "56.25%" }} />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="h-3 w-16 bg-slate-200 rounded-full" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-1/2 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function Innovation() {
  const [videos, setVideos]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [filter, setFilter]         = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await getYoutubeVideos(12);
        const mapped = res.data.videos.map(mapVideo);
        setVideos(mapped);
      } catch (err) {
        setError("Videos load කිරීමට නොහැකි විය. පසුව නැවත උත්සාහ කරන්න.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const tags     = ["All", ...Array.from(new Set(videos.map((v) => v.tag)))];
  const filtered = filter === "All" ? videos : videos.filter((v) => v.tag === filter);
  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">
      <Banner
        path="Innovation"
        title={<>Watch, Learn &<br /><span className="text-[#5a46c2]">Get Inspired</span></>}
        description="Explore our video library — tutorials, behind-the-scenes, and 3D printing deep dives straight from the studio."
        tagLine="DNP 3D Channel"
        imageUrl={null}
        buttonText="Subscribe Now"
        buttonLink="https://www.youtube.com/channel/UC7eeNgUaFzy1u4CWLJml-ZA"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Channel stats bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
              style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
              <MdOutlineSubscriptions size={22} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 leading-none">DNP 3D Studio</p>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                {loading ? "Loading..." : `${videos.length} videos`}
              </p>
            </div>
          </div>

          {/* Tag filter pills — videos load වූ පස්සේ පෙන්නනවා */}
          {!loading && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button key={tag} onClick={() => setFilter(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filter === tag
                      ? "text-white shadow-md shadow-violet-200"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-[#5a46c2]"
                  }`}
                  style={filter === tag ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}>
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="space-y-8">
            <SkeletonCard featured />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-slate-500 font-semibold">{error}</p>
            <button onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400 font-semibold">No videos found.</div>
            ) : (
              <>
                {featured && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <HiOutlineSparkles size={15} className="text-[#5a46c2]" />
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Latest Release</p>
                    </div>
                    <VideoCard video={featured} onClick={setActiveVideo} featured />
                  </div>
                )}
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
          </>
        )}

        
      </div>
      <ReadyToStart />
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}