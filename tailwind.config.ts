import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        luxe: {
          bg: "#fdfdfc",
          "bg-alt": "#f8f7f6",
          ink: "#0a0a0a",
          "ink-soft": "#1a1a1a",
          mute: "#6b6b6b",
          "mute-strong": "#4a4a4a",
          border: "#e8e6e4",
          "border-strong": "#d6d4d2",
          accent: "#c9a86c",
        },
      },
      letterSpacing: {
        "nav": "0.05em", /* Единое для навигации */
        "label": "0.08em", /* Для меток и брендов */
      },
      boxShadow: {
        "card": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        "card-hover": "0 2px 8px -2px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
