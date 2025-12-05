// src/components/Navbar.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // hide Home link when on dashboard or admin routes
  const hideHome = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/admin");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      // ignore
    }
    logout?.();
    setProfileMenu(false);
    setMobileMenu(false);
    // send user to login so they must log in again
    navigate("/");
  };

  const isGuest = !user;
  const isUser = user && user.role !== "admin";
  const isAdmin = user?.role === "admin";

  return (
    <nav
      className={`bg-panel/95 backdrop-blur-lg shadow-token sticky top-0 z-50 border-b border-border ${mobileMenu ? "min-h-screen" : "min-h-[64px]"}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`w-full px-4 sm:px-6 lg:px-8 ${mobileMenu ? "min-h-screen flex flex-col items-start py-6" : "min-h-[64px] flex items-center justify-between"}`}
      >
        {/* TOP ROW */}
        <div className="w-full flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold text-text dark:text-white hover:text-accent-600 transition"
            aria-label="PhotoPro home"
            onClick={() => setMobileMenu(false)}
          >
            PhotoPro
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6 text-text dark:text-muted">
              {/* For guests: show full nav (except Home if hideHome) */}
              {isGuest && (
                <>
                  {!hideHome && <Link to="/" className="hover:text-accent-600 transition">Home</Link>}
                  <Link to="/about" className="hover:text-accent-600 transition">About</Link>
                  <Link to="/gallery" className="hover:text-accent-600 transition">Gallery</Link>
                  <Link to="/team" className="hover:text-accent-600 transition">Team</Link>
                  <Link to="/packages" className="hover:text-accent-600 transition">Packages</Link>

                  <div className="flex items-center gap-3">
                    <Link to="/login" className="px-4 py-2 bg-accent-600 text-white rounded hover:bg-accent-500 shadow">Login / Sign Up</Link>
                    <Link to="/admin/login" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 shadow">Admin Login</Link>
                  </div>
                </>
              )}

              {/* For logged-in normal users: minimal bar (Book Service + avatar/profile) */}
              {isUser && (
                <>
                  <Link to="/book-service" className="px-4 py-2 bg-accent-600 text-white rounded hover:bg-accent-500">Book Service</Link>

                  {/* Profile avatar + dropdown */}
                  {user && (
                    <div className="relative" ref={profileRef}>
                      <button
                        onClick={() => setProfileMenu((s) => !s)}
                        aria-haspopup="true"
                        aria-expanded={profileMenu}
                        aria-label="Open profile menu"
                        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
                      >
                        <div className="w-10 h-10 bg-accent-600 flex items-center justify-center text-white rounded-full font-bold text-lg" aria-hidden>
                          {user.name?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                      </button>

                      <AnimatePresence>
                        {profileMenu && (
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-0 mt-3 bg-panel w-48 rounded-xl shadow-lg border border-border p-3 text-sm" role="menu" aria-label="Profile options">
                            <Link to="/dashboard" onClick={() => setProfileMenu(false)} className="block px-3 py-2 hover:bg-panel/80 rounded" role="menuitem">Dashboard</Link>
                            <Link to="/profile" onClick={() => setProfileMenu(false)} className="block px-3 py-2 hover:bg-panel/80 rounded" role="menuitem">Profile</Link>
                            <button onClick={handleLogout} className="w-full text-left px-3 py-2 mt-1 bg-red-600 hover:bg-red-700 text-white rounded" role="menuitem">Logout</button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              )}

              {/* For admins: show admin-specific links */}
              {isAdmin && (
                <>
                  {!hideHome && <Link to="/" className="hover:text-accent-600 transition">Home</Link>}
                  <Link to="/admin/dashboard" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Admin Panel</Link>
                  <div className="flex items-center gap-2">
                    <button onClick={handleLogout} className="px-3 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700">Logout</button>
                  </div>
                </>
              )}
            </div>

            {/* single theme toggle (visible >= sm) */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-3">
              <button
                className="text-text dark:text-white text-2xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => setMobileMenu((s) => !s)}
                aria-label={mobileMenu ? "Close menu" : "Open menu"}
              >
                {mobileMenu ? <FiX /> : <FiMenu />}
              </button>

              {/* tiny theme toggle on very small screens */}
              <div className="sm:hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU (simplified for logged-in users) */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="w-full md:hidden mt-6 px-2 overflow-auto"
            >
              <nav className="flex flex-col gap-4 text-lg w-full">
                {/* if guest: full nav (but hide Home on dashboard/admin routes) */}
                {isGuest && (
                  <>
                    {!hideHome && <Link to="/" onClick={() => setMobileMenu(false)} className="font-medium">Home</Link>}
                    <Link to="/gallery" onClick={() => setMobileMenu(false)} className="font-medium">Gallery</Link>
                    <Link to="/packages" onClick={() => setMobileMenu(false)} className="font-medium">Packages</Link>
                    <Link to="/about" onClick={() => setMobileMenu(false)} className="font-medium">About</Link>
                    <Link to="/team" onClick={() => setMobileMenu(false)} className="font-medium">Team</Link>

                    <Link to="/login" onClick={() => setMobileMenu(false)} className="text-accent-600 font-semibold">Login / Sign Up</Link>
                    <Link to="/admin/login" onClick={() => setMobileMenu(false)} className="text-purple-600 font-semibold">Admin Login</Link>
                  </>
                )}

                {/* logged-in normal user: only Book Service + Dashboard/Profile links (optional) + Logout */}
                {isUser && (
                  <>
                    <Link to="/book-service" onClick={() => setMobileMenu(false)} className="text-accent-600 font-semibold">Book Service</Link>

                    {/* keep quick access to dashboard/profile for mobile */}
                    <Link to="/dashboard" onClick={() => setMobileMenu(false)} className="font-medium">Dashboard</Link>
                    <Link to="/profile" onClick={() => setMobileMenu(false)} className="font-medium">Profile</Link>

                    <button onClick={() => { handleLogout(); setMobileMenu(false); }} className="text-red-600 text-left mt-2">Logout</button>
                  </>
                )}

                {/* admin mobile view */}
                {isAdmin && (
                  <>
                    <Link to="/admin/dashboard" onClick={() => setMobileMenu(false)} className="font-medium">Admin Panel</Link>
                    <button onClick={() => { handleLogout(); setMobileMenu(false); }} className="text-red-600 text-left mt-2">Logout</button>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
