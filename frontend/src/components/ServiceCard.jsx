import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ pkg }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img src={pkg.coverImage || 'https://via.placeholder.com/600x400?text=Service'} alt={pkg.title} className="rounded mb-4 object-cover h-40 w-full"/>
      <h3 className="text-xl font-semibold">{pkg.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{pkg.shortDescription}</p>
      <div className="mt-3 flex-1">
        <ul className="text-sm text-gray-700 space-y-1">
          {pkg.perks?.slice(0,3).map((p,i)=> <li key={i}>• {p}</li>)}
        </ul>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-bold">₹{pkg.price}</div>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/services/${pkg.slug}`)} className="px-3 py-1 bg-gray-200 rounded">View</button>
          <button onClick={() => navigate('/book-service', { state: { serviceType: pkg.title }})} className="px-3 py-1 bg-blue-600 text-white rounded">Book</button>
        </div>
      </div>
    </div>
  );
}
