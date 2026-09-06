<script setup lang="ts">
import type { FaqItem } from '~/content/faqs'

const props = defineProps<{
  items: FaqItem[]
}>()

// The structured data always reflects every question/answer regardless of
// which accordion items are currently expanded or collapsed in the UI —
// it's built straight from `props.items`, not from any DOM/open state.
useHead({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      })
    }
  ]
})
</script>

<template>
  <section aria-labelledby="frequently-asked-questions">
    <h2 id="frequently-asked-questions" class="md-title-large mb-4" style="color: var(--md-on-surface)">
      Frequently asked questions
    </h2>
    <div class="m3-card p-2 sm:p-3">
      <Md3Accordion v-for="item in items" :key="item.question" :title="item.question" heading-tag="h3">
        <p>{{ item.answer }}</p>
      </Md3Accordion>
    </div>
  </section>
</template>
