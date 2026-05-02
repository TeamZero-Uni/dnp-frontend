import { useState } from "react";

export default function ProductView({ product, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const isInStock = product.p_status === "IN_STOCK";
  const images = product.images ?? [];

  const tags = product.p_tag
    ? product.p_tag.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const labelPrice = parseFloat(product.p_label_price);
  const actualPrice = parseFloat(product.p_price);
  const hasDiscount = !isNaN(labelPrice) && !isNaN(actualPrice) && labelPrice !== actualPrice;

  const slide = (dir) =>
    setImgIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className="flex flex-col overflow-hidden">

      <div className="relative h-48 rounded-2xl bg-indigo-50 overflow-hidden">
        {images.length > 0 ? (
          <>
            <div
              className="flex h-full transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${imgIndex * 100}%)` }}
            >
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.img_url}
                  alt={product.p_name}
                  className="w-full h-full object-cover shrink-0"
                  style={{ minWidth: "100%" }}
                />
              ))}
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={() => slide(-1)}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 flex items-center justify-center text-indigo-800 font-bold text-sm shadow-sm"
                >‹</button>
                <button
                  onClick={() => slide(1)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 flex items-center justify-center text-indigo-800 font-bold text-sm shadow-sm"
                >›</button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`h-1 rounded-full transition-all border-none ${
                        i === imgIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-indigo-300 text-xs">No image</div>
        )}

        {isInStock ? (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> In Stock
          </span>
        ) : (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" /> Out of Stock
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">

        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-extrabold text-gray-900 leading-tight">{product.p_name}</p>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-[#5a46c2] border border-indigo-200 shrink-0">
            {product.category?.c_type}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <p className="text-xl font-extrabold text-[#5a46c2]">Rs {product.p_price}</p>
          {hasDiscount && (
            <p className="text-xs text-gray-400 line-through">Rs {product.p_label_price}</p>
          )}
        </div>

        {product.p_description && (
          <p className="text-xs text-gray-500 leading-relaxed">{product.p_description}</p>
        )}

        <div className="h-px bg-indigo-50" />

        <div className="grid grid-cols-2 gap-2">
          {product.p_material && (
            <div className="bg-indigo-50 rounded-xl px-3 py-2">
              <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-0.5">Material</p>
              <p className="text-xs font-bold text-[#5a46c2]">{product.p_material}</p>
            </div>
          )}
          <div className="bg-indigo-50 rounded-xl px-3 py-2">
            <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-0.5">Category</p>
            <p className="text-xs font-bold text-[#5a46c2]">{product.category?.c_type}</p>
          </div>
          {product.p_features && (
            <div className="bg-indigo-50 rounded-xl px-3 py-2 col-span-2">
              <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-0.5">Key Feature</p>
              <p className="text-xs font-bold text-[#5a46c2]">{product.p_features}</p>
            </div>
          )}
          {product.p_color && (
            <div className="bg-indigo-50 rounded-xl px-3 py-2 col-span-2">
              <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-0.5">Color</p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ background: product.p_color.startsWith("#") ? product.p_color : "#94a3b8" }}
                />
                <p className="text-xs font-bold text-[#5a46c2]">{product.p_color}</p>
              </div>
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-50 text-violet-600 border border-violet-200">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full btn-color py-2.5 rounded-xl text-xs font-bold transition-all active:scale-98 hover:-translate-y-0.5"
        >
          Dismiss Details
        </button>
      </div>
    </div>
  );
}