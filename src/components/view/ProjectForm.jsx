import React, { useState } from "react";
import { Upload, Loader, AlertCircle, CheckCircle2, X } from "lucide-react";
import { uploadMultipleImages } from "../../api/api";
import { createProject, updateProject } from "../../api/portfolioApi";
import toast from "react-hot-toast";

const REQUIRED = "This field is required";

const inputClass = (err) =>
  `w-full px-4 py-3 rounded-xl border-2 bg-white text-slate-900 placeholder-slate-400 outline-none transition-all ${
    err
      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
  }`;

function FieldError({ msg }) {
  return msg ? (
    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
      <AlertCircle size={16} /> {msg}
    </div>
  ) : null;
}

export default function ProjectForm({ onClose, onSuccess, initialData }) {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState({
    title:           initialData?.title       ?? "",
    description:     initialData?.description ?? "",
    features:        initialData?.features    ?? "",
    date:            initialData?.date
                       ? new Date(initialData.date).toISOString().split("T")[0]
                       : new Date().toISOString().split("T")[0],
    socialMediaType: initialData?.socialMediaType ?? "",
    linkPath:        initialData?.linkPath        ?? "",
    newImages:       [],
  });

  const [existingImages, setExistingImages] = useState(initialData?.images ?? []);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const [previews, setPreviews] = useState([]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim())       e.title           = REQUIRED;
    if (!formData.description.trim()) e.description     = REQUIRED;
    if (!formData.date)               e.date            = REQUIRED;
    if (!formData.socialMediaType)    e.socialMediaType = REQUIRED;
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const selected = Array.from(files);
      setFormData((prev) => ({ ...prev, newImages: [...prev.newImages, ...selected] }));
      selected.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          setPreviews((prev) => [
            ...prev,
            { id: Date.now() + Math.random(), preview: reader.result, file },
          ]);
        reader.readAsDataURL(file);
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const removeNewImage = (id) => {
    const idx = previews.findIndex((p) => p.id === id);
    setPreviews((prev) => prev.filter((p) => p.id !== id));
    setFormData((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== idx),
    }));
  };

  const removeExistingImage = (idx) =>
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      let uploadedUrls = [];
      if (formData.newImages.length) {
        const fd = new FormData();
        formData.newImages.forEach((img) => fd.append("images", img));
        const res = await uploadMultipleImages(fd);
        uploadedUrls = (res.data ?? []).map((img) =>
          typeof img === "string" ? img : img.imageUrl
        );
      }

      const images = [
        ...existingImages.map((img) =>
          typeof img === "string" ? img : img.imageUrl
        ),
        ...uploadedUrls,
      ];

      const payload = {
        title:           formData.title.trim(),
        description:     formData.description.trim(),
        date:            formData.date,
        features:        formData.features.trim(),
        socialMediaType: formData.socialMediaType,
        linkPath:        formData.linkPath.trim(),
        images,
      };

      let response;
      if (isEdit) {
        response = await updateProject({ portfolio_id: initialData.portfolio_id, ...payload });
      } else {
        response = await createProject(payload);
      }

      if (response.success) {
        toast.success(isEdit ? "Project updated!" : "Project created!");
        onSuccess();
        onClose();
      } else {
        setErrors({ submit: response.message || `Failed to ${isEdit ? "update" : "create"} project.` });
      }
    } catch (err) {
      setErrors({ submit: err?.response?.data?.message || "Failed to save project." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-0 max-h-[75vh] overflow-y-auto">
      <div className="px-6 space-y-6">

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="title" value={formData.title}
            onChange={handleChange} placeholder="Enter project name"
            className={inputClass(errors.title)}
          />
          <FieldError msg={errors.title} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description" value={formData.description}
            onChange={handleChange} placeholder="Describe your project..."
            rows="4" className={`${inputClass(errors.description)} resize-none`}
          />
          <FieldError msg={errors.description} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Project Images
          </label>
          <input
            type="file" name="images" onChange={handleChange}
            accept="image/*" multiple className="sr-only" id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="block w-full p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-indigo-100">
                <Upload size={24} className="text-indigo-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">Click to upload images</p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 5MB each</p>
              </div>
            </div>
          </label>

          {existingImages.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                Current Images
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={typeof img === "string" ? img : img.imageUrl}
                      alt={`existing-${idx}`}
                      className="w-full h-24 rounded-lg object-cover shadow-md ring-2 ring-indigo-100"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {previews.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                New Images
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {previews.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.preview} alt="preview"
                      className="w-full h-24 rounded-lg object-cover shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(img.id)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">{previews.length} new image(s) selected</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2.5">
              Project Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date" name="date" value={formData.date}
              onChange={handleChange} className={inputClass(errors.date)}
            />
            <FieldError msg={errors.date} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2.5">
              Social Media Type <span className="text-red-500">*</span>
            </label>
            <select
              name="socialMediaType" value={formData.socialMediaType}
              onChange={handleChange}
              className={`${inputClass(errors.socialMediaType)} appearance-none cursor-pointer`}
            >
              <option value="">Select type</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
              <option value="Facebook">Facebook</option>
            </select>
            <FieldError msg={errors.socialMediaType} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">Link / URL</label>
          <input
            type="url" name="linkPath" value={formData.linkPath}
            onChange={handleChange} placeholder="https://..."
            className={inputClass(false)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">Key Features</label>
          <textarea
            name="features" value={formData.features}
            onChange={handleChange}
            placeholder="List key features, e.g., React, Node.js, Stripe"
            rows="3" className={`${inputClass(false)} resize-none`}
          />
        </div>

        {errors.submit && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
        <button
          type="button" onClick={onClose}
          className="px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit" disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl btn-color font-semibold active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader size={18} className="animate-spin" /><span>{isEdit ? "Updating..." : "Creating..."}</span></>
          ) : (
            <><CheckCircle2 size={18} /><span>{isEdit ? "Update Project" : "Create Project"}</span></>
          )}
        </button>
      </div>
    </form>
  );
}