/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        IBM: ["IBM Plex Sans", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        '04244A': "#04244A",
        'F07C41': "#F07C41",
        '9B2704': "#9B2704",
        '55BDCA': "#55BDCA",
        '95FFFF': "#95FFFF",
        'C7EEF5': "#C7EEF5",
        'black': "000000",
        'white': "#FFFFFF",
        'gradient': "#FFFBF2",
        'gd': "#E9FBFF",
      },
      fontSize: {
        
      }
    },
  },
  plugins: [],
}