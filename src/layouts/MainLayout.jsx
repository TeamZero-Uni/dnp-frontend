import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useLocation, Outlet } from "react-router-dom";


function MainLayout() {
  const location = useLocation();

  const hideheaderFooterRoutes = ["/login", "/register", "/dash"];

  const shouldHide = hideheaderFooterRoutes.some((path) => {
    location.pathname.toLowerCase().startsWith(path.toLowerCase());
  });

  return (
    <>
      <div className="text-white min-h-screen flex flex-col">
        {!shouldHide && <Navbar />}
        <main className="grow min-h-screen mt-23 text-black">
          <Outlet />
        </main>
        {!shouldHide && <Footer />}
      </div>
    </>
  );
}

export default MainLayout;
