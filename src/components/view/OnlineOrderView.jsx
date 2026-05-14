import React, { useState } from "react";
import {
  Package,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  User,
  Hash,
  ChevronDown,
  Truck,
} from "lucide-react";
import {
  changeOrderStatus,
  updatePaymentStatus,
  updateTrackingNumber,
} from "../../api/ordersApi";
import toast from "react-hot-toast";

export default function OnlineOrderView({ order, onUpdated }) {
  const [status, setStatus] = useState(order?.status ?? "PENDING");
  const [trackingInput, setTrackingInput] = useState(
    order?.tracking_number ?? "",
  );
  const [savedTracking, setSavedTracking] = useState(
    order?.tracking_number ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!order) return null;

  const shipping = order.shippingAddress ?? {};
  const items = order.items ?? [];

  const statusOptions = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const statusStyles = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
  };

  const paymentStatusStyles = {
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    FAILED: "bg-red-100 text-red-700 border-red-200",
    REFUNDED: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await changeOrderStatus({
        id: order.order_id,
        status: status,
      });

      let updatedOrder = { ...order, status };

      if (status === "SHIPPED" && trackingInput) {
        await updateTrackingNumber({
          id: order.order_id,
          tracking_number: trackingInput,
        });

        updatedOrder.tracking_number = trackingInput;
        setSavedTracking(trackingInput);
      }

      onUpdated && onUpdated(updatedOrder);

      toast.success(res.message || "Order updated successfully!");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <Hash size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                Order ID
              </p>
              <p className="text-sm font-bold text-gray-800 font-mono">
                {order.order_id.slice(0, 13)}…
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                Date
              </p>
              <p className="text-sm font-bold text-gray-800">
                {new Date(order.order_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-[9px] font-bold text-gray-400 uppercase z-10">
              Change Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setSaved(false);
                }}
                className={`appearance-none pl-3 pr-8 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${statusStyles[status]}`}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s} className="bg-white text-gray-800">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
          >
            {saving ? "Saving…" : saved ? "✓ Saved!" : "Save"}
          </button>
        </div>

        {status === "SHIPPED" && (
          <div className="flex flex-wrap items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2.5">
            <Truck size={14} className="text-purple-600 shrink-0" />
            <span className="text-xs font-bold text-purple-700 whitespace-nowrap">
              Tracking No.
            </span>
            <input
              type="text"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="Enter tracking number…"
              className="flex-1 min-w-[160px] border border-purple-200 rounded-md px-3 py-1.5 text-xs font-mono text-purple-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30"
            />
            {savedTracking && (
              <span className="text-[10px] text-purple-400 italic whitespace-nowrap">
                Saved: {savedTracking}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-5">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User size={14} /> Customer Details
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-2">
              <p className="text-sm font-semibold text-gray-800">
                {shipping.cus_name ?? order.user?.email}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Phone size={12} /> {shipping.cus_phone}
              </p>
              <p className="text-xs text-gray-400">{order.user?.email}</p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin size={14} /> Shipping Address
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-100 text-sm text-gray-600 leading-relaxed">
              <p className="font-medium text-gray-800">{shipping.cus_name}</p>
              <p>{shipping.cus_address}</p>
              <p>
                {shipping.cus_city}
                {shipping.cus_state ? `, ${shipping.cus_state}` : ""}
              </p>
              {shipping.cus_zip && <p>{shipping.cus_zip}</p>}
              <p className="font-medium text-gray-400 mt-1">
                {shipping.cus_country}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CreditCard size={14} /> Payment Information
            </h3>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center flex-wrap gap-2">
              <div>
                <p className="text-xs text-indigo-700 font-semibold uppercase">
                  {order.payment_method}
                </p>
                {savedTracking && status === "SHIPPED" && (
                  <p className="text-[10px] text-indigo-400 mt-0.5">
                    Tracking: {savedTracking}
                  </p>
                )}
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  paymentStatusStyles[order.payment_status] ??
                  "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {order.payment_status}
              </span>
            </div>
          </section>
        </div>

        <div>
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Package size={14} /> Order Items
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden">
              <div className="overflow-y-auto max-h-64">
                {items.length === 0 ? (
                  <p className="p-4 text-xs text-gray-400">No items found.</p>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {item.product?.p_name ?? "Product"}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-indigo-600">
                        Rs{" "}
                        {(
                          parseFloat(item.price ?? 0) *
                          (item.quantity ?? 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-between items-center px-4 py-3 bg-indigo-50/60 border-t border-indigo-100 shrink-0">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Total
                </p>
                <p className="text-base font-bold text-indigo-700">
                  Rs {parseFloat(order.total_amount).toFixed(2)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
