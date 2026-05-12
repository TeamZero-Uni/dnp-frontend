import { useState, useEffect } from 'react';
import { FaTimes, FaKey } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { verifyOtp, getOtp } from '../api/api';

const OtpPopup = ({ onClose, purpose, setActiveForm }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    document.getElementById('otp-0')?.focus();
    setResendTimer(59);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

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
    if (!/^\d+$/.test(pastedData)) {
      setOtpError('Please paste only numbers');
      return;
    }

    const newOtp = pastedData.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);
    setOtpError('');

    const lastIndex = Math.min(pastedData.length, 5);
    document.getElementById(`otp-${lastIndex}`).focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');

    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    try {
      setIsVerifying(true);
      await verifyOtp({
        otp: otpValue,
        email: purpose.email,
      });
      toast.success('OTP verified successfully!');
      if (purpose.type === 'forgot') {
        setActiveForm({ type: 'change', email: purpose.email });
      } else if (purpose.type === 'register') {
        setActiveForm({ type: 'login' });
      }
      onClose();
    } catch (error) {
      const message = error?.response?.data?.message || 'OTP verification failed. Please try again.';
      setOtpError(message);
      toast.error(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      setIsResending(true);
      await getOtp(purpose.email);
      toast.success('OTP resent successfully!');
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      setResendTimer(59);
      document.getElementById('otp-0')?.focus();
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to resend OTP. Please try again.';
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  const hasError = Boolean(otpError);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <FaKey className="text-[#5a46c2] text-3xl" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Enter Verification Code
          </h3>
        </div>
        <p className="text-gray-600 text-center mb-8">
          We've sent a 6-digit code to <span className="font-medium text-gray-800">{purpose.email}</span>
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
                className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg transition-all outline-none ${
                  hasError
                    ? 'border-red-400 focus:ring-2 focus:ring-red-300 focus:border-red-400 bg-red-50'
                    : 'border-gray-300 focus:ring-2 focus:ring-[#5a46c2] focus:border-[#5a46c2]'
                }`}
                required
              />
            ))}
          </div>

          {hasError && (
            <p className="mb-4 text-sm text-red-500 flex items-center gap-2 justify-center">
              <span>⚠</span> {otpError}
            </p>
          )}

          <button
            type="submit"
            disabled={isVerifying || otp.join('').length !== 6}
            className="w-full btn-color py-3 rounded-lg font-semibold focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isVerifying ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0 || isResending}
              className={`font-semibold transition-all ${
                resendTimer > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#5a46c2] hover:text-[#4838a3]'
              }`}
            >
              {isResending ? 'Sending...' : resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;