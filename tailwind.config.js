/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3CA83C",
        "primary-hover": "#359635",
        secondary: "#E8F4EA",
        "secondary-hover": "#d5e3d7",
      },
      fontFamily: {
        primary: ["var(--font-roboto"],
      },
    },
  },
  plugins: [],
};
