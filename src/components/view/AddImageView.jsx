import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { uploadMultipleImages } from "../../api/api";
import { createGallery } from "../../api/galleryApi";

function AddImageView({ onClose }) {
  const [formData, setFormData] = useState({
    category: "",
    images: [],
  });
  const [previews, setPreviews] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const { categories } = useProduct();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
      setPreviews((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (newFiles.length) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
      setPreviews((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      formData.images.forEach((img) => data.append("images", img));
      const uploadRes = await uploadMultipleImages(data);
      const uploadedUrls = uploadRes.data;

      await Promise.all(
        uploadedUrls.map((image_url, index) =>
          createGallery({
            title: formData.images[index].name,
            image_url,
            category_id: formData.category,
          }),
        ),
      );

      alert("Images saved to gallery successfully!");

      setFormData({ category: "", images: [] });
      setPreviews([]);
      onClose();
    } catch (err) {
      console.error("Error:", err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm outline-none appearance-none transition-all duration-200 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 cursor-pointer"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.c_id} value={cat.c_id}>
                    {cat.c_type}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Image Files
            </label>

            <label
              className={`relative bg-[#f5f3ff] flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden ${
                dragOver
                  ? "border-violet-400 bg-violet-50"
                  : "border-violet-200"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2 p-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "#ede9fe" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5a46c2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600">
                    Drop your images here
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    or{" "}
                    <span
                      style={{ color: "#5a46c2" }}
                      className="font-semibold"
                    >
                      browse files limited to 10 images
                    </span>
                  </p>
                </div>
                <p className="text-xs text-slate-300">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleChange}
                required={formData.images.length === 0}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden aspect-square"
                  >
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 btn-color rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(90,70,194,0.45)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(90,70,194,0.35)")
            }
          >
            {loading
              ? "Uploading..."
              : `Upload Images${formData.images.length > 0 ? ` (${formData.images.length})` : ""}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddImageView;
