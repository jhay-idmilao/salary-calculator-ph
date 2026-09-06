<script setup lang="ts">
import { mp2Faqs } from '~/content/faqs'
import { calculatorSchema, setPageSeo } from '~/utils/seo'

const pageDescription =
  'Project Pag-IBIG MP2 savings, contributions, estimated dividends, and five-year maturity value using a dividend rate you can adjust.'

setPageSeo({
  title: 'Pag-IBIG MP2 Calculator 2026 – Savings & Dividends',
  description: pageDescription,
  path: '/pagibig-mp2-calculator',
  schema: calculatorSchema('Pag-IBIG MP2 Savings Calculator', pageDescription, '/pagibig-mp2-calculator')
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="Pag-IBIG MP2 Savings Calculator"
      description="Project your MP2 contributions, dividends, and total savings at maturity."
    />

    <div class="space-y-6">
      <Mp2CalculatorCore />

      <Mp2HistoricalRatesTable />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is Pag-IBIG MP2 and how are dividends computed?">
          <Mp2Explainer />
        </Md3Accordion>
      </div>

      <p class="px-1 md-body-medium" style="color: var(--md-on-surface-variant)">
        New to Pag-IBIG? Read how regular contributions, MP2, and other government deductions work
        in the <NuxtLink to="/government-benefits-guide" class="content-link">Government Benefits Guide</NuxtLink>,
        or see MP2 alongside your other deductions in the
        <NuxtLink to="/salary-calculator" class="content-link">Salary Calculator</NuxtLink>.
      </p>

      <FaqSection :items="mp2Faqs" />

      <AdSlot label="Sponsored" />
    </div>
  </main>
</template>
