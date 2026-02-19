import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/Sidebar";
import DashHeader from "../components/layout/dashHeader";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      <SideBar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <DashHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
