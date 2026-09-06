<script setup lang="ts">
import type { PayFrequency } from '~/constants/rates2026'

const taxableIncome = ref<number | null>(null)
const frequency = ref<PayFrequency>('monthly')
const hasComputed = ref(false)
const resultVersion = ref(0)

const { calculate } = useWithholdingTax()

const result = computed(() => {
  if (!hasComputed.value || taxableIncome.value === null) return null
  return calculate(taxableIncome.value, frequency.value)
})

function onSubmit() {
  if (taxableIncome.value !== null && taxableIncome.value >= 0) {
    hasComputed.value = true
    resultVersion.value++
  }
}
</script>

<template>
  <div>
    <form class="m3-card p-5 sm:p-6" @submit.prevent="onSubmit">
      <Md3TextField
        id="taxable-income"
        v-model="taxableIncome"
        label="Taxable income for this pay period (₱)"
        placeholder="e.g. 22000"
        support-text="Gross pay minus your SSS, PhilHealth, and Pag-IBIG employee contributions for the period."
        required
      />

      <div class="mt-6">
        <PayFrequencyToggle v-model="frequency" />
      </div>

      <button v-ripple type="submit" class="m3-btn m3-btn-filled m3-btn-full mt-6">
        Compute withholding tax
      </button>
    </form>

    <Transition name="result-pop" mode="out-in" :duration="{ enter: 320, leave: 120 }">
      <div
        v-if="result"
        :key="resultVersion"
        class="m3-card mt-6 p-5 sm:p-6"
        style="background-color: var(--md-primary-container)"
      >
        <div class="mb-5 text-center">
          <p class="md-body-medium" style="color: var(--md-on-primary-container); opacity: 0.85">
            Withholding tax for this pay period
          </p>
          <p class="md-display-small mt-1 font-medium" style="color: var(--md-on-primary-container)">
            {{ formatCurrency(result.periodTax) }}
          </p>
          <p class="mt-1 md-body-medium" style="color: var(--md-on-primary-container); opacity: 0.7">
            Annualized taxable income: {{ formatCurrency(result.annualTaxableIncome) }}
          </p>
        </div>

        <div
          class="overflow-x-auto rounded-[var(--md-shape-lg)]"
          style="background-color: var(--md-surface-container-lowest); box-shadow: var(--md-elevation-1)"
        >
          <table class="w-full min-w-[360px] text-left text-sm">
            <tbody>
              <tr>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Annual tax bracket</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ (result.bracket.rate * 100).toFixed(0) }}% over
                  {{ formatCurrency(result.bracket.min) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Annual withholding tax</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.annualTax) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)" class="font-semibold">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  Tax for this pay period
                </td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.periodTax) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </div>
</template>
