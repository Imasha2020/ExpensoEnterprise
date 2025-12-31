import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  /*
   Login button click
   */
  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);

      /*
       Backend role = USER / ADMIN
       Convert → ROLE_USER / ROLE_ADMIN
       */
      const role = "ROLE_" + res.user.role;

      // Save auth data
      login(res.token, role);

      // Redirect by role
      if (role === "ROLE_ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p onClick={() => navigate("/register")}>
        No account? Register
      </p>
    </div>
  );
};

export default Login;
