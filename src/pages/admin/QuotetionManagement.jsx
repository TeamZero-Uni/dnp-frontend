import React, { useState } from "react";
import {
  Grid3X3, Search, Download, Eye, Trash2, X,
  FileText, Package, User, Mail, Phone, Calendar,
  AlertTriangle, Archive, Clock, CheckCircle,
  XCircle, Send, ChevronDown, Plus
} from "lucide-react";
import Modal from "../../model/Modal";
import QuoteDeleteModal from "../../components/view/QuoteDeleteModal";
import QuoteReviewModal from "../../components/view/QuoteReviewModal";
import QuoteAddView from "../../components/view/QuoteAddView";

const STATUS_CFG = {
  Pending:   { dot: "bg-amber-400",   pill: "bg-amber-50 text-amber-700 border-amber-200"         },
  Reviewing: { dot: "bg-blue-400",    pill: "bg-blue-50 text-blue-700 border-blue-200"            },
  Approved:  { dot: "bg-emerald-400", pill: "bg-emerald-50 text-emerald-700 border-emerald-200"   },
  Rejected:  { dot: "bg-red-400",     pill: "bg-red-50 text-red-700 border-red-200"               },
  Sent:      { dot: "bg-violet-400",  pill: "bg-violet-50 text-violet-700 border-violet-200"      },
};

const STATUSES = Object.keys(STATUS_CFG);
const FILTERS  = ["All", ...STATUSES];

const SEED = [
  {
    id: "QT-001", customer: "Kasun Perera", email: "kasun@email.com", phone: "+94 71 234 5678",
    service: "FDM 3D Printing",
    description: "Drone chassis prototype — PETG, 7 iteration prints needed.",
    amount: "", status: "Pending", date: "2025-04-10",
    files: [{ name: "drone_body_v3.stl", size: "2.4 MB" }, { name: "specs.pdf", size: "340 KB" }],
    notes: "",
  },
  {
    id: "QT-002", customer: "Amara Jewels", email: "info@amarajewels.lk", phone: "+94 77 891 0123",
    service: "Resin 3D Printing",
    description: "32 ring & pendant prototypes for lost-wax casting.",
    amount: "", status: "Reviewing", date: "2025-04-12",
    files: [{ name: "jewelry_collection.zip", size: "14.8 MB" }],
    notes: "",
  },
  {
    id: "QT-003", customer: "The Roast Room", email: "orders@roastroom.lk", phone: "+94 76 321 6547",
    service: "Laser Cutting & Engraving",
    description: "18-piece acrylic signage pack for new café branch.",
    amount: "LKR 15,750", status: "Sent", date: "2025-04-08",
    files: [{ name: "signage_designs.ai", size: "5.1 MB" }, { name: "layout.pdf", size: "1.2 MB" }],
    notes: "Quote sent via email April 9.",
  },
  {
    id: "QT-004", customer: "TechParts Lanka", email: "tech@techparts.lk", phone: "+94 71 444 5555",
    service: "Injection Molding",
    description: "ABS enclosure 2,000 units — IoT sensor housing.",
    amount: "", status: "Pending", date: "2025-04-14",
    files: [{ name: "enclosure_v2.step", size: "8.7 MB" }, { name: "requirements.docx", size: "220 KB" }],
    notes: "",
  },
  {
    id: "QT-005", customer: "Priya Weddings", email: "priya@weddings.lk", phone: "+94 77 765 4321",
    service: "Light Letters / LED Signs",
    description: "6× LED letters 60cm warm-white for beach wedding.",
    amount: "LKR 32,000", status: "Rejected", date: "2025-04-06",
    files: [],
    notes: "Client cancelled — budget constraint.",
  },
];

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function StatusPill({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${cfg.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} /> {status}
    </span>
  );
}

