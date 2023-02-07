/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: require("tailwindcss/colors"),
    extend: {},
  },
  plugins: [],
  mode: "jit",
};
