import { 
  FaBoxes, 
  FaFileInvoiceDollar, 
  FaShoppingCart, 
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

export default function Dashboard() {
  const stats = [
    { 
      label: "Total Products", 
      value: "1,234", 
      icon: <FaBoxes />, 
      color: "indigo",
      change: "+12.5%",
      trend: "up"
    },
    { 
      label: "Active Orders", 
      value: "245", 
      icon: <FaShoppingCart />, 
      color: "blue",
      change: "+8.2%",
      trend: "up"
    },
    { 
      label: "Revenue (This Month)", 
      value: "$45,678", 
      icon: <FaMoneyBillWave />, 
      color: "green",
      change: "+15.3%",
      trend: "up"
    },
    { 
      label: "Pending Quotes", 
      value: "87", 
      icon: <BiSolidQuoteAltLeft />, 
      color: "purple",
      change: "-3.1%",
      trend: "down"
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", product: "Premium Package", amount: "$1,299", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", product: "Standard Service", amount: "$599", status: "Processing" },
    { id: "ORD-003", customer: "Mike Johnson", product: "Basic Plan", amount: "$299", status: "Pending" },
    { id: "ORD-004", customer: "Sarah Williams", product: "Enterprise Package", amount: "$2,499", status: "Completed" },
    { id: "ORD-005", customer: "Tom Brown", product: "Custom Service", amount: "$899", status: "Processing" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Processing": return "bg-blue-100 text-blue-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
                <div className={`flex items-center mt-2 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{stat.change}</span>
                  <span className="text-gray-400 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              <p className="text-gray-500 text-sm mt-1">Your latest customer orders</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              View All
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{order.id}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{order.customer}</p>
              <p className="text-sm text-gray-500 mb-2">{order.product}</p>
              <p className="text-base font-bold text-gray-900">{order.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <FaFileInvoiceDollar className="text-3xl mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-1">Create Invoice</h3>
          <p className="text-sm text-indigo-100">Generate a new invoice for customers</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <FaBoxes className="text-3xl mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-1">Add Product</h3>
          <p className="text-sm text-blue-100">Add new products to your inventory</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <BiSolidQuoteAltLeft className="text-3xl mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-1">Send Quote</h3>
          <p className="text-sm text-green-100">Create and send customer quotes</p>
        </div>
      </div>
    </div>
  );
}