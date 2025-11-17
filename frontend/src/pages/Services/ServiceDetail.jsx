import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function ServiceDetail(){
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await api.get(`/services/${slug}`);
        setPkg(res.data);
      } catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if(loading) return <p className="p-6">Loading...</p>;
  if(!pkg) return <p className="p-6">Package not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <img src={pkg.coverImage || 'https://via.placeholder.com/1200x600'} alt={pkg.title} className="rounded mb-4 w-full object-cover h-64" />
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <p className="text-gray-600 mt-2">{pkg.shortDescription}</p>
        </div>
        <div className="text-2xl font-bold">₹{pkg.price}</div>
      </div>

      <div className="mt-6 text-gray-700">
        <h3 className="text-xl font-semibold mb-2">What's included</h3>
        <ul className="list-disc pl-6 space-y-1">
          {pkg.perks?.map((p,i) => <li key={i}>{p}</li>)}
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Details</h3>
        <p>{pkg.description}</p>

        <div className="mt-6 flex gap-3">
          <button onClick={() => navigate('/book-service', { state: { serviceType: pkg.title }})} className="px-4 py-2 bg-blue-600 text-white rounded">Book Now</button>
          <button onClick={() => navigate('/services')} className="px-4 py-2 bg-gray-200 rounded">Back to services</button>
        </div>
      </div>
    </div>
  );
}
