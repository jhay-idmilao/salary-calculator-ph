<script setup lang="ts">
useSeoMeta({
  title: 'SSS Contribution Calculator (2026) | Sahod Calculator',
  description:
    'Compute your SSS Monthly Salary Credit and employee/employer contribution, including the Employees’ Compensation (EC) add-on, using 2026 rates.'
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="SSS Contribution Calculator"
      description="Enter your monthly compensation to see your SSS Monthly Salary Credit and contribution split."
    />

    <div class="space-y-6">
      <SssCalculatorCore />

      <AdSlot label="Sponsored" />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is SSS and how are contributions computed?">
          <SssExplainer />
        </Md3Accordion>
      </div>
    </div>
  </div>
</template>
