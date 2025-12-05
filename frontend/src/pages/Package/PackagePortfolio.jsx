import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * PackagePortfolio
 * Route: /packages/:slug/portfolio
 *
 * Uses local static images list per package (GALLERY_MAP).
 */

const GALLERY_MAP = {
  "wedding-photography": [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505238680356-667803448bb6?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&q=80&auto=format&fit=crop",
  ],
  "pre-wedding-shoot": [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop",
  ],
  "cinematic-video-shoot": [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511764155669-2b1e0a0a5c6b?w=1400&q=80&auto=format&fit=crop",
  ],
  "modeling-portfolio-shoot": [
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531123414780-f3d0a0319df2?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975910581-8e92d8e1a275?w=1400&q=80&auto=format&fit=crop",
  ],
  "drone-shoot": [
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1400&q=80&auto=format&fit=crop",
  ],
  "birthday-event-shoot": [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80&auto=format&fit=crop",
  ],
};

function useKeyboardNavigation({ open, onClose, onPrev, onNext }) {
  const handler = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [open, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}

export default function PackagePortfolio() {
  const { slug } = useParams();
  const navigateSlug = slug || "wedding-photography";
  const key = slugToKey(navigateSlug);
  const images = GALLERY_MAP[key] || GALLERY_MAP["wedding-photography"];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // keyboard support
  useKeyboardNavigation({
    open,
    onClose: () => setOpen(false),
    onPrev: () => setIndex((i) => (i - 1 + images.length) % images.length),
    onNext: () => setIndex((i) => (i + 1) % images.length),
  });

  // prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  // responsive column count (keeps same behavior you had)
  const getColumnCount = () =>
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 640
        ? 2
        : 1
      : 1;

  return (
    <div className="bg-bg text-text min-h-screen pb-20">
      {/* Header */}
      <div
        className="relative h-56 md:h-72 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-panel/70" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text">
            {friendlyTitle(slug)} Portfolio
          </h1>
          <p className="text-muted mt-2">
            A curated selection of our best work for this package.
          </p>
          <div className="mt-4">
            <Link
              to="/packages"
              className="inline-block px-4 py-2 bg-panel border border-border rounded text-sm text-text hover:bg-panel/90 transition"
            >
              ← Back to Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text">Gallery</h2>
          <p className="text-sm text-muted">
            {images.length} photos — click to enlarge
          </p>
        </div>

        <div
          className="masonry-3-cols gap-4"
          style={{
            columnCount: getColumnCount(),
            columnGap: "1rem",
          }}
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="mb-4 break-inside avoid"
            >
              <img
                src={`${src}`}
                alt={`${slug} ${i}`}
                className="w-full h-auto rounded-lg object-cover cursor-pointer hover:brightness-90 transition"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-panel/90 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="relative z-10 max-w-5xl mx-auto w-full px-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted">
                {index + 1} / {images.length}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setIndex((i) => (i - 1 + images.length) % images.length)
                  }
                  className="px-3 py-2 bg-panel border border-border rounded hover:bg-panel/95 transition text-text"
                  aria-label="Previous image"
                >
                  Prev
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 bg-red-600 rounded hover:bg-red-500 text-white transition"
                  aria-label="Close gallery"
                >
                  Close
                </button>

                <button
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  className="px-3 py-2 bg-panel border border-border rounded hover:bg-panel/95 transition text-text"
                  aria-label="Next image"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="bg-panel rounded-lg overflow-hidden shadow-token">
              <img
                src={`${images[index]}`}
                alt={`large-${index}`}
                className="w-full h-[70vh] object-contain bg-panel"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* helpers */
function slugToKey(slug) {
  if (!slug) return "wedding-photography";
  const s = slug.toLowerCase();
  if (s.includes("wedding")) return "wedding-photography";
  if (s.includes("pre")) return "pre-wedding-shoot";
  if (s.includes("cinematic")) return "cinematic-video-shoot";
  if (s.includes("model")) return "modeling-portfolio-shoot";
  if (s.includes("drone")) return "drone-shoot";
  if (s.includes("birthday") || s.includes("event")) return "birthday-event-shoot";
  return "wedding-photography";
}

function friendlyTitle(slug) {
  if (!slug) return "Wedding";
  return slug
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}
