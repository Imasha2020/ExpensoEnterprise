import { useAuth } from "../auth/AuthContext";

const AdminDashboard = () => {

  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
