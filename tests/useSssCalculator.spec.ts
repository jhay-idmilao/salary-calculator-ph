import { describe, expect, it } from 'vitest'
import { useSssCalculator } from '~/composables/useSssCalculator'

describe('useSssCalculator', () => {
  const { calculate } = useSssCalculator()

  it('clamps salaries below the MSC floor to the ₱4,000 minimum bracket', () => {
    const result = calculate(3000)
    expect(result.msc).toBe(4000)
    expect(result.employeeShare).toBe(200) // 4000 * 5%
    expect(result.employerShare).toBe(400) // 4000 * 10%
    expect(result.employerEcContribution).toBe(10) // MSC < 15,000
    expect(result.totalEmployerShare).toBe(410)
    expect(result.totalContribution).toBe(610)
  })

  it('assigns a mid-range salary to its matching MSC bracket', () => {
    const result = calculate(25000)
    expect(result.msc).toBe(25000)
    expect(result.employeeShare).toBe(1250)
    expect(result.employerShare).toBe(2500)
    expect(result.employerEcContribution).toBe(30) // MSC >= 15,000
    expect(result.totalEmployerShare).toBe(2530)
    expect(result.totalContribution).toBe(3780)
  })

  it('clamps salaries above the MSC ceiling to the ₱35,000 maximum bracket', () => {
    const result = calculate(50000)
    expect(result.msc).toBe(35000)
    expect(result.employeeShare).toBe(1750)
    expect(result.employerShare).toBe(3500)
    expect(result.employerEcContribution).toBe(30)
    expect(result.totalEmployerShare).toBe(3530)
    expect(result.totalContribution).toBe(5280)
  })
})
