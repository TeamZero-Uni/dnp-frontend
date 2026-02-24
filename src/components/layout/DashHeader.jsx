import { FaBars, FaBell, FaHome, FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DashHeader({ toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center flex-1">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mr-3"
            aria-label="Open menu"
          >
            <FaBars size={20} />
          </button>

          <div className="hidden md:block mr-8">
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
              Admin Panel
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Go to Home"
          >
            <FaHome size={19} />
          </button>

          <button className="relative p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <FaBell size={19} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

          <div className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-full transition-colors group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                AU
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-bold text-gray-800 leading-tight">
                Admin User
              </p>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashHeader;
