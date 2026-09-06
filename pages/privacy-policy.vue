<script setup lang="ts">
import { setPageSeo } from '~/utils/seo'

setPageSeo({
  title: 'Privacy Policy – Sahod Calculator',
  description:
    'Read how Sahod Calculator handles calculator inputs, technical logs, cookies, advertising data, and privacy choices.',
  path: '/privacy-policy'
})
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-8">
    <CalculatorPageHeader title="Privacy Policy" description="Effective September 6, 2026" />

    <article class="m3-prose space-y-8">
      <section>
        <h2 class="md-title-large mb-3">Calculator information</h2>
        <p>
          Salary and contribution values you enter are processed locally in your browser. Sahod
          Calculator does not require an account and does not send those input values to an
          application server or store them in an application database. Avoid entering names,
          government identification numbers, medical information, or other personal details into
          calculator fields.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Hosting and technical data</h2>
        <p>
          The company that hosts this website may automatically process ordinary request data such
          as IP address, browser and device type, requested page, referring page, timestamps, and
          security signals. That information is used to deliver the site, prevent abuse, diagnose
          errors, and maintain security. The hosting provider’s own privacy terms govern its
          processing and retention.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Advertising and cookies</h2>
        <p>
          This site is intended to display advertising through Google AdSense. When advertising is
          enabled, Google and its advertising partners may use cookies, local storage, pixels, IP
          addresses, device information, and activity on this site to deliver, limit, personalize,
          and measure ads, subject to your choices and applicable law. Data may be shared with Google
          when an ad tag requests or displays an advertisement.
        </p>
        <p>
          Learn how Google uses information from sites that use its services in
          <a class="content-link" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google’s partner-sites notice</a>
          and manage ad personalization in
          <a class="content-link" href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          You can also block or delete cookies through your browser, although doing so may affect
          site or advertising features.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Consent</h2>
        <p>
          Where consent is legally required, advertising storage and personalized ads should not be
          enabled until an appropriate choice has been collected. Before launch, the site operator
          must configure a Google-certified consent management platform for visitors in the EEA,
          United Kingdom, and Switzerland if ads will be served there, and must follow any other
          consent requirements that apply to the site’s audience.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">External links and children</h2>
        <p>
          Links to government agencies and other services take you to sites with their own privacy
          practices. Sahod Calculator is a general financial-information tool and is not directed to
          children. Do not use it to submit information about a child.
        </p>
      </section>

      <section>
        <h2 class="md-title-large mb-3">Changes and contact</h2>
        <p>
          This policy may be updated when the site adds providers or changes how it operates. The
          effective date above will be revised for material changes. Privacy questions may be sent
          to <a class="content-link" href="mailto:hello@pdftool.ph">hello@pdftool.ph</a>; do not
          include salary records or sensitive identifiers.
        </p>
      </section>
    </article>
  </main>
</template>
