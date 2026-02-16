import React from 'react';

const products = [
  {
    id: 1,
    name: '3D Printed Phone Stand',
    category: '3D Printing',
    price: '$15.99',
    image: 'https://via.placeholder.com/400x300', // Replace with your actual image path
  },
  {
    id: 2,
    name: 'Custom Engraved Keychain',
    category: 'Engraving',
    price: '$8.99',
    image: 'https://via.placeholder.com/400x300',
  },
  {
    id: 3,
    name: 'Laser Cut Wooden Coasters (Set of 4)',
    category: 'Laser Cutting',
    price: '$24.99',
    image: 'https://via.placeholder.com/400x300',
  },
  {
    id: 4,
    name: 'Custom Wall Art Panel',
    category: 'Wall Art Design',
    price: '$149.99',
    image: 'https://via.placeholder.com/400x300',
  },
];

function ProductSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
        <p className="text-gray-500 text-lg">Ready-made products available for immediate purchase</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{product.category}</p>
              <p className="mt-auto text-xl font-bold text-purple-600">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center px-8 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          Browse Shop
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="right" />
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default ProductSection;