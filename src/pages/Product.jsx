import React, { useState, useEffect } from "react";
import { FaFilter, FaTimes, FaCheckCircle, FaList, FaTags, FaDollarSign, FaChevronDown } from "react-icons/fa";
import Banner from "../components/layout/Banner";
import ProductCard from "../components/cards/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import FilterSection from "../components/sections/FilterSection";
import ReadyToStart from "../components/ReadyToStart";
import { useProduct } from "../hooks/useProduct"; 
import api from "../api/api"; 

function Product() {
  const { products } = useProduct();
  
  const productList = Array.isArray(products) ? products : (products?.products || []);

  const [dbCategories, setDbCategories] = useState([]);

  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState({
    availability: true, price: false, categories: true, tags: false, 
  });

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false); 
  const itemsPerPage = 15; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        const fetchedCategories = response.data.data || response.data || [];
        setDbCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const dynamicCategories = dbCategories.map((cat) => {
    const count = productList.filter((p) => 
      (p.category?.c_type === cat.c_type) || (p.categoryId === cat.c_id) || (p.category === cat.c_type)
    ).length;
    
    return {
      name: cat.c_type,
      count: count
    };
  });

  const dynamicTagsList = [...new Set(productList.map((product) => product.p_tag).filter(tag => tag))];

  useEffect(() => {
    setCurrentPage(1);
  }, [inStockOnly, sortBy, priceRange, selectedCategories, selectedTags, searchQuery]);

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

  // --- Filter Logic ---
  const filteredProducts = productList.filter((product) => {
    const matchesPrice = product.p_price >= priceRange[0] && product.p_price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || (product.category && selectedCategories.includes(product.category.c_type));
    const matchesTag = selectedTags.length === 0 || (product.p_tag && selectedTags.includes(product.p_tag));
    const matchesSearch = product.p_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || product.status === "stock" || product.p_status === "IN_STOCK";

    return matchesPrice && matchesCategory && matchesTag && matchesSearch && matchesStock;
  });

  // --- Sorting Logic ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.p_price - b.p_price;
    if (sortBy === "price-desc") return b.p_price - a.p_price;
    if (sortBy === "name-asc") return a.p_name.localeCompare(b.p_name);
    return 0;
  });

  // --- Frontend Pagination Logic ---
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setIsRefreshing(true); 
      setCurrentPage(pageNumber);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  return (
    <>
      <Banner
        path="Shop"
        title={<>Explore Our Exclusive <br /> <span className="text-[#5a46c2]">3D Collections</span></>}
        subtitle="Explore our collection of premium 3D printed wall art, intricate miniatures, and unique home decor."
        breadcrumbs={["Home", "Shop"]}
        backgroundImage={null}
        icon="product"
      />

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-[#06021d]/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white lg:bg-transparent overflow-y-auto lg:overflow-visible transition-transform duration-300 ease-in-out lg:static lg:block lg:w-[280px] lg:z-auto lg:translate-x-0 ${
              isFilterOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-5 lg:hidden border-b border-gray-100 bg-white sticky top-0 z-10">
              <span className="font-black text-lg text-[#06021d] uppercase tracking-wider">Filters</span>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-400 hover:text-rose-500 bg-gray-50 rounded-full transition-colors">
                <FaTimes />
              </button>
            </div>

            <div className="p-5 lg:p-0">
              <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                <h2 className="text-xl font-black text-[#5a46c2] mb-4 tracking-tight uppercase hidden lg:block">
                  Filter Results
                </h2>

                {/* SEARCH BAR */}
                <div className="relative mb-6">
                  <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#5a46c2] outline-none transition-all" />
                  <button className="absolute right-2 top-1.5 p-1.5 bg-[#5a46c2] text-white rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* AVAILABILITY SECTION */}
                <FilterSection title="Availability" isOpen={openSections.availability} toggle={() => toggleSection("availability")} icon={<FaCheckCircle size={15} />}>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => setInStockOnly(!inStockOnly)} className={`w-12 h-6 rounded-full transition-colors duration-300 relative cursor-pointer ${inStockOnly ? "bg-blue-500" : "bg-gray-200"}`}>
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${inStockOnly ? "left-7" : "left-1"}`}></span>
                      </div>
                      <span className="text-sm text-gray-600">In Stock</span>
                    </label>
                    {inStockOnly && <button onClick={() => setInStockOnly(false)} className="text-xs text-blue-500 hover:underline">Clear</button>}
                  </div>
                </FilterSection>

                {/* PRICE SECTION */}
                <FilterSection title="Price" isOpen={openSections.price} toggle={() => toggleSection("price")} icon={<FaDollarSign size={15} />}>
                  <div className="px-1 pt-2">
                    <div className="relative h-1.5 w-full bg-gray-200 rounded-lg mb-6">
                      <div className="absolute h-full bg-[#5a46c2] rounded-lg" style={{ left: `${(priceRange[0] / 100000) * 100}%`, right: `${100 - (priceRange[1] / 100000) * 100}%` }}></div>
                      <input type="range" min="0" max="100000" step="500" value={priceRange[0]} onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[1] - 500), priceRange[1]])} className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-[#febc1c] pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto" style={{ zIndex: priceRange[0] > 90000 ? 5 : 3 }} />
                      <input type="range" min="0" max="100000" step="500" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0] + 500)])} className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-[#febc1c] pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto" style={{ zIndex: 4 }} />
                    </div>
                    <div className="flex justify-between items-center text-[12px] font-bold">
                      <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-gray-500">Rs. {priceRange[0]}</div>
                      <div className="text-[#5a46c2] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">Rs. {priceRange[1]}</div>
                    </div>
                  </div>
                </FilterSection>

                {/* CATEGORIES SECTION */}
                <FilterSection title="Categories" isOpen={openSections.categories} toggle={() => toggleSection("categories")} icon={<FaList size={15} />}>
                  <div className="space-y-3">
                    {dynamicCategories.length > 0 ? (
                      dynamicCategories.map((cat) => (
                        <label key={cat.name} className="flex items-center group cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300 text-[#5a46c2] focus:ring-[#5a46c2] cursor-pointer" 
                            onChange={() => toggleCategory(cat.name)} 
                            checked={selectedCategories.includes(cat.name)}
                          />
                          <span className="ml-3 text-sm text-gray-600 group-hover:text-[#5a46c2] transition-colors">
                            {cat.name} 
                            <span className="text-gray-300 text-xs ml-1">({cat.count})</span>
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">Loading categories...</p>
                    )}
                  </div>
                </FilterSection>

                {/* TAGS SECTION */}
                <FilterSection title="Tags" isOpen={openSections.tags} toggle={() => toggleSection("tags")} icon={<FaTags size={15} />}>
                  <div className="flex flex-wrap gap-2">

                    {dynamicTagsList.length > 0 ? (
                      dynamicTagsList.map((tag) => (
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
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No tags available</p>
                    )}

                  </div>
                </FilterSection>

              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0 relative z-0">
            {/* --- TOP BAR --- */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight hidden lg:block">Products</h2>
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-100 text-sm font-black text-[#5a46c2] hover:bg-slate-50 transition-colors">
                <FaFilter /> FILTERS
              </button>
              
              {/* Product Count & Sort */}
              <div className="flex items-center gap-4 ml-auto lg:ml-0">
                <span className="hidden sm:block text-sm font-bold text-gray-400">
                  Showing {currentProducts.length} of {sortedProducts.length}
                </span>
                <div className="relative z-20 min-w-[200px]">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full appearance-none border-2 border-[#5a46c2] rounded-2xl pl-4 pr-11 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[#5a46c2]/30 focus:border-[#5a46c2] outline-none bg-white shadow-sm cursor-pointer">
                    <option value="default">Default sorting</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#5a46c2]" size={12} />
                </div>
              </div>
            </div>

            {/* --- PRODUCT GRID AREA (With Refresh Effect) --- */}
            {isRefreshing ? (
              <div className="flex flex-col justify-center items-center py-32">
                <div className="w-12 h-12 border-4 border-[#5a46c2]/20 border-t-[#5a46c2] rounded-full animate-spin mb-4"></div>
                <p className="text-[#5a46c2] font-bold tracking-widest text-sm animate-pulse">LOADING...</p>
              </div>
            ) : (
              <>
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {currentProducts.map((item, index) => (
                      <motion.div
                        key={item.p_id || item.id}
                        layout="position"
                        custom={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.02 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      >
                        <ProductCard product={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {sortedProducts.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mt-5">
                    <p className="text-gray-400 font-medium text-lg">No items match your criteria.</p>
                  </motion.div>
                )}
              </>
            )}

            {/* --- CUTE NUMBERED PAGINATION --- */}
            {!isRefreshing && totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 mb-8 gap-2">
                
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                    currentPage === 1 
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                      : "bg-white border-2 border-gray-200 text-gray-600 hover:border-[#5a46c2] hover:text-[#5a46c2] hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
                          currentPage === pageNumber
                            ? "bg-[#5a46c2] text-white shadow-lg shadow-[#5a46c2]/40 scale-110"
                            : "bg-white border-2 border-gray-100 text-gray-500 hover:border-[#5a46c2]/50 hover:text-[#5a46c2] hover:-translate-y-1"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                    currentPage === totalPages 
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                      : "bg-white border-2 border-gray-200 text-gray-600 hover:border-[#5a46c2] hover:text-[#5a46c2] hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
              </div>
            )}

          </main>
        </div>
      </div>
      <ReadyToStart />
    </>
  );
}

export default Product;