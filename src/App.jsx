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
import Portfolio from "./pages/Portfolio";
import PortfolioManagemet from "./pages/admin/PortfolioManagemet";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import QuotetionManagement from "./pages/admin/QuotetionManagement";
import RequestQuote from './pages/RequestQuote';
import Gallery from './pages/Gallery';
import Innovation from './pages/Innovation';

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
      <Route path='/checkout' element={<Checkout /> } />
      <Route path='/portfolio' element={<Portfolio /> } />
       <Route path="quote" element={<RequestQuote />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="innovation" element={<Innovation />} />

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
          <Route path="portfolio" element={<PortfolioManagemet />} /> 
          <Route path="quotes" element={<QuotetionManagement />} />
        </Route>
      </Route>
    </Route>,
  ),
);

function App() {
  const { loading } = useAuth();
  const [minTimeDone, setMinTimeDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeDone(true);
    }, 3000); // ⏱️ CHANGE THIS (e.g., 2000, 5000)

    return () => clearTimeout(timer);
  }, []);

  if (loading || !minTimeDone) {
    return  <Loader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
