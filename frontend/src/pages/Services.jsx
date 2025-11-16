import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchServices();
  }, [category]);

  const fetchServices = async () => {
    setLoading(true);
    const q = category ? `?category=${category}` : '';
    const res = await api.get(`/services${q}`);
    setServices(res.data);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <div className="flex gap-2">
          <button onClick={() => setCategory('')} className={`px-3 py-1 rounded ${category==='' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>All</button>
          <button onClick={() => setCategory('wedding')} className={`px-3 py-1 rounded ${category==='wedding' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Wedding</button>
          <button onClick={() => setCategory('cinematic')} className={`px-3 py-1 rounded ${category==='cinematic' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Cinematic</button>
          <button onClick={() => setCategory('drone')} className={`px-3 py-1 rounded ${category==='drone' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Drone</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(s => <ServiceCard key={s._id} pkg={s} />)}
        </div>
      )}
    </div>
  );
}
