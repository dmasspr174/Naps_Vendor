import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#facc15",
          foreground: "#09090b",
          hover: "#eab308",
        },
        secondary: {
          DEFAULT: "#27272a",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#27272a",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#facc15",
          foreground: "#09090b",
        },
        card: {
          DEFAULT: "#121215",
          foreground: "#fafafa",
          border: "#27272a",
        },
        border: "#27272a",
        "wa-green": {
          DEFAULT: "#25D366",
          hover: "#20bd5a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        }
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};
export default config;
