import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function BookService() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    "Wedding Photography",
    "Cinematic Videography",
    "Drone Shoot",
    "Pre-Wedding Shoot",
    "Traditional Photography",
    "Engagement Shoot",
  ];

  const [form, setForm] = useState({
    serviceType: services[0],
    date: "",
    time: "",
    venue: "",
    city: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill if navigated with state: { serviceType }
  useEffect(() => {
    if (location.state?.serviceType) {
      setForm((prev) => ({ ...prev, serviceType: location.state.serviceType }));
    }
  }, [location.state]);

  // redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      // small friendly redirect: try to save destination for after login if you want
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // basic client-side validation
    const { serviceType, date, time, venue, city } = form;
    if (!serviceType || !date || !time || !venue || !city) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/bookings", form);
      setSuccess("Your booking has been submitted!");
      // optional: navigate to "My Bookings" or Dashboard after a short delay
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      // try to surface backend message if present
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to book service. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Book a Service</h2>

      {success && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-3">{success}</p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-3">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Type */}
        <div>
          <label className="font-medium block mb-1">Select Service</label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="font-medium block mb-1">Event Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Time */}
        <div>
          <label className="font-medium block mb-1">Event Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Venue */}
        <div>
          <label className="font-medium block mb-1">Venue / Location</label>
          <input
            type="text"
            name="venue"
            placeholder="Hotel, Lawn, Home, Destination..."
            required
            value={form.venue}
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div>
          <label className="font-medium block mb-1">City</label>
          <input
            type="text"
            name="city"
            placeholder="City Name"
            required
            value={form.city}
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="font-medium block mb-1">Additional Notes</label>
          <textarea
            name="notes"
            rows="3"
            placeholder="Any special requests or instructions..."
            value={form.notes}
            className="w-full border p-2 rounded"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}
