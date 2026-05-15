import React from 'react'
import {
  FiCheck, FiChevronRight, FiChevronLeft, FiUpload,
  FiX, FiMinus, FiPlus, FiSend, FiUser, FiMail, FiPhone,
} from "react-icons/fi";

function StepSelectService({ service, onSelect, SERVICES }) { //   STEP 1 — SELECT SERVICE
  return (
    <div>
      <h2 className="text-lg font-black text-slate-900 mb-1">Select a Service</h2>
      <p className="text-sm text-slate-400 mb-5">Choose the service that best fits your project needs</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map((s) => {
          const Icon       = s.icon;
          const isSelected = service === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200"
              style={
                isSelected
                  ? {
                      borderColor: s.gradientFrom,
                      background: `linear-gradient(135deg,${s.gradientFrom}10,${s.gradientTo}18)`,
                      boxShadow: `0 8px 24px ${s.shadow}`,
                    }
                  : { borderColor: "#f1f5f9", background: "#fff" }
              }
              onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = s.gradientFrom + "66"; }}
              onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = "#f1f5f9"; }}
            >
              {/* icon bubble */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white"
                style={{ background: `linear-gradient(135deg,${s.gradientFrom},${s.gradientTo})`, boxShadow: `0 4px 12px ${s.shadow}` }}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-black leading-none mb-1" style={{ color: isSelected ? s.gradientFrom : "#0f172a" }}>
                  {s.label}
                </p>
                <p className="text-xs text-slate-400 leading-snug">{s.desc}</p>
              </div>

              {isSelected && (
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `linear-gradient(135deg,${s.gradientFrom},${s.gradientTo})` }}
                >
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

export default StepSelectService;