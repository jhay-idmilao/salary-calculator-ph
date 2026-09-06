<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Show the "Sahod Calculator" wordmark next to the mark. */
    withWordmark?: boolean
  }>(),
  {
    withWordmark: true
  }
)
</script>

<template>
  <span class="inline-flex items-center gap-2">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
      class="shrink-0"
    >
      <rect width="32" height="32" rx="9" fill="var(--md-primary)" />
      <text
        x="16"
        y="22.5"
        text-anchor="middle"
        font-family="Roboto, Arial, sans-serif"
        font-size="18"
        font-weight="700"
        fill="var(--md-on-primary)"
      >₱</text>
    </svg>
    <span v-if="withWordmark" class="md-title-large font-medium" style="color: var(--md-on-background)">
      Sahod Calculator
    </span>
  </span>
</template>
