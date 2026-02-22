import React from 'react'
import {
  FiAlertTriangle
} from "react-icons/fi";

function DeleteOrderView({ order, onClose, onConfirm }) {
  return (
    <div className="space-y-5">
      <div className="bg-rose-50 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-rose-100 p-2 rounded-lg text-rose-500 flex-shrink-0">
          <FiAlertTriangle size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-rose-800">Dangerous Action</p>
          <p className="text-sm text-rose-600 mt-1 leading-relaxed">
            You are about to permanently delete order{" "}
            <span className="font-bold">{order.order_id}</span>. This cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold transition-colors">Delete Order</button>
      </div>
    </div>
  );
}

export default DeleteOrderView