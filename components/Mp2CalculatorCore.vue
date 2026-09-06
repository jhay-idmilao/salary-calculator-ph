<script setup lang="ts">
import { MP2_CONFIG, MP2_DIVIDEND_DISCLAIMER } from '~/constants/rates2026'
import type { Mp2ContributionEntry } from '~/composables/useMp2Calculator'

type Mode = 'regular' | 'flexible'

const mode = ref<Mode>('regular')

// Shared across both modes.
// Rounded to avoid floating-point noise (0.07 * 100 !== exactly 7 in JS).
const annualDividendRatePercent = ref<number | null>(
  Math.round(MP2_CONFIG.defaultAnnualDividendRate * 10000) / 100
)

// Regular mode.
const monthlyContribution = ref<number | null>(null)
const years = ref<number | null>(MP2_CONFIG.lockInYears)

// Flexible mode.
const baseMonthlyAmount = ref<number | null>(null)
interface EntryRow {
  month: number | null
  amount: number | null
}
const entries = ref<EntryRow[]>([{ month: null, amount: null }])

function addEntry() {
  entries.value.push({ month: null, amount: null })
}

function removeEntry(index: number) {
  entries.value.splice(index, 1)
}

const flexibleTermMonths = computed(() => MP2_CONFIG.lockInYears * 12)

/** Running total of everything currently in the flexible-mode list, live as it's built. */
const runningListTotal = computed(() =>
  entries.value.reduce((sum, entry) => sum + (entry.amount ?? 0), 0)
)

const hasComputed = ref(false)
const resultVersion = ref(0)

const { calculate, calculateFromEntries } = useMp2Calculator()

const validEntries = computed<Mp2ContributionEntry[]>(() =>
  entries.value
    .filter((entry) => entry.month !== null && entry.amount !== null && entry.amount > 0)
    .map((entry) => ({ month: entry.month as number, amount: entry.amount as number }))
)

const result = computed(() => {
  if (!hasComputed.value || annualDividendRatePercent.value === null) return null
  const rate = annualDividendRatePercent.value / 100

  if (mode.value === 'regular') {
    if (monthlyContribution.value === null || years.value === null) return null
    return calculate(monthlyContribution.value, years.value, rate)
  }

  return calculateFromEntries(validEntries.value, rate, {
    baseMonthlyAmount: baseMonthlyAmount.value ?? 0,
    termYears: MP2_CONFIG.lockInYears
  })
})

function onSubmit() {
  if (annualDividendRatePercent.value === null || annualDividendRatePercent.value < 0) return

  if (mode.value === 'regular') {
    if (
      monthlyContribution.value !== null &&
      monthlyContribution.value >= 0 &&
      years.value !== null &&
      years.value > 0
    ) {
      hasComputed.value = true
      resultVersion.value++
    }
    return
  }

  const hasBase = (baseMonthlyAmount.value ?? 0) > 0
  if (hasBase || validEntries.value.length > 0) {
    hasComputed.value = true
    resultVersion.value++
  }
}

// Switching modes starts fresh — a result from one mode shouldn't linger
// under the other mode's form.
watch(mode, () => {
  hasComputed.value = false
})
</script>

