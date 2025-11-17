import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCamera, FiCalendar, FiCheckCircle, FiShield, FiUsers } from "react-icons/fi";

export default function About() {
  return (
    <div className="bg-black text-white">

      {/* HERO SECTION */}
      <div className="relative h-[60vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-center z-10"
        >
          Why Choose <span className="text-pink-500">PhotoPro?</span>
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* FEATURES SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20"
        >
          {[
            {
              title: "Professional Team",
              desc: "Certified photographers, cinematographers & editors delivering top-quality results.",
              icon: <FiUsers className="text-4xl text-pink-500" />,
            },
            {
              title: "Easy Online Booking",
              desc: "Book services in just a few clicks — wedding, cinematic, drone, events & more.",
              icon: <FiCalendar className="text-4xl text-pink-500" />,
            },
            {
              title: "High-Quality Output",
              desc: "We use premium gear and creative direction to capture unforgettable moments.",
              icon: <FiCamera className="text-4xl text-pink-500" />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl shadow-lg text-center"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* BENEFITS SECTION */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Platform Benefits</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              "Secure booking & data protection",
              "Verified team members for every assignment",
              "Affordable transparent pricing",
              "Support for Weddings, Pre-Weddings, Drone Shoots & Commercial work",
              "Instant booking confirmation",
              "Track your bookings in user dashboard",
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <FiCheckCircle className="text-green-500 text-2xl" />
                <p className="text-lg text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Choose a Service",
                desc: "Select Wedding, Cinematic, Drone, Events or any photo/video service.",
              },
              {
                step: "2",
                title: "Book a Date",
                desc: "Pick your event date, time, venue & special instructions.",
              },
              {
                step: "3",
                title: "We Capture Your Story",
                desc: "Our professional team covers the event and delivers high-quality output.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 rounded-xl shadow-lg text-center"
              >
                <h3 className="text-pink-500 text-5xl font-extrabold mb-3">{s.step}</h3>
                <h4 className="text-2xl font-bold mb-2">{s.title}</h4>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold mb-4">Ready to Capture Your Moments?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Book a shoot with our expert team and make your special day unforgettable.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/book-service"
              className="px-6 py-3 bg-pink-600 rounded-lg hover:bg-pink-700 transition font-bold"
            >
              Book a Shoot
            </Link>

            <Link
              to="/gallery"
              className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition font-bold"
            >
              View Gallery
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
