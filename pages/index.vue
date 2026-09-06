<script setup lang="ts">
import type { PayFrequency } from '~/constants/rates2026'
import { RATES_YEAR } from '~/constants/rates2026'

useSeoMeta({
  title: 'Sahod Calculator — Free PH Payroll & Take-Home Pay Calculator (2026)',
  description:
    'Free Philippine payroll calculator. Instantly compute SSS, PhilHealth, Pag-IBIG contributions, BIR withholding tax, net take-home pay, and 13th month pay using 2026 rates.',
  ogTitle: 'Sahod Calculator — Free PH Payroll Calculator',
  ogDescription:
    'Compute your SSS, PhilHealth, Pag-IBIG, withholding tax, and net take-home pay in seconds — plus a 13th month pay calculator.'
})

const grossSalary = ref<number | null>(null)
const frequency = ref<PayFrequency>('monthly')
const hasComputed = ref(false)

const { calculate } = usePayrollCalculator()

const result = computed(() => {
  if (!hasComputed.value || grossSalary.value === null || grossSalary.value <= 0) return null
  return calculate(grossSalary.value, frequency.value)
})

function onCompute() {
  if (grossSalary.value !== null && grossSalary.value > 0) {
    hasComputed.value = true
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-3xl px-4 py-10 text-center sm:py-14">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-600">
          {{ RATES_YEAR }} Rates · Philippines
        </p>
        <h1 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Sahod Calculator</h1>
        <p class="mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
          Instantly compute your SSS, PhilHealth, and Pag-IBIG contributions, BIR withholding tax,
          and net take-home pay — free, and it never leaves your browser.
        </p>
      </div>
    </header>

    <main class="mx-auto max-w-3xl space-y-10 px-4 py-10">
      <!-- 1. Input form + 2. Results breakdown -->
      <section id="calculator" aria-labelledby="calculator-heading" class="scroll-mt-20">
        <h2 id="calculator-heading" class="sr-only">Take-home pay calculator</h2>
        <div class="space-y-6">
          <SalaryInputForm
            v-model:model-value-gross="grossSalary"
            v-model:model-value-frequency="frequency"
            @compute="onCompute"
          />

          <ResultsBreakdown v-if="result" :result="result" />
        </div>
      </section>

      <!-- Ad slot: below the results breakdown -->
      <AdSlot label="Sponsored" />

      <p class="text-center text-sm text-slate-500">
        Want to know your year-end bonus too? Try the
        <a href="#13th-month-calculator" class="font-semibold text-brand-600 hover:underline">
          13th month pay calculator
        </a>
        below.
      </p>

      <!-- Ad slot: between the two calculators -->
      <AdSlot label="Sponsored" />

      <!-- 3. 13th month pay calculator -->
      <ThirteenthMonthCalculator />

      <!-- 4. Explainer content -->
      <div class="space-y-10 border-t border-slate-200 pt-10">
        <ExplainerSection id="about-sss" title="What is SSS and how are contributions computed?">
          <p>
            The Social Security System (SSS) is the state-run social insurance program for private
            and self-employed workers in the Philippines. Every month, a portion of your salary is
            set aside as an SSS contribution, which builds up your eligibility for benefits such as
            sickness, maternity, disability, retirement, and death benefits for your beneficiaries.
          </p>
          <p>
            SSS contributions are not a flat percentage of your exact salary. Instead, your monthly
            salary is matched to a <strong>Monthly Salary Credit (MSC)</strong> bracket — a
            standardized compensation range published by SSS — and the contribution is computed as
            a percentage of that MSC, not your raw pay. For {{ RATES_YEAR }}, the total contribution
            rate is 15% of MSC, split 5% employee / 10% employer, with the MSC bracketed between
            roughly ₱4,000 and ₱35,000. Employers also shoulder a small Employees' Compensation (EC)
            contribution on top — ₱10/month if your MSC is below ₱15,000, or ₱30/month if it's at or
            above that.
          </p>
          <p>
            This calculator looks up your MSC bracket automatically, so the SSS figure you see above
            reflects the bracket your salary falls into rather than a straight 15% of your exact pay.
          </p>
        </ExplainerSection>

        <ExplainerSection id="about-philhealth" title="What is PhilHealth and how are contributions computed?">
          <p>
            PhilHealth (the Philippine Health Insurance Corporation) provides subsidized health
            insurance coverage to Filipino workers and their dependents. Contributions are shared
            equally between employee and employer and go toward hospitalization and other covered
            medical benefits.
          </p>
          <p>
            For {{ RATES_YEAR }}, the PhilHealth premium rate is 5% of monthly basic salary, split
            2.5% employee / 2.5% employer. There's a salary floor of ₱10,000 — meaning even if you
            earn less, your contribution is computed as if you earned ₱10,000 — and a ceiling of
            ₱100,000, above which the contribution is capped at ₱2,500 per side (₱5,000 total).
          </p>
        </ExplainerSection>

        <!-- Ad slot: within the explainer content -->
        <AdSlot label="Sponsored" />

        <ExplainerSection id="about-pagibig" title="What is Pag-IBIG (HDMF) and how are contributions computed?">
          <p>
            The Home Development Mutual Fund, better known as Pag-IBIG Fund, is a national savings
            and affordable housing finance program. Contributions build up a personal savings fund
            (with dividends) that members can later withdraw or use toward a Pag-IBIG housing loan.
          </p>
          <p>
            Pag-IBIG contributions in this calculator are computed as 2% employee + 2% employer of
            monthly compensation, based on a ₱10,000 compensation ceiling — so once your monthly pay
            reaches ₱10,000, the contribution is capped at ₱200 per side, regardless of how much
            higher your salary goes.
          </p>
        </ExplainerSection>

        <ExplainerSection id="about-withholding-tax" title="What is BIR withholding tax and how is it computed?">
          <p>
            Withholding tax on compensation is income tax that your employer deducts from your pay
            in advance, on behalf of the Bureau of Internal Revenue (BIR), based on your projected
            annual income. Under the TRAIN law, individuals earning a taxable income of ₱250,000 or
            less per year pay no income tax at all.
          </p>
          <p>
            To compute it, your <em>taxable income</em> — gross pay minus your SSS, PhilHealth, and
            Pag-IBIG employee contributions — for the current pay period is projected out to a full
            year (annualized), run through the BIR's progressive tax brackets below, and the
            resulting annual tax is then divided back down to your pay period.
          </p>
          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full min-w-[420px] text-left text-sm">
              <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th class="px-4 py-2 font-semibold">Annual taxable income</th>
                  <th class="px-4 py-2 font-semibold">Tax</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="px-4 py-2">₱250,000 and below</td>
                  <td class="px-4 py-2">Exempt (0%)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">₱250,001 – ₱400,000</td>
                  <td class="px-4 py-2">15% of the excess over ₱250,000</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">₱400,001 – ₱800,000</td>
                  <td class="px-4 py-2">₱22,500 + 20% of the excess over ₱400,000</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">₱800,001 – ₱2,000,000</td>
                  <td class="px-4 py-2">₱102,500 + 25% of the excess over ₱800,000</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">₱2,000,001 – ₱8,000,000</td>
                  <td class="px-4 py-2">₱402,500 + 30% of the excess over ₱2,000,000</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">Over ₱8,000,000</td>
                  <td class="px-4 py-2">₱2,202,500 + 35% of the excess over ₱8,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ExplainerSection>

        <ExplainerSection id="about-13th-month" title="How is 13th month pay computed under DOLE rules?">
          <p>
            Under Presidential Decree No. 851, all rank-and-file employees in the private sector who
            have worked for at least one month during the calendar year are entitled to 13th month
            pay, to be paid on or before December 24 each year.
          </p>
          <p>
            The formula set by DOLE is simple: <strong>total basic salary actually earned for the
            year ÷ 12</strong>. This applies even if you didn't work the full year — the total is
            still divided by 12, never by the number of months you actually worked. "Basic salary"
            covers your base pay and paid leave conversions, but excludes overtime pay, night shift
            differential, holiday premiums, allowances, and discretionary bonuses.
          </p>
          <p>
            13th month pay (combined with other similar benefits, like a Christmas bonus) is
            tax-exempt up to ₱90,000 per year. Any amount beyond that combined ceiling is added back
            to your taxable income and subjected to withholding tax.
          </p>
        </ExplainerSection>
      </div>

      <RatesDisclaimer />
    </main>

    <footer class="border-t border-slate-200 bg-white py-8">
      <div class="mx-auto max-w-3xl px-4 text-center text-xs text-slate-400">
        <p>Sahod Calculator — a free tool for Filipino employees. Not a substitute for professional tax or payroll advice.</p>
      </div>
    </footer>
  </div>
</template>
