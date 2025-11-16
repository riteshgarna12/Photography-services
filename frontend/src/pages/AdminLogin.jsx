import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
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
      await adminLogin(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-red-800/40 p-8 rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.2)]"
      >
        <h2 className="text-4xl font-bold text-center text-red-500 mb-6 drop-shadow-lg">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-900/40 text-red-300 border border-red-700 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-white">

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold text-white shadow-lg hover:shadow-red-500/40"
          >
            Login as Admin
          </button>
        </form>
      </motion.div>

    </div>
  );
}
