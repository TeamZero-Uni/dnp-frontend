import React, { useState, useEffect } from 'react';
import {
  Grid3X3, MessageSquare, Star, Trash2,
  CheckCircle, Filter, Search, ThumbsUp
} from "lucide-react";
import { changeFeedbackStatus, deleteFeedback, getAllFeedback } from '../../api/feedbackApi';
import toast from "react-hot-toast";

function FeedbackManagement() {
  const [feedbacks, setFeedbacks]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllFeedback();
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const total         = feedbacks.length;
  const avgRating     = total
    ? (feedbacks.reduce((s, f) => s + (f.rating ?? 0), 0) / total).toFixed(1)
    : "—";
  const approvedCount = feedbacks.filter(f => f.status === "REVIEWED").length;
  const approvalRate  = total ? Math.round((approvedCount / total) * 100) + "%" : "—";

  const handleStatusChange = async (feedback) => {
    const nextStatus = feedback.status === "REVIEWED" ? "PENDING" : "REVIEWED";
    setActionLoading(feedback.feedback_id);
    try {
      await changeFeedbackStatus({ id: feedback.feedback_id, status: nextStatus });
      setFeedbacks(prev =>
        prev.map(f => f.feedback_id === feedback.feedback_id ? { ...f, status: nextStatus } : f)
      );
      toast.success("Feedback status updated successfully!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to update status. Please try again.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      await deleteFeedback(id);
      setFeedbacks(prev => prev.filter(f => f.feedback_id !== id)); 
      toast.success("Feedback deleted successfully!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to delete feedback. Please try again.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = feedbacks.filter(f => {
    const name  = f.user?.userDetails?.user_name ?? "";
    const msg   = f.message ?? "";                     
    const term  = search.toLowerCase();
    return name.toLowerCase().includes(term) || msg.toLowerCase().includes(term);
  });

  const statusStyle = (status) =>
    status === "REVIEWED"
      ? "bg-emerald-100 text-emerald-600"
      : "bg-amber-100 text-amber-600";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg shadow-lg shadow-indigo-200 bg-linear-to-br from-[#5a46c2] to-[#4838a3] flex items-center justify-center">
            <Grid3X3 size={15} className="text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold leading-none text-[#1e1b4b]">Feedback Center</h1>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider hidden sm:block">
              DNP 3D Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search reviews..."
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#5a46c2]/20 w-64 outline-none"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-[#5a46c2] transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <main className="p-8 max-w-7xl mx-auto w-full space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Reviews",  value: total,        icon: <MessageSquare />, color: "bg-blue-500"   },
            { label: "Average Rating", value: avgRating,    icon: <Star />,          color: "bg-yellow-400" },
            { label: "Approval Rate",  value: approvalRate, icon: <ThumbsUp />,      color: "bg-[#5a46c2]"  },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-[#5a46c2]/30 transition-all">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg shadow-indigo-100`}>
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-bold text-slate-800">Recent Testimonials</h2>
            <span className="text-xs font-semibold text-slate-400">{filtered.length} records</span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 text-center text-slate-400 text-sm font-semibold">Loading feedback...</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-slate-400 text-sm font-semibold">No feedback found.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Review</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {filtered.map((item) => {
                    const busy      = actionLoading === item.feedback_id;
                    const name      = item.user?.userDetails?.user_name ?? "Unknown"; 
                    const email     = item.user?.email ?? "";
                    const imageUrl  = item.user?.userDetails?.image_url;              
                    const dateStr   = new Date(item.createdAt).toLocaleDateString("en-US", { 
                      year: "numeric", month: "short", day: "numeric"
                    });

                    return (
                      <tr key={item.feedback_id} className="hover:bg-slate-50/50 transition-colors">

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            {imageUrl ? (                                   
                              <img src={imageUrl} alt={name}
                                className="w-9 h-9 rounded-full object-cover" />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-[#5a46c2]">
                                {name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-slate-900">{name}</p>
                              <p className="text-[11px] text-slate-400">{email}</p> 
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 max-w-xs">
                          <p className="text-slate-600 line-clamp-2 italic">"{item.message}"</p> 
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < (item.rating ?? 0) ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusStyle(item.status)}`}>
                            {item.status === "REVIEWED" ? "Reviewed" : "Pending"}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              title={item.status === "REVIEWED" ? "Revoke" : "Approve"}
                              disabled={busy}
                              onClick={() => handleStatusChange(item)}
                              className={`p-2 rounded-lg transition-all disabled:opacity-40 ${
                                item.status === "REVIEWED"
                                  ? "text-emerald-500 bg-emerald-50 hover:bg-emerald-100"
                                  : "text-slate-400 hover:text-emerald-500 hover:bg-emerald-50"
                              }`}
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              title="Delete"
                              disabled={busy}
                              onClick={() => handleDelete(item.feedback_id)} 
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default FeedbackManagement;