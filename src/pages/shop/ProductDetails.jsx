import React, { useState, useEffect, useRef, useContext } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaShoppingCart, FaBolt, FaTruck, FaMapMarkerAlt,
  FaMoneyBillAlt, FaUndo, FaHeart, FaRegHeart, FaCheckCircle,
  FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
import { FiPackage, FiTag } from 'react-icons/fi';
import ProductCard from '../../components/cards/ProductCard';
import ReviewSection from '../../components/sections/ReviewSection';
import { useCart } from '../../context/CartContext';
import ReadyToStart from "../../components/ReadyToStart";
import { useProduct } from "../../hooks/useProduct"; 
import { WishlistContext } from '../../context/WishlistContext';

const MAX_QTY = 100;

function Toast({ message, type, visible }) {
  const bg = type === 'wishlist' ? 'bg-violet-500' : type === 'error' ? 'bg-rose-500' : 'bg-emerald-500';
  return (
    <div className={`fixed top-5 right-5 z-[999] flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-xl transition-all duration-400 ${bg} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}>
      <FaCheckCircle size={12} /> {message}
    </div>
  );
}

function SpecRow({ label, value, last, multiline }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null; 
  
  return (
    <tr className={!last ? 'border-b border-slate-100' : ''}>
      <td className={`py-3 pl-3 pr-2 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[25%] md:w-[30%] ${multiline ? 'align-top pt-4' : 'align-middle'}`}>
        {label}
      </td>
      <td className={`py-3 pr-3 text-[12px] font-medium text-slate-700 ${multiline ? 'leading-relaxed' : ''}`}>
        {value}
      </td>
    </tr>
  );
}

function DeliveryTile({ iconBg, icon, label, value, extra }) {
  return (
    <div className="flex items-start gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none mb-0.5">{label}</p>
        <p className="text-[11px] font-bold text-slate-700 leading-tight">{value}</p>
        {extra}
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const { addToCart } = useCart();

  const { products } = useProduct();
  const dbProduct = products?.find((p) => p.p_id === id || p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed,      setIsZoomed]      = useState(false);
  const [quantity,      setQuantity]      = useState(1);
  const [toast,         setToast]         = useState({ message: '', type: 'success', visible: false });
  const toastTimer = useRef(null);
  
  const scrollRef = useRef(null);

  const { wishlistItems, handleWishlistToggle } = useContext(WishlistContext);
  const productId = dbProduct?.p_id || dbProduct?.id;
  const isWishlisted = wishlistItems?.includes(productId) || false;

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const inStock = dbProduct?.p_status === "IN_STOCK" || dbProduct?.status === "stock";
  const maxQty = inStock ? MAX_QTY : 0;
  const productCategory = dbProduct?.category?.c_type || dbProduct?.category || "General";
  const selectedColor = dbProduct?.p_color || "N/A";

  const dbImages = dbProduct?.images?.length > 0 ? dbProduct.images.map((img) => img.img_url || img) : [];
  const fallbackImage = dbProduct?.p_img_path || dbProduct?.image || "/assets/images/placeholder.jpg";
  const galleryImages = dbImages.length > 0 ? dbImages.slice(0, 5) : [fallbackImage];
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0];

  const sellingPrice = Number(dbProduct?.p_price || dbProduct?.price || 0);
  const labelPrice = Number(dbProduct?.p_label_price || dbProduct?.label_price || 0);

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const intervalId = setInterval(() => {
      setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [galleryImages.length]);

  let discountPercent = 0;
  if (labelPrice > sellingPrice) {
    discountPercent = Math.round(((labelPrice - sellingPrice) / labelPrice) * 100);
  }

  let parsedFeatures = [];
  if (dbProduct?.p_features) {
    if (Array.isArray(dbProduct.p_features)) {
      parsedFeatures = dbProduct.p_features;
    } else if (typeof dbProduct.p_features === 'string') {
      try {
        const parsed = JSON.parse(dbProduct.p_features);
        parsedFeatures = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        parsedFeatures = dbProduct.p_features.split(',').map(f => f.trim());
      }
    }
  }

  let productTags = [];
  if (dbProduct?.p_tag) {
    productTags = [...new Set(dbProduct.p_tag.split(',').map(t => t.trim()).filter(t => t))];
  }

  const showToast = (message, type = 'success') => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2800);
  };

  const handleQty = dir =>
    dir === 'plus'
      ? setQuantity(q => Math.min(q + 1, maxQty))
      : setQuantity(q => Math.max(q - 1, 1));

  const getCartProductObj = () => ({
    id: dbProduct?.p_id || dbProduct?.id,
    name: dbProduct?.p_name || dbProduct?.name,
    price: dbProduct?.p_price || dbProduct?.price,
    image: activeImage,
    category: productCategory,
  });

  const handleAddToCart = async () => {
    if (!inStock) return;
    
    const result = await addToCart(getCartProductObj(), quantity, selectedColor);
    
    if (result && result.success) {
      showToast('Added to cart successfully!');
    } else if (result) {
      showToast(result.message, 'error');
    }
  };

  const handleBuyNow = async () => {
    if (!inStock) return;

    const result = await addToCart(getCartProductObj(), quantity, selectedColor);

    if (result && result.success) {
      navigate('/checkout', { 
        state: { 
          buyNowItem: { ...getCartProductObj(), quantity, selectedColor } 
        } 
      });
    } else if (result) {
      showToast(result.message, 'error');
    }
  };

  const onWishlistClick = async () => {
    if (!productId) return;
    const result = await handleWishlistToggle(productId);
    
    if (result && result.success) {
      showToast(result.isWishlisted ? 'Saved to wishlist ❤️' : 'Removed from wishlist', 'wishlist');
    }
  };

  const stockBadge = () => {
    if (!inStock) return { label: 'Out of Stock', cls: 'bg-rose-50 text-rose-500' };
    return { label: 'In Stock', cls: 'bg-emerald-50 text-emerald-600' };
  };
  const { label: stockLabel, cls: stockCls } = stockBadge();

  const relatedProducts = products
    .filter(p => (p.category?.c_type === productCategory || p.category === productCategory) && (p.p_id !== id && p.id !== id));

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320; 
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!dbProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-slate-500 font-bold">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 px-4 py-6 bg-[#f8fafc] min-h-screen font-sans text-[#334155]">
      <Toast {...toast} />

      <div className="flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto">
        <div className="w-full lg:w-[36%] space-y-3 flex-shrink-0">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="w-full aspect-square flex items-center justify-center cursor-zoom-in bg-gray-50 rounded-xl overflow-hidden"
              onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)}>
              <img src={activeImage} alt={dbProduct?.p_name || dbProduct?.name}
                className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ${isZoomed ? 'scale-150' : 'scale-100'}`} />
            </div>
          </div>
          
          {galleryImages.length > 1 && (
            <div className="flex gap-2 justify-center">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveImageIndex(i)} 
                  className={`w-16 h-16 rounded-xl overflow-hidden transition-all cursor-pointer bg-white border-2 
                    ${activeImageIndex === i ? 'border-[#5a46c2] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumb ${i+1}`} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 flex flex-col gap-4 flex-1">

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="bg-[#f0eeff] text-[#5a46c2] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {productCategory}
                </span>

                {productTags.length > 0 && productTags.map((tag, idx) => (
                  <span key={idx} className="bg-indigo-50 text-indigo-500 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest">
                    <FiTag size={10} /> {tag}
                  </span>
                ))}

                <span className={`text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 ${stockCls}`}>
                  <FiPackage size={10} /> {stockLabel}
                </span>
              </div>
              
              <h1 className="text-2xl font-extrabold text-slate-800 leading-snug mb-2">{dbProduct?.p_name || dbProduct?.name}</h1>
              
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-black text-[#5a46c2] tracking-tight">
                  Rs. {sellingPrice.toLocaleString()}
                </span>
                
                {discountPercent > 0 && (
                  <>
                    <span className="text-lg font-bold text-slate-400 line-through mb-1">
                      Rs. {labelPrice.toLocaleString()}
                    </span>
                    <span className="bg-rose-100 text-rose-600 text-[11px] font-black px-2 py-1 rounded-lg mb-1.5 uppercase tracking-wider">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex gap-5 flex-col md:flex-row">
              <div className="space-y-2.5 flex-shrink-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Color</p>
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[#5a46c2] bg-[#5a46c2]/5 text-[#5a46c2] text-xs font-bold w-fit cursor-default">
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-300 shadow-sm"
                    style={{ backgroundColor: selectedColor.toLowerCase() || '#ccc' }}
                  />
                  <span className="capitalize">{selectedColor}</span>
                </div>
              </div>

              <div className="flex-1 space-y-1.5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Specifications</p>
                <div className="rounded-xl overflow-hidden border border-slate-100 bg-white">
                  <table className="w-full">
                    <tbody>
                      <SpecRow label="Material" value={dbProduct?.p_material} />

                      <SpecRow 
                        label="Description" 
                        multiline 
                        last 
                        value={
                          <div className="whitespace-pre-wrap text-slate-600 pb-2">
                            {dbProduct?.p_description || dbProduct?.description}
                          </div>
                        } 
                      />
                      
                      <SpecRow 
                        label="Features" 
                        value={
                          parsedFeatures.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-1 py-1">
                              {parsedFeatures.map((feat, idx) => (
                                <li key={idx} className="text-slate-600">{feat}</li>
                              ))}
                            </ul>
                          ) : null
                        } 
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Qty</p>
                <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 w-fit bg-slate-50">
                  <button onClick={() => handleQty('minus')} disabled={quantity <= 1}
                    className="px-3 py-3 text-slate-500 font-black text-base hover:bg-slate-100 disabled:opacity-30 transition-colors">−</button>
                  <span className="w-15 text-center font-black text-slate-800 text-sm">{quantity}</span>
                  <button onClick={() => handleQty('plus')} disabled={quantity >= maxQty || !inStock}
                    className="px-3 py-3 text-slate-500 font-black text-base hover:bg-slate-100 disabled:opacity-30 transition-colors">+</button>
                </div>
                {inStock && <p className="text-[9px] text-slate-400 font-bold">Max {maxQty}</p>}
              </div>

              <div className="flex-1 flex flex-col gap-2 w-full">
                <button
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-[#5a46c2] to-[#4838a3] text-white text-xs font-black tracking-wide flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaBolt size={11} className="text-amber-400" />
                  {inStock ? 'BUY IT NOW' : 'OUT OF STOCK'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="flex-1 h-9 rounded-xl border-2 border-accent text-accent text-xs font-black flex items-center justify-center gap-1.5 hover:bg-blue-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaShoppingCart size={11} /> ADD TO CART
                  </button>

                  <button onClick={onWishlistClick}
                    className={`w-12 h-9 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isWishlisted
                        ? 'border-rose-300 bg-rose-50 text-rose-500 scale-105'
                        : 'border-slate-200 text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-400'
                    }`}>
                    {isWishlisted ? <FaHeart size={13} className="animate-bounce" /> : <FaRegHeart size={13} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <DeliveryTile
                iconBg="bg-blue-100" icon={<FaMapMarkerAlt size={11} className="text-blue-600" />}
                label="Delivery Area" value="Islandwide"
              />
              <DeliveryTile
                iconBg="bg-emerald-100" icon={<FaTruck size={11} className="text-emerald-600" />}
                label="Shipping" value="5–8 days"
              />
              <DeliveryTile
                iconBg="bg-orange-100" icon={<FaMoneyBillAlt size={11} className="text-orange-500" />}
                label="Payment" value="Cash on delivery"
              />
              <DeliveryTile
                iconBg="bg-slate-200" icon={<FaUndo size={10} className="text-slate-500" />}
                label="Returns" value="14-day return"
              />
            </div>

          </div>
        </div>
      </div>

      <ReviewSection productId={dbProduct?.p_id || dbProduct?.id} />

      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 border-t border-slate-100 pt-10 px-2 sm:px-0">
          
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-tighter">
              <span className="w-2 h-8 bg-accent rounded-full" />
              Related Products
            </h3>
          </div>

          <div className="relative group">
            
            {/* left side arrow */}
            <button 
              onClick={() => scroll('left')} 
              className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-slate-100 shadow-xl flex items-center justify-center text-slate-500 hover:bg-[#5a46c2] hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
            >
              <FaChevronLeft size={16} className="-ml-1" />
            </button>

            <div 
              ref={scrollRef} 
              className="flex gap-5 overflow-x-auto snap-x scrollbar-hide pb-6 pt-2 px-1 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {relatedProducts.map(item => (
                <div key={item.id || item.p_id} className="min-w-[260px] md:min-w-[280px] snap-start flex-shrink-0">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>

            {/* right side arrow */}
            <button 
              onClick={() => scroll('right')} 
              className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-slate-100 shadow-xl flex items-center justify-center text-slate-500 hover:bg-[#5a46c2] hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
            >
              <FaChevronRight size={16} className="-mr-1" />
            </button>

          </div>
        </div>
      )}
      <ReadyToStart />
    </div>
  );
}