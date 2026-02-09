import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Service", path: "/service" },
    { name: "Shop", path: "/shop" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md py-3 shadow-sm border-b border-white/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-1 shrink-0 group">
            <div className="p-1 group-hover:rotate-12 transition-transform duration-300">
              <img
                src="/assets/images/logo.png"
                alt="L"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                DNP <span className="text-[#5a46c2]">3D</span>
              </span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Hobby Lobby
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {pages.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-4 py-2 font-medium text-gray-700 hover:text-[#5a46c2] transition-colors relative group"
              >
                {item.name}
                <span className="absolute inset-x-4 bottom-1 h-0.5 bg-[#5a46c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2.5 text-gray-700 hover:bg-[#5a46c2]/10 hover:text-[#5a46c2] rounded-full transition-all"
            >
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link
                to="/profile"
                className="p-1 hover:ring-2 ring-[#5a46c2] ring-offset-2 rounded-full transition-all"
              >
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  <FiUser size={18} />
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-bold text-gray-700 hover:text-[#5a46c2] px-4"
              >
                Sign In
              </Link>
            )}

            <button className="bg-[#5a46c2] hover:bg-[#4838a3] text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-purple-200 active:scale-95">
              Get a Quote
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-gray-700">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5a46c2] text-white text-[10px] px-1 rounded-full">
                  3
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-50 text-[#5a46c2]"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed top-20 left-0 w-full bg-linear-to-b from-white via-purple-50/30 to-white backdrop-blur-xl transition-all duration-500 ease-in-out
        ${
          isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="flex flex-col h-full pt-8 pb-8 px-6">
          <div className="flex-1 flex flex-col justify-center space-y-2">
            {pages.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="group py-4 px-6 rounded-2xl hover:bg-white/80 transition-all duration-300"
                style={{
                  animation: isOpen
                    ? `slideIn 0.4s ease-out ${index * 0.05}s forwards`
                    : "none",
                  opacity: 0,
                }}
              >
                <span className="text-xl font-bold text-gray-800 group-hover:text-[#5a46c2] transition-colors flex items-center justify-between">
                  {item.name}
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-200/50">
            {isLoggedIn ? (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
              >
                <div className="w-12 h-12 bg-linear-to-br from-[#5a46c2] to-[#4838a3] rounded-full flex items-center justify-center text-white shadow-lg">
                  <FiUser size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">My Account</p>
                  <p className="text-xs text-gray-500">
                    View profile & settings
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-gray-200"
              >
                <FiUser size={18} />
                <span className="font-bold text-gray-900">Sign In</span>
              </Link>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-linear-to-r from-[#5a46c2] to-[#4838a3] text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-purple-200 hover:shadow-2xl hover:shadow-purple-300 active:scale-[0.98] transition-all"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
