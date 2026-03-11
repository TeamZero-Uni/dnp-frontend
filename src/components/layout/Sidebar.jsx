import { NavLink } from "react-router-dom";
import { 
  FaSignOutAlt, FaTimes, FaInbox, FaBoxes,
  FaFileInvoiceDollar, FaImages, FaVideo,
  FaComments, FaEnvelope
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

export default function Sidebar({ isOpen, toggleSidebar }) {
 const menuSections = [
  {
    title: "Dashboard",
    items: [
      { label: "Overview", icon: <MdDashboard size={20} />, path: "/dash" },
    ]
  },
  {
    title: "Product Management",
    items: [
      { label: "Product Catalog", icon: <FaBoxes size={18} />, path: "/dash/productManagement" },
      { label: "Quotation Requests", icon: <BiSolidQuoteAltLeft size={18} />, path: "/dash/quotes" },
      { label: "Online Orders", icon: <FaInbox size={18} />, path: "/dash/orders" },
      { label: "Cash on Delivery Orders", icon: <FaInbox size={18} />, path: "/dash/cod-orders" },
    ]
  },
  {
    title: "Financial Records",
    items: [
      { label: "Transaction History", icon: <FaFileInvoiceDollar size={18} />, path: "/dash/transactions" }
    ]
  },
  {
    title: "Media Management",
    items: [
      { label: "Image Gallery", icon: <FaImages size={18} />, path: "/dash/gallery" },
      { label: "Video Library", icon: <FaVideo size={18} />, path: "/dashboard/gallery/videos" },
      { label: "Customer Feedback", icon: <FaComments size={18} />, path: "/dashboard/feedback" }
    ]
  }
];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-secondary h-screen flex flex-col border-r border-gray-200
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* ── Redesigned Header ── */}
        <div className="relative overflow-hidden px-5 pt-6 pb-5 border-b border-white/10">
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#5a46c2]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[#febc1c]/10 blur-xl pointer-events-none" />

          <div className="relative flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-[#5a46c2] to-[#7b65e8] flex items-center justify-center shadow-lg shadow-[#5a46c2]/40">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-secondary" />
            </div>

            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-[22px] font-black tracking-tight text-[#febc1c]">DNP</span>
                <span className="text-[22px] font-black tracking-tight text-[#7b65e8]">3D</span>
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-0.5">
                Hobby Lobby
              </span>
            </div>

            <button 
              onClick={toggleSidebar} 
              className="lg:hidden ml-auto w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/10"
            >
              <FaTimes size={15} />
            </button>
          </div>

          <div className="relative mt-4 h-px w-full overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#5a46c2]/60 to-transparent" />
          </div>
        </div>

        <nav
          className="flex-1 px-4 py-6 space-y-7 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`nav::-webkit-scrollbar { display: none; }`}</style>
          {menuSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-4 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end
                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? "bg-[#5a46c2]/15 text-[#dedced]" 
                        : "text-gray-400 hover:bg-[#5a46c2]/15 hover:text-[#dedced]"}
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

        <div className="p-4 border-t border-gray-400">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-[#5a46c2]/15 rounded-xl transition-all duration-200 group">
            <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}