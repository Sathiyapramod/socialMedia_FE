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
            },
        },
        fontSize: {
            sm: "16px",
            medium: "24px",
        },
    },
    plugins: [],
};
