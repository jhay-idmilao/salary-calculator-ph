<script setup lang="ts">
import { philhealthFaqs } from '~/content/faqs'
import { calculatorSchema, setPageSeo } from '~/utils/seo'

const pageDescription =
  'Estimate your 2026 monthly PhilHealth premium and employee-employer split using the current salary floor and ceiling in this calculator.'

setPageSeo({
  title: 'PhilHealth Contribution Calculator 2026 – Sahod Calculator',
  description: pageDescription,
  path: '/philhealth-contribution-calculator',
  schema: calculatorSchema(
    'PhilHealth Contribution Calculator 2026',
    pageDescription,
    '/philhealth-contribution-calculator'
  )
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="PhilHealth Contribution Calculator"
      description="Enter your monthly basic salary to see your PhilHealth premium split."
    />

    <div class="space-y-6">
      <PhilhealthCalculatorCore />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is PhilHealth and how are contributions computed?">
          <PhilhealthExplainer />
        </Md3Accordion>
      </div>

      <p class="px-1 md-body-medium" style="color: var(--md-on-surface-variant)">
        Want your full paycheck breakdown? Try the
        <NuxtLink to="/salary-calculator" class="content-link">Salary Calculator</NuxtLink>
        for SSS, PhilHealth, Pag-IBIG, withholding tax, and net take-home pay together.
      </p>

      <FaqSection :items="philhealthFaqs" />

      <AdSlot label="Sponsored" />
    </div>
  </main>
</template>
