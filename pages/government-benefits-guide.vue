<script setup lang="ts">
import { setPageSeo, SITE_NAME, SITE_URL } from '~/utils/seo'

const pageDescription =
  'A practical guide to SSS, PhilHealth, Pag-IBIG regular savings, MP2, and payroll tax: eligibility, registration, payments, missed contributions, and benefits.'

setPageSeo({
  title: 'SSS, PhilHealth & Pag-IBIG Benefits Guide 2026',
  description: pageDescription,
  path: '/government-benefits-guide',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Government Benefits Guide for Filipino Workers',
    description: pageDescription,
    url: `${SITE_URL}/government-benefits-guide`,
    inLanguage: 'en-PH',
    author: { '@type': 'Organization', name: SITE_NAME }
  }
})
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-8">
    <CalculatorPageHeader
      title="Government Benefits Guide"
      description="How SSS, PhilHealth, Pag-IBIG, MP2, and payroll tax work — from enrollment to payment and claims."
    />

    <article class="space-y-12">
      <section class="m3-prose">
        <p>
          A Philippine payslip can make several deductions look alike, but they do different jobs.
          SSS is social insurance, PhilHealth helps pay for covered health care, regular Pag-IBIG is
          member savings tied to housing and short-term loan programs, and BIR withholding is an
          advance payment of income tax. MP2 is optional savings on top of regular Pag-IBIG.
        </p>
        <p>
          This guide explains the usual process for employed, self-employed, and voluntary members.
          Agency rules and forms change, so use the official links in each section to confirm the
          current requirements for your membership category.
        </p>
        <p>
          Want to see these deductions together on your own numbers? The
          <NuxtLink to="/salary-calculator" class="content-link">Salary Calculator</NuxtLink>
          computes SSS, PhilHealth, Pag-IBIG, and withholding tax from one gross salary, and the
          <NuxtLink to="/13th-month-pay-calculator" class="content-link">13th Month Pay Calculator</NuxtLink>
          checks your year-end bonus against the ₱90,000 tax-exempt ceiling.
        </p>
      </section>

      <section aria-labelledby="sss-guide">
        <h2 id="sss-guide" class="md-title-large mb-4" style="color: var(--md-on-surface)">
          SSS: social insurance for workers
        </h2>
        <div class="m3-prose space-y-4">
          <p>
            SSS covers private-sector employees and several individually paying groups, including
            self-employed members and OFWs. Depending on the benefit and your posted contribution
            history, membership can provide sickness, maternity, disability, retirement, death,
            funeral, unemployment, and loan benefits. Having an SS number alone is not the same as
            having enough posted contributions to qualify for every benefit.
          </p>
          <h3 class="md-title-medium">Who pays and how much?</h3>
          <p>
            For an employee, the employer deducts the employee share, adds the employer share and
            Employees’ Compensation amount, then remits and reports the total. A self-employed
            member pays the whole contribution applicable to declared earnings. A former employee
            or self-employed member with a valid posted contribution may continue as a voluntary
            member and choose an allowed Monthly Salary Credit, subject to SSS rules.
          </p>
          <p>
            The amount is based on a contribution schedule and Monthly Salary Credit bracket, not a
            simple percentage of every peso of salary. Use the
            <NuxtLink to="/sss-contribution-calculator" class="content-link">SSS Contribution Calculator</NuxtLink>
            for an employee-oriented estimate. If you are self-employed, do not treat the displayed
            employee share as your full bill; consult the separate self-employed schedule.
          </p>
          <h3 class="md-title-medium">How to register and pay</h3>
          <ol class="list-decimal space-y-2 pl-5">
            <li>Apply for an SS number through the official SSS online issuance facility if you do not already have one. Never request a second number.</li>
            <li>Complete the documents needed to make a temporary record permanent; benefit and loan eligibility can depend on a properly documented membership record.</li>
            <li>Employees are reported by their employer. Self-employed members must register or update their coverage category and declare earnings.</li>
            <li>Individually paying members generate a Payment Reference Number in My.SSS or the SSS mobile app, then pay through an SSS branch, accredited bank, collection partner, or supported online channel.</li>
          </ol>
          <h3 class="md-title-medium">What if a payment is missing?</h3>
          <p>
            An employer’s missing remittance should be raised with payroll and checked against your
            My.SSS contribution history. For voluntary members, an unpaid month generally becomes a
            gap that cannot be back-paid later. You can resume future payments, but a gap may affect
            a benefit or loan that requires a certain number of recent posted contributions.
          </p>
          <p>
            Official reference:
            <a class="content-link" href="https://www.sss.gov.ph/become-an-sss-member/" target="_blank" rel="noopener noreferrer">SSS membership guide</a>
            and
            <a class="content-link" href="https://www.sss.gov.ph/voluntary-member/" target="_blank" rel="noopener noreferrer">voluntary-member rules</a>.
          </p>
        </div>
      </section>

      <section aria-labelledby="philhealth-guide">
        <h2 id="philhealth-guide" class="md-title-large mb-4" style="color: var(--md-on-surface)">
          PhilHealth: national health insurance
        </h2>
        <div class="m3-prose space-y-4">
          <p>
            PhilHealth membership supports covered inpatient, outpatient, and primary-care
            benefits for members and qualified dependents, subject to the benefit package and the
            accredited provider’s rules. PhilHealth is not a promise that every hospital charge is
            paid in full; ask the provider which case rate or package applies before treatment when
            possible.
          </p>
          <h3 class="md-title-medium">Registration for employees and self-paying members</h3>
          <p>
            A formal-sector employer registers or reports employees and uses their permanent
            PhilHealth Identification Numbers. If you move from employment to self-employment,
            update your category to Self-Earning Individual, declare monthly income, and keep the
            same PIN. Review your Member Data Record to correct your name and list qualified
            dependents before you need to use a benefit.
          </p>
          <h3 class="md-title-medium">How premiums are paid</h3>
          <p>
            For formal employment, the employee and employer generally share the premium equally.
            The employer deducts your share, adds its share, and reports and remits both through the
            Electronic Premium Remittance System. Self-paying members pay based on declared income
            through the PhilHealth Member Portal or accredited collection channels; current rules
            require a Statement of Premium Account before payment for covered self-paying groups.
          </p>
          <p>
            The <NuxtLink to="/philhealth-contribution-calculator" class="content-link">PhilHealth Contribution Calculator</NuxtLink>
            estimates the formal-employee split using the project’s current salary floor and
            ceiling. It does not check membership status or prove that a benefit is available.
          </p>
          <h3 class="md-title-medium">Missed premiums and benefit questions</h3>
          <p>
            Do not wait for a hospital admission to investigate gaps. Check your contribution
            history in the Member Portal, ask an employer to correct an unposted remittance, or ask
            PhilHealth how current Universal Health Care rules apply to unpaid self-paying periods.
            Payment and settlement programs can change through new circulars.
          </p>
          <p>
            Official reference:
            <a class="content-link" href="https://www.philhealth.gov.ph/members/" target="_blank" rel="noopener noreferrer">PhilHealth member guidance</a>
            and
            <a class="content-link" href="https://www.philhealth.gov.ph/partners/employers/pay_procedures.php" target="_blank" rel="noopener noreferrer">employer payment procedure</a>.
          </p>
        </div>
      </section>

      <section aria-labelledby="pagibig-guide">
        <h2 id="pagibig-guide" class="md-title-large mb-4" style="color: var(--md-on-surface)">
          Pag-IBIG regular savings: membership, savings, and loans
        </h2>
        <div class="m3-prose space-y-4">
          <p>
            Regular Pag-IBIG contributions build Total Accumulated Value: your contributions,
            employer contributions when applicable, and declared dividends. Membership also opens
            access to housing, multi-purpose, and calamity loan programs when you meet the separate
            eligibility rules. A contribution is savings, but it is not an ordinary bank account
            that you can withdraw on demand.
          </p>
          <h3 class="md-title-medium">How to register and contribute</h3>
          <p>
            Register through Virtual Pag-IBIG or a branch to obtain a permanent Membership ID
            number. Employees give that MID number to their employer, which deducts the employee
            share, adds the employer share, and remits both. Self-employed and voluntary members pay
            their own contributions through Virtual Pag-IBIG or an accredited bank, e-wallet, or
            collection partner, using the correct MID number and period covered.
          </p>
          <h3 class="md-title-medium">What if I miss a regular Pag-IBIG payment?</h3>
          <p>
            A missed employee remittance should be checked with payroll and against your Virtual
            Pag-IBIG record. Individually paying members can resume contributions, but a gap may
            delay eligibility for a loan or another program that requires a minimum contribution
            history. Do not invent a period or account number when paying: ask Pag-IBIG how to
            correct a gap or misposted payment.
          </p>
        </div>
      </section>

      <section aria-labelledby="mp2-guide">
        <h2 id="mp2-guide" class="md-title-large mb-4" style="color: var(--md-on-surface)">
          MP2: optional five-year savings
        </h2>
        <div class="m3-prose space-y-4">
          <p>
            Modified Pag-IBIG II is separate from regular mandatory savings. It is voluntary, has a
            five-year term measured from the first payment, and earns a dividend rate declared by
            the Pag-IBIG Fund Board. The rate can change every year and is not guaranteed.
          </p>
          <h3 class="md-title-medium">Enrollment and payments</h3>
          <p>
            Eligible active members can enroll through Virtual Pag-IBIG or the current MP2
            enrollment form. Save the MP2 account number issued for that enrollment. You may fund it
            through supported salary deduction, Virtual Pag-IBIG, or an accredited collection
            partner; payments above the current documentary threshold may require proof of source
            of funds.
          </p>
          <h3 class="md-title-medium">Skipping a month, maturity, and early withdrawal</h3>
          <p>
            MP2 does not require an equal deposit every month, so skipping a voluntary payment does
            not create the same delinquency as missing a loan amortization. It simply leaves less
            money earning dividends. At maturity you must claim the account or open a new MP2
            enrollment to continue under a new five-year term.
          </p>
          <p>
            Pre-termination is allowed for reasons listed in Pag-IBIG’s terms. A withdrawal for
            another reason can reduce the dividends paid, so read the current form before assuming
            that all projected earnings are available early. Use the
            <NuxtLink to="/pagibig-mp2-calculator" class="content-link">MP2 Savings Calculator</NuxtLink>
            to compare regular, skipped-month, and lump-sum scenarios—not as a guaranteed quote.
          </p>
          <p>
            Official reference:
            <a class="content-link" href="https://www.pagibigfund.gov.ph/Membership_ModifiedPagIBIG2.html" target="_blank" rel="noopener noreferrer">Pag-IBIG MP2 program</a>
            and the
            <a class="content-link" href="https://www.pagibigfund.gov.ph/document/pdf/dlforms/providentrelated/PFF226_ModifiedPagIBIGIIEnrollmentForm_V06.pdf" target="_blank" rel="noopener noreferrer">current MP2 enrollment terms</a>.
          </p>
        </div>
      </section>

      <section aria-labelledby="tax-guide">
        <h2 id="tax-guide" class="md-title-large mb-4" style="color: var(--md-on-surface)">
          BIR withholding tax and year-end reconciliation
        </h2>
        <div class="m3-prose space-y-4">
          <p>
            Withholding tax is income tax collected in advance through payroll. Employers calculate
            taxable compensation, apply the BIR withholding table, and reconcile the year before
            issuing BIR Form 2316. It is not a separate savings or insurance benefit.
          </p>
          <p>
            Employees who qualify for substituted filing may not need to file a separate annual
            return. Multiple employers, business or professional income, and other mixed-income
            situations can change that result. Compare an estimate with the
            <NuxtLink to="/bir-withholding-tax-calculator" class="content-link">BIR Withholding Tax Calculator</NuxtLink>,
            but use Form 2316, current BIR issuances, or a tax professional for filing decisions.
          </p>
        </div>
      </section>

      <section class="rounded-[var(--md-shape-lg)] p-5" style="background-color: var(--md-primary-container)">
        <h2 class="md-title-medium" style="color: var(--md-on-primary-container)">Keep your own records</h2>
        <p class="mt-2 md-body-large" style="color: var(--md-on-primary-container)">
          Save payslips, payment receipts, reference numbers, and screenshots of posted
          contributions. Check each agency portal periodically; correcting a missing or misposted
          payment is usually easier while the employer, period, and receipt are still easy to trace.
        </p>
      </section>

      <AdSlot label="Sponsored" />
    </article>
  </main>
</template>
