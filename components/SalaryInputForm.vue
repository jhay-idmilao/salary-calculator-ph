<script setup lang="ts">
import type { PayFrequency } from '~/constants/rates2026'

const props = defineProps<{
  modelValueGross: number | null
  modelValueFrequency: PayFrequency
}>()

const emit = defineEmits<{
  (e: 'update:modelValueGross', value: number | null): void
  (e: 'update:modelValueFrequency', value: PayFrequency): void
  (e: 'compute'): void
}>()

const grossInput = computed({
  get: () => props.modelValueGross,
  set: (value: number | null) => emit('update:modelValueGross', value)
})

const frequency = computed({
  get: () => props.modelValueFrequency,
  set: (value: PayFrequency) => emit('update:modelValueFrequency', value)
})

function onSubmit() {
  emit('compute')
}
</script>

<template>
  <form class="card" @submit.prevent="onSubmit">
    <div class="mb-5">
      <label for="gross-salary" class="mb-1.5 block text-sm font-semibold text-slate-700">
        Gross salary (₱)
      </label>
      <input
        id="gross-salary"
        v-model.number="grossInput"
        type="number"
        inputmode="decimal"
        min="0"
        step="0.01"
        placeholder="e.g. 25000"
        class="input-field"
        required
      />
      <p class="mt-1.5 text-xs text-slate-500">
        Enter the gross amount for the pay period you select below.
      </p>
    </div>

    <div class="mb-6">
      <span class="mb-1.5 block text-sm font-semibold text-slate-700">Pay frequency</span>
      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="rounded-xl border px-4 py-3 text-sm font-semibold transition"
          :class="
            frequency === 'monthly'
              ? 'border-brand-600 bg-brand-50 text-brand-700'
              : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
          "
          @click="frequency = 'monthly'"
        >
          Monthly
        </button>
        <button
          type="button"
          class="rounded-xl border px-4 py-3 text-sm font-semibold transition"
          :class="
            frequency === 'semi-monthly'
              ? 'border-brand-600 bg-brand-50 text-brand-700'
              : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
          "
          @click="frequency = 'semi-monthly'"
        >
          Semi-monthly
        </button>
      </div>
    </div>

    <button type="submit" class="btn-primary">Compute take-home pay</button>
  </form>
</template>
