import { useState, useMemo } from "react";
import {
  FiSearch, FiFilter, FiEye, FiTrash2,
  FiPackage, FiChevronLeft, FiChevronRight,
  FiShoppingBag,
} from "react-icons/fi";
import Modal from "../../model/Modal";
import OnlineOrderView from "../../components/view/OnlineOrderView";
import DeleteOrderView from "../../components/view/DeleteOrderView";

const INITIAL_ORDERS = [
  {
    order_id: "ORD-001",
    product_name: "Minimalist Desk Lamp",
    user_name: "Alice Johnson",
    total_amount: 158.00,
    order_status: "delivered", // pending, confirmed, shipped, delivered, cancelled
    order_date: "2025-01-10",
    quantity: 2,
    payment_method: "card",
    payment_status: "paid", 
    shipping_name: "Alice Johnson",
    shipping_phone: "+1-555-0101",
    shipping_address: "123 Maple Avenue",
    shipping_city: "Portland",
    shipping_state: "Oregon",
    shipping_pincode: "97201",
    shipping_country: "USA"
  },
  {
    order_id: "ORD-002",
    product_name: "Ceramic Coffee Set",
    user_name: "Bob Martinez",
    total_amount: 55.00,
    order_status: "shipped",
    order_date: "2025-01-14",
    quantity: 1,
    payment_method: "card",
    payment_status: "paid",
    shipping_name: "Bob Martinez",
    shipping_phone: "+1-555-0102",
    shipping_address: "456 Oak Street",
    shipping_city: "Austin",
    shipping_state: "Texas",
    shipping_pincode: "73301",
    shipping_country: "USA"
  },
  {
    order_id: "ORD-003",
    product_name: "Leather Journal",
    user_name: "Clara Nguyen",
    total_amount: 105.00,
    order_status: "pending",
    order_date: "2025-01-18",
    quantity: 3,
    payment_method: "card",
    payment_status: "paid",
    shipping_name: "Clara Nguyen",
    shipping_phone: "+1-555-0103",
    shipping_address: "789 Pine Lane",
    shipping_city: "Seattle",
    shipping_state: "Washington",
    shipping_pincode: "98101",
    shipping_country: "USA"
  },
  {
    order_id: "ORD-004",
    product_name: "Minimalist Desk Lamp",
    user_name: "David Kim",
    total_amount: 79.00,
    order_status: "confirmed",
    order_date: "2025-01-20",
    quantity: 1,
    payment_method: "card",
    payment_status: "paid",
    shipping_name: "David Kim",
    shipping_phone: "+1-555-0104",
    shipping_address: "321 Birch Blvd",
    shipping_city: "Chicago",
    shipping_state: "Illinois",
    shipping_pincode: "60601",
    shipping_country: "USA"
  },
  {
    order_id: "ORD-005",
    product_name: "Ceramic Coffee Set",
    user_name: "Emma Wilson",
    total_amount: 110.00,
    order_status: "cancelled",
    order_date: "2025-01-22",
    quantity: 2,
    payment_method: "card",
    payment_status: "refunded",
    shipping_name: "Emma Wilson",
    shipping_phone: "+1-555-0105",
    shipping_address: "654 Cedar Court",
    shipping_city: "Denver",
    shipping_state: "Colorado",
    shipping_pincode: "80201",
    shipping_country: "USA"
  },
  {
    order_id: "ORD-006",
    product_name: "Leather Journal",
    user_name: "Frank Lee",
    total_amount: 35.00,
    order_status: "pending",
    order_date: "2025-01-25",
    quantity: 1,
    payment_method: "card",
    payment_status: "failed",
    shipping_name: "Frank Lee",
    shipping_phone: "+1-555-0106",
    shipping_address: "987 Elm Road",
    shipping_city: "Miami",
    shipping_state: "Florida",
    shipping_pincode: "33101",
    shipping_country: "USA"
  }
];

const PER_PAGE = 6;

