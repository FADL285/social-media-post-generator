module.exports = {
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      screens: {
        xs: { max: "639px" }
      }
    }
  }
}
