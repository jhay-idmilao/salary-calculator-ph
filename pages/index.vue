<script setup lang="ts">
useSeoMeta({
  title: 'Sahod Calculator — Free PH Payroll & Government Contribution Calculators (2026)',
  description:
    'Free Philippine payroll tools: take-home pay, 13th month pay, SSS, PhilHealth, Pag-IBIG MP2, and BIR withholding tax calculators, plus a plain-language guide to your government benefits.',
  ogTitle: 'Sahod Calculator — Free PH Payroll Tools',
  ogDescription:
    'A hub of free calculators for Filipino employees: take-home pay, 13th month pay, SSS, PhilHealth, Pag-IBIG MP2, and BIR withholding tax.'
})

interface Tool {
  to: string
  icon: string
  title: string
  description: string
}

const tools: Tool[] = [
  {
    to: '/salary-calculator',
    icon: '💵',
    title: 'Salary Calculator',
    description: 'Gross salary → SSS, PhilHealth, Pag-IBIG, withholding tax, and net take-home pay.'
  },
  {
    to: '/13th-month-pay',
    icon: '🎁',
    title: '13th Month Pay Calculator',
    description: 'Compute your 13th month pay and check the ₱90,000 tax-exempt ceiling.'
  },
  {
    to: '/sss-calculator',
    icon: '🛡️',
    title: 'SSS Contribution Calculator',
    description: 'Look up your Monthly Salary Credit and SSS employee/employer contribution.'
  },
  {
    to: '/philhealth-calculator',
    icon: '🏥',
    title: 'PhilHealth Contribution Calculator',
    description: 'Compute your PhilHealth premium split between employee and employer.'
  },
  {
    to: '/pagibig-mp2-calculator',
    icon: '💰',
    title: 'Pag-IBIG MP2 Savings Calculator',
    description: 'Project your MP2 voluntary savings, dividends, and total at maturity.'
  },
  {
    to: '/withholding-tax-calculator',
    icon: '🧾',
    title: 'BIR Withholding Tax Calculator',
    description: 'Check just your withholding tax for a pay period, without a full breakdown.'
  },
  {
    to: '/guide',
    icon: '📘',
    title: 'Government Benefits Guide',
    description: "Plain-language guide to what SSS, PhilHealth, and Pag-IBIG actually get you."
  }
]
</script>

<template>
  <div>
    <!-- Minimal hero — kept short so it never competes with the tool cards below -->
    <div class="px-4 pb-2 pt-8 text-center sm:pt-10">
      <h1 class="md-headline-medium font-medium" style="color: var(--md-on-background)">
        Free calculators for Filipino employees
      </h1>
      <p class="mx-auto mt-1.5 max-w-md md-body-medium" style="color: var(--md-on-surface-variant)">
        Pick a tool below. Every calculator runs entirely in your browser — nothing you type is
        ever sent anywhere.
      </p>
    </div>

    <main class="mx-auto max-w-4xl px-4 pb-12 pt-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <ToolCard
          v-for="tool in tools"
          :key="tool.to"
          :to="tool.to"
          :icon="tool.icon"
          :title="tool.title"
          :description="tool.description"
        />
      </div>
    </main>
  </div>
</template>
