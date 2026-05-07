import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const IMAGES = [
  "assets/images/home/img1.jpg",
  "assets/images/home/img2.jpg",
  "assets/images/home/img3.jpg",
  "assets/images/home/img4.jpg",
];

const THUMBS = [
  "assets/images/home/img1.jpg",
  "assets/images/home/img2.jpg",
  "assets/images/home/img3.jpg",
  "assets/images/home/img4.jpg",
];

const KEYWORDS = ["Reality", "Innovation", "Precision", "Perfection"];

const REVIEW_AVATARS = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
];

const STORE_LINKS = [
  {
    href: "https://www.facebook.com/marketplace/profile/100012992049815/?ref=permalink&mibextid=dXMIcH",
    sub: "Visit our",
    label: "Facebook Store",
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#1877F2" />
        <path
          d="M28 13h-3a5 5 0 0 0-5 5v3h-3v5h3v12h5V26h3l1-5h-4v-3a1 1 0 0 1 1-1h3V13z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@nkoralage9386?si=8z8Q2VroQEzKYn8U",
    sub: "Watch on",
    label: "YouTube",
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#FF0000" />
        <path
          d="M36.5 17.5a3 3 0 0 0-2.1-2.1C32.5 15 24 15 24 15s-8.5 0-10.4.4a3 3 0 0 0-2.1 2.1C11 19.4 11 24 11 24s0 4.6.5 6.5a3 3 0 0 0 2.1 2.1C15.5 33 24 33 24 33s8.5 0 10.4-.4a3 3 0 0 0 2.1-2.1C37 28.6 37 24 37 24s0-4.6-.5-6.5z"
          fill="#fff"
        />
        <path d="M21 28l7-4-7-4v8z" fill="#FF0000" />
      </svg>
    ),
  },
  {
    href: "https://s.daraz.lk/s.re58",
    sub: "Buy on",
    label: "Daraz Store",
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#F57224" />
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fontFamily="Arial"
          fontWeight="900"
          fontSize="14"
          fill="#fff"
        >
          dz
        </text>
      </svg>
    ),
  },
  {
    href: "https://wa.me/94771509562?text=Hi%20DNP%203D%2C%20I%27d%20like%20a%20quote.",
    sub: "Chat on",
    label: "WhatsApp",
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#25D366" />
        <path
          d="M24 13a11 11 0 0 0-9.54 16.47l-1.46 4.93 5.06-1.43A11 11 0 1 0 24 13zm0 20a9 9 0 0 1-4.58-1.25l-.33-.19-3.4.96.97-3.5-.22-.35A9 9 0 1 1 24 33zm4.93-6.55c-.27-.14-1.6-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.69.88-.84 1.06-.16.18-.31.2-.58.07a7.32 7.32 0 0 1-3.62-3.16c-.27-.47.27-.43.77-1.44.08-.18.04-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.66.2 1.26.17 1.73.1.53-.08 1.6-.65 1.82-1.28.22-.63.22-1.16.16-1.28-.08-.11-.26-.18-.53-.31z"
          fill="#fff"
        />
      </svg>
    ),
  },
];

const STATS = [
  { value: "500+", label: "Orders Delivered" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "48h", label: "Fast Turnaround" },
];

const KEYFRAMES = `
  @keyframes floatQ    { from{transform:translateY(0)} to{transform:translateY(-10px)} }
  @keyframes floatD    { from{transform:translateY(0)} to{transform:translateY(-10px)} }
  @keyframes badgePulse{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.35)} }
  @keyframes fadeSlide { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeInOut { 0%{opacity:0;transform:translateY(10px)} 20%{opacity:1;transform:translateY(0)} 80%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }
`;

