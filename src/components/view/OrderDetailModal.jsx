import React from "react";
import Modal from "../../model/Modal";

const TIMELINE_ORDER = ["Order placed", "Processing", "Shipped", "Delivered"];

const STATUS_STYLES = {
  Processing: "bg-charm-bg text-accent border-charm-border dot-accent",
  Shipped: "bg-blue-50 text-blue-600 border-blue-200 dot-blue-500",
  Delivered: "bg-green-50 text-charm-green border-green-200 dot-charm-green",
  Completed: "bg-green-50 text-charm-green border-green-200 dot-charm-green",
  Cancelled: "bg-red-50 text-red-600 border-red-200 dot-red-500",
  Pending: "bg-yellow-50 text-yellow-600 border-yellow-200 dot-yellow-500",
};

const getStatusBadge = (status) => {
  const activeStyle = STATUS_STYLES[status] || "bg-gray-50 text-gray-700 border-gray-200 dot-gray-500";
  const classes = activeStyle.split(" ");
  const bg = classes[0];
  const text = classes[1];
  const border = classes[2];
  const dotColor = classes[3].replace("dot-", "bg-");

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${bg} ${text} ${border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
};

const getCompletedTimelineIndex = (status) => {
  if (status === "Cancelled") return 0;
  if (status === "Processing") return 1;
  if (status === "Shipped") return 2;
  if (status === "Delivered" || status === "Completed") return 3;
  return 0;
};

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const mainItem = order.items_detail?.[0];
  const completedIndex = getCompletedTimelineIndex(order.status);

  return (
    <Modal title={`Order #${order.order_id}`} onClose={onClose}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 items-start">
          <div className="w-full h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
            <img
              src={mainItem?.img_url || "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80"}
              alt={mainItem?.name || "Product"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Placed on</p>
                <p className="text-sm font-semibold text-slate-800">{order.order_date}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Order ID</p>
                <p className="font-semibold text-slate-800">{order.order_id}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total</p>
                <p className="font-semibold text-slate-800">${order.total_amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Product Details</p>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            {order.items_detail.map((item, index) => (
              <div key={index} className="flex items-center gap-4 px-4 py-4 border-b border-slate-100 last:border-0 bg-white">
                <img
                  src={item.img_url || mainItem?.img_url}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-50"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                  <p className="text-xs text-slate-400">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold text-slate-800 text-sm">${item.price.toFixed(2)}</p>
              </div>
            ))}
            <div className="flex items-center justify-between bg-slate-50 px-4 py-4">
              <span className="font-bold text-slate-700 text-sm">Total</span>
              <span className="font-bold text-slate-900 text-lg">${order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Shipping Address</p>
          <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-2xl bg-white text-slate-700 text-sm leading-relaxed">
            <span className="mt-0.5 shrink-0 text-slate-400">📍</span>
            <span>{order.shipping_address}</span>
          </div>
        </section>

        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Timeline</p>
          <div className="space-y-3">
            {TIMELINE_ORDER.map((step, index) => {
              const active = index <= completedIndex;
              const entry = order.timeline.find((timelineItem) => timelineItem.label === step);

              return (
                <div key={step} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white"}`}>
                      {active ? <CheckIcon /> : null}
                    </span>
                    <span className={`text-sm ${active ? "text-slate-800 font-medium" : "text-slate-300"}`}>{step}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{entry?.date || ""}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Modal>
  );
}

const CheckIcon = () => (
  <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
