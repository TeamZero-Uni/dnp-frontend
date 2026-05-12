import { useState } from 'react';
import { FaGoogle, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = ({ setActiveForm }) => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      await loginSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((err) => {
        if (err.path && !errors[err.path]) {
          errors[err.path] = err.message;
        }
      });
      setFieldErrors(errors);
      return; 
    }

    setIsSubmitting(true);
    try {
      const res = await loginUser(formData);
      toast.success('Welcome back! DNP 3D Hobby Lobby');
      if (res.role === 'ADMIN') navigate('/dash');
      else navigate('/account/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
      fieldErrors[field]
        ? 'border-red-400 focus:ring-red-300 bg-red-50'
        : 'border-gray-300 focus:ring-[#5a46c2]'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className={fieldErrors.email ? 'text-red-400' : 'text-gray-400'} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass('email')}
            placeholder="Enter your email"
          />
        </div>
        {fieldErrors.email && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className={fieldErrors.password ? 'text-red-400' : 'text-gray-400'} />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass('password')}
            placeholder="Enter your password"
          />
        </div>
        {fieldErrors.password && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {fieldErrors.password}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setActiveForm({ type: 'forgot' })}
          className="text-sm text-[#5a46c2] hover:text-[#4838a3] font-medium transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-color py-3 rounded-lg font-semibold focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gray-50 text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => (window.location.href = 'http://localhost:5000/api/v1/auth/google')}
        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200 flex items-center justify-center gap-3"
      >
        <FaGoogle className="text-red-500 text-xl" />
        Sign in with Google
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setActiveForm({ type: 'register' })}
            className="text-[#5a46c2] hover:text-[#4838a3] font-semibold transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;