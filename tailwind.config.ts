import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlue: { 800: "#10248C", 200: "rgb(83 103 204)" },
        customGray: "#E1E6ED",
        hero: "#0E0218",
        CreatePortfolio: "#2A2F6D",
      },
    },
  },
  plugins: [],
};

export default config;
