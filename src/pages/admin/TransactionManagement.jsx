import React, { useState } from "react";
import {
  FiPackage, FiEye, FiTrash2, FiSearch, FiFilter,
  FiCreditCard, FiCheckCircle, FiXCircle, FiClock,
  FiTrendingUp, FiDollarSign, FiCalendar, FiChevronDown
} from "react-icons/fi";
import Modal from "../../model/Modal";
import DeleteView from "../../components/view/DeleteView";
import TransactionView from "../../components/view/TransactionView";

const TRANSACTIONS = [
  { id: "TXN-001", amount: 1250.00, date: "2024-03-01", method: "Credit Card",  status: "Completed" },
  { id: "TXN-002", amount:  340.50, date: "2024-03-03", method: "PayPal",        status: "Pending"   },
  { id: "TXN-003", amount: 2800.00, date: "2024-03-05", method: "Bank Transfer", status: "Completed" },
  { id: "TXN-004", amount:  175.00, date: "2024-03-07", method: "Credit Card",   status: "Failed"    },
  { id: "TXN-005", amount:  920.75, date: "2024-03-09", method: "PayPal",        status: "Completed" },
  { id: "TXN-006", amount:  510.00, date: "2024-03-11", method: "Debit Card",    status: "Pending"   },
  { id: "TXN-007", amount: 3400.00, date: "2024-03-13", method: "Bank Transfer", status: "Completed" },
  { id: "TXN-008", amount:   89.99, date: "2024-03-15", method: "Credit Card",   status: "Failed"    },
];

const STATUS_STYLES = {
  Completed: { dot: "bg-emerald-400", text: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200" },
  Pending:   { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50",    border: "border-amber-200"   },
  Failed:    { dot: "bg-red-400",     text: "text-red-700",     bg: "bg-red-50",      border: "border-red-200"     },
};

const METHOD_ICONS = {
  "Credit Card":   <FiCreditCard size={13} />,
  "Debit Card":    <FiCreditCard size={13} />,
  "PayPal":        <FiDollarSign size={13} />,
  "Bank Transfer": <FiTrendingUp size={13} />,
};

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filtered = transactions.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
                        t.method.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total     = transactions.reduce((s, t) => s + t.amount, 0);
  const completed = transactions.filter(t => t.status === "Completed").length;
  const pending   = transactions.filter(t => t.status === "Pending").length;
  const failed    = transactions.filter(t => t.status === "Failed").length;

  const handleView = (id) => {
    const txn = transactions.find(t => t.id === id);
    setSelectedTransaction(txn);
    setModal("view");
  };

  const handleDelete = (id) => {
    const txn = transactions.find(t => t.id === id);
    setSelectedTransaction(txn);
    setModal("delete");
  };

   const renderModel = () => {

    if (modal === "view") {
      return (
        <Modal title={"Transaction Details"} onClose={closeModal}>
          <TransactionView transaction={selectedTransaction} />
        </Modal>
      );
    }

    if (modal === "delete") {
      return (
        <Modal title={"Confirm Deletion"} onClose={closeModal}>
          <DeleteView
            t={selectedTransaction}
            onClose={closeModal}
            onConfirm={() => {
              setTransactions(prev =>
                prev.filter(txn => txn.id !== selectedTransaction.id)
              );
              closeModal();
            }}
          />
        </Modal>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <header className="bg-white border-b border-violet-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl shadow-md shadow-violet-200 flex items-center justify-center btn-color">
              <FiPackage className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none text-[#1e1b4b]">Transaction Hub</h1>
              <p className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider hidden sm:block">
                Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full hidden sm:inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              {transactions.length} Records
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue",   value: `$${total.toLocaleString("en",{minimumFractionDigits:2})}`, icon: <FiDollarSign size={18}/>,  color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100" },
            { label: "Completed",       value: completed,   icon: <FiCheckCircle size={18}/>, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "Pending",         value: pending,     icon: <FiClock size={18}/>,       color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100"   },
            { label: "Failed",          value: failed,      icon: <FiXCircle size={18}/>,     color: "text-red-500",     bg: "bg-red-50",     border: "border-red-100"     },
          ].map(s => (
            <div key={s.label} className={`bg-white rounded-2xl border ${s.border} p-4 flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider leading-none mb-1">{s.label}</p>
                <p className={`text-xl font-black ${s.color} leading-none`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 p-4 flex flex-wrap gap-3 items-center">

          <div className="flex items-center gap-2 flex-1 min-w-48 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
            <FiSearch size={14} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by ID or method..."
              className="bg-transparent outline-none w-full text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <FiFilter size={13} className="text-slate-400" />
            {["All","Completed","Pending","Failed"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === s
                    ? "text-white shadow-sm shadow-violet-200"
                    : "bg-slate-50 text-slate-500 border border-slate-200 hover:border-violet-300 hover:text-violet-600"
                }`}
                style={statusFilter === s ? { background:"linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden hidden md:block">

          <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-2">ID</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm font-semibold">No transactions found.</div>
            ) : filtered.map((t, i) => {
              const st = STATUS_STYLES[t.status];
              return (
                <div key={t.id}
                  className="grid grid-cols-12 items-center px-6 py-4 hover:bg-violet-50/40 transition-colors group">

                  <div className="col-span-2">
                    <span className="text-xs font-black text-[#4838a3] bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-lg">
                      {t.id}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="text-sm font-black text-slate-800">
                      ${t.amount.toLocaleString("en", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="col-span-3 flex items-center gap-2 text-sm text-slate-500">
                    <FiCalendar size={13} className="text-violet-400 shrink-0" />
                    {new Date(t.date).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" })}
                  </div>

                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <span className="text-violet-500">{METHOD_ICONS[t.method]}</span>
                      {t.method}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${st.bg} ${st.text} ${st.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {t.status}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-end gap-1.5">
                    <button onClick={() => handleView(t.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-violet-500 bg-violet-50 hover:bg-violet-100 border border-violet-200 transition-colors">
                      <FiEye size={14} />
                    </button>
                    <button onClick={() => handleDelete(t.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 bg-slate-50 hover:bg-red-50 hover:text-red-500 border border-slate-200 hover:border-red-200 transition-colors">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm font-semibold bg-white rounded-2xl border border-violet-100">
              No transactions found.
            </div>
          ) : filtered.map(t => {
            const st = STATUS_STYLES[t.status];
            return (
              <div key={t.id} className="bg-white rounded-2xl border border-violet-100 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#4838a3] bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-lg">{t.id}</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${st.bg} ${st.text} ${st.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                    {t.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-slate-800">${t.amount.toLocaleString("en",{minimumFractionDigits:2})}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <span className="text-violet-500">{METHOD_ICONS[t.method]}</span>{t.method}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FiCalendar size={12} className="text-violet-400"/>
                    {new Date(t.date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => handleView(t.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-colors">
                      <FiEye size={12}/> View
                    </button>
                    <button onClick={() => handleDelete(t.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                      <FiTrash2 size={12}/> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length > 0 && (
          <p className="text-xs text-slate-400 font-semibold text-center pb-2">
            Showing {filtered.length} of {transactions.length} transactions
          </p>
        )}

      </div>
      {renderModel()}
    </div>
  );
}