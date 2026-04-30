import { useState } from "react";
import { 
  IoChatbubbleEllipsesOutline, 
  IoClose,
  IoPrint,         
  IoSparkles, 
  IoChatbubbles,
  IoChevronForward,
  IoArrowBack,
  IoBulb,       // Solid bulb icon for Light Letter
  IoConstruct   // Wrench icon for 3D Parts
} from "react-icons/io5";

// Make sure these files exist in your project!
import LightLetter from "./LightLetter";
import ThreeDPart from "./ThreeDPart";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState("menu");

  // Main Menu Items
  const menuItems = [
    { 
      id: "3d-printing", 
      title: "3D Printing", 
      subtitle: "Light Letter & 3D Part", 
      icon: IoPrint, 
      colorClass: "from-blue-500 to-indigo-600",
      glowColor: "shadow-indigo-500/40" 
    },
    { 
      id: "laser-cutting", 
      title: "Laser Cutting", 
      subtitle: "Cutting & Lighting", 
      icon: IoSparkles, 
      colorClass: "from-amber-400 to-orange-500",
      glowColor: "shadow-orange-500/40" 
    },
    { 
      id: "other-service", 
      title: "Other Service", 
      subtitle: "Custom request", 
      icon: IoChatbubbles, 
      colorClass: "from-emerald-400 to-teal-500",
      glowColor: "shadow-teal-500/40" 
    },
  ];

  // Smart Back Button Logic
  const handleBack = () => {
    if (currentView === "light-letter" || currentView === "3d-part") {
      setCurrentView("3d-printing"); // Go back to the 3D printing menu
    } else {
      setCurrentView("menu"); // Go back to the main menu
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentView("menu");
    }, 300);
  };

  // Dynamic Header Title
  const getHeaderTitle = () => {
    switch (currentView) {
      case "menu": return "How can we help?";
      case "3d-printing": return "3D Printing";
      case "light-letter": return "Light Letter";
      case "3d-part": return "3D Parts";
      case "laser-cutting": return "Laser Cutting";
      case "other-service": return "Other Service";
      default: return "Support";
    }
  };

  return (
    <>
      {/* Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 cursor-pointer text-white p-4 rounded-full transition-transform duration-200 hover:scale-110 active:translate-y-1 active:scale-100 bg-gradient-to-br from-indigo-500 to-slate-800 shadow-xl shadow-indigo-500/30 animate-chat-pulse"
          aria-label="Open chat"
        >
          <style>{`
            @keyframes chat-pulse {
              0%, 100% { transform: perspective(200px) rotateX(10deg) scale(1); }
              50% { transform: perspective(200px) rotateX(10deg) scale(1.12); }
            }
            .animate-chat-pulse {
              animation: chat-pulse 3s ease-in-out infinite;
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateX(10px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.25s ease-out forwards;
            }
          `}</style>
          <IoChatbubbleEllipsesOutline size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px]">
          <div className="bg-slate-50/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/60 h-[480px]">
            
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 text-slate-800 px-5 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                {currentView !== "menu" && (
                  <button 
                    onClick={handleBack}
                    className="hover:bg-slate-100 text-slate-500 hover:text-slate-800 p-2 rounded-full transition-colors cursor-pointer -ml-2"
                    aria-label="Go back"
                  >
                    <IoArrowBack size={20} />
                  </button>
                )}
                <div>
                  <h3 className="font-bold text-base tracking-tight">
                    {getHeaderTitle()}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="hover:bg-slate-100 text-slate-400 hover:text-slate-700 p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* Dynamic Body */}
            <div className="flex-1 p-5 overflow-y-auto overflow-x-hidden">
              
              {/* --- VIEW 1: MAIN MENU --- */}
              {currentView === "menu" && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <p className="text-sm text-slate-500 mb-1 font-medium px-1">Choose a service to start:</p>
                  
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id)}
                      className="relative w-full flex items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden text-left"
                    >
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r ${item.colorClass}`}></div>
                      <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.colorClass} shadow-lg ${item.glowColor} transform group-hover:scale-110 group-hover:rotate-[8deg] transition-all duration-300 mr-4`}>
                        <item.icon size={24} className="text-white drop-shadow-md" />
                      </div>
                      <div className="flex-1 relative z-10">
                        <span className="block font-bold text-slate-800 text-[15px]">{item.title}</span>
                        <span className="block text-xs text-slate-500 mt-0.5">{item.subtitle}</span>
                      </div>
                      <div className="text-slate-300 group-hover:text-slate-800 group-hover:translate-x-1 transition-all relative z-10">
                        <IoChevronForward size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* --- VIEW 2: 3D PRINTING SUB-MENU (The new layout you requested) --- */}
              {currentView === "3d-printing" && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <p className="text-sm text-slate-500 mb-1 font-medium px-1">Choose Type:</p>
                  
                  {/* Light Letter Button */}
                  <button
                    onClick={() => setCurrentView("light-letter")}
                    className="relative w-full flex items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden text-left"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/40 transform group-hover:scale-110 group-hover:rotate-[8deg] transition-all duration-300 mr-4">
                      <IoBulb size={24} className="text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1 relative z-10">
                      <span className="block font-bold text-slate-800 text-[15px]">Light Letter</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Illuminated signs</span>
                    </div>
                    <div className="text-slate-300 group-hover:text-slate-800 group-hover:translate-x-1 transition-all relative z-10">
                      <IoChevronForward size={20} />
                    </div>
                  </button>

                  {/* 3D Parts Button */}
                  <button
                    onClick={() => setCurrentView("3d-part")}
                    className="relative w-full flex items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden text-left"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r from-purple-500 to-fuchsia-600"></div>
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg shadow-fuchsia-500/40 transform group-hover:scale-110 group-hover:rotate-[8deg] transition-all duration-300 mr-4">
                      <IoConstruct size={24} className="text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1 relative z-10">
                      <span className="block font-bold text-slate-800 text-[15px]">3D Parts</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Custom parts</span>
                    </div>
                    <div className="text-slate-300 group-hover:text-slate-800 group-hover:translate-x-1 transition-all relative z-10">
                      <IoChevronForward size={20} />
                    </div>
                  </button>
                </div>
              )}

              {/* --- VIEW 3: ACTUAL FORMS/COMPONENTS --- */}
              {currentView === "light-letter" && (
                <div className="animate-fade-in h-full bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                  <LightLetter />
                </div>
              )}

              {currentView === "3d-part" && (
                <div className="animate-fade-in h-full bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                  <ThreeDPart />
                </div>
              )}

              {currentView === "laser-cutting" && (
                <div className="h-full flex items-center justify-center text-slate-500 animate-fade-in">
                  Laser Cutting form goes here
                </div>
              )}

              {currentView === "other-service" && (
                <div className="h-full flex items-center justify-center text-slate-500 animate-fade-in">
                  Custom request form goes here
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}