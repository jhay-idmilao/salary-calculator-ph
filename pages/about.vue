<script setup lang="ts">
import { setPageSeo, SITE_NAME, SITE_URL } from '~/utils/seo'

const pageDescription =
  'Learn why Sahod Calculator was built, how its Philippine payroll estimates work, and why it is independent from government agencies.'

setPageSeo({
  title: 'About Sahod Calculator – Independent PH Payroll Tool',
  description: pageDescription,
  path: '/about',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Sahod Calculator',
    url: `${SITE_URL}/about`,
    description: pageDescription,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL }
  }
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="About Sahod Calculator"
      description="A practical, independent way to understand the deductions on a Philippine payslip."
    />

    <article class="m3-prose space-y-8">
      <section>
        <h2 class="md-title-large mb-3">Why this site exists</h2>
        <p>
          Sahod Calculator was built by an independent Filipino software maker to make payroll
          deductions easier to understand. A payslip often gives you the final numbers without
          showing how salary brackets, contribution floors and ceilings, annualized tax, or the
          13th-month-pay exemption produced them. These calculators turn those rules into a clear
          breakdown you can use for planning and for better questions to your payroll team.
        </p>
        <p>
          The same builder also maintains
          <a class="content-link" href="http://pdf-tool-ph.com/" target="_blank" rel="noopener noreferrer">PDF Tool PH</a>,
          another set of free browser-based tools. Sahod Calculator is designed to keep salary
          entries on your device: calculations run in the browser, without an account or an
          application database.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">How the estimates are prepared</h2>
        <p>
          Each calculator applies the rates and brackets stored in the project to the numbers you
          enter. Explanations and FAQs show what the formula includes, common reasons an actual
          payslip may differ, and where the employee process differs from self-employed or voluntary
          membership.
        </p>
        <p>
          The project labels its rates by review year and displays a rate-verification warning on
          every page. Rules can change through agency circulars, and no browser calculator can see
          your complete employment, contribution, tax, or benefit record.
        </p>
      </section>

      <section class="rounded-[var(--md-shape-lg)] p-5" style="background-color: var(--md-primary-container)">
        <h2 class="md-title-large mb-3" style="color: var(--md-on-primary-container)">Independent-tool disclaimer</h2>
        <p style="color: var(--md-on-primary-container)">
          Sahod Calculator is an independent educational and estimation tool. It is not affiliated
          with, endorsed by, or operated by the Social Security System (SSS), Philippine Health
          Insurance Corporation (PhilHealth), Home Development Mutual Fund (Pag-IBIG Fund), Bureau
          of Internal Revenue (BIR), Department of Labor and Employment (DOLE), or any other
          Philippine government office.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Questions or corrections</h2>
        <p>
          If you spot an unclear explanation or a rate that may need review, contact
          <a class="content-link" href="mailto:hello@pdftool.ph">hello@pdftool.ph</a>.
          Please do not email salary records, government identification numbers, medical details,
          tax files, or other sensitive personal information.
        </p>
      </section>
    </article>
  </main>
</template>
