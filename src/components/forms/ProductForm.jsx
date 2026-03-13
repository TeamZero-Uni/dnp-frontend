import { useState } from "react";

function ProductForm({ product, mode = "add", onClose }) {
  const [form, setForm] = useState(
    product || {
      name: "",
      description: "",
      status: "stock",
      feature: "",
      image: null,
      colorTheme: "#5a46c2",
      material: "",
      tags: "",
      category: "",
    }
  );

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...form,
      tags:
        typeof form.tags === "string"
          ? form.tags.split(",").map((t) => t.trim())
          : form.tags,
    };
    if (mode === "add") console.log("CREATE PRODUCT:", finalData);
    if (mode === "edit") console.log("UPDATE PRODUCT:", finalData);
    onClose();
  };

  const inputClass =
    "w-full border border-indigo-100 bg-indigo-50/40 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200";

  const labelClass =
    "block text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-h-[78vh] overflow-y-auto px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div>
        <label className={labelClass}>Product Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="e.g. Premium Watch"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          placeholder="Brief product description…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="accessories">Accessories</option>
            <option value="footwear">Footwear</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={labelClass}>Material</label>
          <input
            name="material"
            value={form.material}
            onChange={handleChange}
            placeholder="e.g. Cotton, Steel"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Color Theme</label>
          <div className="flex items-center gap-3 border border-indigo-100 bg-indigo-50/40 rounded-xl px-3 py-2 transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:bg-white">
            <input
              name="colorTheme"
              type="color"
              value={form.colorTheme}
              onChange={handleChange}
              className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent shrink-0"
            />
            <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              {form.colorTheme}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Key Feature</label>
        <input
          name="feature"
          value={form.feature}
          onChange={handleChange}
          placeholder="e.g. Water-resistant up to 50m"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Tags <span className="normal-case font-normal text-slate-400 tracking-normal">(comma separated)</span></label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="new, eco-friendly, sale"
          className={inputClass}
        />
        {form.tags && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-500 border border-indigo-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>Product Image</label>
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-indigo-200 rounded-xl py-5 px-4 cursor-pointer bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-300 transition-all group">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <svg className="w-7 h-7 text-indigo-300 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-xs font-semibold text-indigo-400">
              {form.image instanceof File
                ? form.image.name
                : "Click to upload image"}
            </p>
            <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 10MB</p>
          </div>
          <input
            name="image"
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 pt-2 sticky bottom-0 bg-white pb-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-indigo-100 text-indigo-400 rounded-xl py-2.5 text-sm font-semibold hover:bg-indigo-50 hover:border-indigo-200 transition-all active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 text-white rounded-xl py-2.5 text-sm font-bold transition-all active:scale-95 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #5a46c2, #4838a3)",
            boxShadow: "0 4px 14px rgba(90,70,194,0.35)",
          }}
        >
          {mode === "edit" ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;