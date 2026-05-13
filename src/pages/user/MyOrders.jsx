import React, { useState } from 'react';

// ── DATA MAPPING (Simulating your SQL tables) ──
const dummyOrders = [
  {
    order_id: "DNP-10248",
    order_date: "May 9, 2026",
    status: "Processing",
    total_amount: 84.00,
    items_summary: "Geometric Vase Set", // From products.p_name
    shipping_address: "742 Evergreen Ter, Springfield, IL 62704", // From sa.cus_address
    items_detail: [
      { name: "Geometric Vase Set", quantity: 1, price: 84.00 } // From orders_items
    ],
    timeline: [
      { label: "Order placed", date: "May 9", completed: true },
      { label: "Processing", date: "May 10", completed: true },
      { label: "Shipped", date: "", completed: false },
      { label: "Delivered", date: "", completed: false },
    ]
  },
  {
    order_id: "DNP-10245",
    order_date: "May 7, 2026",
    status: "Shipped",
    total_amount: 32.00,
    items_summary: "Custom Phone Stand",
    shipping_address: "123 Tech Lane, Austin, TX 78701",
    items_detail: [{ name: "Custom Phone Stand", quantity: 1, price: 32.00 }],
    timeline: [
      { label: "Order placed", date: "May 7", completed: true },
      { label: "Processing", date: "May 8", completed: true },
      { label: "Shipped", date: "May 9", completed: true },
      { label: "Delivered", date: "", completed: false },
    ]
  }
];

export default function OrdersDashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen text-slate-600 font-sans">
      {/* CSS to hide scrollbars globally for the modal area */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">My Orders</h1>
          <p className="text-xs sm:text-sm text-slate-400">Manage and track your purchases.</p>
        </div>

        {/* MOBILE VIEW: Vertical Cards */}
        <div className="space-y-4 sm:hidden">
          {dummyOrders.map((order) => (
            <div key={order.order_id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                  <p className="font-bold text-slate-800 text-sm">#{order.order_id}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                  <p className="text-xs font-medium">{order.order_date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                  <p className="text-xs font-bold text-slate-800">${order.total_amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                 <p className="text-xs text-slate-500 truncate pr-4">{order.items_summary}</p>
                 <button onClick={() => setSelectedOrder(order)} className="text-indigo-500 font-bold text-xs flex items-center gap-1 shrink-0 bg-indigo-50 px-2 py-1 rounded-md">
                  <ViewIcon /> View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: Table */}
        <div className="hidden sm:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyOrders.map((order) => (
                <tr key={order.order_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-slate-800 text-sm">#{order.order_id}</td>
                  <td className="px-6 py-5 text-sm">{order.order_date}</td>
                  <td className="px-6 py-5 text-sm text-slate-500">{order.items_summary}</td>
                  <td className="px-6 py-5">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-5 font-bold text-slate-800 text-sm">${order.total_amount.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <button onClick={() => setSelectedOrder(order)} className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-colors">
                      <ViewIcon /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL (Scrollbar Hidden) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in zoom-in duration-150 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-slate-100 shrink-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-800">Order #{selectedOrder.order_id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-300 hover:text-slate-500 text-xl p-1">✕</button>
            </div>

            {/* Added 'no-scrollbar' class here */}
            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto no-scrollbar">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Placed on</p>
                  <p className="font-semibold text-slate-800 text-sm">{selectedOrder.order_date}</p>
                </div>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Items</p>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  {selectedOrder.items_detail.map((item, i) => (
                    <div key={i} className="p-4 flex justify-between items-center border-b border-slate-50 last:border-0 bg-slate-50/20">
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{item.name}</p>
                        <p className="text-[11px] text-slate-400">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-slate-800 text-sm">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="bg-slate-50 p-4 flex justify-between items-center">
                    <span className="font-bold text-slate-700 text-sm">Total</span>
                    <span className="font-bold text-slate-900 text-lg">${selectedOrder.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Shipping Address</p>
                <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl bg-white text-slate-500 text-sm italic shadow-sm leading-relaxed">
                  <LocationIcon />
                  {selectedOrder.shipping_address}
                </div>
              </div>

              <div className="space-y-4 pb-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Timeline</p>
                <div className="space-y-4">
                  {selectedOrder.timeline.map((step, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${step.completed ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'}`}>
                          {step.completed && <CheckIcon />}
                        </div>
                        <span className={`text-xs sm:text-sm ${step.completed ? 'text-slate-800 font-medium' : 'text-slate-300'}`}>{step.label}</span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium">{step.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── HELPER COMPONENTS ──
const getStatusBadge = (status) => {
  const styles = {
    "Processing": "bg-purple-50 text-purple-500 border-purple-100 dot-purple-500",
    "Shipped": "bg-blue-50 text-blue-500 border-blue-100 dot-blue-500",
    "Delivered": "bg-green-50 text-green-500 border-green-100 dot-green-500",
    "Completed": "bg-green-50 text-green-500 border-green-100 dot-green-500",
    "Cancelled": "bg-red-50 text-red-500 border-red-100 dot-red-500",
    "Pending": "bg-yellow-50 text-yellow-500 border-yellow-100 dot-yellow-500",
  };
  const active = styles[status] || "bg-slate-50 text-slate-500 border-slate-100 dot-slate-400";
  const dotColor = active.split(' ').pop().replace('dot-', 'bg-');
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${active.split(' ').slice(0,3).join(' ')}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

const ViewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);