const STATUS_STYLES = {
  pending:    { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400"   },
  confirmed:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    dot: "bg-blue-500"    },
  processing: { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200",  dot: "bg-indigo-500"  },
  shipped:    { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200",  dot: "bg-violet-500"  },
  delivered:  { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  cancelled:  { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",    dot: "bg-rose-500"    },
};

const COLUMNS = ["Order ID", "Product", "Customer", "Qty", "Total", "Status", "Date", "Actions"];

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function OrderManagement() {
  const [orders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const closeModal = () => setModal(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const q = search.toLowerCase();
      const matchSearch =
        o.order_id.toLowerCase().includes(q) ||
        o.product_name.toLowerCase().includes(q) ||
        o.user_name.toLowerCase().includes(q) ||
        o.product_id.toLowerCase().includes(q);
      const matchStatus = statusFilter ? o.order_status === statusFilter : true;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const stats = [
    { label: "Total Orders",  value: orders.length,                                                   color: "#1e1b4b" },
    { label: "Pending",       value: orders.filter(o => o.order_status === "pending").length,          color: "#d97706" },
    { label: "Delivered",     value: orders.filter(o => o.order_status === "delivered").length,        color: "#059669" },
    { label: "Revenue",       value: `$${orders.reduce((s, o) => s + o.total_amount, 0).toFixed(0)}`,  color: "#5a46c2" },
  ];

  const activeFilters = [statusFilter].filter(Boolean).length;

  return (
    <div className="min-h-screen font-sans">

      <header className="bg-white border-b border-[#e5e0ff] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200"
              style={{ background: "linear-gradient(135deg,#5a46c2,#4838a3)" }}
            >
              <FiShoppingBag className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none text-[#1e1b4b]">Inventory Hub</h1>
              <p className="hidden sm:block text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider">
                Order Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl">
            <FiPackage size={13} className="text-indigo-400" />
            <span className="text-xs font-bold text-indigo-500">{orders.length} Orders</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-[#e5e0ff] rounded-2xl p-3.5 sm:p-4 flex flex-col gap-1 shadow-sm hover:shadow-md hover:shadow-indigo-100 transition-shadow">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#9090b0] uppercase tracking-wider leading-none">{s.label}</span>
              <span className="text-2xl sm:text-[1.6rem] font-bold leading-none mt-1" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#e5e0ff] rounded-2xl shadow-sm overflow-hidden">

          <div className="p-4 sm:p-5 border-b border-[#f0eeff]">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9090b0]" size={14} />
                <input
                  className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-sm outline-none transition-all placeholder:text-[#b0add0] focus:border-[#5a46c2] focus:ring-2 focus:ring-indigo-100"
                  type="text"
                  placeholder="Search by order, product, customer…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <FiFilter className="text-[#9090b0] shrink-0" size={14} />
                <select
                  className="px-3 py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-xs font-semibold text-[#1e1b4b] outline-none cursor-pointer focus:border-[#5a46c2] appearance-none"
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
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
                Filter
                {activeFilters > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                    style={{ background: "#5a46c2" }}>
                    {activeFilters}
                  </span>
                )}
              </button>
            </div>

            {showFilters && (
              <div className="sm:hidden mt-3 flex flex-col gap-2">
                <select
                  className="w-full px-3 py-2.5 bg-[#f9f8ff] border-[1.5px] border-[#e5e0ff] rounded-xl text-xs font-semibold text-[#1e1b4b] outline-none focus:border-[#5a46c2] appearance-none"
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {activeFilters > 0 && (
                  <button
                    onClick={() => { setStatusFilter(""); setPage(1); }}
                    className="py-2 rounded-xl border border-[#fecdd3] text-[#e11d48] text-xs font-semibold hover:bg-[#ffe4e6] transition-all"
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
                    <td colSpan={8} className="text-center py-16 text-[#b0add0] text-sm">
                      No orders found.
                    </td>
                  </tr>
                ) : paginated.map((order) => (
                  <tr
                    key={order.order_id}
                    className="hover:bg-[#faf9ff] transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-semibold text-[#5a46c2]">{order.order_id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-[#1e1b4b] text-sm truncate max-w-40">{order.product_name}</p>
                        <p className="font-mono text-[10px] text-[#b0add0] mt-0.5">{order.product_id}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-[#1e1b4b] text-sm">{order.user_name}</p>
                        <p className="font-mono text-[10px] text-[#b0add0] mt-0.5">{order.user_id}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-[#1e1b4b]">{order.quantity}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-[#1e1b4b]">${order.total_amount.toFixed(2)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.order_status} />
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-[#6d6a8a] font-medium whitespace-nowrap">
                        {new Date(order.order_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setModal({ type: "view", order })}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9090b0] hover:bg-[#f0eeff] hover:text-[#5a46c2] transition-all"
                          title="View"
                        >
                          <FiEye size={15} />
                        </button>
                        <button
                          onClick={() => setModal({ type: "delete", order })}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9090b0] hover:bg-[#ffe4e6] hover:text-[#e11d48] transition-all"
                          title="Delete"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-[#f0eeff]">
            {paginated.length === 0 ? (
              <div className="text-center py-12 text-[#b0add0] text-sm">No orders found.</div>
            ) : paginated.map((order) => (
              <div
                key={order.order_id}
                className="p-4 hover:bg-[#faf9ff] transition-colors"
                onClick={() => setModal({ type: "view", order })}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[11px] font-bold text-[#5a46c2]">{order.order_id}</span>
                      <span className="text-[10px] text-[#b0add0]">·</span>
                      <span className="font-mono text-[10px] text-[#b0add0]">{order.product_id}</span>
                    </div>
                    <p className="font-semibold text-[#1e1b4b] text-sm truncate">{order.product_name}</p>
                  </div>
                  <StatusBadge status={order.order_status} />
                </div>

                <div className="grid grid-cols-3 gap-2 my-3">
                  <div className="bg-[#f9f8ff] border border-[#f0eeff] rounded-xl px-2.5 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#b0add0] mb-0.5">Customer</p>
                    <p className="text-xs font-semibold text-[#1e1b4b] truncate">{order.user_name.split(" ")[0]}</p>
                  </div>
                  <div className="bg-[#f9f8ff] border border-[#f0eeff] rounded-xl px-2.5 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#b0add0] mb-0.5">Qty</p>
                    <p className="text-xs font-semibold text-[#1e1b4b]">{order.quantity} units</p>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-2.5 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-indigo-300 mb-0.5">Total</p>
                    <p className="text-xs font-bold text-[#5a46c2] font-mono">${order.total_amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[10px] text-[#9090b0] font-medium">
                    {new Date(order.order_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setModal({ type: "view", order }); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#e5e0ff] text-[#5a46c2] text-xs font-semibold hover:bg-[#f0eeff] transition-all active:scale-95"
                    >
                      <FiEye size={12} /> View
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setModal({ type: "delete", order }); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#fecdd3] text-[#e11d48] text-xs font-semibold hover:bg-[#ffe4e6] transition-all active:scale-95"
                    >
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-between items-center px-4 sm:px-5 py-4 border-t border-[#f0eeff] gap-3">
            <span className="text-[0.75rem] text-[#9090b0] font-medium">
              {filtered.length === 0
                ? "No results"
                : `Showing ${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, filtered.length)} of ${filtered.length} orders`}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="w-8 h-8 flex items-center justify-center border-[1.5px] border-[#e5e0ff] rounded-lg text-[#6d6a8a] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#5a46c2] hover:text-[#5a46c2] transition-all"
              >
                <FiChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-[0.8rem] font-bold transition-all ${
                    page === n
                      ? "text-white shadow-[0_2px_8px_rgba(90,70,194,0.3)]"
                      : "bg-white border-[1.5px] border-[#e5e0ff] text-[#6d6a8a] hover:border-[#5a46c2] hover:text-[#5a46c2]"
                  }`}
                  style={page === n ? { background: "linear-gradient(135deg,#5a46c2,#4838a3)" } : {}}
                >
                  {n}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="w-8 h-8 flex items-center justify-center border-[1.5px] border-[#e5e0ff] rounded-lg text-[#6d6a8a] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#5a46c2] hover:text-[#5a46c2] transition-all"
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {modal?.type === "view" && (
        <Modal title="Order Details" onClose={closeModal}>
          <OnlineOrderView order={modal.order} onClose={closeModal} />
        </Modal>
      )}
      {modal?.type === "delete" && (
        <Modal title="Delete Order" onClose={closeModal}>
          <DeleteOrderView order={modal.order} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}