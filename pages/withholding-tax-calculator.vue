<script setup lang="ts">
useSeoMeta({
  title: 'BIR Withholding Tax Calculator (2026) | Sahod Calculator',
  description:
    'Compute your BIR withholding tax for a pay period from your taxable income, using the TRAIN law annual tax brackets.'
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="BIR Withholding Tax Calculator"
      description="Check just your withholding tax for a pay period, without a full salary breakdown."
    />

    <div class="space-y-6">
      <WithholdingTaxCalculatorCore />

      <AdSlot label="Sponsored" />

      <div class="m3-card p-2 sm:p-3">
        <Md3Accordion title="What is BIR withholding tax and how is it computed?">
          <WithholdingTaxExplainer />
        </Md3Accordion>
      </div>
    </div>
  </div>
</template>
