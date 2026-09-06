<script setup lang="ts">
import { setPageSeo } from '~/utils/seo'

setPageSeo({
  title: 'Terms of Use – Sahod Calculator',
  description:
    'Terms for using Sahod Calculator, including estimate limitations, acceptable use, third-party links, and liability disclaimers.',
  path: '/terms'
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader title="Terms of Use" description="Effective September 6, 2026" />

    <article class="m3-prose space-y-8">
      <section>
        <h2 class="md-title-large mb-3">Using the calculators</h2>
        <p>
          Sahod Calculator provides free educational information and planning estimates. You may use
          the site for personal or internal informational purposes, but you remain responsible for
          checking the result against current official rules and the facts of your own employment or
          membership record.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">No professional or government advice</h2>
        <p>
          Results are not payroll instructions, tax advice, legal advice, financial advice, benefit
          approval, or an official contribution assessment. The site is not affiliated with SSS,
          PhilHealth, Pag-IBIG Fund, BIR, or DOLE. Consult the relevant agency, your employer, or a
          qualified professional before acting on a result where accuracy matters.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Rates and availability</h2>
        <p>
          Rates, brackets, agency procedures, dividend declarations, and laws can change, sometimes
          before this site is updated. Features may also be corrected, changed, suspended, or
          removed without notice. No promise is made that the site will always be available or that
          every result is complete, current, or error-free.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Acceptable use</h2>
        <p>
          Do not misuse the site, interfere with its operation, attempt unauthorized access, use it
          to violate law or another person’s rights, or present an estimate as an official agency or
          employer record. Automated access must not unreasonably burden the service.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">External services and advertising</h2>
        <p>
          The site may link to agencies and third parties or display third-party advertising. A link
          or advertisement does not mean Sahod Calculator controls or endorses the destination, its
          content, or its products. Your dealings with a third party are governed by that party’s
          terms and privacy practices.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Limitation of liability</h2>
        <p>
          To the extent permitted by law, Sahod Calculator and its operator are not liable for loss
          arising from reliance on an estimate, delayed or unavailable service, third-party content,
          or data you choose to enter. Nothing in these terms excludes a right or liability that
          applicable law does not allow to be excluded.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Changes and contact</h2>
        <p>
          Continued use after updated terms are posted means you accept the revised terms. Questions
          may be sent to <a class="content-link" href="mailto:hello@pdftool.ph">hello@pdftool.ph</a>.
        </p>
      </section>
    </article>
  </main>
</template>
