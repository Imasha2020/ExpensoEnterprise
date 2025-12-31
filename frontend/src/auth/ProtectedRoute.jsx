import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/*
 ProtectedRoute
 - Login check
 - Role check
 */
const ProtectedRoute = ({ children, allowedRole }) => {

  const { token, role } = useAuth();

  /*
   State delay + page refresh safe
   */
  const savedToken = token || localStorage.getItem("expense_token");
  const savedRole = role || localStorage.getItem("expense_role");

  // ❌ Login නැත්නම්
  if (!savedToken) {
    return <Navigate to="/" />;
  }

  // ❌ Role mismatch
  if (allowedRole && savedRole !== allowedRole) {
    return <Navigate to="/" />;
  }

  // ✅ Allow access
  return children;
};

export default ProtectedRoute;
