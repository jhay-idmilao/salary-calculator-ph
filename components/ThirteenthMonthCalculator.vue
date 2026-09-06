<script setup lang="ts">
import { THIRTEENTH_MONTH_CONFIG } from '~/constants/rates2026'

const totalBasicSalary = ref<number | null>(null)
const otherBenefits = ref<number | null>(null)
const hasComputed = ref(false)
const resultVersion = ref(0)

const { calculate } = use13thMonthPay()

const result = computed(() => {
  if (!hasComputed.value || totalBasicSalary.value === null) return null
  return calculate(totalBasicSalary.value, otherBenefits.value ?? 0)
})

function onSubmit() {
  hasComputed.value = true
  resultVersion.value++
}
</script>

<template>
  <div>
    <form class="m3-card p-5 sm:p-6" @submit.prevent="onSubmit">
      <h2 class="md-title-large mb-1" style="color: var(--md-on-surface)">13th month pay calculator</h2>
      <p class="mb-5 md-body-medium" style="color: var(--md-on-surface-variant)">
        Enter the total <strong style="color: var(--md-on-surface)">basic salary</strong> you actually
        earned this year — base pay and paid leave only, excluding overtime, night differential,
        holiday premiums, allowances, and discretionary bonuses.
      </p>

      <div class="grid gap-4">
        <Md3TextField
          id="total-basic-salary"
          v-model="totalBasicSalary"
          label="Total basic salary earned (Jan–Dec) (₱)"
          placeholder="e.g. 240000"
          required
        />

        <Md3TextField
          id="other-benefits"
          v-model="otherBenefits"
          label="Other similar benefits (₱) — optional"
          placeholder="e.g. Christmas bonus"
        />
      </div>

      <button v-ripple type="submit" class="m3-btn m3-btn-filled m3-btn-full mt-6">
        Compute 13th month pay
      </button>
    </form>

    <Transition name="result-pop" mode="out-in" :duration="{ enter: 320, leave: 120 }">
      <div
        v-if="result"
        :key="resultVersion"
        class="m3-card mt-6 p-5"
        style="background-color: var(--md-tertiary-container)"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <p class="md-body-medium" style="color: var(--md-on-tertiary-container); opacity: 0.85">
              13th month pay
            </p>
            <p class="md-headline-medium mt-1 font-medium" style="color: var(--md-on-tertiary-container)">
              {{ formatCurrency(result.thirteenthMonthPay) }}
            </p>
            <p class="mt-1 md-body-medium" style="color: var(--md-on-tertiary-container); opacity: 0.7">
              {{ formatCurrency(result.totalBasicSalaryEarned) }} ÷ 12 months
            </p>
          </div>

          <div>
            <p class="md-body-medium" style="color: var(--md-on-tertiary-container); opacity: 0.85">
              Tax status
            </p>
            <p
              class="md-headline-medium mt-1 font-medium"
              :style="{ color: result.isOverTaxExemptCeiling ? 'var(--md-warning)' : 'var(--md-on-tertiary-container)' }"
            >
              {{ result.isOverTaxExemptCeiling ? 'Partly taxable' : 'Tax-exempt' }}
            </p>
            <p class="mt-1 md-body-medium" style="color: var(--md-on-tertiary-container); opacity: 0.7">
              Combined tax-exempt ceiling: {{ formatCurrency(THIRTEENTH_MONTH_CONFIG.taxExemptCeiling) }}
            </p>
          </div>
        </div>

        <div
          v-if="result.isOverTaxExemptCeiling"
          class="mt-4 rounded-[var(--md-shape-md)] p-4 md-body-medium"
          style="background-color: var(--md-warning-container); color: var(--md-on-warning-container)"
        >
          <p>
            <span class="font-semibold">{{ formatCurrency(result.taxableAmount) }}</span>
            of your 13th month pay (combined with other similar benefits) is over the
            {{ formatCurrency(THIRTEENTH_MONTH_CONFIG.taxExemptCeiling) }} tax-exempt ceiling and will be
            subject to withholding tax.
          </p>
        </div>
        <div
          v-else
          class="mt-4 rounded-[var(--md-shape-md)] p-4 md-body-medium"
          style="background-color: var(--md-surface-container-lowest); color: var(--md-on-surface)"
        >
          <p>Your 13th month pay is fully within the tax-exempt ceiling — no tax will be withheld on it.</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
