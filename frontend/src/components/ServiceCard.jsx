import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ pkg }) {
  const navigate = useNavigate();

  return (
    <div className="bg-panel border border-border rounded-lg shadow-token p-4 flex flex-col transition hover:shadow-lg">
      {/* Image */}
      <img
        src={pkg.coverImage || 'https://via.placeholder.com/600x400?text=Service'}
        alt={pkg.title}
        className="rounded mb-4 object-cover h-40 w-full"
      />

      {/* Title */}
      <h3 className="text-xl font-semibold text-text">{pkg.title}</h3>

      {/* Description */}
      <p className="text-sm text-muted mt-1">
        {pkg.shortDescription}
      </p>

      {/* Perks */}
      <div className="mt-3 flex-1">
        <ul className="text-sm text-text space-y-1">
          {pkg.perks?.slice(0, 3).map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-bold text-text">₹{pkg.price}</div>

        <div className="flex gap-2">
          {/* View button */}
          <button
            onClick={() => navigate(`/services/${pkg.slug}`)}
            className="px-3 py-1 rounded bg-panel border border-border hover:bg-panel/80 transition text-text"
          >
            View
          </button>

          {/* Book button */}
          <button
            onClick={() =>
              navigate('/book-service', { state: { serviceType: pkg.title } })
            }
            className="px-3 py-1 bg-accent-600 hover:bg-accent-500 text-white rounded transition"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
