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
        background: "#000000",
        positive: "#bbf7d0",
        negative: "#fca5a5",
        btnBackground: "#1a1a1a",
        btnText: "#ffffff",
        cardBackground: "#0A0A0A",
        cardBorder: "#333333",
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        brand: '8px',
      },
    },
  },
  plugins: [],
};
export default config;
