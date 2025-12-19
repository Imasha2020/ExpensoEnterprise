import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; 
//Outlet is used to render nested route content dynamically 

export default function UserLayout() {
  return (
    <div className="flex"> 
    {/*  Sidebar left-side menu */}
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
         {/* Sidebar සහ Navbar එක set වෙලා තියෙන layout එකේ, page-specific content render කරන හැම වෙලාවේම update වෙනවා. */}
        </main>
      </div>
    </div>
  );
}

// UserLayout කියන්නේ user role එකේ main structure. Sidebar + Navbar එක set කරනවා,
//  අතර Dashboard/Transactions/Profile pages dynamic ලෙස render කරවනවා <Outlet /> එකෙන්.
