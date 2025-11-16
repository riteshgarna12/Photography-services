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
    <div className="min-h-screen w-full bg-black text-white py-16 px-4 md:px-10">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl md:text-6xl font-bold mb-12 tracking-wide"
      >
        <span className="text-pink-500">Cinematic</span> Gallery
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
            className="relative rounded-xl overflow-hidden group shadow-lg shadow-black/70 bg-[#0d0d0d]"
          >
            {/* Image */}
            <img
              src={img}
              alt="gallery"
              className="w-full h-72 object-cover group-hover:scale-110 transition-all duration-700 rounded-xl"
            />

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            {/* HOVER TEXT */}
            <div className="absolute bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-xl font-semibold">Captured Moment</h3>
              <p className="text-gray-400 text-sm">PhotoPro Studio</p>
            </div>

            {/* NEON BORDER GLOW */}
            <div className="absolute inset-0 border border-pink-500/0 group-hover:border-pink-500/40 group-hover:shadow-[0_0_25px_5px_rgba(255,20,147,0.4)] transition-all duration-500 rounded-xl"></div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
