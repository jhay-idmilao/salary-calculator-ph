// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  ssr: true,

  // Static generation only — no server routes, no API calls, no database.
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  app: {
    head: {
      title: 'Sahod Calculator — Free PH Payroll & Take-Home Pay Calculator (2026)',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Free Philippine payroll calculator. Instantly compute SSS, PhilHealth, Pag-IBIG contributions, BIR withholding tax, net take-home pay, and 13th month pay using 2026 rates.'
        }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  }
})