const IconCart = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const IconPlay = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const IconShield = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5a46c2"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconTruck = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#d4537e"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const setImage = useCallback((idx) => setCurrentIdx(idx), []);

  useEffect(() => {
    const t = setInterval(
      () => setCurrentIdx((p) => (p + 1) % IMAGES.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{KEYFRAMES}</style>

      <section className="relative grid grid-cols-1 lg:grid-cols-[1fr_700px] min-h-screen bg-[#f7f5ff] overflow-hidden">
        <div className="relative flex flex-col justify-center px-8 py-24 sm:px-14 lg:px-16 xl:px-20 z-10 overflow-hidden">
          <div className="absolute -top-28 -left-16 w-100 h-100 rounded-full bg-[#ddd8ff] opacity-55 pointer-events-none" />
          <div className="absolute -bottom-16 -right-10 w-60 h-60 rounded-full bg-[#ece8ff] opacity-70 pointer-events-none" />

          <div className="relative z-10 max-w-2xl w-full">
            <div
              className="inline-flex items-center gap-2 bg-[#ece8ff] border border-[#c4b8f8] rounded-full px-4 py-1.5 mb-7 w-fit"
              style={{ animation: "fadeUp .7s ease both" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#5a46c2]"
                style={{ animation: "badgePulse 2s infinite" }}
              />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#4838a3]">
                3D Printing &amp; Manufacturing
              </span>
            </div>

            <h1
              className="text-[clamp(30px,4.5vw,56px)] font-extrabold leading-[1.07] text-[#1a1040] mb-5"
              style={{ animation: "fadeUp .7s ease .08s both" }}
            >
              Shape Your Ideas Into{" "}
              <span className="relative inline-block min-w-45 h-[1.2em]">
                <span
                  key={`keyword-${currentIdx}`}
                  className="absolute left-0 mt-1 bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#5a46c2 0%,#7c6ddf 55%,#4838a3 100%)",
                    animation: "fadeInOut 4.5s ease-in-out forwards",
                  }}
                >
                  {KEYWORDS[currentIdx]},
                </span>
              </span>
              <br />
              Layer by Layer
            </h1>

            <p
              className="text-[15px] text-[#6b5fa0] leading-relaxed max-w-md mb-9"
              style={{ animation: "fadeUp .7s ease .16s both" }}
            >
              Premium 3D printing, custom manufacturing &amp; ready-to-ship
              products. From your imagination to your hands — fast, precise, and
              built to impress.
            </p>

            <div
              className="flex flex-wrap gap-3 mb-10"
              style={{ animation: "fadeUp .7s ease .24s both" }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#5a46c2] text-white text-sm font-semibold px-6 py-3.5 rounded-xl no-underline transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#4838a3] active:translate-y-0"
                style={{
                  boxShadow: "0 2px 0 #3a2f99, 0 6px 20px rgba(90,70,194,.3)",
                }}
              >
                <IconCart /> Shop Now
              </Link>
              <Link
                to="quote"
                className="inline-flex items-center gap-2 bg-white text-[#4838a3] text-sm font-semibold px-6 py-3.5 rounded-xl border border-[#c4b8f8] no-underline transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#f0ecff] hover:border-[#5a46c2]"
              >
                <IconPlay /> Get a Quote
              </Link>
            </div>

            <div
              className="flex flex-wrap gap-2.5 mb-11"
              style={{ animation: "fadeUp .7s ease .32s both" }}
            >
              {STORE_LINKS.map(({ href, icon, sub, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white border border-[#e0d9ff] rounded-[14px] px-4 py-2.5 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:border-[#5a46c2] hover:bg-[#f5f2ff]"
                >
                  {icon}
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-[#9088c8] leading-none">
                      {sub}
                    </span>
                    <span className="text-[12px] font-bold text-[#2d1f6b] leading-snug">
                      {label}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div
              className="flex bg-white border border-[#e0d9ff] rounded-[20px] overflow-hidden max-w-sm"
              style={{ animation: "fadeUp .7s ease .40s both" }}
            >
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex-1 px-4 py-4 text-center ${
                    i < STATS.length - 1 ? "border-r border-[#e0d9ff]" : ""
                  }`}
                >
                  <div className="text-[22px] font-extrabold text-[#5a46c2] leading-none mb-1">
                    {value}
                  </div>
                  <div className="text-[9px] text-[#9088c8] uppercase tracking-widest">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden min-h-90 lg:min-h-0"
          style={{ animation: "fadeSlide 1s ease .1s both" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url('${IMAGES[currentIdx]}')` }}
          />

          <div
            className="absolute inset-0 z-1"
            style={{
              background:
                "linear-gradient(160deg,rgba(26,16,64,.55) 0%,rgba(90,70,194,.35) 50%,rgba(26,16,64,.7) 100%)",
            }}
          />

          <div
            className="absolute top-0 left-0 w-28 h-full z-2 pointer-events-none hidden lg:block"
            style={{
              background: "linear-gradient(to right, #f7f5ff, transparent)",
            }}
          />

          <div
            className="absolute bottom-14 left-6 z-5 text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 hidden lg:block"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            3D &nbsp; Print &nbsp; Studio
          </div>

          <div className="absolute bottom-15 left-1/2 -translate-x-1/2 z-6 flex items-center gap-2.5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 whitespace-nowrap shadow-lg">
            <div className="flex">
              {REVIEW_AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="reviewer"
                  className="w-6 h-6 rounded-full object-cover border-2 border-white"
                  style={{ marginLeft: i === 0 ? 0 : -6 }}
                />
              ))}
            </div>
            <div>
              <div className="flex gap-px">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-[11px]">
                    ★
                  </span>
                ))}
              </div>
              <div className="text-[9px] text-[#9088c8] leading-none">
                500+ happy customers
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#2d1f6b]">
              Trusted
            </span>
          </div>

          <div
            className="absolute top-[40%] left-4 z-6 flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/20 lg:flex"
            style={{ animation: "floatQ 3.1s ease-in-out infinite alternate" }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#f0ecff] flex items-center justify-center shrink-0">
              <IconShield />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1a1040] leading-none">
                Quality
              </div>
              <div className="text-[10px] text-[#9088c8] mt-0.5">
                Guaranteed
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-[25%] left-20 z-6 flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/20 lg:flex"
            style={{ animation: "floatD 4.2s ease-in-out infinite alternate" }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#fff0f5] flex items-center justify-center shrink-0">
              <IconTruck />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1a1040] leading-none">
                Fast Delivery
              </div>
              <div className="text-[10px] text-[#9088c8] mt-0.5">
                48h turnaround
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-20 z-5 flex flex-col gap-2.5 lg:flex">
            {THUMBS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Product ${i + 1}`}
                onClick={() => setImage(i)}
                className={`w-25 h-22 rounded-[14px] object-cover cursor-pointer transition-all duration-200 border-2 ${
                  i === currentIdx
                    ? "border-white opacity-100 scale-105"
                    : "border-white/40 opacity-60 hover:opacity-90 hover:scale-105"
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-6 flex gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setImage(i)}
                aria-label={`Image ${i + 1}`}
                className={`h-1.25 rounded-full border-none cursor-pointer transition-all duration-300 p-0 ${
                  i === currentIdx ? "bg-white w-6" : "bg-white/40 w-1.25"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
