<script setup lang="ts">
/**
 * The single, shared ad unit for the whole app. Each tab mounts one instance
 * of this component below its results/explainer content — never above or
 * beside the calculator — and because the tabs are mutually exclusive (only
 * the active tab's markup exists in the DOM), exactly one ad slot is ever
 * rendered on screen at a time.
 *
 * `ADS_ENABLED` in `constants/ads.ts` is a master switch: while it's `false`
 * (the site's AdSense application is still pending) this component renders
 * nothing at all — no dashed placeholder box for real visitors to see.
 *
 * Once `ADS_ENABLED` is flipped to `true`: in production, once real AdSense
 * IDs are also set, this renders a live `<ins class="adsbygoogle">` unit and
 * requests an ad. In local dev (`npm run dev`), or in any build where those
 * IDs are still placeholders, it falls back to the labeled placeholder box
 * instead — so development and preview builds never depend on a live
 * AdSense account and never show a blank or broken ad slot.
 *
 * The AdSense loader script itself (adsbygoogle.js) is added once, globally,
 * in nuxt.config.ts `app.head.script` — not per-slot.
 */
import { ADS_ENABLED, ADSENSE_CLIENT_ID, ADSENSE_IS_CONFIGURED, ADSENSE_SLOT_ID } from '~/constants/ads'

const props = withDefaults(
  defineProps<{
    label?: string
    /** Ad unit slot id. Defaults to the shared placeholder in constants/ads.ts. */
    slot?: string
  }>(),
  {
    label: 'Advertisement',
    slot: ''
  }
)

// Local dev never has a real AdSense account behind it, so it always shows
// the placeholder (once ads are enabled at all) — independent of whether
// real IDs happen to be filled in.
const showPlaceholder = ADS_ENABLED && (import.meta.dev || !ADSENSE_IS_CONFIGURED)
const showRealAd = ADS_ENABLED && !showPlaceholder
const adSlotId = computed(() => props.slot || ADSENSE_SLOT_ID)

onMounted(() => {
  if (!showRealAd) return
  // Standard AdSense "request an ad for this unit" call — see the module
  // comment above and the README's Monetization section.
  window.adsbygoogle = window.adsbygoogle || []
  window.adsbygoogle.push({})
})
</script>

<template>
  <div
    v-if="showPlaceholder"
    class="flex min-h-[100px] w-full items-center justify-center rounded-[var(--md-shape-lg)] px-4 py-8 text-center"
    style="background-color: var(--md-surface-container); border: 1px dashed var(--md-outline-variant)"
    role="complementary"
    :aria-label="label"
    data-ad-placeholder="true"
  >
    <span class="md-label-large" style="color: var(--md-on-surface-variant)">
      {{ label }} — ad slot placeholder
    </span>
  </div>
  <ins
    v-else-if="showRealAd"
    class="adsbygoogle block min-h-[100px] w-full"
    role="complementary"
    :aria-label="label"
    :data-ad-client="ADSENSE_CLIENT_ID"
    :data-ad-slot="adSlotId"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
</template>
