import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar
        links={[
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Users", path: "/admin/users" },
          { label: "Transactions", path: "/admin/transactions" },
          { label: "Categories", path: "/admin/categories" },
        ]}
      />

      <div className="flex-1">
        <Navbar user="Admin" />
        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
