import type { UseSeoMetaInput } from '@unhead/vue'

export const SITE_NAME = 'Sahod Calculator'
export const SITE_URL = 'https://sahod-calculator.pages.dev'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

interface PageSeoOptions {
  title: string
  description: string
  path: string
  schema?: Record<string, unknown> | Record<string, unknown>[]
}

/** Shared, static-safe metadata for every indexable page. */
export function setPageSeo({ title, description, path, schema }: PageSeoOptions) {
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`
  const meta: UseSeoMetaInput = {
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogUrl: canonicalUrl,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Sahod Calculator — free Philippine payroll tools',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_OG_IMAGE
  }

  useSeoMeta(meta)
  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: schema
      ? [
          {
            type: 'application/ld+json',
            textContent: JSON.stringify(schema)
          }
        ]
      : []
  })
}

export function calculatorSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript in a modern web browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PHP'
    },
    inLanguage: 'en-PH',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    }
  }
}

