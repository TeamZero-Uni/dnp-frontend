import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

/* ─────────────── helpers ────────────────────────────────────── */
function generateOrderNumber() {
  return 'DNP-' + Math.floor(10000 + Math.random() * 90000);
}

function getEstimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
  });
}

/* ─────────────── Payment (Order Success) ────────────────────── */
export default function Payment() {
  const location = useLocation();

  const {
    cartItems    = [],
    total        = 0,
    orderNumber  = generateOrderNumber(),
    deliveryDate = getEstimatedDelivery(),
    paymentMethod = 'cod',
  } = location.state || {};

  const [orderNo] = useState(orderNumber);
  const [delivery] = useState(deliveryDate);
  const [ring, setRing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRing(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 font-sans bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_58%)]">
      <div className="w-full max-w-2xl">

        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="rounded-[28px] border border-white/70 bg-white/90 backdrop-blur-sm shadow-[0_24px_70px_#22c55e14] overflow-hidden"
        >
          <div className="px-6 sm:px-8 pt-8 pb-6 bg-[linear-gradient(180deg,_rgba(34,197,94,0.12),_rgba(255,255,255,0))]">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              className="flex justify-center"
            >
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center border-[3px] border-emerald-500 bg-emerald-50 ${ring ? 'shadow-[0_0_0_12px_#dcfce780]' : ''}`}>
                <FaCheckCircle size={40} className="text-emerald-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-center mt-6"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-2">Order completed</p>
              <h1 className="text-3xl font-black tracking-tight text-secondary">Your order is confirmed</h1>
              <p className="mt-3 text-sm font-medium text-secondary/60 max-w-md mx-auto">
                Thank you for your purchase. We have secured your order and prepared it for processing.
              </p>
            </motion.div>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            <div className="grid gap-3 sm:grid-cols-3 mb-5">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Order Number</p>
                <p className="text-sm font-black text-secondary break-all">{orderNo}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Delivery</p>
                <p className="text-sm font-black text-secondary">{delivery}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Payment</p>
                <p className="text-sm font-black text-secondary">{paymentMethod === 'card' ? 'Card' : 'Cash on delivery'}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_12px_40px_#0f172a08] overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/70">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <FaShoppingBag size={14} />
                </div>
                <div>
                  <p className="text-sm font-black text-secondary">Purchased items</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{itemCount} item{itemCount === 1 ? '' : 's'} in this order</p>
                </div>
              </div>

              <div className="px-5 py-4 space-y-3">
                {cartItems.length > 0 ? cartItems.map((item, i) => (
                  <div key={`${item.id}-${item.color}-${i}`} className="flex items-center gap-3">
                    {item.image && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-item-border bg-item-bg">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black truncate text-secondary">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Qty: {item.quantity} · {item.color}</p>
                    </div>
                    <span className="text-sm font-black text-secondary">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                )) : (
                  <p className="text-sm font-medium text-secondary/50">Order items not available</p>
                )}
              </div>

              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
                <span className="text-sm font-black uppercase tracking-widest text-secondary">Total Paid</span>
                <span className="text-2xl font-black text-emerald-600">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-color text-white text-xs font-black uppercase tracking-widest shadow-[0_10px_24px_#5a46c233]"
              >
                <FaArrowRight size={11} /> Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}