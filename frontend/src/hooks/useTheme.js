// src/hooks/useTheme.jsx
import { useEffect, useState } from "react";

const THEME_KEY = "photoPro.theme";

export default function useTheme() {
  // synchronous initial read (safe)
  const getInitial = () => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
      if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    } catch {
      return "light";
    }
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.removeAttribute("data-theme");
        root.style.colorScheme = "light";
      }
      localStorage.setItem(THEME_KEY, theme);
    } catch (err) {
      // fail gracefully
      // console.warn("theme set error", err);
    }
  }, [theme]);

  return [theme, setTheme];
}
