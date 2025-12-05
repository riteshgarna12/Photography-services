import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // "login" or "signup"
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For redirect after auth
  const redirectTo = location.state?.redirectTo || "/dashboard";

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(loginForm.email, loginForm.password);
      } else {
        await register(signupForm);
      }
      navigate(redirectTo);
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        (mode === "login"
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please try again.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-panel/90 border border-border rounded-2xl shadow-token p-6 md:p-8"
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-text">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-center text-muted text-sm mb-6">
          {mode === "login"
            ? "Login to manage your bookings, profile and shoots."
            : "Sign up to book cinematic shoots and manage your events."}
        </p>

        {/* Tabs */}
        <div className="flex mb-6 bg-panel/60 rounded-full p-1 border border-border">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              mode === "login"
                ? "bg-accent-600 text-white shadow-lg shadow-[rgb(var(--accent-500)/0.18)]"
                : "text-muted hover:text-text"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              mode === "signup"
                ? "bg-accent-500 text-white shadow-lg shadow-[rgb(var(--accent-500)/0.12)]"
                : "text-muted hover:text-text"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm bg-red-900/40 border border-red-600 text-red-200 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {mode === "signup" && (
            <div>
              <label className="block text-muted mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={signupForm.name}
                onChange={handleSignupChange}
                placeholder="Enter your full name"
                className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:border-accent-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-muted mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={mode === "login" ? loginForm.email : signupForm.email}
              onChange={mode === "login" ? handleLoginChange : handleSignupChange}
              placeholder="Enter your email"
              className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:border-accent-500"
              required
            />
          </div>

          <div>
            <label className="block text-muted mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={mode === "login" ? loginForm.password : signupForm.password}
              onChange={mode === "login" ? handleLoginChange : handleSignupChange}
              placeholder="Enter your password"
              className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:border-accent-500"
              required
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-muted mb-1">Role</label>
              <select
                name="role"
                value={signupForm.role}
                onChange={handleSignupChange}
                className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:border-accent-500"
              >
                <option value="client">Client</option>
                <option value="photographer">Photographer</option>
                <option value="cinematographer">Cinematographer</option>
                <option value="editor">Editor</option>
                <option value="assistant">Assistant</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-full bg-accent-600 hover:bg-accent-500 text-sm font-semibold text-white shadow-token disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* Small hint for admin */}
        <p className="text-xs text-muted text-center mt-4">
          Are you an admin?{" "}
          <span
            className="text-accent-500 cursor-pointer hover:underline"
            onClick={() => navigate("/admin/login")}
          >
            Go to Admin Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
