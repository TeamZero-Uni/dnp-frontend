import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWishlistAPI } from "../../api/userOrdersApi"
import { MdFavoriteBorder, MdFavorite, MdShoppingCart } from "react-icons/md"
import toast from "react-hot-toast"

function Wishlist() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setIsLoading(true)
        const data = await getWishlistAPI()
        setWishlist(data?.wishlist || [])
      } catch (err) {
        console.error("Error fetching wishlist:", err)
        setError("Failed to load wishlist")
        toast.error("Failed to load wishlist")
      } finally {
        setIsLoading(false)
      }
    }
    loadWishlist()
  }, [])

  const handleRemoveFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id))
    toast.success("Removed from wishlist")
  }

  const handleAddToCart = (productId) => {
    navigate(`/product/${productId}`)
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 sm:p-8 min-h-[500px] flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 sm:p-8 min-h-[500px] flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6 sm:p-8 min-h-[500px] flex justify-center items-center">
        <div className="text-center">
          <MdFavoriteBorder size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Start adding products to your wishlist!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-secondary mb-8">My Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const product = item.products
          const firstImage = product?.images?.[0]?.img_url

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                {firstImage ? (
                  <img
                    src={firstImage}
                    alt={product.p_name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://placehold.co/200x200?text=Product"
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.p_status === "IN_STOCK"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.p_status}
                  </span>
                </div>

                {/* Wishlist Icon */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
                >
                  <MdFavorite size={18} className="text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm text-secondary mb-1 line-clamp-2">
                  {product.p_name}
                </h3>

                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {product.p_description}
                </p>

                {/* Details */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {product.p_color && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {product.p_color}
                    </span>
                  )}
                  {product.p_material && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {product.p_material}
                    </span>
                  )}
                  {product.p_tag && (
                    <span className="text-xs bg-accent/10 px-2 py-1 rounded text-accent font-semibold">
                      {product.p_tag}
                    </span>
                  )}
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-secondary">
                      Rs {product.p_price}
                    </span>
                    {product.p_label_price && (
                      <span className="text-sm text-gray-400 line-through">
                        Rs {product.p_label_price}
                      </span>
                    )}
                  </div>
                  {product.p_label_price && (
                    <p className="text-xs text-green-600 font-semibold">
                      Save {Math.round(((product.p_label_price - product.p_price) / product.p_label_price) * 100)}%
                    </p>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product.p_id)}
                  disabled={product.p_status !== "IN_STOCK"}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                    product.p_status === "IN_STOCK"
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <MdShoppingCart size={16} />
                  View Product
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Wishlist