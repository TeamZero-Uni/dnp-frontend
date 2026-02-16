import { useState } from 'react';
import { FaLock } from 'react-icons/fa';

const ChangePasswordForm = ({ setActiveForm }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
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
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password changed successfully');
    alert('Password changed successfully! Please login with your new password.');
    setActiveForm('login');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-800">
          Create a strong password with at least 8 characters, including uppercase, lowercase, and numbers.
        </p>
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter new password"
            required
            minLength={8}
          />
        </div>
      </div>

      <div>
        <label htmlFor="change-confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            id="change-confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
            placeholder="Confirm new password"
            required
            minLength={8}
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-[1.02]">
        Change Password
      </button>

      <div className="text-center pt-4">
        <button type="button" onClick={() => setActiveForm('login')} className="text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-2 mx-auto">
          <span>←</span> Back to Sign In
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm