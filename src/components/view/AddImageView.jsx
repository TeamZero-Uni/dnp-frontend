import { useState } from "react";

function AddImageView() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Image added successfully!");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter image title"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-300 outline-none transition-all duration-200 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>

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
                <option value="nature">🌿 Nature</option>
                <option value="tech">💻 Technology</option>
                <option value="people">👤 People</option>
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
              Image File
            </label>
            <label
              className="relative border-amber-50 bg-[#f5f3ff] flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden"
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full max-h-50 object-cover rounded-xl"
                />
              ) : (
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
                      Drop your image here
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      or{" "}
                      <span
                        style={{ color: "#5a46c2" }}
                        className="font-semibold"
                      >
                        browse files
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-slate-300">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required={!formData.image}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            {formData.image && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: "#ede9fe" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5a46c2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
                <span
                  className="text-xs font-medium truncate"
                  style={{ color: "#4838a3" }}
                >
                  {formData.image.name}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 btn-color rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95 mt-1"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(90,70,194,0.45)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(90,70,194,0.35)")
            }
          >
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddImageView;
