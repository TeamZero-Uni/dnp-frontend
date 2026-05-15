import { useState } from 'react';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { register } from '../../api/api';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),

  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address (e.g. user@example.com)'
    ),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter (A–Z)')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter (a–z)')
    .matches(/[0-9]/, 'Must contain at least one number (0–9)')
    .matches(/[^A-Za-z0-9]/, 'Must contain at least one special character (@, #, !, etc.)'),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const getStrength = (pw) => {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[a-z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;

  if (score <= 2) return { label: 'Weak',   bar: 'w-1/4',  color: 'bg-red-400',   text: 'text-red-500'   };
  if (score === 3) return { label: 'Fair',   bar: 'w-2/4',  color: 'bg-yellow-400',text: 'text-yellow-600'};
  if (score === 4) return { label: 'Good',   bar: 'w-3/4',  color: 'bg-blue-400',  text: 'text-blue-500'  };
  return            { label: 'Strong', bar: 'w-full', color: 'bg-green-500', text: 'text-green-600' };
};

const RegisterForm = ({ setActiveForm, setShowOtpPopup, setOtpPurpose }) => {
  const [loading, setLoading]       = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [formData, setFormData]     = useState({
    name: '', email: '', password: '', confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTermsChange = (e) => {
    setAgreeToTerms(e.target.checked);
    if (e.target.checked) {
      setTermsError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setTermsError(false);

    if (!agreeToTerms) {
      setTermsError(true);
      return;
    }

    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((err) => {
        if (err.path && !errors[err.path]) errors[err.path] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await register({ name: formData.name, email: formData.email, password: formData.password });
      toast.success('Account created! Check your email for the OTP.');
      
      setOtpPurpose({ type: 'register', email: formData.email });
      setShowOtpPopup(true);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setAgreeToTerms(false);
      setFieldErrors({});
      setTermsError(false);
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, name, type = 'text', placeholder) => {
    const hasError  = Boolean(fieldErrors[name]);
    const strength  = name === 'password' ? getStrength(formData.password) : null;
    const iconClass = hasError ? 'text-red-400' : 'text-gray-400';

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {name === 'name'                                          && <FaUser     className={iconClass} />}
            {name === 'email'                                         && <FaEnvelope className={iconClass} />}
            {(name === 'password' || name === 'confirmPassword')      && <FaLock     className={iconClass} />}
          </div>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
              hasError
                ? 'border-red-400 focus:ring-red-300 bg-red-50'
                : 'border-gray-300 focus:ring-[#5a46c2]'
            }`}
          />
        </div>

        {name === 'password' && formData.password && strength && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${strength.color} ${strength.bar}`} />
            </div>
            <p className={`text-xs mt-1 font-medium ${strength.text}`}>{strength.label} password</p>
          </div>
        )}

        {name === 'password' && !formData.password && !hasError && (
          <p className="mt-1.5 text-xs text-gray-400">
            Min. 8 chars · uppercase · lowercase · number · special character
          </p>
        )}

        {hasError && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {fieldErrors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {renderField('Full Name',        'name',            'text',     'Enter your full name')}
      {renderField('Email Address',    'email',           'email',    'Enter your email')}
      {renderField('Password',         'password',        'password', 'Create a password')}
      {renderField('Confirm Password', 'confirmPassword', 'password', 'Confirm your password')}

      <div>
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={handleTermsChange}
            className={`mt-1 h-4 w-4 border-2 rounded cursor-pointer transition-colors ${
              termsError
                ? 'border-red-400 accent-red-400'
                : 'border-gray-300 accent-[#5a46c2]'
            }`}
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <Link to="http://localhost:5173/terms" className="text-[#5a46c2] hover:text-[#4838a3] font-medium">Terms and Conditions</Link>
            {' '}and{' '}
            <Link to="http://localhost:5173/privacy" className="text-[#5a46c2] hover:text-[#4838a3] font-medium">Privacy Policy</Link>
          </label>
        </div>
        {termsError && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 ml-6">
            <span>⚠</span> You must agree to the Terms and Conditions and Privacy Policy
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-color py-3 rounded-lg font-semibold focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? 'Creating Account…' : 'Create Account'}
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setActiveForm({ type: 'login' })}
            className="text-[#5a46c2] hover:text-[#4838a3] font-semibold transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;