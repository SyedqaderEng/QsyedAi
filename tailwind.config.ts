import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Glassmorphism neon accent colors
        neon: {
          blue: "#00D9FF",
          purple: "#B435F5",
          pink: "#FF006B",
          green: "#00FF94",
          yellow: "#FFE600",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.2)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-blue": "0 0 20px rgba(0, 217, 255, 0.5)",
        "neon-purple": "0 0 20px rgba(180, 53, 245, 0.5)",
        "neon-pink": "0 0 20px rgba(255, 0, 107, 0.5)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "from": { boxShadow: "0 0 10px rgba(0, 217, 255, 0.5)" },
          "to": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
