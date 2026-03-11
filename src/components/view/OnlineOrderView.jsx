import React from 'react';
import { Package, Phone, MapPin, CreditCard, Calendar, User, Hash, ChevronDown } from 'lucide-react';

export default function OnlineOrderView({ order }) {
  if (!order) return null;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    console.log("UPDATE STATUS:", {
      orderId: order.order_id,
      previousStatus: order.order_status,
      newStatus: newStatus,
      updatedAt: new Date().toISOString()
    });
  };

  const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

  const statusStyles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <Hash size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Order ID</p>
              <p className="text-sm font-bold text-gray-800">{order.order_id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Date</p>
              <p className="text-sm font-bold text-gray-800">{order.order_date}</p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <label className="absolute -top-2 left-2 px-1 bg-gray-50 text-[9px] font-bold text-gray-400 uppercase z-10">
            Change Status
          </label>
          <div className="relative">
            <select
              defaultValue={order.order_status}
              onChange={handleStatusChange}
              className={`appearance-none pl-3 pr-8 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${statusStyles[order.order_status]}`}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status} className="bg-white text-gray-800 capitalize">
                  {status.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User size={14} /> Customer Details
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-2">
              <p className="text-sm font-semibold text-gray-800">{order.user_name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Phone size={12} /> {order.shipping_phone}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin size={14} /> Shipping Address
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-100 text-sm text-gray-600 leading-relaxed">
              <p className="font-medium text-gray-800">{order.shipping_name}</p>
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_state} {order.shipping_pincode}</p>
              <p className="font-medium text-gray-400 mt-1">{order.shipping_country}</p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Package size={14} /> Order Items
            </h3>
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-gray-800">{order.product_name}</p>
                  <p className="text-xs text-gray-500 font-medium">Quantity: {order.quantity}</p>
                </div>
                <p className="text-sm font-bold text-indigo-600">${order.total_amount.toFixed(2)}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CreditCard size={14} /> Payment Information
            </h3>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-indigo-700 font-semibold uppercase">{order.payment_method}</p>
                <p className="text-[10px] text-indigo-400">Transaction completed via Card</p>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  order.payment_status === 'paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                }`}>
                  {order.payment_status.toUpperCase()}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
