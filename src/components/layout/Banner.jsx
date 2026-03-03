import { Link } from "react-router-dom";
import React from "react";
import { FiArrowRight, FiHome, FiChevronRight } from "react-icons/fi";
import { MdPalette, MdTextFields, MdDraw } from "react-icons/md";

{/* <Banner
  path="About"
  title={<>Engaging you with<br /><span className="text-[#5a46c2]">Creative Design</span></>}
  description="Providing high-quality 3D rendering for various industries such as architecture, interior design, and product visualization."
  tagLine="Welcome to Pixeluxe"
  imageUrl={null}
  buttonText="Discover More"
  buttonLink="/"
/> */}

function Banner({
  path,
  title,
  description,
  imageUrl,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="relative w-full bg-white">
      <div className="absolute inset-0 z-0 bg-linear-to-t from-violet-600 via-violet-200 to-white" />
      <div className="relative z-10  max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between min-h-140 py-14">
        <div className="flex-1 max-w-xl">
          <div className="flex items-center w-40 gap-2 mt-5 text-sm mb-5 text-violet-600 border border-violet-400 rounded-full px-3 py-1">
            <Link
              to="/home"
              className="flex items-center gap-1 font-medium hover:text-violet-800"
            >
              <FiHome size={14} />
              <span>Home</span>
            </Link>

            <FiChevronRight size={13} className="opacity-60" />

            <span className="opacity-70">{path}</span>
          </div>

          <h1 className="font-black leading-tight mb-5 text-4xl lg:text-5xl text-gray-900">
            { title || (
              <>
                Engaging you with
                <br />
                <span className="text-violet-600">Creative Design</span>
              </>
            )}
          </h1>

          <p className="mb-8 leading-relaxed text-[1.05rem] text-violet-900 max-w-110">
            {description || "Providing high-quality 3D rendering for various industries such as architecture, interior design, and product visualization."}
          </p>

          <Link
            to={buttonLink || "./"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest btn-color text-white shadow-lg shadow-violet-400/40 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-violet-400/60 transition-all duration-200 no-underline"
          >
            {buttonText || "Discover More"}
            <FiArrowRight size={16} />
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center relative h-105 w-full lg:mt-0">
          <img
            src={imageUrl || "/assets/images/img11.png"}
            alt="Creative Designer"
            className="mt-45 z-10 w-130 max-w-full"
          />

          <div className="absolute top-8 left-4 z-20 flex items-center gap-2 rounded-xl px-3 py-2 bg-white shadow-lg shadow-violet-200/60 animate-[floatBadge1_4s_ease-in-out_infinite]">
            <div className="rounded-lg p-1.5 bg-linear-to-br from-violet-600 to-violet-800">
              <MdPalette size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-gray-900">
              Color Palette
            </span>
          </div>

          <div className="absolute top-12 right-0 z-20 flex items-center gap-2 rounded-xl px-3 py-2 bg-white shadow-lg shadow-violet-200/60 animate-[floatBadge2_3.8s_ease-in-out_infinite]">
            <div className="rounded-lg p-1.5 bg-linear-to-br from-amber-400 to-red-500">
              <MdTextFields size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-gray-900">Typography</span>
          </div>

          <div className="absolute bottom-10 right-4 z-20 flex items-center gap-2 rounded-xl px-3 py-2 bg-white shadow-lg shadow-violet-200/60 animate-[floatBadge3_4.2s_ease-in-out_infinite]">
            <div className="rounded-lg p-1.5 bg-linear-to-br from-emerald-400 to-emerald-600">
              <MdDraw size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-gray-900">3D Design</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
