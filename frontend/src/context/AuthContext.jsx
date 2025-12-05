// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState, useCallback } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // important: prevents flash redirect

  // Load logged-in user (restore session)
  const loadUser = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    // If no token, we are done (user stays null)
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me"); // expects { user: { ... } }
      // adapt if your backend returns user directly: setUser(res.data) 
      setUser(res.data.user ?? res.data);
    } catch (err) {
      console.warn("Failed to restore user:", err?.response?.data || err.message);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // NORMAL USER LOGIN
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user ?? res.data);
    return res.data;
  };

  // ADMIN LOGIN
  const adminLogin = async (email, password) => {
    const res = await api.post("/auth/admin/login", { email, password });
    if ((res.data.user?.role ?? res.data.role) !== "admin") {
      localStorage.removeItem("token");
      throw new Error("Not authorized as admin");
    }
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user ?? res.data);
    return res.data;
  };

  // REGISTER
  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user ?? res.data);
    return res.data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, adminLogin, register, logout, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
