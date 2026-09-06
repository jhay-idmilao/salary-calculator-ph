import type { Config } from 'tailwindcss'

// Colors, shape, and elevation for this app are Material 3 design tokens
// implemented as CSS custom properties in assets/css/main.css (so they can
// swap between the light and dark tonal palettes at runtime). We reference
// them from Tailwind via arbitrary values, e.g. `bg-[var(--md-primary)]`,
// rather than duplicating the palette here.
export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        // 'Google Sans' is a proprietary Google typeface with no public
        // webfont — it's listed first so devices that already have it
        // installed (Pixel, ChromeOS, Google Workspace apps) pick it up for
        // free. Everyone else falls through to Roboto, loaded from Google
        // Fonts, which is Material Design's own official typeface.
        sans: ['"Google Sans Text"', '"Google Sans"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif']
      }
    }
  }
}
