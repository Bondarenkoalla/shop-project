/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,hbs}"],
  theme: {

    extend: {
      fontFamily: {
        main: "'Space Grotesk', sans-serif",
        title: "'Roboto', sans-serif",
        footer: "'Space Mono', monospace",
      }, colors: {
        lightSand: "#FCF7E6",
        dark: "#000",       
      },
    },
  },
  plugins: [],
}