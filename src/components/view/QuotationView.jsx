import { useState } from "react";
import {
  FiDownload, FiUser, FiMail, FiFileText,
  FiCalendar, FiMessageSquare, FiDollarSign,
  FiCheckCircle, FiXCircle
} from "react-icons/fi";

const STATUS_CONFIG = {
  pending:   { label: "Pending",   color: "bg-amber-100 text-amber-700",     dot: "bg-amber-500"   },
  confirmed: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  rejected:  { label: "Rejected",  color: "bg-rose-100 text-rose-600",       dot: "bg-rose-500"    },
};

const CATEGORY_COLORS = {
  Design:      "bg-violet-100 text-violet-700",
  Development: "bg-blue-100 text-blue-700",
  Marketing:   "bg-amber-100 text-amber-700",
};

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function Badge({ status }) {
  const item = STATUS_CONFIG[status];
  if (!item) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase ${item.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
        <div className="text-sm text-slate-800 font-medium">{children}</div>
      </div>
    </div>
  );
}

export default function QuotationView({ quote, onClose, onStatusChange }) {
  const [action, setAction]   = useState(null); // "confirm" | "reject"
  const [price, setPrice]     = useState(quote.price ? String(quote.price) : "");
  const [priceError, setPriceError] = useState("");

  const isPending   = quote.status === "pending";
  const ext         = quote.file_path?.split(".").pop()?.toUpperCase() || "FILE";

  const handleConfirm = () => {
    const parsed = parseFloat(price);
    if (!price || isNaN(parsed) || parsed <= 0) {
      setPriceError("Please enter a valid price.");
      return;
    }
    onStatusChange(quote.quote_id, "confirmed", parsed);
    onClose();
  };

  const handleReject = () => {
    onStatusChange(quote.quote_id, "rejected", null);
    onClose();
  };

  return (
    <div className="space-y-5">

      {/* Quote title + badges */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-base font-black text-slate-900">{quote.title}</h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">{quote.quote_id}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${CATEGORY_COLORS[quote.category] || "bg-slate-100 text-slate-600"}`}>
            {quote.category}
          </span>
          <Badge status={quote.status} />
        </div>
      </div>

      {/* Info rows */}
      <div className="bg-slate-50/60 rounded-2xl px-4 divide-y divide-slate-100">
        <InfoRow icon={FiUser}  label="Customer">
          {quote.customer_name}
        </InfoRow>
        <InfoRow icon={FiMail}  label="Email">
          <a href={`mailto:${quote.customer_email}`} className="text-indigo-600 hover:underline">
            {quote.customer_email}
          </a>
        </InfoRow>
        <InfoRow icon={FiCalendar} label="Submitted">
          {fmt(quote.submitted_date)}
        </InfoRow>
        <InfoRow icon={FiDollarSign} label="Quoted Price">
          {quote.price
            ? <span className="font-black text-slate-900">${quote.price.toLocaleString()}</span>
            : <span className="text-slate-400 font-medium">Not yet quoted</span>
          }
        </InfoRow>
        <InfoRow icon={FiMessageSquare} label="Description">
          <p className="text-slate-600 leading-relaxed">{quote.description}</p>
        </InfoRow>
      </div>

      {/* File download */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <FiFileText size={18} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Customer Brief</p>
            <p className="text-xs text-slate-400 font-mono">{quote.file_path?.split("/").pop()}</p>
          </div>
        </div>
        <a
          href={quote.file_path}
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors"
        >
          <FiDownload size={14} />
          Download {ext}
        </a>
      </div>

      {/* Action panel — only for pending */}
      {isPending && (
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Review Quotation</p>
          </div>

          {/* Confirm flow */}
          {action === "confirm" && (
            <div className="p-4 space-y-3">
              <p className="text-sm text-slate-600">Set a price to confirm this quotation.</p>
              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value); setPriceError(""); }}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  />
                </div>
                {priceError && <p className="text-xs text-rose-500 mt-1.5 font-medium">{priceError}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleConfirm}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors"
                >
                  <FiCheckCircle size={15} /> Confirm & Set Price
                </button>
                <button
                  onClick={() => setAction(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Reject flow */}
          {action === "reject" && (
            <div className="p-4 space-y-3">
              <p className="text-sm text-slate-600">Are you sure you want to reject this quotation? This cannot be undone.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors"
                >
                  <FiXCircle size={15} /> Yes, Reject
                </button>
                <button
                  onClick={() => setAction(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Default buttons */}
          {!action && (
            <div className="p-4 flex gap-3">
              <button
                onClick={() => setAction("confirm")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all active:scale-95"
              >
                <FiCheckCircle size={15} /> Confirm
              </button>
              <button
                onClick={() => setAction("reject")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-all active:scale-95"
              >
                <FiXCircle size={15} /> Reject
              </button>
            </div>
          )}
        </div>
      )}

      {/* Already actioned info */}
      {!isPending && (
        <div className={`flex items-center gap-3 p-4 rounded-2xl ${quote.status === "confirmed" ? "bg-emerald-50 border border-emerald-100" : "bg-rose-50 border border-rose-100"}`}>
          {quote.status === "confirmed"
            ? <FiCheckCircle size={18} className="text-emerald-600 shrink-0" />
            : <FiXCircle     size={18} className="text-rose-500 shrink-0" />
          }
          <p className={`text-sm font-semibold ${quote.status === "confirmed" ? "text-emerald-700" : "text-rose-600"}`}>
            {quote.status === "confirmed"
              ? `This quotation has been confirmed at $${quote.price?.toLocaleString()}.`
              : "This quotation has been rejected."
            }
          </p>
        </div>
      )}

      {/* Close */}
      <div className="flex justify-end pt-1">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}