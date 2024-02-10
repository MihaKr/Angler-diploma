import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-yellow':'#BAA333',
        'side-menu_gray': '#F5F5F5',
        'Angler-Dark_Blue': '#486AAD',
        'Angler-Text-Grey': '#A0A0A0'
      }
    },
  },
  plugins: [],
};
export default config;
