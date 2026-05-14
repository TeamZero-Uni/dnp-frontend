import React, { useState, useEffect } from 'react'
import OrderDetailModal from '../../components/view/OrderDetailModal'
import { getMyOrdersAPI } from '../../api/userOrdersApi'

const getStatusBadge = (status) => {
  const styles = {
    PENDING:    "bg-yellow-50 text-yellow-500 border-yellow-100 dot-yellow-500",
    CONFIRMED:  "bg-blue-50 text-blue-500 border-blue-100 dot-blue-500",
    SHIPPED:    "bg-indigo-50 text-indigo-500 border-indigo-100 dot-indigo-500",
    DELIVERED:  "bg-green-50 text-green-500 border-green-100 dot-green-500",
    CANCELLED:  "bg-red-50 text-red-500 border-red-100 dot-red-500",
    RETURNED:   "bg-orange-50 text-orange-500 border-orange-100 dot-orange-500",
  }

  const statusKey = String(status || "").toUpperCase()
  const active = styles[statusKey] || "bg-slate-50 text-slate-500 border-slate-100 dot-slate-400"
  const dotColor = active.split(" ").pop().replace("dot-", "bg-")
  const label = statusKey ? statusKey.charAt(0) + statusKey.slice(1).toLowerCase() : "Unknown"

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${active.split(" ").slice(0, 3).join(" ")}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  )
}

const ViewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

// ── transform API data to match your modal's expected shape ──
const transformOrder = (order) => {
  const items = order.items || []
  const firstItem = items[0]
  const product = firstItem?.product

  return {
    order_id: order.order_id,
    order_date: order.order_date
      ? new Date(order.order_date).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric"
        })
      : "N/A",
    status: order.status
      ? order.status.charAt(0) + order.status.slice(1).toLowerCase()
      : "Unknown",
    total_amount: parseFloat(order.total_amount) || 0,
    payment_method: order.payment_method,

    // for list view
    items_summary: product?.p_name || "Order",

    // for modal — shipping address as string
    shipping_address: order.shippingAddress
      ? `${order.shippingAddress.cus_address}, ${order.shippingAddress.cus_city}, ${order.shippingAddress.cus_state} ${order.shippingAddress.cus_postal_code}`
      : "No address available",

    // for modal — items detail (guarded against empty array)
    items_detail: items.map(item => ({
      name: item.product?.p_name || "Product",
      quantity: item.quantity,
      price: parseFloat(item.price) || 0,
      img_url: item.product?.images?.[0]?.img_url || "",
    })),

    // for modal — timeline
    timeline: (order.timeline || []).map(t => ({
      label: t.label === "Pending" ? "Order placed" : t.label,
      date: t.date
        ? new Date(t.date).toLocaleDateString("en-US", {
            month: "short", day: "numeric"
          })
        : "",
      completed: t.done,
    })),
  }
}

// ── Placeholder image component when no image is available ──
const ProductImage = ({ src, alt, className }) => (
  <img
    src={src || "https://placehold.co/100x100?text=No+Image"}
    alt={alt || "Product"}
    className={className}
    onError={(e) => {
      e.target.onerror = null
      e.target.src = "https://placehold.co/100x100?text=No+Image"
    }}
  />
)

export default function MyOrders() {
  const [orders, setOrders]               = useState([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrdersAPI()
        console.log("RAW API DATA:", JSON.stringify(data[0], null, 2))
        const transformed = (data || []).map(transformOrder)
        setOrders(transformed)
      } catch (err) {
        setError("Failed to load orders. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // ── Loading ──
  if (loading) return (
    <div className="p-6 flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-sm">Loading your orders...</p>
      </div>
    </div>
  )

  // ── Error ──
  if (error) return (
    <div className="p-6 flex items-center justify-center min-h-[300px]">
      <div className="text-center space-y-2">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-indigo-500 underline"
        >
          Try again
        </button>
      </div>
    </div>
  )

  // ── Empty ──
  if (orders.length === 0) return (
    <div className="p-6 flex items-center justify-center min-h-[300px]">
      <div className="text-center space-y-2">
        <p className="text-slate-500 font-medium">No orders yet</p>
        <p className="text-sm text-slate-400">Your orders will appear here once you place one.</p>
      </div>
    </div>
  )

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">My Orders</h1>
        </div>

        {/* ── MOBILE VIEW ── */}
        <div className="space-y-4 sm:hidden">
          {orders.map((order) => {
            const firstItem = order.items_detail[0]
            return (
              <div key={order.order_id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</p>
                    <p className="font-bold text-slate-800 text-sm truncate">{order.items_summary}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="flex items-center gap-3 border-t border-slate-50 pt-3">
                  <ProductImage
                    src={firstItem?.img_url}
                    alt={firstItem?.name}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{order.items_summary}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="text-xs font-medium">{order.order_date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                    <p className="text-xs font-bold text-slate-800">Rs {order.total_amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                  <p className="text-xs text-slate-500 truncate pr-4">{order.items_summary}</p>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-indigo-500 font-bold text-xs flex items-center gap-1 shrink-0 bg-indigo-50 px-2 py-1 rounded-md"
                  >
                    <ViewIcon /> View
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── DESKTOP VIEW ── */}
        <div className="hidden sm:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const firstItem = order.items_detail[0]
                return (
                  <tr key={order.order_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <ProductImage
                        src={firstItem?.img_url}
                        alt={firstItem?.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                      />
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700 font-medium">
                      <div>
                        <p>{order.items_summary}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-5 font-bold text-slate-800 text-sm">Rs {order.total_amount.toFixed(2)}</td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        <ViewIcon /> View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* ── MODAL — uses already fetched data, no new API call ── */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  )
}