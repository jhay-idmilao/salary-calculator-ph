<script setup lang="ts">
/**
 * A single collapsible disclosure item, closed by default, used to tuck the
 * "how this is calculated" explainer content out of the way so it never
 * competes with the calculator itself for attention.
 *
 * Animates open/closed via a JS-measured max-height transition (rather than
 * the CSS `grid-template-rows: 0fr -> 1fr` trick) for reliable cross-browser
 * behavior.
 */
const props = withDefaults(
  defineProps<{
    title: string
    defaultOpen?: boolean
    /** Heading level wrapping the trigger button, for correct document outline when nested under a section <h2>. */
    headingTag?: 'h2' | 'h3' | 'h4'
  }>(),
  {
    defaultOpen: false,
    headingTag: 'h2'
  }
)

const isOpen = ref(props.defaultOpen)
const panelRef = ref<HTMLElement | null>(null)
const maxHeight = ref(props.defaultOpen ? 'none' : '0px')

function toggle() {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    maxHeight.value = `${panelRef.value?.scrollHeight ?? 0}px`
  } else {
    // Set an explicit pixel height first so the collapse actually animates,
    // then let it transition down to 0 on the next frame.
    maxHeight.value = `${panelRef.value?.scrollHeight ?? 0}px`
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        maxHeight.value = '0px'
      })
    })
  }
}
</script>

<template>
  <div class="m3-accordion-item">
    <component :is="headingTag">
      <button type="button" class="m3-accordion-trigger" :aria-expanded="isOpen" @click="toggle">
        <span>{{ title }}</span>
        <svg class="m3-accordion-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </component>
    <div ref="panelRef" class="m3-accordion-panel" :style="{ maxHeight }">
      <div class="m3-accordion-panel-content m3-prose">
        <slot />
      </div>
    </div>
  </div>
</template>
