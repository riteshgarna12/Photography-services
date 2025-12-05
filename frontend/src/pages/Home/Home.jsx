// src/pages/Home.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Gallery from "../../components/Gallery";
import { AuthContext } from "../../context/AuthContext";
import { FiCalendar, FiCamera, FiFilm } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const firstName = user?.name?.split(" ")[0] || "";

  // Reusable variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-bg text-text min-h-screen">
      {/* =============== LOGGED-IN GREETING STRIP =============== */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-accent-600 via-accent-500 to-accent-400 text-sm"
        >
          <div className="container mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-medium">
              Welcome back, <span className="font-bold">{firstName}</span> ✨
              &nbsp; Ready to capture your next story?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/book-service")}
                className="px-4 py-1.5 text-xs rounded-full bg-[rgba(0,0,0,0.12)] hover:bg-[rgba(0,0,0,0.18)] transition"
              >
                Book a new slot
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-1.5 text-xs rounded-full bg-panel text-text hover:bg-[rgb(var(--panel)/0.95)] transition"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* =============== HERO SECTION =============== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden"
      >
        {/* Background gradient & overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-panel via-panel/80 to-panel z-0" />
        <img
          src="https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&w=1600&q=80"
          alt="Camera on desk"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-[-1]"
        />

        <div className="container mx-auto px-6 py-20 md:py-28 relative z-10 grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <p className="uppercase tracking-[0.3em] text-accent-400 text-xs mb-4">
              Premium Photography • Cinematic Films • Drone
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Capturing Moments,
              <span className="block text-accent-500">Crafting Stories.</span>
            </h1>

            <p className="text-muted mt-5 max-w-xl text-sm sm:text-base">
              From grand wedding days to intimate pre-wedding shoots, our team
              of photographers, cinematographers, and drone experts frames every
              second with emotion and style.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => navigate("/book-service")}
                className="px-6 py-3 rounded-full bg-accent-600 hover:bg-accent-500 text-sm font-semibold text-white shadow-token transition"
              >
                Book a Shoot
              </button>

              <Link
                to="/gallery"
                className="px-6 py-3 rounded-full border border-border hover:border-accent-500 text-sm font-semibold text-muted hover:text-text transition"
              >
                View Gallery
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 text-xs sm:text-sm text-muted">
              <div>
                <p className="text-text font-semibold text-lg">300+ </p>
                <p>Weddings & Events</p>
              </div>
              <div>
                <p className="text-text font-semibold text-lg">4.9★</p>
                <p>Client Rating</p>
              </div>
              <div>
                <p className="text-text font-semibold text-lg">7+</p>
                <p>Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right side cards */}
          <div className="space-y-5">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-panel/80 border border-border rounded-2xl p-5 shadow-token backdrop-blur"
            >
              <p className="text-xs text-accent-400 mb-1 font-semibold">
                Featured Service
              </p>
              <h3 className="text-xl font-semibold mb-1">Wedding Cinematics</h3>
              <p className="text-muted text-sm mb-3">
                Story-driven films, vows, slow-motion, and drone entries—
                everything cut into a cinematic highlight.
              </p>
              <Link
                to="/packages"
                className="text-accent-400 text-sm hover:text-accent-300"
              >
                View Wedding Packages →
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-panel/80 border border-border rounded-2xl p-4 text-sm"
              >
                <h4 className="font-semibold mb-1">Drone & Aerial</h4>
                <p className="text-muted text-xs">
                  Certified drone pilots capturing venue, baraat, and couple
                  entries from the sky.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-panel/80 border border-border rounded-2xl p-4 text-sm"
              >
                <h4 className="font-semibold mb-1">Pre-Wedding Concepts</h4>
                <p className="text-muted text-xs">
                  Location planning, outfits, and posing guidance for stylish
                  couple shoots.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =============== SERVICES STRIP =============== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="border-y border-border bg-gradient-to-r from-panel/60 via-panel to-panel/60"
      >
        <div className="container mx-auto px-6 py-8 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Specialised in
            </p>
            <p className="mt-2 font-semibold">Wedding & Pre-Wedding</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Video Styles
            </p>
            <p className="mt-2 text-muted">
              Cinematic • Documentary • Instagram Reels
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Tech & Gear
            </p>
            <p className="mt-2 text-muted">
              4K Mirrorless • Gimbals • Drones • Prime Lenses
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Locations
            </p>
            <p className="mt-2 text-muted">Destination, Outdoor, Studio</p>
          </div>
        </div>
      </motion.section>

      {/* =============== HOW IT WORKS (3 STEPS) =============== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="bg-panel py-16"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-3">How it works</h2>
          <p className="text-muted text-center max-w-2xl mx-auto mb-10 text-sm">
            Simple, transparent, and stress-free from enquiry to final delivery.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-600/20 border border-accent-500 mb-3">
                <FiCalendar className="text-accent-400 text-xl" />
              </div>
              <p className="uppercase text-xs tracking-widest text-muted mb-1">
                Step 1
              </p>
              <h3 className="font-semibold mb-2">Share your date & vision</h3>
              <p className="text-muted text-sm">
                Tell us about your event, city, and style. We suggest the best
                package with pricing and team size.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-600/20 border border-accent-500 mb-3">
                <FiCamera className="text-accent-400 text-xl" />
              </div>
              <p className="uppercase text-xs tracking-widest text-muted mb-1">
                Step 2
              </p>
              <h3 className="font-semibold mb-2">Shoot day & coverage</h3>
              <p className="text-muted text-sm">
                Our team covers your functions with candid photos, cinematic
                video and aerial shots where required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-600/20 border border-accent-500 mb-3">
                <FiFilm className="text-accent-400 text-xl" />
              </div>
              <p className="uppercase text-xs tracking-widest text-muted mb-1">
                Step 3
              </p>
              <h3 className="font-semibold mb-2">Editing & delivery</h3>
              <p className="text-muted text-sm">
                Receive curated albums, cinematic films and reels via online
                gallery & drive links within 15–30 days.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =============== GALLERY PREVIEW =============== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-14"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recent Wedding Stories</h2>
          <Link to="/gallery" className="text-sm text-accent-400 hover:text-accent-300">
            View full gallery →
          </Link>
        </div>
        <Gallery />
      </motion.section>

      {/* =============== WHY CHOOSE US =============== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="bg-panel border-t border-border"
      >
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why clients love PhotoPro</h2>
            <p className="text-muted text-sm mb-6">
              Our process is designed for stress-free shooting. From planning to
              final delivery, our team handles everything so you can enjoy your
              day.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-accent-600 text-xs text-white">
                  1
                </span>
                <div>
                  <p className="font-semibold">Consultation & Planning</p>
                  <p className="text-muted">
                    Understand your vibe, budget and must-have moments. We
                    recommend packages accordingly.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-accent-600 text-xs text-white">
                  2
                </span>
                <div>
                  <p className="font-semibold">On-site Creative Team</p>
                  <p className="text-muted">
                    Dedicated photographers, cinematographers, and drone pilots
                    covering all angles.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-accent-600 text-xs text-white">
                  3
                </span>
                <div>
                  <p className="font-semibold">Premium Editing & Delivery</p>
                  <p className="text-muted">
                    Color-graded photos, cinematic films, reels & cloud storage
                    links for easy sharing.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* mini cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-5 bg-panel/80 border border-border rounded-2xl"
            >
              <p className="text-xs text-muted mb-1">Turnaround</p>
              <p className="font-semibold text-lg mb-1">15–30 Days</p>
              <p className="text-muted text-xs">Fast delivery with cloud albums & backup.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="p-5 bg-panel/80 border border-border rounded-2xl"
            >
              <p className="text-xs text-muted mb-1">Support</p>
              <p className="font-semibold text-lg mb-1">Dedicated Manager</p>
              <p className="text-muted text-xs">Single point of contact from booking to delivery.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="p-5 bg-panel/80 border border-border rounded-2xl"
            >
              <p className="text-xs text-muted mb-1">Customization</p>
              <p className="font-semibold text-lg mb-1">Flexible Packages</p>
              <p className="text-muted text-xs">Choose only what you need—photo, video, drone, reels, etc.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="p-5 bg-panel/80 border border-border rounded-2xl"
            >
              <p className="text-xs text-muted mb-1">Coverage</p>
              <p className="font-semibold text-lg mb-1">Wedding • Pre-Wedding • Events</p>
              <p className="text-muted text-xs">Birthdays, sangeet, haldi, corporate, and more.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* =============== FINAL CTA =============== */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="bg-panel py-14 border-t border-border"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to lock your dates?</h2>
          <p className="text-muted max-w-xl mx-auto mb-6 text-sm">
            Share your event details and we’ll suggest the best combination of
            photography, cinematography and drone coverage for your budget.
          </p>
          <button
            onClick={() => navigate("/book-service")}
            className="px-8 py-3 rounded-full bg-accent-600 hover:bg-accent-500 text-white font-semibold shadow-token transition"
          >
            Book a Slot Now
          </button>
        </div>
      </motion.section>
    </div>
  );
}
