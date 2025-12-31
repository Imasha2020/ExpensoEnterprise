import { useAuth } from "../auth/AuthContext";

const UserDashboard = () => {

  const { logout } = useAuth();

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
