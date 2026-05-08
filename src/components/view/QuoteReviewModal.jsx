import React, { useState } from 'react'
import {
  Grid3X3, Search, Download, Eye, Trash2, X,
  FileText, Package, User, Mail, Phone, Calendar,
  AlertTriangle, Archive, Clock, CheckCircle,
  XCircle, Send, ChevronDown, Plus,
} from "lucide-react";


const STATUS_CFG = {
  Pending:   { dot: "bg-amber-400",   pill: "bg-amber-50 text-amber-700 border-amber-200"         },
  Reviewing: { dot: "bg-blue-400",    pill: "bg-blue-50 text-blue-700 border-blue-200"            },
  Approved:  { dot: "bg-emerald-400", pill: "bg-emerald-50 text-emerald-700 border-emerald-200"   },
  Rejected:  { dot: "bg-red-400",     pill: "bg-red-50 text-red-700 border-red-200"               },
  Sent:      { dot: "bg-violet-400",  pill: "bg-violet-50 text-violet-700 border-violet-200"      },
};


const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const STATUSES = Object.keys(STATUS_CFG);
const FILTERS  = ["All", ...STATUSES];


export default function QuoteReviewModal(quote, onClose) {
    const [status, setStatus]   = useState(quote.status);
    const [amount, setAmount]   = useState(quote.amount || "");
    const [notes,  setNotes]    = useState(quote.notes  || "");
    const [open,   setOpen]     = useState(false);
  
    const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors";
  
    return (
        <>
        <div className="p-5 space-y-5 overflow-y-auto" style={{ maxHeight: "72vh" }}>
  
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-black text-slate-900 leading-none">{quote.customer}</p>
              <p className="text-xs text-slate-400 mt-1">{quote.service}</p>
            </div>
            <div status={status} />
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { icon: Mail,     label: "Email",   val: quote.email           },
              { icon: Phone,    label: "Phone",   val: quote.phone || "—"    },
              { icon: Calendar, label: "Received",val: fmtDate(quote.date)   },
              { icon: Package,  label: "Service", val: quote.service         },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Icon size={10} className="text-violet-400" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                </div>
                <p className="text-xs font-bold text-slate-800 truncate">{val}</p>
              </div>
            ))}
          </div>
  
          {/* description — read only */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Customer Request</p>
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-600 leading-relaxed">
              {quote.description}
            </div>
          </div>
  
          {/* files */}
          {quote.files?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Uploaded Files ({quote.files.length})
                </p>
                <button onClick={() => downloadAllAsZip(quote)}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a46c2] hover:text-[#4838a3] transition-colors">
                  <Archive size={11} /> Download All (.zip)
                </button>
              </div>
              <div className="space-y-1.5">
                {quote.files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-violet-100 rounded-xl px-3.5 py-2.5 group hover:bg-violet-50/40 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600 text-[9px] font-black uppercase shrink-0">
                      {f.name.split(".").pop()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{f.name}</p>
                      <p className="text-[10px] text-slate-400">{f.size}</p>
                    </div>
                    <button onClick={() => downloadFile(f)}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-[11px] font-bold text-[#5a46c2] transition-all">
                      <Download size={11} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
  
          {/* divider */}
          <div className="border-t border-slate-100" />
  
          {/* admin actions */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Actions</p>
  
            {/* status changer */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Change Status</label>
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-700 hover:border-violet-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${STATUS_CFG[status]?.dot}`} />
                    {status}
                  </div>
                  <ChevronDown size={13} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-violet-100 rounded-xl overflow-hidden z-10"
                    style={{ boxShadow: "0 8px 24px rgba(90,70,194,.12)" }}>
                    {STATUSES.map((s) => (
                      <button key={s} onClick={() => { setStatus(s); setOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold hover:bg-violet-50 transition-colors text-left ${status === s ? "bg-violet-50 text-[#5a46c2]" : "text-slate-700"}`}>
                        <span className={`w-2 h-2 rounded-full ${STATUS_CFG[s].dot}`} />
                        {s}
                        {status === s && <CheckCircle size={12} className="ml-auto text-[#5a46c2]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
  
            {/* quoted amount */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Quoted Amount</label>
              <input value={amount} onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. LKR 8,500" className={inputCls} />
            </div>
  
            {/* admin notes */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Internal Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                rows={3} placeholder="Add internal notes about this quote…"
                className={`${inputCls} resize-none`} />
            </div>
          </div>
        </div>
  
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onUpdate(quote.id, { status, amount, notes })}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}>
            <CheckCircle size={13} /> Save Changes
          </button>
        </div>
        </>
    );
}