export default function QuotationManagement() {
  const [quotes,   setQuotes]   = useState(SEED);
  const [modal,    setModal]    = useState(null);
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("All");

  const filtered = quotes.filter((q) => {
    const catOk    = filter === "All" || q.status === filter;
    const searchOk = !search || [q.id, q.customer, q.service]
      .some((v) => v.toLowerCase().includes(search.toLowerCase()));
    return catOk && searchOk;
  });

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "All" ? quotes.length : quotes.filter((q) => q.status === f).length;
    return acc;
  }, {});

  const openReview = (q) => { setSelected(q); setModal("review"); };
  const openDelete = (q) => { setSelected(q); setModal("delete"); };
  const closeModal = ()  => { setModal(null); setSelected(null);  };

  const handleUpdate = (id, changes) => {
    setQuotes((prev) => prev.map((q) => q.id === id ? { ...q, ...changes } : q));
    closeModal();
  };
  const handleDelete = (id) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    closeModal();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      <header className="bg-white border-b border-[#e5e0ff] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg shadow-lg shadow-indigo-200 flex items-center justify-center btn-color"
            >
              <Grid3X3 className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none text-[#1e1b4b]">Quotetion Hub</h1>
              <p className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider hidden sm:block">
                Management System
              </p>
            </div>
          </div>
          <button
            onClick={() => setModal("add")}
            className="inline-flex items-center gap-2 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 hover:-translate-y-0.5 btn-color"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Quote</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-2xl px-3 py-3 text-center border transition-all ${
                  isActive ? "text-white border-transparent shadow-md shadow-violet-200" : "bg-white border-violet-100 hover:border-violet-200"
                }`}
                style={isActive ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}>
                <p className={`syne text-xl font-black leading-none ${isActive ? "text-white" : "text-slate-900"}`}>{counts[f]}</p>
                <p className={`text-[10px] font-bold mt-0.5 ${isActive ? "text-white/70" : "text-slate-400"}`}>{f}</p>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, customer or service…"
              className="w-full bg-white border border-violet-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400 transition-colors" />
          </div>
          <span className="text-xs font-bold text-slate-400 shrink-0">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden"
          style={{ boxShadow: "0 2px 14px rgba(90,70,194,.07)" }}>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  {["Customer","Service","Amount","Date","Status","Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-14 text-center text-sm text-slate-400 font-semibold">No quotes found.</td></tr>
                ) : filtered.map((q) => (
                  <tr key={q.id} className="border-b border-slate-50 last:border-0 hover:bg-violet-50/20 transition-colors group">
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-bold text-slate-800">{q.customer}</p>
                      <p className="text-[11px] text-slate-400">{q.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 font-medium max-w-[150px] truncate">{q.service}</td>
                    <td className="px-4 py-3.5 text-sm font-black text-slate-900 whitespace-nowrap">
                      {q.amount || <span className="text-slate-300 text-xs font-semibold">Not set</span>}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{fmtDate(q.date)}</td>
                    <td className="px-4 py-3.5"><StatusPill status={q.status} /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openReview(q)}
                          className="w-7 h-7 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-600 flex items-center justify-center transition-colors"
                          title="Review & update">
                          <Eye size={12} />
                        </button>
                        <button onClick={() => openDelete(q)}
                          className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 flex items-center justify-center transition-colors"
                          title="Delete">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <p className="px-4 py-12 text-center text-sm text-slate-400 font-semibold">No quotes found.</p>
            ) : filtered.map((q) => (
              <div key={q.id} className="p-4 hover:bg-violet-50/20 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-black text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-md mr-2">{q.id}</span>
                    <span className="text-sm font-bold text-slate-800">{q.customer}</span>
                  </div>
                  <StatusPill status={q.status} />
                </div>
                <p className="text-xs text-slate-500 mb-3">{q.service}</p>
                 <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900">
                    {q.amount || <span className="text-slate-300 text-xs font-semibold">Amount not set</span>}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openReview(q)}
                      className="w-8 h-8 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-600 flex items-center justify-center transition-colors"
                      title="Review & update">
                      <Eye size={14} />
                    </button>
                    <button onClick={() => openDelete(q)}
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 flex items-center justify-center transition-colors"
                      title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal === "review" && selected && (
        <Modal title="Quote Details" onClose={closeModal}>
        <QuoteReviewModal quote={selected} onClose={closeModal} />
        </Modal>
      )}
      {modal === "delete" && selected && (
        <Modal title="Delete Quote" onClose={closeModal}>
        <QuoteDeleteModal quote={selected} onClose={closeModal} />
        </Modal>
      )}
      {modal === "add" && (
        <Modal title="Add Quote" onClose={closeModal}>
            <QuoteAddView />
        </Modal>
      )}
    </div>
  );
}