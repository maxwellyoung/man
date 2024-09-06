import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        goldeneye: ["GoldenEye", "sans-serif"],
        authentic: ["Authentic-Sans", "sans-serif"],
      },
      colors: {
        background: "#1e1e1e",
        border: "#4a4a4a",
      },
    },
  },
  plugins: [],
};

export default config;
