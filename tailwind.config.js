/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      black: "black",
      white: "white",
      lightgrey: "#404040",
      grey: "#292929",
      darkgrey: "#1a1a1a",
    },
  },
  plugins: [],
};
