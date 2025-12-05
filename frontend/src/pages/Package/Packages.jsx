import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Packages() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // BOOK NOW HANDLER
  const handleBookNow = () => {
    if (!user) {
      navigate("/login", { state: { redirectTo: "/book-service" } });
      return;
    }
    navigate("/book-service");
  };

  // PACKAGE DATA
  const packages = [
    {
      title: "Wedding Photography",
      price: "₹25,000 - ₹1,20,000",
      slug: "wedding-photography",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      desc: "Full wedding coverage with candid, traditional, and cinematic photography.",
    },
    {
      title: "Pre-Wedding Shoot",
      price: "₹10,000 - ₹40,000",
      slug: "pre-wedding-shoot",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      desc: "Romantic themed pre-wedding shoot with creative poses and locations.",
    },
    {
      title: "Cinematic Video Shoot",
      price: "₹15,000 - ₹80,000",
      slug: "cinematic-video-shoot",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      desc: "Slow-motion cinematic highlights, storytelling videos, and premium editing.",
    },
    {
      title: "Modeling Portfolio Shoot",
      price: "₹8,000 - ₹30,000",
      slug: "modeling-portfolio-shoot",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
      desc: "Studio + outdoor fashion shoots designed for aspiring models.",
    },
    {
      title: "Drone Shoot",
      price: "₹6,000 - ₹25,000",
      slug: "drone-shoot",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      desc: "Aerial drone photography and cinematic aerial video coverage.",
    },
    {
      title: "Birthday / Event Shoot",
      price: "₹5,000 - ₹25,000",
      slug: "birthday-event-shoot",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      desc: "Candid + traditional photo/video coverage for events and parties.",
    },
  ];

  return (
    <div className="bg-bg text-text min-h-screen py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-text">
        Our Photography Packages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-panel rounded-xl overflow-hidden transition transform hover:scale-[1.01] shadow-token border border-border"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
            />

            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-2 text-text">{pkg.title}</h3>
              <p className="text-accent-500 font-bold mb-2">{pkg.price}</p>

              <p className="text-muted text-sm mb-4">{pkg.desc}</p>

              {/* View Portfolio Button */}
              <button
                onClick={() => navigate(`/packages/${pkg.slug}/portfolio`)}
                className="w-full mb-3 border border-border py-2 rounded-lg text-text bg-panel hover:bg-panel/95 transition"
                aria-label={`View portfolio for ${pkg.title}`}
              >
                View Portfolio
              </button>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="w-full bg-accent-600 py-2 rounded-lg text-white font-medium hover:bg-accent-500 transition"
                aria-label={`Book ${pkg.title}`}
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
