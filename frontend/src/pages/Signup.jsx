import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
      setError(err.response?.data?.message || "Registration failed. Try again.");

    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Select Role</label>
          <select
            name="role"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="client">Client</option>
            <option value="photographer">Photographer</option>
            <option value="cinematographer">Cinematographer</option>
            <option value="editor">Editor</option>
            <option value="assistant">Assistant</option>
          </select>
        </div>

        {/* Submit */}
        <button className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium">Login</Link>
      </p>
    </div>
  );
}
