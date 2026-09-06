<script setup lang="ts">
useSeoMeta({
  title: 'Government Benefits Guide for Filipino Employees | Sahod Calculator',
  description:
    'A plain-language guide to what SSS, PhilHealth, Pag-IBIG (including MP2), and BIR withholding tax actually get you — written for anyone new to Philippine payroll.'
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader
      title="Government Benefits Guide"
      description="What SSS, PhilHealth, Pag-IBIG, and withholding tax actually get you — in plain language."
    />

    <article class="space-y-10">
      <section class="m3-prose">
        <p>
          If you're new to having a Philippine payslip, those deductions can look like money
          disappearing for nothing. They're not — each one is either building up a benefit you can
          claim later, or is money that's already yours (Pag-IBIG), or is tax you'd otherwise owe in
          one lump sum at year-end anyway. Here's what each one actually buys you.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3" style="color: var(--md-on-surface)">
          🛡️ SSS — Social Security System
        </h2>
        <div class="m3-prose space-y-3">
          <p>
            SSS is a government-run social insurance fund for private-sector and self-employed
            workers. You and your employer both contribute every month (see the
            <NuxtLink to="/sss-calculator" class="font-medium" style="color: var(--md-primary)"
              >SSS Contribution Calculator</NuxtLink
            >
            for the exact split), and in return you become eligible for a set of cash benefits when
            you need them:
          </p>
          <ul class="list-disc space-y-1 pl-5">
            <li><strong>Retirement pension</strong> — a monthly pension for life once you retire, if you've paid enough monthly contributions.</li>
            <li><strong>Sickness benefit</strong> — a daily cash allowance if you're unable to work due to illness or injury and are confined for at least four days.</li>
            <li><strong>Maternity benefit</strong> — a cash benefit covering a portion of lost income during maternity leave.</li>
            <li><strong>Disability benefit</strong> — a pension or lump sum if you become partially or permanently disabled.</li>
            <li><strong>Death and funeral benefit</strong> — a cash benefit paid to your beneficiaries if you pass away.</li>
            <li><strong>Salary and calamity loans</strong> — low-interest loans members can borrow against their own contribution history.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 class="md-title-large mb-3" style="color: var(--md-on-surface)">
          🏥 PhilHealth — National Health Insurance
        </h2>
        <div class="m3-prose space-y-3">
          <p>
            PhilHealth is the Philippines' national health insurance program. Your monthly premium
            (see the
            <NuxtLink to="/philhealth-calculator" class="font-medium" style="color: var(--md-primary)"
              >PhilHealth Contribution Calculator</NuxtLink
            >) covers you and your qualified dependents — spouse, children, and in some cases
            parents — for:
          </p>
          <ul class="list-disc space-y-1 pl-5">
            <li><strong>Inpatient hospitalization</strong> — a fixed subsidy toward room, board, medicines, and procedures for covered conditions, at accredited hospitals nationwide.</li>
            <li><strong>Outpatient benefits</strong> — coverage for select procedures like dialysis, chemotherapy, and cataract surgery.</li>
            <li><strong>Konsulta package</strong> — free annual primary care consultations, basic lab tests, and medicines at a chosen primary care provider, no confinement required.</li>
          </ul>
          <p>
            Coverage kicks in as long as your contributions are up to date — this is one of the few
            deductions where the benefit can apply to your whole immediate family, not just you.
          </p>
        </div>
      </section>

      <section>
        <h2 class="md-title-large mb-3" style="color: var(--md-on-surface)">
          🏦 Pag-IBIG — Regular Savings and MP2
        </h2>
        <div class="m3-prose space-y-3">
          <p>
            Pag-IBIG (the Home Development Mutual Fund) is different from SSS and PhilHealth in one
            important way: it's <strong>forced savings, not insurance</strong>. Your mandatory
            monthly contribution (see the
            <NuxtLink to="/salary-calculator" class="font-medium" style="color: var(--md-primary)"
              >Salary Calculator</NuxtLink
            >) goes into an account that's genuinely yours, earns annual dividends, and can be
            claimed back — typically after 20 years of contributions, or earlier if you retire,
            become disabled, or a few other qualifying events. Along the way, it also makes you
            eligible for:
          </p>
          <ul class="list-disc space-y-1 pl-5">
            <li><strong>Pag-IBIG housing loans</strong> — financing to buy, build, or improve a home, generally at lower interest rates than commercial bank loans.</li>
            <li><strong>Multi-purpose and calamity loans</strong> — short-term loans against your accumulated savings.</li>
          </ul>
          <p>
            <strong>MP2 (Modified Pag-IBIG II)</strong> is a separate, <em>voluntary</em> top-up
            savings program with a shorter 5-year term and historically higher dividend rates than
            the regular program. It's worth considering once your regular contribution is already
            in place and you want a place to park extra savings — try the
            <NuxtLink to="/pagibig-mp2-calculator" class="font-medium" style="color: var(--md-primary)"
              >Pag-IBIG MP2 Savings Calculator</NuxtLink
            >
            to see how it could grow, using a dividend rate you control.
          </p>
        </div>
      </section>

      <section>
        <h2 class="md-title-large mb-3" style="color: var(--md-on-surface)">
          🧾 BIR Withholding Tax and Your Annual ITR
        </h2>
        <div class="m3-prose space-y-3">
          <p>
            Unlike SSS, PhilHealth, and Pag-IBIG, withholding tax isn't a benefit you get back —
            it's your income tax, collected in advance. Every payday, your employer estimates what
            your income tax for the whole year will be and withholds a slice of it (see the
            <NuxtLink to="/withholding-tax-calculator" class="font-medium" style="color: var(--md-primary)"
              >BIR Withholding Tax Calculator</NuxtLink
            >), so that by December you've already paid roughly what you owe instead of facing one
            huge bill.
          </p>
          <p>
            For most rank-and-file employees with only one employer for the full year, this is the
            <em>end</em> of the process — your employer files a
            <strong>BIR Form 2316</strong> on your behalf, and this counts as "substituted filing,"
            meaning you don't need to separately file your own annual Income Tax Return (ITR).
          </p>
          <p>
            You typically <strong>do</strong> still need to file your own ITR if you had two or more
            employers during the year, changed jobs and your new employer didn't correctly
            annualize your prior income, earned additional income outside employment (freelance
            work, a side business, etc.), or are a mixed-income earner. When in doubt, a licensed
            tax professional or the BIR's own guidance is the safest reference.
          </p>
        </div>
      </section>

      <section class="m3-prose">
        <p>
          Ready to see the numbers for your own pay?
          <NuxtLink to="/" class="font-medium" style="color: var(--md-primary)">Browse all calculators</NuxtLink>.
        </p>
      </section>

      <AdSlot label="Sponsored" />
    </article>
  </div>
</template>
