import React, { useState, useCallback } from "react";
import {
  FiX, FiMinus, FiPlus, FiSend, FiUser, FiMail, FiPhone, FiCheck, FiUpload
} from "react-icons/fi";
import {
  MdOutlinePrint, MdOutlineDesignServices, MdOutlineContentCut, MdOutlineLightbulb, MdOutlineAutorenew
} from "react-icons/md";
import { submitQuoteRequest } from "../../api/quoteApi";

/* ─────────────────────────────────────────────
   SERVICE DEFINITIONS (Excluding Robotic & Injection)
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "fdm",
    label: "FDM 3D Printing",
    desc: "High-quality prototypes with precision and speed",
    icon: MdOutlinePrint,
    gradientFrom: "#7c3aed",
    gradientTo: "#5b21b6",
    shadow: "rgba(109,40,217,0.25)",
    fields: [
      { key: "material", label: "Material", type: "select", options: ["PLA", "ABS", "PETG", "PPU"] },
      { key: "quality", label: "Print Quality", type: "select", options: ["Draft (0.3mm)", "Standard (0.2mm)", "Fine (0.1mm)"] },
      { key: "infill", label: "Infill %", type: "select", options: ["15%", "20%", "30%", "50%", "75%", "100%"] },
      { key: "color", label: "Color", type: "color" },
      { key: "quantity", label: "Quantity", type: "counter" },
      { key: "notes", label: "Additional Notes", type: "textarea" },
    ],
  },
  {
    id: "resin",
    label: "Resin 3D Printing",
    desc: "Ultra-detailed prints with smooth surface finish",
    icon: MdOutlineDesignServices,
    gradientFrom: "#0284c7",
    gradientTo: "#075985",
    shadow: "rgba(2,132,199,0.25)",
    fields: [
      { key: "resinType", label: "Resin Type", type: "select", options: ["Standard", "ABS-Like", "Flexible", "Castable", "Dental Grade"] },
      { key: "quality", label: "Print Quality", type: "select", options: ["Draft (0.3mm)", "Standard (0.2mm)", "Fine (0.1mm)"] },
      { key: "color", label: "Color", type: "color" },
      { key: "quantity", label: "Quantity", type: "counter" },
      { key: "notes", label: "Additional Notes", type: "textarea" },
    ],
  },
  {
    id: "laser",
    label: "Laser Cutting & Engraving",
    desc: "Precision cutting and engraving for various materials",
    icon: MdOutlineContentCut,
    gradientFrom: "#d97706",
    gradientTo: "#b45309",
    shadow: "rgba(217,119,6,0.25)",
    fields: [
      { key: "material", label: "Material", type: "select", options: ["Acrylic", "Wood (Plywood)"] },
      { key: "thickness", label: "Thickness (mm)", type: "select", options: ["2mm", "3mm", "5mm", "6mm", "8mm", "10mm"] },
      { key: "jobType", label: "Job Type", type: "select", options: ["Cutting Only", "Engraving Only", "Cut + Engrave"] },
      { key: "quantity", label: "Quantity / Sheets", type: "counter" },
      { key: "notes", label: "Design Notes", type: "textarea" },
    ],
  },
  {
    id: "light",
    label: "Light Letters / LED Signs",
    desc: "Custom illuminated signs for events and businesses",
    icon: MdOutlineLightbulb,
    gradientFrom: "#e11d48",
    gradientTo: "#be123c",
    shadow: "rgba(225,29,72,0.25)",
    fields: [
      { key: "size", label: "Letter Height", type: "select", options: ["20cm", "30cm", "40cm", "60cm", "80cm", "Custom"] },
      { key: "ledColor", label: "Color", type: "select", options: ["Warm White", "Cool White", "RGB (Multicolor)", "Red", "Blue", "Green", "Yellow"] },
      { key: "ledtype", label: "Type", type: "select", options: ["Seal Types", "Back Open"] },
      { key: "quantity", label: "No. of Letters / Words", type: "counter" },
      { key: "notes", label: "Text / Design Notes", type: "textarea" },
    ],
  },
  {
    id: "filament",
    label: "3D Printing Filament Recycler",
    desc: "Recycle waste filament into reusable material",
    icon: MdOutlineAutorenew,
    gradientFrom: "#059669",
    gradientTo: "#047857",
    shadow: "rgba(5,150,105,0.25)",
    fields: [
      { key: "material", label: "Material", type: "select", options: ["ABS", "PP", "PE", "Nylon", "PC", "POM"] },
      { key: "color", label: "Color", type: "color" },
    ],
  },
];

const COLOR_OPTIONS = [
  { label: "White", value: "#FFFFFF", border: true },
  { label: "Black", value: "#1e1a3c" },
  { label: "Grey", value: "#94a3b8" },
  { label: "Red", value: "#ef4444" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#22c55e" },
  { label: "Yellow", value: "#eab308" },
  { label: "Custom", value: "custom" },
];

/* ─────────────────────────────────────────────
   VALIDATION FUNCTIONS
───────────────────────────────────────────── */
const validateEmail = (v) => {
  if (!v) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
  return "";
};

