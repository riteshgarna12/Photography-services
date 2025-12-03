// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setProfileMenu(false);
    setMobileMenu(false);
    window.location.href = "/";
  };

  const isGuest = !user;
  const isUser = user && user.role !== "admin";
  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-black/90 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-bold text-white hover:text-pink-500 transition"
        >
          PhotoPro
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">

          {/* GUEST LINKS */}
          {isGuest && (
            <>
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/about" className="hover:text-white">About</Link>
              <Link to="/gallery" className="hover:text-white">Gallery</Link>
              <Link to ="/team" className="hover:text-white">Team</Link>
              <Link to="/packages" className="hover:text-white">Packages</Link>

              {/* COMBINED LOGIN / SIGNUP BUTTON */}
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
              >
                Login / Sign Up
              </Link>

              <Link
                to="/admin/login"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 shadow"
              >
                Admin Login
              </Link>
            </>
          )}

          {/* NORMAL USER */}
          {isUser && (
            <>
              <Link to="/gallery" className="hover:text-white">Gallery</Link>
              <Link to="/packages" className="hover:text-white">Packages</Link>
              <Link to ="/team" className="hover:text-white">Team</Link>
              <Link
                to="/book-service"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Book Service
              </Link>
            </>
          )}

          {/* ADMIN */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Admin Panel
            </Link>
          )}

          {/* PROFILE AVATAR + DROPDOWN */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-pink-600 flex items-center justify-center text-white rounded-full font-bold text-lg">
                  {user.name?.charAt(0)?.toUpperCase() || "C"}
                </div>
              </button>

              <AnimatePresence>
                {profileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 bg-gray-900 w-48 rounded-xl shadow-lg border border-gray-800 p-3 text-sm"
                  >
                    {isUser && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileMenu(false)}
                          className="block px-3 py-2 hover:bg-gray-800 rounded"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setProfileMenu(false)}
                          className="block px-3 py-2 hover:bg-gray-800 rounded"
                        >
                          Profile
                        </Link>
                      </>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileMenu(false)}
                        className="block px-3 py-2 hover:bg-gray-800 rounded"
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 mt-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setMobileMenu(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black text-white p-8 z-50 md:hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <FiX
                className="text-3xl cursor-pointer"
                onClick={() => setMobileMenu(false)}
              />
            </div>

            <div className="flex flex-col gap-5 text-xl">

              {/* Guest mobile menu */}
              {isGuest && (
                <>
                  <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
                  <Link to="/gallery" onClick={() => setMobileMenu(false)}>Gallery</Link>
                  <Link to="/packages" onClick={() => setMobileMenu(false)}>Packages</Link>

                  {/* Combined Login / Sign Up */}
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="text-blue-400"
                  >
                    Login / Sign Up
                  </Link>

                  <Link
                    to="/admin/login"
                    onClick={() => setMobileMenu(false)}
                    className="text-purple-400"
                  >
                    Admin Login
                  </Link>
                </>
              )}

              {/* User mobile menu */}
              {isUser && (
                <>
                  <Link to="/gallery" onClick={() => setMobileMenu(false)}>Gallery</Link>
                  <Link to="/packages" onClick={() => setMobileMenu(false)}>Packages</Link>

                  <Link
                    to="/book-service"
                    onClick={() => setMobileMenu(false)}
                    className="text-pink-400"
                  >
                    Book Service
                  </Link>

                  <Link to="/dashboard" onClick={() => setMobileMenu(false)}>Dashboard</Link>
                  <Link to="/profile" onClick={() => setMobileMenu(false)}>Profile</Link>

                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-left mt-4"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Admin mobile menu */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenu(false)}
                  >
                    Admin Panel
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-left mt-4"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
