import React, { useState } from 'react';
import { FaHome, FaCube, FaPrint, FaDraftingCompass, FaShieldAlt, FaBolt, FaUserCheck } from 'react-icons/fa';
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
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a1a1a] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600 rounded-full opacity-5 translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <Link to="/" className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors z-10">
          <FaHome className="text-xl" />
          <span className="font-semibold uppercase tracking-wider">Back to Home</span>
        </Link>

        <div className="z-10">
          <div className="mb-8">
             <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-bold uppercase tracking-tighter rounded">DNP 3D Hobby Lobby</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            {activeForm === 'login' && 'Shaping Ideas into Reality.'}
            {activeForm === 'register' && 'Start Your 3D Journey.'}
            {activeForm === 'forgot' && 'Secure Your Workshop.'}
            {activeForm === 'change' && 'Reinforce Security.'}
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            {activeForm === 'login' && 'Sign in to manage your 3D printing projects, track orders, and access your custom 3D models.'}
            {activeForm === 'register' && 'Join Sri Lanka’s premier 3D innovation hub. Unlock professional modeling tools and bulk printing discounts.'}
            {activeForm === 'forgot' && 'Lost your access key? No problem. Provide your email to reset your account credentials.'}
            {activeForm === 'change' && 'Update your account security parameters to keep your proprietary designs safe.'}
          </p>

          <div className="space-y-6">
            <FeatureItem icon={<FaCube />} title="Next-Gen Innovation" desc="Access state-of-the-art FDM and Resin printing technologies." />
            <FeatureItem icon={<FaDraftingCompass />} title="Expert 3D Modeling" desc="Clean, manufacturable CAD designs ready for production." />
            <FeatureItem icon={<FaBolt />} title="Rapid Prototyping" desc="Fast turnaround for functional parts and creative concepts." />
          </div>
        </div>

        <div className="text-gray-500 text-sm z-10 font-medium">
          © 2024 DNP 3D Hobby Lobby. Sri Lanka's Leader in 3D Manufacturing.
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#fdfdfd]">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 text-yellow-600 hover:text-yellow-700 transition-colors mb-8">
            <FaHome className="text-lg" />
            <span className="font-semibold uppercase">Back to Home</span>
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">
              {activeForm === 'login' && 'Sign In'}
              {activeForm === 'register' && 'Create Account'}
              {activeForm === 'forgot' && 'Reset Link'}
              {activeForm === 'change' && 'New Password'}
            </h2>
            <div className="h-1 w-12 bg-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">
              {activeForm === 'login' && 'Enter your credentials to access your dashboard'}
              {activeForm === 'register' && 'Fill in your details to start your first project'}
              {activeForm === 'forgot' && 'We will send a recovery code to your inbox'}
              {activeForm === 'change' && 'Define a secure new password for your account'}
            </p>
          </div>

          <div className="bg-white p-2 rounded-xl">
            {activeForm === 'login' && <LoginForm setActiveForm={setActiveForm} />}
            {activeForm === 'register' && <RegisterForm setActiveForm={setActiveForm} setShowOtpPopup={setShowOtpPopup} setOtpPurpose={setOtpPurpose} />}
            {activeForm === 'forgot' && <ForgotPasswordForm setActiveForm={setActiveForm} setShowOtpPopup={setShowOtpPopup} setOtpPurpose={setOtpPurpose} />}
            {activeForm === 'change' && <ChangePasswordForm setActiveForm={setActiveForm} />}
          </div>
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
  <div className="flex items-start gap-4 group">
    <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-yellow-500 text-2xl group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-bold text-lg mb-0.5">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);