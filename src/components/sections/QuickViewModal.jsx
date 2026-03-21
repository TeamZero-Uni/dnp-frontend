import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaStar,
  FaRegStar,
  FaShieldAlt,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi2";
import { useCart } from "../../context/CartContext";

function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);
  const [imgZoomed, setImgZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");

  // ── smooth transition state ──────────────────────────────────
  // 'visible' | 'fading' controls the overlay + modal animation
  const [exitState, setExitState] = useState("visible");
  // ─────────────────────────────────────────────────────────────

  const isOutOfStock = product.stock === 0;
  const stockCount = product.stockCount ?? null;
  const images = product.images?.length ? product.images : [product.image];
  const rating = product.rating ?? 5;
  const reviews = product.reviews ?? 0;
  const maxQty = stockCount ?? 99;

  // ── smooth close helper ──────────────────────────────────────
  // Triggers fade-out animation, then calls the real action
  const smoothExit = (action) => {
    setExitState("fading"); // start CSS fade-out
    setTimeout(() => {
      action(); // run navigate / onClose after animation
    }, 420); // matches exit animation duration
  };
  // ─────────────────────────────────────────────────────────────

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[selectedImg] || product.image,
      category: product.category,
    };

    addToCart(cartProduct, qty, selectedColor);
    setAddedToCart(true);

    // Brief "Going to cart…" feedback, then smooth exit → navigate
    setTimeout(() => {
      smoothExit(() => {
        onClose();
        navigate("/cart");
      });
    }, 700);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((q) => Math.max(1, q - 1));
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((q) => Math.min(maxQty, q + 1));
  };

  // Close button also uses smooth exit
  const handleClose = () => smoothExit(onClose);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  /* ── animation classes based on exitState ── */
  const backdropAnim = exitState === "fading" ? "qv-backdrop-out" : "qv-fade";
  const modalAnim = exitState === "fading" ? "qv-modal-out" : "qv-slide";

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(6,2,29,0.6)",
        backdropFilter: "blur(6px)",
        animation: `${backdropAnim} 0.42s ease forwards`,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full overflow-hidden flex flex-col"
        style={{
          maxWidth: "960px",
          maxHeight: "92vh",
          overflowY: "auto",
          animation: `${modalAnim} 0.42s cubic-bezier(0.22,1,0.36,1) forwards`,
          boxShadow:
            "0 30px 80px rgba(90,70,194,0.25), 0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-7 pt-5 pb-3 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#894def] animate-pulse" />
            <span className="text-[11px] font-black text-[#5a46c2] uppercase tracking-widest">
              {product.category}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 hover:rotate-90 transition-all duration-300"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col md:flex-row gap-8 p-7">
          {/* Left — Images */}
          <div className="flex-shrink-0 w-full md:w-[340px] flex flex-col items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setImgZoomed((z) => !z);
              }}
              className={`relative w-full rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden mb-3 border border-gray-100 cursor-zoom-in transition-all duration-300
                ${imgZoomed ? "h-[360px]" : "h-[280px]"}`}
            >
              <img
                src={images[selectedImg]}
                alt={product.name}
                className={`max-w-full max-h-full object-contain transition-all duration-500
                  ${imgZoomed ? "scale-110" : "scale-100"}
                  ${isOutOfStock ? "grayscale opacity-60" : "hover:scale-105"}`}
              />
              {!imgZoomed && (
                <span className="absolute bottom-2 right-2 text-[9px] bg-black/30 text-white px-2 py-0.5 rounded-full font-medium pointer-events-none">
                  Click to zoom
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap justify-center">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImg(i);
                    }}
                    className={`w-16 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105
                      ${selectedImg === i ? "border-[#5a46c2] shadow-md shadow-[#5a46c2]/20" : "border-gray-200 hover:border-gray-400"}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Product Details */}
          <div className="flex-1 min-w-0 flex flex-col">
            <h2 className="text-xl font-black text-[#06021d] leading-snug mb-2">
              {product.name}
            </h2>

            {reviews > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < rating ? (
                      <FaStar key={i} className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <FaRegStar
                        key={i}
                        className="w-3.5 h-3.5 text-gray-300"
                      />
                    ),
                  )}
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  ({reviews} Reviews)
                </span>
              </div>
            )}

            <div className="mb-4 pb-4 border-b border-gray-100">
              <p className="text-3xl font-black text-[#06021d] tracking-tight">
                Rs. {product.price.toLocaleString()}
                <span className="text-base font-semibold text-gray-400">
                  .00
                </span>
              </p>
            </div>

            <div className="mb-4">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-red-50 text-red-500 border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Out
                  of Stock
                </span>
              ) : (
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold
                  ${
                    stockCount && stockCount <= 3
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${stockCount && stockCount <= 3 ? "bg-amber-500" : "bg-emerald-500"}`}
                  />
                  {stockCount ? `Only ${stockCount} left` : "In Stock"}
                </span>
              )}
            </div>

            {product.description?.length > 0 && (
              <div className="border-t border-gray-100 pt-4 mb-4 space-y-3 max-h-[180px] overflow-y-auto pr-1 custom-scroll">
                {product.description.map((section, i) => (
                  <div key={i}>
                    <p className="text-[13px] font-bold text-gray-800">
                      {section.title}
                    </p>
                    <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {!product.description?.length && product.specs && (
              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  {product.specs}
                </p>
              </div>
            )}

            <p className="text-[10px] italic text-gray-400 mb-4">
              *Actual product colors may vary slightly from the image shown on
              our website.
            </p>

            {!isOutOfStock && (
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Qty
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden select-none">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={qty <= 1}
                      className={`w-10 h-10 flex items-center justify-center font-black text-xl transition-all
                        ${qty <= 1 ? "text-gray-200 cursor-not-allowed" : "text-gray-500 hover:bg-[#5a46c2]/10 hover:text-[#5a46c2] active:scale-90"}`}
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-black text-[#06021d] border-x border-gray-200 py-2">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={qty >= maxQty}
                      className={`w-10 h-10 flex items-center justify-center font-black text-xl transition-all
                        ${qty >= maxQty ? "text-gray-200 cursor-not-allowed" : "text-gray-500 hover:bg-[#5a46c2]/10 hover:text-[#5a46c2] active:scale-90"}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <span className="w-px h-8 bg-gray-200" />

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Color:{" "}
                    <span className="text-[#5a46c2] normal-case capitalize">
                      {selectedColor}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[
                      {
                        label: "White",
                        value: "white",
                        bg: "bg-white",
                        dot: "border border-gray-300",
                      },
                      {
                        label: "Black",
                        value: "black",
                        bg: "bg-[#1a1a1a]",
                        dot: "",
                      },
                    ].map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedColor(color.value);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all duration-200
                          ${
                            selectedColor === color.value
                              ? "border-[#5a46c2] bg-[#5a46c2]/5 text-[#5a46c2]"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${color.bg} ${color.dot}`}
                        />
                        {color.label}
                        {selectedColor === color.value && (
                          <svg
                            className="w-3 h-3 text-[#5a46c2]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-stretch gap-3 mb-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300
                  ${
                    isOutOfStock
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : addedToCart
                        ? "bg-emerald-500 text-white scale-[0.98]"
                        : "btn-color shadow-md shadow-[#5a46c2]/25 hover:shadow-lg hover:shadow-[#5a46c2]/35 hover:scale-[1.02] active:scale-95"
                  }`}
              >
                {addedToCart ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin-once"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Going to cart…
                  </>
                ) : (
                  <>
                    <HiOutlineShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95
                  ${
                    wishlisted
                      ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-200"
                      : "border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50"
                  }`}
              >
                {wishlisted ? (
                  <FaHeart className="w-3.5 h-3.5" />
                ) : (
                  <FaRegHeart className="w-3.5 h-3.5" />
                )}
                {wishlisted ? "Saved" : "Wishlist"}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
              {[
                {
                  icon: <FaTruck className="w-3.5 h-3.5 text-emerald-500" />,
                  bg: "bg-emerald-50",
                  label: "Free Delivery\nislandwide",
                },
                {
                  icon: <FaShieldAlt className="w-3.5 h-3.5 text-[#5a46c2]" />,
                  bg: "bg-[#5a46c2]/10",
                  label: "Secure\nPayment",
                },
                {
                  icon: <FaUndo className="w-3.5 h-3.5 text-amber-500" />,
                  bg: "bg-amber-50",
                  label: "Easy\nReturns",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 text-center p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${b.bg} flex items-center justify-center`}
                  >
                    {b.icon}
                  </div>
                  <span
                    className="text-[9px] font-bold text-gray-500 leading-tight"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Full Details */}
        <div className="px-7 py-4 border-t border-gray-100 flex items-center justify-end bg-gray-50/50">
          <Link
            to={`/product/${product.id}`}
            onClick={handleClose}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#5a46c2] transition-colors duration-200 tracking-wide uppercase"
          >
            View Full Details
            <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      <style>{`
        /* ── Enter animations ── */
        @keyframes qv-fade  { from { opacity: 0 }                                             to { opacity: 1 } }
        @keyframes qv-slide { from { transform: translateY(32px) scale(0.97); opacity: 0 }    to { transform: translateY(0) scale(1); opacity: 1 } }

        /* ── Exit animations — smooth, slow fade + slide down ── */
        @keyframes qv-backdrop-out { from { opacity: 1 }                                      to { opacity: 0 } }
        @keyframes qv-modal-out    { from { transform: translateY(0) scale(1); opacity: 1 }   to { transform: translateY(24px) scale(0.97); opacity: 0 } }

        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
        .btn-color { background: linear-gradient(to right, #5a46c2, #4838a3); color: white; }
      `}</style>
    </div>
  );
}

export default QuickViewModal;
