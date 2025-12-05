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
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data || {});
    } catch (err) {
      console.error("Failed to load stats", err);
      setError("Failed to load statistics.");
    } finally {
      setLoadingStats(false);
    }
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    setError("");
    try {
      const params = new URLSearchParams();

      if (filters.status !== "all") params.append("status", filters.status);
      if (filters.serviceType !== "all")
        params.append("serviceType", filters.serviceType);
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
      if (filters.toDate) params.append("toDate", filters.toDate);

      const res = await api.get(`/bookings/admin/list?${params.toString()}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
      setError("Failed to load bookings.");
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
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

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookings_export.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      // free memory
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export CSV");
    }
  };

  // Accept booking (admin)
  const acceptBooking = async (id) => {
    if (!window.confirm("Accept this booking?")) return;
    setActionLoadingId(id);
    try {
      await api.put(`/bookings/accept/${id}`);
      await loadBookings();
      await loadStats();
    } catch (err) {
      console.error("Accept failed", err);
      alert(err?.response?.data?.message || "Failed to accept booking");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Cancel booking (admin) -> calls admin-only endpoint
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    setActionLoadingId(id);
    try {
      await api.put(`/bookings/admin/cancel/${id}`);
      await loadBookings();
      await loadStats();
    } catch (err) {
      console.error("Cancel failed", err);
      alert(err?.response?.data?.message || "Failed to cancel booking");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6">
        <p className="text-[rgb(255,120,120)]">Access Denied (Admin only)</p>
      </div>
    );
  }

  if (loadingStats || !stats) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6 bg-bg text-text">
        <p className="text-muted">Loading dashboard…</p>
      </div>
    );
  }

  const pieData = [
    { name: "Pending", value: stats.pending || 0 },
    { name: "Confirmed", value: stats.confirmed || 0 },
    { name: "Cancelled", value: stats.cancelled || 0 },
  ];

  const COLORS = ["#fbbf24", "#10b981", "#ef4444"]; // warning, success, danger

  const barData = [
    { name: "Total", count: stats.totalBookings || 0 },
    { name: "Confirmed", count: stats.confirmed || 0 },
    { name: "Pending", count: stats.pending || 0 },
    { name: "Cancelled", count: stats.cancelled || 0 },
  ];

  return (
    <div className="min-h-screen bg-bg text-text px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-3 rounded bg-[rgba(255,80,80,0.06)] border border-[rgba(255,80,80,0.12)] text-[rgb(255,180,180)]">
            {error}
          </div>
        )}

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="p-4 rounded bg-panel border border-border shadow-token">
            <h3 className="text-lg text-muted">Total Bookings</h3>
            <p className="text-3xl font-bold text-text">{stats.totalBookings || 0}</p>
          </div>

          <div className="p-4 rounded bg-panel border border-border shadow-token">
            <h3 className="text-lg text-muted">Pending</h3>
            <p className="text-3xl font-bold text-text">{stats.pending || 0}</p>
          </div>

          <div className="p-4 rounded bg-panel border border-border shadow-token">
            <h3 className="text-lg text-muted">Confirmed</h3>
            <p className="text-3xl font-bold text-text">{stats.confirmed || 0}</p>
          </div>

          <div className="p-4 rounded bg-panel border border-border shadow-token">
            <h3 className="text-lg text-muted">Cancelled</h3>
            <p className="text-3xl font-bold text-text">{stats.cancelled || 0}</p>
          </div>
        </div>

        {/* REVENUE */}
        <div className="mb-10 p-6 rounded bg-panel border border-border shadow-token">
          <h3 className="text-xl font-bold text-text">Total Revenue</h3>
          <p className="text-3xl md:text-4xl font-bold text-text mt-2">₹ {stats.revenue || 0}</p>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-4 bg-panel rounded border border-border">
            <h3 className="text-xl font-bold mb-3 text-text">Booking Status Distribution</h3>
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
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-panel rounded border border-border">
            <h3 className="text-xl font-bold mb-3 text-text">Booking Summary</h3>
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
            <label className="block text-sm text-muted mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="bg-panel border border-border px-3 py-2 rounded"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Service Type</label>
            <select
              name="serviceType"
              value={filters.serviceType}
              onChange={handleFilterChange}
              className="bg-panel border border-border px-3 py-2 rounded"
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
            <label className="block text-sm text-muted mb-1">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterChange}
              className="bg-panel border border-border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">To Date</label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleFilterChange}
              className="bg-panel border border-border px-3 py-2 rounded"
            />
          </div>

          <button onClick={applyFilters} className="bg-accent-600 px-5 py-2 rounded hover:bg-accent-500">
            Apply Filters
          </button>

          <button onClick={exportCsv} className="bg-green-600 px-5 py-2 rounded hover:bg-green-700">
            Export CSV
          </button>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="overflow-x-auto bg-panel border border-border rounded-lg mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted">
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
              {loadingBookings ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-muted">
                    Loading bookings…
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-muted">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="border-b border-border">
                    <td className="p-3 text-text">{b.client?.name}</td>
                    <td className="p-3 text-muted">{b.client?.email}</td>
                    <td className="p-3 text-text">{b.serviceType}</td>
                    <td className="p-3 text-text">{b.date}</td>
                    <td className="p-3 text-text">{b.time}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-sm ${
                          b.status === "confirmed"
                            ? "bg-green-700 text-white"
                            : b.status === "cancelled"
                            ? "bg-red-700 text-white"
                            : "bg-yellow-600 text-white"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      {b.status === "pending" ? (
                        <>
                          <button
                            onClick={() => acceptBooking(b._id)}
                            className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
                            disabled={actionLoadingId === b._id}
                          >
                            {actionLoadingId === b._id ? "Processing..." : "Accept"}
                          </button>
                          <button
                            onClick={() => cancelBooking(b._id)}
                            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                            disabled={actionLoadingId === b._id}
                          >
                            {actionLoadingId === b._id ? "Processing..." : "Cancel"}
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
