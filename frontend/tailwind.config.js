// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: [
    // semantic classes used in Home.jsx — ensures JIT generates them
    "bg-bg", "bg-panel", "text-text", "text-muted", "border-border",
    "bg-accent-400", "bg-accent-500", "bg-accent-600",
    "text-accent-400", "text-accent-300",
    "shadow-token"
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: {
          400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "rgb(var(--accent-500) / <alpha-value>)",
          600: "rgb(var(--accent-600) / <alpha-value>)",
        }
      },
      boxShadow: {
        'token': 'var(--shadow)'
      },
      borderRadius: {
        'lg-token': 'var(--radius-lg)'
      }
    },
  },
  plugins: [],
};
