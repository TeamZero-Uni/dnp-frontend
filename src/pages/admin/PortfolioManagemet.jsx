import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Eye,
  Search,
  Grid3X3,
  LayoutList,
  ImageOff,
  Filter,
  CheckSquare,
  Square,
  SlidersHorizontal,
  Feather,
  Edit3,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Tag,
  User,
  BarChart2,
  ChevronDown,
  X,
  Star,
  Layers,
  TrendingUp,
  Package,
  Check,
  AlertCircle,
  MoreVertical,
  Copy,
  Archive,
  Subtitles,
} from "lucide-react";
import Modal from "../../model/Modal";
import ProjectForm from "../../components/view/ProjectForm";

const portfolioItems = [
  {
    id: 1,
    title: "3D Printing Service Platform",
    description:
      "A full-stack web platform for a 3D printing business that allows users to upload models, request quotations, and order custom prints online.",
    image: "/images/3d-printing-main.png",
    gallery: [
      "/images/3d-upload.png",
      "/images/3d-quote.png",
      "/images/3d-dashboard.png",
    ],
    features: [
      "Upload 3D model files (STL, OBJ)",
      "Automatic quotation system based on material & time",
      "Custom order request system",
      "Admin dashboard to manage orders",
      "User authentication with JWT",
      "Order tracking and status updates",
    ],
    date: "2025-02-10",
    Subtitles: "Web Application",
  },
];

// ImagePlaceholder Component
function ImagePlaceholder({ title }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <ImageOff size={32} className="text-slate-300" />
        <p className="text-xs text-slate-400 text-center px-2">{title || "No image"}</p>
      </div>
    </div>
  );
}

