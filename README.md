# Sahod Calculator

A free, ad-monetized hub of Philippine payroll calculators. Nuxt 3 app, built
as a Material 3 ("Material You") experience: a home/landing view shows one
card per tool, and each card opens its own dedicated, SEO-friendly page
(`/salary-calculator`, `/sss-calculator`, etc.) rather than a tab. Fully
static, no backend, no database, no auth — everything runs client-side in the
browser.

## Tools

| Tool | Route |
|---|---|
| Salary Calculator (SSS, PhilHealth, Pag-IBIG, withholding tax, net pay) | `/salary-calculator` |
| 13th Month Pay Calculator | `/13th-month-pay` |
| SSS Contribution Calculator | `/sss-calculator` |
| PhilHealth Contribution Calculator | `/philhealth-calculator` |
| Pag-IBIG MP2 Savings Calculator | `/pagibig-mp2-calculator` |
| BIR Withholding Tax Calculator | `/withholding-tax-calculator` |
| Government Benefits Guide (content page) | `/guide` |

## Tech stack

- [Nuxt 3](https://nuxt.com/) + TypeScript + `<script setup>`
- Nuxt's file-based router (`pages/`) — each tool is its own static route,
  which is both good for SEO and lets navigation still feel instant (Vue
  Router client-side transitions, no full page reload)
- Tailwind CSS (mobile-first) + a hand-rolled Material 3 design-token layer
- Static generation (`nuxt generate`) — zero server/API calls
- [Vitest](https://vitest.dev/) for unit tests
- Cloudflare Pages preset (`nitro.preset: 'cloudflare-pages'`)

## Navigation: hub + cards

[`pages/index.vue`](pages/index.vue) is the hub — a short hero plus a grid of
[`ToolCard.vue`](components/ToolCard.vue) cards (icon, name, one-line
description), each a `NuxtLink` to that tool's own route. Every calculator
page starts with [`CalculatorPageHeader.vue`](components/CalculatorPageHeader.vue),
which renders a "← Back to all tools" link back to the hub; the logo in
[`AppHeader.vue`](components/AppHeader.vue) (present on every page, via
[`layouts/default.vue`](layouts/default.vue)) also links home, so there are
two ways back to the hub from anywhere in the app.

## Design system: Material 3

The whole UI is built on Material 3 design tokens, implemented as CSS custom
properties in [`assets/css/main.css`](assets/css/main.css):

- **Color** — a full M3 tonal palette (primary/on-primary/primary-container,
  secondary, tertiary, error, surface + surface-container tiers, outline,
  etc.) generated from a single trustworthy-blue seed (`#0B57D0`), with a
  complete dark-theme override under `prefers-color-scheme: dark` — no manual
  toggle needed, it follows the OS/browser setting like Material 3 apps do.
- **Shape & elevation** — the M3 shape scale (4/8/12/16/28px + pill) and the
  official M3 elevation shadow specs, used for cards, buttons, and segmented
  controls. Tool cards on the hub lift on hover/focus (`.m3-card-hoverable`).
- **Components** — filled text fields with floating labels
  ([`Md3TextField.vue`](components/Md3TextField.vue)), filled/tonal pill
  buttons, a Material 3 segmented button group for the Monthly/Semi-monthly
  picker ([`PayFrequencyToggle.vue`](components/PayFrequencyToggle.vue)), and
  a collapsible disclosure ([`Md3Accordion.vue`](components/Md3Accordion.vue))
  for each page's explainer content.
- **Micro-interactions** — a `v-ripple` directive
  ([`plugins/ripple.ts`](plugins/ripple.ts)) gives every button, card, and
  segmented control a Material state-layer ripple on press; revealing or
  refreshing a result animates via Vue `<Transition>` (fade + slight motion)
  instead of snapping into place.

**Typography — the "Google Sans" fallback chain.** Google Sans is a
proprietary Google typeface with no public webfont on Google Fonts, so we
declare it first in the CSS font stack — `'Google Sans Text', 'Google Sans',
Roboto, ...` — which costs nothing and is a genuine win on devices that
already have it installed locally as a system font (Pixel, ChromeOS, and
machines with Google Workspace apps installed). Everywhere else, it falls
through cleanly to **Roboto**, loaded from Google Fonts in
[`nuxt.config.ts`](nuxt.config.ts) — which is Material Design's own official
reference typeface, so the app still looks authentically "Google" for every
visitor even without the proprietary font.

## Project structure

```
constants/rates2026.ts        # All statutory rates/brackets — update yearly here
composables/
  useSssCalculator.ts          # SSS (MSC bracket table, employee/employer/EC)
  usePhilhealthCalculator.ts   # PhilHealth (5% split, floor/ceiling)
  usePagibigCalculator.ts      # Pag-IBIG / HDMF (2%/2%, ₱200 cap)
  useWithholdingTax.ts         # BIR TRAIN law annual brackets
  use13thMonthPay.ts           # DOLE 13th month pay + ₱90,000 exemption
  useMp2Calculator.ts          # Pag-IBIG MP2 projection (annual dividend crediting; regular + flexible schedules)
  usePayrollCalculator.ts      # Orchestrates SSS/PhilHealth/Pag-IBIG/tax for one pay period
plugins/
  ripple.ts                    # v-ripple directive (Material state-layer feedback)
layouts/
  default.vue                  # AppHeader + page content + AppFooter, used on every page
pages/
  index.vue                    # Hub — hero + grid of ToolCard cards
  salary-calculator.vue        # Salary Calculator (form + results + explainers + ad slot)
  13th-month-pay.vue           # 13th Month Pay Calculator
  sss-calculator.vue           # Standalone SSS Contribution Calculator
  philhealth-calculator.vue    # Standalone PhilHealth Contribution Calculator
  pagibig-mp2-calculator.vue   # Pag-IBIG MP2 Savings Calculator
  withholding-tax-calculator.vue # Standalone BIR Withholding Tax Calculator
  guide.vue                    # Government Benefits Guide (content page)
components/
  AppLogo.vue / AppHeader.vue / AppFooter.vue   # Branding + nav, used via layouts/default.vue
  ToolCard.vue                  # Hub tool card (icon + title + description)
  CalculatorPageHeader.vue      # "← Back to all tools" + page <h1> used on every tool page
  SalaryInputForm.vue / ResultsBreakdown.vue     # Salary Calculator building blocks
  ThirteenthMonthCalculator.vue
  SssCalculatorCore.vue / PhilhealthCalculatorCore.vue
  Mp2CalculatorCore.vue / WithholdingTaxCalculatorCore.vue
  PayFrequencyToggle.vue        # Shared Monthly/Semi-monthly segmented control
  Md3TextField.vue              # M3 filled text field with floating label
  Md3Accordion.vue              # Collapsed-by-default disclosure for explainer content
  SssExplainer.vue / PhilhealthExplainer.vue / PagibigExplainer.vue
  WithholdingTaxExplainer.vue / ThirteenthMonthExplainer.vue / Mp2Explainer.vue
  RatesDisclaimer.vue
  AdSlot.vue                   # The single, shared ad placeholder — see "Monetization" below
tests/                         # Vitest specs with known sample computations
```

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Running tests

```bash
npm run test
```

All calculation composables are covered with known sample computations (SSS
bracket edges, PhilHealth floor/ceiling, Pag-IBIG cap, BIR tax brackets across
monthly/semi-monthly frequencies, 13th month pay incl. the ₱90,000 tax-exempt
ceiling, and the Pag-IBIG MP2 annual-dividend-crediting projection — regular
fixed-monthly, flexible with gaps and a lump sum, and the hybrid
base-plus-extras case, including an exact-equivalence test between the
regular and flexible engines for the same uniform schedule).

## Building for production

```bash
npm run generate
```

This produces a fully static site — one HTML file per route (hub + 7 tool/
content pages). With the `cloudflare-pages` Nitro preset, the output is
written to `dist/` (Cloudflare Pages' expected output folder — not
`.output/public`). All routes are also listed explicitly in
`nitro.prerender.routes` in [`nuxt.config.ts`](nuxt.config.ts) (on top of
`crawlLinks`), so every hub/tool/content page is guaranteed a prerendered
file regardless of link-crawl order — add new routes there when you add a
new tool page.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub/GitLab.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, and select the repo.
3. Build settings:
   - **Framework preset:** Nuxt (or "None" — the build command below is
     explicit either way)
   - **Build command:** `npm run generate`
   - **Build output directory:** `dist`
4. Deploy. Every push to the connected branch triggers a new static build —
   no server, database, or environment variables required.

You can also test the production build locally before deploying:

```bash
npm run generate
npx wrangler pages dev dist
```

## Updating rates for a new year

All tunable numbers (SSS MSC floor/ceiling/step, PhilHealth floor/ceiling,
Pag-IBIG caps, BIR tax brackets, the 13th month tax-exempt ceiling, and the
MP2 defaults) live in [`constants/rates2026.ts`](constants/rates2026.ts).
None of the calculation logic in `composables/` needs to change — just
update the constants file (and its `RATES_LAST_REVIEWED` date) and add the
corresponding test cases.

## ⚠️ Rates disclaimer

The rates in `constants/rates2026.ts` are transcribed from publicly available
2025/2026 SSS, PhilHealth, Pag-IBIG (HDMF), and BIR (TRAIN law) reference
tables. They have **not** yet been individually cross-checked against the
primary circulars (SSS Circular, PhilHealth Circular, HDMF Circular, BIR
Revenue Regulations) for the 2026 contribution year. Verify every bracket
against the official issuances before relying on this tool for actual
payroll processing. This disclaimer is shown in the app itself in the
footer of every page ([`AppFooter.vue`](components/AppFooter.vue), via
[`RatesDisclaimer.vue`](components/RatesDisclaimer.vue)).

The **Pag-IBIG MP2** dividend rate is a separate, explicit case: it defaults
to a recent published rate (`MP2_CONFIG.defaultAnnualDividendRate`, currently
7%) but is always an **editable input** in the calculator itself — MP2
dividends are declared annually by the Pag-IBIG Fund Board and are not
guaranteed. See `MP2_DIVIDEND_DISCLAIMER` in the constants file, shown in the
calculator's results and its explainer.

## Pag-IBIG MP2: Regular vs. Flexible contributions

[`Mp2CalculatorCore.vue`](components/Mp2CalculatorCore.vue) has a segmented
**Regular / Flexible** toggle at the top of the screen:

- **Regular** (default) — a fixed amount every month for a set number of
  years, unchanged from the original calculator. Calls
  `useMp2Calculator().calculate(monthlyContribution, years, rate)`.
- **Flexible** — a self-built list of `{ month, amount }` contributions to
  support skipped months, irregular amounts, and one-off lump sums (e.g. a
  bonus). An optional "base monthly amount" is the hybrid shortcut: it's
  applied to every month of the 5-year term, and any list entries are added
  on top of it (entries in the same month sum together), so a mostly-regular
  saver doesn't have to type all 60 months by hand just to add one bonus.
  Calls `useMp2Calculator().calculateFromEntries(entries, rate, { baseMonthlyAmount, termYears })`.

Both modes ultimately share one engine —
`calculateFromMonthlyAmounts(monthlyAmounts, rate)` in
[`useMp2Calculator.ts`](composables/useMp2Calculator.ts) — which walks the
term month by month, treating each month's own contribution as landing
evenly across that month (a linear ramp) when computing that year's average
balance, so dividends are always computed the "average monthly balance"
way, never as a flat rate applied to the running total. This generalizes the
original per-year approximation exactly: when every month's contribution is
equal, it reduces to the original formula bit-for-bit (see the "matches the
regular fixed-monthly engine exactly" test in
[`tests/useMp2Calculator.spec.ts`](tests/useMp2Calculator.spec.ts)). The
5-year lock-in horizon is unchanged in both modes — in Flexible mode,
contributions can stop early, but any existing balance keeps earning
dividends until maturity.

## Monetization (AdSense)

There is exactly **one** `<AdSlot />` per calculator/content screen
([`AdSlot.vue`](components/AdSlot.vue)), reused across every page, placed
below that page's results/explainer content — never above or beside an input
form:

- Each of the six calculator pages shows one ad slot below its
  calculator (always visible, not conditional on a result being computed).
- The Government Benefits Guide (`/guide`) shows one ad slot after its
  written content.
- **The hub (`/`) has zero ad slots.**

Because each page is its own route, only one page's markup is ever mounted
at a time, so only one ad slot is ever on screen.

To go live, replace the placeholder `<div>` in `AdSlot.vue` with a real
AdSense `<ins class="adsbygoogle">` unit (see the comment at the top of that
file for the exact markup), and add the AdSense loader script once, globally,
in `nuxt.config.ts` (`app.head.script`).

## Header, footer, and the PDF Tool PH link

[`AppHeader.vue`](components/AppHeader.vue) and
[`AppFooter.vue`](components/AppFooter.vue) are rendered on every page via
[`layouts/default.vue`](layouts/default.vue). The footer includes the site
name/tagline, the rates disclaimer, and a links row with the Government
Benefits Guide and a cross-promotional link to **PDF Tool PH**, a sibling
tool from the same builder.

The `PDF_TOOL_PH_URL` constant in [`AppFooter.vue`](components/AppFooter.vue)
points to the real PDF Tool PH site (`http://pdf-tool-ph.com/`) and opens in
a new tab.

## UX notes

- Every tool page opens directly into its calculator — the input form is the
  first interactive thing on the page, with nothing competing for attention
  above or beside it.
- All "how this is calculated" explainer content lives in collapsed-by-default
  accordions ([`Md3Accordion.vue`](components/Md3Accordion.vue)), so it never
  gets in the way of a quick answer but is one tap away for anyone who wants
  the detail — and it's what makes each page eligible for AdSense (real
  written content, not just a bare input). The Government Benefits Guide is
  the deeper, benefits-focused version of this content (what you actually
  get for each contribution), written for someone new to Philippine payroll.
- Verified mobile-responsive down to a 375px-wide viewport (hub card grid,
  segmented controls, text fields, and results tables all reflow correctly).
