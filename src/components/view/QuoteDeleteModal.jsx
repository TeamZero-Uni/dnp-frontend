import React from 'react'
import {
  Grid3X3, Search, Download, Eye, Trash2, X,
  FileText, Package, User, Mail, Phone, Calendar,
  AlertTriangle, Archive, Clock, CheckCircle,
  XCircle, Send, ChevronDown, Plus,
} from "lucide-react";

function QuoteDeleteModal(quote, onClose) {
    return (
      
        <div className="p-5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={22} className="text-red-500" />
          </div>
          <p className="text-sm font-black text-slate-900 mb-1">Delete {quote.id}?</p>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            This will permanently remove the quote for{" "}
            <strong className="text-slate-700">{quote.customer}</strong> and all attached files.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button onClick={() => onConfirm(quote.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors active:scale-95">
              Delete Quote
            </button>
          </div>
        </div>
 
    );
}

export default QuoteDeleteModal