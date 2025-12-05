// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiLogOut, FiSave, FiEdit } from "react-icons/fi";

/**
 * Minimal Profile page — only user info and edit form.
 * No bookings, no stats, no dashboard content.
 */

export default function Profile() {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    avatarDataUrl: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        avatarDataUrl: user.avatar || "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleAvatar = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 2_000_000) {
      setError("Avatar must be < 2MB.");
      return;
    }
    setError("");
    const fr = new FileReader();
    fr.onload = () => setForm((s) => ({ ...s, avatarDataUrl: fr.result }));
    fr.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e?.preventDefault();
    setMsg("");
    setError("");

    if (form.newPassword || form.confirmPassword) {
      if (form.newPassword !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (form.newPassword.length > 0 && form.newPassword.length < 6) {
        setError("New password must be at least 6 characters.");
        return;
      }
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
      };
      if (form.avatarDataUrl) payload.avatar = form.avatarDataUrl;
      if (form.newPassword) payload.password = form.newPassword;

      const res = await api.put("/auth/update", payload);
      const updatedUser = res.data?.user ?? res.data;
      setUser(updatedUser);
      setMsg("Profile updated.");
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try { localStorage.removeItem("token"); } catch {}
    logout?.();
    navigate("/");
  };

  if (!user) return <p className="text-center text-muted mt-10">Loading profile…</p>;

  return (
    <div className="min-h-screen bg-bg text-black dark:text-text px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white/95 dark:bg-panel/70 border border-gray-200 dark:border-border p-8 shadow-token">
          {/* header */}
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-3xl font-bold text-white"
              style={{ backgroundColor: "rgb(var(--accent-500))" }}
            >
              {form.avatarDataUrl ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={form.avatarDataUrl} className="w-full h-full object-cover" />
              ) : (
                (user.name?.charAt(0) || "U").toUpperCase()
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-black dark:text-text">{user.name}</h1>
              <p className="text-sm text-gray-600 dark:text-muted">{user.email}</p>
              <p className="text-sm text-accent-400 mt-1 capitalize">{user.role}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => setEditing((s) => !s)} className="px-3 py-2 rounded-md bg-accent-600 text-white">
                <FiEdit /> {editing ? "Close" : "Edit"}
              </button>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md border border-border bg-panel/80 text-black dark:text-text">
                <FiLogOut /> Logout
              </button>
            </div>
          </div>

          {/* messages */}
          {msg && <div className="mt-4 p-2 text-accent-400 bg-panel/80 rounded">{msg}</div>}
          {error && <div className="mt-4 p-2 text-red-700 bg-red-50 rounded">{error}</div>}

          {/* details view or edit form */}
          {!editing ? (
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-muted">Full name</div>
                <div className="font-medium text-black dark:text-text">{user.name}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-muted">Email</div>
                <div className="font-medium text-black dark:text-text">{user.email}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-muted">Phone</div>
                <div className="font-medium text-black dark:text-text">{user.phone || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-muted">Bio</div>
                <div className="text-sm text-muted">{user.bio || "No bio added."}</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-muted mb-1">Full name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded border border-border bg-panel/80 text-black dark:text-text" required />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-muted mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full p-3 rounded border border-border bg-panel/80 text-black dark:text-text" required />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-muted mb-1">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-3 rounded border border-border bg-panel/80 text-black dark:text-text" />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-muted mb-1">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="w-full p-3 rounded border border-border bg-panel/80 text-black dark:text-text" />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-muted mb-1">Change avatar</label>
                <input type="file" accept="image/*" onChange={(e) => handleAvatar(e.target.files?.[0])} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-muted mb-1">New password (optional)</label>
                <input name="newPassword" value={form.newPassword} onChange={handleChange} type="password" className="w-full p-3 rounded border border-border bg-panel/80 text-black dark:text-text" />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-muted mb-1">Confirm new password</label>
                <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" className="w-full p-3 rounded border border-border bg-panel/80 text-black dark:text-text" />
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-md bg-accent-600 text-white">
                  {loading ? "Saving..." : <><FiSave /> Save</>}
                </button>
                <button type="button" onClick={() => { setEditing(false); setError(""); setMsg(""); }} className="flex-1 px-4 py-2 rounded-md border border-border">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
