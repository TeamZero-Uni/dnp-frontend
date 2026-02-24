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
import GalleryManagement from './pages/admin/GalleryManagement';
import OrderManagement from './pages/admin/OrderManagement';
import TransactionManagement from './pages/admin/TransactionManagement';
import QuotationManagement from './pages/admin/QuotetionManagement';


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
      </Route>

      {/* Admin layout */}
      <Route path="dash" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='productManagement' element={<ProductManagement />} />
        <Route path='galleryimages' element={<GalleryManagement />} />
        <Route path='orders' element={<OrderManagement />} />
        <Route path='transactions' element={<TransactionManagement />} />
        <Route path='quotes' element={<QuotationManagement />} />
      </Route>
    </>
  )
);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
