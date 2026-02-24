import { useState, useMemo } from "react";
import {
  FiSearch, FiPlus, FiEye, FiEdit2, FiTrash2, FiPackage,
  FiChevronLeft, FiChevronRight, FiFilter, FiShoppingBag,
  FiChevronDown, FiChevronUp,
} from "react-icons/fi";
import Modal from "../../model/Modal";
import ProductForm from "../../components/forms/ProductForm";
import DeleteProductView from "../../components/view/ProductView";
import DeleteView from "../../components/view/DeleteView";

const initialProducts = [
  { id: "PRD-001", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100", name: "Premium Watch",       price: 299.99, status: "in_stock",  category: "Accessories", stock: 45 },
  { id: "PRD-002", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100", name: "Wireless Headphones", price: 149.99, status: "in_stock",  category: "Electronics", stock: 12 },
  { id: "PRD-003", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=100", name: "Running Shoes",       price: 89.99,  status: "out_stock", category: "Footwear",    stock: 0  },
  { id: "PRD-004", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",    name: "Leather Wallet",      price: 49.99,  status: "in_stock",  category: "Accessories", stock: 78 },
  { id: "PRD-005", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100", name: "Camera Lens",         price: 599.99, status: "in_stock",  category: "Electronics", stock: 8  },
  { id: "PRD-006", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",    name: "Sport Sneakers",      price: 120.00, status: "out_stock", category: "Footwear",    stock: 0  },
];

const STATUS_CONFIG = {
  in_stock:  { label: "In Stock",     color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  out_stock: { label: "Out of Stock", color: "bg-rose-100 text-rose-600",       dot: "bg-rose-500"    },
};

const CATEGORY_COLORS = {
  Accessories: "bg-violet-100 text-violet-700",
  Electronics: "bg-blue-100 text-blue-700",
  Footwear:    "bg-amber-100 text-amber-700",
};

const PER_PAGE = 5;

function Badge({ status }) {
  const item = STATUS_CONFIG[status];
  if (!item) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase ${item.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

/* ─── Mobile Product Card ───────────────────────────── */
function MobileProductCard({ product, onView, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
    
      <div className="px-4 py-3 flex items-center gap-3">
        <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">{product.name}</p>
          <p className="text-[10px] font-mono text-slate-400">{product.id}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-black text-slate-800">${product.price.toLocaleString()}</p>
          <p className="text-xs text-slate-400">{product.category}</p>
        </div>
      </div>

      <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
        <Badge status={product.status} />
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${CATEGORY_COLORS[product.category] || "bg-slate-100 text-slate-600"}`}>
          {product.category}
        </span>
        {product.status === "in_stock" && (
          <span className="text-[11px] text-slate-400 font-medium">Stock: {product.stock}</span>
        )}
      </div>

      {expanded && (
        <div className="px-4 pb-3 border-t border-slate-100 pt-3 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Product ID</span>
            <span className="font-mono text-xs text-slate-700">{product.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Price</span>
            <span className="font-black text-slate-800">${product.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Stock</span>
            <span className="font-medium text-slate-700">{product.stock} units</span>
          </div>
        </div>
      )}

      <div className="px-4 py-2 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors py-1"
        >
          {expanded ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
          {expanded ? "Less" : "Details"}
        </button>
        <div className="flex items-center gap-1">
          {[
            { icon: <FiEye size={15} />,   fn: onView,   hover: "hover:text-indigo-600 hover:bg-indigo-50" },
            { icon: <FiEdit2 size={15} />, fn: onEdit,   hover: "hover:text-amber-500 hover:bg-amber-50"  },
            { icon: <FiTrash2 size={15}/>, fn: onDelete, hover: "hover:text-rose-600 hover:bg-rose-50"    },
          ].map((btn, i) => (
            <button key={i} onClick={btn.fn} className={`p-2 text-slate-400 rounded-lg transition-colors ${btn.hover}`}>
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [modal, setModal]             = useState(null);
  const [page, setPage]               = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const resetPage = (fn) => (val) => { fn(val); setPage(1); };

  const categories = useMemo(() => [...new Set(initialProducts.map(p => p.category))], []);

  const filtered = useMemo(() => products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus   === "all" || p.status   === filterStatus) &&
    (filterCategory === "all" || p.category === filterCategory)
  ), [products, search, filterStatus, filterCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const closeModal = () => setModal(null);
  const handleEdit = (form) => { setProducts(prev => prev.map(p => p.id === form.id ? form : p)); closeModal(); };

  const hasActiveFilters = filterStatus !== "all" || filterCategory !== "all";

  const renderModalContent = () => {
    if (!modal) return null;
    const map = {
      add:    { title: "Add New Product",  Component: ProductForm,        props: { onSave: closeModal } },
      edit:   { title: "Edit Product",     Component: ProductForm,        props: { product: modal.product, onSave: handleEdit } },
      view:   { title: "Product Details",  Component: DeleteProductView,  props: { product: modal.product } },
      delete: { title: "Delete Product",   Component: DeleteView,         props: { t: modal.product } },
    };
    const { title, Component, props } = map[modal.type];
    return (
      <Modal title={title} onClose={closeModal}>
        <Component {...props} onClose={closeModal} />
      </Modal>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">

      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
              <FiPackage className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">Inventory Hub</h1>
              <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">Management System</p>
            </div>
          </div>
          <button
            onClick={() => setModal({ type: "add" })}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
          >
            <FiPlus size={18} />
            <span className="hidden sm:inline">New Product</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100 space-y-3">

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text" placeholder="Search by name or ID…" value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="sm:hidden relative shrink-0 flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm text-slate-600"
              >
                <FiFilter size={14} />
                <span>Filter</span>
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white" />
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50">
                <FiFilter className="text-slate-400" size={13} />
                <select
                  value={filterStatus}
                  onChange={(e) => { resetPage(setFilterStatus)(e.target.value); }}
                  className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="in_stock">In Stock</option>
                  <option value="out_stock">Out of Stock</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50">
                <select
                  value={filterCategory}
                  onChange={(e) => { resetPage(setFilterCategory)(e.target.value); }}
                  className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={() => { resetPage(setFilterStatus)("all"); resetPage(setFilterCategory)("all"); }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {filtersOpen && (
              <div className="sm:hidden flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50">
                  <FiFilter className="text-slate-400" size={13} />
                  <select
                    value={filterStatus}
                    onChange={(e) => resetPage(setFilterStatus)(e.target.value)}
                    className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer w-full"
                  >
                    <option value="all">All Status</option>
                    <option value="in_stock">In Stock</option>
                    <option value="out_stock">Out of Stock</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50">
                  <select
                    value={filterCategory}
                    onChange={(e) => resetPage(setFilterCategory)(e.target.value)}
                    className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer w-full"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={() => { resetPage(setFilterStatus)("all"); resetPage(setFilterCategory)("all"); }}
                    className="self-start text-xs text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1.5 border border-indigo-200 rounded-lg bg-indigo-50"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  {["Product Details", "Category", "Pricing", "Stock", "Status", "Actions"].map(h => (
                    <th key={h} className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest ${h === "Actions" ? "text-center" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                      <FiShoppingBag size={28} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm font-medium">No products found.</p>
                    </td>
                  </tr>
                ) : paginated.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200" />
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${CATEGORY_COLORS[product.category] || "bg-slate-100 text-slate-600"}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-slate-800">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{product.stock} units</td>
                    <td className="px-6 py-4"><Badge status={product.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1 group-hover:translate-x-0 translate-x-2 transition-all">
                        {[
                          { icon: <FiEye size={15}/>,   color: "hover:text-indigo-600 hover:bg-indigo-50",  type: "view"   },
                          { icon: <FiEdit2 size={15}/>, color: "hover:text-amber-500 hover:bg-amber-50",    type: "edit"   },
                          { icon: <FiTrash2 size={15}/>,color: "hover:text-rose-600 hover:bg-rose-50",      type: "delete" },
                        ].map((btn, i) => (
                          <button
                            key={i}
                            onClick={() => setModal({ type: btn.type, product })}
                            className={`p-2.5 rounded-xl text-slate-400 border border-transparent hover:border-slate-100 hover:shadow-sm transition-all ${btn.color}`}
                          >
                            {btn.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden">
            {paginated.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <FiShoppingBag size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No products found.</p>
              </div>
            ) : (
              <div className="p-3 space-y-3">
                {paginated.map((product) => (
                  <MobileProductCard
                    key={product.id}
                    product={product}
                    onView={()   => setModal({ type: "view",   product })}
                    onEdit={()   => setModal({ type: "edit",   product })}
                    onDelete={()=> setModal({ type: "delete",  product })}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="px-4 sm:px-6 py-4 sm:py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Showing {paginated.length} of {filtered.length} products
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${p === page ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {renderModalContent()}
    </div>
  );
}