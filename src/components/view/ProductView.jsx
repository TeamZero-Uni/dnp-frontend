export default function ProductView({ product, onClose }) {
  const isInStock = product.status === "stock";
  
  const tags = Array.isArray(product.tags)
    ? product.tags
    : typeof product.tags === "string"
    ? product.tags.split(",").map((t) => t.trim())
    : [];

  return (
    <div className="flex flex-col gap-5">

      <div className="relative h-48 rounded-2xl overflow-hidden bg-indigo-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-indigo-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-white font-bold text-lg leading-tight drop-shadow">
              {product.name}
            </p>
            <p className="text-indigo-200 font-mono text-[10px] mt-0.5">
              {product.id}
            </p>
          </div>
          {isInStock ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {product.description && (
        <p className="text-sm text-indigo-400 leading-relaxed bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
          {product.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3.5 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-1">Price</p>
          <p className="text-sm font-bold text-indigo-600">${product.price.toFixed(2)}</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Stock</p>
          <p className="text-sm font-bold text-slate-700">{product.stock} units</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Category</p>
          <p className="text-sm font-bold text-slate-700">{product.category}</p>
        </div>

        {product.material && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Material</p>
            <p className="text-sm font-bold text-slate-700">{product.material}</p>
          </div>
        )}

        {product.feature && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-3 col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Key Feature</p>
            <p className="text-sm font-bold text-slate-700">{product.feature}</p>
          </div>
        )}

        {product.colorTheme && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-3 col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Color / Theme</p>
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                style={{
                  background: product.colorTheme.startsWith("#")
                    ? product.colorTheme
                    : "#94a3b8",
                }}
              />
              <p className="text-sm font-bold text-slate-700">{product.colorTheme}</p>
            </div>
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-500 border border-indigo-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #5a46c2, #4838a3)",
          boxShadow: "0 4px 14px rgba(90,70,194,0.35)",
        }}
      >
        Dismiss Details
      </button>
    </div>
  );
}