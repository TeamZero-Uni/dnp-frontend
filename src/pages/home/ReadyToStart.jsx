import React from 'react';

export default function ReadyToStart() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-[#f8f5ff] via-white to-[#fff9f0] py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-gray-500 text-xl mb-10">
          Get an instant quote for your manufacturing needs
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg shadow-purple-200">
            Request Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <button className="px-10 py-4 bg-white border border-gray-100 rounded-xl text-gray-800 font-medium hover:bg-gray-50 transition-all shadow-sm">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}