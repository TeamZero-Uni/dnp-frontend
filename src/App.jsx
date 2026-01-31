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

function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
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
