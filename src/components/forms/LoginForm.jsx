import React, { useState } from 'react';
import { FaGoogle, FaLock, FaEnvelope } from 'react-icons/fa';

const LoginForm = ({ setActiveForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button type="button" onClick={() => setActiveForm('forgot')} className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Forgot password?
        </button>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02]">
        Sign In
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gray-50 text-gray-500">Or continue with</span>
        </div>
      </div>

      <button type="button" className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200 flex items-center justify-center gap-3">
        <FaGoogle className="text-red-500 text-xl" />
        Sign in with Google
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button type="button" onClick={() => setActiveForm('register')} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;