function GridCard({ item, selected, onSelect, setModal, setDetailItem }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleViewDetails = () => {
    setDetailItem(item);
    setModal("details");
  };

  return (
    <div
      className={`group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 relative flex flex-col ${
        selected ? "border-[#5a46c2] ring-2 ring-[#5a46c2]/20" : "border-slate-100 hover:border-slate-200"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onSelect(item.id)}
        className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {selected ? (
          <CheckSquare size={18} style={{ color: "#5a46c2" }} />
        ) : (
          <Square size={18} className="text-white drop-shadow" />
        )}
      </button>

      {/* Image */}
      <div className="h-44 overflow-hidden relative bg-slate-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <ImagePlaceholder title={item.title} />
        )}
        {/* overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3 gap-2">
          <button
            onClick={handleViewDetails}
            className="p-2 rounded-lg bg-white/90 text-[#5a46c2] hover:bg-white transition-colors shadow-sm"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
            {item.Subtitles}
          </span>
          <h3 className="text-sm font-bold text-[#1e1b4b] mt-0.5 leading-snug line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Calendar size={11} />
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListRow({ item, selected, onSelect, setModal, setDetailItem }) {
  const handleViewDetails = () => {
    setDetailItem(item);
    setModal("details");
  };

  return (
    <div
      className={`group bg-white rounded-2xl border px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-150 ${
        selected ? "border-[#5a46c2] ring-2 ring-[#5a46c2]/20" : "border-slate-100 hover:border-slate-200"
      }`}
    >
      <button onClick={() => onSelect(item.id)} className="shrink-0">
        {selected ? (
          <CheckSquare size={16} style={{ color: "#5a46c2" }} />
        ) : (
          <Square size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
        )}
      </button>

      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-[#1e1b4b] truncate">{item.title}</h3>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 shrink-0">
            {item.Subtitles}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
      </div>

      {/* Meta */}
      <div className="hidden md:flex items-center gap-5 text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} />
          <span>
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleViewDetails}
          className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 transition-colors"
        >
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
}

function DetailModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,10,40,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-7 py-5 border-b border-slate-100 rounded-t-3xl">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
              {item.Subtitles}
            </span>
            <h2 className="text-lg font-bold text-[#1e1b4b]">{item.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="px-7 py-6 space-y-6">
          {/* Image */}
          <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <ImagePlaceholder title={item.title} />
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: Calendar,
                label: "Date",
                value: new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }),
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  <Icon size={10} />
                  {label}
                </div>
                <p className="text-sm font-semibold text-[#1e1b4b]">{value}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          {item.features && item.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span
                      className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: "#5a46c2" }}
                    >
                      ✓
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {item.gallery && item.gallery.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Gallery
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {item.gallery.map((img, i) => (
                  <div key={i} className="h-24 rounded-lg overflow-hidden bg-slate-100">
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioManagement() {
  const [items, setItems] = useState(portfolioItems);
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [detailItem, setDetailItem] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [modal, setModal] = useState(null);

  const closeModal = () => {
    setModal(null);
    setDetailItem(null);
  };

  const handleAddProject = (newProject) => {
    const projectToAdd = {
      ...newProject,
      id: Math.max(...items.map((i) => i.id), 0) + 1,
      gallery: newProject.gallery ? newProject.gallery.split(",").map((g) => g.trim()) : [],
      features: newProject.features ? newProject.features.split(",").map((f) => f.trim()) : [],
    };
    setItems((prev) => [projectToAdd, ...prev]);
    closeModal();
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((i) => i.id));
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelected((prev) => prev.filter((s) => s !== id));
  };

  const handleDeleteSelected = () => {
    setItems((prev) => prev.filter((i) => !selected.includes(i.id)));
    setSelected([]);
  };

  const renderModal = () => {
    if (modal === "add") {
      return (
        <Modal title="Add New Project" onClose={closeModal}>
          <ProjectForm onClose={closeModal} onSubmit={handleAddProject} />
        </Modal>
      );
    }
    if (modal === "details") {
      return <DetailModal item={detailItem} onClose={closeModal} />;
    }
  };

  const filtered = items
    .filter((i) => {
      const q = search.toLowerCase();
      return (
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.Subtitles.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg shadow-lg shadow-indigo-200 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #5a46c2, #4838a3)" }}
          >
            <Grid3X3 size={15} className="text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold leading-none text-[#1e1b4b]">
              Portfolio Hub
            </h1>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider hidden sm:block">
              Management System
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors shadow-sm shadow-violet-200"
            style={{ background: "linear-gradient(135deg, #5a46c2, #4838a3)" }}
          >
            <Plus size={15} />
            create new
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex-1 min-w-0 max-w-xs">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 outline-none cursor-pointer hover:border-indigo-300 transition-colors"
            >
              <option value="date">Sort: Date</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-[#5a46c2]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-[#5a46c2]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutList size={14} />
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selected.length > 0 && (
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-medium"
            style={{ background: "#f5f3ff", borderColor: "#c4b5fd" }}
          >
            <button onClick={handleSelectAll} className="text-indigo-600 text-xs hover:text-indigo-800">
              {selected.length === filtered.length ? "Deselect all" : "Select all"}
            </button>
            <span className="text-slate-400">|</span>
            <span className="text-indigo-700 font-semibold">{selected.length} selected</span>
            <button
              onClick={handleDeleteSelected}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
            >
              <Trash2 size={12} /> Delete Selected
            </button>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-700 font-bold">{filtered.length}</span> of{" "}
            <span className="text-slate-700 font-bold">{items.length}</span> projects
          </p>
          <button
            onClick={handleSelectAll}
            className="text-xs text-slate-400 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1"
          >
            <Square size={11} />
            {selected.length === filtered.length && filtered.length > 0
              ? "Deselect all"
              : "Select all"}
          </button>
        </div>

        {/* Project List/Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="p-5 rounded-2xl bg-slate-100 mb-4">
              <Search size={28} className="text-slate-300" />
            </div>
            <p className="font-semibold text-sm">No projects found</p>
            <p className="text-xs mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <GridCard
                key={item.id}
                item={item}
                selected={selected.includes(item.id)}
                onSelect={handleSelect}
                setModal={setModal}
                setDetailItem={setDetailItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <ListRow
                key={item.id}
                item={item}
                selected={selected.includes(item.id)}
                onSelect={handleSelect}
                setModal={setModal}
                setDetailItem={setDetailItem}
              />
            ))}
          </div>
        )}

        {renderModal()}
      </div>

      <style>{`
        .btn-color {
          background: linear-gradient(135deg, #5a46c2, #4838a3);
          color: white;
        }
      `}</style>
    </div>
  );
}