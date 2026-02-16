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
import Login from './pages/Login';

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
        <Route path="/login" element={<Login />} />
        </Route>

      {/* Admin layout */}
      <Route path="/dash" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
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
