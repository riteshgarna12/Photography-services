import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // Load logged-in user
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    // If no token, do NOT call /me (prevents 401 spam)
    if (!token) return;

    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // NORMAL USER LOGIN
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // ADMIN LOGIN
  const adminLogin = async (email, password) => {
    const res = await api.post("/auth/admin/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // REGISTER
  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, adminLogin, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
