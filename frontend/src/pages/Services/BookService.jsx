// src/pages/BookService.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin, FiCamera, FiPhone, FiMail } from "react-icons/fi";

export default function BookService() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    serviceType: "Wedding Photography",
    date: "",
    time: "",
    venue: "",
    city: "",
    notes: "",
    contactMethod: "whatsapp",
    contactValue: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const services = [
    { name: "Wedding Photography", tag: "Full day coverage • Candid + Traditional" },
    { name: "Cinematic Video Shoot", tag: "Story-based wedding film • 4K" },
    { name: "Pre-Wedding Shoot", tag: "Concept based couple shoot" },
    { name: "Modeling Portfolio Shoot", tag: "Studio + Outdoor lookbook" },
    { name: "Drone Shoot", tag: "Aerial + FPV coverage" },
    { name: "Birthday / Event Shoot", tag: "Candid + group coverage" },
  ];

  const selectedService = services.find((s) => s.name === form.serviceType) || services[0];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      navigate("/login", { state: { redirectTo: "/book-service" } });
      return;
    }

    if (!form.date || !form.time || !form.venue || !form.city) {
      setError("Please fill all required fields.");
      return;
    }

    if (!form.contactValue.trim()) {
      setError(
        form.contactMethod === "whatsapp"
          ? "Please enter your WhatsApp number."
          : "Please enter your email address."
      );
      return;
    }

    try {
      setLoading(true);
      await api.post("/bookings", form);
      setSuccess("Your booking request has been submitted. We’ll contact you soon!");
      setForm((prev) => ({
        ...prev,
        date: "",
        time: "",
        venue: "",
        city: "",
        notes: "",
        contactValue: "",
      }));
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to book service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text py-16 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 items-start">
        {/* LEFT: INFO PANEL */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
          <p className="uppercase tracking-[0.25em] text-xs text-accent-500">Book a Service</p>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-text">
            Lock your <span className="text-accent-500">Photography &amp; Cinematic</span> team in a few steps.
          </h1>

          <p className="text-muted text-sm md:text-base">
            Select your service, share event details and how we should reach you.
            Our coordinator will confirm availability, pricing and team size for your date.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-accent-600/10 border border-accent-600 flex items-center justify-center">
                <FiCalendar className="text-accent-500" />
              </div>
              <div>
                <p className="font-semibold text-text">1. Share your date & venue</p>
                <p className="text-muted">We check team availability for your city and event timings.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-accent-600/10 border border-accent-600 flex items-center justify-center">
                <FiCamera className="text-accent-500" />
              </div>
              <div>
                <p className="font-semibold text-text">2. We align the right team</p>
                <p className="text-muted">Candid experts, drone pilots or cinematographers – based on your selection.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-accent-600/10 border border-accent-600 flex items-center justify-center">
                <FiClock className="text-accent-500" />
              </div>
              <div>
                <p className="font-semibold text-text">3. Confirmation within 24 hours</p>
                <p className="text-muted">Get a WhatsApp / email confirmation with package details.</p>
              </div>
            </div>
          </div>

          {/* Live Summary */}
          <div className="mt-8 p-4 rounded-2xl bg-panel border border-border text-sm space-y-2">
            <p className="text-xs text-muted uppercase tracking-[0.2em]">Your current selection</p>
            <p className="font-semibold flex items-center gap-2 text-text">
              <FiCamera className="text-accent-500" /> {form.serviceType}
            </p>

            <p className="text-muted flex items-center gap-2">
              <FiCalendar className="text-muted" />
              {form.date || "Select a date"} · <FiClock className="text-muted" /> {form.time || "Select a time"}
            </p>

            <p className="text-muted flex items-center gap-2">
              <FiMapPin className="text-muted" />
              {form.venue || "Venue"} {form.city && `• ${form.city}`}
            </p>

            <p className="text-muted flex items-center gap-2">
              {form.contactMethod === "whatsapp" ? <FiPhone className="text-muted" /> : <FiMail className="text-muted" />}
              {form.contactValue
                ? `${form.contactMethod === "whatsapp" ? "WhatsApp" : "Email"}: ${form.contactValue}`
                : "Preferred contact: not set"}
            </p>
          </div>
        </motion.div>

        {/* RIGHT: FORM CARD */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
          <div className="bg-panel/90 border border-border rounded-2xl shadow-token p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text">Book a Service</h2>
                <p className="text-muted text-xs mt-1">Fill in your event details – we’ll confirm on WhatsApp / email.</p>
              </div>

              <div className="hidden sm:flex flex-col items-end text-xs text-muted">
                <span className="text-[10px] uppercase tracking-[0.2em]">Selected</span>
                <span className="text-accent-500 font-medium">{selectedService.name}</span>
                <span className="text-muted">{selectedService.tag}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-sm bg-[rgba(200,30,30,0.06)] border border-[rgba(200,30,30,0.12)] text-[rgb(255,200,200)] px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-sm bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.12)] text-[rgb(187,247,208)] px-3 py-2 rounded-lg">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              {/* Service Type */}
              <div>
                <label className="block text-muted mb-1">
                  Service Type <span className="text-accent-500">*</span>
                </label>
                <select
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-500 text-text"
                >
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted mt-1">{selectedService.tag}</p>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted mb-1">
                    Event Date <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-500 text-text"
                    required
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1">
                    Event Time <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-500 text-text"
                    required
                  />
                </div>
              </div>

              {/* Venue & City */}
              <div>
                <label className="block text-muted mb-1">
                  Venue / Location <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  placeholder="Hotel, lawn, farmhouse, home…"
                  className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-500 text-text"
                  required
                />
              </div>

              <div>
                <label className="block text-muted mb-1">
                  City <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Jaipur, Delhi, Udaipur…"
                  className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-500 text-text"
                  required
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted mb-1">
                    Preferred Contact Method <span className="text-accent-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, contactMethod: "whatsapp", contactValue: "" }))
                      }
                      className={`flex-1 py-2 rounded-lg border text-xs flex items-center justify-center gap-2 ${
                        form.contactMethod === "whatsapp"
                          ? "border-green-500 bg-green-500/10 text-green-300"
                          : "border-border bg-panel/70 text-muted"
                      }`}
                      aria-pressed={form.contactMethod === "whatsapp"}
                    >
                      <FiPhone className="text-sm" /> WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, contactMethod: "email", contactValue: user?.email || "" }))
                      }
                      className={`flex-1 py-2 rounded-lg border text-xs flex items-center justify-center gap-2 ${
                        form.contactMethod === "email"
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-border bg-panel/70 text-muted"
                      }`}
                      aria-pressed={form.contactMethod === "email"}
                    >
                      <FiMail className="text-sm" /> Email
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-muted mb-1">
                    {form.contactMethod === "whatsapp" ? "WhatsApp Number" : "Email Address"}
                    <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type={form.contactMethod === "email" ? "email" : "text"}
                    name="contactValue"
                    value={form.contactValue}
                    onChange={handleChange}
                    placeholder={form.contactMethod === "whatsapp" ? "e.g. +91 98765 43210" : "example@email.com"}
                    className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-500 text-text"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-muted mb-1">Additional Notes (optional)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Functions (Haldi, Sangeet, Wedding), special entries, preferred style etc."
                  className="w-full bg-panel/80 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-accent-500 text-text resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-full bg-accent-600 hover:bg-accent-500 text-sm font-semibold text-white shadow-token disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? "Submitting..." : "Submit Booking Request"}
              </button>

              {!user && <p className="text-xs text-muted text-center mt-2">You’ll be asked to login before completing your booking.</p>}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
