const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        nonav: 'calc(100vh - 3rem)',
      },
      colors: {
        white: "#FFFFFF",
        primary: "#1B1B3A",
        secondary: "#6159e6",
        yellow: "#ffc200",
        meadow: "#09BC8A",
        riflegreen: "#4E4F40",
      },
      height: {
        nonav: "calc(100vh - 4rem)",
      },
      borderWidth: {
        6: "6px",
      },
    },
  },
  plugins: [require('tailwindcss-neumorphism')],
}
