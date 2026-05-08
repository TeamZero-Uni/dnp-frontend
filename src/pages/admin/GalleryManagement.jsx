import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Search,
  Grid3X3,
  LayoutList,
  ImageOff,
  CheckSquare,
  Square,
} from "lucide-react";
import Modal from "../../model/Modal";
import AddImageView from "../../components/view/AddImageView";
import DeleteImage from "../../components/view/DeleteImage";
import { useProduct } from "../../hooks/useProduct";
import { getAllGalleries } from "../../api/galleryApi";

export default function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [modal, setModal] = useState(null);
  const { categories } = useProduct();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await getAllGalleries();
      setImages(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const filtered = images.filter((img) => {
    const matchCat =
      activeCategory === "All" || img.category.c_type === activeCategory;
    const matchSearch = img.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const closeModal = () => setModal(null);

  const renderModal = () => {
    if (modal === "add")
      return (
        <Modal title="Add New Image" onClose={closeModal}>
          <AddImageView onClose={closeModal} onSuccess={fetchGalleries} />
        </Modal>
      );
    if (modal === "delete")
      return (
        <Modal title="Delete Image" onClose={closeModal}>
          <DeleteImage
            images={filtered.filter((i) => selected.includes(i.id))}
            onCancel={closeModal}
            onDelete={() => {
              setSelected([]);
              setModal(null);
              fetchGalleries(); 
            }}
          />
        </Modal>
      );
    return null;
  };

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const selectAll = () =>
    selected.length === filtered.length
      ? setSelected([])
      : setSelected(filtered.map((i) => i.id));

  const isSelected = (id) => selected.includes(id);

  const handleAdd = () => setModal("add");
  const handleDelete = () => setModal("delete");

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg shadow-lg shadow-indigo-200 btn-color flex items-center justify-center">
            <Grid3X3 size={15} className="text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold leading-none text-[#1e1b4b]">
              Gallery Hub
            </h1>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider hidden sm:block">
              Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-500 text-xs font-semibold border border-red-100 hover:bg-red-100 transition-colors"
            >
              <Trash2 size={13} />
              Delete {selected.length}
            </button>
          )}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg btn-color text-white text-sm font-semibold transition-colors shadow-sm shadow-violet-200"
          >
            <Plus size={15} />
            Add Image
          </button>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {[
            {
              label: "Total",
              value: images.length,
              color: "text-violet-600",
              bg: "bg-violet-50",
              border: "border-violet-100",
            },
            {
              label: "Filtered",
              value: filtered.length,
              color: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-100",
            },
            {
              label: "Selected",
              value: selected.length,
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-100",
            },
            {
              label: "Categories",
              value: categories.length,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              border: "border-emerald-100",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-xl p-4 border ${s.bg} ${s.border} flex items-center gap-3`}
            >
              <span className={`text-3xl font-black ${s.color} leading-none`}>
                {s.value}
              </span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-52 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="bg-transparent outline-none w-full text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="w-px h-8 bg-slate-200 hidden sm:block" />

          <button
            onClick={selectAll}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors"
          >
            {selected.length === filtered.length && filtered.length > 0 ? (
              <CheckSquare size={15} className="text-violet-600" />
            ) : (
              <Square size={15} className="text-slate-400" />
            )}
            Select All
          </button>

          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            {[
              { mode: "grid", Icon: Grid3X3 },
              { mode: "list", Icon: LayoutList },
            ].map(({ mode, Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2.5 transition-colors ${
                  viewMode === mode
                    ? "btn-color text-white"
                    : "bg-white text-slate-400 hover:bg-slate-50"
                }`}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {["All", ...categories.map((c) => c.c_type)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "btn-color text-white shadow-sm shadow-violet-200"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-violet-200 hover:text-violet-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 && (
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-4">
            {filtered.length} image{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` · ${activeCategory}`}
          </p>
        )}

        {viewMode === "grid" && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((img) => (
              <div
                key={img.id}
                className={`group relative rounded-2xl overflow-hidden bg-white border-2 transition-all cursor-pointer
                  ${
                    isSelected(img.id)
                      ? "border-violet-500 shadow-lg shadow-violet-100"
                      : "border-slate-100 hover:border-violet-200 hover:shadow-md hover:shadow-slate-100"
                  }`}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button
                      onClick={() => {
                        setSelected([img.id]);
                        handleDelete();
                      }}
                      className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-red-500 hover:bg-white hover:scale-110 transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSelect(img.id)}
                    className="absolute top-2 left-2 z-10 w-6 h-6 rounded-md flex items-center justify-center transition-all"
                    style={{
                      background: isSelected(img.id)
                        ? "#7c3aed"
                        : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {isSelected(img.id) ? (
                      <CheckSquare size={14} className="text-white" />
                    ) : (
                      <Square size={14} className="text-slate-400" />
                    )}
                  </button>
                </div>

                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-700 truncate">
                    {img.title}
                  </p>
                  <span className="mt-1.5 inline-block text-xs font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                    {img.category.c_type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "list" && filtered.length > 0 && (
          <div className="flex flex-col gap-3">
            {filtered.map((img, index) => (
              <div
                key={img.id}
                className={`group relative flex items-center gap-4 p-3 rounded-2xl border-2 bg-white transition-all duration-200
                  ${
                    isSelected(img.id)
                      ? "border-violet-400 shadow-md shadow-violet-100 bg-violet-50/30"
                      : "border-slate-100 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100"
                  }`}
              >
                <span className="hidden sm:flex w-6 shrink-0 text-xs font-bold text-slate-300 justify-center">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <button
                  onClick={() => toggleSelect(img.id)}
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all duration-150 border-slate-200 hover:border-violet-400 bg-white"
                  style={{
                    borderColor: isSelected(img.id) ? "#7c3aed" : undefined,
                    background: isSelected(img.id) ? "#7c3aed" : undefined,
                  }}
                >
                  {isSelected(img.id) ? (
                    <CheckSquare size={14} className="text-white" />
                  ) : (
                    <Square size={14} className="text-slate-300" />
                  )}
                </button>

                <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate leading-tight">
                    {img.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    Image · {img.title.split(".").pop().toUpperCase()}
                  </p>
                </div>

                <div className="hidden sm:flex shrink-0">
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                      isSelected(img.id)
                        ? "text-violet-700 bg-violet-100 border-violet-200"
                        : "text-slate-500 bg-slate-50 border-slate-200 group-hover:text-violet-600 group-hover:bg-violet-50 group-hover:border-violet-200"
                    } transition-colors`}
                  >
                    {img.category.c_type}
                  </span>
                </div>

                <div className="hidden sm:block w-px h-8 bg-slate-100 shrink-0" />

                <div className="shrink-0">
                  <button
                    onClick={() => {
                      setSelected([img.id]);
                      handleDelete();
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={12} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <ImageOff size={26} className="text-slate-400" />
            </div>
            <p className="text-base font-bold text-slate-700 mb-1">
              No images found
            </p>
            <p className="text-sm text-slate-400">
              Try a different category or clear your search
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {renderModal()}
    </div>
  );
}
