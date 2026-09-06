<script setup lang="ts">
import { RATES_DISCLAIMER, RATES_YEAR } from '~/constants/rates2026'
</script>

<template>
  <p class="text-xs leading-relaxed text-slate-400">
    <span class="font-semibold text-slate-500">{{ RATES_YEAR }} rates disclaimer:</span>
    {{ RATES_DISCLAIMER }}
  </p>
</template>
