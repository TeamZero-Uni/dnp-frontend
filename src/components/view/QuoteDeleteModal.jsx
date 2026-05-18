import { useState } from "react";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";
import { deleteQuote } from "../../api/quoteApi";
import toast from "react-hot-toast";

export default function QuoteDeleteModal({ quote, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteQuote(quote.q_id);
      toast.success("Quote deleted successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-rose-50 rounded-2xl p-4 flex items-start gap-4">
        <div className="bg-rose-100 p-2 rounded-lg text-rose-600 shrink-0">
          <FiAlertTriangle size={24} />
        </div>
        <div>
          <p className="text-sm font-bold text-rose-800">Dangerous Action</p>
          <p className="text-sm text-rose-700/80 mt-1 leading-relaxed">
            You are about to permanently delete quote{" "}
            <span className="font-bold underline">{quote.q_id}</span> and all
            attached files. This cannot be undone.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-rose-600">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader size={14} className="animate-spin" />
              Deleting…
            </>
          ) : (
            "Delete Quote"
          )}
        </button>
      </div>
    </div>
  );
}