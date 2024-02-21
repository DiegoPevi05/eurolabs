import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#011c32",
        secondary: "#068cf9",
        tertiary: "#02223c",
        fourth: "#0570c7",
        fifth: "#03467c",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Roboto+Slab", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
