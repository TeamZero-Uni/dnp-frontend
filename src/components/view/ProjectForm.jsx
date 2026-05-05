import React, { useState } from 'react';
import { Upload, Loader, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { uploadMultipleImages } from '../../api/api';
import { createProject } from '../../api/portfolioApi';

const ProjectForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    newImages: [],
    features: '',
    date: new Date().toISOString().split('T')[0],
    socialMediaType: '',
    linkPath: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    if (!formData.date) {
      newErrors.date = 'Project date is required';
    }
    if (!formData.socialMediaType.trim()) {
      newErrors.socialMediaType = 'Project type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const selectedFiles = Array.from(files);
      setFormData(prev => ({ 
        ...prev, 
        newImages: [...prev.newImages, ...selectedFiles] 
      }));
      
      selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, {
            id: Date.now() + Math.random(),
            preview: reader.result,
            file: file
          }]);
        };
        reader.readAsDataURL(file);
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const removeImage = (id) => {
    setImagePreviews(prev => prev.filter(img => img.id !== id));
    setFormData(prev => ({
      ...prev,
      newImages: prev.newImages.filter((_, idx) => 
        imagePreviews[idx]?.id !== id
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      let uploadedUrls = [];
      if (formData.newImages.length > 0) {
        const imageFormData = new FormData();
        formData.newImages.forEach((img) => {
          imageFormData.append("images", img);
        });
        
        const uploadRes = await uploadMultipleImages(imageFormData);
        uploadedUrls = uploadRes.data || [];
      }

      const projectPayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        features: formData.features.trim(),
        socialMediaType: formData.socialMediaType,
        linkPath: formData.linkPath.trim(),
        images: uploadedUrls
      };

      const response = await createProject(projectPayload);
      
      if (response.success) {
        onClose();
      } else {
        setErrors({ submit: response.message || 'Failed to create project. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: error.message || 'Failed to save project. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-0 max-h-[75vh] overflow-y-auto">
      <div className="px-6 space-y-6">
        
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Project Title <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project name"
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-slate-900 placeholder-slate-400 outline-none transition-all ${
              errors.title 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {errors.title && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.title}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Project Description <span className="text-red-500 font-bold">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project, technology stack, and key achievements..."
            rows="4"
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-slate-900 placeholder-slate-400 outline-none transition-all resize-none ${
              errors.description 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {errors.description && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.description}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Project Images
          </label>
          <div className="relative">
            <input
              type="file"
              name="images"
              onChange={handleChange}
              accept="image/*"
              multiple
              className="sr-only"
              id="image-upload"
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
          </div>

          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {imagePreviews.map((img) => (
                <div key={img.id} className="relative group">
                  <img 
                    src={img.preview} 
                    alt="preview" 
                    className="w-full h-24 rounded-lg object-cover shadow-md" 
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {imagePreviews.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              {imagePreviews.length} image(s) selected
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2.5">
              Project Date <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-slate-900 outline-none transition-all ${
                errors.date 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.date && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.date}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2.5">
              Social Media Type <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              name="socialMediaType"
              value={formData.socialMediaType}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-slate-900 outline-none transition-all cursor-pointer appearance-none ${
                errors.socialMediaType 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            >
              <option value="">Select type</option>
              <option value="GitHub">TikTok</option>
              <option value="Instagram">Youtube</option>
              <option value="LinkedIn">Facebook</option>
            </select>
            {errors.socialMediaType && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.socialMediaType}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Link / URL
          </label>
          <input
            type="url"
            name="linkPath"
            value={formData.linkPath}
            onChange={handleChange}
            placeholder="https://github.com/yourproject or https://instagram.com/yourprofile"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Key Features
          </label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="List key features&#10;e.g., React, Node.js, Stripe, Admin Dashboard"
            rows="3"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
          />
        </div>

        {errors.submit && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        )}
      </div>

      <div className='px-6 py-4 flex justify-end gap-3 border-t border-slate-100'>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl btn-color font-semibold hover:from-indigo-700 hover:to-indigo-600 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={18} className="animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>Create Project</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;