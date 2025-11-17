import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>

      <div className="space-y-3 text-gray-700 text-lg">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        <p className="text-gray-500">
          You are now logged into your Photography Platform dashboard.
        </p>
      </div>
    </div>
  );
}
