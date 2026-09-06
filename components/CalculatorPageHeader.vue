<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="mb-6">
    <NuxtLink
      to="/"
      class="md-label-large inline-flex items-center gap-1.5 rounded-[var(--md-shape-sm)] py-1 focus:outline-none focus-visible:ring-2"
      style="color: var(--md-primary); --tw-ring-color: var(--md-primary)"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19 12H5m0 0l6-6m-6 6l6 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Back to all tools
    </NuxtLink>

    <h1 class="md-headline-medium mt-3 font-medium" style="color: var(--md-on-background)">
      {{ title }}
    </h1>
    <p v-if="description" class="mt-1.5 md-body-medium" style="color: var(--md-on-surface-variant)">
      {{ description }}
    </p>
  </div>
</template>
