import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl shadow-xl border border-gray-800 rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">

          <input
            type="email"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-pink-500 outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-pink-500 outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full p-3 bg-pink-600 hover:bg-pink-700 transition font-semibold rounded-lg text-white shadow-lg"
          >
            Login
          </button>
        </form>

      </motion.div>
    </div>
  );
}
