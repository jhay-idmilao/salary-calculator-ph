<script setup lang="ts">
import type { PayFrequency } from '~/constants/rates2026'

useSeoMeta({
  title: 'Salary Calculator — SSS, PhilHealth, Pag-IBIG, Tax & Net Pay (2026) | Sahod Calculator',
  description:
    'Compute your SSS, PhilHealth, and Pag-IBIG contributions, BIR withholding tax, and net take-home pay from your gross salary using 2026 Philippine rates.'
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
  <div class="mx-auto max-w-2xl px-4 py-8">
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

      <AdSlot label="Sponsored" />

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
    </div>
  </div>
</template>