const validatePhone = (v) => {
  if (!v) return "";
  if (!/^\+?[\d\s\-().]{7,20}$/.test(v)) return "Enter a valid phone number";
  return "";
};

const validatePostalCode = (code) => {
  if (!code) return "Postal code is required";
  if (!/^\d{5}$/.test(code)) return "Enter a valid 5-digit postal code";
  return "";
};

const validateAddress = (v) => {
  if (!v) return "Address is required";
  if (v.length < 10) return "Address must be at least 10 characters";
  return "";
};

/* ─────────────────────────────────────────────
   FIELD RENDERER COMPONENT
───────────────────────────────────────────── */
function DynamicField({ field, value, onChange, accent }) {
  if (field.type === "select") {
    return (
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
          {field.label}
        </label>
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all hover:border-slate-300 focus:border-transparent"
          style={{ boxShadow: `0 0 0 3px ${accent}15` }}
        >
          <option value="">Select {field.label}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "color") {
    return (
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
          {field.label}
        </label>
        <div className="flex gap-2 flex-wrap">
          {COLOR_OPTIONS.map((col) => (
            <button
              key={col.value}
              onClick={() => onChange(col.value)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                value === col.value
                  ? "ring-2 ring-offset-2"
                  : "border border-slate-200 hover:border-slate-300"
              }`}
              style={{
                background: col.value === "custom" ? "#f1f5f9" : col.value,
                color: col.value === "custom" ? "#1e293b" : col.border ? "#1e1a3c" : "#fff",
                ringColor: accent,
              }}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "counter") {
    return (
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
          {field.label}
        </label>
        <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 w-fit">
          <button
            onClick={() => onChange(Math.max(1, (value || 1) - 1))}
            className="text-slate-600 hover:text-slate-800 transition-colors"
          >
            <FiMinus size={18} />
          </button>
          <span className="text-lg font-bold text-slate-800 w-8 text-center">{value || 1}</span>
          <button
            onClick={() => onChange((value || 1) + 1)}
            className="text-slate-600 hover:text-slate-800 transition-colors"
          >
            <FiPlus size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
          {field.label}
        </label>
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}...`}
          rows="4"
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all hover:border-slate-300 focus:border-transparent resize-none"
          style={{ boxShadow: `0 0 0 3px ${accent}15` }}
        />
      </div>
    );
  }

  return null;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function QuoteAddView({onSuccess}) {
  const [service, setService] = useState(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [details, setDetails] = useState({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "", postalCode: "" });
  const [touched, setTouched] = useState({ email: false, phone: false, address: false, postalCode: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const selectedService = SERVICES.find((s) => s.id === service);
  const accent = selectedService?.gradientFrom || "#5a46c2";
  const accentTo = selectedService?.gradientTo || "#4838a3";
  const accentShadow = selectedService?.shadow || "rgba(90,70,194,.3)";

  const addFiles = useCallback((newFiles) => {
    const arr = Array.from(newFiles).filter((f) => f.size <= 50 * 1024 * 1024);
    setFiles((prev) => [...prev, ...arr].slice(0, 5));
  }, []);

  const removeFile = useCallback((i) => setFiles((f) => f.filter((_, idx) => idx !== i)), []);
  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragging(true); }, []);
  const handleDragLeave = useCallback(() => setDragging(false), []);
  const handleDrop = useCallback((e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }, [addFiles]);
  const handleBrowseClick = useCallback(() => document.getElementById("file-input").click(), []);
  const handleFileChange = useCallback((e) => addFiles(e.target.files), [addFiles]);
  const setDetail = useCallback((key, val) => setDetails((d) => ({ ...d, [key]: val })), []);
  const handleContactChange = useCallback((key, val) => setContact((c) => ({ ...c, [key]: val })), []);
  const handleBlur = useCallback((key) => setTouched((t) => ({ ...t, [key]: true })), []);

  const emailError = touched.email ? validateEmail(contact.email) : "";
  const phoneError = touched.phone ? validatePhone(contact.phone) : "";
  const addressError = touched.address ? validateAddress(contact.address) : "";
  const postalCodeError = touched.postalCode ? validatePostalCode(contact.postalCode) : "";

  const inputBorder = (err, key) =>
    err ? "#f87171" : contact[key] && key !== "name" && !err && touched[key] ? "#34d399" : "#e2e8f0";

  const canSubmit = () => {
    if (!service) return false;

    if (showContactForm) {
      return (
        contact.name.trim() !== "" &&
        validateEmail(contact.email) === "" &&
        validatePhone(contact.phone) === "" &&
        validatePostalCode(contact.postalCode) === "" &&
        validateAddress(contact.address) === ""
      );
    }

    return true;
  };

  const handleSubmit = async () => {
    if (showContactForm) {
      setTouched({ email: true, phone: true, address: true, postalCode: true });
    }

    if (!canSubmit()) return;

    try {
      setSubmitting(true);
      setSubmitError(null);
      console.log("Submitting admin quote:", {
        service,
        serviceLabel: selectedService?.label,
        details,
        contact: showContactForm ? contact : null,
        files: files.map((f) => f.name),
      });

      await submitQuoteRequest({
        service,
        serviceLabel: selectedService?.label,
        details,
        contact: showContactForm ? contact : null,
        filesCount: files.length,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setService(null);
        setFiles([]);
        setDetails({});
        setContact({ name: "", email: "", phone: "", address: "", postalCode: "" });
        setTouched({ email: false, phone: false, address: false, postalCode: false });
        setSubmitSuccess(false);
        setShowContactForm(false);
        onSuccess();
      }, 3000);
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError(err?.message || "Failed to submit quote");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div>
        {submitSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-emerald-700 font-semibold flex items-center gap-2">
              <FiCheck className="text-emerald-600" /> Quote submitted successfully!
            </p>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 font-semibold">{submitError}</p>
          </div>
        )}

        {/* SERVICE SELECTION */}
        <div className="mb-8">
          <select
            value={service || ""}
            onChange={(e) => {
              setService(e.target.value || null);
              setDetails({});
            }}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all hover:border-slate-300 focus:border-transparent"
            style={{ boxShadow: service ? `0 0 0 3px ${accent}15` : "" }}
          >
            <option value="">Select a service...</option>
            {SERVICES.map((svc) => (
              <option key={svc.id} value={svc.id}>
                {svc.label}
              </option>
            ))}
          </select>
        </div>

        {service && (
          <>
            {/* PROJECT DETAILS */}
            <div className="mb-8 pb-8 border-b border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedService?.fields.map((field) => (
                  <div key={field.key}>
                    <DynamicField
                      field={field}
                      value={details[field.key]}
                      onChange={(val) => setDetail(field.key, val)}
                      accent={accent}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* FILE UPLOAD */}
            <div className="mb-8 pb-8 border-b border-slate-200">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragging ? "border-slate-900 bg-slate-50" : "border-slate-300 bg-slate-50"
                }`}
              >
                <FiUpload size={32} className="mx-auto mb-3 text-slate-400" />
                <p className="text-slate-700 font-semibold mb-1">Drag files here or</p>
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="text-blue-600 font-bold hover:underline"
                >
                  browse files
                </button>
                <p className="text-xs text-slate-500 mt-2">Max 5 files, 50MB each</p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                      <span className="text-sm text-slate-700 font-medium truncate">{f.name}</span>
                      <button
                        onClick={() => removeFile(i)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CONTACT INFORMATION */}
            {!showContactForm ? (
              <div className="mb-8">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full py-3 px-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold transition-all hover:bg-slate-50 hover:border-slate-400"
                >
                  + Add Contact Details
                </button>
              </div>
            ) : (
              <div className="mb-8 pb-8 border-b border-slate-200">
                <button
                  onClick={() => setShowContactForm(false)}
                  className="mb-4 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  ← Hide Contact Details
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                    <FiUser size={14} /> Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => handleContactChange("name", e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none border-2 border-slate-200 transition-all hover:border-slate-300 focus:border-transparent"
                    style={{ boxShadow: contact.name ? `0 0 0 3px ${accent}15` : "" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                    <FiMail size={14} /> Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none border-2 transition-all hover:border-slate-300 focus:border-transparent"
                      style={{ borderColor: inputBorder(emailError, "email"), boxShadow: contact.email && !emailError ? `0 0 0 3px ${accent}15` : "" }}
                    />
                    {contact.email && !emailError && touched.email && (
                      <FiCheck size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                    {emailError && (
                      <FiX size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
                    )}
                  </div>
                  {emailError && <p className="text-xs text-red-500 font-semibold mt-1">{emailError}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                    <FiPhone size={14} /> Phone <span className="text-slate-300 font-normal normal-case">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      placeholder="+94 77 000 0000"
                      className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none border-2 transition-all hover:border-slate-300 focus:border-transparent"
                      style={{ borderColor: inputBorder(phoneError, "phone"), boxShadow: contact.phone && !phoneError ? `0 0 0 3px ${accent}15` : "" }}
                    />
                    {contact.phone && !phoneError && touched.phone && (
                      <FiCheck size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                    {phoneError && (
                      <FiX size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
                    )}
                  </div>
                  {phoneError && <p className="text-xs text-red-500 font-semibold mt-1">{phoneError}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                    <FiUser size={14} /> Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact.address}
                    onChange={(e) => handleContactChange("address", e.target.value)}
                    onBlur={() => handleBlur("address")}
                    placeholder="NO:123 Main Street, Colombo"
                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none border-2 border-slate-200 transition-all hover:border-slate-300 focus:border-transparent"
                    style={{ boxShadow: contact.address && !addressError ? `0 0 0 3px ${accent}15` : "" }}
                  />
                  {addressError && <p className="text-xs text-red-500 font-semibold mt-1">{addressError}</p>}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                    <FiUser size={14} /> Postal Code <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact.postalCode}
                    onChange={(e) => handleContactChange("postalCode", e.target.value)}
                    onBlur={() => handleBlur("postalCode")}
                    placeholder="e.g. 10100"
                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none border-2 border-slate-200 transition-all hover:border-slate-300 focus:border-transparent"
                    style={{ boxShadow: contact.postalCode && !postalCodeError ? `0 0 0 3px ${accent}15` : "" }}
                  />
                  {postalCodeError && <p className="text-xs text-red-500 font-semibold mt-1">{postalCodeError}</p>}
                </div>
              </div>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || submitting}
              className="w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              style={{
                background: `linear-gradient(135deg,${accent},${accentTo})`,
                boxShadow: canSubmit() ? `0 8px 24px ${accentShadow}` : "none",
              }}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend size={16} /> Submit Quote Request
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}