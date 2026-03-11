import { useState, useMemo, useContext } from "react";
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
} from "react-icons/fi";
import ProductForm from "../../components/forms/ProductForm";
import ProductView from "../../components/view/ProductView";
import DeleteView from "../../components/view/DeleteView";
import Modal from "../../model/Modal";
import { useProduct } from "../../hooks/useProduct";


const COLUMNS = ["Product", "Category", "Price", "Quantity", "Status", "Actions"];

export default function ProductManagement() {
  const { products } = useProduct();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const closeModal = () => setModal(null);

  const renderModal = () => {
    if (!modal) return null;
    const config = {
      add: { title: "Add Product", Comp: ProductForm, props: { mode: "add" } },
      edit: { title: "Edit Product", Comp: ProductForm, props: { mode: "edit", product: modal.product } },
      view: { title: "Product Details", Comp: ProductView, props: { product: modal.product } },
      delete: { title: "Delete Product", Comp: DeleteView, props: { t: modal.product, onConfirm: () => closeModal() } },
    };
    const { title, Comp, props } = config[modal.type];
    return (
      <Modal title={title} onClose={closeModal}>
        <Comp {...props} onClose={closeModal} />
      </Modal>
    );
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category ? p.category === category : true;
      const matchStatus = status ? p.status === status : true;
      return matchSearch && matchCat && matchStatus;
    });
  }, [products, search, category, status]);

  const totalPages = Math.ceil(filtered.length / 5);
  const paginated = filtered.slice((page - 1) * 5, page * 5);
  const activeFilters = [category, status].filter(Boolean).length;

  return (
    <div className="min-h-screen font-sans text-slate-900">

      <header className="bg-white border-b border-[#e5e0ff] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg shadow-lg shadow-indigo-200 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}
            >
              <FiPackage className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none text-[#1e1b4b]">Inventory Hub</h1>
              <p className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider hidden sm:block">
                Management System
              </p>
            </div>
          </div>
          <button
            onClick={() => setModal({ type: "add" })}
            className="inline-flex items-center gap-2 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg,#5a46c2,#4838a3)",
              boxShadow: "0 4px 12px rgba(90,70,194,0.35)",
            }}
          >
            <FiPlus size={18} />
            <span className="hidden sm:inline">New Product</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {[
            { label: "Total Products", value: products.length, sub: "all categories", color: "#1e1b4b" },
            { label: "In Stock", value: products.filter((p) => p.status === "stock").length, sub: "available", color: "#5a46c2" },
            { label: "Out of Stock", value: products.filter((p) => p.status === "out_of_stock").length, sub: "restocking needed", color: "#e11d48" },
            { label: "Total Units", value: products.reduce((s, p) => s + p.stock, 0), sub: "inventory count", color: "#1e1b4b" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e5e0ff] rounded-2xl p-3.5 sm:p-4 flex flex-col gap-1 shadow-sm hover:shadow-md hover:shadow-indigo-100 transition-shadow"
            >
              <span className="text-[9px] sm:text-[10px] font-bold text-[#9090b0] uppercase tracking-wider leading-none">
                {stat.label}
              </span>
              <span className="text-2xl sm:text-[1.6rem] font-bold leading-none mt-1" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs text-[#6d6a8a]">{stat.sub}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#e5e0ff] rounded-2xl shadow-sm overflow-hidden">

          <div className="p-4 sm:p-5 border-b border-[#f0eeff]">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9090b0]" size={14} />
                <input
                  className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-sm focus:border-[#5a46c2] focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-[#b0add0]"
                  type="text"
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <FiFilter className="text-[#9090b0] shrink-0" size={14} />
                <select
                  className="px-3 py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-xs font-semibold text-[#1e1b4b] outline-none cursor-pointer focus:border-[#5a46c2] appearance-none"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                >
                  <option value="">All Categories</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Kitchenware">Kitchenware</option>
                </select>
                <select
                  className="px-3 py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-xs font-semibold text-[#1e1b4b] outline-none cursor-pointer focus:border-[#5a46c2] appearance-none"
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                >
                  <option value="">All Status</option>
                  <option value="stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`sm:hidden relative flex items-center gap-1.5 px-3 py-2 rounded-xl border-[1.5px] text-xs font-semibold transition-all ${
                  showFilters || activeFilters > 0
                    ? "bg-indigo-50 border-[#5a46c2] text-[#5a46c2]"
                    : "bg-[#f9f8ff] border-[#e5e0ff] text-[#6d6a8a]"
                }`}
              >
                <FiFilter size={13} />
                <span>Filter</span>
                {activeFilters > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                    style={{ background: "#5a46c2" }}>
                    {activeFilters}
                  </span>
                )}
              </button>
            </div>

            {showFilters && (
              <div className="sm:hidden mt-3 grid grid-cols-2 gap-2">
                <select
                  className="px-3 py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-xs font-semibold text-[#1e1b4b] outline-none focus:border-[#5a46c2] appearance-none"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                >
                  <option value="">All Categories</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Kitchenware">Kitchenware</option>
                </select>
                <select
                  className="px-3 py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-xs font-semibold text-[#1e1b4b] outline-none focus:border-[#5a46c2] appearance-none"
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                >
                  <option value="">All Status</option>
                  <option value="stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                {activeFilters > 0 && (
                  <button
                    onClick={() => { setCategory(""); setStatus(""); setPage(1); }}
                    className="col-span-2 py-2 rounded-xl border border-[#fecdd3] text-[#e11d48] text-xs font-semibold hover:bg-[#ffe4e6] transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#f9f8ff] border-b-2 border-[#eeeaff]">
                <tr>
                  {COLUMNS.map((col) => (
                    <th key={col} className="px-5 py-3.5 text-[0.7rem] font-bold text-[#6d6a8a] uppercase tracking-wider whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eeff]">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-[#b0add0] text-sm">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((product) => (
                    <tr key={product.id} className="hover:bg-[#faf9ff] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            className="w-11 h-11 rounded-xl object-cover border-2 border-[#f0eeff] shrink-0"
                            alt={product.name}
                          />
                          <div className="min-w-0">
                            <div className="font-mono text-[0.68rem] text-[#b0add0] mb-0.5">{product.id}</div>
                            <div className="font-semibold text-[#1e1b4b] truncate max-w-45">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 bg-[#ede9ff] text-[#5a46c2] border border-[#ddd6ff] rounded-full text-[0.7rem] font-bold uppercase whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono font-bold text-[#1e1b4b]">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-[#6d6a8a] font-medium">{product.stock} units</span>
                      </td>
                      <td className="px-5 py-4">
                        {product.status === "stock" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0] rounded-full text-[0.68rem] font-bold uppercase tracking-wider whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" /> In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ffe4e6] text-[#9f1239] border border-[#fecdd3] rounded-full text-[0.68rem] font-bold uppercase tracking-wider whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] shrink-0" /> Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setModal({ type: "view", product })} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9090b0] hover:bg-[#f0eeff] hover:text-[#5a46c2] transition-all" title="View">
                            <FiEye size={15} />
                          </button>
                          <button onClick={() => setModal({ type: "edit", product })} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9090b0] hover:bg-[#f0eeff] hover:text-[#5a46c2] transition-all" title="Edit">
                            <FiEdit2 size={15} />
                          </button>
                          <button onClick={() => setModal({ type: "delete", product })} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9090b0] hover:bg-[#ffe4e6] hover:text-[#e11d48] transition-all" title="Delete">
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-[#f0eeff]">
            {paginated.length === 0 ? (
              <div className="text-center py-12 text-[#b0add0] text-sm">No products found.</div>
            ) : (
              paginated.map((product) => (
                <div key={product.id} className="p-4 hover:bg-[#faf9ff] transition-colors">
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-[#f0eeff] shrink-0"
                      alt={product.name}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] text-[#b0add0] leading-none mb-1">{product.id}</p>
                          <p className="font-semibold text-[#1e1b4b] text-sm leading-snug truncate">{product.name}</p>
                        </div>
                        {product.status === "stock" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0] rounded-full text-[9px] font-bold uppercase shrink-0">
                            <span className="w-1 h-1 rounded-full bg-[#10b981]" /> In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ffe4e6] text-[#9f1239] border border-[#fecdd3] rounded-full text-[9px] font-bold uppercase shrink-0">
                            <span className="w-1 h-1 rounded-full bg-[#f43f5e]" /> Out of Stock
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                        <span className="px-2 py-0.5 bg-[#ede9ff] text-[#5a46c2] border border-[#ddd6ff] rounded-full text-[9px] font-bold uppercase">
                          {product.category}
                        </span>
                        <span className="font-mono font-bold text-[#1e1b4b] text-xs">${product.price.toFixed(2)}</span>
                        <span className="text-[#6d6a8a] text-xs">{product.stock} units</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setModal({ type: "view", product })}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#e5e0ff] text-[#5a46c2] text-xs font-semibold hover:bg-[#f0eeff] transition-all active:scale-95"
                    >
                      <FiEye size={13} /> View
                    </button>
                    <button
                      onClick={() => setModal({ type: "edit", product })}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#e5e0ff] text-[#5a46c2] text-xs font-semibold hover:bg-[#f0eeff] transition-all active:scale-95"
                    >
                      <FiEdit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => setModal({ type: "delete", product })}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#fecdd3] text-[#e11d48] text-xs font-semibold hover:bg-[#ffe4e6] transition-all active:scale-95"
                    >
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-wrap justify-between items-center px-4 sm:px-5 py-4 border-t border-[#f0eeff] gap-3">
            <span className="text-[0.75rem] text-[#9090b0] font-medium">
              Showing {Math.min((page - 1) * 5 + 1, filtered.length)}–{Math.min(page * 5, filtered.length)} of {filtered.length} products
            </span>
            <div className="flex items-center gap-1.5">
              <button
                className="w-8 h-8 flex items-center justify-center border-[1.5px] border-[#e5e0ff] rounded-lg text-[#6d6a8a] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#5a46c2] hover:text-[#5a46c2] transition-all"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <FiChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-[0.8rem] font-bold transition-all ${
                    page === n
                      ? "text-white shadow-[0_2px_8px_rgba(90,70,194,0.3)]"
                      : "bg-white border-[1.5px] border-[#e5e0ff] text-[#6d6a8a] hover:border-[#5a46c2] hover:text-[#5a46c2]"
                  }`}
                  style={page === n ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="w-8 h-8 flex items-center justify-center border-[1.5px] border-[#e5e0ff] rounded-lg text-[#6d6a8a] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#5a46c2] hover:text-[#5a46c2] transition-all"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => p + 1)}
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {renderModal()}
    </div>
  );
}