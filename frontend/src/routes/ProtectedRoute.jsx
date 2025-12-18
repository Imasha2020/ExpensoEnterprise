import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const isAuthenticated = true; // replace with auth state
  const userRole = "ADMIN"; // USER or ADMIN

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
