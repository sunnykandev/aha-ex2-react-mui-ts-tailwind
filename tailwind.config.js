/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#FF9B33",
        secondary: "#FFD25F",
        "light-black": "#1B1B1B",
        "medium-black": "#1b1b1b",
        "dark-black": "#181818",
      },
      screens: {
        "xl-max": { min: "1440px" },
      },
    },
  },
  plugins: [],
};
