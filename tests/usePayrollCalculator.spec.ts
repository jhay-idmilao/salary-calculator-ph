import { describe, expect, it } from 'vitest'
import { usePayrollCalculator } from '~/composables/usePayrollCalculator'

describe('usePayrollCalculator', () => {
  const { calculate } = usePayrollCalculator()

  it('computes a full monthly payroll breakdown for ₱25,000 gross', () => {
    const result = calculate(25000, 'monthly')

    expect(result.monthlyEquivalentGross).toBe(25000)

    // SSS: MSC 25,000 -> 5% / 10%
    expect(result.sss.employeeShare).toBe(1250)

    // PhilHealth: 2.5% of 25,000
    expect(result.philhealth.employeeShare).toBe(625)

    // Pag-IBIG: capped at ₱200 (compensation above ₱10,000 ceiling)
    expect(result.pagibig.employeeShare).toBe(200)

    // Taxable income = 25,000 - (1,250 + 625 + 200) = 22,925/month -> 275,100/year
    expect(result.withholdingTax.annualTaxableIncome).toBe(275100)
    expect(result.withholdingTax.periodTax).toBe(313.75)

    expect(result.totalEmployeeDeductionsPerPeriod).toBe(2388.75)
    expect(result.netPayPerPeriod).toBe(22611.25)
  })

  it('normalizes a semi-monthly gross to its monthly equivalent for contributions', () => {
    const result = calculate(12500, 'semi-monthly') // 25,000/month equivalent

    expect(result.monthlyEquivalentGross).toBe(25000)
    expect(result.sss.employeeShare).toBe(1250)
    expect(result.philhealth.employeeShare).toBe(625)
    expect(result.pagibig.employeeShare).toBe(200)

    // Same annual taxable income as the equivalent monthly case above.
    expect(result.withholdingTax.annualTaxableIncome).toBe(275100)

    // Net pay per cutoff should be roughly half of the monthly net pay.
    expect(result.netPayPerPeriod).toBeCloseTo(22611.25 / 2, 1)
  })

  it('returns zero net-negative results for a very low salary (below all floors)', () => {
    const result = calculate(3000, 'monthly')

    expect(result.sss.msc).toBe(4000)
    expect(result.philhealth.contributionBase).toBe(10000)
    expect(result.withholdingTax.annualTax).toBe(0)
    expect(result.netPayPerPeriod).toBeLessThan(result.grossPerPeriod)
  })
})
