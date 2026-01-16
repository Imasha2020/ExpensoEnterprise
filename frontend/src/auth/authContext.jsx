import { createContext, useContext, useState } from "react";

/*
 AuthContext = global authentication store
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  /*
   Page refresh උනත් data තියෙන්න
   localStorage වලින් initial load කරනවා
   */
  const [token, setToken] = useState(localStorage.getItem("expense_token"));
  const [role, setRole] = useState(localStorage.getItem("expense_role"));

  /*
   Login function
   token + role save කරනවා
   */
  const login = (token, role) => {
    localStorage.setItem("expense_token", token);
    localStorage.setItem("expense_role", role);

    setToken(token);
    setRole(role);
  };

  /*
   Logout function
   */
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/*
 Custom hook
 Any component එකක auth data access කරන්න
 */
export const useAuth = () => useContext(AuthContext);
