import { describe, expect, it } from 'vitest'
import { useMp2Calculator } from '~/composables/useMp2Calculator'

describe('useMp2Calculator', () => {
  const { calculate } = useMp2Calculator()

  it('projects a 5-year term at ₱1,000/month and 7% annual dividend rate', () => {
    const result = calculate(1000, 5, 0.07)

    expect(result.totalContributions).toBe(60000) // 1,000 * 12 * 5
    expect(result.totalDividends).toBe(11424.18)
    expect(result.maturityValue).toBe(71424.18)
    expect(result.yearlyBreakdown).toHaveLength(5)

    // Year 1: avg balance = 0 + 12,000/2 = 6,000 -> dividend = 420
    expect(result.yearlyBreakdown[0]).toEqual({
      year: 1,
      contributions: 12000,
      dividend: 420,
      endingBalance: 12420
    })

    // Year 5 ends at the total maturity value.
    expect(result.yearlyBreakdown[4].endingBalance).toBe(result.maturityValue)
  })

  it('compounds dividends year over year (each year dividend > the last, same contribution rate)', () => {
    const result = calculate(1000, 5, 0.07)
    const dividends = result.yearlyBreakdown.map((y) => y.dividend)

    for (let i = 1; i < dividends.length; i++) {
      expect(dividends[i]).toBeGreaterThan(dividends[i - 1])
    }
  })

  it('produces zero dividends when the rate is 0%, leaving only contributions', () => {
    const result = calculate(500, 5, 0)

    expect(result.totalContributions).toBe(30000) // 500 * 12 * 5
    expect(result.totalDividends).toBe(0)
    expect(result.maturityValue).toBe(30000)
  })

  it('returns an empty projection for a 0-year term', () => {
    const result = calculate(1000, 0, 0.07)

    expect(result.totalContributions).toBe(0)
    expect(result.totalDividends).toBe(0)
    expect(result.maturityValue).toBe(0)
    expect(result.yearlyBreakdown).toHaveLength(0)
  })

  it('rounds a fractional years input to the nearest whole year', () => {
    const result = calculate(1000, 5.4, 0.07)
    expect(result.yearlyBreakdown).toHaveLength(5)
  })
})

describe('useMp2Calculator — flexible mode (calculateFromEntries)', () => {
  const { calculateFromEntries } = useMp2Calculator()

  it('handles skipped months and a one-off lump sum, computed the same way as the regular engine', () => {
    // Month 1: ₱1,000, month 2 skipped, month 3: ₱2,000, months 4–5 skipped,
    // month 6: a ₱5,000 lump sum, no contributions after that.
    const result = calculateFromEntries(
      [
        { month: 1, amount: 1000 },
        { month: 3, amount: 2000 },
        { month: 6, amount: 5000 }
      ],
      0.05,
      { termYears: 1 }
    )

    expect(result.totalContributions).toBe(8000) // 1,000 + 2,000 + 5,000
    // Average monthly balance for the year works out to exactly ₱5,250 —
    // see the composable's month-by-month "linear ramp within the month"
    // methodology — so dividend = 5,250 * 5% = 262.50.
    expect(result.totalDividends).toBe(262.5)
    expect(result.maturityValue).toBe(8262.5)
    expect(result.yearlyBreakdown).toHaveLength(1)
    expect(result.yearlyBreakdown[0]).toEqual({
      year: 1,
      contributions: 8000,
      dividend: 262.5,
      endingBalance: 8262.5
    })
  })

  it('supports the hybrid shortcut: a base monthly amount plus an extra lump sum on top', () => {
    // ₱500 every month, plus a ₱1,000 bonus contribution added in month 6.
    const result = calculateFromEntries([{ month: 6, amount: 1000 }], 0.06, {
      baseMonthlyAmount: 500,
      termYears: 1
    })

    expect(result.totalContributions).toBe(7000) // 500 * 12 + 1,000
    expect(result.totalDividends).toBe(212.5)
    expect(result.maturityValue).toBe(7212.5)
  })

  it('defaults to the 5-year lock-in term when termYears is not specified', () => {
    const result = calculateFromEntries([{ month: 1, amount: 1000 }], 0.07)
    expect(result.yearlyBreakdown).toHaveLength(5)
  })

  it('ignores entries outside the term and non-positive amounts', () => {
    const result = calculateFromEntries(
      [
        { month: 1, amount: 1000 },
        { month: 999, amount: 5000 }, // way past the 1-year term
        { month: 2, amount: 0 }, // non-positive, ignored
        { month: 2, amount: -100 } // negative, ignored
      ],
      0.05,
      { termYears: 1 }
    )

    expect(result.totalContributions).toBe(1000)
  })

  it('sums multiple entries landing in the same month', () => {
    const result = calculateFromEntries(
      [
        { month: 1, amount: 1000 },
        { month: 1, amount: 500 }
      ],
      0,
      { termYears: 1 }
    )

    expect(result.totalContributions).toBe(1500)
  })

  it('matches the regular fixed-monthly engine exactly for an equivalent uniform schedule', () => {
    const { calculate } = useMp2Calculator()

    const regular = calculate(1000, 5, 0.07)
    const flexible = calculateFromEntries([], 0.07, { baseMonthlyAmount: 1000, termYears: 5 })

    expect(flexible).toEqual(regular)
  })
})
