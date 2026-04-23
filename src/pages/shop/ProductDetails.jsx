import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaShoppingCart, FaBolt, FaTruck, FaMapMarkerAlt,
  FaMoneyBillAlt, FaUndo, FaHeart, FaRegHeart, FaCheckCircle,
} from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import ProductCard from '../../components/cards/ProductCard';
import ReviewSection from '../../components/sections/ReviewSection';
import { useCart } from '../../context/CartContext';
import ReadyToStart from "../../components/ReadyToStart";

/* ─────────────── constants ──────────────────────────────────── */
const MAX_QTY = 10;

const allProducts = [
  { id: 1,  name: 'Human Skull',                                               price: 1990, image: '/assets/images/img7.jpg',  category: '3D Printing',               stock: 4,  weight: '180g',  dimensions: '15×12×10 cm', layerHeight: '0.10mm', description: 'A highly detailed low-poly skull model, 3D printed with precision PLA+. Great for education, display, or artistic use.' },
  { id: 2,  name: '3D-printed human skeleton hand model',                      price: 1950, image: '/assets/images/img8.jpg',  category: '3D Printing',               stock: 12, weight: '210g',  dimensions: '22×9×5 cm',   layerHeight: '0.12mm', description: 'Anatomically accurate skeleton hand model printed at 0.12mm resolution. Ideal for medical reference or collectors.' },
  { id: 3,  name: 'SlantedDesigns',                                             price: 1200, image: '/assets/images/img9.jpg',  category: '3D Resin Printing',         stock: 0,  weight: '95g',   dimensions: '10×10×3 cm',  layerHeight: '0.05mm', description: 'Custom slanted design piece using high-detail resin printing. Perfect for modern decor and artistic displays.' },
  { id: 4,  name: '3D-printed or ceramic planter shaped like a puffer jacket', price: 2500, image: '/assets/images/img10.jpg', category: '3D Resin Printing',         stock: 7,  weight: '320g',  dimensions: '18×14×14 cm', layerHeight: '0.05mm', description: 'Quirky puffer jacket-shaped planter, printed in durable resin. A stylish statement piece for any indoor plant.' },
  { id: 5,  name: '3D Printable Loki Mask KeyTag',                             price:  450, image: '/assets/images/img11.jpg', category: '3D Resin Printing',         stock: 20, weight: '25g',   dimensions: '6×4×1 cm',    layerHeight: '0.05mm', description: 'Compact Loki-inspired mask keyring printed in fine resin detail. A fun, collectible everyday carry accessory.' },
  { id: 6,  name: '3D-printed toy ship',                                       price:  800, image: '/assets/images/img18.jpg', category: 'Injection Molding',         stock: 3,  weight: '140g',  dimensions: '20×8×6 cm',   layerHeight: 'N/A',    description: 'Detailed toy ship model crafted via injection molding for durability. Smooth finish, safe for all ages.' },
  { id: 7,  name: 'Rapid prototyping parts',                                   price: 1500, image: '/assets/images/img19.jpg', category: 'Injection Molding',         stock: 8,  weight: '260g',  dimensions: '25×15×10 cm', layerHeight: 'N/A',    description: 'High-tolerance rapid prototype components. Suitable for mechanical testing, fitment checks, and early-stage product development.' },
  { id: 8,  name: 'Decorative wooden carving',                                 price: 2200, image: '/assets/images/img14.jpg', category: 'Laser Cutting & Engraving', stock: 5,  weight: '380g',  dimensions: '30×20×2 cm',  layerHeight: 'N/A',    description: 'Precision laser-cut decorative wood panel with intricate engraving. Ideal for wall art, gifting, or interior decor.' },
  { id: 9,  name: 'Decorative wooden carving',                                 price: 3000, image: '/assets/images/img15.jpg', category: 'Laser Cutting & Engraving', stock: 2,  weight: '450g',  dimensions: '40×30×3 cm',  layerHeight: 'N/A',    description: 'Large-format laser-engraved wooden artwork with fine detail. A premium handcrafted piece for home or office spaces.' },
  { id: 10, name: 'custom 3D foam sign decoration',                            price: 1800, image: '/assets/images/img16.jpg', category: 'Light Letters',              stock: 6,  weight: '200g',  dimensions: '35×15×5 cm',  layerHeight: 'N/A',    description: 'Bold custom foam light letters for events, storefronts, or home decor. Lightweight and easy to mount.' },
  { id: 11, name: 'custom 3D foam sign decoration',                            price:  600, image: '/assets/images/img17.jpg', category: 'Light Letters',              stock: 15, weight: '120g',  dimensions: '20×10×5 cm',  layerHeight: 'N/A',    description: 'Compact custom foam sign letters, great for personalised gifts, desk decor, or small event signage.' },
];

