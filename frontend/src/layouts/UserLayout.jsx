import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

/*
 UserLayout
 - Sidebar + User pages wrapper
 */
export default function UserLayout() {
  return (
    <div className="flex">

      {/* Left sidebar */}
      <Sidebar />

      {/* Right content */}
      <div className="flex-1 p-8 bg-slate-50 min-h-screen">
        <Outlet />
      </div>

    </div>
  );
}
