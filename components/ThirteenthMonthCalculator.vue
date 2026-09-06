<script setup lang="ts">
import { THIRTEENTH_MONTH_CONFIG } from '~/constants/rates2026'

const totalBasicSalary = ref<number | null>(null)
const otherBenefits = ref<number | null>(null)
const hasComputed = ref(false)

const { calculate } = use13thMonthPay()

const result = computed(() => {
  if (!hasComputed.value || totalBasicSalary.value === null) return null
  return calculate(totalBasicSalary.value, otherBenefits.value ?? 0)
})

function onSubmit() {
  hasComputed.value = true
}
</script>

<template>
  <div id="13th-month-calculator" class="card scroll-mt-20">
    <h2 class="mb-1 text-lg font-bold text-slate-900">13th month pay calculator</h2>
    <p class="mb-5 text-sm text-slate-500">
      Enter the total <strong>basic salary</strong> you actually earned this year — base pay and paid
      leave only, excluding overtime, night differential, holiday premiums, allowances, and
      discretionary bonuses.
    </p>

    <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="onSubmit">
      <div>
        <label for="total-basic-salary" class="mb-1.5 block text-sm font-semibold text-slate-700">
          Total basic salary earned (Jan–Dec) (₱)
        </label>
        <input
          id="total-basic-salary"
          v-model.number="totalBasicSalary"
          type="number"
          inputmode="decimal"
          min="0"
          step="0.01"
          placeholder="e.g. 240000"
          class="input-field"
          required
        />
      </div>

      <div>
        <label for="other-benefits" class="mb-1.5 block text-sm font-semibold text-slate-700">
          Other similar benefits (₱) <span class="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="other-benefits"
          v-model.number="otherBenefits"
          type="number"
          inputmode="decimal"
          min="0"
          step="0.01"
          placeholder="e.g. Christmas bonus"
          class="input-field"
        />
      </div>

      <div class="sm:col-span-2">
        <button type="submit" class="btn-primary">Compute 13th month pay</button>
      </div>
    </form>

    <div v-if="result" class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <p class="text-sm font-medium text-slate-500">13th month pay</p>
          <p class="mt-1 text-2xl font-extrabold text-brand-700">
            {{ formatCurrency(result.thirteenthMonthPay) }}
          </p>
          <p class="mt-1 text-xs text-slate-400">
            {{ formatCurrency(result.totalBasicSalaryEarned) }} ÷ 12 months
          </p>
        </div>

        <div>
          <p class="text-sm font-medium text-slate-500">Tax status</p>
          <p
            class="mt-1 text-2xl font-extrabold"
            :class="result.isOverTaxExemptCeiling ? 'text-amber-600' : 'text-brand-700'"
          >
            {{ result.isOverTaxExemptCeiling ? 'Partly taxable' : 'Tax-exempt' }}
          </p>
          <p class="mt-1 text-xs text-slate-400">
            Combined tax-exempt ceiling: {{ formatCurrency(THIRTEENTH_MONTH_CONFIG.taxExemptCeiling) }}
          </p>
        </div>
      </div>

      <div v-if="result.isOverTaxExemptCeiling" class="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        <p>
          <span class="font-semibold">{{ formatCurrency(result.taxableAmount) }}</span>
          of your 13th month pay (combined with other similar benefits) is over the
          {{ formatCurrency(THIRTEENTH_MONTH_CONFIG.taxExemptCeiling) }} tax-exempt ceiling and will be
          subject to withholding tax.
        </p>
      </div>
      <div v-else class="mt-4 rounded-lg bg-brand-50 p-4 text-sm text-brand-800">
        <p>Your 13th month pay is fully within the tax-exempt ceiling — no tax will be withheld on it.</p>
      </div>
    </div>
  </div>
</template>
