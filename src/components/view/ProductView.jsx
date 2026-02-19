export default function ProductView({ product, onClose }) {
  const details = [
    { label: "Product ID", value: product.id },
    { label: "Current Price", value: `$${product.price.toFixed(2)}` },
    { label: "Available Stock", value: `${product.stock} units` },
    { label: "Category", value: product.category },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <img src={product.image} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50" alt="" />
        <div>
          <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
          <span className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            product.status === "in_stock" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
          }`}>
            {product.status === "in_stock" ? "Active Inventory" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {details.map((item) => (
          <div key={item.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-sm font-bold text-slate-700">{item.value}</p>
          </div>
        ))}
      </div>

      <button onClick={onClose} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
        Dismiss Details
      </button>
    </div>
  );
}