const COLORS = [
  { name: 'White', hex: '#FFFFFF', ring: '#cbd5e1' },
  { name: 'Black', hex: '#1e293b', ring: '#1e293b' },
];

const SRI_LANKA_CITIES = [
  'Colombo','Kandy','Galle','Jaffna','Matara',
  'Negombo','Anuradhapura','Trincomalee','Batticaloa','Kurunegala',
];

/* ─────────────── Toast ──────────────────────────────────────── */
function Toast({ message, type, visible }) {
  const bg = type === 'wishlist' ? 'bg-violet-500' : type === 'error' ? 'bg-rose-500' : 'bg-emerald-500';
  return (
    <div className={`fixed top-5 right-5 z-[999] flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-xl transition-all duration-400 ${bg} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}>
      <FaCheckCircle size={12} /> {message}
    </div>
  );
}

/* ─────────────── LocationModal ──────────────────────────────── */
function LocationModal({ current, onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const filtered = SRI_LANKA_CITIES.filter(c => c.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-5 w-72 space-y-3" onClick={e => e.stopPropagation()}>
        <p className="font-black text-slate-800 text-sm">Select City</p>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-blue-400" />
        <div className="max-h-44 overflow-y-auto space-y-0.5">
          {filtered.map(city => (
            <button key={city} onClick={() => { onSelect(city); onClose(); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${city === current ? 'bg-blue-600 text-white' : 'hover:bg-slate-50 text-slate-600'}`}>
              {city}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full text-center text-[10px] text-slate-400 hover:text-slate-500 font-bold">Cancel</button>
      </div>
    </div>
  );
}

/* ─────────────── Spec Table Row ─────────────────────────────── */
function SpecRow({ label, value, last, multiline }) {
  return (
    <tr className={!last ? 'border-b border-slate-100' : ''}>
      <td className={`py-1.5 pl-3 pr-2 text-[10px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap w-[34%] ${multiline ? 'align-top pt-2' : ''}`}>
        {label}
      </td>
      <td className={`py-1.5 pr-3 text-[11px] font-bold text-slate-700 ${multiline ? 'leading-relaxed' : ''}`}>
        {value}
      </td>
    </tr>
  );
}

/* ─────────────── Delivery Strip Tile ───────────────────────── */
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

