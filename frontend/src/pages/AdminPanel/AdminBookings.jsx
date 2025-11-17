import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

export default function AdminBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") load();
  }, [user]);

  const load = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    load();
  };

  if (user?.role !== "admin")
    return <p className="text-center text-red-500 mt-10">Access Denied</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Admin Bookings Panel</h2>

      {bookings.map((b) => (
        <div
          key={b._id}
          className="p-4 mb-4 bg-white shadow rounded border-l-4 border-blue-600"
        >
          <h3 className="text-xl font-bold">{b.serviceType}</h3>
          <p><strong>User:</strong> {b.client?.name} ({b.client?.email})</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Venue:</strong> {b.venue}, {b.city}</p>

          <p className="mt-2">
            <span className="px-3 py-1 rounded bg-gray-800 text-white">
              {b.status}
            </span>
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => updateStatus(b._id, "confirmed")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>

            <button
              onClick={() => updateStatus(b._id, "cancelled")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
