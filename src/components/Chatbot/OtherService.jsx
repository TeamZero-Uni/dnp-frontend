import { useState, useRef, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { postOtherServiceRequest } from "../../api/chatbotApi";

function Toast({ message, type, visible }) {
  const bg = type === "error" ? "bg-red-500" : "bg-emerald-500";
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-xl transition-all duration-400 ${bg} ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
      <FaCheckCircle size={12} /> {message}
    </div>
  );
}

const OtherService = ({ onBack }) => {
  const [form, setForm] = useState({ need: "", details: "", contact: "" });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });
  const toastTimer = useRef(null);

  const showToast = (message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2800);
  };

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  const validateContact = (value) => {
    if (!value) return "Email is required";
    if (isValidEmail(value)) return "";
    return "Enter a valid email";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "contact") {
      setContactError(validateContact(value));
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactErr = validateContact(form.contact);
    setContactError(contactErr);
    if (!form.need || !form.details || !form.contact || contactErr) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = new FormData();
      payload.append("need", form.need);
      payload.append("details", form.details);
      payload.append("contact", form.contact);
      if (file) payload.append("file", file);

      await postOtherServiceRequest(payload);
      setSuccess(true);
      showToast("Request sent successfully!", "success");
      setForm({ need: "", details: "", contact: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to send request. Please try again.");
      showToast("Failed to send request. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800"
        >
          <IoArrowBack size={16} />
          Back
        </button>

        <h3 className="mt-4 text-2xl font-bold text-slate-900">Other Service</h3>
        <p className="mt-1 text-sm text-slate-600">Tell us what you need</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">What do you need?</label>
          <input
            name="need"
            value={form.need}
            onChange={handleChange}
            required
            placeholder="e.g., Metal engraving"
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            required
            placeholder="Size, material, quantity, etc."
            rows={5}
            className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            placeholder="Email address"
            aria-invalid={contactError ? "true" : "false"}
            className={`mt-2 w-full rounded-lg border px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 ${contactError ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-indigo-200"}`}
          />
          {contactError && <p className="mt-1 text-sm text-red-600">{contactError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Attach file</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
          />
          <p className="mt-1 text-xs text-slate-500">Optional: upload any reference image, document, or sketch.</p>
          {file && <p className="mt-1 text-sm text-slate-600">Selected: {file.name}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting || !!contactError || !form.need || !form.details || !form.contact}
            className="w-full rounded-full bg-emerald-500 px-4 py-3 text-base font-bold text-white shadow-md hover:bg-emerald-600 active:scale-[0.99] disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send Request"}
          </button>
        </div>

        {submitError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        )}

        {success && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Request sent — we will contact you soon.</div>
        )}
      </form>
      <Toast {...toast} />
    </div>
  );
};

export default OtherService;
