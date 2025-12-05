// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // show nothing or a spinner while session is being restored
    return <div className="p-6 text-center">Checking session...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
