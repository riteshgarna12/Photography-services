import React from "react";
import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1523359346063-d879354c0ea5",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  ];

  return (
    <div className="min-h-screen w-full bg-bg text-text py-16 px-4 md:px-10">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl md:text-6xl font-bold mb-12 tracking-wide"
      >
        <span className="text-accent-500">Cinematic</span> Gallery
      </motion.h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-xl overflow-hidden group shadow-lg shadow-token bg-panel"
          >
            {/* Image */}
            <img
              src={img}
              alt={`gallery-${index}`}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--panel)/0.25)] to-[rgb(var(--panel)/0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-xl font-semibold text-text">Captured Moment</h3>
              <p className="text-sm text-muted">PhotoPro Studio</p>
            </div>

            {/* Accent border glow (theme-aware) */}
            <div
              className="absolute inset-0 rounded-xl transition-all duration-500"
              style={{
                boxShadow:
                  "var(--shadow)",
                border: "1px solid rgba(0,0,0,0)",
              }}
            >
              {/* subtle accent border on hover via utility classes */}
              <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent group-hover:border-accent-500/40 transition-colors duration-500" />
              <div className="pointer-events-none absolute inset-0 rounded-xl group-hover:shadow-[0_0_28px_6px_rgba(219,39,119,0.18)] transition-shadow duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
