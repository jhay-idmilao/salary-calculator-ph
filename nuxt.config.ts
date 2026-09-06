import { ADSENSE_CLIENT_ID } from './constants/ads'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  ssr: true,

  // Static generation only — no server routes, no API calls, no database.
  // Routes are listed explicitly (in addition to crawlLinks) so every hub
  // tool/content page is guaranteed a prerendered static file regardless of
  // link-crawl order.
  nitro: {
    // Match pdf-tool-ph's Workers Builds deployment model. During a Cloudflare
    // build Nitro emits both the module Worker entry point and the redirected
    // Wrangler config consumed by the dashboard's `npx wrangler deploy` step.
    cloudflare: {
      deployConfig: true,
      wrangler: {
        name: 'jhay-idmilao-salary-calculator-ph'
      }
    },
    prerender: {
      routes: [
        '/',
        '/salary-calculator',
        '/13th-month-pay-calculator',
        '/sss-contribution-calculator',
        '/philhealth-contribution-calculator',
        '/pagibig-mp2-calculator',
        '/bir-withholding-tax-calculator',
        '/government-benefits-guide',
        '/faq',
        '/about',
        '/privacy-policy',
        '/terms'
      ],
      crawlLinks: true
    }
  },

  app: {
    head: {
      title: 'Sahod Calculator — Free PH Payroll & Government Contribution Calculators (2026)',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Free Philippine payroll tools: take-home pay, 13th month pay, SSS, PhilHealth, Pag-IBIG MP2, and BIR withholding tax calculators, plus a government benefits guide.'
        },
        // Material 3 tonal seed color, reflected in the browser chrome (light/dark).
        { name: 'theme-color', content: '#eef1ff', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#111318', media: '(prefers-color-scheme: dark)' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // Roboto is Material Design's own reference typeface and our guaranteed
        // fallback — see README for the full "Google Sans" font-stack rationale.
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap'
        }
      ],
      script: [
        {
          // AdSense site-verification/auto-ads loader — required in every
          // page's <head> regardless of whether any individual <AdSlot />
          // is requesting an ad. ADSENSE_CLIENT_ID is a placeholder (see
          // constants/ads.ts) until the AdSense account is approved.
          key: 'adsbygoogle',
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`,
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  }
})
