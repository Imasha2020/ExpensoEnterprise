import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  BarChart,
  LogOut
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

/*
 Sidebar component
 - User navigation only
 - UI + routing
 */
export default function Sidebar() {

  const { logout } = useAuth();

  // Sidebar menu items
  const links = [
    {
      path: "/user",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      path: "/user/add",
      label: "Add Transaction",
      icon: <PlusCircle size={18} />
    },
    {
      path: "/user/transactions",
      label: "Transactions",
      icon: <List size={18} />
    },
    {
      path: "/user/analytics",
      label: "Analytics",
      icon: <BarChart size={18} />
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen flex flex-col">

      {/* App / Logo */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-slate-900">
          Expenso
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-slate-700 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout bottom */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
