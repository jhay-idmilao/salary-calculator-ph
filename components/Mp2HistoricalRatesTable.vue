<script setup lang="ts">
import { MP2_CONFIG, MP2_HISTORICAL_DIVIDEND_RATES, type Mp2HistoricalDividendRate } from '~/constants/rates2026'

type SortMode = 'year' | 'rate'

const sortMode = ref<SortMode>('year')

const RECENT_YEARS_COUNT = 5

const sortedByYearDesc = computed<Mp2HistoricalDividendRate[]>(() =>
  [...MP2_HISTORICAL_DIVIDEND_RATES].sort((a, b) => b.year - a.year)
)

/** The table rows in the currently selected order — latest-first by default. */
const displayedRates = computed<Mp2HistoricalDividendRate[]>(() => {
  if (sortMode.value === 'rate') {
    return [...MP2_HISTORICAL_DIVIDEND_RATES].sort((a, b) => b.rate - a.rate)
  }
  return sortedByYearDesc.value
})

const allYears = computed(() => MP2_HISTORICAL_DIVIDEND_RATES.map((entry) => entry.year))
const allTimeRangeLabel = computed(() => `${Math.min(...allYears.value)}–${Math.max(...allYears.value)}`)

const allTimeAverage = computed(() => {
  const sum = MP2_HISTORICAL_DIVIDEND_RATES.reduce((total, entry) => total + entry.rate, 0)
  return sum / MP2_HISTORICAL_DIVIDEND_RATES.length
})

const recentEntries = computed<Mp2HistoricalDividendRate[]>(() =>
  sortedByYearDesc.value.slice(0, RECENT_YEARS_COUNT)
)

const recentAverage = computed(() => {
  const sum = recentEntries.value.reduce((total: number, entry: Mp2HistoricalDividendRate) => total + entry.rate, 0)
  return sum / recentEntries.value.length
})

const recentRangeLabel = computed(() => {
  const years = recentEntries.value.map((entry: Mp2HistoricalDividendRate) => entry.year)
  return `${Math.min(...years)}–${Math.max(...years)}`
})

/** How the calculator's default projection rate compares to the full history, in plain language. */
const defaultRateComparison = computed(() => {
  const defaultRate = MP2_CONFIG.defaultAnnualDividendRate
  const diff = defaultRate - allTimeAverage.value
  const threshold = 0.0005 // 0.05 percentage points — treat smaller gaps as "about the same"

  if (Math.abs(diff) < threshold) return 'about in line with'
  return diff > 0 ? 'slightly above' : 'slightly below'
})

function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`
}
</script>

<template>
  <div class="m3-card p-5 sm:p-6">
    <h2 class="md-title-large" style="color: var(--md-on-surface)">Historical Dividend Rates</h2>
    <p class="mt-1 md-body-medium" style="color: var(--md-on-surface-variant)">
      MP2 dividend rates declared by the Pag-IBIG Fund Board, {{ allTimeRangeLabel }}. Reference only
      — the projection above uses the rate you enter, not these historical figures.
    </p>

    <div class="mt-4 grid gap-3 sm:grid-cols-2">
      <div class="rounded-[var(--md-shape-md)] p-4" style="background-color: var(--md-surface-container-highest)">
        <p class="md-body-medium" style="color: var(--md-on-surface-variant)">
          {{ allTimeRangeLabel }} average
        </p>
        <p class="md-title-large mt-1" style="color: var(--md-on-surface)">
          {{ formatPercent(allTimeAverage) }}
        </p>
      </div>
      <div class="rounded-[var(--md-shape-md)] p-4" style="background-color: var(--md-surface-container-highest)">
        <p class="md-body-medium" style="color: var(--md-on-surface-variant)">
          Last {{ RECENT_YEARS_COUNT }} years average ({{ recentRangeLabel }})
        </p>
        <p class="md-title-large mt-1" style="color: var(--md-on-surface)">
          {{ formatPercent(recentAverage) }}
        </p>
      </div>
    </div>

    <p class="mt-3 md-body-medium" style="color: var(--md-on-surface-variant)">
      For context: the calculator's default projection rate of
      <strong style="color: var(--md-on-surface)">{{ formatPercent(MP2_CONFIG.defaultAnnualDividendRate) }}</strong>
      is {{ defaultRateComparison }} the {{ allTimeRangeLabel }} average.
    </p>

    <div class="mt-5 flex items-center justify-between gap-3">
      <span class="md-label-large" style="color: var(--md-on-surface-variant)">Sort by</span>
      <div class="m3-segmented" style="width: auto">
        <button
          v-ripple
          type="button"
          class="m3-segment"
          :class="{ 'is-active': sortMode === 'year' }"
          :aria-pressed="sortMode === 'year'"
          @click="sortMode = 'year'"
        >
          <svg v-if="sortMode === 'year'" class="m3-segment-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Latest year
        </button>
        <button
          v-ripple
          type="button"
          class="m3-segment"
          :class="{ 'is-active': sortMode === 'rate' }"
          :aria-pressed="sortMode === 'rate'"
          @click="sortMode = 'rate'"
        >
          <svg v-if="sortMode === 'rate'" class="m3-segment-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Highest rate
        </button>
      </div>
    </div>

    <div
      class="mt-3 overflow-x-auto rounded-[var(--md-shape-lg)]"
      style="background-color: var(--md-surface-container-lowest); box-shadow: var(--md-elevation-1)"
    >
      <table class="w-full min-w-[280px] text-left text-sm">
        <thead
          class="md-label-large uppercase tracking-wide"
          style="color: var(--md-on-surface-variant); background-color: var(--md-surface-container-low)"
        >
          <tr>
            <th class="px-4 py-2 font-semibold">Year</th>
            <th class="px-4 py-2 font-semibold">Dividend rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in displayedRates" :key="entry.year" style="border-top: 1px solid var(--md-outline-variant)">
            <td class="px-4 py-2" style="color: var(--md-on-surface)">{{ entry.year }}</td>
            <td class="px-4 py-2" style="color: var(--md-on-surface)">
              {{ formatPercent(entry.rate) }}
              <sup
                v-if="entry.year === 2021"
                title="Unverified — public sources vary between 5.79% and 6.00% for 2021."
                style="color: var(--md-warning); cursor: help"
                >*</sup
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mt-3 md-body-medium" style="color: var(--md-on-surface-variant)">
      * The 2021 rate is unverified — public sources report figures ranging from 5.79% to 6.00%.
      Confirm against Pag-IBIG's official dividend rate announcement before relying on it.
    </p>
  </div>
</template>
