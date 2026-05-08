import React from "react";
import { useProduct } from "../../../hooks/useProduct";
import { useNavigate } from "react-router-dom";

function ProductSection() {
  const { products } = useProduct();
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 animate-appear">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest mb-4"
            style={{
              background: "rgba(90,70,194,0.08)",
              color: "#5a46c2",
              border: "1px solid rgba(90,70,194,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#5a46c2]" />
            Our Products
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Featured <span className="text-[#5a46c2]">Products</span>
          </h2>
          <p className="text-gray-500 text-mb">
            Ready-made products available for immediate purchase
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((product) => product.p_status === "IN_STOCK")
            .slice(0, 4)
            .map((product) => (
              <div
                key={product.p_id}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1.5px solid #ede9fe",
                  boxShadow: "0 4px 16px rgba(90,70,194,0.07)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 12px 36px rgba(90,70,194,0.18)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(90,70,194,0.07)")
                }
              >
                <div className="aspect-4/3 bg-[#ede9fe] overflow-hidden relative">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0].img_url}
                      alt={product.p_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#5a46c2] opacity-30">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <span
                    className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(90,70,194,0.85)",
                      color: "#fff",
                    }}
                  >
                    {product.category?.c_type}
                  </span>
                </div>

                <div className="p-5 flex flex-col grow">
                  <h3 className="text-base font-bold text-gray-800 mb-1 leading-snug">
                    {product.p_name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {product.p_description}
                  </p>

                  <div
                    className="h-px my-3 rounded"
                    style={{ background: "rgba(90,70,194,0.1)" }}
                  />

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xl font-extrabold text-[#5a46c2]">
                        Rs. {Number(product.p_price).toLocaleString()}
                      </p>
                      {product.p_label_price && (
                        <p className="text-xs text-gray-400 line-through">
                          Rs. {Number(product.p_label_price).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <button
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                      style={{
                        background: "rgba(90,70,194,0.1)",
                        color: "#4838a3",
                      }}
                      onClick={() => navigate(`product/${product.p_id}`)}
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 btn-color"
            onClick={() => navigate("/shop")}
          >
            Browse Shop
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
