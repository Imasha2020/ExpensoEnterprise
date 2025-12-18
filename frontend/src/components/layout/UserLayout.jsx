import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex">
      <Sidebar
        links={[
          { label: "Dashboard", path: "/user/dashboard" },
          { label: "Transactions", path: "/user/transactions" },
          { label: "Profile", path: "/user/profile" },
        ]}
      />

      <div className="flex-1">
        <Navbar user="User" />
        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
