<script setup lang="ts">
const monthlyBasicSalary = ref<number | null>(null)
const hasComputed = ref(false)
const resultVersion = ref(0)

const { calculate } = usePhilhealthCalculator()

const result = computed(() => {
  if (!hasComputed.value || monthlyBasicSalary.value === null) return null
  return calculate(monthlyBasicSalary.value)
})

function onSubmit() {
  if (monthlyBasicSalary.value !== null && monthlyBasicSalary.value >= 0) {
    hasComputed.value = true
    resultVersion.value++
  }
}
</script>

<template>
  <div>
    <form class="m3-card p-5 sm:p-6" @submit.prevent="onSubmit">
      <Md3TextField
        id="philhealth-monthly-salary"
        v-model="monthlyBasicSalary"
        label="Monthly basic salary (₱)"
        placeholder="e.g. 25000"
        support-text="Floored at ₱10,000 and capped at ₱100,000 for contribution purposes."
        required
      />

      <button v-ripple type="submit" class="m3-btn m3-btn-filled m3-btn-full mt-6">
        Compute PhilHealth contribution
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
            Total monthly PhilHealth contribution
          </p>
          <p class="md-display-small mt-1 font-medium" style="color: var(--md-on-primary-container)">
            {{ formatCurrency(result.totalContribution) }}
          </p>
          <p class="mt-1 md-body-medium" style="color: var(--md-on-primary-container); opacity: 0.7">
            Contribution base: {{ formatCurrency(result.contributionBase) }}
          </p>
        </div>

        <div
          class="overflow-x-auto rounded-[var(--md-shape-lg)]"
          style="background-color: var(--md-surface-container-lowest); box-shadow: var(--md-elevation-1)"
        >
          <table class="w-full min-w-[360px] text-left text-sm">
            <thead
              class="md-label-large uppercase tracking-wide"
              style="color: var(--md-on-surface-variant); background-color: var(--md-surface-container-low)"
            >
              <tr>
                <th class="px-4 py-3 font-semibold"></th>
                <th class="px-4 py-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-top: 1px solid var(--md-outline-variant)">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Employee share (2.5%)</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.employeeShare) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Employer share (2.5%)</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.employerShare) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </div>
</template>
