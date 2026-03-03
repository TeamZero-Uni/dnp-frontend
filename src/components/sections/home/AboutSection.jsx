import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const skills = [
  { label: "Precision Quality", value: 99 },
  { label: "Innovation", value: 96 },
  { label: "Fast Delivery", value: 94 },
];

function SkillBar({ label, value, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm tracking-widest uppercase" style={{ color: "#1a1a4e" }}>
          {label}
        </span>
        <span className="font-bold text-sm" style={{ color: "#4838a3" }}>{value}%</span>
      </div>
      <div className="h-1 w-full rounded-full" style={{ background: "#e0dff5" }}>
        <div
          className="h-1 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: "linear-gradient(90deg, #5a46c2, #4838a3)" }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="w-ful py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-3 bg-[#5a46c2]/10 text-[#5a46c2] border border-[#5a46c2]/20">
              <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#5a46c2]" />
              About DNP 3D
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4" style={{ color: "#0f0f2e" }}>
              Your Partner in<span className="text-[#5a46c2]"> 3D Excellence</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-mb">
              We help businesses and creators bring concepts to life through
              reliable, accurate, and innovative 3D printing, modeling, and
              scanning services across Sri Lanka.
            </p>
          </div>
          <div>
            {skills.map((s, i) => (
              <SkillBar key={s.label} label={s.label} value={s.value} delay={300 + i * 200} />
            ))}
          </div>
          <div>
            <Link 
                to="/about"
                className="px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg btn-color" >
              About Us
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm"
            style={{ aspectRatio: "3/4" }}
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8"
              style={{ background: "linear-gradient(160deg, #1a0e4e 0%, #2e1e8a 50%, #4838a3 100%)" }}
            >
              <div className="absolute top-6 right-6 w-24 h-24 rounded-full opacity-10 bg-white" />
              <div className="absolute bottom-10 left-4 w-16 h-16 rounded-full opacity-10 bg-[#5a46c2]" />

              <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl mb-2" style={{ background: "rgba(255,255,255,0.12)" }}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path d="M22 4L38 13V31L22 40L6 31V13L22 4Z" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M22 4V40M6 13L38 13M6 31L38 31" stroke="white" strokeWidth="1.2" opacity="0.5"/>
                  <circle cx="22" cy="22" r="5" fill="white" opacity="0.9"/>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-2">
                {[
                  { num: "500+", label: "Projects Delivered" },
                  { num: "99%", label: "Precision Rate" },
                  { num: "48+", label: "Happy Clients" },
                  { num: "5★", label: "Google Rating" },
                ].map(({ num, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4 flex flex-col items-center text-center"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-2xl font-extrabold text-white">{num}</span>
                    <span className="text-xs text-purple-200 mt-1 leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              <p className="text-purple-200 text-xs text-center mt-3 leading-relaxed">
                Colombo, Sri Lanka · Delivery worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg, #5a46c2, #4838a3)" }} />
              <h3 className="text-xl font-bold" style={{ color: "#0f0f2e" }}>Our Vision</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              To become Sri Lanka's most trusted 3D innovation partner — transforming
              ideas into reality through advanced technology, exceptional precision, and
              industry-focused solutions that inspire progress.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(180deg, #5a46c2, #4838a3)" }} />
              <h3 className="text-xl font-bold" style={{ color: "#0f0f2e" }}>Our Mission</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              We empower creators, engineers, and businesses by providing reliable,
              high-quality 3D printing, modeling, and laser cutting services — making
              advanced 3D technology accessible to everyone across Sri Lanka.
            </p>
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <blockquote className="text-base font-bold italic leading-snug mb-3" style={{ color: "#0f0f2e" }}>
              "Turning imagination into reality through precision and innovation."
            </blockquote>
            <p className="text-sm font-medium" style={{ color: "#5a46c2" }}>DNP 3D Hobby Lobby — Colombo, Sri Lanka</p>
          </div>
        </div>

      </div>
    </section>
  );
}