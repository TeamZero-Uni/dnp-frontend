import { useState } from "react";
import {
  FiCheck, FiXCircle, FiDollarSign, FiCreditCard, 
  FiUser, FiPhone, FiMapPin, FiAlertCircle 
} from "react-icons/fi";

export const STATUS_CONFIG = {
  pending:   { label: "PENDING",   color: "bg-amber-100 text-amber-700",   dot: "bg-amber-500" },
  confirmed: { label: "CONFIRMED", color: "bg-blue-100 text-blue-700",      dot: "bg-blue-500" },
  shipped:   { label: "SHIPPED",   color: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  delivered: { label: "DELIVERED", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  cancelled: { label: "CANCELLED", color: "bg-rose-100 text-rose-600",       dot: "bg-rose-500" },
  returned:  { label: "RETURNED",  color: "bg-slate-100 text-slate-600",    dot: "bg-slate-400" },
};

export const PAYMENT_CONFIG = {
  unpaid:   { label: "UNPAID",   color: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  paid:     { label: "PAID",     color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  refunded: { label: "REFUNDED", color: "bg-sky-100 text-sky-700",       dot: "bg-sky-400" },
  failed:   { label: "FAILED",   color: "bg-rose-100 text-rose-600",      dot: "bg-rose-500" },
};

export const StatusBadge = ({ type, status }) => {
  const conf = type === "order" ? STATUS_CONFIG[status] : PAYMENT_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${conf.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
      {conf.label}
    </span>
  );
};

function CODPanel({ order, onCODAction }) {
  const [collecting, setCollecting] = useState(false);
  const [note, setNote] = useState("");

  if (order.payment_status === "paid")
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <FiCheck className="text-emerald-600" />
        <div className="text-xs text-emerald-700">
          <p className="font-bold">Cash Collected</p>
          <p>
            Payment of{" "}
            <span className="font-bold">${order.total_amount.toFixed(2)}</span>{" "}
            received.
          </p>
        </div>
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex gap-3 text-xs text-orange-700">
        <FiDollarSign className="mt-0.5" />
        <p>
          Cash on Delivery —{" "}
          <span className="font-bold">
            Pending ${order.total_amount.toFixed(2)}
          </span>
        </p>
      </div>
      {collecting ? (
        <div className="border border-slate-200 rounded-xl p-4 space-y-3">
          <input
            placeholder="Note (e.g. Collected by rider)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setCollecting(false)}
              className="flex-1 border py-2 text-xs rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onCODAction(order.order_id, "paid", note);
                setCollecting(false);
              }}
              className="flex-1 bg-emerald-600 text-white py-2 text-xs font-bold rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            disabled={order.order_status !== "delivered"}
            onClick={() => setCollecting(true)}
            className="flex-1 bg-emerald-600 text-white rounded-xl py-2.5 text-xs font-bold disabled:bg-slate-100 disabled:text-slate-400"
          >
            {order.order_status === "delivered"
              ? "Mark Collected"
              : "Collectible on Delivery Only"}
          </button>
          <button
            onClick={() =>
              onCODAction(order.order_id, "failed", "Not collected")
            }
            className="flex-1 border border-rose-200 text-rose-600 py-2.5 text-xs font-bold rounded-xl"
          >
            Not Collected
          </button>
        </div>
      )}
    </div>
  );
}

export default function OrderView({ order, onClose, onStatusChange, onCODAction }) {
  const [status, setStatus] = useState(order.order_status);

  const Info = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-slate-500" />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm text-slate-700 font-semibold mt-0.5">
          {value || "—"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400">Order ID</p>
          <p className="font-bold font-mono">{order.order_id}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Total Amount</p>
          <p className="text-lg font-bold">${order.total_amount.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Payment & Shipping
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Info
            icon={FiCreditCard}
            label="Method"
            value={order.payment_method.toUpperCase()}
          />
          <div>
            <p className="text-xs text-slate-400 font-medium mb-1">Status</p>
            <StatusBadge type="payment" status={order.payment_status} />
          </div>
        </div>
        {order.payment_method === "cod" && (
          <CODPanel order={order} onCODAction={onCODAction} />
        )}
      </div>

      <div className="space-y-3">
        <Info icon={FiUser} label="Recipient" value={order.shipping_name} />
        <Info
          icon={FiMapPin}
          label="Address"
          value={`${order.shipping_address}, ${order.shipping_city}`}
        />
      </div>

      <div className="pt-4 border-t">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
          Update Order Status
        </p>
        <div className="flex gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none"
          >
            {Object.keys(STATUS_CONFIG).map((s) => (
              <option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              onStatusChange(order.order_id, status);
              onClose();
            }}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
