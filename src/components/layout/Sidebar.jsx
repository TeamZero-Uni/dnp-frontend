import { NavLink } from "react-router-dom";
import {
  FaSignOutAlt,
  FaTimes,
  FaInbox,
  FaBoxes,
  FaFileInvoiceDollar,
  FaImages,
  FaComments,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const menuSections = [
    {
      title: "Dashboard",
      items: [
        { label: "Overview", icon: <MdDashboard size={20} />, path: "/dash" },
      ],
    },
    {
      title: "Product Management",
      items: [
        {
          label: "Product Catalog",
          icon: <FaBoxes size={18} />,
          path: "/dash/productManagement",
        },
        {
          label: "Quotation Requests",
          icon: <BiSolidQuoteAltLeft size={18} />,
          path: "/dash/quotes",
        },
        {
          label: "Online Orders",
          icon: <FaInbox size={18} />,
          path: "/dash/orders",
        },
        {
          label: "Cash on Delivery Orders",
          icon: <FaInbox size={18} />,
          path: "/dash/cod-orders",
        },
      ],
    },
    {
      title: "Financial Records",
      items: [
        {
          label: "Transaction History",
          icon: <FaFileInvoiceDollar size={18} />,
          path: "/dash/transactions",
        },
      ],
    },
    {
      title: "Media Management",
      items: [
        {
          label: "Image Gallery",
          icon: <FaImages size={18} />,
          path: "/dash/gallery",
        },
        {
          label: "Portfolio Management",
          icon: <FaBoxes size={18} />,
          path: "/dashboard/gallery/videos",
        },
        {
          label: "Customer Feedback",
          icon: <FaComments size={18} />,
          path: "/dashboard/feedback",
        },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white h-screen flex flex-col border-r border-slate-200
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="px-6 py-8 relative group">
          <div className="flex items-center gap-4">
            <div className="relative p-0.5 rounded-2xl bg-linear-to-tr from-[#5a46c2] to-[#febc1c]">
              <div className="bg-white rounded-[14px] p-2 shadow-sm">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tighter bg-linear-to-r from-[#5a46c2] to-[#4838a3] bg-clip-text text-transparent">
                  DNP
                </span>
                <span className="text-2xl font-black tracking-tighter text-slate-800">
                  3D
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-4 bg-[#febc1c] rounded-full" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Hobby Lobby
                </span>
              </div>
            </div>

            <button
              onClick={toggleSidebar}
              className="lg:hidden ml-auto p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div className="absolute bottom-0 left-6 right-6 h-px bg-slate-100">
            <div className="h-full bg-linear-to-r from-transparent via-[#5a46c2]/40 to-transparent" />
          </div>
        </div>

        <nav
          className="flex-1 px-4 py-8 space-y-8 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`nav::-webkit-scrollbar { display: none; }`}</style>

          {menuSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-4 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {section.title}
              </h3>
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end
                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-linear-to-r from-[#5a46c2] to-[#4838a3] text-white shadow-md shadow-indigo-200"
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#5a46c2]"
                      }
                    `}
                  >
                    <span className="transition-transform duration-200 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 group">
            <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
