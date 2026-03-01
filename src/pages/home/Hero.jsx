import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Star, Zap, Shield, Clock } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=600&fit=crop",
];

const stats = [
  { value: "500+", label: "Projects Done" },
  { value: "98%", label: "Satisfaction" },
  { value: "50+", label: "Team Members" },
];

const floatingBadges = [
  {
    icon: <Shield className="w-5 h-5 text-green-500" />,
    bg: "bg-green-50",
    title: "Quality",
    sub: "Guaranteed",
    position: "top-[18%] -left-6",
  },
  {
    icon: <Zap className="w-5 h-5 text-[#5a46c2]" />,
    bg: "bg-purple-50",
    title: "Fast",
    sub: "Delivery",
    position: "bottom-[18%] -right-6",
  },
  {
    icon: <Clock className="w-5 h-5 text-orange-400" />,
    bg: "bg-orange-50",
    title: "24/7",
    sub: "Support",
    position: "bottom-[40%] -left-8",
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStat, setActiveStat] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <div
        className="absolute -top-32 -left-32 w-125 h-125 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(90,70,194,0.08)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-125 h-125 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(72,56,163,0.07)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(90,70,194,0.04)" }}
      />


      <div className="max-w-7xl mx-auto px-8 w-full mt-5 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div
            className="space-y-8 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest font-semibold"
              style={{
                background: "rgba(90,70,194,0.08)",
                color: "#5a46c2",
                border: "1px solid rgba(90,70,194,0.2)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#5a46c2" }}
              />
              Innovation Meets Excellence
            </div>

            <h1 className="text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Discover the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #5a46c2, #4838a3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Future of
              </span>{" "}
              <br />Manufacturing
            </h1>

            <p className="text-mb text-gray-500 leading-relaxed max-w-md">
              Innovative solutions for modern problems. Transform your business
              with cutting-edge manufacturing technology and precision craftsmanship.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="group flex btn-color items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(90,70,194,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(90,70,194,0.35)")
                }
              >
                Get Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
                style={{
                  background: "rgba(90,70,194,0.07)",
                  border: "1.5px solid rgba(90,70,194,0.25)",
                  color: "#4838a3",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(90,70,194,0.13)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(90,70,194,0.07)")
                }
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(90,70,194,0.15)" }}
                >
                  <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: "#5a46c2" }} />
                </div>
                Learn More
              </button>
            </div>

            <div
              className="grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: "1px solid rgba(90,70,194,0.12)" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center lg:text-left p-3 rounded-xl cursor-default transition-all duration-200"
                  style={{
                    background:
                      activeStat === i
                        ? "rgba(90,70,194,0.07)"
                        : "transparent",
                  }}
                  onMouseEnter={() => setActiveStat(i)}
                  onMouseLeave={() => setActiveStat(null)}
                >
                  <div
                    className="text-3xl font-extrabold"
                    style={{ color: "#5a46c2" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://www.daraz.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 flex items-center justify-center rounded-full text-white font-bold text-mb shadow-lg transition-all duration-300 hover:scale-110"
                style={{
                  background: "#f85606",
                  boxShadow: "0 4px 14px rgba(248,86,6,0.35)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(248,86,6,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(248,86,6,0.35)")
                }
              >
                D
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 flex items-center justify-center rounded-full text-white font-bold text-mb shadow-lg transition-all duration-300 hover:scale-110"
                style={{
                  background: "#1877f2",
                  boxShadow: "0 4px 14px rgba(24,119,242,0.35)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(24,119,242,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(24,119,242,0.35)")
                }
              >
                f
              </a>
            </div>
          </div>

          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "300ms",
            }}
          >
            <div
              className="absolute inset-4.5 rounded-[2.5rem]"
              style={{
                border: "1.5px dashed rgba(90,70,194,0.18)",
                borderRadius: "2.8rem",
              }}
            />

            <div
              className="relative rounded-[2.2rem] overflow-hidden"
              style={{
                border: "2px solid rgba(90,70,194,0.15)",
                boxShadow: "0 24px 70px rgba(90,70,194,0.18)",
                aspectRatio: "1 / 1",
              }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Hero ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    opacity: idx === currentImageIndex ? 1 : 0,
                    transform:
                      idx === currentImageIndex
                        ? "scale(1)"
                        : "scale(1.04)",
                    transitionProperty: "opacity, transform",
                  }}
                />
              ))}

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(90,70,194,0.12) 0%, transparent 60%)",
                }}
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: idx === currentImageIndex ? "1.8rem" : "0.4rem",
                      background:
                        idx === currentImageIndex
                          ? "#fff"
                          : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>
            </div>

            {floatingBadges.map((badge, i) => (
              <div
                key={i}
                className={`absolute ${badge.position} bg-white rounded-2xl px-4 py-3 flex items-center gap-3 z-20`}
                style={{
                  boxShadow: "0 8px 28px rgba(90,70,194,0.15)",
                  border: "1px solid rgba(90,70,194,0.1)",
                  animation: `float ${3 + i * 0.7}s ease-in-out infinite alternate`,
                }}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${badge.bg}`}
                >
                  {badge.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm leading-none">
                    {badge.title}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">{badge.sub}</div>
                </div>
              </div>
            ))}

            <div
              className="absolute top-5 right-5 bg-white rounded-2xl px-4 py-2.5 flex items-center gap-2 z-20"
              style={{
                boxShadow: "0 6px 20px rgba(90,70,194,0.12)",
                border: "1px solid rgba(90,70,194,0.1)",
              }}
            >
              <div className="flex -space-x-1.5">
                {[
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="reviewer"
                    className="w-6 h-6 rounded-full object-cover"
                    style={{ border: "2px solid white" }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-[10px] text-gray-500 leading-none mt-0.5">
                  500+ reviews
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}