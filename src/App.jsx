import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Services";
import Product from "./pages/Product";
import ProductDetails from "./pages/shop/ProductDetails";
import Login from "./pages/Login";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import Payment from "./pages/shop/Payment";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";

import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import OnlineOrderManagement from "./pages/admin/OnlineOrderManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import CodOrderManagement from "./pages/admin/CodOrderManagement";
import TransactionManagement from "./pages/admin/TransactionManagement";

import ProtectedRoute from "./routers/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="service" element={<Service />} />
      <Route path="shop" element={<Product />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="order-success" element={<Payment />} />
      <Route path="contact" element={<Contact />} />

      <Route path="login" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
        <Route path="customer-profile" element={<UserProfile />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="dash" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="productManagement" element={<ProductManagement />} />
          <Route path="orders" element={<OnlineOrderManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="cod-orders" element={<CodOrderManagement />} />
          <Route path="transactions" element={<TransactionManagement />} />
        </Route>
      </Route>
    </Route>,
  ),
);

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
