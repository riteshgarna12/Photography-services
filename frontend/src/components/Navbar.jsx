import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  // -------------------------------
  // DISABLE BACKGROUND SCROLL
  // -------------------------------
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "auto";
  }, [mobileMenu]);

  // -------------------------------
  // SAFE LOGOUT
  // -------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setMobileMenu(false);
    window.location.href = "/"; // force safe logout to home
  };

  // -------------------------------
  // ROLE CONDITIONS
  // -------------------------------
  const isGuest = !user;
  const isUser = user && user.role !== "admin";
  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-black/90 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold text-white hover:text-pink-500 transition">
          PhotoPro
        </Link>

        {/* ---------------- DESKTOP NAV ---------------- */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">

          {/* Guest Links */}
          {isGuest && (
            <>
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/gallery" className="hover:text-white">Gallery</Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
              >
                Login
              </Link>

              <Link
                to="/admin/login"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow"
              >
                Admin Login
              </Link>
            </>
          )}

          {/* User Links */}
          {isUser && (
            <>
              <Link to="/gallery" className="hover:text-white">Gallery</Link>

              <Link
                to="/book-service"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 shadow"
              >
                Book Service
              </Link>
            </>
          )}

          {/* Admin Links */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow"
            >
              Admin Panel
            </Link>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setMobileMenu(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      <AnimatePresence>
        {mobileMenu && (
            <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="
                fixed top-0 left-0 
                h-screen w-screen 
                bg-black text-white 
                p-8 z-[9999] 
                md:hidden 
                overflow-y-auto
            "
            >
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Menu</h2>
                <button onClick={() => setMobileMenu(false)} className="text-3xl">
                <FiX />
                </button>
            </div>

            <div className="flex flex-col gap-6 text-xl">
                {/* GUEST */}
                {isGuest && (
                <>
                    <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
                    <Link to="/gallery" onClick={() => setMobileMenu(false)}>Gallery</Link>
                    <Link to="/signup" onClick={() => setMobileMenu(false)}>Sign Up</Link>
                    <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
                    <Link to="/admin/login" onClick={() => setMobileMenu(false)}>Admin Login</Link>
                </>
                )}

                {/* USER */}
                {isUser && (
                <>
                    <Link to="/gallery" onClick={() => setMobileMenu(false)}>Gallery</Link>
                    <Link to="/book-service" className="text-pink-400" onClick={() => setMobileMenu(false)}>
                    Book Service
                    </Link>
                </>
                )}

                {/* ADMIN */}
                {isAdmin && (
                <Link
                    to="/admin/dashboard"
                    className="text-purple-400"
                    onClick={() => setMobileMenu(false)}
                >
                    Admin Panel
                </Link>
                )}

                {/* LOGOUT */}
                {user && (
                <button
                    onClick={handleLogout}
                    className="text-red-500 text-left mt-6"
                >
                    Logout
                </button>
                )}
            </div>
            </motion.div>
        )}
        </AnimatePresence>
    </nav>
  );
}
