import { useState } from "react";
import { Home, User, Settings, FileText, LogOut } from "lucide-react";

// activePath → currently active route
export default function Sidebar({ links, activePath }) {
  const [active, setActive] = useState(activePath || links[0]?.path);
// active → internal state, currently highlight වෙන්න තියෙන menu item
  const icons = {
    home: <Home size={18} />,
    user: <User size={18} />,
    settings: <Settings size={18} />,
    reports: <FileText size={18} />,
  };

  return (
    <aside className="w-64 bg-white shadow-xl border-r min-h-screen hidden md:flex flex-col">
      {/* Navigation Links */}
      <ul className="flex-1 p-6 space-y-3">
        {links.map((link) => {
          const isActive = active === link.path;
          return (
            <li key={link.label} className="relative group">
              {/* Active indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1.5 bg-indigo-600 rounded-r-lg"></span>
              )}
              <a
                href={link.path}
                onClick={() => setActive(link.path)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                  ${isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"}
                `}
              >
                <span
                  className={`p-2 rounded-full transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "group-hover:bg-indigo-100 group-hover:text-indigo-600 text-slate-400"
                  }`}
                >
                  {icons[link.icon] || null}
                </span>
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition rounded-lg px-2 py-2 hover:bg-indigo-50"
        >
          <LogOut size={16} />
          Logout
        </a>
      </div>
    </aside>
  );
}
