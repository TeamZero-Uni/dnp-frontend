import React, { useState } from 'react';
import { Upload, Loader, AlertCircle, CheckCircle2 } from 'lucide-react';

const ProjectForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    features: '',
    date: new Date().toISOString().split('T')[0],
    Subtitles: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

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
    if (!formData.Subtitles.trim()) {
      newErrors.Subtitles = 'Project type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to save project. Please try again.' });
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
            Project Image
          </label>
          <div className="relative">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="sr-only"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`block w-full p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                imagePreview
                  ? 'border-indigo-300 bg-indigo-50'
                  : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
              }`}
            >
              {imagePreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img src={imagePreview} alt="Preview" className="h-40 rounded-lg object-cover shadow-md" />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-900">Image selected</p>
                    <p className="text-xs text-slate-500 mt-1">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-indigo-100">
                    <Upload size={24} className="text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-900">Click to upload image</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              )}
            </label>
          </div>
          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setFormData(prev => ({ ...prev, image: null }));
              }}
              className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Remove image
            </button>
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
              Project Type <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              name="Subtitles"
              value={formData.Subtitles}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-slate-900 outline-none transition-all cursor-pointer appearance-none ${
                errors.Subtitles 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            >
              <option value="">Select project type</option>
              <option value="Web Application">Web Application</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Branding">Branding</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>
            {errors.Subtitles && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.Subtitles}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Key Features
          </label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="List key features, one per line&#10;e.g., Responsive design&#10;User authentication&#10;Real-time updates"
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
            <div className='px-6 py-4 flex justify-end'>
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