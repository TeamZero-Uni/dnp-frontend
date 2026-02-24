import React, { useState } from 'react';
import Banner from '../components/layout/Banner'
import ProductCard from '../components/cards/ProductCard';
import FilterSection from '../components/layout/FilterSection';


  const categories = [
    { name: '3D Printing', count: 12 },
    { name: '3D Resin Printing', count: 45 },
    { name: 'Laser Cutting & Engraving', count: 30 },
    { name: 'Light Letters', count: 8 },
    { name: 'Injection Molding', count: 20 }
  ];

  const tagsList = ['PLA+', 'Resin', 'Skull Collection', 'Matte Finish', 'DNP Originals'];


  function Product() {

  const [products] = useState([
    { id: 1, name: 'Human Skull', price: 1990, image: '/assets/images/img7.jpg', category: '3D Printing', tags: ['Skull Collection'] },
    { id: 2, name: '3D-printed human skeleton hand model', price: 1950, image: '/assets/images/img8.jpg', category: '3D Printing', tags: ['PLA+'] },
    { id: 3, name: 'SlantedDesigns', price: 1200, image: '/assets/images/img9.jpg', category: '3D Resin Printing', tags: ['Resin'] },
    { id: 4, name: '3D-printed or ceramic planter shaped like a puffer jacket', price: 2500, image: '/assets/images/img10.jpg', category: '3D Resin Printing', tags: ['PLA+'] },
    { id: 5, name: '3D Printable Loki Mask KeyTag', price: 450, image: '/assets/images/img11.jpg', category: '3D Resin Printing', tags: ['Resin'] },
    { id: 6, name: '3D-printed toy ship', price: 800, image: '/assets/images/img18.jpg', category: 'Injection Molding', tags: ['DNP Originals'] },
    { id: 7, name: 'Rapid prototyping parts', price: 1500, image: '/assets/images/img19.jpg', category: 'Injection Molding', tags: ['Skull Collection'] },
    { id: 8, name: 'Decorative wooden carving', price: 2200, image: '/assets/images/img14.jpg', category: 'Laser Cutting & Engraving', tags: ['Matte Finish'] },
    { id: 9, name: 'Decorative wooden carving', price: 3000, image: '/assets/images/img15.jpg', category: 'Laser Cutting & Engraving', tags: ['PLA+'] },
    { id: 10, name: 'custom 3D foam sign decoration', price: 1800, image: '/assets/images/img16.jpg', category: 'Light Letters', tags: ['Resin'] },
    { id: 11, name: 'custom 3D foam sign decoration', price: 600, image: '/assets/images/img17.jpg', category: 'Light Letters', tags: ['DNP Originals'] },
  ])

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [openSections, setOpenSections] = useState({price: true,categories: true,tags: true});

    // --- Handlers ---
  const toggleSection = (section) => {setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));};

  const toggleCategory = (name) => {setSelectedCategories(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);};

  const toggleTag = (tag) => {setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);};

  // --- Filter Logic ---
  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesTag = selectedTags.length === 0 || product.tags.some(tag => selectedTags.includes(tag));
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPrice && matchesCategory && matchesTag && matchesSearch;
  });

   return (
    <>
      <Banner 
        title="Shop"
        subtitle="Explore our collection of premium 3D printed wall art, intricate miniatures, and unique home decor."
        breadcrumbs={["Home", "Shop"]}
        backgroundImage="/assets/images/anime-8788959.jpg"
        icon="product"
      />
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
      <aside className="lg:w-1/4 w-full">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <h2 className="text-xl font-black text-[#5a46c2] mb-2 tracking-tight uppercase">Filter Results</h2>

          {/* SEARCH BAR */}
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#5a46c2] outline-none transition-all"
                />
                <button className="absolute right-2 top-1.5 p-1.5 bg-[#5a46c2] text-white rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

          {/* PRICE SECTION */}
          <FilterSection 
            title="Price" 
            isOpen={openSections.price} 
            toggle={() => toggleSection('price')}
          >
            <div className="px-1 pt-2">
              {/* Dual Range Slider Logic */}
              <div className="relative h-1.5 w-full bg-gray-200 rounded-lg mb-6">
                {/* Active Range Track */}
                <div 
                  className="absolute h-full bg-[#5a46c2] rounded-lg"
                  style={{
                    left: `${(priceRange[0] / 10000) * 100}%`,
                    right: `${100 - (priceRange[1] / 10000) * 100}%`
                  }}
                ></div>
          
                {/* Minimum Price Slider */}
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Math.min(parseInt(e.target.value), priceRange[1] - 500);
                    setPriceRange([val, priceRange[1]]);
                  }}
                  className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-[#febc1c] pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                  style={{ zIndex: priceRange[0] > 9000 ? 5 : 3 }}
                />
          
                {/* Maximum Price Slider */}
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = Math.max(parseInt(e.target.value), priceRange[0] + 500);
                    setPriceRange([priceRange[0], val]);
                  }}
                  className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-[#febc1c] pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                  style={{ zIndex: 4 }}
                />
              </div>
                
              {/* Display Values */}
              <div className="flex justify-between items-center text-[12px] font-bold">
                <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-gray-500">
                  Rs. {priceRange[0]}
                </div>
                <div className="text-[#5a46c2] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">
                  Rs. {priceRange[1]}
                </div>
              </div>
            </div>
          </FilterSection>

          {/* CATEGORIES SECTION */}
          <FilterSection 
            title="Categories" 
            isOpen={openSections.categories} 
            toggle={() => toggleSection('categories')}
          >
            <div className="space-y-3">
              {categories.map(cat => (
                <label key={cat.name} className="flex items-center group cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-[#5a46c2] focus:ring-[#5a46c2] cursor-pointer"
                    onChange={() => toggleCategory(cat.name)}
                  />
                  <span className="ml-3 text-sm text-gray-600 group-hover:text-[#5a46c2] transition-colors">
                    {cat.name} <span className="text-gray-300 text-xs">({cat.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>
            
          {/* TAGS SECTION */}
          <FilterSection 
            title="Tags" 
            isOpen={openSections.tags} 
            toggle={() => toggleSection('tags')}
          >
            <div className="flex flex-wrap gap-2">
              {tagsList.map(tag => (
                <button 
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-[11px] rounded-lg border transition-all font-bold ${
                    selectedTags.includes(tag) 
                    ? 'bg-[#5a46c2] text-white border-[#5a46c2]' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-[#5a46c2] hover:text-[#5a46c2]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FilterSection>
            
        </div>
      </aside>

          {/* Product Grid Area */}
          <main className="lg:w-3/4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-400 font-medium text-lg">No items match your criteria.</p>
              </div>
            )}
          </main>

        </div>
      </div>
      </>
     
  );
};
export default Product