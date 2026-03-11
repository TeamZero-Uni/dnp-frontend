import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { HiOutlineEye } from 'react-icons/hi';
import QuickViewModal from '../sections/Quickviewmodal';

function ProductCard({ product }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isOutOfStock = product.stock === 0;
  const stockCount = product.stockCount ?? null;
  const installment = product.price ? Math.round(product.price / 3) : null;

  const handleWishlist = (e) => {
    e.preventDefault();
    setWishlisted((prev) => !prev);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className="group cursor-pointer block h-full relative">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">

          {/* ── Top Action Bar ── part of the card, above the image */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">

            {/* Quick View button */}
            <button
              onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
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
                  ${wishlisted
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'text-gray-500 border-transparent hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'
                  }`}
              >
                {/* Ping ring when wishlisted */}
                {wishlisted && (
                  <span className="absolute inset-0 rounded-lg bg-rose-400 animate-ping opacity-30" />
                )}
                {wishlisted
                  ? <FaHeart className="w-3 h-3 relative z-10" />
                  : <FaRegHeart className="w-3 h-3 relative z-10" />
                }
                <span className="relative z-10">
                  {wishlisted ? 'Saved' : 'Wishlist'}
                </span>
              </button>

              {/* Toast */}
              <div className={`absolute top-9 right-0 z-30 px-3 py-1.5 rounded-lg text-[11px] font-bold
                shadow-lg whitespace-nowrap pointer-events-none transition-all duration-300
                ${wishlisted ? 'bg-rose-500 text-white' : 'bg-gray-800 text-white'}
                ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
              >
                {wishlisted ? '❤️ Added to Wishlist' : '🤍 Removed'}
              </div>
            </div>
          </div>

          {/* ── Image — fixed height so all cards same size ── */}
          <div className="relative w-full h-52 bg-gray-50 overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain p-4 transition-transform duration-500
                ${isOutOfStock ? 'grayscale opacity-50' : 'group-hover:scale-110'}`}
            />
          </div>

          {/* ── Content ── */}
          <div className="p-4 flex flex-col flex-grow">
            <span className="text-[10px] font-bold text-[#5a46c2] uppercase tracking-widest mb-1">
              {product.category}
            </span>
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 h-10">
              {product.name}
            </h3>

            {/* Stock Badge */}
            <div className="mb-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold text-white
                ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}>
                {isOutOfStock
                  ? 'Out of Stock'
                  : stockCount
                    ? `In Stock, Only ${stockCount} left`
                    : 'In Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="mt-auto pt-2 border-t border-gray-50">
              <p className="text-lg font-black text-gray-900">
                Rs. {product.price.toLocaleString()}.00
              </p>
              {installment && (
                <p className="text-[11px] text-gray-500 mt-1">
                  or 3 X <span className="font-bold text-gray-700">Rs. {installment.toLocaleString()}.00</span>{' '}
                  with <span className="font-bold text-[#5a46c2]">KOKO</span>ℹ️
                </p>
              )}
              <p className="text-[10px] text-gray-400 mt-0.5">*T&C Apply</p>
            </div>
          </div>

        </div>
      </Link>

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