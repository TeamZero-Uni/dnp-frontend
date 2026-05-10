function MyOrders() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Orders</h2>

      {/* Placeholder — replace with real data later */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-800 text-sm">Order #00{i}</p>
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                Delivered
              </span>
            </div>
            <p className="text-xs text-gray-500">Placed on: 01/0{i}/2025</p>
            <p className="text-xs text-gray-500 mt-1">Total: $120.00</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders