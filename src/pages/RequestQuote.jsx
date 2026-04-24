import React, { useState, useCallback } from "react";
import {
  FiCheck, FiChevronRight, FiChevronLeft, FiUpload,
  FiX, FiMinus, FiPlus, FiSend, FiUser, FiMail, FiPhone,
} from "react-icons/fi";
import {
  MdOutlinePrint, MdOutlineDesignServices, MdOutlineElectricBolt,
  MdOutlineContentCut, MdOutlineLightbulb, MdOutlineFactory,
} from "react-icons/md";
import Banner from "../components/layout/Banner";
import ReadyToStart from "../components/ReadyToStart";

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
    fields: [
      { key: "material", label: "Material", type: "select",
        options: ["PLA", "ABS", "PETG", "TPU", "ASA", "Nylon"] },
      { key: "quality",  label: "Print Quality", type: "select",
        options: ["Draft (0.3mm)", "Standard (0.2mm)", "Fine (0.1mm)"] },
      { key: "infill",   label: "Infill %", type: "select",
        options: ["15%", "20%", "30%", "50%", "75%", "100%"] },
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
    fields: [
      { key: "resinType", label: "Resin Type", type: "select",
        options: ["Standard", "ABS-Like", "Flexible", "Castable", "Dental Grade"] },
      { key: "finish",    label: "Surface Finish", type: "select",
        options: ["Raw", "Sanded", "Painted", "Polished"] },
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
    fields: [
      { key: "material",   label: "Material", type: "select",
        options: ["Acrylic", "Wood (MDF)", "Wood (Plywood)", "Leather", "Cardboard", "Foam"] },
      { key: "thickness",  label: "Thickness (mm)", type: "select",
        options: ["2mm", "3mm", "5mm", "6mm", "8mm", "10mm"] },
      { key: "jobType",    label: "Job Type", type: "select",
        options: ["Cutting Only", "Engraving Only", "Cut + Engrave"] },
      { key: "quantity",   label: "Quantity / Sheets", type: "counter" },
      { key: "notes",      label: "Design Notes", type: "textarea" },
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
    fields: [
      { key: "size",       label: "Letter Height", type: "select",
        options: ["20cm", "30cm", "40cm", "60cm", "80cm", "Custom"] },
      { key: "ledColor",   label: "LED Color", type: "select",
        options: ["Warm White", "Cool White", "RGB (Multicolor)", "Red", "Blue", "Green", "Yellow"] },
      { key: "mounting",   label: "Mounting Type", type: "select",
        options: ["Wall Mount", "Free Standing", "Table Top", "Hanging"] },
      { key: "quantity",   label: "No. of Letters / Words", type: "counter" },
      { key: "notes",      label: "Text / Design Notes", type: "textarea" },
    ],
  },
  {
    id: "cad",
    label: "3D Modeling & CAD",
    desc: "Professional design services for your concepts",
    icon: MdOutlineElectricBolt,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    fields: [
      { key: "software",    label: "Preferred Software", type: "select",
        options: ["Fusion 360", "SolidWorks", "Blender", "Rhino", "No Preference"] },
      { key: "deliverable", label: "Deliverable Format", type: "select",
        options: ["STL", "STEP", "OBJ", "IGES", "Native File", "All Formats"] },
      { key: "complexity",  label: "Model Complexity", type: "select",
        options: ["Simple (basic shapes)", "Medium (mechanical parts)", "Complex (organic/detailed)", "Very Complex"] },
      { key: "notes",       label: "Describe Your Model", type: "textarea" },
    ],
  },
  {
    id: "injection",
    label: "Injection Molding",
    desc: "Mass production with high precision",
    icon: MdOutlineFactory,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    fields: [
      { key: "material",  label: "Material", type: "select",
        options: ["ABS", "PP", "PE", "Nylon", "PC", "POM"] },
      { key: "color",     label: "Color", type: "color" },
      { key: "quantity",  label: "Production Quantity", type: "select",
        options: ["100–500", "500–1,000", "1,000–5,000", "5,000–10,000", "10,000+"] },
      { key: "moldType",  label: "Mold Type", type: "select",
        options: ["Single Cavity", "Multi Cavity", "Family Mold"] },
      { key: "notes",     label: "Additional Requirements", type: "textarea" },
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

/* ─────────────────────────────────────────────
   STEP INDICATOR
   Defined outside main component — stable reference
───────────────────────────────────────────── */
function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 px-2">
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-300 ${
                  done   ? "border-[#5a46c2] bg-[#5a46c2] text-white" :
                  active ? "border-[#5a46c2] bg-white text-[#5a46c2] shadow-md shadow-violet-200" :
                           "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {done ? <FiCheck size={15} strokeWidth={3} /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold whitespace-nowrap hidden sm:block ${
                active ? "text-[#5a46c2]" : done ? "text-slate-500" : "text-slate-300"
              }`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mt-[-14px] sm:mt-[-20px] transition-all duration-500 ${
                done ? "bg-[#5a46c2]" : "bg-slate-200"
              }`} style={{ minWidth: 20 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DYNAMIC FIELD RENDERER
   Defined outside main component — stable reference,
   no remounting on parent state change
───────────────────────────────────────────── */
function DynamicField({ field, value, onChange }) {
  if (field.type === "select") return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">{field.label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(field.key, e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 focus:bg-white transition-colors appearance-none cursor-pointer"
      >
        <option value="">Select {field.label}...</option>
        {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  if (field.type === "counter") return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">{field.label}</label>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(field.key, Math.max(1, (value || 1) - 1))}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:border-violet-300 hover:text-[#5a46c2] transition-colors"
        >
          <FiMinus size={14} />
        </button>
        <span className="w-16 text-center text-lg font-black text-slate-900">{value || 1}</span>
        <button
          onClick={() => onChange(field.key, (value || 1) + 1)}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:border-violet-300 hover:text-[#5a46c2] transition-colors"
        >
          <FiPlus size={14} />
        </button>
      </div>
    </div>
  );

  if (field.type === "color") return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">{field.label}</label>
      <div className="flex flex-wrap gap-2">
        {COLOR_OPTIONS.map((c) => (
          <button
            key={c.value}
            title={c.label}
            onClick={() => onChange(field.key, c.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              value === c.value ? "ring-2 ring-[#5a46c2] ring-offset-2 scale-110" : "border-slate-200 hover:scale-105"
            } ${c.border ? "border-slate-300" : "border-transparent"}`}
            style={{ background: c.value === "custom" ? "conic-gradient(red,yellow,lime,cyan,blue,magenta,red)" : c.value }}
          />
        ))}
      </div>
    </div>
  );

  if (field.type === "textarea") return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">{field.label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(field.key, e.target.value)}
        rows={4}
        placeholder="Describe your requirements..."
        className="w-full resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors"
      />
    </div>
  );

  return null;
}

/* ─────────────────────────────────────────────
   STEP CONTENT COMPONENTS
   All defined OUTSIDE the main component so
   React never recreates them on state changes.
   Props are passed in explicitly.
───────────────────────────────────────────── */

function StepSelectService({ service, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-black text-slate-900 mb-1">Select a Service</h2>
      <p className="text-sm text-slate-400 mb-5">Choose the service that best fits your project needs</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          const isSelected = service === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? "border-[#5a46c2] bg-violet-50 shadow-md shadow-violet-100"
                  : "border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg} ${s.border} border`}>
                <Icon size={20} className={s.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-black leading-none mb-1 ${isSelected ? "text-[#5a46c2]" : "text-slate-900"}`}>
                  {s.label}
                </p>
                <p className="text-xs text-slate-400 leading-snug">{s.desc}</p>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-[#5a46c2] flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheck size={11} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepUploadFiles({ files, dragging, onDragOver, onDragLeave, onDrop, onBrowseClick, onFileChange, onRemoveFile }) {
  return (
    <div>
      <h2 className="text-lg font-black text-slate-900 mb-1">Upload Your Files</h2>
      <p className="text-sm text-slate-400 mb-5">STL, STEP, OBJ, DXF, AI, PDF — max 50MB each (up to 5 files)</p>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer mb-4 ${
          dragging
            ? "border-[#5a46c2] bg-violet-50"
            : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/40"
        }`}
        onClick={onBrowseClick}
      >
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={onFileChange}
          accept=".stl,.step,.stp,.obj,.dxf,.ai,.pdf,.igs,.iges"
        />
        <div className="w-14 h-14 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center mx-auto mb-3">
          <FiUpload size={22} className="text-[#5a46c2]" />
        </div>
        <p className="text-sm font-bold text-slate-700 mb-1">
          {dragging ? "Drop files here!" : "Drag & drop files here"}
        </p>
        <p className="text-xs text-slate-400 mb-3">or click to browse</p>
        <span className="inline-block px-5 py-2 rounded-full text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
          Browse Files
        </span>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-violet-100 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center text-[#5a46c2] shrink-0 text-[10px] font-black uppercase">
                {file.name.split(".").pop()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                onClick={() => onRemoveFile(i)}
                className="w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors shrink-0"
              >
                <FiX size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && (
        <p className="text-center text-xs text-slate-400 mt-3">
          No files required — you can skip this step and describe your project in notes.
        </p>
      )}
    </div>
  );
}

function StepProjectDetails({ selectedService, details, onDetailChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        {selectedService && (
          <>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedService.bg} ${selectedService.border} border`}>
              <selectedService.icon size={20} className={selectedService.color} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-none">{selectedService.label}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Fill in the project details below</p>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedService?.fields.map((field) => (
          <div key={field.key} className={field.type === "textarea" || field.type === "color" ? "sm:col-span-2" : ""}>
            <DynamicField field={field} value={details[field.key]} onChange={onDetailChange} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepReviewSubmit({ selectedService, files, details, contact, onContactChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* order summary */}
      <div>
        <h2 className="text-base font-black text-slate-900 mb-4">Order Summary</h2>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            {selectedService && (
              <>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedService.bg} ${selectedService.border} border`}>
                  <selectedService.icon size={17} className={selectedService.color} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{selectedService.label}</p>
                  <p className="text-xs text-slate-400">{files.length} file{files.length !== 1 ? "s" : ""} uploaded</p>
                </div>
              </>
            )}
          </div>

          {selectedService?.fields.filter((f) => f.type !== "textarea").map((f) => (
            <div key={f.key} className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-400 uppercase tracking-widest text-[10px]">{f.label}</span>
              {f.type === "color" && details[f.key] ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-200"
                    style={{ background: details[f.key] }} />
                  <span className="font-bold text-slate-700 capitalize">{
                    COLOR_OPTIONS.find((c) => c.value === details[f.key])?.label || details[f.key]
                  }</span>
                </div>
              ) : (
                <span className="font-bold text-slate-700">{details[f.key] || "—"}</span>
              )}
            </div>
          ))}

          {details.notes && (
            <div className="pt-2 border-t border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Notes</p>
              <p className="text-xs text-slate-600 leading-relaxed">{details.notes}</p>
            </div>
          )}
        </div>

        <div className="mt-3 bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3">
          <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-1">Pricing</p>
          <p className="text-xs text-violet-700 font-semibold leading-relaxed">
            Final pricing will be calculated after reviewing your files and requirements. You'll receive a detailed quote within <strong>24 hours</strong>.
          </p>
        </div>
      </div>

      {/* contact info */}
      <div>
        <h2 className="text-base font-black text-slate-900 mb-4">Your Contact Info</h2>
        <div className="space-y-3">
          {[
            { key: "name",  label: "Full Name",  icon: FiUser,  type: "text",  placeholder: "e.g. Kasun Perera", required: true  },
            { key: "email", label: "Email",       icon: FiMail,  type: "email", placeholder: "you@example.com",   required: true  },
            { key: "phone", label: "Phone",       icon: FiPhone, type: "tel",   placeholder: "+94 77 000 0000",   required: false },
          ].map(({ key, label, icon: Icon, type, placeholder, required }) => (
            <div key={key}>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                <Icon size={9} className="text-violet-400" /> {label} {required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={type}
                value={contact[key]}
                onChange={(e) => onContactChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 leading-relaxed">
          By submitting you agree to our{" "}
          <a href="#" className="text-[#5a46c2] font-semibold hover:underline">privacy policy</a>.
          We'll never share your info.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function RequestQuote() {
  const [step, setStep]           = useState(0);
  const [service, setService]     = useState(null);
  const [files, setFiles]         = useState([]);
  const [dragging, setDragging]   = useState(false);
  const [details, setDetails]     = useState({});
  const [contact, setContact]     = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const selectedService = SERVICES.find((s) => s.id === service);

  /* file handlers */
  const addFiles = useCallback((newFiles) => {
    const arr = Array.from(newFiles).filter((f) => f.size <= 50 * 1024 * 1024);
    setFiles((prev) => [...prev, ...arr].slice(0, 5));
  }, []);

  const removeFile = useCallback((i) => {
    setFiles((f) => f.filter((_, idx) => idx !== i));
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleBrowseClick = useCallback(() => {
    document.getElementById("file-input").click();
  }, []);

  const handleFileChange = useCallback((e) => {
    addFiles(e.target.files);
  }, [addFiles]);

  const setDetail = useCallback((key, val) => {
    setDetails((d) => ({ ...d, [key]: val }));
  }, []);

  const handleContactChange = useCallback((key, val) => {
    setContact((c) => ({ ...c, [key]: val }));
  }, []);

  const canNext = () => {
    if (step === 0) return !!service;
    if (step === 2) {
      const required = selectedService.fields.filter((f) => f.type !== "textarea");
      return required.every((f) => details[f.key] !== undefined && details[f.key] !== "");
    }
    if (step === 3) return contact.name && contact.email;
    return true;
  };

  const handleSubmit = () => setSubmitted(true);

  const handleNewRequest = useCallback(() => {
    setStep(0);
    setService(null);
    setFiles([]);
    setDetails({});
    setContact({ name: "", email: "", phone: "" });
    setSubmitted(false);
  }, []);

  /* ── SUCCESS ── */
  if (submitted) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl border border-violet-100 p-10 text-center max-w-md w-full"
        style={{ boxShadow: "0 8px 40px rgba(90,70,194,.12)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
          <FiCheck size={28} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Quote Requested!</h2>
        <p className="text-sm text-slate-400 leading-relaxed mb-2">
          Thanks <strong className="text-slate-700">{contact.name}</strong>! We've received your request for
        </p>
        <span className="inline-block text-xs font-black text-[#5a46c2] bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full mb-4">
          {selectedService?.label}
        </span>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          We'll review your details and send a quote to <strong className="text-slate-700">{contact.email}</strong> within <strong>24 hours</strong>.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/" className="px-5 py-2.5 rounded-full text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
            Go Home
          </a>
          <button
            onClick={handleNewRequest}
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}
          >
            New Request
          </button>
        </div>
      </div>
    </div>
  );

  /* ── MAIN LAYOUT ── */
  return (
    <div className="min-h-screen bg-slate-50 px-4">
      <style>{`
        @keyframes stepIn {
          from { opacity:0; transform:translateX(16px); }
          to   { opacity:1; transform:translateX(0);     }
        }
      `}</style>

      <Banner
        path="Quote"
        title={<>Build Something<br /><span className="text-[#5a46c2]">Extraordinary</span></>}
        description="Tell us about your project — we'll review your files and send a detailed quote within 24 hours."
        tagLine="Free Quote · No Commitment"
        imageUrl={null}
        buttonText="Get Started"
        buttonLink="#quote"
      />

      {/* card */}
      <div
        className="max-w-3xl mx-auto mt-20 bg-white rounded-3xl border border-violet-100 p-6 sm:p-8"
        style={{ boxShadow: "0 8px 40px rgba(90,70,194,.1)" }}
      >
        <StepBar current={step} />

        {/* step content — inline JSX, not component definitions */}
        <div style={{ animation: "stepIn .25s ease both" }} key={step}>
          {step === 0 && (
            <StepSelectService
              service={service}
              onSelect={setService}
            />
          )}
          {step === 1 && (
            <StepUploadFiles
              files={files}
              dragging={dragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onBrowseClick={handleBrowseClick}
              onFileChange={handleFileChange}
              onRemoveFile={removeFile}
            />
          )}
          {step === 2 && (
            <StepProjectDetails
              selectedService={selectedService}
              details={details}
              onDetailChange={setDetail}
            />
          )}
          {step === 3 && (
            <StepReviewSubmit
              selectedService={selectedService}
              files={files}
              details={details}
              contact={contact}
              onContactChange={handleContactChange}
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

          <span className="text-xs font-bold text-slate-300">
            Step {step + 1} of {STEPS.length}
          </span>

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)", boxShadow: "0 4px 14px rgba(90,70,194,.3)" }}
            >
              Next <FiChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)", boxShadow: "0 4px 14px rgba(90,70,194,.3)" }}
            >
              <FiSend size={14} /> Submit Request
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        Need help? <a href="/contact" className="text-[#5a46c2] font-semibold hover:underline">Contact us directly</a>
      </p>
    </div>
  );
}