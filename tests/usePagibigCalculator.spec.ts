import { describe, expect, it } from 'vitest'
import { usePagibigCalculator } from '~/composables/usePagibigCalculator'

describe('usePagibigCalculator', () => {
  const { calculate } = usePagibigCalculator()

  it('computes 2% / 2% below the compensation ceiling', () => {
    const result = calculate(5000)
    expect(result.employeeShare).toBe(100)
    expect(result.employerShare).toBe(100)
    expect(result.totalContribution).toBe(200)
  })

  it('caps contributions at ₱200 per side above the ₱10,000 ceiling', () => {
    const result = calculate(20000)
    expect(result.employeeShare).toBe(200)
    expect(result.employerShare).toBe(200)
    expect(result.totalContribution).toBe(400)
  })

  it('computes exactly ₱200 per side at the ceiling', () => {
    const result = calculate(10000)
    expect(result.employeeShare).toBe(200)
    expect(result.employerShare).toBe(200)
  })
})
