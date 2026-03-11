import React from "react";
import {
  FiCreditCard, FiCheckCircle, FiXCircle, FiClock,
  FiTrendingUp, FiDollarSign, FiCalendar, FiHash,
  FiArrowUpRight, FiUser, FiTag
} from "react-icons/fi";
import { RiBankLine } from "react-icons/ri";

const STATUS_STYLES = {
  Completed: { dot: "bg-emerald-400", text: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200", icon: <FiCheckCircle size={14}/> },
  Pending:   { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50",    border: "border-amber-200",   icon: <FiClock       size={14}/> },
  Failed:    { dot: "bg-red-400",     text: "text-red-700",     bg: "bg-red-50",      border: "border-red-200",     icon: <FiXCircle     size={14}/> },
};

const METHOD_META = {
  "Credit Card":   { icon: <FiCreditCard size={16}/>, color: "text-violet-600", bg: "bg-violet-50",  border: "border-violet-200" },
  "Debit Card":    { icon: <FiCreditCard size={16}/>, color: "text-indigo-600", bg: "bg-indigo-50",  border: "border-indigo-200" },
  "PayPal":        { icon: <FiDollarSign size={16}/>, color: "text-sky-600",    bg: "bg-sky-50",     border: "border-sky-200"    },
  "Bank Transfer": { icon: <RiBankLine   size={16}/>, color: "text-emerald-600",bg: "bg-emerald-50", border: "border-emerald-200"},
};

const SAMPLE = {
  id:       "TXN-003",
  amount:   2800.00,
  date:     "2024-03-05",
  method:   "Bank Transfer",
  status:   "Completed",
  customer: "Sarah Williams",
  note:     "Enterprise package payment for Q1 subscription.",
};

export default function TransactionView({ transaction }) {
  const t   = transaction;
  const st  = STATUS_STYLES[t.status]  || STATUS_STYLES.Pending;
  const m   = METHOD_META[t.method]    || METHOD_META["Credit Card"];

  const formattedDate = new Date(t.date).toLocaleDateString("en-US", {
    weekday: "short", year: "numeric", month: "long", day: "numeric",
  });

  const rows = [
    { icon: <FiHash size={14}/>,      label: "Transaction ID", value: t.id,       mono: true },
    { icon: <FiCalendar size={14}/>,  label: "Date",           value: formattedDate },
    { icon: <FiUser size={14}/>,      label: "Customer",       value: t.customer || "—" },
    { icon: m.icon,                   label: "Payment Method", value: t.method,   chip: true, chipStyle: m },
    { icon: st.icon,                  label: "Status",         value: t.status,   status: true },
  ];

  return (
    <div className="font-sans space-y-5">
      <div className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background:"linear-gradient(135deg,#5a46c2,#4838a3)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background:"rgba(255,255,255,.08)", transform:"translate(30%,-30%)" }}/>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full pointer-events-none"
          style={{ background:"rgba(0,0,0,.1)", transform:"translate(-30%,30%)" }}/>

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Total Amount</p>
            <p className="syne text-4xl font-black text-white leading-none">
              ${t.amount.toLocaleString("en", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${st.bg} ${st.text} ${st.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/>
            {t.status}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden divide-y divide-slate-100">
        {rows.map(({ icon, label, value, mono, chip, chipStyle, status: isStatus }) => (
          <div key={label} className="flex items-center gap-3 px-5 py-3.5 hover:bg-violet-50/30 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-500 shrink-0">
              {icon}
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest w-32 shrink-0">{label}</p>
            <div className="flex-1 flex justify-end">
              {chip ? (
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${chipStyle.bg} ${chipStyle.color} ${chipStyle.border}`}>
                  {chipStyle.icon} {value}
                </span>
              ) : isStatus ? (
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${st.bg} ${st.text} ${st.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/> {value}
                </span>
              ) : (
                <span className={`text-sm font-bold text-slate-800 text-right ${mono ? "font-mono text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-lg text-xs" : ""}`}>
                  {value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {t.note && (
        <div className="bg-white rounded-2xl border border-violet-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiTag size={12} className="text-violet-400"/>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Note</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{t.note}</p>
        </div>
      )}

      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-slate-400 font-semibold">
          Processed via <span className="text-violet-600">{t.method}</span>
        </p>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
          <FiArrowUpRight size={12}/> Verified
        </div>
      </div>

    </div>
  );
}