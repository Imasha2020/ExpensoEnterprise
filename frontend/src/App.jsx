import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Auth Pages */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

/* User Pages */
import UserLayout from "./components/layout/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import TransactionsPage from "./pages/user/TransactionsPage";
import ProfilePage from "./pages/user/ProfilePage";

/* Admin Pages */
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AdminTransactions from "./pages/admin/AdminTransactions";
import CategoryManagement from "./pages/admin/CategoryManagement";

/* Route Guard */
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="categories" element={<CategoryManagement />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1 className="p-6">404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
