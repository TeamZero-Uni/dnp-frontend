import { useState } from "react";
import { uploadMultipleImages, createProduct, updateProduct } from "../../api/api";
import { useProduct } from "../../hooks/useProduct";
import { FiX, FiImage, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

function ProductForm({ product, mode = "add", onClose, onSuccess }) {
  const { categories } = useProduct();

  const normalize = (p) => ({
    name:           p.p_name          ?? "",
    description:    p.p_description   ?? "",
    status:         p.p_status === "OUT_OF_STOCK" ? "out_of_stock" : "stock",
    feature:        p.p_features      ?? "",
    colorTheme:     p.p_color         ?? "#5a46c2",
    material:       p.p_material      ?? "",
    tags:           p.p_tag           ?? "",
    category:       p.category?.c_id?.toString() ?? "",
    price:          p.p_price         ?? "",
    labelPrice:     p.p_label_price   ?? "",
    existingImages: (p.images ?? []).map((img) => ({
      id:      img.id,
      img_url: img.img_url,
    })),
    newImages: [],
  });

  const [form, setForm] = useState(
    product
      ? normalize(product)
      : {
          name: "",
          description: "",
          status: "stock",
          feature: "",
          colorTheme: "#5a46c2",
          material: "",
          tags: "",
          category: "",
          price: "",
          labelPrice: "",
          existingImages: [],
          newImages: [],
        }
  );

  const [newPreviews, setNewPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const fileArray = Array.from(files);
      const previews  = fileArray.map((f) => URL.createObjectURL(f));
      setForm((prev) => ({ ...prev, newImages: [...prev.newImages, ...fileArray] }));
      setNewPreviews((prev) => [...prev, ...previews]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeExistingImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== idx),
    }));
  };

  const removeNewImage = (idx) => {
    URL.revokeObjectURL(newPreviews[idx]);
    setForm((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== idx),
    }));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedUrls = [];
      if (form.newImages.length > 0) {
        const formData = new FormData();
        form.newImages.forEach((img) => formData.append("images", img));
        const uploadRes = await uploadMultipleImages(formData);
        uploadedUrls = uploadRes.data;
      }

      const finalData = {
        p_name:        form.name,
        p_description: form.description,
        p_status:      form.status === "stock" ? "IN_STOCK" : "OUT_OF_STOCK",
        p_features:    form.feature,
        p_color:       form.colorTheme,
        p_material:    form.material,
        p_tag:         form.tags,
        p_price:       parseFloat(form.price)      || 0,
        p_label_price: parseFloat(form.labelPrice) || 0,
        categoryId:    parseInt(form.category, 10),
        images: [
          ...form.existingImages.map((img) => img.img_url),
          ...uploadedUrls,
        ],
      };

      if (mode === "edit" && product?.p_id) {
        await updateProduct(product.p_id, finalData);
      } else {
        await createProduct(finalData);
      }

      onSuccess && onSuccess();
      toast.success(`Product ${mode === "edit" ? "updated" : "created"} successfully!`);
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-indigo-100 bg-indigo-50/40 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200";

  const labelClass =
    "block text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-1.5";

  const allImageCount = form.existingImages.length + form.newImages.length;

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
            {categories.map((cat) => (
              <option key={cat.c_id} value={cat.c_id}>
                {cat.c_type}
              </option>
            ))}
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
          <label className={labelClass}>Price (Rs)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-indigo-300">
              Rs
            </span>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="0.00"
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Label Price{" "}
            <span className="text-slate-400 normal-case tracking-normal font-normal">
              (original / crossed)
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-indigo-300">
              Rs
            </span>
            <input
              name="labelPrice"
              type="number"
              min="0"
              step="0.01"
              value={form.labelPrice}
              onChange={handleChange}
              placeholder="0.00"
              className={`${inputClass} pl-9`}
            />
          </div>
          {form.price &&
            form.labelPrice &&
            parseFloat(form.labelPrice) > parseFloat(form.price) && (
              <p className="mt-1.5 text-[10px] font-semibold text-emerald-500">
                {Math.round(
                  ((parseFloat(form.labelPrice) - parseFloat(form.price)) /
                    parseFloat(form.labelPrice)) *
                    100
                )}% off
              </p>
            )}
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
          <div className="flex items-center gap-3 border border-indigo-100 bg-indigo-50/40 rounded-xl px-3 py-2">
            <input
              name="colorTheme"
              type="color"
              value={form.colorTheme}
              onChange={handleChange}
              className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
            />
            <span className="text-xs font-mono font-semibold text-indigo-400 uppercase">
              {form.colorTheme}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Key Feature</label>
        <textarea
          name="feature"
          value={form.feature}
          onChange={handleChange}
          rows="3"
          placeholder="e.g. Water-resistant up to 50m"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>
          Tags <span className="text-slate-400">(comma separated)</span>
        </label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="new, eco-friendly, sale"
          className={inputClass}
        />
        {form.tags && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-50 text-indigo-500 border"
                >
                  #{tag}
                </span>
              ))}
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Product Images{" "}
          {allImageCount > 0 && (
            <span className="text-indigo-300 normal-case tracking-normal font-normal">
              ({allImageCount} total)
            </span>
          )}
        </label>

        {form.existingImages.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Current Images
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {form.existingImages.map((img, idx) => (
                <div key={img.id} className="relative group aspect-square">
                  <img
                    src={img.img_url}
                    alt={`Product image ${idx + 1}`}
                    className="w-full h-full object-cover rounded-xl border-2 border-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(idx)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-600"
                    title="Remove image"
                  >
                    <FiX size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {newPreviews.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              New Images
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {newPreviews.map((src, idx) => (
                <div key={idx} className="relative group aspect-square">
                  <img
                    src={src}
                    alt={`New image ${idx + 1}`}
                    className="w-full h-full object-cover rounded-xl border-2 border-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(idx)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-600"
                    title="Remove image"
                  >
                    <FiX size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50 rounded-xl py-4 px-3 cursor-pointer transition-colors">
          <FiImage className="text-indigo-300" size={22} />
          <span className="text-xs font-semibold text-indigo-400">
            {allImageCount > 0 ? "Add more images" : "Click to upload images"}
          </span>
          <span className="text-[10px] text-slate-400">PNG, JPG, WEBP supported</span>
          <input
            name="images"
            type="file"
            multiple
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      <div className="flex gap-2.5 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 border border-indigo-100 text-indigo-400 rounded-xl py-2.5 text-sm font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 btn-color rounded-xl py-2.5 font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader size={14} className="animate-spin" />
              {mode === "edit" ? "Updating…" : "Creating…"}
            </>
          ) : (
            mode === "edit" ? "Update Product" : "Create Product"
          )}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;