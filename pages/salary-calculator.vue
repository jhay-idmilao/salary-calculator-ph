<script setup lang="ts">
import type { PayFrequency } from '~/constants/rates2026'
import { salaryFaqs } from '~/content/faqs'
import { calculatorSchema, setPageSeo } from '~/utils/seo'

const pageDescription =
  'Estimate 2026 Philippine take-home pay with SSS, PhilHealth, Pag-IBIG, and BIR withholding tax deductions from monthly or semi-monthly salary.'

setPageSeo({
  title: 'Philippine Salary Calculator 2026 – Net Pay & Deductions',
  description: pageDescription,
  path: '/salary-calculator',
  schema: calculatorSchema('Philippine Salary Calculator 2026', pageDescription, '/salary-calculator')
})

const grossSalary = ref<number | null>(null)
const frequency = ref<PayFrequency>('monthly')
const hasComputed = ref(false)
const resultVersion = ref(0)

const { calculate } = usePayrollCalculator()

const result = computed(() => {
  if (!hasComputed.value || grossSalary.value === null || grossSalary.value <= 0) return null
  return calculate(grossSalary.value, frequency.value)
})

function onCompute() {
  if (grossSalary.value !== null && grossSalary.value > 0) {
    hasComputed.value = true
    resultVersion.value++
  }
}
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="Salary Calculator"
      description="Enter your gross salary to see your statutory deductions and net take-home pay."
    />

    <div class="space-y-6">
      <SalaryInputForm
        v-model:model-value-gross="grossSalary"
        v-model:model-value-frequency="frequency"
        @compute="onCompute"
      />

      <Transition name="result-pop" mode="out-in" :duration="{ enter: 320, leave: 120 }">
        <ResultsBreakdown v-if="result" :key="resultVersion" :result="result" />
      </Transition>

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is SSS and how are contributions computed?">
          <SssExplainer />
        </Md3Accordion>
        <Md3Accordion title="What is PhilHealth and how are contributions computed?">
          <PhilhealthExplainer />
        </Md3Accordion>
        <Md3Accordion title="What is Pag-IBIG (HDMF) and how are contributions computed?">
          <PagibigExplainer />
        </Md3Accordion>
        <Md3Accordion title="What is BIR withholding tax and how is it computed?">
          <WithholdingTaxExplainer />
        </Md3Accordion>
      </div>

      <div class="m3-card p-5 sm:p-6">
        <p class="md-title-medium mb-2" style="color: var(--md-on-surface)">Want a closer look at one deduction?</p>
        <p class="md-body-medium" style="color: var(--md-on-surface-variant)">
          Each contribution has its own dedicated calculator with a more detailed breakdown:
        </p>
        <ul class="mt-3 list-disc space-y-1 pl-5 md-body-medium" style="color: var(--md-on-surface-variant)">
          <li><NuxtLink to="/sss-contribution-calculator" class="content-link">SSS Contribution Calculator</NuxtLink> — Monthly Salary Credit and EC breakdown</li>
          <li><NuxtLink to="/philhealth-contribution-calculator" class="content-link">PhilHealth Contribution Calculator</NuxtLink> — employee/employer premium split</li>
          <li><NuxtLink to="/bir-withholding-tax-calculator" class="content-link">BIR Withholding Tax Calculator</NuxtLink> — check just your withholding tax</li>
          <li><NuxtLink to="/pagibig-mp2-calculator" class="content-link">Pag-IBIG MP2 Savings Calculator</NuxtLink> — project voluntary savings and dividends</li>
        </ul>
      </div>

      <FaqSection :items="salaryFaqs" />

      <AdSlot label="Sponsored" />
    </div>
  </main>
</template>
