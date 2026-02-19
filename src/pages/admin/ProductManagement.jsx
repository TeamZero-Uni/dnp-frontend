import { useState, useMemo } from "react";
import {
  FiSearch, FiPlus, FiEye, FiEdit2, FiTrash2, FiPackage,
  FiChevronLeft, FiChevronRight, FiFilter, FiArrowUpRight,
} from "react-icons/fi";
import Modal from "../../model/Modal";
import ProductForm from "../../components/forms/ProductForm";
import ProductView from "../../components/view/ProductView";
import DeleteView from "../../components/view/DeleteView";

const initialProducts = [
  { id: "PRD-001", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100", name: "Premium Watch", price: 299.99, status: "in_stock", category: "Accessories", stock: 45 },
  { id: "PRD-002", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100", name: "Wireless Headphones", price: 149.99, status: "in_stock", category: "Electronics", stock: 12 },
  { id: "PRD-003", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=100", name: "Running Shoes", price: 89.99, status: "out_stock", category: "Footwear", stock: 0 },
  { id: "PRD-004", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100", name: "Leather Wallet", price: 49.99, status: "in_stock", category: "Accessories", stock: 78 },
  { id: "PRD-005", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100", name: "Camera Lens", price: 599.99, status: "in_stock", category: "Electronics", stock: 8 },
  { id: "PRD-006", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100", name: "Sport Sneakers", price: 120.0, status: "out_stock", category: "Footwear", stock: 0 },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => products.filter(p => 
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus === "all" || p.status === filterStatus)
  ), [products, search, filterStatus]);

  const stats = useMemo(() => ({
    total: products.length,
    inStock: products.filter(p => p.status === "in_stock").length,
    outStock: products.filter(p => p.status === "out_stock").length,
  }), [products]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const closeModal = () => setModal(null);
  const handleEdit = (form) => {
    setProducts(prev => prev.map(p => p.id === form.id ? form : p));
    closeModal();
  };

  const renderModalContent = () => {
    if (!modal) return null;
    const components = {
      add: { title: "Add New Product", Component: ProductForm, props: { onSave: closeModal } },
      edit: { title: "Edit Product", Component: ProductForm, props: { product: modal.product, onSave: handleEdit } },
      view: { title: "Product Details", Component: ProductView, props: { product: modal.product } },
      delete: { title: "Delete Product", Component: DeleteView, props: { product: modal.product } },
    };
    const { title, Component, props } = components[modal.type];
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
          <button onClick={() => setModal({ type: "add" })} className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95">
            <FiPlus size={18} /> <span className="hidden sm:inline">New Product</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Inventory", value: stats.total, icon: <FiPackage />, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Available Items", value: stats.inStock, icon: <FiArrowUpRight />, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Stock Alerts", value: stats.outStock, icon: <FiTrash2 />, color: "text-rose-600", bg: "bg-rose-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl text-xl`}>{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" placeholder="Search..." value={search} 
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50">
              <FiFilter className="text-slate-400" size={14} />
              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer">
                <option value="all">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="out_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  {["Product Details", "Category", "Pricing", "Inventory", "Actions"].map(h => (
                    <th key={h} className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest ${h === "Actions" ? "text-center" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((product) => (
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
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-black">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase ${product.status === "in_stock" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.status === "in_stock" ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1 group-hover:translate-x-0 translate-x-2 transition-all">
                        {[
                          { icon: <FiEye size={16}/>, color: "hover:text-indigo-600", type: "view" },
                          { icon: <FiEdit2 size={16}/>, color: "hover:text-amber-500", type: "edit" },
                          { icon: <FiTrash2 size={16}/>, color: "hover:text-rose-500", type: "delete" }
                        ].map((btn, i) => (
                          <button key={i} onClick={() => setModal({ type: btn.type, product })} className={`p-2.5 rounded-xl text-slate-400 bg-transparent hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all ${btn.color}`}>
                            {btn.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
                {!paginated.length && (
                  <tr><td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-medium">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Showing {paginated.length} of {filtered.length} products</span>
            <div className="flex items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 rounded-xl border border-slate-200 bg-white disabled:opacity-30"><FiChevronLeft size={20}/></button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-xl text-xs font-bold ${page === i + 1 ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
                  {i + 1}
                </button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-2 rounded-xl border border-slate-200 bg-white disabled:opacity-30"><FiChevronRight size={20}/></button>
            </div>
          </div>
        </div>
      </main>

      {renderModalContent()}
    </div>
  );
}