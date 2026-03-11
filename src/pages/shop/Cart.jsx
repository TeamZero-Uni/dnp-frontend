import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft, FaChevronRight, FaTruck, FaTag, FaLock } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const SHIPPING_OPTIONS = [
  { label: 'Free Shipping', value: 0, time: '5–7 business days' },
  { label: 'Standard Delivery', value: 300, time: '2–4 business days' },
  { label: 'Express Delivery', value: 700, time: 'Next business day' },
];

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [shipping, setShipping] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

        .cart-light { font-family: 'Nunito', sans-serif; }
        .cart-light * { box-sizing: border-box; }

        .blob-1 {
          position: fixed; top: -80px; right: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .blob-2 {
          position: fixed; bottom: -100px; left: -60px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .blob-3 {
          position: fixed; top: 40%; left: 35%;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .item-card {
          background: #fff;
          border: 1.5px solid #f0ebff;
          border-radius: 22px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: all 0.25s;
          box-shadow: 0 2px 12px rgba(139,92,246,0.04);
        }
        .item-card:hover {
          border-color: #c4b5fd;
          box-shadow: 0 10px 36px rgba(139,92,246,0.11);
          transform: translateY(-2px);
        }

        .qty-wrap {
          display: flex; align-items: center;
          background: #faf8ff;
          border: 1.5px solid #ede9fe;
          border-radius: 50px;
          overflow: hidden; height: 36px;
        }
        .qty-btn {
          width: 36px; height: 100%;
          background: none; border: none; cursor: pointer;
          color: #a78bfa; font-size: 11px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .qty-btn:hover { background: #ede9fe; color: #7c3aed; }

        .del-btn {
          background: none; border: none; cursor: pointer;
          color: #d1c4f8; padding: 8px; border-radius: 10px;
          transition: all 0.15s; display: flex; align-items: center;
        }
        .del-btn:hover { color: #f43f5e; background: #fff1f2; }

        .summary-card {
          background: #fff;
          border: 1.5px solid #f0ebff;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(139,92,246,0.08);
        }

        .ship-opt {
          display: flex; align-items: center;
          padding: 12px 14px; border-radius: 14px;
          border: 1.5px solid #f0ebff;
          cursor: pointer; transition: all 0.2s;
          margin-bottom: 8px;
        }
        .ship-opt:hover { border-color: #c4b5fd; background: #faf8ff; }
        .ship-opt.active { border-color: #a78bfa; background: #faf8ff; box-shadow: 0 2px 10px rgba(139,92,246,0.1); }

        .promo-wrap {
          display: flex; align-items: center;
          border: 1.5px solid #f0ebff;
          border-radius: 14px; overflow: hidden;
          height: 46px; background: #faf8ff;
          transition: all 0.2s;
        }
        .promo-wrap:focus-within { border-color: #a78bfa; box-shadow: 0 0 0 4px rgba(167,139,250,0.1); }
        .promo-input {
          flex: 1; background: none; border: none; outline: none;
          font-family: 'Nunito', sans-serif;
          font-size: 13px; font-weight: 600;
          color: #4c1d95; padding: 0 14px;
        }
        .promo-input::placeholder { color: #c4b5fd; }

        .checkout-btn {
          width: 100%; padding: 16px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%);
          color: white; border-radius: 16px;
          font-family: 'Nunito', sans-serif;
          font-size: 14px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase;
          box-shadow: 0 8px 24px rgba(124,58,237,0.3);
          transition: all 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(124,58,237,0.4);
        }
        .checkout-btn:active { transform: scale(0.98); }

        .back-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: #a78bfa; font-size: 13px; font-weight: 700;
          text-decoration: none; transition: color 0.15s; letter-spacing: 0.02em;
        }
        .back-link:hover { color: #7c3aed; }

        .color-tag {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 20px;
          background: #faf8ff; border: 1px solid #ede9fe;
          font-size: 9px; font-weight: 800; color: #7c3aed;
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        .dot-divider {
          border: none;
          border-top: 2px dashed #f0ebff;
          margin: 16px 0;
        }
      `}</style>

      <div className="cart-light" style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #fdfbff 0%, #f5f0ff 40%, #fef9ff 70%, #fff8f0 100%)',
        paddingTop: '110px',
        paddingBottom: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}>
        <div className="blob-1" />
        <div className="blob-2" />
        <div className="blob-3" />

        <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}
          >
            <div>
              <p style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                ✦ Your Selection
              </p>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '34px', fontWeight: 700, color: '#2e1065',
                letterSpacing: '-0.02em', margin: 0, lineHeight: 1,
              }}>
                Shopping Cart
              </h1>
              <p style={{ fontSize: '13px', color: '#a78bfa', marginTop: '6px', fontWeight: 600 }}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} waiting for you
              </p>
            </div>
            <Link to="/shop" className="back-link">
              <FaArrowLeft size={11} /> Continue Shopping
            </Link>
          </motion.div>

          {/* ── Empty State ── */}
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center', padding: '80px 40px',
                background: '#fff',
                border: '2px dashed #e9d5ff',
                borderRadius: '32px',
              }}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '28px', margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #faf5ff, #ede9fe)',
                border: '2px solid #e9d5ff',
              }}>
                <FaShoppingBag size={28} style={{ color: '#c4b5fd' }} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", color: '#7c3aed', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                Your cart is empty
              </p>
              <p style={{ color: '#a78bfa', fontSize: '13px', marginBottom: '28px', fontWeight: 500 }}>
                Looks like you haven't added anything yet
              </p>
              <Link to="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 30px', borderRadius: '50px',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                color: 'white', fontSize: '13px', fontWeight: 800,
                textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
              }}>
                <FaShoppingBag size={12} /> Start Shopping
              </Link>
            </motion.div>

          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>

              {/* ════ LEFT ════ */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>

                {/* Items count pill */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '6px 16px', borderRadius: '50px',
                  background: '#fff', border: '1.5px solid #ede9fe',
                  marginBottom: '16px',
                  boxShadow: '0 2px 8px rgba(139,92,246,0.06)',
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }} />
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {itemCount} Items in Your Cart
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${item.color}`}
                        className="item-card"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 60, scale: 0.95 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        {/* Image */}
                        <div style={{
                          width: '82px', height: '82px', borderRadius: '18px', overflow: 'hidden', flexShrink: 0,
                          background: 'linear-gradient(135deg, #faf5ff, #ede9fe)',
                          border: '2px solid #f0ebff',
                        }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '15px', fontWeight: 600, color: '#2e1065',
                            margin: '0 0 6px',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {item.name}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <span className="color-tag">
                              <span style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: item.color === 'White' ? '#e2e8f0' : item.color === 'Black' ? '#334155' : item.color,
                                border: '1px solid rgba(0,0,0,0.1)',
                              }} />
                              {item.color}
                            </span>
                            <span style={{ fontSize: '11px', color: '#c4b5fd', fontWeight: 600 }}>
                              Rs. {item.price.toLocaleString()} each
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="qty-wrap">
                              <button className="qty-btn" onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}>
                                <FaMinus size={9} />
                              </button>
                              <span style={{
                                width: '32px', textAlign: 'center',
                                fontSize: '14px', fontWeight: 800, color: '#4c1d95',
                                borderLeft: '1.5px solid #ede9fe',
                                borderRight: '1.5px solid #ede9fe',
                              }}>
                                {item.quantity}
                              </span>
                              <button className="qty-btn" onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}>
                                <FaPlus size={9} />
                              </button>
                            </div>

                            <span style={{ marginLeft: 'auto', fontSize: '18px', fontWeight: 800, color: '#7c3aed', letterSpacing: '-0.02em' }}>
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </span>

                            <button className="del-btn" onClick={() => removeFromCart(item.id, item.color)}>
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <Link to="/shop" className="back-link">
                    <FaArrowLeft size={11} /> Back to shop
                  </Link>
                </div>
              </motion.div>

              {/* ════ RIGHT: Summary ════ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.14 }}
                style={{ position: 'sticky', top: '100px' }}
              >
                <div className="summary-card">

                  {/* Header */}
                  <div style={{
                    padding: '22px 24px 20px',
                    background: 'linear-gradient(135deg, #faf5ff 0%, #fdf4ff 100%)',
                    borderBottom: '1.5px solid #f0ebff',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '13px',
                        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
                      }}>
                        <FaShoppingBag size={15} color="white" />
                      </div>
                      <div>
                        <h2 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '18px', fontWeight: 700, color: '#2e1065', margin: 0,
                        }}>
                          Order Summary
                        </h2>
                        <p style={{ fontSize: '11px', color: '#a78bfa', margin: 0, fontWeight: 600 }}>
                          {itemCount} items · Rs. {subtotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '22px 24px' }}>

                    {/* Subtotal */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subtotal</span>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#4c1d95' }}>Rs. {subtotal.toLocaleString()}</span>
                    </div>

                    {/* Shipping */}
                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                        <FaTruck size={11} style={{ color: '#a78bfa' }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Shipping</span>
                      </div>
                      {SHIPPING_OPTIONS.map(opt => (
                        <div key={opt.value} className={`ship-opt ${shipping === opt.value ? 'active' : ''}`} onClick={() => setShipping(opt.value)}>
                          <div style={{
                            width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                            border: `2px solid ${shipping === opt.value ? '#7c3aed' : '#e9d5ff'}`,
                            background: shipping === opt.value ? '#7c3aed' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginRight: '10px', transition: 'all 0.2s',
                          }}>
                            {shipping === opt.value && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#4c1d95' }}>{opt.label}</p>
                            <p style={{ margin: 0, fontSize: '10px', color: '#c4b5fd', marginTop: '1px' }}>{opt.time}</p>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: opt.value === 0 ? '#10b981' : '#7c3aed' }}>
                            {opt.value === 0 ? 'Free' : `Rs. ${opt.value}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Promo */}
                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                        <FaTag size={10} style={{ color: '#a78bfa' }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Promo Code</span>
                      </div>
                      <div className="promo-wrap" style={{
                        borderColor: promoError ? '#fca5a5' : promoApplied ? '#6ee7b7' : undefined,
                      }}>
                        <input
                          type="text"
                          className="promo-input"
                          placeholder="Try SAVE10"
                          value={promoCode}
                          onChange={e => { setPromoCode(e.target.value); setPromoError(false); }}
                          disabled={promoApplied}
                          style={{ color: promoApplied ? '#059669' : '#4c1d95' }}
                          onKeyDown={e => e.key === 'Enter' && handlePromo()}
                        />
                        <button
                          onClick={handlePromo}
                          disabled={promoApplied || !promoCode}
                          style={{
                            padding: '0 16px', height: '100%', border: 'none',
                            background: promoApplied ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg, #ede9fe, #fce7f3)',
                            color: promoApplied ? '#059669' : '#7c3aed',
                            cursor: promoApplied ? 'default' : 'pointer',
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: '12px', fontWeight: 800,
                            borderLeft: '1.5px solid #f0ebff',
                            display: 'flex', alignItems: 'center', gap: '4px',
                            transition: 'all 0.2s',
                          }}
                        >
                          {promoApplied ? '✓ Applied' : <FaChevronRight size={10} />}
                        </button>
                      </div>
                      {promoError && <p style={{ fontSize: '10px', color: '#f43f5e', marginTop: '5px', fontWeight: 700 }}>❌ Invalid code. Try SAVE10</p>}
                      {promoApplied && <p style={{ fontSize: '10px', color: '#059669', marginTop: '5px', fontWeight: 700 }}>🎉 10% discount applied!</p>}
                    </div>

                    <hr className="dot-divider" />

                    {/* Breakdown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: '#c4b5fd', fontWeight: 600 }}>Subtotal</span>
                        <span style={{ fontSize: '12px', color: '#4c1d95', fontWeight: 700 }}>Rs. {subtotal.toLocaleString()}</span>
                      </div>
                      {promoApplied && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>Discount (10%)</span>
                          <span style={{ fontSize: '12px', color: '#059669', fontWeight: 700 }}>− Rs. {discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: '#c4b5fd', fontWeight: 600 }}>Shipping</span>
                        <span style={{ fontSize: '12px', color: shipping === 0 ? '#059669' : '#4c1d95', fontWeight: 700 }}>
                          {shipping === 0 ? '🚚 Free' : `Rs. ${shipping.toLocaleString()}`}
                        </span>
                      </div>

                      {/* Total box */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 18px', marginTop: '6px',
                        background: 'linear-gradient(135deg, #faf5ff, #fdf4ff)',
                        border: '1.5px solid #ede9fe',
                        borderRadius: '16px',
                      }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, color: '#4c1d95' }}>
                          Total
                        </span>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#7c3aed', letterSpacing: '-0.02em' }}>
                          Rs. {total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Checkout */}
                    <button className="checkout-btn">
                      <FaLock size={11} />
                      Proceed to Checkout
                    </button>

                    {/* Trust row */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginTop: '14px' }}>
                      {['🔒 Secure', '✦ Trusted', '🚚 Fast'].map(b => (
                        <span key={b} style={{ fontSize: '10px', color: '#c4b5fd', fontWeight: 700 }}>{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;