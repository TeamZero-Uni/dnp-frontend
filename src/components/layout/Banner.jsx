import React from 'react';
import { FaHome, FaChevronRight, FaCube, FaRocket, FaStar, FaHeart, FaLightbulb, FaPalette } from 'react-icons/fa';


function Banner({ 
  title, 
  subtitle, 
  breadcrumbs,
  backgroundImage ,
  icon 
}) {
  // Icon mapping
  const iconComponents = {
    cube: FaCube,
    rocket: FaRocket,
    star: FaStar,
    heart: FaHeart,
    lightbulb: FaLightbulb,
    palette: FaPalette
  };

  const IconComponent = iconComponents[icon] || FaCube;

  return (
    <div className="relative w-full bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 overflow-hidden mt-18">
      {backgroundImage ? (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ) : (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30" />
        </div>
      )}

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          
          <nav className="flex items-center justify-center space-x-2 mb-4 sm:mb-6 text-sm sm:text-base">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <a 
                    href="/" 
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <FaHome className="mr-2" />
                    <span>{crumb}</span>
                  </a>
                ) : (
                  <>
                    <FaChevronRight className="text-gray-400 text-xs" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-indigo-700 font-semibold">{crumb}</span>
                    ) : (
                      <a 
                        href={`/${crumb.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                      >
                        {crumb}
                      </a>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="mb-6 sm:mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
              
              <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-2xl shadow-purple-300/50 transform hover:scale-110 transition-all duration-300 animate-bounce-slow">
                <IconComponent className="text-white text-4xl sm:text-5xl lg:text-6xl" />
              </div>
              
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl leading-relaxed mx-auto">
            {subtitle}
          </p>

          <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-3">
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg shadow-purple-200" />
            <div className="h-1 w-8 sm:w-10 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full opacity-60" />
            <div className="h-1 w-4 sm:w-6 bg-purple-400 rounded-full opacity-40" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-8 sm:h-12 lg:h-16" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C300,60 600,60 900,30 L900,0 L1200,0 L1200,120 L0,120 Z" 
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  );
}

export default Banner;