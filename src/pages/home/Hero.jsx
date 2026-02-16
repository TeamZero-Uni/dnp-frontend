import React, { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { FaShoppingBag, FaFacebookF } from "react-icons/fa";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const images = [
    "assets/images/img1.png",
    "assets/images/img2.png",
    "assets/images/img3.png",
    "assets/images/img4.png",
    "assets/images/img5.png",
    "assets/images/img6.png",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen mt-18 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/40">
      <div className="max-w-7xl mx-auto px-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-12">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="inline-block">
              <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                ✨ Innovation Meets Excellence
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Discover the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 animate-gradient">
                Future of Tech
              </span>{" "}
              with DNP
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Innovative solutions for modern problems. Transform your business
              with cutting-edge technology and creative strategies.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2">
                Get Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white text-[#5a46c2] px-8 py-4 rounded-lg font-medium border-2 border-gray-100 hover:border-[#5a46c2] transition-all hover:shadow-lg flex items-center gap-2">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#5a46c2]">500+</div>
                <div className="text-gray-600 text-sm">Projects Done</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#5a46c2]">98%</div>
                <div className="text-gray-600 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#5a46c2]">50+</div>
                <div className="text-gray-600 text-sm">Team Members</div>
              </div>
            </div>

            <div className="flex gap-5 pt-6">
              <a
                href="https://www.daraz.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#f85606] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(248,86,6,0.45)] overflow-hidden"
                aria-label="Visit Daraz"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <FaShoppingBag className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />

                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 transition-colors" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#1877f2] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(24,119,242,0.45)] overflow-hidden"
                aria-label="Visit Facebook"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <FaFacebookF className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />

                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 transition-colors" />
              </a>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="relative">
              <div className="relative rounded-3xl  overflow-hidden">
                <div className="aspect-square relative">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Hero ${idx + 1}`}
                      className={`absolute inset-0 w-90 h-90 mt-25 ml-25 object-cover transition-all duration-700 ${
                        idx === currentImageIndex
                          ? "translate-x-0 opacity-100"
                          : idx < currentImageIndex
                            ? "-translate-x-full opacity-0"
                            : "translate-x-full opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? "w-8 bg-indigo-600"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute -left-4 top-1/4 bg-white p-4 rounded-xl shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quality</div>
                    <div className="text-sm text-gray-600">Guaranteed</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white p-4 rounded-xl shadow-xl animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Fast</div>
                    <div className="text-sm text-gray-600">Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}