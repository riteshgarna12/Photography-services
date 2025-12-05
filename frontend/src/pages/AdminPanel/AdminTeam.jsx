import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

export default function AdminTeam() {
  const { user } = useContext(AuthContext);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const emptyForm = {
    name: "",
    role: "",
    specialization: "",
    bio: "",
    experienceYears: "",
    imageUrl: "",
    skills: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      loadTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadTeam = async () => {
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await api.get("/team/admin");
      setTeam(res.data || []);
    } catch (err) {
      console.error("Failed to load team", err);
      setMsg({ type: "error", text: "Failed to load team members." });
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMsg({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    // basic validation
    if (!form.name.trim() || !form.role.trim()) {
      setMsg({ type: "error", text: "Name and Role are required." });
      return;
    }

    const payload = {
      ...form,
      experienceYears:
        form.experienceYears !== "" ? Number(form.experienceYears) : undefined,
      skills: form.skills
        ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/team/${editingId}`, payload);
        setMsg({ type: "success", text: "Member updated successfully." });
      } else {
        await api.post("/team", payload);
        setMsg({ type: "success", text: "Member added successfully." });
      }
      resetForm();
      await loadTeam();
    } catch (err) {
      console.error("Save failed", err);
      setMsg({
        type: "error",
        text:
          err?.response?.data?.message ||
          "Failed to save member. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (member) => {
    setEditingId(member._id);
    setForm({
      name: member.name || "",
      role: member.role || "",
      specialization: member.specialization || "",
      bio: member.bio || "",
      experienceYears:
        member.experienceYears !== undefined ? String(member.experienceYears) : "",
      imageUrl: member.imageUrl || "",
      skills: (member.skills || []).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActive = async (id) => {
    if (!window.confirm("Toggle active status for this member?")) return;
    try {
      await api.patch(`/team/${id}/toggle`);
      setMsg({ type: "success", text: "Status updated." });
      loadTeam();
    } catch (err) {
      console.error("Toggle failed", err);
      setMsg({ type: "error", text: "Failed to update status." });
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6">
        <p className="text-[rgb(255,120,120)]">Access Denied (Admin only)</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-bg text-text">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Manage Team Members</h2>

        {/* message */}
        {msg.text && (
          <div
            role="status"
            className={`mb-6 p-3 rounded ${
              msg.type === "error"
                ? "bg-[rgba(255,80,80,0.06)] border-[rgba(255,80,80,0.12)] text-[rgb(255,180,180)]"
                : "bg-[rgba(20,180,120,0.06)] border-[rgba(20,180,120,0.12)] text-[rgb(160,255,210)]"
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* FORM */}
        <div className="bg-panel border border-border rounded-xl p-6 mb-8 shadow-token">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Member" : "Add New Member"}
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Name"
              aria-label="Name"
              className="bg-panel/80 border border-border rounded px-3 py-2 text-text"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="role"
              placeholder="Role (Candid Photographer, Drone Expert...)"
              aria-label="Role"
              className="bg-panel/80 border border-border rounded px-3 py-2 text-text"
              value={form.role}
              onChange={handleChange}
              required
            />

            <input
              name="specialization"
              placeholder="Specialization"
              className="bg-panel/80 border border-border rounded px-3 py-2 text-text"
              value={form.specialization}
              onChange={handleChange}
            />

            <input
              name="experienceYears"
              type="number"
              min="0"
              placeholder="Experience (years)"
              className="bg-panel/80 border border-border rounded px-3 py-2 text-text"
              value={form.experienceYears}
              onChange={handleChange}
            />

            <input
              name="imageUrl"
              placeholder="Image URL"
              className="bg-panel/80 border border-border rounded px-3 py-2 md:col-span-2 text-text"
              value={form.imageUrl}
              onChange={handleChange}
            />

            <textarea
              name="bio"
              placeholder="Bio"
              rows={3}
              className="bg-panel/80 border border-border rounded px-3 py-2 md:col-span-2 text-text"
              value={form.bio}
              onChange={handleChange}
            />

            <input
              name="skills"
              placeholder="Skills (comma separated)"
              className="bg-panel/80 border border-border rounded px-3 py-2 md:col-span-2 text-text"
              value={form.skills}
              onChange={handleChange}
            />

            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded bg-accent-600 hover:bg-accent-500 text-white shadow-token disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Member"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded bg-panel/80 border border-border text-text hover:bg-panel/95"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-panel border border-border rounded-xl p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Active</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              ) : team.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-muted">
                    No team members yet.
                  </td>
                </tr>
              ) : (
                team.map((m) => (
                  <tr key={m._id} className="border-b border-border">
                    <td className="p-3 text-text">{m.name}</td>
                    <td className="p-3 text-muted">{m.role}</td>
                    <td className="p-3 text-muted">
                      {m.experienceYears ? `${m.experienceYears} yrs` : "-"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-sm ${
                          m.active ? "bg-green-700 text-white" : "bg-red-700 text-white"
                        }`}
                      >
                        {m.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => startEdit(m)}
                        className="px-3 py-1 bg-accent-600 text-white rounded hover:brightness-95"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => toggleActive(m._id)}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:brightness-95"
                        aria-pressed={m.active}
                      >
                        {m.active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
