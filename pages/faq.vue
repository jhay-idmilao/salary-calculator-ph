<script setup lang="ts">
import {
  salaryFaqs,
  sssFaqs,
  philhealthFaqs,
  mp2Faqs,
  thirteenthMonthFaqs,
  withholdingTaxFaqs,
  type FaqItem
} from '~/content/faqs'
import { setPageSeo } from '~/utils/seo'

interface FaqGroup {
  id: string
  title: string
  to: string
  items: FaqItem[]
}

const faqGroups: FaqGroup[] = [
  { id: 'faq-salary', title: 'Salary Calculator', to: '/salary-calculator', items: salaryFaqs },
  { id: 'faq-sss', title: 'SSS Contribution Calculator', to: '/sss-contribution-calculator', items: sssFaqs },
  {
    id: 'faq-philhealth',
    title: 'PhilHealth Contribution Calculator',
    to: '/philhealth-contribution-calculator',
    items: philhealthFaqs
  },
  { id: 'faq-mp2', title: 'Pag-IBIG MP2 Savings Calculator', to: '/pagibig-mp2-calculator', items: mp2Faqs },
  {
    id: 'faq-13th-month',
    title: '13th Month Pay Calculator',
    to: '/13th-month-pay-calculator',
    items: thirteenthMonthFaqs
  },
  {
    id: 'faq-withholding-tax',
    title: 'BIR Withholding Tax Calculator',
    to: '/bir-withholding-tax-calculator',
    items: withholdingTaxFaqs
  }
]

// One combined FAQPage schema for the whole aggregator page — every question
// across every calculator, regardless of which accordion items a visitor has
// expanded in the UI.
const allFaqs: FaqItem[] = faqGroups.flatMap((group) => group.items)

const pageDescription =
  'Answers to common questions about the Salary, SSS, PhilHealth, Pag-IBIG MP2, 13th month pay, and BIR withholding tax calculators on Sahod Calculator.'

setPageSeo({
  title: 'Frequently Asked Questions – Sahod Calculator',
  description: pageDescription,
  path: '/faq',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  }
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="Frequently Asked Questions"
      description="Answers about each calculator — salary, SSS, PhilHealth, Pag-IBIG MP2, 13th month pay, and withholding tax."
    />

    <div class="space-y-10">
      <section v-for="group in faqGroups" :key="group.id" :aria-labelledby="group.id">
        <div class="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 :id="group.id" class="md-title-large" style="color: var(--md-on-surface)">
            {{ group.title }}
          </h2>
          <NuxtLink :to="group.to" class="content-link md-body-medium">Open calculator →</NuxtLink>
        </div>
        <div class="m3-card p-2 sm:p-3">
          <Md3Accordion v-for="item in group.items" :key="item.question" :title="item.question" heading-tag="h3">
            <p>{{ item.answer }}</p>
          </Md3Accordion>
        </div>
      </section>

      <p class="md-body-medium" style="color: var(--md-on-surface-variant)">
        Looking for the bigger picture instead of a specific question? Read the
        <NuxtLink to="/government-benefits-guide" class="content-link">Government Benefits Guide</NuxtLink>
        for what SSS, PhilHealth, and Pag-IBIG actually get you.
      </p>

      <AdSlot label="Sponsored" />
    </div>
  </main>
</template>
