import { LogOut } from "lucide-react";


// user → Navbar එකේ user name display කරන්න. Default value "User".
// onLogout → Logout button click වුනේම call කරන function.
export default function Navbar({ user = "User", onLogout }) {
  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center font-sans">
      {/* Branding */}
      <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
        Expenso Enterprise
      </h1>

      {/* User Info & Logout */}
      <div className="flex items-center gap-4">
        <span className="text-slate-700 font-medium">{user}</span>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-shadow shadow-sm hover:shadow-md"
        >
          Logout <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
