// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },

  runtimeConfig: {
    openai: {
      apiKey: ""
    }
  },

  ssr: false,

  devtools: {
    enabled: true
  }
})
