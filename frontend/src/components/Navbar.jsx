import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          PhotoPro
        </Link>

        <div className="flex items-center gap-6">

          {/* ---------- PUBLIC LINKS ---------- */}
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/gallery" className="hover:text-blue-600">Gallery</Link>

          {/* ---------- USER ONLY BUTTON ---------- */}
          {user && user.role !== "admin" && (
            <Link
              to="/book-service"
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Book Service
            </Link>
          )}

          {/* ---------- ADMIN PANEL BUTTON ---------- */}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Admin Panel
            </Link>
          )}

          {/* ---------- USER LOGGED-IN SECTION ---------- */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
              >
                {/* Avatar */}
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* First name */}
                <span className="font-medium">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded p-2 text-sm">

                  {/* Dashboard only for normal users */}
                  {user.role !== "admin" && (
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* ---------- WHEN USER NOT LOGGED IN ---------- */}

              <Link
                to="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>

              {/* ADMIN LOGIN BUTTON */}
              <Link
                to="/admin/login"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Admin Login
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
