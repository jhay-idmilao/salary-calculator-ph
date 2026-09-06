<script setup lang="ts">
import { sssFaqs } from '~/content/faqs'
import { calculatorSchema, setPageSeo } from '~/utils/seo'

const pageDescription =
  'Estimate your 2026 SSS Monthly Salary Credit and employee, employer, and EC contribution amounts from monthly compensation.'

setPageSeo({
  title: 'SSS Contribution Calculator 2026 – Sahod Calculator',
  description: pageDescription,
  path: '/sss-contribution-calculator',
  schema: calculatorSchema('SSS Contribution Calculator 2026', pageDescription, '/sss-contribution-calculator')
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="SSS Contribution Calculator"
      description="Enter your monthly compensation to see your SSS Monthly Salary Credit and contribution split."
    />

    <div class="space-y-6">
      <SssCalculatorCore />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is SSS and how are contributions computed?">
          <SssExplainer />
        </Md3Accordion>
      </div>

      <p class="px-1 md-body-medium" style="color: var(--md-on-surface-variant)">
        Want your full paycheck breakdown? Try the
        <NuxtLink to="/salary-calculator" class="content-link">Salary Calculator</NuxtLink>
        for SSS, PhilHealth, Pag-IBIG, withholding tax, and net take-home pay together.
      </p>

      <FaqSection :items="sssFaqs" />

      <AdSlot label="Sponsored" />
    </div>
  </main>
</template>
