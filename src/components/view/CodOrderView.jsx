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
  Banknote,
  Truck,
  Save,
  Check,
  Loader2,
} from "lucide-react";
import {
  changeOrderStatus,
  updatePaymentStatus,
  updateTrackingNumber,
} from "../../api/ordersApi";
import toast from "react-hot-toast";

export default function CodOrderView({ order, onClose, onUpdated }) {
  if (!order) return null;

  const [status, setStatus] = useState(
    order.status?.toLowerCase() ?? "pending",
  );
  const [trackingInput, setTrackingInput] = useState(
    order.tracking_number ?? "",
  );
  const [savedTracking, setSavedTracking] = useState(
    order.tracking_number ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(
    order.payment_status?.toLowerCase() ?? "pending",
  );
  const [collecting, setCollecting] = useState(false);
  const [collected, setCollected] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await changeOrderStatus({
        id: order.order_id,
        status: status.toUpperCase(),
      });

      let updatedOrder = {
        ...order,
        status: status.toUpperCase(),
      };

      if (status === "shipped" && trackingInput) {
        await updateTrackingNumber({
          id: order.order_id,
          tracking_number: trackingInput,
        });

        updatedOrder.tracking_number = trackingInput;
        setSavedTracking(trackingInput);
      }

      onUpdated && onUpdated(updatedOrder);
      
      toast.success(res.message || "Order updated successfully.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update order.");
    } finally {
      setSaving(false);
    }
  };

  const handlePaymentStatusUpdate = async () => {
    setCollecting(true);
    try {
      await updatePaymentStatus({
        id: order.order_id,
        payment_status: "COMPLETED",
      });

      setPaymentStatus("completed");

      onUpdated &&
        onUpdated({
          ...order,
          payment_status: "COMPLETED",
        });

      toast.success("Payment collected.");
      setCollected(true);
      setTimeout(() => setCollected(false), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update payment status.");
    } finally {
      setCollecting(false);
    }
  };

  const statusOptions = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const currentStatus = status;

  const statusStyles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  const shipping = order.shippingAddress;
  const items = order.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex gap-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <Hash size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                Order ID
              </p>
              <p className="text-sm font-bold text-gray-800 font-mono">
                {order.order_id}
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

        <div className="flex flex-col gap-2 min-w-50">
          <div className="relative">
            <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-[9px] font-bold text-gray-400 uppercase z-10">
              Change Status
            </label>
            <div className="relative">
              <select
                value={currentStatus}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${statusStyles[currentStatus] ?? statusStyles.pending}`}
              >
                {statusOptions.map((s) => (
                  <option
                    key={s}
                    value={s}
                    className="bg-white text-gray-800 capitalize"
                  >
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"
              />
            </div>
          </div>

          {status === "shipped" && (
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Truck
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-purple-400"
                />
                <input
                  type="text"
                  placeholder="Tracking number…"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs font-semibold border border-purple-200 bg-purple-50 rounded-lg outline-none focus:ring-2 focus:ring-purple-300 placeholder:text-purple-300 text-purple-800"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              saved
                ? "bg-green-100 text-green-700 border border-green-200"
                : "btn-color text-white shadow-md shadow-indigo-200 hover:opacity-90"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {saving ? (
              <>
                <Loader2 size={13} className="animate-spin" /> Saving…
              </>
            ) : saved ? (
              <>
                <Check size={13} /> Saved!
              </>
            ) : (
              <>
                <Save size={13} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User size={14} /> Customer
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-2 text-sm">
              <p className="font-semibold text-gray-800">
                {shipping?.cus_name ?? "—"}
              </p>
              <p className="text-gray-500 flex items-center gap-1">
                <Phone size={12} /> {shipping?.cus_phone ?? "—"}
              </p>
              <p className="text-gray-400 text-xs">
                {order.user?.email ?? "—"}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin size={14} /> Shipping Address
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-100 text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-800">
                {shipping?.cus_name ?? "—"}
              </p>
              <p>{shipping?.cus_address ?? "—"}</p>
              <p>
                {shipping?.cus_city ?? "—"}, {shipping?.cus_state ?? "—"}{" "}
                {shipping?.cus_postal_code ?? "—"}
              </p>
              <p>{shipping?.cus_country ?? "—"}</p>
            </div>
          </section>

          {savedTracking && (
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Truck size={14} /> Tracking Number
              </h3>
              <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
                <p className="text-sm font-bold text-purple-700 font-mono">
                  {savedTracking}
                </p>
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Package size={14} /> Items ({items.length})
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-y-auto max-h-64 divide-y divide-gray-50">
                {items.length === 0 ? (
                  <p className="p-4 text-xs text-gray-400">No items found.</p>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {item.product?.p_name ?? "—"}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                          {item.product?.p_id ?? ""}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-indigo-600">
                        $
                        {parseFloat(
                          item.price ?? item.product?.p_price ?? 0,
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-between items-center px-4 py-3 bg-indigo-50 border-t border-indigo-100">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                  Order Total
                </p>
                <p className="text-sm font-bold text-indigo-700">
                  ${parseFloat(order.total_amount || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CreditCard size={14} /> Payment Detail
            </h3>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-indigo-700 font-bold uppercase">
                  {order.payment_method ?? "—"}
                </p>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all ${
                    paymentStatus === "completed"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  {paymentStatus.toUpperCase()}
                </span>
              </div>

              {paymentStatus !== "completed" ? (
                <button
                  onClick={handlePaymentStatusUpdate}
                  disabled={collecting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 btn-color rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {collecting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Processing…
                    </>
                  ) : (
                    <>
                      <Banknote size={15} /> Collect $
                      {parseFloat(order.total_amount || 0).toFixed(2)} Cash
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2.5 bg-green-50 border border-green-200 rounded-lg">
                  <Check size={15} className="text-green-600" />
                  <span className="text-xs font-bold text-green-700">
                    ${parseFloat(order.total_amount || 0).toFixed(2)} Collected
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
