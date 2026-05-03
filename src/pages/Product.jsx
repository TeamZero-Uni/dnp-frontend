import React, { useState, useEffect } from "react"; 
import Banner from "../components/layout/Banner";
import ProductCard from "../components/cards/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import FilterSection from "../components/sections/FilterSection";
import ReadyToStart from "../components/ReadyToStart";
import { useProduct } from "../hooks/useProduct"; 
import {
  FaCheckCircle,
  FaList,
  FaTags,
  FaDollarSign,
  FaChevronDown,
} from "react-icons/fa";

const categories = [
  { name: "3D Printing", count: 12 },
  { name: "3D Resin Printing", count: 45 },
  { name: "Laser Cutting & Engraving", count: 30 },
  { name: "Light Letters", count: 8 },
  { name: "Injection Molding", count: 20 },
];

const tagsList = [
  "PLA+",
  "Resin",
  "Skull Collection",
  "Matte Finish",
  "DNP Originals",
  "sofa",
  "dining",
  "lighting",
  "vase",
  "bedding"
];

function Product() {
  const { products } = useProduct();
  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 100000]); 
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState({
    availability: true,
    price: false,
    categories: false,
    tags: false,
  });

  // --- Handlers ---
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (name) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  //Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      product.p_price >= priceRange[0] && product.p_price <= priceRange[1];
    
    const matchesCategory =
      selectedCategories.length === 0 ||
      (product.category && selectedCategories.includes(product.category.c_type));
    
    const matchesTag =
      selectedTags.length === 0 ||
      (product.p_tag && selectedTags.includes(product.p_tag));
    
    const matchesSearch = product.p_name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesStock = !inStockOnly || product.status === "stock" || product.p_status === "IN_STOCK";

    return (
      matchesPrice &&
      matchesCategory &&
      matchesTag &&
      matchesSearch &&
      matchesStock
    );
  });

  // --- Sorting Logic ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.p_price - b.p_price;
    if (sortBy === "price-desc") return b.p_price - a.p_price;
    if (sortBy === "name-asc") return a.p_name.localeCompare(b.p_name);
    return 0;
  });

  return (
    <>
      <Banner
        title="Shop"
        subtitle="Explore our collection of premium 3D printed wall art, intricate miniatures, and unique home decor."
        breadcrumbs={["Home", "Shop"]}
        backgroundImage={null}
        icon="product"
      />

      <div className="container max-w-7xl mx-[6%] px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 w-full">
            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-black text-[#5a46c2] mb-2 tracking-tight uppercase">
                Filter Results
              </h2>

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

              {/* AVAILABILITY SECTION */}
              <FilterSection
                title="Availability"
                isOpen={openSections.availability}
                toggle={() => toggleSection("availability")}
                icon={<FaCheckCircle size={15} />}
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setInStockOnly(!inStockOnly)}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 relative cursor-pointer ${inStockOnly ? "bg-blue-500" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${inStockOnly ? "left-7" : "left-1"}`}></span>
                    </div>
                    <span className="text-sm text-gray-600">In Stock</span>
                  </label>
                  {inStockOnly && (
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </FilterSection>

              {/* PRICE SECTION */}
              <FilterSection
                title="Price"
                isOpen={openSections.price}
                toggle={() => toggleSection("price")}
                icon={<FaDollarSign size={15} />}
              >
                <div className="px-1 pt-2">
                  <div className="relative h-1.5 w-full bg-gray-200 rounded-lg mb-6">
                    <div
                      className="absolute h-full bg-[#5a46c2] rounded-lg"
                      style={{
                        left: `${(priceRange[0] / 100000) * 100}%`,
                        right: `${100 - (priceRange[1] / 100000) * 100}%`,
                      }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = Math.min(parseInt(e.target.value), priceRange[1] - 500);
                        setPriceRange([val, priceRange[1]]);
                      }}
                      className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-[#febc1c] pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                      style={{ zIndex: priceRange[0] > 90000 ? 5 : 3 }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const val = Math.max(parseInt(e.target.value), priceRange[0] + 500);
                        setPriceRange([priceRange[0], val]);
                      }}
                      className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-[#febc1c] pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                      style={{ zIndex: 4 }}
                    />
                  </div>
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
                toggle={() => toggleSection("categories")}
                icon={<FaList size={15} />}
              >
                <div className="space-y-3">
                  {categories.map((cat) => (
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
                toggle={() => toggleSection("tags")}
                icon={<FaTags size={15} />}
              >
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 text-[11px] rounded-lg border transition-all font-bold ${
                        selectedTags.includes(tag)
                          ? "bg-[#5a46c2] text-white border-[#5a46c2]"
                          : "bg-white text-gray-400 border-gray-100 hover:border-[#5a46c2] hover:text-[#5a46c2]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* --- PRODUCT GRID AREA --- */}
          <main className="lg:w-3/4 w-full relative z-0">
            
            {/* SORT BAR */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                Products
              </h2>
              <div className="relative z-20 min-w-[220px] max-w-full">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none border-2 border-[#5a46c2] rounded-2xl pl-4 pr-11 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[#5a46c2]/30 focus:border-[#5a46c2] outline-none bg-white shadow-sm"
                >
                  <option value="default">Default sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={12} />
              </div>
            </div>

            {/* MAIN PRODUCT DISPLAY AREA */}
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout" initial={false}>
                {sortedProducts.map((item, index) => (
                  <motion.div
                    key={item.p_id || item.id}
                    layout="position"
                    custom={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut", delay: index * 0.015 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99, transition: { duration: 0.12 } }}
                  >
                    <ProductCard product={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300"
              >
                <p className="text-gray-400 font-medium text-lg">
                  No items match your criteria.
                </p>
              </motion.div>
            )}

          </main>
        </div>
      </div>
      <ReadyToStart />
    </>
  );
}

export default Product;