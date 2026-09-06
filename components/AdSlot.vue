<script setup lang="ts">
/**
 * The single, shared ad placeholder for the whole app. Each tab mounts one
 * instance of this component below its results/explainer content — never
 * above or beside the calculator — and because the tabs are mutually
 * exclusive (only the active tab's markup exists in the DOM), exactly one
 * ad slot is ever rendered on screen at a time.
 *
 * Swap the placeholder <div> below for a real AdSense unit, e.g.:
 *
 *   <ins
 *     class="adsbygoogle"
 *     style="display:block"
 *     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *     :data-ad-slot="slot"
 *     data-ad-format="auto"
 *     data-full-width-responsive="true"
 *   />
 *
 * ...and push it once mounted:
 *   onMounted(() => (window.adsbygoogle = window.adsbygoogle || []).push({}))
 *
 * The AdSense loader script itself (adsbygoogle.js) should be added once,
 * globally, in nuxt.config.ts `app.head.script` — not per-slot.
 */
withDefaults(
  defineProps<{
    label?: string
    /** Ad unit slot id, for when this is wired up to real AdSense units. */
    slot?: string
  }>(),
  {
    label: 'Advertisement',
    slot: ''
  }
)
</script>

<template>
  <div
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
</template>
