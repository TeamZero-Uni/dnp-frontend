import { FiTrash2, FiAlertTriangle } from "react-icons/fi";

export default function DeleteView({ product, onClose, onConfirm }) {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 rounded-2xl p-4 flex items-start gap-4">
        <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
          <FiAlertTriangle size={24} />
        </div>
        <div>
          <p className="text-sm font-bold text-rose-800">Dangerous Action</p>
          <p className="text-sm text-rose-700/80 mt-1 leading-relaxed">
            You are about to permanently delete <span className="font-bold underline">{product.name}</span>. This cannot be undone.
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-100 transition-all">
          Delete Product
        </button>
      </div>
    </div>
  );
}