import { useState } from 'react';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { register } from '../../api/api';

const RegisterForm = ({ setActiveForm, setShowOtpPopup, setOtpPurpose }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    try {
      // Validate form
      await validationSchema.validate(formData, { abortEarly: false });

      setLoading(true);
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert('Registration successful! Please verify your email with the OTP sent to you.');
      

      setOtpPurpose({ type: "register", email: formData.email });
      setShowOtpPopup(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const fieldErrors = {};
        err.inner.forEach(error => {
          fieldErrors[error.path] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
      }
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, name, type = "text", placeholder) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {name === 'name' && <FaUser className="text-gray-400" />}
          {name === 'email' && <FaEnvelope className="text-gray-400" />}
          {(name === 'password' || name === 'confirmPassword') && <FaLock className="text-gray-400" />}
        </div>
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          required
        />
      </div>
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {renderField('Full Name', 'name', 'text', 'Enter your full name')}
      {renderField('Email Address', 'email', 'email', 'Enter your email')}
      {renderField('Password', 'password', 'password', 'Create a password')}
      {renderField('Confirm Password', 'confirmPassword', 'password', 'Confirm your password')}

      <div className="flex items-start">
        <input
          id="terms"
          type="checkbox"
          className="mt-1 h-4 w-4 text-[#5a46c2] hover:text-[#4838a3] border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
          I agree to the{' '}
          <Link to="/terms" className="text-[#5a46c2] hover:text-[#4838a3] font-medium">
            Terms and Conditions
          </Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-[#5a46c2] hover:text-[#4838a3] font-medium">
            Privacy Policy
          </Link>
        </label>
      </div>

      <button
        type="submit"
        className="w-full btn-color py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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