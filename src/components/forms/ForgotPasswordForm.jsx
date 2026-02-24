import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPasswordForm = ({ setActiveForm, setShowOtpPopup, setOtpPurpose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password submitted for:', email);
    setOtpPurpose('forgot');
    setShowOtpPopup(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          Enter your email address and we'll send you a verification code to reset your password.
        </p>
      </div>

      <div>
        <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02]">
        Send Verification Code
      </button>

      <div className="text-center pt-4">
        <button type="button" onClick={() => setActiveForm('login')} className="text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-2 mx-auto">
          <span>←</span> Back to Sign In
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm