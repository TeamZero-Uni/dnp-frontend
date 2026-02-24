import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaRegHeart, FaShoppingCart, FaBolt, FaTruck, FaMapMarkerAlt,
  FaMoneyBillAlt, FaUndo, FaShieldAlt, FaBox, FaCogs, FaCheckCircle
} from 'react-icons/fa';
import { FiMessageSquare, FiInfo } from 'react-icons/fi';
import ProductCard from '../../components/cards/ProductCard'; 
import ReviewSection from '../../components/sections/ReviewSection'; 

function ProductDetails() {
  const { id } = useParams();
  
  const allProducts = [
    { id: 1, name: 'Human Skull', price: 1990, image: '/assets/images/img7.jpg', category: '3D Printing' },
    { id: 2, name: '3D-printed human skeleton hand model', price: 1950, image: '/assets/images/img8.jpg', category: '3D Printing'},
    { id: 3, name: 'SlantedDesigns', price: 1200, image: '/assets/images/img9.jpg', category: '3D Resin Printing'},
    { id: 4, name: '3D-printed or ceramic planter shaped like a puffer jacket', price: 2500, image: '/assets/images/img10.jpg', category: '3D Resin Printing' },
    { id: 5, name: '3D Printable Loki Mask KeyTag', price: 450, image: '/assets/images/img11.jpg', category: '3D Resin Printing' },
    { id: 6, name: '3D-printed toy ship', price: 800, image: '/assets/images/img18.jpg', category: 'Injection Molding'},
    { id: 7, name: 'Rapid prototyping parts', price: 1500, image: '/assets/images/img19.jpg', category: 'Injection Molding' },
    { id: 8, name: 'Decorative wooden carving', price: 2200, image: '/assets/images/img14.jpg', category: 'Laser Cutting & Engraving' },
    { id: 9, name: 'Decorative wooden carving', price: 3000, image: '/assets/images/img15.jpg', category: 'Laser Cutting & Engraving' },
    { id: 10, name: 'custom 3D foam sign decoration', price: 1800, image: '/assets/images/img16.jpg', category: 'Light Letters' },
    { id: 11, name: 'custom 3D foam sign decoration', price: 600, image: '/assets/images/img17.jpg', category: 'Light Letters' },
  ];

  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];

  // --- States ---
  const [activeImage, setActiveImage] = useState(product.image); 
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState('White'); // Color Selection State

  useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product.image]);

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4); 

  const handleQuantity = (type) => {
    if (type === 'plus') setQuantity(quantity + 1);
    else if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
  };

  const extraDetails = {
    description: "Inspired by low-poly art, this 3D printed wall mount is lightweight and easy to install. Crafted with precision using eco-friendly PLA+, it brings a modern look to your space.",
    materialCare: "Made from High-Quality PLA+. Avoid extreme heat.",
    shipping: "Standard shipping takes 3-5 business days."
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#f8fafc] min-h-screen font-sans text-[#334155]">
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        
        {/* Left Side: Gallery */}
        <div className="w-full lg:w-[38%] space-y-4">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
            <div 
              className="w-full aspect-square flex items-center justify-center cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className={`max-h-full object-contain transition-transform duration-700 ease-in-out ${isZoomed ? 'scale-150' : 'scale-100'}`} 
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            {[product.image, '/assets/images/img18.jpg', '/assets/images/img7.jpg'].map((img, index) => (
              <div 
                key={index} 
                onMouseEnter={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-2xl border-2 overflow-hidden transition-all cursor-pointer shadow-sm ${activeImage === img ? 'border-blue-600 scale-105' : 'border-white hover:border-slate-200'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Details */}
        <div className="w-full lg:w-[37%] space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{product.category}</span>
            <h1 className="text-3xl font-extrabold text-slate-800 mt-3 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-600">Rs. {product.price}</span>
                <span className="text-slate-400 line-through text-sm italic">Rs. 2,500</span>
              </div>
              <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-lg">22% OFF</span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-700">Select Color: <span className="text-blue-600">{selectedColor}</span></p>
            <div className="flex gap-3">
              {['White', 'Black'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${selectedColor === color ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <span className={`w-5 h-5 rounded-full border border-slate-200 ${color === 'White' ? 'bg-white' : 'bg-black'}`}></span>
                  <span className="text-sm font-bold">{color}</span>
                  {selectedColor === color && <FaCheckCircle className="text-blue-600 text-xs" />}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <FaBox className="text-blue-500" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Material</p>
                <p className="text-xs font-bold text-slate-700 italic">Premium PLA+</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <FaCogs className="text-blue-500" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Resolution</p>
                <p className="text-xs font-bold text-slate-700 italic">0.12mm (High)</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-slate-100 rounded-2xl h-12 overflow-hidden bg-white shadow-sm">
                <button onClick={() => handleQuantity('minus')} className="px-4 hover:bg-slate-50 text-slate-500 font-black">−</button>
                <span className="w-12 text-center font-black text-slate-800">{quantity}</span>
                <button onClick={() => handleQuantity('plus')} className="px-4 hover:bg-slate-50 text-slate-500 font-black">+</button>
              </div>
              <button className="flex-1 bg-blue-600 text-white h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                <FaBolt /> BUY IT NOW
              </button>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 border-2 border-blue-600 text-blue-600 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
                <FaShoppingCart /> ADD TO CART
              </button>
              <button className="w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all group">
                <FaRegHeart className="group-hover:fill-rose-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Delivery Box */}
        <div className="w-full lg:w-[25%] space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Delivery & Service</h4>
                <FiInfo className="text-slate-300 cursor-help" />
              </div>

              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-700 leading-tight">Colombo 01 - Fort, Western Province</p>
                    <button className="text-blue-500 font-black mt-1 hover:underline uppercase text-[9px] tracking-wider">Change Location</button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                    <FaTruck size={18} />
                  </div>
                  <div className="text-xs font-bold text-slate-600">Ships from Overseas (5-8 days)</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600">
                    <FaMoneyBillAlt size={20} />
                  </div>
                  <div className="text-xs font-bold text-slate-600 italic">Cash on Delivery Available</div>
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <FaUndo size={16} />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-slate-700">14 Days Easy Return</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Change of mind not applicable</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <FaShieldAlt size={18} />
                    </div>
                    <p className="text-xs font-bold text-slate-500 italic">Warranty Not Available</p>
                  </div>
                </div>
              </div>

              {/* Chat Support Section */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-100 cursor-pointer hover:brightness-110 transition-all flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FiMessageSquare size={20} />
                </div>
                <div className="text-xs">
                  <p className="font-black uppercase tracking-widest">Live Support</p>
                  <p className="opacity-80 text-[10px]">Chat with our designers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto mt-12 bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
        <div className="flex bg-slate-50/50">
          {['description', 'materialCare', 'shipping'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-5 text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'text-blue-600 bg-white border-b-4 border-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.replace(/([A-Z])/g, ' $1')}
            </button>
          ))}
        </div>

        <div className="p-8 relative">
          <div className={`transition-all duration-700 overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-28'}`}>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {activeTab === 'description' && extraDetails.description}
              {activeTab === 'materialCare' && extraDetails.materialCare}
              {activeTab === 'shipping' && extraDetails.shipping}
            </p>
            {!isExpanded && <div className="absolute bottom-16 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>}
          </div>
          <div className="mt-6 flex justify-center border-t border-slate-50 pt-6">
            <button onClick={() => setIsExpanded(!isExpanded)} className="px-8 py-2.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm uppercase tracking-widest">
              {isExpanded ? 'Show Less ▲' : 'Read Full Specs ▼'}
            </button>
          </div>
        </div>
      </div>

      
      <ReviewSection />

      {/* Related Products */}
      <div className="max-w-7xl mx-auto mt-20 border-t border-slate-100 pt-12">
        <div className="flex items-center justify-between mb-10">
           <h3 className="text-2xl font-black text-slate-800 flex items-center gap-4 uppercase tracking-tighter">
             <span className="w-2.5 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-100"></span> 
             Recommended For You
           </h3>
           <button className="text-blue-600 font-black text-xs hover:underline uppercase tracking-widest">View All Items</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {relatedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;