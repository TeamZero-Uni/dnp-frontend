import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import QuickViewModal from "../sections/Quickviewmodal";

function ProductCard({ product }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isOutOfStock = product.stock === 0;
  const stockCount = product.stockCount ?? null;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      {/* Card is no longer a link — click navigation removed */}
      <div className="group cursor-default block h-full relative">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
          {/* ── Top Action Bar ── */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/80">
            {/* Quick View button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold
                text-gray-500 hover:bg-[#5a46c2] hover:text-white
                transition-all duration-200 border border-transparent hover:border-[#5a46c2]"
            >
              <HiOutlineEye className="w-3.5 h-3.5" />
              Quick View
            </button>

            {/* Divider */}
            <span className="w-px h-5 bg-gray-200" />

            {/* Wishlist button */}
            <div className="relative">
              <button
                onClick={handleWishlist}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold
                  transition-all duration-200 border
                  ${
                    wishlisted
                      ? "bg-rose-500 text-white border-rose-500"
                      : "text-gray-500 border-transparent hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
                  }`}
              >
                {wishlisted && (
                  <span className="absolute inset-0 rounded-lg bg-rose-400 animate-ping opacity-30" />
                )}
                {wishlisted ? (
                  <FaHeart className="w-3 h-3 relative z-10" />
                ) : (
                  <FaRegHeart className="w-3 h-3 relative z-10" />
                )}
                <span className="relative z-10">
                  {wishlisted ? "Saved" : "Wishlist"}
                </span>
              </button>

              {/* Toast */}
              <div
                className={`absolute top-9 right-0 z-30 px-3 py-1.5 rounded-lg text-[11px] font-bold
                shadow-lg whitespace-nowrap pointer-events-none transition-all duration-300
                ${wishlisted ? "bg-rose-500 text-white" : "bg-gray-800 text-white"}
                ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
              >
                {wishlisted ? "❤️ Added to Wishlist" : "🤍 Removed"}
              </div>
            </div>
          </div>

          {/* ── Image ── */}
          <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
            {/* Category pill overlay */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black text-[#5a46c2] uppercase tracking-widest shadow-sm border border-[#5a46c2]/10">
                {product.category}
              </span>
            </div>

            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain p-4 transition-transform duration-500
                ${isOutOfStock ? "grayscale opacity-50" : "group-hover:scale-108"}`}
              style={{ transform: isOutOfStock ? undefined : undefined }}
            />

            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-4 py-1.5 bg-red-500/90 text-white text-xs font-black rounded-full uppercase tracking-wider rotate-[-5deg] shadow-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3 leading-snug h-10">
              {product.name}
            </h3>

            {/* Stock Badge — only when in stock */}
            {!isOutOfStock && (
              <div className="mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold
                  ${
                    stockCount && stockCount <= 3
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${stockCount && stockCount <= 3 ? "bg-amber-500" : "bg-emerald-500"} animate-pulse`}
                  />
                  {stockCount ? `Only ${stockCount} left` : "In Stock"}
                </span>
              </div>
            )}

            {/* Price + CTA */}
            <div className="mt-auto pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-black text-[#06021d] tracking-tight">
                    Rs. {product.price.toLocaleString()}
                    <span className="text-xs font-medium text-gray-400">
                      .00
                    </span>
                  </p>
                </div>

                {/* View Product Button */}
                <Link
                  to={`/product/${product.id}`}
                  className={`btn-color flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold
                    whitespace-nowrap shadow-md shadow-[#5a46c2]/20 hover:shadow-lg hover:shadow-[#5a46c2]/30
                    hover:scale-105 active:scale-95 transition-all duration-200
                    ${isOutOfStock ? "opacity-50 pointer-events-none grayscale" : ""}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  View
                  <HiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}

export default ProductCard;
