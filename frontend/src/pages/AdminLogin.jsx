import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        await adminLogin(email, password);  // <-- only one call now

        navigate("/admin/dashboard");
    } 
    catch (err) {
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
