<script setup lang="ts">
useSeoMeta({
  title: 'Pag-IBIG MP2 Savings Calculator (2026) | Sahod Calculator',
  description:
    'Project your Pag-IBIG MP2 voluntary savings — total contributions, projected dividends, and total savings at maturity — using an editable dividend rate.'
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="Pag-IBIG MP2 Savings Calculator"
      description="Project your MP2 contributions, dividends, and total savings at maturity."
    />

    <div class="space-y-6">
      <Mp2CalculatorCore />

      <AdSlot label="Sponsored" />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is Pag-IBIG MP2 and how are dividends computed?">
          <Mp2Explainer />
        </Md3Accordion>
      </div>
    </div>
  </div>
</template>
