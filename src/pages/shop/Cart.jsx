import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrash, FaMinus, FaPlus, FaShoppingBag,
  FaArrowLeft, FaShieldAlt, FaTruck, FaUndo, FaExclamationTriangle
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [itemToRemove, setItemToRemove] = useState(null); 
  const navigate = useNavigate();

  // Calculate totals (shipping removed)
  const subtotal  = cartItems.reduce((acc, i) => acc + (Number(i.price) * i.quantity), 0);
  const total     = subtotal; 
  const itemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Confirm delete handler
  const confirmRemove = async () => {
    if (itemToRemove) {
      await removeFromCart(itemToRemove.id, itemToRemove.color);
      setItemToRemove(null); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto relative">

        {/* --- Page Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Shopping Cart
            </h1>
            <p className="text-sm font-medium text-slate-500">
              You have {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" size={12} /> 
            Continue Shopping
          </Link>
        </div>

        {/* --- Empty Cart State --- */}
        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-200 p-16 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag size={32} className="text-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button onClick={() => navigate('/shop')} className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-md hover:-translate-y-0.5">
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

            {/* ---Cart Items --- */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                
                {/* Desktop Headers */}
                <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_140px_100px_auto] gap-6 px-8 py-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Product Details</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Subtotal</span>
                  <span className="w-14"></span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {cartItems.map((item, idx) => (
                      <motion.div key={item.cartId || item.p_id || item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} className="p-6 sm:px-8 sm:py-6 flex flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_140px_100px_auto] gap-6 items-center group transition-colors hover:bg-slate-50/50">
                        
                        {/* Product Info */}
                        <div className="flex items-center gap-5 w-full">
                          <div className="w-24 h-24 sm:w-20 sm:h-20 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-900 truncate mb-1">{item.name}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-1">
                              {item.color && item.color !== "N/A" && (
                                <div className="flex items-center gap-1.5">
                                  <span className="w-3 h-3 rounded-full border border-slate-300 shadow-inner" style={{ background: item.color.toLowerCase() === 'white' ? '#fff' : item.color }} />
                                  <span className="text-xs font-medium text-slate-500 capitalize">{item.color}</span>
                                </div>
                              )}
                              <span className="text-xs font-semibold text-slate-500">Rs. {Number(item.price).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Elevated Qty Selector */}
                        <div className="flex items-center justify-between w-full sm:w-auto">
                          <span className="sm:hidden text-sm font-semibold text-slate-500">Qty:</span>
                          <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-md transform transition-all hover:-translate-y-1">
                            <button onClick={() => updateQuantity(item.p_id || item.id, item.color, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-l-xl transition-colors"><FaMinus size={10} /></button>
                            <span className="w-10 text-center text-sm font-extrabold text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.p_id || item.id, item.color, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-r-xl transition-colors"><FaPlus size={10} /></button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="w-full sm:w-auto flex justify-between sm:block text-right">
                           <span className="sm:hidden text-sm font-semibold text-slate-500">Total:</span>
                          <p className="text-base font-extrabold text-slate-900">Rs. {(Number(item.price) * item.quantity).toLocaleString()}</p>
                        </div>

                        {/* Prominent Delete Button */}
                        <div className="hidden sm:flex justify-end pl-2">
                          <button onClick={() => setItemToRemove({ id: item.p_id || item.id, color: item.color })} className="p-3 text-rose-500 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm border border-rose-100 flex items-center justify-center" title="Remove item">
                            <FaTrash size={15} />
                          </button>
                        </div>
                        
                        {/* Mobile Delete */}
                        <button onClick={() => setItemToRemove({ id: item.p_id || item.id, color: item.color })} className="sm:hidden w-full py-3 mt-2 text-sm font-bold text-rose-500 bg-rose-50 rounded-xl border border-rose-100 shadow-sm flex items-center justify-center gap-2">
                          <FaTrash size={14} /> Remove Item
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* --- Order Summary --- */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-28">
                <div className="flex items-center justify-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-sm">
                    <FaShoppingBag size={12} />
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900">Order Summary</h2>
                </div>
                {/* Costs */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-sm">Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-slate-900">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center pt-5 pb-6 border-t border-slate-200 mb-2">
                  <span className="text-base font-bold text-slate-900">Total Amount</span>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-indigo-600 tracking-tight">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Btn */}
                <button onClick={() => navigate('/checkout')} className="w-full py-4 px-6 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-6 text-slate-400">
                  <div className="flex items-center gap-1.5" title="Secure Payment"><FaShieldAlt size={14} /> <span className="text-[10px] font-bold uppercase">Secure</span></div>
                  <div className="flex items-center gap-1.5" title="Fast Delivery"><FaTruck size={14} /> <span className="text-[10px] font-bold uppercase">Fast</span></div>
                  <div className="flex items-center gap-1.5" title="Easy Returns"><FaUndo size={14} /> <span className="text-[10px] font-bold uppercase">Returns</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Delete Modal --- */}
      <AnimatePresence>
        {itemToRemove && (
          <>
            {/* Background Overlay */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setItemToRemove(null)} className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" />
            
            {/* Modal Box */}
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm px-4">
              <div className="bg-white rounded-2xl shadow-2xl p-6 overflow-hidden">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4">
                    <FaExclamationTriangle size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Remove from Cart?</h3>
                  <p className="text-sm text-slate-500 mb-8">Are you sure you want to remove this item? This action cannot be undone.</p>
                  
                  <div className="flex gap-3 w-full">
                    <button onClick={() => setItemToRemove(null)} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors">Cancel</button>
                    <button onClick={confirmRemove} className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all">Yes, Remove</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}