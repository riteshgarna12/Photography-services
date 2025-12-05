// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiCheckCircle, FiClock, FiHash, FiPlus } from "react-icons/fi";

/**
 * PhotoPro - Polished Dashboard (light theme: black text)
 */

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings/my");
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Do you really want to cancel this booking?")) return;

    try {
      setCanceling(id);
      await api.put(`/bookings/cancel/${id}`);
      await loadBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking.");
    } finally {
      setCanceling(null);
    }
  };

  // derived stats
  const stats = bookings.reduce(
    (s, b) => {
      s.total += 1;
      if (b.status === "confirmed") s.confirmed += 1;
      else if (b.status === "pending") s.pending += 1;
      else if (b.status === "cancelled") s.cancelled += 1;
      return s;
    },
    { total: 0, confirmed: 0, pending: 0, cancelled: 0 }
  );

  const formatDate = (isoOrString) => {
    if (!isoOrString) return "-";
    const d = new Date(isoOrString);
    if (isNaN(d)) return isoOrString;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-bg text-black dark:text-text px-4 sm:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.header initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-black dark:text-text">
            Welcome back, {user?.name ?? "Photographer"} 👋
          </h1>
          <p className="text-gray-600 dark:text-muted mt-2 max-w-2xl">
            Manage your bookings, view packages and update profile from one place. Quick actions and booking stats live here.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <aside className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 bg-white/95 dark:bg-panel/70 border border-gray-200 dark:border-border shadow-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <motion.div
                  className="p-4 rounded-2xl bg-white/95 dark:bg-panel/70 border border-gray-200 dark:border-border flex items-center gap-4 shadow-sm hover:shadow-md transition"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="p-3 rounded-lg bg-accent-50 text-accent-600">
                    <FiHash size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-muted">Total</div>
                    <div className="font-semibold text-black dark:text-text">{stats.total}</div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 rounded-2xl bg-white/95 dark:bg-panel/70 border border-gray-200 dark:border-border flex items-center gap-4 shadow-sm hover:shadow-md transition"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="p-3 rounded-lg bg-accent-50 text-accent-600">
                    <FiCalendar size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-muted">Upcoming</div>
                    <div className="font-semibold text-black dark:text-text">{bookings.filter((b) => b.status === "confirmed").length}</div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 rounded-2xl bg-white/95 dark:bg-panel/70 border border-gray-200 dark:border-border flex items-center gap-4 shadow-sm hover:shadow-md transition"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                    <FiCheckCircle size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-muted">Confirmed</div>
                    <div className="font-semibold text-emerald-700 dark:text-emerald-300">{stats.confirmed}</div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 rounded-2xl bg-white/95 dark:bg-panel/70 border border-gray-200 dark:border-border flex items-center gap-4 shadow-sm hover:shadow-md transition"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                    <FiClock size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-muted">Pending</div>
                    <div className="font-semibold text-yellow-700 dark:text-yellow-300">{stats.pending}</div>
                  </div>
                </motion.div>
              </div>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl p-4 bg-panel/60 border border-border"
            >
                <h4 className="text-md font-semibold mb-2">Quick Actions</h4>
                <div className="flex flex-col gap-2">
                <button onClick={() => navigate("/packages")} className="text-left text-sm p-2 rounded hover:bg-panel/50">Browse Packages</button>
                <button onClick={() => navigate("/gallery")} className="text-left text-sm p-2 rounded hover:bg-panel/50">View Gallery</button>
                </div>
          </motion.div>

        
              <div className="mt-6">
                <button
                  onClick={() => navigate("/book-service")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent-600 hover:bg-accent-500 text-white shadow-md transition"
                  aria-label="Book a new service"
                >
                  <FiPlus /> Book a New Service
                </button>
              </div>
            </motion.div>
          </aside>

          {/* RIGHT COLUMN */}
          <main className="lg:col-span-8">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-black dark:text-text">My Bookings</h2>
              <div className="text-sm text-gray-600 dark:text-muted">Manage upcoming and past bookings</div>
            </div>

            {/* Bookings content */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-border bg-white/95 dark:bg-panel/70 backdrop-blur">
              {loading ? (
                <div className="p-6 text-center text-gray-600 dark:text-muted">Loading bookings…</div>
              ) : bookings.length === 0 ? (
                <div className="p-8 text-center text-gray-600 dark:text-muted">
                  You don't have any bookings yet.
                  <div className="mt-4">
                    <button onClick={() => navigate("/book-service")} className="px-5 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white transition">
                      Book a Service
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  {/* Large screens: table */}
                  <div className="hidden lg:block">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 dark:bg-panel/80 sticky top-0">
                        <tr className="text-gray-600 dark:text-muted">
                          <th className="p-4">Service</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Time</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b._id} className="border-t border-gray-100 dark:border-border hover:bg-gray-50 dark:hover:bg-panel/60 transition-colors">
                            <td className="p-4 text-black dark:text-text font-medium">{b.serviceType}</td>
                            <td className="p-4 text-gray-600 dark:text-muted">{formatDate(b.date)}</td>
                            <td className="p-4 text-gray-600 dark:text-muted">{b.time ?? "-"}</td>
                            <td className="p-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                  b.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : b.status === "cancelled"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="p-4">
                              {b.status === "pending" ? (
                                <button
                                  onClick={() => cancelBooking(b._id)}
                                  disabled={canceling === b._id}
                                  className="px-4 py-1 bg-red-600 rounded-lg text-white hover:bg-red-700 disabled:opacity-60 transition"
                                >
                                  {canceling === b._id ? "Cancelling..." : "Cancel"}
                                </button>
                              ) : (
                                <button onClick={() => navigate(`/bookings/${b._id}`)} className="px-4 py-1 rounded-lg border border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-panel/60 transition">
                                  View
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Small screens: stacked cards */}
                  <div className="lg:hidden p-4 space-y-4">
                    {bookings.map((b) => (
                      <div key={b._id} className="p-4 rounded-xl bg-white/95 dark:bg-panel/60 border border-gray-200 dark:border-border shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-black dark:text-text">{b.serviceType}</div>
                            <div className="text-sm text-gray-600 dark:text-muted mt-1">{formatDate(b.date)} • {b.time ?? "-"}</div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-600 dark:text-muted">Status</div>
                            <div className="mt-1">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                  b.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : b.status === "cancelled"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {b.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          {b.status === "pending" ? (
                            <button onClick={() => cancelBooking(b._id)} disabled={canceling === b._id} className="w-full px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 disabled:opacity-60 transition">
                              {canceling === b._id ? "Cancelling..." : "Cancel Booking"}
                            </button>
                          ) : (
                            <button onClick={() => navigate(`/bookings/${b._id}`)} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-panel/50 transition">
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
