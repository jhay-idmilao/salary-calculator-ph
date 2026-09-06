<script setup lang="ts">
useSeoMeta({
  title: '13th Month Pay Calculator (2026) | Sahod Calculator',
  description:
    'Compute your 13th month pay under DOLE rules and check whether it exceeds the ₱90,000 tax-exempt ceiling.'
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="13th Month Pay Calculator"
      description="Compute your 13th month pay and check the ₱90,000 tax-exempt ceiling."
    />

    <div class="space-y-6">
      <ThirteenthMonthCalculator />

      <AdSlot label="Sponsored" />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="How is 13th month pay computed under DOLE rules?">
          <ThirteenthMonthExplainer />
        </Md3Accordion>
      </div>
    </div>
  </div>
</template>
