/**
 * Google AdSense identifiers.
 *
 * ADSENSE_CLIENT_ID is the real publisher ID, shared with pdf-tool-ph (same
 * AdSense account, same builder).
 *
 * ⚠️ PLACEHOLDER — ADSENSE_SLOT_ID still needs a real value: an ad unit ID
 * created in AdSense → Ads → By ad unit for this site specifically, a bare
 * numeric string, e.g. "1234567890". A publisher ID is shared across a
 * whole AdSense account, but ad unit IDs are per-site.
 *
 * These two values feed three places, all of which need the real values
 * before ads will actually serve — see the "Monetization (AdSense)" section
 * in the README for the full checklist:
 *   1. Here.
 *   2. `public/ads.txt` (the publisher ID only — see that file's comment).
 *   3. Nowhere else — `nuxt.config.ts` and `AdSlot.vue` both import these
 *      constants rather than hardcoding the IDs a second time.
 */
export const ADSENSE_CLIENT_ID = 'ca-pub-7109560885960565'
export const ADSENSE_SLOT_ID = 'XXXXXXXXXX'

/**
 * True once both IDs above have been replaced with real values. `AdSlot.vue`
 * uses this to decide whether to request a real ad or fall back to the
 * labeled placeholder box — so the site never ships a live-looking ad unit
 * that's actually pointed at nobody's AdSense account.
 */
export const ADSENSE_IS_CONFIGURED = !ADSENSE_CLIENT_ID.includes('X') && !ADSENSE_SLOT_ID.includes('X')
