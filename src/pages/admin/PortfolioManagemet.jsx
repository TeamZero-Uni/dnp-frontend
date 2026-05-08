import React, { useState, useEffect } from "react";
import { Plus, Trash2, Eye, Search, Grid3X3, LayoutList, ImageOff, Filter, CheckSquare, Square, Calendar, X, AlertCircle, Pencil } from "lucide-react";
import Modal from "../../model/Modal";
import ProjectForm from "../../components/view/ProjectForm";
import DetailModal from "../../components/view/DetailModal";
import { deleteProject, getAllProjects } from "../../api/portfolioApi";
import toast from "react-hot-toast";

const parseTags = (raw) =>
  raw ? raw.split(",").map((t) => t.trim()).filter(Boolean) : [];

function ImagePlaceholder({ title }) {
  return (
    <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2">
      <ImageOff size={32} className="text-slate-300" />
      <p className="text-xs text-slate-400 text-center px-2">{title || "No image"}</p>
    </div>
  );
}

function TagBadges({ tags }) {
  if (!tags?.length)
    return <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Portfolio</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, i) => (
        <span key={i} className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
          {tag}{i < tags.length - 1 ? " · " : ""}
        </span>
      ))}
    </div>
  );
}

function GridCard({ item, selected, onSelect, setModal, setDetailItem, setEditItem }) {
  return (
    <div className={`group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 relative flex flex-col ${selected ? "border-[#5a46c2] ring-2 ring-[#5a46c2]/20" : "border-slate-100 hover:border-slate-200"}`}>
      <button onClick={() => onSelect(item.portfolio_id)} className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        {selected ? <CheckSquare size={18} style={{ color: "#5a46c2" }} /> : <Square size={18} className="text-white drop-shadow" />}
      </button>
      <div className="h-44 overflow-hidden relative bg-slate-100">
        {item.images?.[0]?.imageUrl
          ? <img src={item.images[0].imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <ImagePlaceholder title={item.title} />}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3 gap-2">
          <button
            onClick={() => { setEditItem(item); setModal("edit"); }}
            className="p-2 rounded-lg bg-white/90 text-amber-500 hover:bg-white transition-colors shadow-sm"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => { setDetailItem(item); setModal("details"); }}
            className="p-2 rounded-lg bg-white/90 text-[#5a46c2] hover:bg-white transition-colors shadow-sm"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div>
          <TagBadges tags={item.tags} />
          <h3 className="text-sm font-bold text-[#1e1b4b] mt-0.5 leading-snug line-clamp-1">{item.title}</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
        </div>
        <div className="flex items-center pt-3 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Calendar size={11} />
            {new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListRow({ item, selected, onSelect, setModal, setDetailItem, setEditItem }) {
  return (
    <div className={`group bg-white rounded-2xl border px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-150 ${selected ? "border-[#5a46c2] ring-2 ring-[#5a46c2]/20" : "border-slate-100 hover:border-slate-200"}`}>
      <button onClick={() => onSelect(item.portfolio_id)} className="shrink-0">
        {selected ? <CheckSquare size={16} style={{ color: "#5a46c2" }} /> : <Square size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />}
      </button>
      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
        {item.images?.[0]?.imageUrl ? <img src={item.images[0].imageUrl} alt={item.title} className="w-full h-full object-cover" /> : <ImagePlaceholder />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-[#1e1b4b] truncate">{item.title}</h3>
          <TagBadges tags={item.tags} />
        </div>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
      </div>
      <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
        <Calendar size={11} />
        {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </div>
      <button
        onClick={() => { setEditItem(item); setModal("edit"); }}
        className="p-2 rounded-lg hover:bg-amber-50 text-amber-400 hover:text-amber-600 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={() => { setDetailItem(item); setModal("details"); }}
        className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Eye size={14} />
      </button>
    </div>
  );
}

export default function PortfolioManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [detailItem, setDetailItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [modal, setModal] = useState(null);
  const [activeTag, setActiveTag] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getAllProjects();
      if (response.success && response.data) {
        setItems(response.data.map((project) => ({
          ...project,
          id: project.portfolio_id,
          tags: parseTags(project.socialMediaType),
          image: project.images?.[0]?.imageUrl || null,
          gallery: project.images?.map((img) => img.imageUrl) || [],
          features: project.features || [],
        })));
      }
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const allTags = [...new Set(items.flatMap((i) => i.tags))].sort();

  const closeModal = () => { setModal(null); setDetailItem(null); setEditItem(null); };

  const handleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const handleSelectAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((i) => i.portfolio_id || i.id));

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selected.map((id) => deleteProject(id)));
      setSelected([]);
      toast.success("Selected projects deleted successfully!");
      fetchProjects();
    } catch {
      toast.error("Failed to delete projects");
    }
  };

  const filtered = items
    .filter((i) => {
      const q = search.toLowerCase();
      return (
        (i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.tags.some((t) => t.toLowerCase().includes(q))) &&
        (activeTag === null || i.tags.includes(activeTag))
      );
    })
    .sort((a, b) => sortBy === "date" ? new Date(b.date) - new Date(a.date) : a.title.localeCompare(b.title));

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block p-4 rounded-2xl bg-slate-100 mb-4"><Grid3X3 size={32} className="text-slate-300 animate-spin" /></div>
        <p className="text-slate-600 font-medium">Loading projects...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block p-4 rounded-2xl bg-red-100 mb-4"><AlertCircle size={32} className="text-red-500" /></div>
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  );

  const cardProps = { setModal, setDetailItem, setEditItem };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg shadow-lg shadow-indigo-200" style={{ background: "linear-gradient(135deg, #5a46c2, #4838a3)" }}>
            <Grid3X3 size={15} className="text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold leading-none text-[#1e1b4b]">Portfolio Hub</h1>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider hidden sm:block">Management System</p>
          </div>
        </div>
        <button onClick={() => setModal("add")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm shadow-violet-200" style={{ background: "linear-gradient(135deg, #5a46c2, #4838a3)" }}>
          <Plus size={15} /> create new
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex-1 min-w-0 max-w-xs">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full" />
            {search && <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600"><X size={12} /></button>}
          </div>
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-slate-400 hidden sm:block" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 outline-none cursor-pointer hover:border-indigo-300 transition-colors">
              <option value="date">Sort: Date</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 ml-auto">
            {["grid", "list"].map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode)} className={`p-1.5 rounded-md transition-all ${viewMode === mode ? "bg-white shadow-sm text-[#5a46c2]" : "text-slate-400 hover:text-slate-600"}`}>
                {mode === "grid" ? <Grid3X3 size={14} /> : <LayoutList size={14} />}
              </button>
            ))}
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-1">
            {[null, ...allTags].map((tag) => (
              <button key={tag ?? "all"} onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${activeTag === tag ? "bg-[#5a46c2] text-white border-[#5a46c2]" : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"}`}>
                {tag ?? "All"}
              </button>
            ))}
          </div>
        )}

        {selected.length > 0 && (
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-medium" style={{ background: "#f5f3ff", borderColor: "#c4b5fd" }}>
            <button onClick={handleSelectAll} className="text-indigo-600 text-xs hover:text-indigo-800">
              {selected.length === filtered.length ? "Deselect all" : "Select all"}
            </button>
            <span className="text-slate-400">|</span>
            <span className="text-indigo-700 font-semibold">{selected.length} selected</span>
            <button onClick={handleDeleteSelected} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors">
              <Trash2 size={12} /> Delete Selected
            </button>
          </div>
        )}

        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-700 font-bold">{filtered.length}</span> of <span className="text-slate-700 font-bold">{items.length}</span> projects
            {activeTag && (
              <span className="ml-2 inline-flex items-center gap-1 text-indigo-500 font-semibold">
                · {activeTag}
                <button onClick={() => setActiveTag(null)}><X size={10} className="hover:text-red-400" /></button>
              </span>
            )}
          </p>
          <button onClick={handleSelectAll} className="text-xs text-slate-400 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1">
            <Square size={11} />
            {selected.length === filtered.length && filtered.length > 0 ? "Deselect all" : "Select all"}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="p-5 rounded-2xl bg-slate-100 mb-4"><Search size={28} className="text-slate-300" /></div>
            <p className="font-semibold text-sm">No projects found</p>
            <p className="text-xs mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <GridCard key={item.portfolio_id} item={item} selected={selected.includes(item.portfolio_id)} onSelect={handleSelect} {...cardProps} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <ListRow key={item.portfolio_id} item={item} selected={selected.includes(item.portfolio_id)} onSelect={handleSelect} {...cardProps} />
            ))}
          </div>
        )}

        {modal === "add" && (
          <Modal title="Add New Project" onClose={closeModal}>
            <ProjectForm onClose={closeModal} onSuccess={() => { fetchProjects(); closeModal(); }} />
          </Modal>
        )}

        {modal === "edit" && (
          <Modal title="Edit Project" onClose={closeModal}>
            <ProjectForm
              initialData={editItem}
              onClose={closeModal}
              onSuccess={() => { fetchProjects(); closeModal(); }}
            />
          </Modal>
        )}

        {modal === "details" && <DetailModal item={detailItem} onClose={closeModal} />}
      </div>
    </div>
  );
}