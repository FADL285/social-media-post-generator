const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node events here
    },
    baseUrl: "http://localhost:3000"
  }
})
