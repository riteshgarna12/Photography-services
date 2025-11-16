import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-black/60 backdrop-blur-xl border border-gray-800 p-8 rounded-xl shadow-2xl text-white"
      >
        <h2 className="text-4xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-900/40 text-red-300 p-3 rounded mb-3 border border-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              placeholder="Create a password"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Select Role</label>
            <select
              name="role"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              onChange={handleChange}
            >
              <option value="client">Client</option>
              <option value="photographer">Photographer</option>
              <option value="cinematographer">Cinematographer</option>
              <option value="editor">Editor</option>
              <option value="assistant">Assistant</option>
            </select>
          </div>

          <button
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 transition font-semibold rounded-lg text-white shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
