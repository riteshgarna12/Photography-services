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
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      await api.delete(`/bookings/${id}`);
      loadBookings();
    } catch {
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-10"
      >
        <h1 className="text-4xl font-bold">Welcome, {user?.name} 👋</h1>
        <p className="text-gray-400 mt-2">Here is your activity overview.</p>

        <button
          onClick={() => navigate("/book-service")}
          className="mt-4 bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Book a New Service
        </button>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="p-6 bg-gray-900 border border-gray-800 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-pink-500/20 transition"
          onClick={() => navigate("/gallery")}
        >
          <h3 className="text-xl font-semibold">View Gallery</h3>
          <p className="text-gray-400 text-sm mt-2">Explore our best work</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="p-6 bg-gray-900 border border-gray-800 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition"
          onClick={() => navigate("/packages")}
        >
          <h3 className="text-xl font-semibold">View Packages</h3>
          <p className="text-gray-400 text-sm mt-2">Wedding, Cinematic & more</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="p-6 bg-gray-900 border border-gray-800 rounded-xl"
          onClick={() => navigate("/profile")}
        >
          <h3 className="text-xl font-semibold">Profile</h3>
          <p className="text-gray-400 text-sm mt-2">Update your details</p>
        </motion.div>
      </div>

      {/* My Bookings */}
      <h2 className="text-3xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-400 mt-4">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse mt-4">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="p-3">Service</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-gray-800">
                  <td className="p-3">{b.serviceType}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{b.time}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        b.status === "confirmed"
                          ? "bg-green-700"
                          : b.status === "cancelled"
                          ? "bg-red-700"
                          : "bg-yellow-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {b.status === "pending" ? (
                      <button
                        onClick={() => cancelBooking(b._id)}
                        className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      "-"
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
