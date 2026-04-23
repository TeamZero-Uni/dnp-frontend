import React, { useState } from "react";
import Banner from "../components/layout/Banner";
import ProductCard from "../components/cards/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import FilterSection from "../components/sections/FilterSection";
import ReadyToStart from "../components/ReadyToStart"
import {
  FaCheckCircle,
  FaTag,
  FaList,
  FaTags,
  FaDollarSign,
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
];

function Product() {
  // In Product.jsx, update your products array:
  const [products] = useState([
    {
      id: 1,
      name: "Human Skull",
      price: 1990,
      image: "/assets/images/img7.jpg",
      category: "3D Printing",
      tags: ["Skull Collection"],
      stock: 1,
      stockCount: 1,
    },
    {
      id: 2,
      name: "3D-printed human skeleton hand model",
      price: 1950,
      image: "/assets/images/img8.jpg",
      category: "3D Printing",
      tags: ["PLA+"],
      stock: 4,
      stockCount: 4,
    },
    {
      id: 3,
      name: "SlantedDesigns",
      price: 1200,
      image: "/assets/images/img9.jpg",
      category: "3D Resin Printing",
      tags: ["Resin"],
      stock: 5,
      stockCount: null,
    },
    {
      id: 4,
      name: "3D-printed or ceramic planter shaped like a puffer jacket",
      price: 2500,
      image: "/assets/images/img10.jpg",
      category: "3D Resin Printing",
      tags: ["PLA+"],
      stock: 2,
      stockCount: 2,
    },
    {
      id: 5,
      name: "3D Printable Loki Mask KeyTag",
      price: 450,
      image: "/assets/images/img11.jpg",
      category: "3D Resin Printing",
      tags: ["Resin"],
      stock: 0,
      stockCount: null,
    },
    {
      id: 6,
      name: "3D-printed toy ship",
      price: 800,
      image: "/assets/images/img18.jpg",
      category: "Injection Molding",
      tags: ["DNP Originals"],
      stock: 3,
      stockCount: 2,
    },
    {
      id: 7,
      name: "Rapid prototyping parts",
      price: 1500,
      image: "/assets/images/img19.jpg",
      category: "Injection Molding",
      tags: ["Skull Collection"],
      stock: 6,
      stockCount: 6,
    },
    {
      id: 8,
      name: "Decorative wooden carving",
      price: 2200,
      image: "/assets/images/img14.jpg",
      category: "Laser Cutting & Engraving",
      tags: ["Matte Finish"],
      stock: 2,
      stockCount: 2,
    },
    {
      id: 9,
      name: "Decorative wooden carving",
      price: 3000,
      image: "/assets/images/img15.jpg",
      category: "Laser Cutting & Engraving",
      tags: ["PLA+"],
      stock: 3,
      stockCount: 3,
    },
    {
      id: 10,
      name: "custom 3D foam sign decoration",
      price: 1800,
      image: "/assets/images/img16.jpg",
      category: "Light Letters",
      tags: ["Resin"],
      stock: 5,
      stockCount: 4,
    },
    {
      id: 11,
      name: "custom 3D foam sign decoration",
      price: 600,
      image: "/assets/images/img17.jpg",
      category: "Light Letters",
      tags: ["DNP Originals"],
      stock: 8,
      stockCount: null,
    },
  ]);

  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 10000]);
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
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // --- Filter Logic ---
  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesTag =
      selectedTags.length === 0 ||
      product.tags.some((tag) => selectedTags.includes(tag));
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || product.stock !== 0;
    return (
      matchesPrice &&
      matchesCategory &&
      matchesTag &&
      matchesSearch &&
      matchesStock
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

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
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${inStockOnly ? "left-7" : "left-1"}`}
                      ></span>
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
                  {/* Dual Range Slider Logic */}
                  <div className="relative h-1.5 w-full bg-gray-200 rounded-lg mb-6">
                    {/* Active Range Track */}
                    <div
                      className="absolute h-full bg-[#5a46c2] rounded-lg"
                      style={{
                        left: `${(priceRange[0] / 10000) * 100}%`,
                        right: `${100 - (priceRange[1] / 10000) * 100}%`,
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
                        const val = Math.min(
                          parseInt(e.target.value),
                          priceRange[1] - 500,
                        );
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
                        const val = Math.max(
                          parseInt(e.target.value),
                          priceRange[0] + 500,
                        );
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
                toggle={() => toggleSection("categories")}
                icon={<FaList size={15} />}
              >
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label
                      key={cat.name}
                      className="flex items-center group cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#5a46c2] focus:ring-[#5a46c2] cursor-pointer"
                        onChange={() => toggleCategory(cat.name)}
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-[#5a46c2] transition-colors">
                        {cat.name}{" "}
                        <span className="text-gray-300 text-xs">
                          ({cat.count})
                        </span>
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

          {/* Product Grid Area */}
          <main className="lg:w-3/4 w-full">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                Products
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:ring-2 focus:ring-[#5a46c2] outline-none bg-white"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    exit={{ opacity: 0, scale: 0.9 }}
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
