/**
 * `v-ripple` — a lightweight Material 3 "state layer" ripple, applied to
 * buttons and segmented-control items for pointer-down feedback.
 *
 * Registered as a universal plugin so the directive resolves during SSR/
 * prerendering (otherwise Vue throws trying to server-render an unknown
 * directive) — but the `mounted` hook below, where all the DOM work
 * happens, only ever runs in the browser, so this stays a pure visual
 * affordance with no effect on the prerendered markup or calculation logic.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('ripple', {
    mounted(el: HTMLElement) {
      el.classList.add('m3-ripple-host')
      el.addEventListener('pointerdown', (event: PointerEvent) => {
        if (el.hasAttribute('disabled')) return

        const rect = el.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const span = document.createElement('span')

        span.className = 'm3-ripple'
        span.style.width = `${size}px`
        span.style.height = `${size}px`
        span.style.left = `${event.clientX - rect.left - size / 2}px`
        span.style.top = `${event.clientY - rect.top - size / 2}px`

        el.appendChild(span)
        span.addEventListener('animationend', () => span.remove())
      })
    }
  })
})
