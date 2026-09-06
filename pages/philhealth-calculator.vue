<script setup lang="ts">
useSeoMeta({
  title: 'PhilHealth Contribution Calculator (2026) | Sahod Calculator',
  description:
    'Compute your monthly PhilHealth premium, split between employee and employer, using the 2026 floor and ceiling rules.'
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="PhilHealth Contribution Calculator"
      description="Enter your monthly basic salary to see your PhilHealth premium split."
    />

    <div class="space-y-6">
      <PhilhealthCalculatorCore />

      <AdSlot label="Sponsored" />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is PhilHealth and how are contributions computed?">
          <PhilhealthExplainer />
        </Md3Accordion>
      </div>
    </div>
  </div>
</template>
