<script setup lang="ts">
import { RATES_YEAR } from '~/constants/rates2026'
</script>

<template>
  <p>
    PhilHealth (the Philippine Health Insurance Corporation) provides subsidized health insurance
    coverage to Filipino workers and their dependents. Contributions are shared equally between
    employee and employer and go toward hospitalization and other covered medical benefits.
  </p>
  <p>
    For {{ RATES_YEAR }}, the PhilHealth premium rate is 5% of monthly basic salary, split 2.5%
    employee / 2.5% employer. There's a salary floor of ₱10,000 — meaning even if you earn less,
    your contribution is computed as if you earned ₱10,000 — and a ceiling of ₱100,000, above which
    the contribution is capped at ₱2,500 per side (₱5,000 total).
  </p>
</template>
