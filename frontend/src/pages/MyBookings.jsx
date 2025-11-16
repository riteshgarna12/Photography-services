import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await api.get("/bookings/my");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await api.put(`/bookings/cancel/${id}`);
    loadBookings();
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-600">You have no bookings yet.</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 shadow rounded bg-white">
            <h3 className="font-bold text-lg">{b.serviceType}</h3>

            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p><strong>Venue:</strong> {b.venue}</p>
            <p><strong>City:</strong> {b.city}</p>

            <p className="mt-2">
              <span
                className={`px-3 py-1 rounded text-white ${
                  b.status === "pending"
                    ? "bg-yellow-500"
                    : b.status === "confirmed"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {b.status.toUpperCase()}
              </span>
            </p>

            {/* Cancel Button */}
            {b.status !== "cancelled" && (
              <button
                onClick={() => cancelBooking(b._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
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
