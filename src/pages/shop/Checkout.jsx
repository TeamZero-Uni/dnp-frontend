import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaCheckCircle, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

/* ─────────────── reusable input ─────────────────────────────── */
function Field({ label, placeholder, value, onChange, type = 'text', required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-accent/70">
          {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold outline-none transition-all
          bg-white text-secondary border-[1.5px]
          ${focused
            ? 'border-accent shadow-[0_0_0_3px_#894def18]'
            : 'border-field-border'
          }`}
      />
    </div>
  );
}

/* ─────────────── Section heading ────────────────────────────── */
function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-1 h-5 rounded-full bg-accent" />
      <h2 className="text-sm font-black uppercase tracking-wider text-secondary">
        {children}
      </h2>
    </div>
  );
}

/* ─────────────── Checkout ───────────────────────────────────── */
export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', postalCode: '', phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardNumber,    setCardNumber]    = useState('');
  const [cardExpiry,    setCardExpiry]    = useState('');
  const [cardCVV,       setCardCVV]       = useState('');
  const [submitted,     setSubmitted]     = useState(false);
  const [errors,        setErrors]        = useState({});

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const subtotal = cartItems.reduce((a, i) => a + i.price * i.quantity, 0);
  const shipping = 350;
  const total    = subtotal + shipping;

  const validate = () => {
    const e = {};
    if (!form.email.trim())     e.email     = 'Required';
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim())  e.lastName  = 'Required';
    if (!form.address.trim())   e.address   = 'Required';
    if (!form.city.trim())      e.city      = 'Required';
    if (!form.phone.trim())     e.phone     = 'Required';
    if (paymentMethod === 'card') {
      if (!cardNumber.trim()) e.cardNumber = 'Required';
      if (!cardExpiry.trim()) e.cardExpiry = 'Required';
      if (!cardCVV.trim())    e.cardCVV    = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── UPDATED handleSubmit ──────────────────────────────────────
  // Generates order number + delivery date, clears the cart,
  // then navigates to /order-success and passes all data as state
  // so the Payment.jsx page can display it.
  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);

    // Generate order number e.g. "DNP-88502"
    const orderNumber = 'DNP-' + Math.floor(10000 + Math.random() * 90000);

    // Calculate estimated delivery date (7 days from today)
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const deliveryDate = d.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    });

    setTimeout(() => {
      clearCart?.();
      // ── Navigate to /order-success and pass order data as state ──
      navigate('/order-success', {
        state: {
          cartItems,    // array of ordered items
          total,        // final total amount
          orderNumber,  // e.g. "DNP-88502"
          deliveryDate, // e.g. "Friday, Oct 27, 2023"
        },
      });
    }, 1500);
  };
  // ─────────────────────────────────────────────────────────────

  /* ── Submitting overlay ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-10"
        >
          <div className="w-20 h-20 rounded-full order-success-icon flex items-center justify-center mx-auto mb-5">
            <FaCheckCircle size={36} className="text-accent" />
          </div>
          <h2 className="text-xl font-black mb-2 text-secondary">Order Placed!</h2>
          <p className="text-xs font-bold text-accent/60">Redirecting you shortly…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 font-sans bg-primary text-secondary">
      <div className="max-w-6xl mx-auto">

        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-accent">
            DNP 3D Hobby & Lobby
          </p>
          <h1 className="text-2xl font-black tracking-tight text-secondary">Checkout</h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ════ LEFT — Form ════ */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 }}
            className="flex-1 min-w-0 space-y-6"
          >
            {/* Customer Information */}
            <div className="rounded-2xl border border-field-border bg-white p-5">
              <SectionTitle>Customer Information</SectionTitle>
              <div className="space-y-3">
                <Field label="Email" placeholder="Email" value={form.email} onChange={set('email')} type="email" required />
                {errors.email && <p className="text-[10px] text-rose-400 font-bold -mt-2">{errors.email}</p>}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Field label="First Name" placeholder="First Name" value={form.firstName} onChange={set('firstName')} required />
                    {errors.firstName && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Field label="Last Name" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} required />
                    {errors.lastName && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-2xl border border-field-border bg-white p-5">
              <SectionTitle>Shipping Address</SectionTitle>
              <div className="space-y-3">
                <div>
                  <Field label="Address" placeholder="Street address" value={form.address} onChange={set('address')} required />
                  {errors.address && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.address}</p>}
                </div>
                <div>
                  <Field label="City" placeholder="City" value={form.city} onChange={set('city')} required />
                  {errors.city && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.city}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Postal Code" placeholder="Postal Code" value={form.postalCode} onChange={set('postalCode')} />
                  <div>
                    <Field label="Phone" placeholder="Phone" value={form.phone} onChange={set('phone')} type="tel" required />
                    {errors.phone && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-field-border bg-white p-5">
              <SectionTitle>Payment Method</SectionTitle>
              <div className="space-y-2">

                {/* Card option */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all
                    ${paymentMethod === 'card'
                      ? 'border-accent bg-selected-bg'
                      : 'border-field-border bg-field-bg'
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${paymentMethod === 'card' ? 'border-accent' : 'border-charm-mid'}`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <FaCreditCard size={13} className={paymentMethod === 'card' ? 'text-accent' : 'text-charm-mid'} />
                  <span className="text-xs font-black text-secondary">Credit / Debit Card</span>
                </label>

                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 px-2 pt-1">
                    <div>
                      <Field label="Card Number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
                      {errors.cardNumber && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Field label="Expiry" placeholder="MM / YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} required />
                        {errors.cardExpiry && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <Field label="CVV" placeholder="•••" value={cardCVV} onChange={e => setCardCVV(e.target.value)} required />
                        {errors.cardCVV && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.cardCVV}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* COD option */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all
                    ${paymentMethod === 'cod'
                      ? 'border-accent bg-selected-bg'
                      : 'border-field-border bg-field-bg'
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${paymentMethod === 'cod' ? 'border-accent' : 'border-charm-mid'}`}>
                    {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <FaMoneyBillWave size={13} className={paymentMethod === 'cod' ? 'text-accent' : 'text-charm-mid'} />
                  <span className="text-xs font-black text-secondary">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* ════ RIGHT — Order Summary ════ */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
            className="w-full lg:w-[340px] flex-shrink-0 sticky top-24"
          >
            <div className="rounded-2xl overflow-hidden border border-summary-border shadow-[0_8px_40px_#894def22]">

              {/* header */}
              <div className="px-5 py-4 flex items-center gap-3 checkout-summary-header">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FaLock size={13} className="text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white leading-none">Order Summary</h2>
                  <p className="text-[10px] text-white/70 mt-0.5 font-bold">
                    {cartItems.reduce((a, i) => a + i.quantity, 0)} items
                  </p>
                </div>
              </div>

              {/* cart items */}
              <div className="px-5 pt-4 pb-2 space-y-3 bg-white">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.color}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-item-border bg-item-bg">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black truncate text-secondary">{item.name}</p>
                      <p className="text-[10px] font-bold text-accent/60">
                        Qty: {item.quantity} · {item.color}
                      </p>
                      <p className="text-[10px] font-bold text-accent/60">
                        Price: Rs. {item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs font-black flex-shrink-0 text-secondary">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mx-5 h-px bg-divider" />

              {/* price breakdown */}
              <div className="px-5 py-4 space-y-2 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-accent/60">Subtotal</span>
                  <span className="text-[11px] font-black text-secondary">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-accent/60">Shipping</span>
                  <span className="text-[11px] font-black text-secondary">Calculated Rs. {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center rounded-xl px-4 py-3 mt-1 checkout-total-row">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">Total</span>
                  <span className="text-base font-black text-btn-from">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* checkout button */}
              <div className="px-5 pb-5 bg-white">
                <button
                  onClick={handleSubmit}
                  className="w-full h-11 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md btn-color"
                >
                  <FaLock size={10} /> Complete Order
                </button>
                <div className="flex justify-center gap-5 mt-3">
                  {['🔒 Secure', '✦ Trusted', '🚚 Fast'].map(b => (
                    <span key={b} className="text-[9px] font-bold text-accent/50">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}