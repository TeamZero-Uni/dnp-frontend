import { useState } from "react";
import { Trash2, AlertTriangle, ImageOff, CheckCircle2 } from "lucide-react";

const SAMPLE_IMAGE = {
  id: 1,
  title: "Mountain Sunrise.jpg",
  category: "Nature",
  thumb:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
};

export default function DeleteImage({
  image = SAMPLE_IMAGE,
  onDelete,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDeleted(true);
      if (onDelete) onDelete(image.id);
    }, 1200);
  };

  if (deleted) {
    return (
      <div className="flex flex-col items-center text-center px-6 py-8 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <CheckCircle2 size={26} className="text-emerald-500" />
        </div>
        <div>
          <p className="text-base font-black text-slate-800">
            Successfully Deleted
          </p>
          <p className="text-sm text-slate-400 mt-1">
            <span className="font-semibold text-slate-600">
              "{image.title}"
            </span>{" "}
            has been removed from your gallery.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-600 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-1 py-2">
      <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5">
        <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle size={15} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-red-700">
            This action cannot be undone
          </p>
          <p className="text-xs text-red-400 mt-0.5 leading-relaxed">
            The image will be permanently removed from your gallery and cannot
            be recovered.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-3">
        {image.thumb ? (
          <img
            src={image.thumb}
            alt={image.title}
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
            <ImageOff size={20} className="text-slate-400" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">
            {image.title}
          </p>
          <span className="inline-block mt-1.5 text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2.5 py-0.5 rounded-full">
            {image.category}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center shrink-0">
          <Trash2 size={13} className="text-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`py-3 rounded-2xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2
            ${
              loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 shadow-md shadow-red-100 active:scale-95"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              Deleting…
            </>
          ) : (
            <>
              <Trash2 size={14} />
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}
