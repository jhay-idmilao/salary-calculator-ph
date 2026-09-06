<script setup lang="ts">
const PDF_TOOL_PH_URL = 'http://pdf-tool-ph.com/'
</script>

<template>
  <footer class="border-t" style="border-color: var(--md-outline-variant); background-color: var(--md-surface-container-lowest)">
    <div class="mx-auto max-w-4xl px-4 py-8">
      <AppLogo />
      <p class="mt-3 md-body-medium" style="color: var(--md-on-surface-variant)">
        Free calculators for Filipino employees — take-home pay, 13th month pay, and government
        contributions. Not a substitute for professional tax or payroll advice.
      </p>

      <div class="mt-4 border-t pt-4" style="border-color: var(--md-outline-variant)">
        <RatesDisclaimer />
      </div>

      <nav
        class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 md-body-medium"
        style="border-color: var(--md-outline-variant)"
        aria-label="Footer"
      >
        <NuxtLink to="/" class="hover:underline" style="color: var(--md-primary)">All tools</NuxtLink>
        <span aria-hidden="true" style="color: var(--md-outline-variant)">·</span>
        <NuxtLink to="/government-benefits-guide" class="hover:underline" style="color: var(--md-primary)"
          >Government Benefits Guide</NuxtLink
        >
        <span aria-hidden="true" style="color: var(--md-outline-variant)">·</span>
        <NuxtLink to="/faq" class="hover:underline" style="color: var(--md-primary)">FAQ</NuxtLink>
        <span aria-hidden="true" style="color: var(--md-outline-variant)">·</span>
        <NuxtLink to="/about" class="hover:underline" style="color: var(--md-primary)">About</NuxtLink>
        <span aria-hidden="true" style="color: var(--md-outline-variant)">·</span>
        <NuxtLink to="/privacy-policy" class="hover:underline" style="color: var(--md-primary)">Privacy</NuxtLink>
        <span aria-hidden="true" style="color: var(--md-outline-variant)">·</span>
        <NuxtLink to="/terms" class="hover:underline" style="color: var(--md-primary)">Terms</NuxtLink>
        <span aria-hidden="true" style="color: var(--md-outline-variant)">·</span>
        <a
          :href="PDF_TOOL_PH_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
          style="color: var(--md-primary)"
        >
          More free tools: PDF Tool PH
        </a>
      </nav>
    </div>
  </footer>
</template>
