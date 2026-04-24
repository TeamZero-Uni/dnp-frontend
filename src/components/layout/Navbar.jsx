import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";

const NAV = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/service" },

  {
    label: "Works",
    links: [
      { label: "Gallery", path: "/gallery" },
      { label: "Innovation", path: "/inovation" },
      { label: "Portfolio", path: "/portfolio" },
    ],
  },

  {
    label: "About",
    links: [
      { label: "About US", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
  },

  { label: "Shop", path: "/shop" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState(null);
  const navRef = useRef(null);
  const { cartItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActive(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const closeAll = () => {
    setActive(null);
    setMobileOpen(false);
    setMobileExp(null);
  };

  return (
    <>
      <style>{`
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0); }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link
              to="/"
              onClick={closeAll}
              className="flex items-center gap-1.5 group shrink-0"
            >
              <div className="group-hover:rotate-12 transition-transform duration-300">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="h-9 w-auto"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[22px] font-extrabold text-black tracking-tight">
                  DNP <span className="text-[#5743be]">3D</span>
                </span>
                <span className="text-[8.5px] font-black text-gray-400 tracking-[0.18em] uppercase mt-0.5">
                  Hobby Lobby
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center">
              {NAV.map((item) =>
                item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="relative px-4 py-2 text-[14.5px] font-semibold text-slate-800 hover:text-[#5743be] transition-colors group"
                  >
                    {item.label}
                    <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-[#5743be] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Link>
                ) : (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActive(item.label)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-[14.5px] font-semibold transition-colors ${
                        active === item.label
                          ? "text-[#5743be]"
                          : "text-slate-800 hover:text-[#5743be]"
                      }`}
                    >
                      {item.label}
                      <FiChevronDown
                        size={12}
                        className={`transition-transform duration-200 mt-0.5 ${active === item.label ? "rotate-180" : ""}`}
                      />
                    </button>

                    {active === item.label && (
                      <div
                        className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 bg-white rounded-xl overflow-hidden"
                        style={{
                          minWidth: 180,
                          boxShadow:
                            "0 8px 30px rgba(90,70,194,.13), 0 1px 4px rgba(0,0,0,.07)",
                          animation: "fadeDown .15s ease both",
                          border: "1px solid rgba(90,70,194,.12)",
                        }}
                      >
                        <div
                          className="h-0.75"
                          style={{
                            background:
                              "linear-gradient(90deg,#5a46c2,#7c66e3)",
                          }}
                        />
                        <div className="py-1.5">
                          {item.links.map((link, i) => (
                            <Link
                              key={link.label}
                              to={link.path}
                              onClick={() => setActive(null)}
                              className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-[#5743be] hover:bg-violet-50 transition-colors group/link"
                              style={{
                                animation: `slideRight .2s ease ${i * 0.04}s both`,
                              }}
                            >
                              {link.label}
                              <span className="w-1 h-1 rounded-full bg-[#5a46c2] opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              <Link
                to="/cart"
                className="relative p-2.5 rounded-full text-slate-600 hover:text-[#5a46c2] hover:bg-violet-50 transition-all"
              >
                <FiShoppingCart size={19} />
                {cartItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    if (user?.role === "ADMIN") navigate("/dash");
                    else navigate("/customer-profile");
                  }}
                  className="p-1 ml-0.5 hover:ring-2 ring-[#5a46c2] ring-offset-2 rounded-full transition-all"
                >
                  <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                    <FiUser size={17} />
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-[13px] font-bold text-slate-700 hover:text-[#5a46c2] transition-colors"
                >
                  Sign In
                </Link>
              )}

              <button
                className="ml-1 px-5 py-2.5 rounded-full text-[13px] font-bold text-white transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#5a46c2,#4838a3)",
                  boxShadow: "0 4px 14px rgba(90,70,194,.35)",
                }}
              >
                Get a Quote
              </button>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <Link to="/cart" className="relative text-slate-700 p-1">
                <FiShoppingCart size={21} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#5a46c2] text-white text-[9px] h-4 w-4 flex items-center justify-center rounded-full font-black">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl bg-violet-50 border border-violet-100 text-[#5a46c2]"
              >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden fixed inset-x-0 top-18 bg-white border-t border-slate-100 transition-all duration-300 overflow-y-auto ${
            mobileOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
          style={{
            zIndex: 40,
            maxHeight: "calc(100vh - 72px)",
            boxShadow: "0 12px 40px rgba(0,0,0,.08)",
          }}
        >
          <div
            className="h-0.75"
            style={{ background: "linear-gradient(90deg,#5a46c2,#7c66e3)" }}
          />

          <div className="px-4 py-3 space-y-0.5">
            {NAV.map((item, idx) =>
              item.path ? (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeAll}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[15.5px] font-bold text-slate-700 hover:text-[#5a46c2] hover:bg-violet-50 transition-colors"
                  style={{
                    animation: mobileOpen
                      ? `slideRight .3s ease ${idx * 0.04}s both`
                      : "none",
                  }}
                >
                  {item.label}
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </Link>
              ) : (
                <div
                  key={item.label}
                  style={{
                    animation: mobileOpen
                      ? `slideRight .3s ease ${idx * 0.04}s both`
                      : "none",
                  }}
                >
                  <button
                    onClick={() =>
                      setMobileExp(mobileExp === item.label ? null : item.label)
                    }
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15.5px] font-bold transition-colors ${
                      mobileExp === item.label
                        ? "text-[#5a46c2] bg-violet-50"
                        : "text-slate-700 hover:text-[#5a46c2] hover:bg-violet-50"
                    }`}
                  >
                    {item.label}
                    <FiChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${mobileExp === item.label ? "rotate-180 text-[#5a46c2]" : "text-slate-400"}`}
                    />
                  </button>

                  {mobileExp === item.label && (
                    <div
                      className="mx-2 mb-1 rounded-xl overflow-hidden border border-violet-100 bg-violet-50/50"
                      style={{ animation: "fadeDown .15s ease both" }}
                    >
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          to={link.path}
                          onClick={closeAll}
                          className="flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-slate-600 hover:text-[#5a46c2] border-b border-violet-100 last:border-0 hover:bg-violet-100/40 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#5a46c2] shrink-0" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}

            <div className="pt-3 mt-1 border-t border-slate-100 space-y-2">
              {isAuthenticated ? (
                <Link
                  to={user?.role === "ADMIN" ? "/dash" : "/customer-profile"}
                  onClick={closeAll}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#5a46c2,#4838a3)",
                    }}
                  >
                    <FiUser size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none">
                      My Account
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Profile & settings
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeAll}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 hover:text-[#5a46c2] hover:bg-violet-50 transition-all w-full"
                >
                  <FiUser size={15} />
                  Sign In
                </Link>
              )}
              <button
                onClick={closeAll}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg,#5a46c2,#4838a3)",
                  boxShadow: "0 4px 14px rgba(90,70,194,.3)",
                }}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
