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
  <h3 class="md-title-medium">Enrollment and payment</h3>
  <p>
    Employees give their permanent PhilHealth Identification Number to the employer. The employer
    deducts the employee share, adds the employer share, and reports and remits both through
    PhilHealth's employer system. Check your Member Data Record and contribution history so missing
    postings or dependent details can be corrected before you need a benefit.
  </p>
  <p>
    If you leave employment for self-employment, update your category to Self-Earning Individual and
    declare your monthly income rather than applying for a new PIN. Covered self-paying members
    generate a Statement of Premium Account before paying through the Member Portal or an accredited
    collection channel. Payment frequency and treatment of missed premiums follow current
    PhilHealth circulars, so verify gaps directly with PhilHealth.
  </p>
  <h3 class="md-title-medium">What the premium covers</h3>
  <p>
    Membership can support covered inpatient, outpatient, and primary-care packages for you and
    qualified dependents. Benefits are subject to the applicable package, accredited provider, and
    agency rules; the premium estimate above does not guarantee that a particular hospital bill or
    procedure will be paid in full.
  </p>
</template>
