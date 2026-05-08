import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { deleteOrder } from "../../api/ordersApi";
import toast from "react-hot-toast";

function DeleteOrderView({ order, onClose, onConfirm }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await deleteOrder(order.order_id);
      onConfirm && onConfirm(order.order_id);
      toast.success(res.data.message || "Order deleted successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-rose-50 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-rose-100 p-2 rounded-lg text-rose-500 shrink-0">
          <FiAlertTriangle size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-rose-800">Dangerous Action</p>
          <p className="text-sm text-rose-600 mt-1 leading-relaxed">
            You are about to permanently delete this order. This cannot be
            undone.
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-2.5 rounded-xl">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white rounded-xl text-sm font-bold transition-colors"
        >
          {loading ? "Deleting…" : "Delete Order"}
        </button>
      </div>
    </div>
  );
}

export default DeleteOrderView;
