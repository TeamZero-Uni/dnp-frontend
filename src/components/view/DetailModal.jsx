import React from "react";
import { X, Calendar, ImageOff } from "lucide-react";

const parseList = (val) =>
  !val ? [] : Array.isArray(val) ? val.filter(Boolean) : val.split(",").map((s) => s.trim()).filter(Boolean);

function ImagePlaceholder({ title }) {
  return (
    <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2">
      <ImageOff size={32} className="text-slate-300" />
      <p className="text-xs text-slate-400 text-center px-2">{title || "No image"}</p>
    </div>
  );
}

export default function DetailModal({ item, onClose }) {
  const tags = item.tags?.length ? item.tags : null;
  const features = parseList(item.features);
  const mainImage = item.images?.[0]?.imageUrl || item.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,10,40,0.55)", backdropFilter: "blur(6px)" }} onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-7 py-5 border-b border-slate-100 rounded-t-3xl">
          <div>
            {tags ? (
              <div className="flex flex-wrap gap-1.5 mb-1">
                {tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-semibold uppercase tracking-wider text-white bg-indigo-400 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            ) : (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Portfolio</span>
            )}
            <h2 className="text-lg font-bold text-[#1e1b4b]">{item.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-7 py-6 space-y-6">
          <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
            {mainImage ? <img src={mainImage} alt={item.title} className="w-full h-full object-cover" /> : <ImagePlaceholder title={item.title} />}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

          <div className="bg-slate-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
              <Calendar size={10} /> Date
            </div>
            <p className="text-sm font-semibold text-[#1e1b4b]">
              {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-[#5a46c2]">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.images?.length > 1 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Gallery</h4>
              <div className="grid grid-cols-3 gap-3">
                {item.images.map((img, i) => (
                  <div key={i} className="h-24 rounded-lg overflow-hidden bg-slate-100">
                    <img src={img.imageUrl} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}