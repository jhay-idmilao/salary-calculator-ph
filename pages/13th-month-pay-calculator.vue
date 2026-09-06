<script setup lang="ts">
import { thirteenthMonthFaqs } from '~/content/faqs'
import { calculatorSchema, setPageSeo } from '~/utils/seo'

const pageDescription =
  'Calculate your prorated 13th month pay under Philippine DOLE rules and estimate the amount within or above the ₱90,000 tax-exempt ceiling.'

setPageSeo({
  title: '13th Month Pay Calculator 2026 – Philippines',
  description: pageDescription,
  path: '/13th-month-pay-calculator',
  schema: calculatorSchema(
    '13th Month Pay Calculator 2026',
    pageDescription,
    '/13th-month-pay-calculator'
  )
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="13th Month Pay Calculator"
      description="Compute your 13th month pay and check the ₱90,000 tax-exempt ceiling."
    />

    <div class="space-y-6">
      <ThirteenthMonthCalculator />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="How is 13th month pay computed under DOLE rules?">
          <ThirteenthMonthExplainer />
        </Md3Accordion>
      </div>

      <p class="px-1 md-body-medium" style="color: var(--md-on-surface-variant)">
        Want your regular monthly breakdown too? Try the
        <NuxtLink to="/salary-calculator" class="content-link">Salary Calculator</NuxtLink>
        for SSS, PhilHealth, Pag-IBIG, withholding tax, and net take-home pay.
      </p>

      <FaqSection :items="thirteenthMonthFaqs" />

      <AdSlot label="Sponsored" />
    </div>
  </main>
</template>
