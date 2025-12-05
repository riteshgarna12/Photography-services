import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-panel/90 border border-border p-8 rounded-2xl shadow-token"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-text">Admin Login</h2>

        {error && (
          <p className="mb-4 text-sm bg-[rgba(200,30,30,0.06)] border border-[rgba(200,30,30,0.12)] text-[rgb(255,200,200)] p-3 rounded text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-panel/80 border border-border rounded-lg focus:border-accent-500 outline-none text-text"
            required
            aria-label="Admin email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-panel/80 border border-border rounded-lg focus:border-accent-500 outline-none text-text"
            required
            aria-label="Admin password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-semibold shadow-token disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Signing in…" : "Login as Admin"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
