import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-panel/90 border border-border p-8 rounded-xl shadow-token"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-text">
          Create Account
        </h2>

        {error && (
          <p className="bg-[rgba(200,30,30,0.08)] text-[rgb(255,200,200)] p-3 rounded mb-3 border border-[rgba(200,30,30,0.2)]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-muted block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 bg-panel/80 border border-border rounded-lg focus:border-accent-500 outline-none text-text"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-muted block mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-panel/80 border border-border rounded-lg focus:border-accent-500 outline-none text-text"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-muted block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 bg-panel/80 border border-border rounded-lg focus:border-accent-500 outline-none text-text"
              placeholder="Create a password"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-muted block mb-1">Select Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 bg-panel/80 border border-border rounded-lg focus:border-accent-500 outline-none text-text"
            >
              <option value="client">Client</option>
              <option value="photographer">Photographer</option>
              <option value="cinematographer">Cinematographer</option>
              <option value="editor">Editor</option>
              <option value="assistant">Assistant</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-accent-600 hover:bg-accent-500 transition font-semibold rounded-lg text-white shadow-token"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-muted mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-accent-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
