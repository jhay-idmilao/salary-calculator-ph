import { describe, expect, it } from 'vitest'
import { usePhilhealthCalculator } from '~/composables/usePhilhealthCalculator'

describe('usePhilhealthCalculator', () => {
  const { calculate } = usePhilhealthCalculator()

  it('applies the ₱10,000 salary floor', () => {
    const result = calculate(5000)
    expect(result.contributionBase).toBe(10000)
    expect(result.employeeShare).toBe(250)
    expect(result.employerShare).toBe(250)
    expect(result.totalContribution).toBe(500)
  })

  it('computes 2.5% / 2.5% within the normal range', () => {
    const result = calculate(50000)
    expect(result.employeeShare).toBe(1250)
    expect(result.employerShare).toBe(1250)
    expect(result.totalContribution).toBe(2500)
  })

  it('caps contributions at the ₱100,000 ceiling', () => {
    const result = calculate(150000)
    expect(result.contributionBase).toBe(100000)
    expect(result.employeeShare).toBe(2500)
    expect(result.employerShare).toBe(2500)
    expect(result.totalContribution).toBe(5000)
  })
})
