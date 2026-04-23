import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

/* ─────────────── Reusable Input Component ─────────────────────────────── */
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

/* ─────────────── Section Heading Component ────────────────────────────── */
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

/* ─────────────── Main Checkout Component ───────────────────────────────────── */
export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  /* ── Multi-step State ── */
  const [step, setStep] = useState(1);

  /* ── Form States ── */
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

  /* ── Calculations ── */
  const subtotal = cartItems.reduce((a, i) => a + i.price * i.quantity, 0);
  const shipping = 350;
  const total    = subtotal + shipping;

  /* ── Validation for Step 1 (Shipping Details) ── */
  const validateStep1 = () => {
    const e = {};
    if (!form.email.trim())     e.email     = 'Required';
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim())  e.lastName  = 'Required';
    if (!form.address.trim())   e.address   = 'Required';
    if (!form.city.trim())      e.city      = 'Required';
    if (!form.phone.trim())     e.phone     = 'Required';
    
    setErrors(e);
    
    // If no errors, proceed to Step 2 and scroll to top smoothly
    if (Object.keys(e).length === 0) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ── Validation for Step 2 (Payment Details) ── */
  const validateStep2 = () => {
    const e = {};
    if (paymentMethod === 'card') {
      if (!cardNumber.trim()) e.cardNumber = 'Required';
      if (!cardExpiry.trim()) e.cardExpiry = 'Required';
      if (!cardCVV.trim())    e.cardCVV    = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Handle Final Submission ── */
  const handleSubmit = () => {
    if (!validateStep2()) return;
    setSubmitted(true);

    // Generate mock order data
    const orderNumber = 'DNP-' + Math.floor(10000 + Math.random() * 90000);
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const deliveryDate = d.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    });

    // Simulate API call delay
    setTimeout(() => {
      clearCart?.();
      navigate('/order-success', {
        state: {
          cartItems,
          total,
          orderNumber,
          deliveryDate,
        },
      });
    }, 1500);
  };

  /* ── Submitting Overlay Screen ── */
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

        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center lg:text-left">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-accent">
            DNP 3D Hobby & Lobby
          </p>
          <h1 className="text-2xl font-black tracking-tight text-secondary">Secure Checkout</h1>
        </motion.div>

        {/* ── Progress Indicator (Wizard Steps) ── */}
        <div className="flex items-center justify-center mb-10 max-w-md mx-auto lg:mx-0">
          <div className={`text-[10px] uppercase tracking-widest font-black transition-colors ${step >= 1 ? 'text-accent' : 'text-slate-300'}`}>
            1. Shipping
          </div>
          <div className="flex-1 h-1.5 mx-4 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full bg-accent transition-all duration-500 ease-in-out ${step === 2 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`text-[10px] uppercase tracking-widest font-black transition-colors ${step === 2 ? 'text-accent' : 'text-slate-300'}`}>
            2. Payment
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ════ LEFT COLUMN — Dynamic Form Steps ════ */}
          <div className="flex-1 min-w-0 w-full relative">
            <AnimatePresence mode="wait">
              
              {/* ── STEP 1: Shipping Information ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Customer Information Panel */}
                  <div className="rounded-2xl border border-field-border bg-white p-6 shadow-sm">
                    <SectionTitle>Customer Information</SectionTitle>
                    <div className="space-y-4">
                      <div>
                        <Field label="Email Address" placeholder="hello@example.com" value={form.email} onChange={set('email')} type="email" required />
                        {errors.email && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.email}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Field label="First Name" placeholder="John" value={form.firstName} onChange={set('firstName')} required />
                          {errors.firstName && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <Field label="Last Name" placeholder="Doe" value={form.lastName} onChange={set('lastName')} required />
                          {errors.lastName && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address Panel */}
                  <div className="rounded-2xl border border-field-border bg-white p-6 shadow-sm">
                    <SectionTitle>Shipping Address</SectionTitle>
                    <div className="space-y-4">
                      <div>
                        <Field label="Street Address" placeholder="123 Main St, Apartment 4B" value={form.address} onChange={set('address')} required />
                        {errors.address && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.address}</p>}
                      </div>
                      <div>
                        <Field label="City / District" placeholder="Colombo" value={form.city} onChange={set('city')} required />
                        {errors.city && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.city}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Postal Code (Optional)" placeholder="00100" value={form.postalCode} onChange={set('postalCode')} />
                        <div>
                          <Field label="Phone Number" placeholder="+94 77 123 4567" value={form.phone} onChange={set('phone')} type="tel" required />
                          {errors.phone && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Payment Information ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-field-border bg-white p-6 shadow-sm">
                    <SectionTitle>Select Payment Method</SectionTitle>
                    <div className="space-y-3 mt-4">

                      {/* Credit/Debit Card Option */}
                      <label
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition-all duration-200
                          ${paymentMethod === 'card'
                            ? 'border-accent bg-selected-bg shadow-sm'
                            : 'border-field-border bg-field-bg hover:border-slate-300'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                          ${paymentMethod === 'card' ? 'border-accent' : 'border-charm-mid'}`}>
                          {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                        </div>
                        <FaCreditCard size={16} className={paymentMethod === 'card' ? 'text-accent' : 'text-charm-mid'} />
                        <span className="text-sm font-black text-secondary">Credit / Debit Card</span>
                      </label>

                      {/* Expandable Card Details Form */}
                      <AnimatePresence>
                        {paymentMethod === 'card' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 px-2 pt-2 pb-4 overflow-hidden"
                          >
                            <div>
                              <Field label="Card Number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
                              {errors.cardNumber && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.cardNumber}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Field label="Expiry Date" placeholder="MM / YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} required />
                                {errors.cardExpiry && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.cardExpiry}</p>}
                              </div>
                              <div>
                                <Field label="Security Code (CVV)" placeholder="•••" value={cardCVV} onChange={e => setCardCVV(e.target.value)} required />
                                {errors.cardCVV && <p className="text-[10px] text-rose-400 font-bold mt-1">{errors.cardCVV}</p>}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Cash on Delivery Option */}
                      <label
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer transition-all duration-200
                          ${paymentMethod === 'cod'
                            ? 'border-accent bg-selected-bg shadow-sm'
                            : 'border-field-border bg-field-bg hover:border-slate-300'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                          ${paymentMethod === 'cod' ? 'border-accent' : 'border-charm-mid'}`}>
                          {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                        </div>
                        <FaMoneyBillWave size={16} className={paymentMethod === 'cod' ? 'text-accent' : 'text-charm-mid'} />
                        <span className="text-sm font-black text-secondary">Cash on Delivery (COD)</span>
                      </label>

                    </div>
                  </div>

                  {/* Back Navigation Button */}
                  <button 
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-accent transition-colors pt-4 pl-2"
                  >
                    <FaArrowLeft size={10} /> Back to Shipping
                  </button>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ════ RIGHT COLUMN — Order Summary ════ */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
            className="w-full lg:w-[360px] flex-shrink-0 sticky top-28"
          >
            <div className="rounded-3xl overflow-hidden border border-summary-border shadow-[0_8px_40px_#894def22] bg-white">

              {/* Summary Header */}
              <div className="px-6 py-5 flex items-center gap-4 checkout-summary-header bg-slate-50/50 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FaLock size={14} className="text-white" />
                </div>
                <div>
                  <h2 className="text-base font-black leading-none text-secondary">Order Summary</h2>
                  <p className="text-xs text-accent mt-1.5 font-bold uppercase tracking-widest">
                    {cartItems.reduce((a, i) => a + i.quantity, 0)} items in cart
                  </p>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="px-6 pt-5 pb-2 space-y-4">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.color}`} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-item-border bg-item-bg">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black truncate text-secondary">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
                        Qty: {item.quantity} · {item.color}
                      </p>
                    </div>
                    <span className="text-sm font-black flex-shrink-0 text-secondary">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mx-6 my-4 h-px bg-slate-100" />

              {/* Price Breakdown */}
              <div className="px-6 pb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-xs font-black text-secondary">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shipping</span>
                  <span className="text-xs font-black text-secondary">Rs. {shipping.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center rounded-2xl px-5 py-4 mt-4 bg-slate-50 border border-slate-100">
                  <span className="text-sm font-black uppercase tracking-widest text-accent">Total</span>
                  <span className="text-xl font-black text-accent">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* ── Dynamic Action Button based on Current Step ── */}
              <div className="px-6 pb-6">
                {step === 1 ? (
                  <button
                    onClick={validateStep1}
                    className="w-full h-14 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] btn-color text-white bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
                  >
                    Continue to Payment <FaArrowRight size={12} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="w-full h-14 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] btn-color text-white bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
                  >
                    <FaLock size={12} /> Complete Order
                  </button>
                )}

                {/* Trust Badges */}
                <div className="flex justify-center gap-6 mt-4">
                  {['🔒 Secure Data', '✦ Trusted', '🚚 Fast Delivery'].map(badge => (
                    <span key={badge} className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{badge}</span>
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