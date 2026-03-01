import React from 'react';

const products = [
  {
    id: 1,
    name: '3D Printed Phone Stand',
    category: '3D Printing',
    price: '$15.99',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Custom Engraved Keychain',
    category: 'Engraving',
    price: '$8.99',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Laser Cut Wooden Coasters',
    category: 'Laser Cutting',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Custom Wall Art Panel',
    category: 'Wall Art Design',
    price: '$149.99',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=300&fit=crop',
  },
];

function ProductSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest mb-4"
            style={{ background: 'rgba(90,70,194,0.08)', color: '#5a46c2', border: '1px solid rgba(90,70,194,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#5a46c2]" />
            Our Products
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Featured <span className="text-[#5a46c2]">Products</span>
          </h2>
          <p className="text-gray-500 text-mb">Ready-made products available for immediate purchase</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1.5px solid #ede9fe',
                boxShadow: '0 4px 16px rgba(90,70,194,0.07)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 36px rgba(90,70,194,0.18)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(90,70,194,0.07)'}
            >
              <div className="aspect-4/3 bg-[#ede9fe] overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(90,70,194,0.85)', color: '#fff' }}
                >
                  {product.category}
                </span>
              </div>

              <div className="p-5 flex flex-col grow">
                <h3 className="text-base font-bold text-gray-800 mb-1 leading-snug">
                  {product.name}
                </h3>

                <div className="h-px my-3 rounded" style={{ background: 'rgba(90,70,194,0.1)' }} />

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xl font-extrabold text-[#5a46c2]">{product.price}</p>
                  <button
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ background: 'rgba(90,70,194,0.1)', color: '#4838a3' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(90,70,194,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(90,70,194,0.1)'}
                  >
                   more details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #5a46c2, #4838a3)',
              boxShadow: '0 8px 24px rgba(90,70,194,0.3)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(90,70,194,0.45)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(90,70,194,0.3)'}
          >
            Browse Shop
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProductSection;