import { useState } from "react";
import { FiSearch, FiFilter, FiEye, FiTrash2, FiAlertTriangle, FiChevronLeft, FiChevronRight, FiShoppingBag, FiPackage, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Modal from "../../model/Modal";
import OrderView from "../../components/view/OrderView";
import DeleteOrderView from "../../components/view/DeleteOrderView";

const INITIAL_ORDERS = [
  { order_id: "ORD-2024-001", product_id: "PRD-003", user_id: "USR-101", product_name: "Running Shoes",       total_amount: 179.98,  order_status: "delivered", order_date: "2024-01-15", quantity: 2, payment_method: "card", payment_status: "paid",     notes: "Leave at door",           shipping_name: "Ashan Perera",        shipping_phone: "+94 77 123 4567", shipping_address: "45/B Temple Road",     shipping_city: "Colombo",      shipping_state: "Western",       shipping_pincode: "00300", shipping_country: "LK" },
  { order_id: "ORD-2024-002", product_id: "PRD-001", user_id: "USR-102", product_name: "Premium Watch",       total_amount: 299.99,  order_status: "shipped",   order_date: "2024-01-18", quantity: 1, payment_method: "card", payment_status: "paid",     notes: "",                         shipping_name: "Nuwan Silva",         shipping_phone: "+94 71 987 6543", shipping_address: "12 Galle Road",        shipping_city: "Kandy",        shipping_state: "Central",       shipping_pincode: "20000", shipping_country: "LK" },
  { order_id: "ORD-2024-003", product_id: "PRD-002", user_id: "USR-103", product_name: "Wireless Headphones", total_amount: 149.99,  order_status: "pending",   order_date: "2024-01-20", quantity: 1, payment_method: "cod",  payment_status: "unpaid",   notes: "Call before delivery",    shipping_name: "Sanduni Jayawardena", shipping_phone: "+94 76 555 0011", shipping_address: "7 Rajapaksha Mawatha", shipping_city: "Galle",        shipping_state: "Southern",      shipping_pincode: "80000", shipping_country: "LK" },
  { order_id: "ORD-2024-004", product_id: "PRD-005", user_id: "USR-104", product_name: "Camera Lens",         total_amount: 1199.98, order_status: "confirmed", order_date: "2024-01-21", quantity: 2, payment_method: "card", payment_status: "paid",     notes: "",                         shipping_name: "Kasun Fernando",      shipping_phone: "+94 75 234 5678", shipping_address: "22 Hill Street",       shipping_city: "Nuwara Eliya", shipping_state: "Central",       shipping_pincode: "22200", shipping_country: "LK" },
  { order_id: "ORD-2024-005", product_id: "PRD-004", user_id: "USR-105", product_name: "Leather Wallet",      total_amount: 49.99,   order_status: "cancelled", order_date: "2024-01-22", quantity: 1, payment_method: "cod",  payment_status: "unpaid",   notes: "Changed mind",            shipping_name: "Priya Kumari",        shipping_phone: "+94 77 888 9900", shipping_address: "3 Beach Road",         shipping_city: "Negombo",      shipping_state: "Western",       shipping_pincode: "11500", shipping_country: "LK" },
  { order_id: "ORD-2024-006", product_id: "PRD-006", user_id: "USR-106", product_name: "Sport Sneakers",      total_amount: 240.00,  order_status: "returned",  order_date: "2024-01-10", quantity: 2, payment_method: "card", payment_status: "refunded", notes: "Wrong size",              shipping_name: "Dinesh Bandara",      shipping_phone: "+94 70 444 3322", shipping_address: "88 Main Street",       shipping_city: "Matara",       shipping_state: "Southern",      shipping_pincode: "81000", shipping_country: "LK" },
  { order_id: "ORD-2024-007", product_id: "PRD-001", user_id: "USR-107", product_name: "Premium Watch",       total_amount: 299.99,  order_status: "shipped",   order_date: "2024-01-23", quantity: 1, payment_method: "cod",  payment_status: "unpaid",   notes: "",                         shipping_name: "Malini Rathnayake",   shipping_phone: "+94 72 111 2233", shipping_address: "15 Lake Drive",        shipping_city: "Kurunegala",   shipping_state: "North Western", shipping_pincode: "60000", shipping_country: "LK" },
  { order_id: "ORD-2024-008", product_id: "PRD-003", user_id: "USR-108", product_name: "Running Shoes",       total_amount: 89.99,   order_status: "delivered", order_date: "2024-01-25", quantity: 1, payment_method: "cod",  payment_status: "unpaid",   notes: "Rider forgot to collect", shipping_name: "Roshan Wijesinghe",   shipping_phone: "+94 71 333 7788", shipping_address: "4 Main Road",          shipping_city: "Jaffna",       shipping_state: "Northern",      shipping_pincode: "40000", shipping_country: "LK" },
];

const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"];

const STATUS_CONFIG = {
  pending:   { label: "PENDING",   color: "bg-amber-100 text-amber-700",     dot: "bg-amber-500" },
  confirmed: { label: "CONFIRMED", color: "bg-blue-100 text-blue-700",       dot: "bg-blue-500" },
  shipped:   { label: "SHIPPED",   color: "bg-violet-100 text-violet-700",   dot: "bg-violet-500" },
  delivered: { label: "DELIVERED", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  cancelled: { label: "CANCELLED", color: "bg-rose-100 text-rose-600",       dot: "bg-rose-500" },
  returned:  { label: "RETURNED",  color: "bg-slate-100 text-slate-600",     dot: "bg-slate-400" },
};

const PAYMENT_CONFIG = {
  unpaid:   { label: "UNPAID",   color: "bg-orange-100 text-orange-700",   dot: "bg-orange-400" },
  paid:     { label: "PAID",     color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  refunded: { label: "REFUNDED", color: "bg-sky-100 text-sky-700",         dot: "bg-sky-400" },
  failed:   { label: "FAILED",   color: "bg-rose-100 text-rose-600",       dot: "bg-rose-500" },
};

const PER_PAGE = 6;
const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function Badge({ status, config }) {
  const item = config[status];
  if (!item) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${item.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

function FilterSelect({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 w-full sm:w-auto"
    >
      <option value="all">{placeholder}</option>
      {options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
    </select>
  );
}

/* ─── Mobile Order Card ─────────────────────────────── */
function MobileOrderCard({ order, onView, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const isCODUnpaid = order.payment_method === "cod" && order.payment_status === "unpaid";

  return (
    <div className={`bg-white rounded-xl border ${isCODUnpaid ? "border-l-4 border-l-orange-400 border-slate-100" : "border-slate-100"} shadow-sm overflow-hidden`}>
      {/* Card Header */}
      <div className="px-4 py-3 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold text-slate-800">{order.order_id}</span>
            {isCODUnpaid && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-md">
                <FiAlertTriangle size={9} /> COD DUE
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-700 mt-0.5">{order.shipping_name}</p>
          <p className="text-xs text-slate-400">{order.shipping_city} · {fmt(order.order_date)}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-slate-800">${order.total_amount.toFixed(2)}</p>
          <p className="text-xs text-slate-400 uppercase">{order.payment_method}</p>
        </div>
      </div>

      {/* Badges Row */}
      <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
        <Badge status={order.order_status} config={STATUS_CONFIG} />
        <Badge status={order.payment_status} config={PAYMENT_CONFIG} />
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-3 border-t border-slate-100 pt-3 space-y-1.5 text-sm text-slate-600">
          <div className="flex justify-between">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Product</span>
            <span className="font-medium text-right">{order.product_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Product ID</span>
            <span className="font-mono text-xs">{order.product_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Quantity</span>
            <span>{order.quantity}</span>
          </div>
          {order.notes && (
            <div className="flex justify-between gap-4">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wide shrink-0">Notes</span>
              <span className="text-right text-xs">{order.notes}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="px-4 py-2 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors py-1"
        >
          {expanded ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
          {expanded ? "Less" : "Details"}
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => onView(order)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <FiEye size={15} />
          </button>
          <button onClick={() => onDelete(order)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────── */
export default function OrderManagement() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const resetPage = (fn) => (val) => { fn(val); setPage(1); };

  const handleStatusChange = (id, status) =>
    setOrders((prev) => prev.map((o) => o.order_id === id ? { ...o, order_status: status } : o));

  const handleCODAction = (id, paymentStatus, note) =>
    setOrders((prev) => prev.map((o) => {
      if (o.order_id !== id) return o;
      const updated = { ...o, payment_status: paymentStatus };
      if (note) updated.notes = updated.notes ? `${updated.notes} · ${note}` : note;
      return updated;
    }));

  const handleDelete = (id) => { setOrders((prev) => prev.filter((o) => o.order_id !== id)); setModal(null); };

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      (o.order_id.toLowerCase().includes(q) || o.shipping_name.toLowerCase().includes(q) || o.product_name.toLowerCase().includes(q)) &&
      (statusFilter  === "all" || o.order_status    === statusFilter) &&
      (paymentFilter === "all" || o.payment_status  === paymentFilter) &&
      (methodFilter  === "all" || o.payment_method  === methodFilter)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const liveOrder = modal?.order ? orders.find((o) => o.order_id === modal.order.order_id) || modal.order : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex justify-between items-center">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg shadow-lg shadow-indigo-200">
              <FiPackage className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none">Inventory Hub</h1>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-medium uppercase tracking-wider">Management System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          {/* Controls */}
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-100 space-y-3">

            {/* Row 1: Search + mobile filter toggle */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search orders…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 bg-slate-50 placeholder:text-slate-400"
                />
              </div>
              {/* Mobile: filter toggle button */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="sm:hidden shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 relative"
              >
                <FiFilter size={14} />
                <span>Filter</span>
                {(statusFilter !== "all" || paymentFilter !== "all" || methodFilter !== "all") && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white" />
                )}
              </button>
            </div>

            {/* Row 2: Filters
                - Mobile: stacked full-width selects, collapsible
                - Desktop: inline row with filter icon */}
            {/* Desktop filters (always visible) */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              <FiFilter size={14} className="text-slate-400" />
              <FilterSelect value={statusFilter}  onChange={resetPage(setStatusFilter)}  placeholder="All Status"   options={ORDER_STATUSES.map((s) => [s, STATUS_CONFIG[s].label])} />
              <FilterSelect value={paymentFilter} onChange={resetPage(setPaymentFilter)} placeholder="All Payments" options={["unpaid", "paid", "refunded", "failed"].map((s) => [s, PAYMENT_CONFIG[s].label])} />
              <FilterSelect value={methodFilter}  onChange={resetPage(setMethodFilter)}  placeholder="All Methods"  options={[["cod", "COD"], ["card", "Online"]]} />
              {(statusFilter !== "all" || paymentFilter !== "all" || methodFilter !== "all") && (
                <button
                  onClick={() => { resetPage(setStatusFilter)("all"); resetPage(setPaymentFilter)("all"); resetPage(setMethodFilter)("all"); }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Mobile filters (collapsible) */}
            {filtersOpen && (
              <div className="sm:hidden flex flex-col gap-2">
                <FilterSelect value={statusFilter}  onChange={resetPage(setStatusFilter)}  placeholder="All Status"   options={ORDER_STATUSES.map((s) => [s, STATUS_CONFIG[s].label])} />
                <FilterSelect value={paymentFilter} onChange={resetPage(setPaymentFilter)} placeholder="All Payments" options={["unpaid", "paid", "refunded", "failed"].map((s) => [s, PAYMENT_CONFIG[s].label])} />
                <FilterSelect value={methodFilter}  onChange={resetPage(setMethodFilter)}  placeholder="All Methods"  options={[["cod", "COD"], ["card", "Online"]]} />
                {(statusFilter !== "all" || paymentFilter !== "all" || methodFilter !== "all") && (
                  <button
                    onClick={() => { resetPage(setStatusFilter)("all"); resetPage(setPaymentFilter)("all"); resetPage(setMethodFilter)("all"); }}
                    className="self-start text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 border border-indigo-200 rounded-lg bg-indigo-50"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Desktop Table — hidden on mobile */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-widest">
                  {["Order Details", "Customer", "Product", "Amount", "Order Status", "Payment", "Date"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 font-semibold">{h}</th>
                  ))}
                  <th className="text-center px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-slate-400">
                      <FiShoppingBag size={28} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No orders found</p>
                    </td>
                  </tr>
                ) : paginated.map((order) => {
                  const isCODUnpaid = order.payment_method === "cod" && order.payment_status === "unpaid";
                  return (
                    <tr key={order.order_id} className={`hover:bg-slate-50/60 transition-colors ${isCODUnpaid ? "border-l-[3px] border-l-orange-400" : ""}`}>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800 font-mono text-xs">{order.order_id}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Qty: {order.quantity}</p>
                        {isCODUnpaid && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-md mt-1">
                            <FiAlertTriangle size={9} /> COD DUE
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-700">{order.shipping_name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{order.shipping_city}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700">{order.product_name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{order.product_id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">${order.total_amount.toFixed(2)}</p>
                        <p className="text-xs text-slate-400 uppercase mt-0.5">{order.payment_method}</p>
                      </td>
                      <td className="px-6 py-4"><Badge status={order.order_status}  config={STATUS_CONFIG} /></td>
                      <td className="px-6 py-4"><Badge status={order.payment_status} config={PAYMENT_CONFIG} /></td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{fmt(order.order_date)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setModal({ type: "view", order })} title="View" className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                            <FiEye size={15} />
                          </button>
                          <button onClick={() => setModal({ type: "delete", order })} title="Delete" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards — visible only on mobile */}
          <div className="sm:hidden">
            {paginated.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <FiShoppingBag size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No orders found</p>
              </div>
            ) : (
              <div className="p-3 space-y-3">
                {paginated.map((order) => (
                  <MobileOrderCard
                    key={order.order_id}
                    order={order}
                    onView={(o) => setModal({ type: "view", order: o })}
                    onDelete={(o) => setModal({ type: "delete", order: o })}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              {filtered.length === 0
                ? "No results"
                : `${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, filtered.length)} of ${filtered.length}`}
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-colors ${p === page ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {modal?.type === "view" && liveOrder && (
        <Modal title={`Order — ${liveOrder.order_id}`} onClose={() => setModal(null)}>
          <OrderView order={liveOrder} onClose={() => setModal(null)} onStatusChange={handleStatusChange} onCODAction={handleCODAction} />
        </Modal>
      )}
      {modal?.type === "delete" && liveOrder && (
        <Modal title="Delete Order" onClose={() => setModal(null)}>
          <DeleteOrderView order={liveOrder} onClose={() => setModal(null)} onConfirm={() => handleDelete(liveOrder.order_id)} />
        </Modal>
      )}
    </div>
  );
}