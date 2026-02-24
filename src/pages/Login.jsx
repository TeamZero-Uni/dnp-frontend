import React, { useState } from 'react';
import { FaHome, FaShieldAlt, FaUserCheck, FaBolt, FaGoogle, FaLock, FaEnvelope, FaUser, FaTimes, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import ChangePasswordForm from '../components/forms/ChangePasswordForm';
import OtpPopup from '../components/OtpPopup';

export default function Login() {
  const [activeForm, setActiveForm] = useState('login'); 
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otpPurpose, setOtpPurpose] = useState(''); 

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors z-10">
          <FaHome className="text-xl" />
          <span className="font-semibold">Back to Home</span>
        </Link>

        <div className="z-10">
          <h1 className="text-5xl font-bold text-white mb-6">
            {activeForm === 'login' && 'Welcome Back!'}
            {activeForm === 'register' && 'Join Us Today!'}
            {activeForm === 'forgot' && 'Reset Password'}
            {activeForm === 'change' && 'New Password'}
          </h1>
          <p className="text-blue-100 text-lg mb-12 max-w-md">
            {activeForm === 'login' && 'Sign in to access your account and continue your journey with us. Experience seamless access to all your favorite features.'}
            {activeForm === 'register' && 'Create your account and unlock access to all premium features. Join thousands of satisfied users worldwide.'}
            {activeForm === 'forgot' && 'Don\'t worry! Enter your email and we\'ll send you instructions to reset your password.'}
            {activeForm === 'change' && 'Create a strong new password to secure your account and regain access.'}
          </p>

          <div className="space-y-6">
            <FeatureItem icon={<FaShieldAlt />} title="Secure & Protected" desc="Your data is encrypted and protected with industry-standard security." />
            <FeatureItem icon={<FaBolt />} title="Lightning Fast" desc="Access your account instantly with our optimized authentication system." />
            <FeatureItem icon={<FaUserCheck />} title="Trusted by Thousands" desc="Join our growing community of satisfied users worldwide." />
          </div>
        </div>

        <div className="text-blue-200 text-sm z-10">© 2024 Your Company. All rights reserved.</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-8">
            <FaHome className="text-lg" />
            <span className="font-semibold">Back to Home</span>
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {activeForm === 'login' && 'Sign In'}
              {activeForm === 'register' && 'Create Account'}
              {activeForm === 'forgot' && 'Forgot Password'}
              {activeForm === 'change' && 'Change Password'}
            </h2>
            <p className="text-gray-600">
              {activeForm === 'login' && 'Enter your credentials to access your account'}
              {activeForm === 'register' && 'Fill in your details to get started'}
              {activeForm === 'forgot' && 'We\'ll send you a reset link'}
              {activeForm === 'change' && 'Enter your new password below'}
            </p>
          </div>

          {activeForm === 'login' && <LoginForm setActiveForm={setActiveForm} />}
          {activeForm === 'register' && <RegisterForm setActiveForm={setActiveForm} setShowOtpPopup={setShowOtpPopup} setOtpPurpose={setOtpPurpose} />}
          {activeForm === 'forgot' && <ForgotPasswordForm setActiveForm={setActiveForm} setShowOtpPopup={setShowOtpPopup} setOtpPurpose={setOtpPurpose} />}
          {activeForm === 'change' && <ChangePasswordForm setActiveForm={setActiveForm} />}
        </div>
      </div>

      {showOtpPopup && (
        <OtpPopup 
          onClose={() => setShowOtpPopup(false)} 
          purpose={otpPurpose}
          setActiveForm={setActiveForm}
        />
      )}
    </div>
  );
}

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm text-white text-2xl">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
      <p className="text-blue-100 text-sm">{desc}</p>
    </div>
  </div>
);