<template>
  <div>
    <!-- Mode toggle — at the top of the screen, above the form itself -->
    <div class="mb-4 m3-segmented">
      <button
        v-ripple
        type="button"
        class="m3-segment"
        :class="{ 'is-active': mode === 'regular' }"
        :aria-pressed="mode === 'regular'"
        @click="mode = 'regular'"
      >
        <svg v-if="mode === 'regular'" class="m3-segment-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Regular
      </button>
      <button
        v-ripple
        type="button"
        class="m3-segment"
        :class="{ 'is-active': mode === 'flexible' }"
        :aria-pressed="mode === 'flexible'"
        @click="mode = 'flexible'"
      >
        <svg v-if="mode === 'flexible'" class="m3-segment-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Flexible
      </button>
    </div>

    <form class="m3-card p-5 sm:p-6" @submit.prevent="onSubmit">
      <!-- Regular mode: fixed monthly amount + years (unchanged behavior) -->
      <div v-if="mode === 'regular'" class="grid gap-4">
        <p class="md-body-medium -mt-1" style="color: var(--md-on-surface-variant)">
          A fixed amount every month for a set number of years.
        </p>
        <Md3TextField
          id="mp2-monthly-contribution"
          v-model="monthlyContribution"
          label="Monthly MP2 contribution (₱)"
          placeholder="e.g. 1000"
          :min="MP2_CONFIG.minMonthlyContribution"
          :support-text="`Minimum ₱${MP2_CONFIG.minMonthlyContribution}/month — no upper limit.`"
          required
        />

        <Md3TextField
          id="mp2-years"
          v-model="years"
          label="Number of years"
          step="1"
          :min="1"
          :support-text="`MP2 has a ${MP2_CONFIG.lockInYears}-year lock-in per enrollment; you can re-enroll after maturity.`"
          required
        />
      </div>

      <!-- Flexible mode: a base amount (optional) + a self-built list of contributions -->
      <div v-else class="grid gap-4">
        <p class="md-body-medium -mt-1" style="color: var(--md-on-surface-variant)">
          Build your own schedule over the {{ MP2_CONFIG.lockInYears }}-year term — skip months,
          use different amounts, or drop in one-off lump sums (like a bonus).
        </p>

        <Md3TextField
          id="mp2-base-amount"
          v-model="baseMonthlyAmount"
          label="Base monthly amount (₱) — optional"
          placeholder="e.g. 500"
          :min="0"
          :support-text="`Optional shortcut — applied to every month of the ${MP2_CONFIG.lockInYears}-year term. Leave blank to build your schedule entirely from the list below.`"
        />

        <div>
          <p class="md-label-large mb-2 block px-1" style="color: var(--md-on-surface-variant)">
            Extra or one-off contributions
          </p>

          <div class="space-y-3">
            <div
              v-for="(entry, index) in entries"
              :key="index"
              class="grid grid-cols-[1fr_1fr_auto] items-start gap-2"
            >
              <Md3TextField
                :id="`mp2-entry-month-${index}`"
                v-model="entry.month"
                label="Month #"
                step="1"
                :min="1"
              />
              <Md3TextField
                :id="`mp2-entry-amount-${index}`"
                v-model="entry.amount"
                label="Amount (₱)"
                :min="0"
              />
              <button
                v-ripple
                type="button"
                class="m3-btn m3-btn-outlined"
                style="width: 3.5rem; height: 3.5rem; padding: 0"
                aria-label="Remove this contribution"
                @click="removeEntry(index)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p class="mt-2 px-1 md-body-medium" style="color: var(--md-on-surface-variant)">
            Month # is the month of your {{ MP2_CONFIG.lockInYears }}-year term (1–{{ flexibleTermMonths }}),
            e.g. 7 for the 7th month since you enrolled. Add a row for every extra or one-off
            contribution — skip any month you didn't contribute by simply not adding a row for it.
          </p>

          <button v-ripple type="button" class="m3-btn m3-btn-tonal mt-3" @click="addEntry">
            + Add contribution
          </button>
        </div>

        <div
          class="flex items-center justify-between rounded-[var(--md-shape-md)] px-4 py-3"
          style="background-color: var(--md-surface-container-highest)"
        >
          <span class="md-body-medium" style="color: var(--md-on-surface-variant)">
            Running total from your list
          </span>
          <span class="md-title-medium" style="color: var(--md-on-surface)">
            {{ formatCurrency(runningListTotal) }}
          </span>
        </div>
      </div>

      <div class="mt-6">
        <Md3TextField
          id="mp2-dividend-rate"
          v-model="annualDividendRatePercent"
          label="Assumed annual dividend rate (%)"
          step="0.01"
          :min="0"
          support-text="Editable — MP2 dividends are not guaranteed and vary year to year."
          required
        />
      </div>

      <button v-ripple type="submit" class="m3-btn m3-btn-filled m3-btn-full mt-6">
        Compute projected savings
      </button>
    </form>

    <Transition name="result-pop" mode="out-in" :duration="{ enter: 320, leave: 120 }">
      <div
        v-if="result"
        :key="resultVersion"
        class="m3-card mt-6 p-5 sm:p-6"
        style="background-color: var(--md-tertiary-container)"
      >
        <div class="mb-5 text-center">
          <p class="md-body-medium" style="color: var(--md-on-tertiary-container); opacity: 0.85">
            Total projected savings at maturity
          </p>
          <p class="md-display-small mt-1 font-medium" style="color: var(--md-on-tertiary-container)">
            {{ formatCurrency(result.maturityValue) }}
          </p>
        </div>

        <div
          class="overflow-x-auto rounded-[var(--md-shape-lg)]"
          style="background-color: var(--md-surface-container-lowest); box-shadow: var(--md-elevation-1)"
        >
          <table class="w-full min-w-[360px] text-left text-sm">
            <tbody>
              <tr>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Total contributions</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.totalContributions) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  Projected dividends
                </td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.totalDividends) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)" class="font-semibold">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Total at maturity</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.maturityValue) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="result.yearlyBreakdown.length"
          class="mt-4 overflow-x-auto rounded-[var(--md-shape-lg)]"
          style="background-color: var(--md-surface-container-lowest); box-shadow: var(--md-elevation-1)"
        >
          <table class="w-full min-w-[420px] text-left text-sm">
            <thead
              class="md-label-large uppercase tracking-wide"
              style="color: var(--md-on-surface-variant); background-color: var(--md-surface-container-low)"
            >
              <tr>
                <th class="px-4 py-2 font-semibold">Year</th>
                <th class="px-4 py-2 font-semibold">Contributions</th>
                <th class="px-4 py-2 font-semibold">Dividend</th>
                <th class="px-4 py-2 font-semibold">Ending balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in result.yearlyBreakdown" :key="row.year" style="border-top: 1px solid var(--md-outline-variant)">
                <td class="px-4 py-2" style="color: var(--md-on-surface)">{{ row.year }}</td>
                <td class="px-4 py-2" style="color: var(--md-on-surface)">{{ formatCurrency(row.contributions) }}</td>
                <td class="px-4 py-2" style="color: var(--md-on-surface)">{{ formatCurrency(row.dividend) }}</td>
                <td class="px-4 py-2" style="color: var(--md-on-surface)">{{ formatCurrency(row.endingBalance) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-4 md-body-medium" style="color: var(--md-on-tertiary-container); opacity: 0.85">
          {{ MP2_DIVIDEND_DISCLAIMER }}
        </p>
      </div>
    </Transition>
  </div>
</template>
