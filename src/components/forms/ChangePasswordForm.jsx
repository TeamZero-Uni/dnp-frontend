import { useState } from "react";
import { FaLock } from "react-icons/fa";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/api";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter (A–Z)")
    .matches(/[a-z]/, "Must contain at least one lowercase letter (a–z)")
    .matches(/[0-9]/, "Must contain at least one number (0–9)")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character (@, #, !, etc.)"),

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const getStrength = (pw) => {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2) return { label: "Weak", bar: "w-1/4", color: "bg-red-400", text: "text-red-500" };
  if (score === 3) return { label: "Fair", bar: "w-2/4", color: "bg-yellow-400", text: "text-yellow-600" };
  if (score === 4) return { label: "Good", bar: "w-3/4", color: "bg-blue-400", text: "text-blue-500" };
  return { label: "Strong", bar: "w-full", color: "bg-green-500", text: "text-green-600" };
};

const ChangePasswordForm = ({ setActiveForm, email }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((err) => {
        if (err.path && !errors[err.path]) errors[err.path] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        email: email,
        newPassword: formData.newPassword,
      });
      toast.success("Password changed successfully! Please login with your new password.");
      setActiveForm({ type: "login" });
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to change password. Please try again.";
      toast.error(message);
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, name, type = "password", placeholder) => {
    const hasError = Boolean(fieldErrors[name]);
    const strength = name === "newPassword" ? getStrength(formData.newPassword) : null;
    const iconClass = hasError ? "text-red-400" : "text-gray-400";

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className={iconClass} />
          </div>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
              hasError
                ? "border-red-400 focus:ring-red-300 bg-red-50"
                : "border-gray-300 focus:ring-green-200 bg-white"
            }`}
            placeholder={placeholder}
            required
            minLength={8}
          />
        </div>

        {name === "newPassword" && formData.newPassword && strength && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${strength.color} ${strength.bar}`} />
            </div>
            <p className={`text-xs mt-1 font-medium ${strength.text}`}>{strength.label} password</p>
          </div>
        )}

        {name === "newPassword" && !formData.newPassword && !hasError && (
          <p className="mt-1.5 text-xs text-gray-400">
            Min. 8 chars · uppercase · lowercase · number · special character
          </p>
        )}

        {hasError && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {fieldErrors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-800">
          Create a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
        </p>
      </div>

      {renderField("New Password", "newPassword", "password", "Enter new password")}
      {renderField("Confirm New Password", "confirmPassword", "password", "Confirm new password")}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Changing Password…" : "Change Password"}
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

export default ChangePasswordForm;