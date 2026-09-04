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
        // Base canvas & surfaces (Premium Light Mode)
        background: "#f8fafc", // slate-50
        foreground: "#0f172a", // slate-900
        surface: {
          DEFAULT: "#ffffff",
          elevated: "#ffffff",
          muted: "#f8fafc",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        // Brand & Accent Colors (Nap's Gold & Emerald)
        brand: {
          gold: "#f59e0b", // amber-500
          "gold-light": "#fbbf24", // amber-400
          "gold-subtle": "#fef3c7", // amber-100
          whatsapp: "#059669", // emerald-600
          "whatsapp-hover": "#047857", // emerald-700
        },
        // Semantic palette matching Slate / Amber / Emerald
        primary: {
          DEFAULT: "#f59e0b", // amber-500 (Nap's Gold)
          foreground: "#0f172a", // slate-900 (Accessible contrast on amber)
          hover: "#d97706", // amber-600
        },
        secondary: {
          DEFAULT: "#f1f5f9", // slate-100
          foreground: "#0f172a", // slate-900
          hover: "#e2e8f0", // slate-200
        },
        muted: {
          DEFAULT: "#f8fafc", // slate-50
          foreground: "#64748b", // slate-500
        },
        accent: {
          DEFAULT: "#fef3c7", // amber-100
          foreground: "#92400e", // amber-800
        },
        border: "#e2e8f0", // slate-200
        input: "#e2e8f0", // slate-200
        ring: "#f59e0b", // amber-500

        // WhatsApp CTA
        wa: {
          DEFAULT: "#059669", // emerald-600
          hover: "#047857", // emerald-700
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
        jakarta: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
        md: "0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)",
        lg: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)",
        xl: "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.92" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
