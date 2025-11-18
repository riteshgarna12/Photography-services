import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Load initial values
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await api.put("/auth/update", form);
      setUser(res.data.user); // update global state
      setMsg("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed");
    }

    setLoading(false);
  };

  if (!user) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white py-14 px-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-pink-600 flex items-center justify-center text-white text-4xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-pink-400 font-semibold capitalize mt-1">
            {user.role}
          </p>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="mt-5 px-6 py-2 bg-pink-600 rounded-lg hover:bg-pink-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Success/Error Message */}
        {msg && (
          <p className="mt-6 text-center p-2 rounded bg-gray-800 text-pink-400">
            {msg}
          </p>
        )}

        {/* EDIT FORM */}
        {editing && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleUpdate}
            className="mt-8 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1">New Password (optional)</label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="w-full bg-pink-600 py-3 rounded-lg hover:bg-pink-700"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setMsg("");
                }}
                className="w-full bg-gray-700 py-3 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
}