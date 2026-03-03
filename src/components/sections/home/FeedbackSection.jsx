import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    quote: "Excellent service and quality! They brought my 3D designs to life with incredible precision.",
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    quote: "The laser cutting service is top-notch. Fast turnaround and perfect results every time.",
    rating: 5,
  },
  {
    name: 'David Martinez',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    quote: "Professional CNC machining service. They handle complex projects with ease.",
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    quote: "Outstanding attention to detail and customer service. Highly recommended!",
    rating: 5,
  },
  {
    name: 'James Brown',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    quote: "Incredible work quality and professionalism. They exceeded all expectations.",
    rating: 5,
  },
];

function FeedbackSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const visibleFeedbacks = testimonials.length >= 3
    ? [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length],
      ]
    : testimonials;

  return (
    <section className="py-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest mb-4 bg-[#5a46c2]/10 text-[#5a46c2] border border-[#5a46c2]/20">
            <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#5a46c2]" />
            Client Testimonials
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            What Our <span className="text-[#5a46c2]">Clients Say</span>
          </h2>
          <p className="text-gray-500 text-mb">Trusted by businesses and creators worldwide</p>
        </div>

        <div className="relative flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 z-20 p-3 md:p-4 rounded-full shadow-[0_6px_20px_rgba(90,70,194,0.35)] transition-all duration-300 hover:scale-110 focus:outline-none btn-color"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex justify-center items-stretch gap-6 w-full overflow-hidden p-3 px-12 md:px-16">
            {visibleFeedbacks.map((testimonial, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className={`p-8 rounded-2xl w-full min-w-70 transition-all duration-500 flex flex-col bg-white
                  ${index === 1 
                    ? 'md:scale-105 border-[1.5px] border-[#5a46c2]/35 shadow-[0_12px_40px_rgba(90,70,194,0.15)]' 
                    : 'hidden md:flex border-[1.5px] border-[#ede9fe] shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
                  }`}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="italic mb-8 leading-relaxed grow min-h-25 text-gray-700">
                  "{testimonial.quote}"
                </p>

                <div className="h-px mb-5 rounded bg-[#5a46c2]/10" />

                <div className="flex items-center gap-4">
                  <div className="p-0.5 rounded-full btn-color">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-11 h-11 rounded-full object-cover block"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-[#5a46c2]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-4 z-20 p-3 md:p-4 rounded-full shadow-[0_6px_20px_rgba(90,70,194,0.35)] transition-all duration-300 hover:scale-110 focus:outline-none btn-color"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                ? 'w-8 btn-color' 
                : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeedbackSection;