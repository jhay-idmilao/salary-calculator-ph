# Sahod Calculator

A free, ad-monetized hub of Philippine payroll calculators. Nuxt 3 app, built
as a Material 3 ("Material You") experience: a home/landing view shows one
card per tool, and each card opens its own dedicated, SEO-friendly page
(`/salary-calculator`, `/sss-contribution-calculator`, etc.) with a real,
crawlable URL — not a client-side tab/view switch. Fully static, no backend,
no database, no auth — everything runs client-side in the browser.

## Tools

Every route below is a real Nuxt page (its own file under `pages/`), gets its
own prerendered static HTML file, and has its own `<title>`, meta
description, canonical URL, and (where relevant) JSON-LD schema — see
[SEO & routing](#seo--routing) below.

| Tool | Route |
|---|---|
| Tools hub / landing page | `/` |
| Salary Calculator (SSS, PhilHealth, Pag-IBIG, withholding tax, net pay) | `/salary-calculator` |
| 13th Month Pay Calculator | `/13th-month-pay-calculator` |
| SSS Contribution Calculator | `/sss-contribution-calculator` |
| PhilHealth Contribution Calculator | `/philhealth-contribution-calculator` |
| Pag-IBIG MP2 Savings Calculator | `/pagibig-mp2-calculator` |
| BIR Withholding Tax Calculator | `/bir-withholding-tax-calculator` |
| Government Benefits Guide (content page) | `/government-benefits-guide` |
| FAQ — every calculator's questions, grouped and searchable in one place | `/faq` |
| About Sahod Calculator | `/about` |
| Privacy Policy | `/privacy-policy` |
| Terms of Use | `/terms` |

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

[`pages/index.vue`](pages/index.vue) is the hub. It's a full landing page, not
just a card list — in order: a short hero explaining what the site does and
who it's for, the grid of [`ToolCard.vue`](components/ToolCard.vue) cards
(icon, name, one-line description, each a `NuxtLink` to that tool's own
route) as the primary focus, a "Why use Sahod Calculator?" section (accurate
2026 rates, free/no signup, mobile-first, runs in-browser), a "How it works"
3-step section, a callout linking into the Government Benefits Guide and the
FAQ page, and finally the page's one `<AdSlot />` — after all of that
content, never above the fold or between the hero and the cards. Every
calculator page starts with [`CalculatorPageHeader.vue`](components/CalculatorPageHeader.vue),
which renders a "← Back to all tools" link back to the hub; the logo in
[`AppHeader.vue`](components/AppHeader.vue) (present on every page, via
[`layouts/default.vue`](layouts/default.vue)) also links home, so there are
two ways back to the hub from anywhere in the app.

All of this is real `<NuxtLink>` navigation between real Nuxt routes — there
is no client-side-only tab/segmented-control view switching anywhere in the
app. Every link renders as an actual `<a href="...">` in the prerendered
HTML, each page has its own URL (so the browser back/forward buttons and
direct linking/bookmarking all work normally), and a crawler can reach every
page without executing JavaScript.

**Internal linking** goes beyond just the hub grid, so each page is
reachable from more than one path:

- The **Salary Calculator** links out to the standalone SSS, PhilHealth,
  BIR withholding tax, and Pag-IBIG MP2 calculators for a more detailed,
  single-deduction breakdown.
- The standalone **SSS**, **PhilHealth**, and **BIR withholding tax**
  calculators each link back to the Salary Calculator for the full
  paycheck view.
- The **13th Month Pay** and **Pag-IBIG MP2** calculators link to the
  Salary Calculator and/or the Government Benefits Guide.
- The **Government Benefits Guide** links to every calculator it discusses
  (SSS, PhilHealth, Pag-IBIG MP2, BIR withholding tax) plus the Salary
  Calculator and 13th Month Pay Calculator.
- The **hub** links to all seven tool/content pages via its card grid, plus
  the Government Benefits Guide and FAQ again via its own callout section.
  The **footer** (present on every page) links to the hub, the guide, the
  FAQ, About, Privacy Policy, and Terms.

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
  index.vue                             # Hub — hero + grid of ToolCard cards, links to every route below
  salary-calculator.vue                 # Salary Calculator (form + results + explainers + ad slot)
  13th-month-pay-calculator.vue         # 13th Month Pay Calculator
  sss-contribution-calculator.vue       # Standalone SSS Contribution Calculator
  philhealth-contribution-calculator.vue # Standalone PhilHealth Contribution Calculator
  pagibig-mp2-calculator.vue            # Pag-IBIG MP2 Savings Calculator
  bir-withholding-tax-calculator.vue    # Standalone BIR Withholding Tax Calculator
  government-benefits-guide.vue         # Government Benefits Guide (content page)
  faq.vue                               # All 25 FAQs across every calculator, grouped by topic, one combined FAQPage schema
  about.vue                             # Builder, purpose, methodology, independence disclaimer
  privacy-policy.vue                    # Calculator, hosting, advertising, cookie, and consent policy
  terms.vue                             # Estimate limitations and acceptable-use terms
components/
  AppLogo.vue / AppHeader.vue / AppFooter.vue   # Branding + nav, used via layouts/default.vue
  ToolCard.vue                  # Hub tool card (icon + title + description)
  CalculatorPageHeader.vue      # "← Back to all tools" + page <h1> used on every tool page
  SalaryInputForm.vue / ResultsBreakdown.vue     # Salary Calculator building blocks
  ThirteenthMonthCalculator.vue
  SssCalculatorCore.vue / PhilhealthCalculatorCore.vue
  Mp2CalculatorCore.vue / WithholdingTaxCalculatorCore.vue
  Mp2HistoricalRatesTable.vue   # MP2 dividend-rate history table (sortable, with averages)
  PayFrequencyToggle.vue        # Shared Monthly/Semi-monthly segmented control
  Md3TextField.vue              # M3 filled text field with floating label
  Md3Accordion.vue              # Collapsed-by-default disclosure — explainer content AND every FAQ item reuse this
  SssExplainer.vue / PhilhealthExplainer.vue / PagibigExplainer.vue
  WithholdingTaxExplainer.vue / ThirteenthMonthExplainer.vue / Mp2Explainer.vue
  RatesDisclaimer.vue
  FaqSection.vue               # Visible FAQ cards + matching FAQPage JSON-LD
  AdSlot.vue                   # The single, shared ad placeholder — see "Monetization" below
content/
  faqs.ts                      # Calculator-specific search questions and plain-language answers
utils/
  seo.ts                       # Canonical, Open Graph, Twitter Card, and app-schema metadata
public/
  favicon.ico / favicon.svg    # Browser icons based on the header's peso mark
  apple-touch-icon.png         # iOS bookmark/home-screen icon
  android-chrome-*.png         # PWA icons, including a maskable variant
  site.webmanifest             # Install/bookmark metadata
  sitemap.xml / robots.txt     # Static search-engine discovery files
  og-image.png                 # Branded social-sharing card
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

## Type checking

```bash
npm run typecheck
```

Runs `vue-tsc` against every `.vue`/`.ts` file. `nuxt generate` does **not**
typecheck — Vite strips types without reading them, so a type error builds
and deploys perfectly happily and only shows up at runtime. This is the only
thing in the pipeline that actually catches one.

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push to
`main` and every pull request: install → typecheck → `npm run test` → build
(`npm run generate`). Cloudflare Pages' own Git integration handles the
actual deployment (CD) separately — this workflow only covers the checks a
green Cloudflare build wouldn't: type errors and a broken calculation. Node
version is pinned in [`.nvmrc`](.nvmrc), read by both this workflow and
(if configured to do so) Cloudflare's build image, so CI and the deploy
build never silently run different runtimes.

## Building for production

```bash
npm run generate
```

This produces a fully static site — one HTML file per route (hub, calculators,
guide, About, Privacy, and Terms). With the `cloudflare-pages` Nitro preset, the output is
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

### Troubleshooting: "Missing entry-point to Worker script or to assets directory"

If a Cloudflare Pages build succeeds (all routes prerendered) but the
**deploy** step then fails with this error after running
`Executing user deploy command: npx wrangler deploy`, the project has a
custom **Deploy command** configured in its dashboard settings that doesn't
belong there. `wrangler deploy` is the generic Workers deploy command; a
plain static Pages project doesn't need a deploy command at all — Cloudflare
uploads the **Build output directory** (`dist`) automatically once the build
finishes. Fix it in the Cloudflare dashboard, not in this repo:

1. Open the Pages project → **Settings → Builds & deployments**.
2. Clear the **Deploy command** field entirely (leave it blank).
3. Confirm **Build command** is `npm run generate` (or `npm run build` —
   both run `nuxt generate` and produce the same static-only output, with no
   Cloudflare Worker component) and **Build output directory** is `dist`.
4. Retrigger the deployment.

### Production domain

The site is meant to be served at **`https://sahod.pdf-tool-ph.com`** (no
trailing slash) — that's the value of `SITE_URL` in
[`utils/seo.ts`](utils/seo.ts), which every canonical link, Open Graph/
Twitter Card tag, and JSON-LD `url` field is built from, and it's also
hardcoded into `public/sitemap.xml` and the `Sitemap:` line in
`public/robots.txt` (both are static files, not generated at build time, so
they need editing by hand if the domain ever changes again).

To go live on that domain in the Cloudflare Pages project:

1. Open the Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `sahod.pdf-tool-ph.com`.
3. If the `pdf-tool-ph.com` zone is already in the **same Cloudflare
   account**, Cloudflare adds the required CNAME record automatically and
   activation is usually immediate. If the zone lives in a different
   account (or isn't on Cloudflare at all), you'll instead be shown a CNAME
   target to add manually in that zone's DNS.
4. Cloudflare issues the TLS certificate for the subdomain automatically
   once DNS resolves — no separate certificate step needed.

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

### Historical dividend rates

Below the calculator, [`Mp2HistoricalRatesTable.vue`](components/Mp2HistoricalRatesTable.vue)
shows the actual MP2 dividend rate declared every year since 2010, from
`MP2_HISTORICAL_DIVIDEND_RATES` in
[`constants/rates2026.ts`](constants/rates2026.ts) (a plain `{ year, rate }[]`
— append the next year's rate there once it's officially announced). It's
reference information only and never feeds into the projection itself:

- Sorted **latest year first** by default, with a sort toggle to switch to
  **highest rate first** for anyone comparing the best/worst years.
- Shows the full-history average and the last-5-years average, plus a
  one-line comparison of the calculator's default projection rate
  (`MP2_CONFIG.defaultAnnualDividendRate`) against the full-history average,
  computed dynamically so it stays correct as more years are appended.
- **⚠️ The 2021 rate is unverified.** Public sources disagree between 5.79%
  and 6.00%; `MP2_HISTORICAL_DIVIDEND_RATES` uses 5.79% as a placeholder (see
  the comment above that entry). The UI also flags it with a footnote.
  Confirm the correct figure against Pag-IBIG's official 2021 dividend rate
  circular before launch.

## Monetization (AdSense)

There is exactly **one** `<AdSlot />` per calculator/content screen
([`AdSlot.vue`](components/AdSlot.vue)), reused across every page, placed
below that page's results/explainer content — never above or beside an input
form:

- Each of the six calculator pages shows one ad slot after its calculator,
  explainer, and FAQ content (always visible, not conditional on a result being computed).
- The Government Benefits Guide (`/government-benefits-guide`) and the FAQ
  page (`/faq`) each show one ad slot after their written content.
- **The hub (`/`) has exactly one ad slot too** — placed at the very end,
  after the hero, the tool cards, the "Why use this"/"How it works"
  sections, and the Guide/FAQ callout. It never sits above the fold or
  between the hero and the cards.

Because each page is its own route, only one page's markup is ever mounted
at a time, so only one ad slot is ever on screen.

The Privacy Policy discloses the intended use of Google advertising cookies
and data. Before enabling ad tags, configure the required AdSense publisher
and ad-unit IDs and, if ads will be served to visitors in the EEA, UK, or
Switzerland, configure a Google-certified consent management platform. The
repository does not include a live consent flow or AdSense account settings.

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

The footer also links to the Government Benefits Guide, About page, Privacy
Policy, and Terms of Use on every route.

## SEO, FAQ schema, and discovery

- Every page is a real Nuxt route (its own file under `pages/`), listed in
  `nitro.prerender.routes` in [`nuxt.config.ts`](nuxt.config.ts) so
  `nuxt generate` always builds it as its own static HTML file — nothing is
  left to client-side-only rendering. `crawlLinks: true` is kept as a
  fallback, but the explicit list is what actually guarantees every route
  below gets built.
- Every page has a unique search-focused title and description plus canonical,
  Open Graph, and Twitter Card metadata from [`utils/seo.ts`](utils/seo.ts).
  `setPageSeo({ path, ... })` sets `<link rel="canonical" href="{SITE_URL}{path}">`
  pointing at that page's own clean URL — every page calls it with its own
  `path`, so there's no duplicate-content ambiguity between the hub and the
  individual tool pages.
- Every calculator includes visible, calculator-specific FAQs, rendered as
  collapsed-by-default Material 3 accordion items (each one is a
  [`Md3Accordion`](components/Md3Accordion.vue), reusing the same
  interaction pattern as the explainer sections). The exact same questions
  and answers are emitted as `FAQPage` JSON-LD by
  [`FaqSection.vue`](components/FaqSection.vue) directly from the `items`
  prop — not from the DOM or from which accordion items happen to be
  expanded — so the structured data is always complete and never describes
  hidden or different copy, regardless of UI state. Google currently shows
  FAQ rich results mainly for well-known authoritative government and health
  sites, so valid markup improves machine-readable context but does not
  guarantee a rich result.
- [`pages/faq.vue`](pages/faq.vue) aggregates every calculator's FAQs (25
  questions across 6 topics) onto one page, grouped under a heading with a
  link to that topic's calculator, and emits one combined `FAQPage` schema
  for the whole page (rather than one schema block per topic).
- Calculator routes include `WebApplication` JSON-LD; the hub uses `WebSite`
  markup and the guide uses `Article` markup.
- [`public/sitemap.xml`](public/sitemap.xml) and
  [`public/robots.txt`](public/robots.txt) are plain static files and are copied
  unchanged by `nuxt generate`.
- The favicon, Apple touch icon, Android/PWA icons, web manifest, and generated
  social card all reuse the blue-and-white peso identity from the app header.

## Before-launch placeholders and checks

Replace or verify all of these before making the site public or applying for
AdSense:

- **Owner and contact:** the About page intentionally describes the builder
  generically. The contact address on About, Privacy, and Terms is
  `hello@pdftool.ph` — confirm that mailbox is actually monitored before
  launch, or swap in a different one if not.
- **Legal review:** Privacy and Terms are practical starter documents, not legal
  advice. Review them for the operator's real business, providers, audience,
  jurisdiction, retention practices, and consent implementation.
- **Rate verification:** cross-check every 2026 bracket and program statement
  against the latest primary agency circulars before using “2026” in production.
- **Ad configuration:** add the real AdSense publisher/ad-unit IDs, ads.txt if
  required by the account, and the appropriate consent experience before loading
  advertising scripts.

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
