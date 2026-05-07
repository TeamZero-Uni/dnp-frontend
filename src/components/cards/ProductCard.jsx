import React, { useState, useContext } from "react"; 
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import QuickViewModal from "../sections/QuickViewModal";
import { WishlistContext } from '../../context/WishlistContext'; 

function ProductCard({ product }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { wishlistItems, handleWishlistToggle } = useContext(WishlistContext);
  const isWishlisted = wishlistItems?.includes(product.p_id) || false;
  const isOutOfStock = product.p_status !== "IN_STOCK";
  
  // Stock count logic
  const stockCount = null; 

  const onWishlistClick = async (e) => {
    e.preventDefault(); 

    const result = await handleWishlistToggle(product.p_id);

    if (result && result.success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); 
    }
  };

  return (
    <>
      <div className="group cursor-default block h-full relative">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
          
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/80">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-500 hover:bg-[#5a46c2] hover:text-white transition-all duration-200 border border-transparent hover:border-[#5a46c2]"
            >
              <HiOutlineEye className="w-3.5 h-3.5" />
              Quick View
            </button>

            <span className="w-px h-5 bg-gray-200" />

            <div className="relative">
              <button
                onClick={onWishlistClick} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 border ${
                  isWishlisted 
                    ? "bg-rose-500 text-white border-rose-500"
                    : "text-gray-500 border-transparent hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
                }`}
              >
                {isWishlisted && (
                  <span className="absolute inset-0 rounded-lg bg-rose-400 animate-ping opacity-30" />
                )}
                {isWishlisted ? (
                  <FaHeart className="w-3 h-3 relative z-10" />
                ) : (
                  <FaRegHeart className="w-3 h-3 relative z-10" />
                )}
                <span className="relative z-10">
                  {isWishlisted ? "Saved" : "Wishlist"}
                </span>
              </button>

              <div
                className={`absolute top-9 right-0 z-30 px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-lg whitespace-nowrap pointer-events-none transition-all duration-300 ${
                  isWishlisted ? "bg-rose-500 text-white" : "bg-gray-800 text-white"
                } ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
              >
                {isWishlisted ? "❤️ Added to Wishlist" : "🤍 Removed"}
              </div>
            </div>
          </div>

          <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black text-[#5a46c2] uppercase tracking-widest shadow-sm border border-[#5a46c2]/10">
                {product.category?.c_type || "General"}
              </span>
            </div>

            <img
              src={product?.images?.[0]?.img_url || product?.p_img_path || "/assets/images/placeholder.jpg"}
              alt={product?.p_name || "Product"}
              className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
                isOutOfStock ? "grayscale opacity-50" : "group-hover:scale-105"
              }`}
            />

            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-4 py-1.5 bg-red-500/90 text-white text-xs font-black rounded-full uppercase tracking-wider rotate-[-5deg] shadow-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3 leading-snug h-10">
              {product.p_name}
            </h3>

            {!isOutOfStock && (
              <div className="mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    stockCount && stockCount <= 3
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      stockCount && stockCount <= 3 ? "bg-amber-500" : "bg-emerald-500"
                    } animate-pulse`}
                  />
                  {stockCount ? `Only ${stockCount} left` : "In Stock"}
                </span>
              </div>
            )}

            <div className="mt-auto pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-black text-[#06021d] tracking-tight">
                    Rs. {Number(product.p_price).toLocaleString()}
                    <span className="text-xs font-medium text-gray-400">.00</span>
                  </p>
                </div>

                <Link
                  to={`/product/${product.p_id}`}
                  className={`bg-[#5a46c2] text-white flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold whitespace-nowrap shadow-md shadow-[#5a46c2]/20 hover:shadow-lg hover:shadow-[#5a46c2]/30 hover:scale-105 active:scale-95 transition-all duration-200 ${
                    isOutOfStock ? "opacity-50 pointer-events-none grayscale" : ""
                  }`}
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