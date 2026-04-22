import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrash, FaMinus, FaPlus, FaShoppingBag,
  FaArrowLeft, FaTruck, FaLock,
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

/* ─────────────── shipping options ──────────────────────────── */
const SHIPPING_OPTIONS = [
  { label: 'Free Shipping',     value: 0,   time: '5–7 business days' },
  { label: 'Standard Delivery', value: 300, time: '2–4 business days' },
  { label: 'Express Delivery',  value: 700, time: 'Next business day'  },
];

/* ─────────────── Cart ───────────────────────────────────────── */
export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [shipping, setShipping] = useState(0);

  const subtotal  = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const total     = subtotal + shipping;
  const itemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 font-sans bg-charm-bg text-secondary">
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-between flex-wrap gap-3 mb-8"
        >
          <div>
            <h1 className="text-2xl font-black tracking-tight text-charm-text">
              Shopping Cart
            </h1>
            <p className="text-xs font-bold mt-1 text-accent">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-xs text-accent font-black uppercase tracking-wider transition-opacity hover:opacity-70"
          >
            <FaArrowLeft size={10} /> Continue Shopping
          </Link>
        </motion.div>

        {/* ── Empty State ── */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-charm-border bg-charm-card text-center py-20 px-8 shadow-[0_4px_24px_#894def14]"
          >
            <div className="w-16 h-16 rounded-2xl bg-charm-subtle flex items-center justify-center mx-auto mb-4">
              <FaShoppingBag size={24} className="text-accent" />
            </div>
            <p className="text-base font-black mb-1 text-charm-text">Your cart is empty</p>
            <p className="text-xs font-bold mb-6 text-charm-mid">You haven't added anything yet</p>
            <Link to="/shop">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black rounded-xl uppercase tracking-wider shadow-md btn-color">
                <FaShoppingBag size={11} /> Start Shopping
              </button>
            </Link>
          </motion.div>

        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ════ LEFT — Cart Items ════ */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 }}
              className="flex-1 min-w-0"
            >
              {/* column labels */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 mb-2">
                {['Product', 'Quantity', 'Total'].map((l, i) => (
                  <span
                    key={l}
                    className={`text-[9px] font-black uppercase tracking-widest text-charm-mid ${i === 1 ? 'text-center w-24' : i === 2 ? 'text-right w-20' : ''}`}
                  >{l}</span>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${item.color}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 48, scale: 0.96 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-2xl border border-charm-border bg-charm-card p-4 transition-all duration-200
                        shadow-[0_2px_10px_#894def0a] hover:border-accent/50 hover:shadow-[0_6px_28px_#894def1a]"
                    >
                      <div className="flex items-center gap-4">

                        {/* image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-charm-border bg-charm-subtle">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* name + color + unit price */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-black truncate leading-tight mb-1.5 text-charm-text">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-charm-border bg-charm-subtle text-accent">
                              <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-charm-mid"
                                style={{
                                  background: item.color === 'White' ? '#fff' : item.color === 'Black' ? '#1e293b' : item.color,
                                }}
                              />
                              {item.color}
                            </span>
                            <span className="text-[10px] font-bold text-charm-mid">
                              Rs. {item.price.toLocaleString()} each
                            </span>
                          </div>
                        </div>

                        {/* qty stepper */}
                        <div className="flex items-center rounded-xl overflow-hidden flex-shrink-0 border border-charm-border bg-charm-subtle">
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-accent transition-colors hover:bg-charm-border"
                          >
                            <FaMinus size={9} />
                          </button>
                          <span className="w-8 text-center text-xs font-black border-x border-charm-border text-charm-text">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-accent transition-colors hover:bg-charm-border"
                          >
                            <FaPlus size={9} />
                          </button>
                        </div>

                        {/* line total */}
                        <div className="text-right flex-shrink-0 w-20">
                          <p className="text-sm font-black text-charm-text">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        {/* delete */}
                        <button
                          onClick={() => removeFromCart(item.id, item.color)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl transition-all flex-shrink-0
                            text-charm-mid hover:text-rose-500 hover:bg-rose-50"
                        >
                          <FaTrash size={11} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-4">
                <Link to="/shop"
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider transition-opacity hover:opacity-70 text-charm-mid">
                  <FaArrowLeft size={9} /> Back to shop
                </Link>
              </div>
            </motion.div>

            {/* ════ RIGHT — Order Summary ════ */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              className="w-full lg:w-[420px] flex-shrink-0 sticky top-24"
            >
              <div className="rounded-2xl overflow-hidden border border-charm-border shadow-[0_10px_48px_#894def22]">

                {/* ── header ── */}
                <div className="px-6 py-5 border-b border-charm-border flex items-center gap-4 summary-header">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent/20">
                    <FaShoppingBag size={16} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black leading-none text-charm-text">Order Summary</h2>
                    <p className="text-[10px] mt-0.5 font-bold text-charm-accent2">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'} · Rs. {subtotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[9px] font-black uppercase tracking-wider text-charm-mid">Total</p>
                    <p className="text-lg font-black leading-tight text-charm-text">
                      Rs. {total.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* ── body ── */}
                <div className="px-6 py-5 space-y-5 bg-charm-card">

                  {/* Shipping options */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <FaTruck size={11} className="text-accent" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-charm-accent2">
                        Shipping
                      </span>
                    </div>
                    <div className="space-y-2">
                      {SHIPPING_OPTIONS.map(opt => (
                        <label
                          key={opt.value}
                          onClick={() => setShipping(opt.value)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all
                            ${shipping === opt.value
                              ? 'border-accent bg-charm-subtle shadow-[0_2px_12px_#894def18]'
                              : 'border-charm-border bg-[#faf8ff]'
                            }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                            ${shipping === opt.value ? 'border-accent' : 'border-charm-mid'}`}>
                            {shipping === opt.value && (
                              <div className="w-2 h-2 rounded-full bg-accent" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black leading-none text-charm-text">{opt.label}</p>
                            <p className="text-[9px] font-bold mt-0.5 text-charm-mid">{opt.time}</p>
                          </div>
                          <span className={`text-xs font-black flex-shrink-0 ${opt.value === 0 ? 'text-charm-green' : 'text-charm-text'}`}>
                            {opt.value === 0 ? 'Free' : `Rs. ${opt.value}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-charm-border" />

                  {/* Price breakdown */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-charm-mid">Subtotal</span>
                      <span className="text-xs font-black text-charm-text">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-charm-mid">Shipping</span>
                      <span className={`text-xs font-black ${shipping === 0 ? 'text-charm-green' : 'text-charm-text'}`}>
                        {shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}
                      </span>
                    </div>

                    {/* total row */}
                    <div className="flex justify-between items-center rounded-xl px-4 py-3.5 mt-1 total-row">
                      <span className="text-sm font-black uppercase tracking-wider text-charm-text">Total</span>
                      <span className="text-xl font-black text-accent">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <Link to="/checkout">
                    <button className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] btn-color shadow-[0_8px_28px_#5a46c244]">
                      <FaLock size={10} /> Proceed to Checkout
                    </button>
                  </Link>

                  {/* trust row */}
                  <div className="flex justify-center gap-6 pt-1">
                    {['🔒 Secure', '✦ Trusted', '🚚 Fast'].map(b => (
                      <span key={b} className="text-[9px] font-bold text-charm-mid">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
}