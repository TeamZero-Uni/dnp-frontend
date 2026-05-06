import React from 'react'




function StepReviewSubmit({ selectedService, files, details, contact, onContactChange, touched, onBlur }) {
  const emailError = touched.email ? validateEmail(contact.email) : "";
  const phoneError = touched.phone ? validatePhone(contact.phone) : "";
  const accent     = selectedService?.gradientFrom || "#5a46c2";

  const inputBorder = (err, key) =>
    err ? "#f87171" : contact[key] && key !== "name" && !err && touched[key] ? "#34d399" : "#e2e8f0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* order summary */}
      <div>
        <h2 className="text-base font-black text-slate-900 mb-4">Order Summary</h2>
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{
            background: selectedService ? `linear-gradient(135deg,${selectedService.gradientFrom}08,${selectedService.gradientTo}14)` : "#f8fafc",
            border: selectedService ? `1px solid ${selectedService.gradientFrom}25` : "1px solid #f1f5f9",
          }}
        >
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            {selectedService && (
              <>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: `linear-gradient(135deg,${selectedService.gradientFrom},${selectedService.gradientTo})` }}
                >
                  <selectedService.icon size={17} />
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
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-200" style={{ background: details[f.key] }} />
                  <span className="font-bold text-slate-700 capitalize">
                    {COLOR_OPTIONS.find((c) => c.value === details[f.key])?.label || details[f.key]}
                  </span>
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

        <div
          className="mt-3 rounded-2xl px-4 py-3"
          style={{ background: "linear-gradient(135deg,#fdf4ff,#eff6ff)", border: "1px solid #e9d5ff" }}
        >
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "#7c3aed" }}>Pricing</p>
          <p className="text-xs leading-relaxed" style={{ color: "#6d28d9" }}>
            Final pricing will be calculated after reviewing your files and requirements. You'll receive a detailed quote within <strong>24 hours</strong>.
          </p>
        </div>
      </div>

      {/* contact */}
      <div>
        <h2 className="text-base font-black text-slate-900 mb-4">Your Contact Info</h2>
        <div className="space-y-3">

          {/* Name */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <FiUser size={9} style={{ color: accent }} /> Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={contact.name}
              onChange={(e) => onContactChange("name", e.target.value)}
              placeholder="e.g. Kasun Perera"
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all"
              style={{ border: `1.5px solid #e2e8f0` }}
              onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
              onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = ""; }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <FiMail size={9} style={{ color: accent }} /> Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={contact.email}
                onChange={(e) => onContactChange("email", e.target.value)}
                onBlur={() => onBlur("email")}
                placeholder="you@example.com"
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all"
                style={{ border: `1.5px solid ${inputBorder(emailError, "email")}` }}
                onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
              />
              {contact.email && !emailError && touched.email && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiCheck size={11} className="text-emerald-600" strokeWidth={3} />
                </span>
              )}
              {emailError && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                  <FiX size={11} className="text-red-500" strokeWidth={3} />
                </span>
              )}
            </div>
            {emailError && <p className="text-[11px] text-red-500 font-semibold mt-1.5">{emailError}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <FiPhone size={9} style={{ color: accent }} /> Phone
              <span className="text-slate-300 font-normal normal-case tracking-normal ml-1">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => onContactChange("phone", e.target.value)}
                onBlur={() => onBlur("phone")}
                placeholder="+94 77 000 0000"
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all"
                style={{ border: `1.5px solid ${inputBorder(phoneError, "phone")}` }}
                onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
              />
              {contact.phone && !phoneError && touched.phone && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiCheck size={11} className="text-emerald-600" strokeWidth={3} />
                </span>
              )}
              {phoneError && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                  <FiX size={11} className="text-red-500" strokeWidth={3} />
                </span>
              )}
            </div>
            {phoneError && <p className="text-[11px] text-red-500 font-semibold mt-1.5">{phoneError}</p>}
          </div>
           
           <div>{/*address field*/}
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <FiUser size={9} style={{ color: accent }} /> Address <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => onContactChange("address", e.target.value)}
              placeholder="NO:123 Main Street, Colombo"
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all"
              style={{ border: `1.5px solid #e2e8f0` }}
              onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
              onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = ""; }}
            />
          </div>

          <div>{/*porstal code*/}
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <FiUser size={9} style={{ color: accent }} /> Postal Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={contact.postalCode}
              onChange={(e) => onContactChange("postalCode", e.target.value)}
              placeholder="e.g. 10100"
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all"
              style={{ border: `1.5px solid #e2e8f0` }}
              onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
              onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = ""; }}
            />
          </div>


        </div>
        <p className="text-xs text-slate-400 mt-4 leading-relaxed">
          By submitting you agree to our{" "}
          <a href="#" className="font-semibold hover:underline" style={{ color: accent }}>privacy policy</a>.
          We'll never share your info.
        </p>
      </div>
    </div>
  );
}

export default StepReviewSubmit;