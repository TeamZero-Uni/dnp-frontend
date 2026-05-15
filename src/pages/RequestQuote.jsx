import React, { useState, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiCheck, FiChevronRight, FiChevronLeft, FiUpload,
  FiX, FiMinus, FiPlus, FiSend, FiUser, FiMail, FiPhone,
} from "react-icons/fi";
import {
  MdOutlinePrint, MdOutlineDesignServices, MdOutlineElectricBolt, MdOutlineAutorenew,
  MdOutlineContentCut, MdOutlineLightbulb, MdOutlineFactory,
} from "react-icons/md";
import Banner from "../components/layout/Banner";
import ReadyToStart from "../components/ReadyToStart";
import StepSelectService from "../components/sections/quote/StepSelectService";
import StepUploadFiles from "../components/sections/quote/StepUploadFiles";
import StepProjectDetails from "../components/sections/quote/StepProjectDetails";
import { submitQuoteRequest } from "../api/quoteApi";
import StepReviewSubmit from "../components/sections/quote/StepReviewSubmit";

/* ─────────────────────────────────────────────
   SERVICE DEFINITIONS
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "fdm",
    label: "FDM 3D Printing",
    desc: "High-quality prototypes with precision and speed",
    icon: MdOutlinePrint,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    gradientFrom: "#7c3aed",
    gradientTo: "#5b21b6",
    shadow: "rgba(109,40,217,0.25)",
    fields: [
      { key: "material", label: "Material", type: "select", options: ["PLA", "ABS", "PETG", "PPU"] },
      { key: "quality",  label: "Print Quality", type: "select", options: ["Draft (0.3mm)", "Standard (0.2mm)", "Fine (0.1mm)"] },
      { key: "infill",   label: "Infill %", type: "select", options: ["15%", "20%", "30%", "50%", "75%", "100%"] },
      { key: "color",    label: "Color", type: "color" },
      { key: "quantity", label: "Quantity", type: "counter" },
      { key: "notes",    label: "Additional Notes", type: "textarea" },
    ],
  },
  {
    id: "resin",
    label: "Resin 3D Printing",
    desc: "Ultra-detailed prints with smooth surface finish",
    icon: MdOutlineDesignServices,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    gradientFrom: "#0284c7",
    gradientTo: "#075985",
    shadow: "rgba(2,132,199,0.25)",
    fields: [
      { key: "resinType", label: "Resin Type", type: "select", options: ["Standard", "ABS-Like", "Flexible", "Castable", "Dental Grade"] },
      { key: "quality",   label: "Print Quality", type: "select", options: ["Draft (0.3mm)", "Standard (0.2mm)", "Fine (0.1mm)"] },
      { key: "color",     label: "Color", type: "color" },
      { key: "quantity",  label: "Quantity", type: "counter" },
      { key: "notes",     label: "Additional Notes", type: "textarea" },
    ],
  },
  {
    id: "laser",
    label: "Laser Cutting & Engraving",
    desc: "Precision cutting and engraving for various materials",
    icon: MdOutlineContentCut,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    gradientFrom: "#d97706",
    gradientTo: "#b45309",
    shadow: "rgba(217,119,6,0.25)",
    fields: [
      { key: "material",  label: "Material", type: "select", options: ["Acrylic", "Wood (Plywood)"] },
      { key: "thickness", label: "Thickness (mm)", type: "select", options: ["2mm", "3mm", "5mm", "6mm", "8mm", "10mm"] },
      { key: "jobType",   label: "Job Type", type: "select", options: ["Cutting Only", "Engraving Only", "Cut + Engrave"] },
      { key: "quantity",  label: "Quantity / Sheets", type: "counter" },
      { key: "notes",     label: "Design Notes", type: "textarea" },
    ],
  },
  {
    id: "light",
    label: "Light Letters / LED Signs",
    desc: "Custom illuminated signs for events and businesses",
    icon: MdOutlineLightbulb,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    gradientFrom: "#e11d48",
    gradientTo: "#be123c",
    shadow: "rgba(225,29,72,0.25)",
    fields: [
      { key: "size",     label: "Letter Height", type: "select", options: ["20cm", "30cm", "40cm", "60cm", "80cm", "Custom"] },
      { key: "ledColor", label: "Color", type: "select", options: ["Warm White", "Cool White", "RGB (Multicolor)", "Red", "Blue", "Green", "Yellow"] },
      { key: "ledtype",  label: "Type", type: "select", options: ["Seal Types", "Back Open"] },
      { key: "quantity", label: "No. of Letters / Words", type: "counter" },
      { key: "notes",    label: "Text / Design Notes", type: "textarea" },
    ],
  },
  {
    id: "robotic",
    label: "Robotic Project",
    desc: "Upload reference images, then describe your automation goal",
    icon: MdOutlineElectricBolt,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    gradientFrom: "#4f46e5",
    gradientTo: "#3730a3",
    shadow: "rgba(79,70,229,0.25)",
    fields: [
      { key: "notes", label: "Project Details", type: "textarea" },
    ],
  },
  {
    id: "injection",
    label: "Injection Molding",
    desc: "Upload your part images, share dimensions and requirements",
    icon: MdOutlineFactory,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    gradientFrom: "#0d9488",
    gradientTo: "#0f766e",
    shadow: "rgba(13,148,136,0.25)",
    fields: [
      { key: "notes", label: "Additional Requirements", type: "textarea" },
    ],
  },
  {
    id: "filament",
    label: "3D Printing Filament Recycler",
    desc: "Recycle waste filament into reusable material",
    icon: MdOutlineAutorenew,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    gradientFrom: "#059669",
    gradientTo: "#047857",
    shadow: "rgba(5,150,105,0.25)",
    fields: [
      { key: "material", label: "Material", type: "select", options: ["ABS", "PP", "PE", "Nylon", "PC", "POM"] },
      { key: "color",    label: "Color", type: "color" },
    ],
  },
];

const COLOR_OPTIONS = [
  { label: "White",  value: "#FFFFFF", border: true },
  { label: "Black",  value: "#1e1a3c" },
  { label: "Grey",   value: "#94a3b8" },
  { label: "Red",    value: "#ef4444" },
  { label: "Blue",   value: "#3b82f6" },
  { label: "Green",  value: "#22c55e" },
  { label: "Yellow", value: "#eab308" },
  { label: "Custom", value: "custom"  },
];

const STEPS = ["Select Service", "Upload Files", "Project Details", "Review & Submit"];

const STEP_COLORS = [
  { from: "#7c3aed", to: "#5b21b6" },
  { from: "#0284c7", to: "#075985" },
  { from: "#d97706", to: "#b45309" },
  { from: "#059669", to: "#047857" },
];

/* ─────────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────────── */
function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 px-2">
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        const col    = STEP_COLORS[i];
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-300"
                style={
                  done
                    ? { background: `linear-gradient(135deg,${col.from},${col.to})`, borderColor: col.from, color: "#fff" }
                    : active
                    ? { background: "#fff", borderColor: col.from, color: col.from, boxShadow: `0 0 0 4px ${col.from}22` }
                    : { background: "#fff", borderColor: "#e2e8f0", color: "#cbd5e1" }
                }
              >
                {done ? <FiCheck size={15} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className="text-[10px] font-bold whitespace-nowrap hidden sm:block"
                style={{ color: active ? col.from : done ? "#64748b" : "#cbd5e1" }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-1 mt-[-14px] sm:mt-[-20px] transition-all duration-500"
                style={{
                  background: done
                    ? `linear-gradient(90deg,${STEP_COLORS[i].from},${STEP_COLORS[i + 1].from})`
                    : "#e2e8f0",
                  minWidth: 20,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DYNAMIC FIELD RENDERER
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   STEP 1 — SELECT SERVICE
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   STEP 2 — UPLOAD FILES
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   STEP 3 — PROJECT DETAILS
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   VALIDATION
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
}

/* ─────────────────────────────────────────────
   STEP 4 — REVIEW & SUBMIT
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   STEP 4 — REVIEW & SUBMIT
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function RequestQuote() {
  const [step, setStep]           = useState(0);
  const [service, setService]     = useState(null);
  const [files, setFiles]         = useState([]);
  const [dragging, setDragging]   = useState(false);
  const [details, setDetails]     = useState({});
  const [contact, setContact]     = useState({ name: "", email: "", phone: "", address: "", postalCode: "" });
  const [touched, setTouched]     = useState({ email: false, phone: false, address: false, postalCode: false });
  const [submitted, setSubmitted] = useState(false);

  const selectedService = SERVICES.find((s) => s.id === service);
  const accent          = selectedService?.gradientFrom || "#5a46c2";
  const accentTo        = selectedService?.gradientTo   || "#4838a3";
  const accentShadow    = selectedService?.shadow       || "rgba(90,70,194,.3)";

  const addFiles = useCallback((newFiles) => {
    const arr = Array.from(newFiles).filter((f) => f.size <= 50 * 1024 * 1024);
    setFiles((prev) => [...prev, ...arr].slice(0, 5));
  }, []);

  const removeFile    = useCallback((i) => setFiles((f) => f.filter((_, idx) => idx !== i)), []);
  const handleDragOver  = useCallback((e) => { e.preventDefault(); setDragging(true); }, []);
  const handleDragLeave = useCallback(() => setDragging(false), []);
  const handleDrop      = useCallback((e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }, [addFiles]);
  const handleBrowseClick = useCallback(() => document.getElementById("file-input").click(), []);
  const handleFileChange  = useCallback((e) => addFiles(e.target.files), [addFiles]);
  const setDetail         = useCallback((key, val) => setDetails((d) => ({ ...d, [key]: val })), []);
  const handleContactChange = useCallback((key, val) => setContact((c) => ({ ...c, [key]: val })), []);
  const handleBlur          = useCallback((key) => setTouched((t) => ({ ...t, [key]: true })), []);

  const canNext = () => {
    if (step === 0) return !!service;
    if (step === 2) {
      const required = selectedService.fields.filter((f) => f.type !== "textarea");
      return required.every((f) => details[f.key] !== undefined && details[f.key] !== "");
    }
    if (step === 3) {
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

  


const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
  setTouched({ email: true, phone: true, address: true, postalCode: true });
  
  if (!canNext()) return;

  try {
    setSubmitting(true);
    setSubmitError(null);
    console.log("Submitting quote request with data:", {
      service,
      serviceLabel: selectedService?.label,
      details,
      contact,
    });
    await submitQuoteRequest({
      service,                    // "fdm", "resin", etc.
      serviceLabel: selectedService?.label,
      details,                    // { material, quality, infill, color, quantity, notes }
      contact,                    // { name, email, phone, address, postalCode }
    });

    setSubmitted(true);

  } catch (err) {
    console.error("submitQuoteRequest error:", err);
    setSubmitError(err?.message || "Can not Submit");
  } finally {
    setSubmitting(false);
  }
};

  const handleNewRequest = useCallback(() => {
    setStep(0); setService(null); setFiles([]); setDetails({});
    setContact({ name: "", email: "", phone: "", address: "", postalCode: "" });
    setTouched({ email: false, phone: false, address: false, postalCode: false });
    setSubmitted(false);
  }, []);

  /* ── SUCCESS ── */
  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center p-6" >
      <div
        className="bg-white rounded-3xl p-10 text-center max-w-md w-full"
        style={{ border: `1px solid ${accent}30`, boxShadow: `0 16px 60px ${accentShadow}` }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white"
          style={{ background: `linear-gradient(135deg,${accent},${accentTo})`, boxShadow: `0 8px 24px ${accentShadow}` }}
        >
          <FiCheck size={28} strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Quote Requested!</h2>
        <p className="text-sm text-slate-400 leading-relaxed mb-2">
          Thanks <strong className="text-slate-700">{contact.name}</strong>! We've received your request for
        </p>
        <span
          className="inline-block text-xs font-black px-3 py-1.5 rounded-full mb-4"
          style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
        >
          {selectedService?.label}
        </span>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          We'll send a quote to <strong className="text-slate-700">{contact.email}</strong> within <strong>24 hours</strong>.
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="/"
            className="px-5 py-2.5 rounded-full text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Go Home
          </a>
          <button
            onClick={handleNewRequest}
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: `linear-gradient(135deg,${accent},${accentTo})`, boxShadow: `0 4px 14px ${accentShadow}` }}
          >
            New Request
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4" style={{ background: "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 40%,#f0fdf4 100%)" }}>
      <style>{`
        @keyframes stepIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <Banner
        path="Quote"
        title={<>Build Something<br /><span style={{ color: accent }}>Extraordinary</span></>}
        description="Tell us about your project — we'll review your files and send a detailed quote within 24 hours."
        tagLine="Free Quote · No Commitment"
        imageUrl={null}
        buttonText="Get Started"
        buttonLink="#quote"
      />

      <div
        className="max-w-3xl mx-auto mt-20 bg-white rounded-3xl p-6 sm:p-8"
        style={{
          border: `1px solid ${accent}20`,
          boxShadow: `0 8px 48px ${accentShadow}, 0 2px 8px rgba(0,0,0,0.04)`,
        }}
      >
        <StepBar current={step} />

        <div style={{ animation: "stepIn .25s ease both" }} key={step}>
          {step === 0 && <StepSelectService service={service} onSelect={setService} SERVICES={SERVICES} />}
          {step === 1 && (
            <StepUploadFiles selectedService={selectedService} accent={accent} accentTo={accentTo}
              files={files} dragging={dragging}
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              onBrowseClick={handleBrowseClick} onFileChange={handleFileChange} onRemoveFile={removeFile}
            />
          )}
          {step === 2 && (
            <StepProjectDetails selectedService={selectedService} details={details} onDetailChange={setDetail} contact={contact} />
          )}
          {step === 3 && (
            <StepReviewSubmit
              selectedService={selectedService} files={files} details={details}
              contact={contact} onContactChange={handleContactChange}
              touched={touched} onBlur={handleBlur}
            />
          )}
        </div>

        {/* navigation */}
<div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
  <button
    onClick={() => setStep((s) => s - 1)}
    disabled={step === 0}
    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
  >
    <FiChevronLeft size={15} /> Back
  </button>

  <div className="flex items-center gap-1.5">
    {STEPS.map((_, i) => (
      <div
        key={i}
        className="rounded-full transition-all duration-300"
        style={{
          width: i === step ? 20 : 6,
          height: 6,
          background: i <= step ? `linear-gradient(90deg,${accent},${accentTo})` : "#e2e8f0",
        }}
      />
    ))}
  </div>

  {step < 3 ? (
    <button
      onClick={() => setStep((s) => s + 1)}
      disabled={!canNext()}
      className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
      style={{
        background: `linear-gradient(135deg,${accent},${accentTo})`,
        boxShadow: canNext() ? `0 4px 14px ${accentShadow}` : "none",
      }}
    >
      Next <FiChevronRight size={15} />
    </button>
  ) : (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleSubmit}
        disabled={!canNext() || submitting}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        style={{
          background: `linear-gradient(135deg,${accent},${accentTo})`,
          boxShadow: canNext() ? `0 4px 14px ${accentShadow}` : "none",
        }}
      >
        {submitting ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Submitting...
          </>
        ) : (
          <><FiSend size={14} /> Submit Request</>
        )}
      </button>
      {submitError && (
        <p className="text-xs text-red-500 font-semibold text-center">{submitError}</p>
      )}
    </div>
  )}
</div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6 mb-10">
        Need help?{" "}
        <a href="/contact" className="font-semibold hover:underline" style={{ color: accent }}>
          Contact us directly
        </a>
      </p>
    </div>
  );
}