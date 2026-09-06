<script setup lang="ts">
const monthlyCompensation = ref<number | null>(null)
const hasComputed = ref(false)
const resultVersion = ref(0)

const { calculate } = useSssCalculator()

const result = computed(() => {
  if (!hasComputed.value || monthlyCompensation.value === null) return null
  return calculate(monthlyCompensation.value)
})

function onSubmit() {
  if (monthlyCompensation.value !== null && monthlyCompensation.value >= 0) {
    hasComputed.value = true
    resultVersion.value++
  }
}
</script>

<template>
  <div>
    <form class="m3-card p-5 sm:p-6" @submit.prevent="onSubmit">
      <Md3TextField
        id="sss-monthly-compensation"
        v-model="monthlyCompensation"
        label="Monthly compensation (₱)"
        placeholder="e.g. 25000"
        support-text="Your gross monthly salary — this is matched to an SSS Monthly Salary Credit bracket."
        required
      />

      <button v-ripple type="submit" class="m3-btn m3-btn-filled m3-btn-full mt-6">
        Compute SSS contribution
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
            Total monthly SSS contribution
          </p>
          <p class="md-display-small mt-1 font-medium" style="color: var(--md-on-primary-container)">
            {{ formatCurrency(result.totalContribution) }}
          </p>
          <p class="mt-1 md-body-medium" style="color: var(--md-on-primary-container); opacity: 0.7">
            Monthly Salary Credit (MSC): {{ formatCurrency(result.msc) }}
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
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Employee share (5%)</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.employeeShare) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Employer share (10%)</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.employerShare) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  Employer EC contribution
                </td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.employerEcContribution) }}
                </td>
              </tr>
              <tr style="border-top: 1px solid var(--md-outline-variant)" class="font-semibold">
                <td class="px-4 py-3" style="color: var(--md-on-surface)">Total employer share</td>
                <td class="px-4 py-3" style="color: var(--md-on-surface)">
                  {{ formatCurrency(result.totalEmployerShare) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </div>
</template>
