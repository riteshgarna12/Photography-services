import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/my");
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
      setBookings([]);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.put(`/bookings/cancel/${id}`);
      loadBookings();
    } catch (err) {
      console.error("Cancel failed", err);
      alert("Failed to cancel booking.");
    }
  };

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-text">My Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-muted">You have no bookings yet.</p>
      )}

      <div className="space-y-4 mt-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="p-4 rounded-lg bg-panel border border-border shadow-token"
            role="article"
            aria-labelledby={`booking-${b._id}-title`}
          >
            <h3 id={`booking-${b._id}-title`} className="font-bold text-lg text-text">
              {b.serviceType}
            </h3>

            <p className="text-muted"><strong>Date:</strong> {b.date}</p>
            <p className="text-muted"><strong>Time:</strong> {b.time}</p>
            <p className="text-muted"><strong>Venue:</strong> {b.venue}</p>
            <p className="text-muted"><strong>City:</strong> {b.city}</p>

            <p className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                  b.status === "pending"
                    ? "bg-yellow-600 text-white"
                    : b.status === "confirmed"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
                aria-live="polite"
              >
                {String(b.status).toUpperCase()}
              </span>
            </p>

            {/* Cancel Button */}
            {b.status !== "cancelled" && (
              <button
                onClick={() => cancelBooking(b._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
