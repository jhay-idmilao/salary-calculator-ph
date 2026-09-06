<script setup lang="ts">
import { withholdingTaxFaqs } from '~/content/faqs'
import { calculatorSchema, setPageSeo } from '~/utils/seo'

const pageDescription =
  'Estimate Philippine BIR withholding tax for monthly or semi-monthly taxable compensation using the current TRAIN annual brackets in this tool.'

setPageSeo({
  title: 'BIR Withholding Tax Calculator 2026 – Philippines',
  description: pageDescription,
  path: '/bir-withholding-tax-calculator',
  schema: calculatorSchema(
    'BIR Withholding Tax Calculator 2026',
    pageDescription,
    '/bir-withholding-tax-calculator'
  )
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="BIR Withholding Tax Calculator"
      description="Check just your withholding tax for a pay period, without a full salary breakdown."
    />

    <div class="space-y-6">
      <WithholdingTaxCalculatorCore />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is BIR withholding tax and how is it computed?">
          <WithholdingTaxExplainer />
        </Md3Accordion>
      </div>

      <p class="px-1 md-body-medium" style="color: var(--md-on-surface-variant)">
        Want your full paycheck breakdown? Try the
        <NuxtLink to="/salary-calculator" class="content-link">Salary Calculator</NuxtLink>
        for SSS, PhilHealth, Pag-IBIG, withholding tax, and net take-home pay together. For how
        withholding relates to your annual ITR, see the
        <NuxtLink to="/government-benefits-guide" class="content-link">Government Benefits Guide</NuxtLink>.
      </p>

      <FaqSection :items="withholdingTaxFaqs" />

      <AdSlot label="Sponsored" />
    </div>
  </main>
</template>
