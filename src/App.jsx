import { 
		Route, 
		createBrowserRouter, 
		createRoutesFromElements, 
		RouterProvider 
		} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import About from './pages/About';
import Service from './pages/Services';
import Product from './pages/Product';
import ProductDetails from './pages/shop/ProductDetails';
import Login from './pages/Login';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import { CartProvider } from './context/CartContext';
import Cart from './pages/shop/Cart';


function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
         <Route path="/shop" element={<Product />} />
         <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path="/shop" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Admin layout */}
      <Route path="dash" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='productManagement' element={<ProductManagement />} />
        <Route path='orders' element={<OrderManagement />} />
      </Route>
    </>
  )
);


  return (
    <>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
      
    </>
  )
}

export default App
