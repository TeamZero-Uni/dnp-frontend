import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMinus, FiPlus } from "react-icons/fi";

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

function DynamicField({ field, value, onChange, accentColor }) { // STEP 3 — PROJECT DETAILS
  const accent = accentColor || "#5a46c2";

  if (field.type === "select") return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">{field.label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(field.key, e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-colors appearance-none cursor-pointer"
        onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
        onBlur={(e)  => { e.target.style.borderColor = ""; e.target.style.background = ""; }}
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
          className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 transition-all"
          onMouseEnter={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}
        >
          <FiMinus size={14} />
        </button>
        <span className="w-16 text-center text-lg font-black text-slate-900">{value || 0}</span>
        <button
          onClick={() => onChange(field.key, (value || 0) + 1)}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 transition-all"
          onMouseEnter={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}
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
              value === c.value ? "scale-110" : "border-slate-200 hover:scale-105"
            } ${c.border ? "border-slate-300" : "border-transparent"}`}
            style={{
              background: c.value === "custom" ? "conic-gradient(red,yellow,lime,cyan,blue,magenta,red)" : c.value,
              outline: value === c.value ? `3px solid ${accent}` : "none",
              outlineOffset: 2,
            }}
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
        className="w-full resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none transition-colors"
        onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
        onBlur={(e)  => { e.target.style.borderColor = ""; e.target.style.background = ""; }}
      />
    </div>
  );

  return null;
}

function StepProjectDetails({ selectedService, details, onDetailChange, contact }) {

  const waMessage = encodeURIComponent(
    "*New Quote Request* 🖨️\n\n" +
    "*Service:* " + (selectedService?.label || "—") + "\n" +
    "*Project Details:* " + (details?.notes || "—")
  );

  return (
    <div>
      {selectedService && (
        <div
          className="flex items-center gap-3 mb-6 p-4 rounded-2xl"
          style={{
            background: `linear-gradient(135deg,${selectedService.gradientFrom}12,${selectedService.gradientTo}20)`,
            border: `1px solid ${selectedService.gradientFrom}30`,
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
            style={{
              background: `linear-gradient(135deg,${selectedService.gradientFrom},${selectedService.gradientTo})`,
              boxShadow: `0 4px 14px ${selectedService.shadow}`,
            }}
          >
            <selectedService.icon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 leading-none">{selectedService.label}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Fill in the project details below</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedService?.fields.map((field) => (
          <div
            key={field.key}
            className={field.type === "textarea" || field.type === "color" ? "sm:col-span-2" : ""}
          >
            <DynamicField
              field={field}
              value={details[field.key]}
              onChange={onDetailChange}
              accentColor={selectedService?.gradientFrom}
            />
          </div>
        ))}
      </div>

      {["injection", "robotic"].includes(selectedService?.id) && (
        <div
          className="mt-6 rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg,#fdf4ff,#eff6ff)", border: "1px solid #e9d5ff" }}
        >
          <p className="text-sm font-black text-slate-900">Need a faster response?</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            For complex projects, reach out through WhatsApp or email for direct coordination.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">

            <a
              href={"https://wa.me/94788426674?text=" + waMessage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", boxShadow: "0 4px 12px rgba(22,163,74,0.3)" }}
            >
              <FaWhatsapp size={15} /> WhatsApp
            </a>

            <a
              href={"mailto:maleeshasandakalum@gmail.com?body="}
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
            >
              <FiMail size={15} /> Email
            </a>

          </div>
        </div>
      )}
    </div>
  );
}

export default StepProjectDetails;