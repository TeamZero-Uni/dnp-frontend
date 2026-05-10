function Wishlist() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Wishlist</h2>

      {/* Placeholder grid — replace with real data later */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="w-full h-36 bg-gray-200" />
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800">Product {i}</p>
              <p className="text-xs text-gray-500 mt-1">$99.00</p>
              <button className="mt-3 w-full text-xs py-2 rounded-lg bg-black
                                 text-white hover:bg-gray-800 transition-colors">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist