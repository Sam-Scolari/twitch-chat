/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      black: "black",
      white: "white",
      lightgrey: "#404040",
      grey: "#292929",
      darkgrey: "#1a1a1a",
      red: "#E43131",
      yellow: "#EBFF3D",
      purple: "#9F53FF",
    },
  },
  plugins: [],
};
