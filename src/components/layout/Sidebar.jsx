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
      title: "Main",
      items: [
        { label: "Dashboard", icon: <MdDashboard size={20} />, path: "/dash" },
      ]
    },
    {
      title: "Management",
      items: [
        { label: "Products", icon: <FaBoxes size={18} />, path: "/dash/productManagement" },
        { label: "Orders", icon: <FaInbox size={18} />, path: "/dash/orders" },
        { label: "Quotes", icon: <BiSolidQuoteAltLeft size={18} />, path: "/dash/quotes" }
      ]
    },
    {
      title: "Financial",
      items: [
        { label: "Transactions", icon: <FaFileInvoiceDollar size={18} />, path: "/dash/transactions" }
      ]
    },
    {
      title: "Content",
      items: [
        { label: "Image Gallery", icon: <FaImages size={18} />, path: "/dash/galleryimages" },
        { label: "Video Gallery", icon: <FaVideo size={18} />, path: "/dashboard/gallery/videos" },
        { label: "Contact Requests", icon: <FaEnvelope size={18} />, path: "/dashboard/contacts" },
        { label: "Feedback", icon: <FaComments size={18} />, path: "/dashboard/feedback" }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-secondary h-screen flex flex-col border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        <div className="p-6 border-b border-gray-600">
          <div className="flex items-center">
            <div className="p-1">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="h-12" 
              />
            </div>
            <div className="flex flex-col leading-tight ml-2">
              <span className="text-xl font-extrabold tracking-tight text-[#febc1c]">
                DNP <span className="text-[#5a46c2]">3D</span>
              </span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Hobby Lobby
              </span>
            </div>
            <button 
              onClick={toggleSidebar} 
              className="lg:hidden ml-auto text-gray-400 hover:text-gray-600 p-2"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-7 overflow-y-auto custom-scrollbar">
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

        {/* Logout Footer */}
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