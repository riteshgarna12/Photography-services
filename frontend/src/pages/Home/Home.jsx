import React from "react";
import { motion } from "framer-motion";
import Gallery from "../../components/Gallery";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative text-center space-y-6 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold tracking-wide drop-shadow-xl"
          >
            Capturing Moments, Crafting Stories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Professional Wedding, Cinematic, Drone & Photography Services
            tailored for your special moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="flex justify-center gap-4"
          >
            <Link
              to="/book-service"
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-lg shadow-lg"
            >
              Book a Shoot
            </Link>

            <Link
              to="/gallery"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-lg border border-gray-600"
            >
              Explore Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-semibold mb-10 text-center">
          Our Premium Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Wedding Photography",
              img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
              link: "/services/wedding",
            },
            {
              title: "Cinematic Videography",
              img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
              link: "/services/cinematic",
            },
            {
              title: "Drone Shoot",
              img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
              link: "/services/drone",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group cursor-pointer relative rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={service.img}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition"></div>

              <Link
                to={service.link}
                className="absolute bottom-6 left-6 text-2xl font-bold group-hover:text-pink-400 transition"
              >
                {service.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED GALLERY SECTION */}
      <section className="py-16 px-6 bg-gray-900">
        <h2 className="text-4xl font-semibold mb-10 text-center">
          Featured Work
        </h2>

        <Gallery />
      </section>

      {/* CTA SECTION */}
      <section className="py-20 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Capture Your Best Moments?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/book-service"
            className="px-10 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xl shadow-lg"
          >
            Book Your Shoot Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
