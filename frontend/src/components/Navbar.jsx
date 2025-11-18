import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  // SAFE LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setProfileMenu(false);
    window.location.href = "/"; // Redirect home
  };

  const isGuest = !user;
  const isUser = user && user.role !== "admin";
  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-black/95 backdrop-blur-xl shadow-md sticky top-0 z-50">
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

          {/* Guest */}
          {isGuest && (
            <>
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/gallery" className="hover:text-white">Gallery</Link>
              <Link to="/packages" className="hover:text-white">Packages</Link>
              <Link to="/team" className="hover:text-white">Team</Link>


              <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Sign Up
              </Link>
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Login
              </Link>
              <Link to="/admin/login" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Admin Login
              </Link>
            </>
          )}

          {/* User */}
          {isUser && (
            <>
              <Link to="/gallery" className="hover:text-white">Gallery</Link>
              <Link to="/packages" className="hover:text-white">Packages</Link>
              <Link to="/team" className="hover:text-white">Team</Link>


              <Link
                to="/book-service"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Book Service
              </Link>
            </>
          )}

          {/* Admin */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Admin Panel
            </Link>
          )}

          {/* PROFILE AVATAR */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 
                                flex items-center justify-center text-white 
                                rounded-full font-bold text-lg shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* DROPDOWN */}
              <AnimatePresence>
                {profileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="absolute right-0 mt-3 bg-gray-900 w-56 rounded-xl 
                               shadow-xl border border-gray-800 p-4 z-50"
                  >
                    {/* User options */}
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

                    {/* Admin */}
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
                      className="w-full text-left px-3 py-2 mt-2 bg-red-600 hover:bg-red-700 rounded"
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
              <FiX className="text-3xl" onClick={() => setMobileMenu(false)} />
            </div>

            {/* MOBILE CONTENT */}
            <div className="flex flex-col gap-6 text-xl">

              {/* Show avatar on mobile */}
              {user && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-purple-600 
                                  rounded-full flex items-center justify-center 
                                  text-white text-2xl font-bold shadow-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Guest */}
              {isGuest && (
                <>
                  <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
                  <Link to="/gallery" onClick={() => setMobileMenu(false)}>Gallery</Link>
                  <Link to="/packages" onClick={() => setMobileMenu(false)}>Packages</Link>

                  <Link to="/signup" onClick={() => setMobileMenu(false)}>Sign Up</Link>
                  <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
                  <Link to="/admin/login" onClick={() => setMobileMenu(false)}>Admin Login</Link>
                </>
              )}

              {/* User */}
              {isUser && (
                <>
                  <Link to="/gallery" onClick={() => setMobileMenu(false)}>Gallery</Link>
                  <Link to="/packages" onClick={() => setMobileMenu(false)}>Packages</Link>

                  <Link to="/book-service" onClick={() => setMobileMenu(false)} className="text-pink-400">
                    Book Service
                  </Link>

                  <Link to="/dashboard" onClick={() => setMobileMenu(false)}>Dashboard</Link>
                  <Link to="/profile" onClick={() => setMobileMenu(false)}>Profile</Link>
                </>
              )}

              {/* Admin */}
              {isAdmin && (
                <Link to="/admin/dashboard" onClick={() => setMobileMenu(false)}>
                  Admin Panel
                </Link>
              )}

              {/* Logout */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-red-500 text-left"
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
