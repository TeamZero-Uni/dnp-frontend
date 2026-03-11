import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { MdCompare } from 'react-icons/md';

function QuickViewModal({ product, onClose }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const isOutOfStock = product.stock === 0;
  const stockCount = product.stockCount ?? null;
  const installment = product.price ? Math.round(product.price / 3) : null;
  const images = product.images?.length ? product.images : [product.image];
  const rating = product.rating ?? 5;
  const reviews = product.reviews ?? 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isOutOfStock) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Close modal when clicking the dark backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        animation: 'qv-fade 0.2s ease',
      }}
    >
      <div
        className="bg-white rounded-2xl w-full overflow-hidden flex flex-col"
        style={{
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'qv-slide 0.25s ease',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
        }}
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100">
          <span className="text-[11px] font-bold text-[#5a46c2] uppercase tracking-widest">
            {product.category}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-all"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col md:flex-row gap-6 p-6">

          {/* Left — Images */}
          <div className="flex-shrink-0 w-full md:w-[300px]">

            {/* Main Image */}
            <div className="rounded-xl bg-gray-50 flex items-center justify-center h-[240px] md:h-[280px] overflow-hidden mb-3 border border-gray-100">
              <img
                src={images[selectedImg]}
                alt={product.name}
                className={`max-h-full w-auto object-contain transition-all duration-300
                  ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
              />
            </div>

            {/* Thumbnails — only shown if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-16 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200
                      ${selectedImg === i
                        ? 'border-[#5a46c2]'
                        : 'border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Product Details */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* Product Name */}
            <h2 className="text-lg font-black text-gray-900 leading-snug mb-3">
              {product.name}
            </h2>

            {/* Star Rating */}
            {reviews > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < rating
                      ? <FaStar key={i} className="w-3.5 h-3.5 text-amber-400" />
                      : <FaRegStar key={i} className="w-3.5 h-3.5 text-gray-300" />
                  )}
                </div>
                <span className="text-xs text-gray-500">({reviews} Reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="mb-2">
              <p className="text-2xl font-black text-gray-900">
                Rs. {product.price.toLocaleString()}.00
              </p>
              {installment && (
                <p className="text-xs text-gray-500 mt-1">
                  or 3 ×{' '}
                  <span className="font-bold text-gray-700">
                    Rs. {installment.toLocaleString()}.00
                  </span>{' '}
                  with <span className="font-bold text-[#5a46c2]">KOKO</span> ℹ️
                  <span className="ml-1 text-gray-400">*T&C Apply</span>
                </p>
              )}
            </div>

            {/* Stock Badge */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold text-white
                ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}>
                {isOutOfStock
                  ? 'Out of Stock'
                  : stockCount
                    ? `In Stock — Only ${stockCount} left`
                    : 'In Stock'}
              </span>
            </div>

            {/* Description Sections */}
            {product.description?.length > 0 && (
              <div className="border-t border-gray-100 pt-4 mb-4 space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {product.description.map((section, i) => (
                  <div key={i}>
                    <p className="text-[13px] font-bold text-gray-800">{section.title}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">{section.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Specs fallback — only if no description array */}
            {!product.description?.length && product.specs && (
              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-xs text-gray-500 leading-relaxed">{product.specs}</p>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[10px] italic text-gray-400 mb-4">
              *Actual product colors may vary slightly from the image shown on our website.
            </p>

            {/* ── Action Buttons ── */}
            <div className="grid grid-cols-2 gap-2 mt-auto">

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200
                  ${isOutOfStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-[#5a46c2] text-white hover:bg-[#4936a8]'
                  }`}
              >
                <HiOutlineShoppingCart className="w-4 h-4" />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>

              {/* Add to Quotation */}
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-gray-900 text-white hover:bg-gray-700 transition-all duration-200">
                Add to Quotation
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(w => !w)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200
                  ${wishlisted
                    ? 'bg-rose-500 text-white'
                    : 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white'
                  }`}
              >
                {wishlisted
                  ? <FaHeart className="w-4 h-4" />
                  : <FaRegHeart className="w-4 h-4" />
                }
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {/* View Full Details */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="block text-center mt-3 text-xs text-[#5a46c2] hover:underline font-semibold"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes qv-fade  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes qv-slide { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}

export default QuickViewModal;