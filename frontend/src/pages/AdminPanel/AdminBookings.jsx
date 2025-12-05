import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

export default function AdminBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const load = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/bookings");
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      load();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update status.");
    }
  };

  if (user?.role !== "admin")
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6">
        <p className="text-[rgb(255,120,120)]">Access Denied</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-text">Admin Bookings Panel</h2>

      {loading ? (
        <div className="py-12 text-muted">Loading bookings…</div>
      ) : error ? (
        <div className="py-6 text-[rgb(255,180,180)]">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="py-8 text-muted">No bookings found.</div>
      ) : (
        bookings.map((b) => (
          <article
            key={b._id}
            className="p-4 mb-4 bg-panel border border-border rounded-lg shadow-token"
            aria-labelledby={`booking-${b._id}-title`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 id={`booking-${b._id}-title`} className="text-xl font-bold text-text">
                  {b.serviceType}
                </h3>
                <p className="text-muted">
                  <strong>User:</strong> {b.client?.name}{" "}
                  <span className="text-muted">({b.client?.email})</span>
                </p>
                <p className="text-muted"><strong>Date:</strong> {b.date}</p>
                <p className="text-muted"><strong>Venue:</strong> {b.venue}, {b.city}</p>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    b.status === "pending"
                      ? "bg-yellow-600 text-white"
                      : b.status === "confirmed"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {String(b.status).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(b._id, "confirmed")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                aria-label={`Confirm booking ${b._id}`}
              >
                Confirm
              </button>

              <button
                onClick={() => updateStatus(b._1d, "cancelled")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                aria-label={`Cancel booking ${b._id}`}
              >
                Cancel
              </button>

              <button
                onClick={() => updateStatus(b._id, "pending")}
                className="px-4 py-2 bg-panel/80 border border-border text-text rounded-lg hover:bg-panel/95 transition"
                aria-label={`Mark booking ${b._id} pending`}
              >
                Mark Pending
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
