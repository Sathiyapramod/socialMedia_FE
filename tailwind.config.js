/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        "light-gray": "rgb(0,0,0,0.33)",
        "menu-colors": "rgb(220, 56, 64)",
        black: "rgb(0,0,0)",
        white: "rgb(255,255,255)",
        textarea: "rgb(217,217,217,0.75)",
        "light-black": "rgb(0,0,0,0.50)",
      },
    },
    fontSize: {
      xs: "14px",
      sm: "16px",
      medium: "24px",
      lg: "36px",
    },
  },
  plugins: [],
};
