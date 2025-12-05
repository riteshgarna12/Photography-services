import React, { useState } from "react";
import SliderGallery from "../components/SliderGallery";
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
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
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
    <div className="bg-bg text-text min-h-screen py-16 px-6">
      <h1 className="text-center text-4xl md:text-5xl font-bold mb-6">
        Meet Our Creative Team
      </h1>

      <p className="text-center max-w-3xl mx-auto text-muted mb-14 text-lg">
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
            className="bg-panel rounded-xl border border-border shadow-token overflow-hidden hover:scale-[1.03] transition-transform cursor-pointer"
            onClick={() => setSelected(member)}
            role="button"
            aria-label={`Open profile for ${member.name}`}
          >
            <img
              src={member.image}
              alt={`${member.name} portrait`}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-text">{member.name}</h3>
              <p className="text-accent-400 font-medium">{member.role}</p>
              <p className="text-muted text-sm mt-1">{member.experience}</p>
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center p-4 z-[100]"
            onClick={() => setSelected(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-panel w-full max-w-3xl rounded-2xl p-6 border border-border shadow-token overflow-y-auto max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center gap-6">
                <img
                  src={selected.image}
                  alt={`${selected.name} portrait`}
                  className="w-28 h-28 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-text">{selected.name}</h2>
                  <p className="text-accent-400">{selected.role}</p>
                  <p className="text-muted">{selected.experience}</p>
                </div>
              </div>

              <p className="text-muted mt-4">{selected.desc}</p>

              {/* Skills */}
              <h3 className="text-xl font-semibold mt-6 text-text">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {selected.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-accent-600/20 text-accent-500 rounded-full border border-accent-600/40 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <h3 className="text-xl font-semibold mt-6 text-text">Achievements</h3>
              <ul className="list-disc ml-6 text-muted mt-2">
                {selected.achievements.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>

              {/* HORIZONTAL SLIDER GALLERY */}
              <div className="mt-6">
                <SliderGallery images={selected.photos} />
              </div>

              {/* Sample Photos */}
              <h3 className="text-xl font-semibold mt-6 text-text">Glimpses</h3>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {selected.photos.map((p, idx) => (
                  <img
                    key={idx}
                    src={p}
                    alt={`photo-${idx}`}
                    className="rounded-lg object-cover h-32 w-full"
                  />
                ))}
              </div>

              {/* Video Clips */}
              <h3 className="text-xl font-semibold mt-6 text-text">Cinematic Clips</h3>
              {selected.videos.map((v, idx) => (
                <video
                  key={idx}
                  src={v}
                  controls
                  className="w-full rounded-lg mt-3 bg-black"
                />
              ))}

              <button
                onClick={() => setSelected(null)}
                className="w-full mt-6 py-2 bg-accent-600 rounded-lg hover:bg-accent-500 text-white transition"
                aria-label="Close profile modal"
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
