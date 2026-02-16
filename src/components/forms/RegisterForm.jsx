import React, { useState } from 'react';
import { FaGoogle, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RegisterForm = ({ setActiveForm, setShowOtpPopup, setOtpPurpose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registration submitted', formData);
    setOtpPurpose('register');
    setShowOtpPopup(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="text-gray-400" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            id="reg-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            id="reg-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            placeholder="Create a password"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>

      <div className="flex items-start">
        <input id="terms" type="checkbox" className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" required />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
          I agree to the{' '}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">Terms and Conditions</Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">Privacy Policy</Link>
        </label>
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-[1.02]">
        Create Account
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gray-50 text-gray-500">Or sign up with</span>
        </div>
      </div>

      <button type="button" className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200 flex items-center justify-center gap-3">
        <FaGoogle className="text-red-500 text-xl" />
        Sign up with Google
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button type="button" onClick={() => setActiveForm('login')} className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;