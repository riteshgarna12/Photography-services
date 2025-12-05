import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import ServiceCard from "../../components/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const q = category ? `?category=${encodeURIComponent(category)}` : "";
      const res = await api.get(`/services${q}`);
      setServices(res.data || []);
    } catch (err) {
      console.error("Failed to load services", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: "", label: "All" },
    { key: "wedding", label: "Wedding" },
    { key: "cinematic", label: "Cinematic" },
    { key: "drone", label: "Drone" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text py-12 px-4">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text">Services</h1>

          <div className="flex gap-2 items-center">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition
                  ${
                    category === c.key
                      ? "bg-accent-600 text-white shadow-token"
                      : "bg-panel/80 text-muted hover:bg-panel/90"
                  }`}
                aria-pressed={category === c.key}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted">Loading services…</div>
          </div>
        ) : services.length === 0 ? (
          <div className="py-20 text-center text-muted">
            No services found for <span className="font-semibold text-text">{category || "All"}</span>.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s._id} pkg={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
