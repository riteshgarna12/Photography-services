import SliderGallery from "../components/SliderGallery";
import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function Team() {
  const [selected, setSelected] = useState(null);

  const team = [
    {
      name: "Aarav Sharma",
      role: "Candid Photographer",
      experience: "6+ Years Experience",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format",
      desc: "Expert in capturing natural emotions, candid reactions, and storytelling frames.",
      skills: ["Candid Shots", "Storytelling", "Portraits", "Natural Light"],
      achievements: [
        "Shot 300+ Weddings",
        "Featured in 5 Wedding Magazines",
        "Awarded Best Candid Photographer - 2023",
      ],
      photos: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        "https://images.unsplash.com/photo-1500038934340-7ccbbf47f26f",
        "https://images.unsplash.com/photo-1523359346063-d879354c0ea5",
      ],
      videos: [
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      ],
    },

    {
      name: "Rohan Verma",
      role: "Drone Expert",
      experience: "4+ Years Experience",
      image:
        "https://images.unsplash.com/photo-1500038934340-7ccbbf47f26f?auto=format",
      desc: "Professional drone operator capturing cinematic aerial shots and FPV sequences.",
      skills: ["FPV Drone", "Aerial Mapping", "4K Footage", "Cinematic Shots"],
      achievements: [
        "Covered 200+ Outdoor Shoots",
        "FPV Specialist Jury - 2022",
        "Drone Cinematic Award Winner - 2024",
      ],
      photos: [
        "https://images.unsplash.com/photo-1484704849700-f032a568e944",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      ],
      videos: [
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      ],
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16 px-6">
      <h1 className="text-center text-4xl md:text-5xl font-bold mb-12">
        Meet Our Creative Team
      </h1>

      <p className="text-center max-w-3xl mx-auto text-gray-300 mb-14 text-lg">
        Our passionate specialists bring creativity and cinematic perfection to
        every project.
      </p>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden hover:scale-[1.03] transition cursor-pointer"
            onClick={() => setSelected(member)}
          >
            <img src={member.image} className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <p className="text-pink-400 font-medium">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.experience}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 z-[100]"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 w-full max-w-3xl rounded-2xl p-8 border border-gray-700 shadow-xl overflow-y-auto max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center gap-6">
                <img
                  src={selected.image}
                  className="w-32 h-32 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-3xl font-bold">{selected.name}</h2>
                  <p className="text-pink-400">{selected.role}</p>
                  <p className="text-gray-400">{selected.experience}</p>
                </div>
              </div>

              <p className="text-gray-300 mt-4">{selected.desc}</p>

              {/* Skills */}
              <h3 className="text-xl font-semibold mt-6">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {selected.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-pink-600/20 text-pink-400 rounded-full border border-pink-600/40"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <h3 className="text-xl font-semibold mt-6">Achievements</h3>
              <ul className="list-disc ml-6 text-gray-300 mt-2">
                {selected.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>

              {/* HORIZONTAL SLIDER GALLERY */}
                <SliderGallery images={selected.photos} />

              {/* Sample Photos */}
              <h3 className="text-xl font-semibold mt-6">Glimpses</h3>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {selected.photos.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    className="rounded-lg object-cover h-32 w-full"
                  />
                ))}
              </div>

              {/* Video Clips */}
              <h3 className="text-xl font-semibold mt-6">Cinematic Clips</h3>
              {selected.videos.map((v, i) => (
                <video
                  key={i}
                  src={v}
                  controls
                  className="w-full rounded-lg mt-3"
                ></video>
              ))}

              <button
                onClick={() => setSelected(null)}
                className="w-full mt-6 py-2 bg-pink-600 rounded-lg hover:bg-pink-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
