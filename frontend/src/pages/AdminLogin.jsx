import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/admin/login", { email, password });

      if (res.data.user.role !== "admin") {
        setError("You are not authorized as admin");
        return;
      }

      // Save token
      localStorage.setItem("token", res.data.token);

      // Set user in AuthContext
      setUser(res.data.user);

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded">
      <h2 className="text-3xl font-bold text-center mb-4">Admin Login</h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Login as Admin
        </button>
      </form>
    </div>
  );
}
