import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import {
  PieChart, Pie, Cell, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  if (!user || user.role !== "admin") {
  return <p className="text-center text-red-500 mt-10">Access Denied</p>;
}


  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Cancelled", value: stats.cancelled },
  ];

  const COLORS = ["#fbbf24", "#10b981", "#ef4444"];

  const barData = [
    { name: "Total Bookings", count: stats.totalBookings },
    { name: "Confirmed", count: stats.confirmed },
    { name: "Pending", count: stats.pending },
    { name: "Cancelled", count: stats.cancelled },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 rounded shadow bg-blue-100">
          <h3 className="text-xl font-bold">Total Bookings</h3>
          <p className="text-3xl">{stats.totalBookings}</p>
        </div>
        <div className="p-4 rounded shadow bg-yellow-100">
          <h3 className="text-xl font-bold">Pending</h3>
          <p className="text-3xl">{stats.pending}</p>
        </div>
        <div className="p-4 rounded shadow bg-green-100">
          <h3 className="text-xl font-bold">Confirmed</h3>
          <p className="text-3xl">{stats.confirmed}</p>
        </div>
        <div className="p-4 rounded shadow bg-red-100">
          <h3 className="text-xl font-bold">Cancelled</h3>
          <p className="text-3xl">{stats.cancelled}</p>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="mt-6 p-6 bg-purple-100 rounded shadow">
        <h3 className="text-xl font-bold">Total Revenue</h3>
        <p className="text-4xl font-bold mt-2">₹ {stats.revenue}</p>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        {/* Pie Chart */}
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-xl font-bold mb-4">Booking Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
