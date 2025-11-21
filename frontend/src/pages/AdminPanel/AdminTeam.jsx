import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

export default function AdminTeam() {
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    specialization: "",
    bio: "",
    experienceYears: "",
    imageUrl: "",
    skills: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      loadTeam();
    }
  }, [user]);

  const loadTeam = async () => {
    const res = await api.get("/team/admin");
    setTeam(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      experienceYears: form.experienceYears
        ? Number(form.experienceYears)
        : undefined,
      skills: form.skills
        ? form.skills.split(",").map((s) => s.trim())
        : [],
    };

    if (editingId) {
      await api.put(`/team/${editingId}`, payload);
    } else {
      await api.post("/team", payload);
    }

    setForm({
      name: "",
      role: "",
      specialization: "",
      bio: "",
      experienceYears: "",
      imageUrl: "",
      skills: "",
    });
    setEditingId(null);
    loadTeam();
  };

  const startEdit = (member) => {
    setEditingId(member._id);
    setForm({
      name: member.name,
      role: member.role,
      specialization: member.specialization || "",
      bio: member.bio || "",
      experienceYears: member.experienceYears || "",
      imageUrl: member.imageUrl || "",
      skills: (member.skills || []).join(", "),
    });
  };

  const toggleActive = async (id) => {
    await api.patch(`/team/${id}/toggle`);
    loadTeam();
  };

  if (!user || user.role !== "admin") {
    return (
      <p className="text-center text-red-500 mt-10">
        Access Denied (Admin only)
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Manage Team Members</h2>

      {/* FORM */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Member" : "Add New Member"}
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="role"
            placeholder="Role (Candid Photographer, Drone Expert...)"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
            value={form.role}
            onChange={handleChange}
            required
          />
          <input
            name="specialization"
            placeholder="Specialization"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
            value={form.specialization}
            onChange={handleChange}
          />
          <input
            name="experienceYears"
            type="number"
            placeholder="Experience (years)"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
            value={form.experienceYears}
            onChange={handleChange}
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 md:col-span-2"
            value={form.imageUrl}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            placeholder="Bio"
            rows={3}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 md:col-span-2"
            value={form.bio}
            onChange={handleChange}
          />
          <input
            name="skills"
            placeholder="Skills (comma separated)"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 md:col-span-2"
            value={form.skills}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="mt-2 bg-pink-600 px-4 py-2 rounded hover:bg-pink-700 md:col-span-2"
          >
            {editingId ? "Save Changes" : "Add Member"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m._id} className="border-b border-gray-800">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.role}</td>
                <td className="p-3">
                  {m.experienceYears ? `${m.experienceYears} yrs` : "-"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      m.active ? "bg-green-700" : "bg-red-700"
                    }`}
                  >
                    {m.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => startEdit(m)}
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(m._id)}
                    className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-700"
                  >
                    {m.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {team.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No team members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
