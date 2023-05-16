/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: ["16px", "100px"],
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      default: ["16px", "100px"],
    },
    extend: {
      colors: {
        bgblack: "#151515",
        pblack: "#232323",
        sblack: "#2C2C2C",
        pwhite: "#FAFAFA",
        softGray: "#E9EEF2",
        softBlue: "#74BDE0",
        darkBlue: "#1A3344"
      },
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
      }
    },
  },
  plugins: [],
};
