<script setup lang="ts">
import { PDF_TOOL_PH_URL } from '~/constants/links'

interface FooterLink {
  label: string
  to?: string
  href?: string
}

const toolsLinks: FooterLink[] = [
  { label: 'All tools', to: '/' },
  { label: 'Salary Calculator', to: '/salary-calculator' },
  { label: '13th Month Pay Calculator', to: '/13th-month-pay-calculator' },
  { label: 'SSS Contribution Calculator', to: '/sss-contribution-calculator' },
  { label: 'PhilHealth Contribution Calculator', to: '/philhealth-contribution-calculator' },
  { label: 'Pag-IBIG MP2 Savings Calculator', to: '/pagibig-mp2-calculator' },
  { label: 'BIR Withholding Tax Calculator', to: '/bir-withholding-tax-calculator' },
  { label: 'Government Benefits Guide', to: '/government-benefits-guide' }
]

const companyLinks: FooterLink[] = [
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'PDF Tool PH ↗', href: PDF_TOOL_PH_URL }
]

const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Use', to: '/terms' }
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t" style="border-color: var(--md-outline-variant); background-color: var(--md-surface-container-lowest)">
    <div class="mx-auto max-w-4xl px-4 py-10">
      <div class="grid gap-8 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <!-- Brand -->
        <div>
          <AppLogo />
          <p class="mt-3 max-w-xs md-body-medium" style="color: var(--md-on-surface-variant)">
            Free calculators for Filipino employees — take-home pay, 13th month pay, and government
            contributions. Not a substitute for professional tax or payroll advice.
          </p>
        </div>

        <!-- Link columns -->
        <nav aria-label="Tools">
          <p class="m3-footer-heading">Tools</p>
          <ul class="mt-3 space-y-2">
            <li v-for="link in toolsLinks" :key="link.label">
              <NuxtLink :to="link.to" class="m3-footer-link md-body-medium">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <p class="m3-footer-heading">Company</p>
          <ul class="mt-3 space-y-2">
            <li v-for="link in companyLinks" :key="link.label">
              <NuxtLink v-if="link.to" :to="link.to" class="m3-footer-link md-body-medium">{{ link.label }}</NuxtLink>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="m3-footer-link md-body-medium"
                >{{ link.label }}</a
              >
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <p class="m3-footer-heading">Legal</p>
          <ul class="mt-3 space-y-2">
            <li v-for="link in legalLinks" :key="link.label">
              <NuxtLink :to="link.to" class="m3-footer-link md-body-medium">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="mt-8 border-t pt-4" style="border-color: var(--md-outline-variant)">
        <RatesDisclaimer />
      </div>

      <p class="mt-4 md-body-medium" style="color: var(--md-on-surface-variant)">
        © {{ currentYear }} Sahod Calculator.
      </p>
    </div>
  </footer>
</template>
