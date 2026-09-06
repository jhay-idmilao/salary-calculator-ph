<script setup lang="ts">
defineProps<{
  to: string
  icon: string
  title: string
  description: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    v-ripple
    class="m3-card m3-card-hoverable m3-ripple-host flex items-start gap-4 p-5 focus:outline-none focus-visible:ring-2"
    style="--tw-ring-color: var(--md-primary)"
  >
    <span
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--md-shape-md)] text-2xl"
      style="background-color: var(--md-primary-container)"
      aria-hidden="true"
    >
      {{ icon }}
    </span>
    <span class="min-w-0">
      <h2 class="md-title-medium" style="color: var(--md-on-surface)">{{ title }}</h2>
      <span class="mt-1 block md-body-medium" style="color: var(--md-on-surface-variant)">
        {{ description }}
      </span>
    </span>
  </NuxtLink>
</template>
