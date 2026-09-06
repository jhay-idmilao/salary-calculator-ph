<script setup lang="ts">
import type { PayFrequency } from '~/constants/rates2026'

defineProps<{
  modelValue: PayFrequency
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: PayFrequency): void
}>()
</script>

<template>
  <div>
    <span class="md-label-large mb-2 block px-1" style="color: var(--md-on-surface-variant)">
      Pay frequency
    </span>
    <div class="m3-segmented">
      <button
        v-ripple
        type="button"
        class="m3-segment"
        :class="{ 'is-active': modelValue === 'monthly' }"
        :aria-pressed="modelValue === 'monthly'"
        @click="emit('update:modelValue', 'monthly')"
      >
        <svg
          v-if="modelValue === 'monthly'"
          class="m3-segment-check"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Monthly
      </button>
      <button
        v-ripple
        type="button"
        class="m3-segment"
        :class="{ 'is-active': modelValue === 'semi-monthly' }"
        :aria-pressed="modelValue === 'semi-monthly'"
        @click="emit('update:modelValue', 'semi-monthly')"
      >
        <svg
          v-if="modelValue === 'semi-monthly'"
          class="m3-segment-check"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Semi-monthly
      </button>
    </div>
  </div>
</template>
