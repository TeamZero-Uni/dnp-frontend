import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { getOtp } from "../../api/api";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address (e.g. user@example.com)"
    ),
});

const ForgotPasswordForm = ({
  setActiveForm,
  setShowOtpPopup,
  setOtpPurpose,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    try {
      await validationSchema.validate({ email });
    } catch (validationError) {
      setEmailError(validationError.message);
      return;
    }

    setLoading(true);
    try {
      const res = await getOtp(email);
      
      if (res.success) {
        toast.success("OTP sent to your email!");
        setOtpPurpose({ type: "forgot", email: email });
        setShowOtpPopup(true);
      } else {
        const message = res?.message || "Failed to send OTP. Please try again.";
        toast.error(message);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Error occurred while resetting password. Please try again.";
      toast.error(message);
      console.error("Error occurred while resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Boolean(emailError);
  const iconClass = hasError ? "text-red-400" : "text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-[#5a46c2]">
          Enter your email address and we'll send you a verification code to
          reset your password.
        </p>
      </div>

      <div>
        <label
          htmlFor="forgot-email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className={iconClass} />
          </div>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
              hasError
                ? "border-red-400 focus:ring-red-300 bg-red-50"
                : "border-gray-300 focus:ring-[#5a46c2]"
            }`}
            placeholder="Enter your email"
            required
          />
        </div>

        {hasError && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {emailError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-color py-3 rounded-lg font-semibold focus:ring-4 focus:ring-indigo-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Sending Code…" : "Send Verification Code"}
      </button>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => setActiveForm({ type: "login" })}
          className="text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <span>←</span> Back to Sign In
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;