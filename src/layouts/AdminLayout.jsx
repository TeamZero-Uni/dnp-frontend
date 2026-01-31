import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/Sidebar";

export default function AdminLayout() {

  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}