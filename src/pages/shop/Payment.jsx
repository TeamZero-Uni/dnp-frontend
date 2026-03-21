import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
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
  } = location.state || {};

  const [orderNo]  = useState(orderNumber);
  const [delivery] = useState(deliveryDate);

  const [ring, setRing] = useState(false);
  useEffect(() => { setTimeout(() => setRing(true), 100); }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 font-sans bg-primary">
      <div className="w-full max-w-lg">

        {/* ── Animated check icon ── */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center
            border-[3px] border-green-500 bg-green-50 shadow-[0_0_0_8px_#dcfce766]">
            <FaCheckCircle size={36} className="text-green-500" />
          </div>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-black mb-2 text-secondary">
            Order Placed Successfully!
          </h1>
          <p className="text-sm font-medium text-secondary/60">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </motion.div>

        {/* ── Order info card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-summery-border bg-white p-5 mb-3"
        >
          <p className="text-sm font-black mb-1 text-secondary">
            Order Number: <span className="text-accent">{orderNo}</span>
          </p>
          <p className="text-sm font-black text-secondary">
            Estimated Delivery: <span className="text-secondary">{delivery}</span>
          </p>
        </motion.div>

        {/* ── Items + total card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-summery-border bg-white p-5 mb-6"
        >
          {cartItems.length > 0 ? (
            <div className="space-y-2 mb-4">
              {cartItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.image && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-item-border bg-item-bg">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <p className="text-sm font-bold flex-1 text-secondary">
                    {item.name}
                    <span className="text-accent/60"> · Qty: {item.quantity}</span>
                  </p>
                  <span className="text-sm font-black text-secondary">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-bold mb-4 text-secondary/50">
              Order items not available
            </p>
          )}

          <div className="h-px mb-4 bg-accent" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-secondary">Total Paid:</span>
            <span className="text-lg font-black text-secondary">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* ── Continue Shopping ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-center"
        >
          <Link
            to="/shop"
            className="text-sm font-bold underline underline-offset-2 transition-opacity hover:opacity-70 text-accent"
          >
            Continue Shopping
          </Link>
        </motion.div>

      </div>
    </div>
  );
}