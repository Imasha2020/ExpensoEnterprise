import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

//ProtectedRoute import
import ProtectedRoute from "./auth/ProtectedRoute";

//User imports
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/user/Dashboard";
import AddTransaction from "./pages/user/AddTransaction";
import Transactions from "./pages/user/Transactions";
import Analytics from "./pages/user/Analytics";

//Admin imports
import AdminDashboard from "./pages/AdminDashboard";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User protected */}
       {/* USER AREA */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="ROLE_USER">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add" element={<AddTransaction />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

  

        {/* Admin protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
