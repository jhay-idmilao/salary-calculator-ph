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
  <form class="m3-card p-5 sm:p-6" @submit.prevent="onSubmit">
    <div class="mb-6">
      <Md3TextField
        id="gross-salary"
        v-model="grossInput"
        label="Gross salary (₱)"
        placeholder="e.g. 25000"
        support-text="Enter the gross amount for the pay period you select below."
        required
      />
    </div>

    <div class="mb-6">
      <PayFrequencyToggle v-model="frequency" />
    </div>

    <button v-ripple type="submit" class="m3-btn m3-btn-filled m3-btn-full">
      Compute take-home pay
    </button>
  </form>
</template>
