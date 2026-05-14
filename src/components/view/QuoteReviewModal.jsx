import React, { useState } from 'react'
import {
  CheckCircle, Download, Layers, Truck, FileText, Hash, Coins
} from "lucide-react";
import { updateQuotetion } from '../../api/quoteApi';
import toast from "react-hot-toast";

const STATUS_CFG = {
  PENDING: { dot: "bg-amber-400", pill: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
  ACCEPTED: { dot: "bg-emerald-400", pill: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Approved" },
  IN_PROGRESS: { dot: "bg-blue-400", pill: "bg-blue-50 text-blue-700 border-blue-200", label: "In Progress" },
  SHIPPED: { dot: "bg-violet-400", pill: "bg-violet-50 text-violet-700 border-violet-200", label: "Shipped" },
  DELIVERED: { dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Delivered" },
  REJECTED: { dot: "bg-red-400", pill: "bg-red-50 text-red-700 border-red-200", label: "Rejected" },
};

const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-violet-400 focus:bg-white transition-colors";

function Section({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
          <Icon size={12} className="text-violet-600" />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      </div>
      {children}
    </div>
  );
}

function InfoCell({ label, value, className = "" }) {
  return (
    <div className={`bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 ${className}`}>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-xs font-bold text-slate-800 break-words">{value || "—"}</p>
    </div>
  );
}

const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function QuoteReviewModal({ quote, onClose, onSuccess }) {
  const [status] = useState(quote.status);
  const [amount, setAmount] = useState(quote.total_amount ?? "");
  const [notes, setNotes] = useState("");
  const [trackingNo, setTrackingNo] = useState("");
  const [loading, setLoading] = useState(false);

  const allFiles = quote.items?.flatMap((item) => item.files ?? []) ?? [];

  const handleDownload = (file) => {
    const href = file?.url ?? file?.path ?? file?.file_url;
    if (!href) return;
    const a = document.createElement("a");
    a.href = href;
    a.download = file.name ?? "download";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => allFiles.forEach(handleDownload);

  const handleDownloadSlip = () => {
    const slipUrl = quote.payment_slip_path;
    if (!slipUrl) return;
    const a = document.createElement("a");
    a.href = slipUrl;
    a.download = "payment_slip";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const buildPayload = (actionType) => {
    const basePayload = { q_id: quote.q_id };

    switch (actionType) {
      case "ACCEPTED":
        return {
          ...basePayload,
          status: "ACCEPTED",
          payment_status: "PENDING",
          total_amount: amount,
          internal_notes: notes,
        };

      case "IN_PROGRESS":
        return {
          ...basePayload,
          status: "IN_PROGRESS",
          payment_status: "PAID",
        };

      case "SHIPPED":
        return {
          ...basePayload,
          status: "SHIPPED",
          tracking_no: trackingNo,
        };

      case "REJECTED":
        return {
          ...basePayload,
          status: "REJECTED",
        };

      default:
        return basePayload;
    }
  };

  const handleSubmit = async (actionType) => {
    setLoading(true);
    try {
      const payload = buildPayload(actionType);
      const response = await updateQuotetion(payload);
      toast.success(response.message || "Quote updated successfully!");
      onClose();
      onSuccess();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryAction = () => {
    const actions = {
      PENDING: {
        label: "Accept",
        type: "ACCEPTED",
        className: "bg-emerald-500 hover:bg-emerald-600",
        disabled: false,
      },
      ACCEPTED: {
        label: "Collect & Start",
        type: "IN_PROGRESS",
        className: "bg-blue-500 hover:bg-blue-600",
        disabled: quote.payment_status !== "PENDING",
      },
      IN_PROGRESS: {
        label: "Mark as Shipped",
        type: "SHIPPED",
        className: "bg-violet-600 hover:bg-violet-700",
        disabled: false,
      },
    };

    return actions[status] || {
      label: "Save",
      type: status,
      className: "bg-slate-500 hover:bg-slate-600",
      disabled: false,
    };
  };

  const primary = getPrimaryAction();

  return (
    <>
      <div className="p-5 space-y-5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash size={13} className="text-slate-400" />
            <span className="text-[11px] font-black text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-lg">
              {quote.q_id}
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">{fmtDate(quote.order_date)}</span>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${STATUS_CFG[status]?.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CFG[status]?.dot}`} />
            {STATUS_CFG[status]?.label}
          </span>
        </div>

        <div className="border-t border-slate-100" />

        <Section icon={Truck} title="Shipping Details">
          <div className="grid grid-cols-3 gap-2">
            <InfoCell label="Full Name" value={quote.shipping?.cus_name} />
            <InfoCell label="Email" value={quote.shipping?.cus_email} />
            <InfoCell label="Phone" value={quote.shipping?.cus_phone} />
            <InfoCell
              label="Address"
              className="col-span-3"
              value={[
                quote.shipping?.cus_address,
                quote.shipping?.cus_city,
                quote.shipping?.cus_state,
                quote.shipping?.cus_postal_code,
                quote.shipping?.cus_country,
              ].filter(Boolean).join(", ")}
            />
          </div>
        </Section>

        <div className="border-t border-slate-100" />

        <Section icon={Layers} title={`Item Details (${quote.items?.length ?? 0})`}>
          <div className="space-y-2">
            {quote.items?.map((item, i) => (
              <div key={item.id ?? i} className="bg-white border border-violet-100 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-slate-800">{item.service_type}</p>
                  <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                    Qty {item.quantity}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    item.material && `Material: ${item.material}`,
                    item.quality && `Quality: ${item.quality}`,
                    item.infill && `Infill: ${item.infill}`,
                    item.type && `Type: ${item.type}`,
                    item.letter_height && `Height: ${item.letter_height}`,
                  ].filter(Boolean).map((chip) => (
                    <span key={chip} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="text-[14px] ml-2 text-slate-600 mt-2">{item.description}</div>
              </div>
            ))}
          </div>
        </Section>

        {allFiles.length > 0 && (
          <>
            <div className="border-t border-slate-100" />
            <Section icon={FileText} title={`Files (${allFiles.length})`}>
              <div className="space-y-1.5">
                {allFiles.map((f, i) => (
                  <div key={i} className="flex justify-between bg-white border border-violet-100 rounded-xl px-3.5 py-2.5">
                    <span className="text-[10px] font-black text-violet-600 uppercase">
                      {f.file_url?.split("/").pop() ?? "?"}
                    </span>
                    <button onClick={() => handleDownload(f)} className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a46c2] hover:text-[#4838a3]">
                      <Download size={11} /> Download
                    </button>
                  </div>
                ))}
              </div>
              {allFiles.length > 1 && (
                <button onClick={handleDownloadAll} className="mt-2 w-full text-[11px] font-bold text-[#5a46c2] border border-violet-200 rounded-xl py-2 hover:bg-violet-50 flex items-center justify-center gap-1.5">
                  <Download size={11} /> Download All
                </button>
              )}
            </Section>
          </>
        )}

        <div className="border-t border-slate-100" />

        <Section icon={CheckCircle} title="Admin Actions">

          {status === "PENDING" && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Quoted Amount (LKR)</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 8500"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add internal notes about this quote…"
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
          )}

          {status === "ACCEPTED" && quote.payment_status === "PENDING" && quote.payment_slip_path && (
            <div className="flex items-center justify-between bg-white border border-violet-100 rounded-xl px-3.5 py-2.5">
              <span className="text-[11px] font-bold text-slate-700">Payment slip uploaded</span>
              <button onClick={handleDownloadSlip} className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a46c2] hover:text-[#4838a3]">
                <Download size={11} /> Download Slip
              </button>
            </div>
          )}

          {status === "ACCEPTED" && quote.payment_status === "PENDING" && !quote.payment_slip_path && (
            <p className="text-[11px] text-slate-400 font-semibold">Waiting for customer to upload payment slip.</p>
          )}

          {status === "IN_PROGRESS" && (
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Tracking Number</label>
              <input
                value={trackingNo}
                onChange={(e) => setTrackingNo(e.target.value)}
                placeholder="e.g. SL123456789LK"
                className={inputCls}
              />
            </div>
          )}

          {status === "SHIPPED" && quote.payment_status === "PAID" && (
            <div>
            <div className="flex items-center gap-2 bg-white border border-violet-100 rounded-xl px-3.5 py-2.5">
              <span className="text-[11px] font-bold text-slate-700">Tracking Number:</span>
              <span className="text-[11px] font-semibold text-[#5a46c2]">{quote.tracking_no}</span>
            </div>
            <br />
            <div className="flex items-center gap-2 bg-white border border-violet-100 rounded-xl px-3.5 py-2.5">
              <span className="text-[11px] font-bold text-slate-700">Payment Status:</span>
              <span className="text-[11px] font-semibold text-[#5a46c2]">{quote.payment_status === "PAID" ? "Money Received" : "Pending"}</span>
            </div>
            </div>

          )}

        </Section>
      </div>

      <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>

          {status === "PENDING" && (
            <button
              onClick={() => handleSubmit("REJECTED")}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-sm font-bold border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
            >
              Reject
            </button>
          )}

          {status === "ACCEPTED" && quote.payment_slip_path && (
            <button
              onClick={handleDownloadSlip}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <Download size={13} /> Download Slip
            </button>
          )}
        </div>

        <button
          onClick={() => handleSubmit(primary.type)}
          disabled={loading || primary.disabled}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-50 ${primary.className}`}
        >
          <CheckCircle size={13} /> {loading ? "Processing..." : primary.label}
        </button>
      </div>
    </>
  );
}