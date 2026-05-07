import React from 'react';

const OurWork = () => {
  const works = [
    {
      id: 1,
      title: "3D Printing",
      category: "Printing",
      tag: "Most Popular",
      image: "assets/images/home/8.jpg",
      description: "High-quality 3D printing services for prototypes, models, and custom designs.",
      gridClass: "md:col-span-2 md:row-span-1",
    },
    {
      id: 2,
      title: "Engraving",
      category: "Engraving",
      tag: "",
      image: "assets/images/home/11.jpg",
      description: "Precision engraving services on metal, wood, and acrylic.",
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      title: "Wood Printing",
      category: "Specialty",
      tag: "",
      image: "assets/images/home/10.jpeg",
      description: "Custom wood printing solutions for decorative items and branding.",
      gridClass: "md:col-span-1 md:row-span-2",
    },
    {
      id: 4,
      title: "Laser Cutting",
      category: "Cutting",
      tag: "",
      image: "assets/images/home/12.webp",
      description: "Accurate laser cutting for various materials with fine detailing.",
      gridClass: "md:col-span-1 md:row-span-2",
    },
    {
      id: 5,
      title: "CNC Machining",
      category: "Machining",
      tag: "",
      image: "assets/images/home/13.jpg",
      description: "Advanced CNC machining services for precise parts manufacturing.",
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: 6,
      title: "Wall Art Design",
      category: "Design",
      tag: "",
      image: "assets/images/home/14.jpg",
      description: "Creative wall art design services for homes and offices.",
      gridClass: "md:col-span-1 md:row-span-1",
    }
  ];

  return (
    <section className="py-20 bg-white animate-appear">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-4 bg-[#5a46c2]/10 text-[#5a46c2] border border-[#5a46c2]/20">
            Portfolio
          </div>
          <h2 className="text-4xl font-light text-gray-900 tracking-tight">
            Our <span className="font-extrabold text-[#5a46c2]">Featured Work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {works.map((item) => (
            <div 
              key={item.id} 
              className={`relative group overflow-hidden rounded-sm cursor-pointer shadow-sm ${item.gridClass}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-[6px] transition-all duration-500 ease-out flex flex-col justify-end p-8">
                
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#5a46c2] bg-white px-2 py-0.5 rounded">
                     {item.category}
                   </span>
                   {item.tag && (
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#5a46c2] px-2 py-0.5 rounded">
                       {item.tag}
                     </span>
                   )}
                </div>

                <h3 className="text-2xl font-black text-white leading-tight mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 font-light line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.description}
                </p>

                <div className="w-0 group-hover:w-full h-1 bg-[#5a46c2] mt-4 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default OurWork;