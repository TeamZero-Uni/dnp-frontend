import React from 'react';
import { ArrowRight, Plus, Scissors, Image as ImageIcon } from 'lucide-react';

const services = [
  {
    category: 'Printing',
    title: '3D printing',
    description: 'Create complex geometries with precision',
    className: 'md:row-span-2',
    hasImage: true,
  },
  {
    category: 'Engraving',
    title: 'Engraving',
    description: 'Add detail and personalization to your work',
    icon: <Plus className="w-8 h-8" />,
    className: 'md:col-span-1',
    hasImage: false,
  },
  {
    category: 'Specialty',
    title: 'Wood printing',
    description: 'Unique finishes on wood substrates',
    className: 'md:row-span-2',
    hasImage: true,
  },
  {
    category: 'Cutting',
    title: 'Laser cutting',
    description: 'Clean, precise cuts on various materials',
    icon: <Scissors className="w-8 h-8" />,
    className: 'md:col-span-1',
    hasImage: false,
  },
  {
    category: 'Machining',
    title: 'CNC machining',
    description: 'High-precision subtractive manufacturing',
    className: 'md:row-span-2',
    hasImage: true,
  },
  {
    category: 'Design',
    title: 'Wall art design',
    description: 'Custom installations for any space',
    icon: <ImageIcon className="w-8 h-8" />,
    className: 'md:col-span-1',
    hasImage: false,
  },
];

const ServiceCard = ({ service }) => (
  <div className={`bg-[#F5F5F5] flex flex-col group cursor-pointer ${service.className}`}>
    {service.hasImage && (
      <div className="bg-[#E5E5E5] aspect-4/3 flex items-center justify-center">
        <ImageIcon className="w-12 h-12 text-gray-400 opacity-50" />
      </div>
    )}
    <div className="p-8 flex flex-col h-full justify-center">
      {service.icon && <div className="mb-4 text-black">{service.icon}</div>}
      <span className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-800">
        {service.category}
      </span>
      <h3 className="text-2xl font-medium mb-3 text-black">{service.title}</h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        {service.description}
      </p>
      <div className="mt-auto flex items-center text-sm font-medium group-hover:gap-2 transition-all">
        Explore <ArrowRight className="ml-1 w-4 h-4" />
      </div>
    </div>
  </div>
);

export default function ServiceSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto font-sans">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">Services</span>
        <h2 className="text-4xl md:text-5xl font-medium mt-4 mb-6 text-black">Our capabilities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We offer comprehensive digital manufacturing solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {/* Layout note: The order below follows the visual flow of your image */}
        <div className="space-y-6 flex flex-col">
          <ServiceCard service={services[0]} />
          <ServiceCard service={services[3]} />
        </div>
        
        <div className="space-y-6 flex flex-col">
          <ServiceCard service={services[1]} />
          <ServiceCard service={services[4]} />
        </div>

        <div className="space-y-6 flex flex-col">
          <ServiceCard service={services[2]} />
          <ServiceCard service={services[5]} />
        </div>
      </div>
    </section>
  );
}