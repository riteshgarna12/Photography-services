import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get(`/services/${slug}`);
        if (!mounted) return;
        setPkg(res.data);
      } catch (e) {
        console.error(e);
        if (mounted) setErr("Failed to load package.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6 bg-bg text-text">
        <p className="text-muted">Loading...</p>
      </div>
    );

  if (err)
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6 bg-bg text-text">
        <p className="text-[rgb(255,200,200)]">{err}</p>
      </div>
    );

  if (!pkg)
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6 bg-bg text-text">
        <p className="text-muted">Package not found</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-panel border border-border rounded-2xl shadow-token">
      <div className="overflow-hidden rounded-lg">
        <img
          src={pkg.coverImage || "https://via.placeholder.com/1200x600?text=Service"}
          alt={pkg.title}
          className="w-full object-cover h-64"
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mt-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-text">{pkg.title}</h1>
          <p className="text-muted mt-2">{pkg.shortDescription}</p>
        </div>

        <div className="text-2xl font-bold text-text md:shrink-0">
          ₹{pkg.price}
        </div>
      </div>

      <div className="mt-6 text-text">
        <h3 className="text-xl font-semibold mb-2 text-text">What's included</h3>
        <ul className="list-disc pl-6 space-y-1 text-muted">
          {pkg.perks && pkg.perks.length > 0 ? (
            pkg.perks.map((p, i) => (
              <li key={i} className="text-muted">
                {p}
              </li>
            ))
          ) : (
            <li className="text-muted">No perks listed for this package.</li>
          )}
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-text">Details</h3>
        <p className="text-muted">{pkg.description}</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/book-service", { state: { serviceType: pkg.title } })}
            className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg shadow-token transition"
            aria-label={`Book ${pkg.title}`}
          >
            Book Now
          </button>

          <button
            onClick={() => navigate("/services")}
            className="px-4 py-2 bg-panel/80 border border-border text-text rounded-lg hover:bg-panel/95 transition"
          >
            Back to services
          </button>
        </div>
      </div>
    </div>
  );
}
