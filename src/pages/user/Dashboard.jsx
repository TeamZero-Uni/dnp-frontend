import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-lg font-bold" style={{ color: "var(--color-secondary)" }}>
          Welcome back, {user?.name ? user.name.split(" ")[0] : "Customer"}!
        </h2>
        <p className="text-sm text-gray-500">Here’s a quick overview of your account.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/account/orders" className="p-4 bg-white border rounded-lg shadow-sm">
          <h3 className="font-semibold">My Orders</h3>
          <p className="text-sm text-gray-400">View your recent orders and statuses.</p>
        </Link>

        <Link to="/account/wishlist" className="p-4 bg-white border rounded-lg shadow-sm">
          <h3 className="font-semibold">Wishlist</h3>
          <p className="text-sm text-gray-400">Items you saved for later.</p>
        </Link>

        <Link to="/account/profile" className="p-4 bg-white border rounded-lg shadow-sm">
          <h3 className="font-semibold">Profile</h3>
          <p className="text-sm text-gray-400">Manage your personal information.</p>
        </Link>
      </section>
    </div>
  );
}
