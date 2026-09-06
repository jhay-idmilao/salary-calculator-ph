<script setup lang="ts">
import type { PayrollResult } from '~/composables/usePayrollCalculator'

const props = defineProps<{
  result: PayrollResult
}>()

const frequencyLabel = computed(() =>
  props.result.frequency === 'monthly' ? 'per month' : 'per semi-monthly cutoff'
)
</script>

<template>
  <div class="m3-card m3-card-elevated p-5 sm:p-6" style="background-color: var(--md-primary-container)">
    <div class="mb-5 flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="md-title-large" style="color: var(--md-on-primary-container)">
        Your take-home pay breakdown
      </h2>
      <span
        class="md-label-large uppercase tracking-wide"
        style="color: var(--md-on-primary-container); opacity: 0.75"
        >{{ frequencyLabel }}</span
      >
    </div>

    <div
      class="mb-6 rounded-[var(--md-shape-lg)] p-5 text-center"
      style="background-color: var(--md-surface-container-lowest); box-shadow: var(--md-elevation-1)"
    >
      <p class="md-body-medium" style="color: var(--md-on-surface-variant)">Net take-home pay</p>
      <p class="md-display-small mt-1 font-medium" style="color: var(--md-primary)">
        {{ formatCurrency(result.netPayPerPeriod) }}
      </p>
      <p class="mt-1 md-body-medium" style="color: var(--md-on-surface-variant)">{{ frequencyLabel }}</p>
    </div>

    <div
      class="overflow-x-auto rounded-[var(--md-shape-lg)]"
      style="background-color: var(--md-surface-container-lowest); box-shadow: var(--md-elevation-1)"
    >
      <table class="w-full min-w-[420px] text-left text-sm">
        <thead
          class="md-label-large uppercase tracking-wide"
          style="color: var(--md-on-surface-variant); background-color: var(--md-surface-container-low)"
        >
          <tr>
            <th class="px-4 py-3 font-semibold">Deduction</th>
            <th class="px-4 py-3 font-semibold">Employee share</th>
            <th class="px-4 py-3 font-semibold">Employer share</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-top: 1px solid var(--md-outline-variant)">
            <td class="px-4 py-3">
              <span class="font-medium" style="color: var(--md-on-surface)">SSS</span>
              <span class="block md-body-medium" style="color: var(--md-on-surface-variant)"
                >MSC: {{ formatCurrency(result.sss.msc) }}</span
              >
            </td>
            <td class="px-4 py-3" style="color: var(--md-on-surface)">
              {{ formatCurrency(result.sss.employeeShare) }}
            </td>
            <td class="px-4 py-3" style="color: var(--md-on-surface)">
              {{ formatCurrency(result.sss.totalEmployerShare) }}
              <span class="block md-body-medium" style="color: var(--md-on-surface-variant)"
                >incl. ₱{{ result.sss.employerEcContribution }} EC</span
              >
            </td>
          </tr>
          <tr style="border-top: 1px solid var(--md-outline-variant)">
            <td class="px-4 py-3 font-medium" style="color: var(--md-on-surface)">PhilHealth</td>
            <td class="px-4 py-3" style="color: var(--md-on-surface)">
              {{ formatCurrency(result.philhealth.employeeShare) }}
            </td>
            <td class="px-4 py-3" style="color: var(--md-on-surface)">
              {{ formatCurrency(result.philhealth.employerShare) }}
            </td>
          </tr>
          <tr style="border-top: 1px solid var(--md-outline-variant)">
            <td class="px-4 py-3 font-medium" style="color: var(--md-on-surface)">Pag-IBIG</td>
            <td class="px-4 py-3" style="color: var(--md-on-surface)">
              {{ formatCurrency(result.pagibig.employeeShare) }}
            </td>
            <td class="px-4 py-3" style="color: var(--md-on-surface)">
              {{ formatCurrency(result.pagibig.employerShare) }}
            </td>
          </tr>
          <tr style="border-top: 1px solid var(--md-outline-variant)">
            <td class="px-4 py-3 font-medium" style="color: var(--md-on-surface)">
              BIR withholding tax
              <span class="block md-body-medium" style="color: var(--md-on-surface-variant)">
                annual taxable income: {{ formatCurrency(result.withholdingTax.annualTaxableIncome) }}
              </span>
            </td>
            <td class="px-4 py-3" style="color: var(--md-on-surface)">
              {{ formatCurrency(result.withholdingTax.periodTax) }}
            </td>
            <td class="px-4 py-3" style="color: var(--md-on-surface-variant)">—</td>
          </tr>
        </tbody>
        <tfoot
          class="font-semibold"
          style="color: var(--md-on-surface); background-color: var(--md-surface-container-low); border-top: 1px solid var(--md-outline-variant)"
        >
          <tr>
            <td class="px-4 py-3">Total</td>
            <td class="px-4 py-3">{{ formatCurrency(result.totalEmployeeDeductionsPerPeriod) }}</td>
            <td class="px-4 py-3">{{ formatCurrency(result.totalEmployerContributionsPerMonth) }} / mo</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <p class="mt-4 md-body-medium" style="color: var(--md-on-primary-container); opacity: 0.85">
      Gross {{ frequencyLabel }}:
      <span class="font-medium">{{ formatCurrency(result.grossPerPeriod) }}</span>
      · Statutory contributions are computed on the monthly-equivalent gross of
      <span class="font-medium">{{ formatCurrency(result.monthlyEquivalentGross) }}</span>
      and split evenly across pay periods within the month.
    </p>
  </div>
</template>
