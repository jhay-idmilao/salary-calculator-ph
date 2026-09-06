# Sahod Calculator

A free, ad-monetized Philippine payroll calculator. Single-page Nuxt 3 app —
enter a gross salary and instantly see SSS, PhilHealth, and Pag-IBIG
contributions, BIR withholding tax, and net take-home pay, plus a separate
13th month pay calculator. Fully static, no backend, no database, no auth —
everything runs client-side in the browser.

## Tech stack

- [Nuxt 3](https://nuxt.com/) + TypeScript + `<script setup>`
- Tailwind CSS (mobile-first)
- Static generation (`nuxt generate`) — zero server/API calls
- [Vitest](https://vitest.dev/) for unit tests
- Cloudflare Pages preset (`nitro.preset: 'cloudflare-pages'`)

## Project structure

```
constants/rates2026.ts        # All statutory rates/brackets — update yearly here
composables/
  useSssCalculator.ts          # SSS (MSC bracket table, employee/employer/EC)
  usePhilhealthCalculator.ts   # PhilHealth (5% split, floor/ceiling)
  usePagibigCalculator.ts      # Pag-IBIG / HDMF (2%/2%, ₱200 cap)
  useWithholdingTax.ts         # BIR TRAIN law annual brackets
  use13thMonthPay.ts           # DOLE 13th month pay + ₱90,000 exemption
  usePayrollCalculator.ts      # Orchestrates the above for one pay period
components/
  SalaryInputForm.vue          # Gross salary + pay frequency input
  ResultsBreakdown.vue         # Contribution/tax/net-pay results table
  ThirteenthMonthCalculator.vue
  ExplainerSection.vue         # Reusable wrapper for SEO/AdSense content
  RatesDisclaimer.vue
  AdSlot.vue                   # Labeled placeholder — swap in real AdSense <ins> later
pages/index.vue                # The single page, in the required section order
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
monthly/semi-monthly frequencies, and 13th month pay incl. the ₱90,000
tax-exempt ceiling).

## Building for production

```bash
npm run generate
```

This produces a fully static site. With the `cloudflare-pages` Nitro preset,
the output is written to `dist/` (Cloudflare Pages' expected output folder —
not `.output/public`).

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
Pag-IBIG caps, BIR tax brackets, the 13th month tax-exempt ceiling) live in
[`constants/rates2026.ts`](constants/rates2026.ts). None of the calculation
logic in `composables/` needs to change — just update the constants file
(and its `RATES_LAST_REVIEWED` date) and add the corresponding test cases.

## ⚠️ Rates disclaimer

The rates in `constants/rates2026.ts` are transcribed from publicly available
2025/2026 SSS, PhilHealth, Pag-IBIG (HDMF), and BIR (TRAIN law) reference
tables. They have **not** yet been individually cross-checked against the
primary circulars (SSS Circular, PhilHealth Circular, HDMF Circular, BIR
Revenue Regulations) for the 2026 contribution year. Verify every bracket
against the official issuances before relying on this tool for actual
payroll processing. This disclaimer is also shown in the app itself, in the
[`RatesDisclaimer`](components/RatesDisclaimer.vue) component at the bottom
of the page.

## Monetization (AdSense)

Three placeholder ad slots ([`AdSlot.vue`](components/AdSlot.vue)) are
positioned in `pages/index.vue`:

1. Below the results breakdown
2. Between the two calculators
3. Within the explainer content

To go live, replace the placeholder `<div>` in `AdSlot.vue` with a real
AdSense `<ins class="adsbygoogle">` unit (see the comment at the top of that
file for the exact markup), and add the AdSense loader script once, globally,
in `nuxt.config.ts` (`app.head.script`).
