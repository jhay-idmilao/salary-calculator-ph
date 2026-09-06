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
  <div class="card border-brand-200 bg-brand-50/40">
    <div class="mb-5 flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="text-lg font-bold text-slate-900">Your take-home pay breakdown</h2>
      <span class="text-xs font-medium uppercase tracking-wide text-slate-500">{{ frequencyLabel }}</span>
    </div>

    <div class="mb-6 rounded-xl bg-white p-5 text-center shadow-sm">
      <p class="text-sm font-medium text-slate-500">Net take-home pay</p>
      <p class="mt-1 text-3xl font-extrabold text-brand-700 sm:text-4xl">
        {{ formatCurrency(result.netPayPerPeriod) }}
      </p>
      <p class="mt-1 text-xs text-slate-400">{{ frequencyLabel }}</p>
    </div>

    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="w-full min-w-[420px] text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3 font-semibold">Deduction</th>
            <th class="px-4 py-3 font-semibold">Employee share</th>
            <th class="px-4 py-3 font-semibold">Employer share</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr>
            <td class="px-4 py-3">
              <span class="font-medium text-slate-800">SSS</span>
              <span class="block text-xs text-slate-400">MSC: {{ formatCurrency(result.sss.msc) }}</span>
            </td>
            <td class="px-4 py-3 text-slate-700">{{ formatCurrency(result.sss.employeeShare) }}</td>
            <td class="px-4 py-3 text-slate-700">
              {{ formatCurrency(result.sss.totalEmployerShare) }}
              <span class="block text-xs text-slate-400">incl. ₱{{ result.sss.employerEcContribution }} EC</span>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-medium text-slate-800">PhilHealth</td>
            <td class="px-4 py-3 text-slate-700">{{ formatCurrency(result.philhealth.employeeShare) }}</td>
            <td class="px-4 py-3 text-slate-700">{{ formatCurrency(result.philhealth.employerShare) }}</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-medium text-slate-800">Pag-IBIG</td>
            <td class="px-4 py-3 text-slate-700">{{ formatCurrency(result.pagibig.employeeShare) }}</td>
            <td class="px-4 py-3 text-slate-700">{{ formatCurrency(result.pagibig.employerShare) }}</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-medium text-slate-800">
              BIR withholding tax
              <span class="block text-xs text-slate-400">
                annual taxable income: {{ formatCurrency(result.withholdingTax.annualTaxableIncome) }}
              </span>
            </td>
            <td class="px-4 py-3 text-slate-700">{{ formatCurrency(result.withholdingTax.periodTax) }}</td>
            <td class="px-4 py-3 text-slate-400">—</td>
          </tr>
        </tbody>
        <tfoot class="border-t border-slate-200 bg-slate-50 font-semibold text-slate-800">
          <tr>
            <td class="px-4 py-3">Total</td>
            <td class="px-4 py-3">{{ formatCurrency(result.totalEmployeeDeductionsPerPeriod) }}</td>
            <td class="px-4 py-3">{{ formatCurrency(result.totalEmployerContributionsPerMonth) }} / mo</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <p class="mt-4 text-xs leading-relaxed text-slate-500">
      Gross {{ frequencyLabel }}: <span class="font-medium text-slate-700">{{ formatCurrency(result.grossPerPeriod) }}</span>
      · Statutory contributions are computed on the monthly-equivalent gross of
      <span class="font-medium text-slate-700">{{ formatCurrency(result.monthlyEquivalentGross) }}</span>
      and split evenly across pay periods within the month.
    </p>
  </div>
</template>
