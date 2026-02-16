import { useState } from 'react';
import { FaTimes, FaKey } from 'react-icons/fa';

const OtpPopup = ({ onClose, purpose, setActiveForm }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length, 5);
    document.getElementById(`otp-${lastIndex}`).focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    console.log('OTP submitted:', otpValue);

    setTimeout(() => {
      setIsVerifying(false);
      alert('OTP verified successfully!');
      onClose();
      
      if (purpose === 'forgot') {
        setActiveForm('change');
      } else if (purpose === 'register') {
        setActiveForm('login');
      }
    }, 1500);
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    alert('OTP has been resent to your email!');
    setOtp(['', '', '', '', '', '']);
    document.getElementById('otp-0').focus();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <FaTimes className="text-xl" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <FaKey className="text-blue-600 text-3xl" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Enter Verification Code
        </h3>
        <p className="text-gray-600 text-center mb-8">
          We've sent a 6-digit code to your email address
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{' '}
            <button type="button" onClick={handleResend} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup