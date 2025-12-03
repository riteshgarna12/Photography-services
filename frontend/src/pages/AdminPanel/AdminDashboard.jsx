import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [filters, setFilters] = useState({
    status: "all",
    serviceType: "all",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (user?.role === "admin") {
      loadStats();
      loadBookings();
    }
  }, [user]);

  const loadStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  const loadBookings = async () => {
    const params = new URLSearchParams();

    if (filters.status !== "all") params.append("status", filters.status);
    if (filters.serviceType !== "all")
      params.append("serviceType", filters.serviceType);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);

    const res = await api.get(`/bookings/admin/list?${params.toString()}`);
    setBookings(res.data);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => loadBookings();

  const exportCsv = async () => {
    try {
      const res = await api.get("/bookings/admin/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookings_export.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to export CSV");
    }
  };

  // ===========================
  // ACCEPT BOOKING (ADMIN)
  // ===========================
  const acceptBooking = async (id) => {
    if (!window.confirm("Accept this booking?")) return;

    try {
      await api.put(`/bookings/accept/${id}`);
      loadBookings();
      loadStats();
    } catch (err) {
      alert("Failed to accept booking");
    }
  };

  // ===========================
  // CANCEL BOOKING (ADMIN)
  // ===========================
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.put(`/bookings/cancel/${id}`); // admin cancel also uses same endpoint
      loadBookings();
      loadStats();
    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <p className="text-center text-red-500 mt-10">Access Denied (Admin only)</p>
    );
  }

  if (!stats) return <p className="text-center mt-10 text-white">Loading...</p>;

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Cancelled", value: stats.cancelled },
  ];

  const COLORS = ["#fbbf24", "#10b981", "#ef4444"];

  const barData = [
    { name: "Total", count: stats.totalBookings },
    { name: "Confirmed", count: stats.confirmed },
    { name: "Pending", count: stats.pending },
    { name: "Cancelled", count: stats.cancelled },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="p-4 rounded bg-blue-900/40 border border-blue-500/40">
          <h3 className="text-lg">Total Bookings</h3>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="p-4 rounded bg-yellow-900/40 border border-yellow-500/40">
          <h3 className="text-lg">Pending</h3>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
        <div className="p-4 rounded bg-green-900/40 border border-green-500/40">
          <h3 className="text-lg">Confirmed</h3>
          <p className="text-3xl font-bold">{stats.confirmed}</p>
        </div>
        <div className="p-4 rounded bg-red-900/40 border border-red-500/40">
          <h3 className="text-lg">Cancelled</h3>
          <p className="text-3xl font-bold">{stats.cancelled}</p>
        </div>
      </div>

      {/* REVENUE */}
      <div className="mb-10 p-6 rounded bg-purple-900/40 border border-purple-500/40">
        <h3 className="text-xl font-bold">Total Revenue</h3>
        <p className="text-3xl md:text-4xl font-bold mt-2">₹ {stats.revenue}</p>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-4 bg-gray-900 rounded border border-gray-700">
          <h3 className="text-xl font-bold mb-3">Booking Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
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

        <div className="p-4 bg-gray-900 rounded border border-gray-700">
          <h3 className="text-xl font-bold mb-3">Booking Summary</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mb-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="bg-gray-900 border border-gray-700 px-3 py-2 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Service Type</label>
          <select
            name="serviceType"
            value={filters.serviceType}
            onChange={handleFilterChange}
            className="bg-gray-900 border border-gray-700 px-3 py-2 rounded"
          >
            <option value="all">All</option>
            <option value="Wedding Photography">Wedding Photography</option>
            <option value="Cinematic Videography">Cinematic Videography</option>
            <option value="Drone Shoot">Drone Shoot</option>
            <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
            <option value="Traditional Photography">Traditional Photography</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="bg-gray-900 border border-gray-700 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">To Date</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="bg-gray-900 border border-gray-700 px-3 py-2 rounded"
          />
        </div>

        <button
          onClick={applyFilters}
          className="bg-pink-600 px-5 py-2 rounded hover:bg-pink-700"
        >
          Apply Filters
        </button>

        <button
          onClick={exportCsv}
          className="bg-green-600 px-5 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      {/* BOOKINGS */}
      <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-lg mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="p-3">Client</th>
              <th className="p-3">Email</th>
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
                <td className="p-3">{b.client?.name}</td>
                <td className="p-3 text-gray-400">{b.client?.email}</td>
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

                <td className="p-3 flex gap-2">
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => acceptBooking(b._id)}
                        className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => cancelBooking(b._id)}
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {b.status !== "pending" && <span>-</span>}
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="p-4 text-center text-gray-400"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
