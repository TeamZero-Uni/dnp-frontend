import React from 'react';

const FilterSection = ({ title, children, isOpen, toggle }) => (
  <div className="border-b border-gray-100">
    <button onClick={toggle} className="w-full py-4 flex justify-between items-center text-sm font-bold text-gray-700 uppercase tracking-wide hover:text-[#5a46c2] transition-colors">
      {title}
      <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      {children}
    </div>
  </div>
);

export default FilterSection;
