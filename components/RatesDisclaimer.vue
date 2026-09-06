<script setup lang="ts">
import { RATES_DISCLAIMER, RATES_YEAR } from '~/constants/rates2026'
</script>

<template>
  <p class="md-body-medium leading-relaxed" style="color: var(--md-on-surface-variant)">
    <span class="font-semibold" style="color: var(--md-on-surface)">{{ RATES_YEAR }} rates disclaimer:</span>
    {{ RATES_DISCLAIMER }}
  </p>
</template>
