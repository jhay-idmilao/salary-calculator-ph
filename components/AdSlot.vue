<script setup lang="ts">
/**
 * Placeholder ad slot.
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
    class="ad-slot flex min-h-[100px] w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 px-4 py-8 text-center"
    role="complementary"
    :aria-label="label"
    data-ad-placeholder="true"
  >
    <span class="text-xs font-medium uppercase tracking-wide text-slate-400">
      {{ label }} — ad slot placeholder
    </span>
  </div>
</template>
