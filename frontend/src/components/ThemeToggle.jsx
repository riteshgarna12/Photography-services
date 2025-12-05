// src/components/ThemeToggle.jsx
import React from "react";
import useTheme from "../hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
      className="p-2 rounded-full hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {theme === "dark" ? <FiSun className="text-yellow-400" size={18} /> : <FiMoon className="text-gray-700" size={18} />}
    </button>
  );
}
