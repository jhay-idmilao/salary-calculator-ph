import { describe, expect, it } from 'vitest'
import { useWithholdingTax } from '~/composables/useWithholdingTax'

describe('useWithholdingTax', () => {
  const { calculate } = useWithholdingTax()

  it('is exempt when annualized taxable income is at or below ₱250,000', () => {
    const result = calculate(15000, 'monthly') // 180,000/year
    expect(result.annualTaxableIncome).toBe(180000)
    expect(result.annualTax).toBe(0)
    expect(result.periodTax).toBe(0)
  })

  it('computes the 15% bracket correctly for a monthly pay period', () => {
    const result = calculate(30000, 'monthly') // 360,000/year
    expect(result.annualTaxableIncome).toBe(360000)
    expect(result.annualTax).toBe(16500) // (360,000 - 250,000) * 15%
    expect(result.periodTax).toBe(1375) // 16,500 / 12
  })

  it('produces the same annual tax for an equivalent semi-monthly period', () => {
    const result = calculate(15000, 'semi-monthly') // 15,000 * 24 = 360,000/year
    expect(result.annualTaxableIncome).toBe(360000)
    expect(result.annualTax).toBe(16500)
    expect(result.periodTax).toBe(687.5) // 16,500 / 24
  })

  it('computes the 25% bracket correctly', () => {
    const result = calculate(100000, 'monthly') // 1,200,000/year
    expect(result.annualTaxableIncome).toBe(1200000)
    expect(result.annualTax).toBe(202500) // 102,500 + (1,200,000 - 800,000) * 25%
    expect(result.periodTax).toBe(16875)
  })
})
