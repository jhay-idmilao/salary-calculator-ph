<script setup lang="ts">
import { setPageSeo, SITE_URL } from '~/utils/seo'

const pageDescription =
  'Free 2026 Philippine salary, SSS, PhilHealth, Pag-IBIG MP2, 13th month pay, and BIR withholding tax calculators for Filipino employees.'

setPageSeo({
  title: 'Philippine Salary & Contribution Calculators 2026 – Sahod Calculator',
  description: pageDescription,
  path: '/',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sahod Calculator',
    url: SITE_URL,
    description: pageDescription,
    inLanguage: 'en-PH'
  }
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
    to: '/13th-month-pay-calculator',
    icon: '🎁',
    title: '13th Month Pay Calculator',
    description: 'Compute your 13th month pay and check the ₱90,000 tax-exempt ceiling.'
  },
  {
    to: '/sss-contribution-calculator',
    icon: '🛡️',
    title: 'SSS Contribution Calculator',
    description: 'Look up your Monthly Salary Credit and SSS employee/employer contribution.'
  },
  {
    to: '/philhealth-contribution-calculator',
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
    to: '/bir-withholding-tax-calculator',
    icon: '🧾',
    title: 'BIR Withholding Tax Calculator',
    description: 'Check just your withholding tax for a pay period, without a full breakdown.'
  },
  {
    to: '/government-benefits-guide',
    icon: '📘',
    title: 'Government Benefits Guide',
    description: "Plain-language guide to what SSS, PhilHealth, and Pag-IBIG actually get you."
  }
]

interface Reason {
  icon: string
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    icon: '✅',
    title: 'Accurate 2026 rates',
    description: 'Built on the current SSS, PhilHealth, Pag-IBIG, and BIR TRAIN law tables.'
  },
  {
    icon: '🔒',
    title: 'Free, no signup',
    description: 'No account, no paywall, no email required — just open a calculator and use it.'
  },
  {
    icon: '📱',
    title: 'Works on your phone',
    description: 'Designed mobile-first, since that’s where most people check their payslip.'
  },
  {
    icon: '⚡',
    title: 'Instant, in your browser',
    description: 'Every calculation runs on your device — nothing you type is sent anywhere.'
  }
]

interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '1',
    title: 'Pick a calculator',
    description: 'Salary, SSS, PhilHealth, Pag-IBIG MP2, 13th month pay, or BIR withholding tax.'
  },
  {
    number: '2',
    title: 'Enter your numbers',
    description: 'Your gross salary, monthly compensation, or contribution amount.'
  },
  {
    number: '3',
    title: 'See your breakdown instantly',
    description: 'Deductions and net pay, computed the moment you hit compute.'
  }
]
</script>

<template>
  <div>
    <!-- Hero — short, but explains what this is and who it's for -->
    <div class="px-4 pb-2 pt-8 text-center sm:pt-10">
      <h1 class="md-headline-medium font-medium" style="color: var(--md-on-background)">
        Free calculators for Filipino employees
      </h1>
      <p class="mx-auto mt-1.5 max-w-lg md-body-medium" style="color: var(--md-on-surface-variant)">
        Sahod Calculator helps Filipino employees check their SSS, PhilHealth, Pag-IBIG, and BIR
        withholding tax deductions, and see their real take-home pay — free, and entirely in your
        browser.
      </p>
    </div>

    <main class="mx-auto max-w-4xl px-4 pb-12 pt-6">
      <!-- Primary focus: the tool cards, right below the hero -->
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

      <!-- Why use this -->
      <section class="mt-12" aria-labelledby="why-sahod-calculator">
        <h2 id="why-sahod-calculator" class="md-title-large mb-4 text-center" style="color: var(--md-on-surface)">
          Why use Sahod Calculator?
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="reason in reasons" :key="reason.title" class="m3-card flex items-start gap-3 p-5">
            <span class="text-2xl" aria-hidden="true">{{ reason.icon }}</span>
            <div>
              <p class="md-title-medium" style="color: var(--md-on-surface)">{{ reason.title }}</p>
              <p class="mt-1 md-body-medium" style="color: var(--md-on-surface-variant)">
                {{ reason.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section class="mt-12" aria-labelledby="how-it-works">
        <h2 id="how-it-works" class="md-title-large mb-4 text-center" style="color: var(--md-on-surface)">
          How it works
        </h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div v-for="step in steps" :key="step.number" class="m3-card p-5 text-center">
            <span
              class="mx-auto flex h-9 w-9 items-center justify-center rounded-full md-title-medium"
              style="background-color: var(--md-primary-container); color: var(--md-on-primary-container)"
            >
              {{ step.number }}
            </span>
            <p class="mt-3 md-title-medium" style="color: var(--md-on-surface)">{{ step.title }}</p>
            <p class="mt-1 md-body-medium" style="color: var(--md-on-surface-variant)">
              {{ step.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Funnel into deeper content -->
      <section
        class="mt-12 rounded-[var(--md-shape-lg)] p-6 text-center sm:p-8"
        style="background-color: var(--md-primary-container)"
        aria-labelledby="learn-more"
      >
        <h2 id="learn-more" class="md-title-large" style="color: var(--md-on-primary-container)">
          Want to understand your deductions, not just the numbers?
        </h2>
        <p class="mx-auto mt-2 max-w-md md-body-medium" style="color: var(--md-on-primary-container); opacity: 0.85">
          Read what each contribution actually gets you, or find quick answers to common questions.
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink to="/government-benefits-guide" v-ripple class="m3-btn m3-btn-filled">
            Government Benefits Guide
          </NuxtLink>
          <NuxtLink to="/faq" v-ripple class="m3-btn m3-btn-tonal"> Frequently Asked Questions </NuxtLink>
        </div>
      </section>

      <!-- Ad slot: after all homepage content, never above the fold or between the hero and cards -->
      <div class="mt-12">
        <AdSlot label="Sponsored" />
      </div>
    </main>
  </div>
</template>
