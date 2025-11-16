import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import {
  PieChart, Pie, Cell, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") loadStats();
  }, [user]);

  const loadStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  if (!user || user.role !== "admin")
    return (
      <p className="text-center text-red-500 text-xl mt-10">
        ❌ Access Denied — Admin Only
      </p>
    );

  if (!stats) return <p className="text-center text-gray-300 mt-10">Loading...</p>;

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Cancelled", value: stats.cancelled },
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  const barData = [
    { name: "Total", count: stats.totalBookings },
    { name: "Confirmed", count: stats.confirmed },
    { name: "Pending", count: stats.pending },
    { name: "Cancelled", count: stats.cancelled },
  ];

  return (
    <div className="min-h-screen pt-10 px-6 bg-black text-white">

      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-pink-500 drop-shadow-lg"
      >
        Admin Dashboard
      </motion.h2>

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Bookings", value: stats.totalBookings, color: "blue" },
          { label: "Pending", value: stats.pending, color: "yellow" },
          { label: "Confirmed", value: stats.confirmed, color: "green" },
          { label: "Cancelled", value: stats.cancelled, color: "red" },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-xl shadow-xl bg-gray-900/60 border border-${card.color}-500/40`}
          >
            <h3 className={`text-lg font-semibold text-${card.color}-400`}>
              {card.label}
            </h3>
            <p className="text-4xl font-bold mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 bg-gray-900/60 border border-purple-500/40 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-purple-400">Total Revenue</h3>
        <p className="text-5xl font-bold mt-2 text-purple-300">
          ₹ {stats.revenue}
        </p>
      </motion.div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gray-900/60 rounded-xl border border-gray-700 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-200">
            Booking Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                dataKey="value"
                label={(entry) => `${entry.name} (${entry.value})`}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: "white" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gray-900/60 rounded-xl border border-gray-700 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-200">
            Booking Summary
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip wrapperStyle={{ backgroundColor: "#111", color: "#fff" }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
}