/* ─────────────── Main Component ─────────────────────────────── */
export default function ProductDetails() {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const { addToCart } = useCart();

  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];
  const inStock = product.stock > 0;

  const galleryImages = [product.image, '/assets/images/img18.jpg', '/assets/images/img7.jpg'];
  const [activeImage,   setActiveImage]   = useState(product.image);
  const [isZoomed,      setIsZoomed]      = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [quantity,      setQuantity]      = useState(1);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [city,          setCity]          = useState('Colombo');
  const [showCityModal, setShowCityModal] = useState(false);
  const [toast,         setToast]         = useState({ message: '', type: 'success', visible: false });
  const toastTimer = useRef(null);

  const maxQty = Math.min(MAX_QTY, product.stock);

  useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    setSelectedColor(COLORS[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const showToast = (message, type = 'success') => {
    clearTimeout(toastTimer.current);
    setToast({ message, type, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2800);
  };

  const handleQty = dir =>
    dir === 'plus'
      ? setQuantity(q => Math.min(q + 1, maxQty))
      : setQuantity(q => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart(product, quantity, selectedColor.name);
    showToast('Added to cart!');
  };

  // ── BUY IT NOW ───────────────────────────────────────────────
 const handleBuyNow = () => {
    navigate('/checkout', { 
      state: { 
        buyNowItem: { ...product, quantity, selectedColor } 
      } 
    });
  };
  // ─────────────────────────────────────────────────────────────

  const handleWishlist = () => {
    setWishlisted(w => !w);
    showToast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist ❤️', 'wishlist');
  };

  const stockBadge = () => {
    if (!inStock)            return { label: 'Out of Stock',                cls: 'bg-rose-50 text-rose-500'       };
    if (product.stock <= 3)  return { label: `Only ${product.stock} left!`, cls: 'bg-amber-50 text-amber-600'     };
    return                          { label: 'In Stock',                    cls: 'bg-emerald-50 text-emerald-600' };
  };
  const { label: stockLabel, cls: stockCls } = stockBadge();

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto pt-20 px-4 py-6 bg-[#f8fafc] min-h-screen font-sans text-[#334155]">

      <Toast {...toast} />
      {showCityModal && <LocationModal current={city} onSelect={setCity} onClose={() => setShowCityModal(false)} />}

      {/* ── Top Row ── */}
      <div className="flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto">

        {/* ── Gallery ── */}
        <div className="w-full lg:w-[36%] space-y-3 flex-shrink-0">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="w-full aspect-square flex items-center justify-center cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)}>
              <img src={activeImage} alt={product.name}
                className={`max-h-full object-contain transition-transform duration-700 ${isZoomed ? 'scale-150' : 'scale-100'}`} />
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            {galleryImages.map((img, i) => (
              <div key={i} onMouseEnter={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden transition-all cursor-pointer ${activeImage === img ? 'ring-2 ring-accent ring-offset-1 scale-105' : 'opacity-70 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Product Card ── */}
        <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 flex flex-col gap-4 flex-1">

            {/* badges + title + price */}
            <div>
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="bg-blue-50 text-accent text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  {product.category}
                </span>
                <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${stockCls}`}>
                  <FiPackage size={8} /> {stockLabel}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-800 leading-snug mb-2">{product.name}</h1>
              <span className="text-3xl font-black text-accent tracking-tight">
                Rs. {product.price.toLocaleString()}
              </span>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Color + Specs */}
            <div className="flex gap-5">
              <div className="space-y-2.5 flex-shrink-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Color</p>
                <div className="flex flex-col gap-2.5">
                  {COLORS.map(color => (
                    <button key={color.name} onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-5 px-5 py-2.5 rounded-xl border transition-all text-xs font-bold ${
                        selectedColor.name === color.name
                          ? 'border-accent bg-blue-50 text-slate-800 shadow-sm'
                          : 'border-slate-100 text-slate-500 hover:border-slate-200'
                      }`}>
                      <span className="w-5 h-5 rounded-full flex-shrink-0"
                        style={{ background: color.hex, border: `1.5px solid ${color.ring}` }} />
                      {color.name}
                      {selectedColor.name === color.name && <FaCheckCircle className="text-accent" size={9} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-1.5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Specifications</p>
                <div className="rounded-xl overflow-hidden border border-slate-100">
                  <table className="w-full">
                    <tbody>
                      <SpecRow label="Material"     value="Premium PLA+" />
                      <SpecRow label="Resolution"   value="0.12mm (High)" />
                      <SpecRow label="Layer Height" value={product.layerHeight} />
                      <SpecRow label="Dimensions"   value={product.dimensions} />
                      <SpecRow label="Weight"       value={product.weight} />
                      <SpecRow label="Description"  value={product.description} multiline last />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Qty + Buttons */}
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
                {/* BUY IT NOW — adds to cart and navigates to /checkout */}
                <button
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className="w-full h-10 rounded-xl btn-color text-xs font-black tracking-wide flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaBolt size={11} />
                  {inStock ? 'BUY IT NOW' : 'OUT OF STOCK'}
                </button>

                <div className="flex gap-2">
                  {/* ADD TO CART — adds to cart and stays on page */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="flex-1 h-9 rounded-xl border-2 border-accent text-accent text-xs font-black flex items-center justify-center gap-1.5 hover:bg-blue-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaShoppingCart size={11} /> ADD TO CART
                  </button>

                  <button onClick={handleWishlist}
                    className={`w-12 h-9 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      wishlisted
                        ? 'border-rose-300 bg-rose-50 text-rose-500 scale-105'
                        : 'border-slate-200 text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-400'
                    }`}>
                    {wishlisted ? <FaHeart size={13} className="animate-bounce" /> : <FaRegHeart size={13} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Delivery Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <DeliveryTile
                iconBg="bg-blue-100" icon={<FaMapMarkerAlt size={11} className="text-blue-600" />}
                label="Location" value={city}
                extra={
                  <button onClick={() => setShowCityModal(true)}
                    className="text-[9px] font-black text-accent hover:underline uppercase tracking-wider">
                    Change
                  </button>
                }
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

      <ReviewSection />

      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 border-t border-slate-100 pt-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-tighter">
              <span className="w-2 h-8 bg-accent rounded-full" />
              Recommended For You
            </h3>
            <button className="text-accent font-black text-[10px] hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(item => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      )}
      <ReadyToStart />
    </div>

    
  );
}