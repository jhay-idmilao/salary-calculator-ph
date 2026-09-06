import { MP2_CONFIG } from '~/constants/rates2026'

export interface Mp2YearBreakdown {
  year: number
  contributions: number
  dividend: number
  endingBalance: number
}

export interface Mp2Result {
  totalContributions: number
  totalDividends: number
  /** Total contributions + total dividends at the end of the term. */
  maturityValue: number
  yearlyBreakdown: Mp2YearBreakdown[]
}

/**
 * One irregular/flexible-mode contribution: an amount landing in a given
 * month of the enrollment term (1 = the first month). Multiple entries in
 * the same month are summed — this is how a one-off lump sum "on top of" a
 * base monthly amount is represented.
 */
export interface Mp2ContributionEntry {
  month: number
  amount: number
}

/**
 * Projects Pag-IBIG MP2 voluntary savings growth.
 *
 * MP2 dividends are declared and credited ANNUALLY (not monthly), based on a
 * member's average monthly balance for that year — and because credited
 * dividends join the balance, they earn dividends themselves in later years
 * (i.e. the growth compounds annually). Every mode below (regular fixed
 * schedule, or a flexible/irregular list of contributions) is compiled down
 * to the same thing — a plain array of month-by-month contribution amounts
 * — and run through the same `calculateFromMonthlyAmounts` engine, so
 * dividends are always computed the same way regardless of how the input
 * was built.
 *
 * Within a year, each month's own contribution is treated as landing evenly
 * across that month (a linear ramp from 0 to its full amount), so its
 * contribution to the year's average balance is the running balance before
 * that month plus half of that month's own amount. Averaged over the
 * months in the year, this reduces to the simple "opening balance + half
 * this year's contributions" approximation when every month's contribution
 * is equal — exactly matching the original fixed-monthly calculation.
 *
 * The `annualDividendRate` is a projection input supplied by the caller
 * (e.g. from an editable field defaulted to `MP2_CONFIG.defaultAnnualDividendRate`)
 * — MP2 dividends are not guaranteed, so this is an estimate, not a promise.
 */
export function useMp2Calculator() {
  /**
   * The shared calculation engine. `monthlyAmounts[i]` is the contribution
   * made in month `i + 1` of the term; months are grouped into consecutive
   * 12-month years for annual dividend crediting.
   */
  function calculateFromMonthlyAmounts(monthlyAmounts: number[], annualDividendRate: number): Mp2Result {
    const rate = Math.max(annualDividendRate, 0)
    const totalMonths = Math.max(monthlyAmounts.length, 0)
    const totalYears = Math.ceil(totalMonths / 12)

    let balance = 0
    let totalContributions = 0
    let totalDividends = 0
    const yearlyBreakdown: Mp2YearBreakdown[] = []

    for (let year = 1; year <= totalYears; year++) {
      const startIndex = (year - 1) * 12
      const endIndex = Math.min(startIndex + 12, totalMonths)
      const monthsInYear = endIndex - startIndex

      const openingBalance = balance
      let runningBalance = openingBalance
      let sumOfMonthlyBalances = 0
      let yearlyContribution = 0

      for (let i = startIndex; i < endIndex; i++) {
        const amount = Math.max(monthlyAmounts[i] ?? 0, 0)
        // This month's own contribution ramps in linearly, so it
        // contributes half of itself to this month's "average" balance.
        sumOfMonthlyBalances += runningBalance + amount / 2
        runningBalance += amount
        yearlyContribution += amount
      }

      const roundedYearlyContribution = round2(yearlyContribution)
      const averageBalance = monthsInYear > 0 ? sumOfMonthlyBalances / monthsInYear : 0
      const dividend = round2(averageBalance * rate)
      const endingBalance = round2(openingBalance + roundedYearlyContribution + dividend)

      totalContributions = round2(totalContributions + roundedYearlyContribution)
      totalDividends = round2(totalDividends + dividend)
      balance = endingBalance

      yearlyBreakdown.push({
        year,
        contributions: roundedYearlyContribution,
        dividend,
        endingBalance
      })
    }

    return {
      totalContributions,
      totalDividends,
      maturityValue: balance,
      yearlyBreakdown
    }
  }

  /**
   * Regular mode: a fixed amount contributed every month for `years` years
   * — the original, unchanged calculation.
   */
  function calculate(monthlyContribution: number, years: number, annualDividendRate: number): Mp2Result {
    const safeMonthly = Math.max(monthlyContribution, 0)
    const wholeYears = Math.max(Math.round(years), 0)
    const monthlyAmounts = Array(wholeYears * 12).fill(safeMonthly)

    return calculateFromMonthlyAmounts(monthlyAmounts, annualDividendRate)
  }

  /**
   * Flexible mode: an arbitrary list of {month, amount} contribution
   * entries — supporting skipped months (simply no entry that month),
   * irregular amounts, and one-off lump sums — optionally layered on top of
   * a uniform `baseMonthlyAmount` applied to every month of the term (the
   * "hybrid" shortcut for a mostly-regular saver who occasionally adds
   * extra). Entries landing in the same month are summed together.
   *
   * The term always spans the full lock-in horizon
   * (`options.termYears`, default `MP2_CONFIG.lockInYears`) — contributions
   * may stop early, but any existing balance keeps earning dividends until
   * maturity. Entries beyond the term are ignored.
   */
  function calculateFromEntries(
    entries: Mp2ContributionEntry[],
    annualDividendRate: number,
    options: { baseMonthlyAmount?: number; termYears?: number } = {}
  ): Mp2Result {
    const termYears = Math.max(Math.round(options.termYears ?? MP2_CONFIG.lockInYears), 0)
    const totalMonths = termYears * 12
    const base = Math.max(options.baseMonthlyAmount ?? 0, 0)

    const monthlyAmounts = Array(totalMonths).fill(base)

    for (const entry of entries) {
      const index = Math.round(entry.month) - 1
      if (index < 0 || index >= totalMonths) continue
      if (!Number.isFinite(entry.amount) || entry.amount <= 0) continue
      monthlyAmounts[index] += entry.amount
    }

    return calculateFromMonthlyAmounts(monthlyAmounts, annualDividendRate)
  }

  return { calculate, calculateFromEntries, calculateFromMonthlyAmounts }
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
