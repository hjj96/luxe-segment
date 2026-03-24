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
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem", letterSpacing: "0.14em" }],
      },
      colors: {
        luxe: {
          /** Warm stone / soft off-white — основной фон */
          bg: "#f4f1eb",
          "bg-alt": "#e9e4db",
          /** Слои карточек, полей — не чистый #fff */
          surface: "#faf8f5",
          /** Глубокий графит — шапка, подвал, оверлеи */
          graphite: "#131211",
          "graphite-elevated": "#1a1918",
          /** Основной текст — charcoal, не #000 */
          ink: "#1c1b19",
          "ink-soft": "#2a2826",
          /** Вторичный — тёплый серо-графит */
          mute: "#6e6962",
          "mute-strong": "#4a4640",
          /** Тонкие тёплые границы */
          border: "#ddd6cc",
          "border-strong": "#c9c2b8",
          /** Деликатный smoked bronze / champagne taupe */
          accent: "#8c7c6b",
          "accent-soft": "#a89888",
          "accent-faint": "rgba(140, 124, 107, 0.14)",
        },
      },
      letterSpacing: {
        nav: "0.06em",
        label: "0.12em",
        logo: "0.42em",
        editorial: "0.02em",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      boxShadow: {
        /** Едва заметная глубина */
        luxe: "0 1px 0 rgba(28, 27, 25, 0.04), 0 8px 24px -12px rgba(28, 27, 25, 0.08)",
        "luxe-sm": "0 1px 2px rgba(28, 27, 25, 0.04)",
        "luxe-hover": "0 0 0 1px rgba(140, 124, 107, 0.12), 0 12px 32px -16px rgba(28, 27, 25, 0.12)",
      },
      borderRadius: {
        sheet: "1.25rem",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        luxe: "420ms",
      },
      keyframes: {
        "luxe-fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "luxe-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "sheet-in": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "luxe-fade-up": "luxe-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "luxe-fade": "luxe-fade 0.35s ease-out forwards",
        "sheet-in": "sheet-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
