import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#071426",
          DEFAULT: "#0B1F3A",
          800: "#132D52",
          700: "#1D4173",
        },
        brand: {
          navy: "#0B1F3A",
          green: "#12B76A",
          "green-hover": "#0EA35C",
          "green-light": "#ECFDF3",
          orange: "#FF7A1A",
          "orange-light": "#FFF4ED",
          bg: "#F7F9FC",
          border: "#E4E9F2",
          muted: "#64748B",
          dark: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(11, 31, 58, 0.05)",
        hover: "0 10px 30px -4px rgba(11, 31, 58, 0.12)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
