import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.log("Error loading bookings:", err);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Do you really want to cancel this booking?")) return;

    try {
      await api.put(`/bookings/cancel/${id}`);
      loadBookings();
    } catch {
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-12">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Your personal dashboard to manage bookings & updates.
        </p>

        <button
          onClick={() => navigate("/book-service")}
          className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 shadow-lg rounded-xl text-white 
                     hover:shadow-pink-500/30 transition-all duration-300"
        >
          + Book a New Service
        </button>
      </motion.div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl 
          bg-white/5 backdrop-blur-md 
          border border-white/10 shadow-lg 
          hover:shadow-pink-500/30 cursor-pointer transition"
          onClick={() => navigate("/gallery")}
        >
          <h3 className="text-2xl font-semibold mb-2">📸 View Gallery</h3>
          <p className="text-gray-400">Explore our stunning work</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl 
          bg-white/5 backdrop-blur-md 
          border border-white/10 shadow-lg 
          hover:shadow-purple-500/30 cursor-pointer transition"
          onClick={() => navigate("/packages")}
        >
          <h3 className="text-2xl font-semibold mb-2">🎁 Packages</h3>
          <p className="text-gray-400">Wedding, Cinematic & More</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl 
          bg-white/5 backdrop-blur-md 
          border border-white/10 shadow-lg 
          hover:shadow-blue-500/30 cursor-pointer transition"
          onClick={() => navigate("/profile")}
        >
          <h3 className="text-2xl font-semibold mb-2">👤 Profile</h3>
          <p className="text-gray-400">Manage account settings</p>
        </motion.div>

      </div>

      {/* MY BOOKINGS SECTION */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        My Bookings
      </motion.h2>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-10"
        >
          <p>No bookings found yet 👀</p>
          <button
            onClick={() => navigate("/book-service")}
            className="mt-4 bg-pink-600 px-6 py-2 rounded-xl hover:bg-pink-700 transition"
          >
            Book Now
          </button>
        </motion.div>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
          <table className="w-full text-left">
            <thead className="bg-white/10">
              <tr className="text-gray-300">
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-white/10">
                  <td className="p-4">{b.serviceType}</td>
                  <td className="p-4">{b.date}</td>
                  <td className="p-4">{b.time}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        b.status === "confirmed"
                          ? "bg-green-700/40 text-green-300"
                          : b.status === "cancelled"
                          ? "bg-red-700/40 text-red-300"
                          : "bg-yellow-600/40 text-yellow-300"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {b.status === "pending" ? (
                      <button
                        onClick={() => cancelBooking(b._id)}
                        className="px-4 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}