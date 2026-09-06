/**
 * Philippine statutory contribution & tax rates — 2026 edition.
 *
 * ⚠️ DISCLAIMER (last reviewed: 2026-09-06)
 * These figures are transcribed from publicly available 2025/2026 SSS,
 * PhilHealth, Pag-IBIG (HDMF) and BIR (TRAIN law) reference tables. They have
 * NOT yet been individually cross-checked against the primary circulars
 * (SSS Circular, PhilHealth Circular, HDMF Circular, BIR Revenue Regulations)
 * for the 2026 contribution year. Verify every bracket against the official
 * issuances before relying on this tool for actual payroll processing.
 *
 * Keeping all tunable numbers in this single file means the rates can be
 * updated year-to-year without touching any calculation logic in the
 * composables.
 */

export const RATES_LAST_REVIEWED = '2026-09-06'
export const RATES_YEAR = 2026

export const RATES_DISCLAIMER =
  `These are ${RATES_YEAR} rates based on published SSS / PhilHealth / Pag-IBIG / BIR ` +
  `reference tables and have not yet been individually cross-checked against every ` +
  `official circular. Please verify against the primary source documents before using ` +
  `these figures for actual payroll. Last reviewed ${RATES_LAST_REVIEWED}.`

/* ------------------------------------------------------------------ */
/* SSS                                                                  */
/* ------------------------------------------------------------------ */

export interface SssBracket {
  /** Inclusive lower bound of the compensation range (₱). */
  min: number
  /** Inclusive upper bound of the compensation range (₱). `null` = no upper bound. */
  max: number | null
  /** Monthly Salary Credit assigned to this compensation range. */
  msc: number
}

export const SSS_CONFIG = {
  /** Total contribution rate as a share of MSC. */
  totalRate: 0.15,
  employeeRate: 0.05,
  employerRate: 0.1,
  mscFloor: 4000,
  mscCeiling: 35000,
  mscStep: 500,
  /** Employer-only Employees' Compensation (EC) contribution. */
  ecLowMsc: 10, // MSC < ecThreshold
  ecHighMsc: 30, // MSC >= ecThreshold
  ecThreshold: 15000
}

/**
 * Builds the SSS Monthly Salary Credit bracket table.
 *
 * Each bracket spans ±(step/2) around its MSC value, matching the shape of
 * the published SSS contribution schedule (compensation ranges map to a
 * stepped MSC, not a 1:1 continuous value). The first bracket catches every
 * salary below the floor, the last bracket catches every salary at/above the
 * ceiling.
 */
function buildSssBrackets(): SssBracket[] {
  const { mscFloor, mscCeiling, mscStep } = SSS_CONFIG
  const brackets: SssBracket[] = []
  let min = 0

  for (let msc = mscFloor; msc <= mscCeiling; msc += mscStep) {
    const isLast = msc >= mscCeiling
    const max = isLast ? null : msc + mscStep / 2 - 0.01
    brackets.push({ min, max, msc })
    min = max === null ? min : max + 0.01
  }

  return brackets
}

export const SSS_BRACKETS: SssBracket[] = buildSssBrackets()

/* ------------------------------------------------------------------ */
/* PhilHealth                                                           */
/* ------------------------------------------------------------------ */

export const PHILHEALTH_CONFIG = {
  totalRate: 0.05,
  employeeRate: 0.025,
  employerRate: 0.025,
  salaryFloor: 10000,
  salaryCeiling: 100000
}

/* ------------------------------------------------------------------ */
/* Pag-IBIG (HDMF)                                                      */
/* ------------------------------------------------------------------ */

export const PAGIBIG_CONFIG = {
  employeeRate: 0.02,
  employerRate: 0.02,
  compensationCeiling: 10000,
  /** Hard peso cap per side, reached once compensation >= ceiling. */
  maxEmployeeContribution: 200,
  maxEmployerContribution: 200
}

/* ------------------------------------------------------------------ */
/* BIR Withholding Tax (TRAIN law, annual brackets)                     */
/* ------------------------------------------------------------------ */

export interface TaxBracket {
  min: number
  max: number | null
  baseTax: number
  rate: number
}

export const BIR_ANNUAL_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 250000, baseTax: 0, rate: 0 },
  { min: 250000, max: 400000, baseTax: 0, rate: 0.15 },
  { min: 400000, max: 800000, baseTax: 22500, rate: 0.2 },
  { min: 800000, max: 2000000, baseTax: 102500, rate: 0.25 },
  { min: 2000000, max: 8000000, baseTax: 402500, rate: 0.3 },
  { min: 8000000, max: null, baseTax: 2202500, rate: 0.35 }
]

/* ------------------------------------------------------------------ */
/* Pag-IBIG MP2 (voluntary savings)                                     */
/* ------------------------------------------------------------------ */

export const MP2_CONFIG = {
  /** Minimum allowed monthly contribution — there is no upper limit. */
  minMonthlyContribution: 500,
  /** Lock-in / maturity term per enrollment, in years. Members may re-enroll after maturity. */
  lockInYears: 5,
  /**
   * A recent published Pag-IBIG MP2 annual dividend rate, used only as the
   * calculator's starting/default value. MP2 dividends are declared once a
   * year by the Pag-IBIG Fund Board based on actual fund performance and are
   * NOT guaranteed — this default should be treated as a placeholder for the
   * user to override, not a promised return.
   */
  defaultAnnualDividendRate: 0.07
}

export const MP2_DIVIDEND_DISCLAIMER =
  'This is a projection based on the annual dividend rate you enter above, not a guarantee. ' +
  'Pag-IBIG MP2 dividends are declared once a year by the Pag-IBIG Fund Board based on the ' +
  "fund's actual investment performance and credited to members' average monthly balance — " +
  'actual rates have varied year to year and may be higher or lower than what you entered.'

/* ------------------------------------------------------------------ */
/* 13th Month Pay                                                       */
/* ------------------------------------------------------------------ */

export const THIRTEENTH_MONTH_CONFIG = {
  /** Tax-exempt ceiling for 13th month pay + other benefits combined. */
  taxExemptCeiling: 90000,
  monthsInYear: 12
}

/* ------------------------------------------------------------------ */
/* Pay frequency                                                        */
/* ------------------------------------------------------------------ */

export type PayFrequency = 'monthly' | 'semi-monthly'

export const PAY_PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  monthly: 12,
  'semi-monthly': 24
}
