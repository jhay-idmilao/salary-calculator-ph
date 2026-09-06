export {}

declare global {
  interface Window {
    /**
     * The command queue used by Google's AdSense loader script (see the
     * `app.head.script` entry in nuxt.config.ts). Pushing an empty object
     * requests an ad for the next un-filled `<ins class="adsbygoogle">` unit
     * on the page — see AdSlot.vue.
     */
    adsbygoogle?: Record<string, unknown>[]
  }
}
