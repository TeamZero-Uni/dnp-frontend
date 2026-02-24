import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';

function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group cursor-pointer block h-full relative"
    >
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
        <button 
          onClick={(e) => {
            e.preventDefault();
            console.log("Added to wishlist:", product.name);
          }}
          className="absolute top-3 left-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-rose-500 hover:bg-white shadow-sm transition-all duration-300"
        >
        <FaRegHeart className="w-3.5 h-3.5" />
        </button>
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tighter shadow-sm
            ${isOutOfStock 
              ? 'bg-red-100 text-red-600 border border-red-200' 
              : 'bg-green-100 text-green-600 border border-green-200'
            }`}>
            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
          </span>
        </div>

        {/* Image Section */}
        <div className='aspect-square bg-gray-50 relative p-4 flex items-center justify-center overflow-hidden'>
          <img 
            src={product.image} 
            alt={product.name}
            className={`max-h-full w-auto object-contain transition-transform duration-500 
              ${isOutOfStock ? 'grayscale opacity-50' : 'group-hover:scale-110'}`} 
          />
        </div>

        {/* Content Section */}
        <div className='p-4 flex flex-col flex-grow'>
          <span className='text-[10px] font-bold text-[#5a46c2] uppercase tracking-widest mb-1'>
            {product.category}
          </span>
          <h3 className='text-sm font-semibold text-gray-800 line-clamp-2 mb-1 h-10'>
            {product.name}
          </h3>
          
          <div className='mt-auto pt-2 flex items-center justify-between'>
            <p className='text-md font-black text-gray-900'>
              Rs. {product.price.toLocaleString()}
            </p>
            
            {/* Arrow Icon */}
            <div className="bg-[#5a46c2] p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;