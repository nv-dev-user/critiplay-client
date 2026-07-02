// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  runtimeConfig: {
    public: {
      apiBaseUrl: ''
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vercel/analytics',
    '@nuxtjs/device'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
