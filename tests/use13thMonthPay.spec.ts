import { describe, expect, it } from 'vitest'
import { use13thMonthPay } from '~/composables/use13thMonthPay'

describe('use13thMonthPay', () => {
  const { calculate } = use13thMonthPay()

  it('divides total basic salary earned by 12', () => {
    const result = calculate(240000)
    expect(result.thirteenthMonthPay).toBe(20000)
    expect(result.isOverTaxExemptCeiling).toBe(false)
    expect(result.taxableAmount).toBe(0)
    expect(result.taxExemptAmount).toBe(20000)
  })

  it('still divides by 12 for a partial year of earnings (never by months worked)', () => {
    // Employee worked only 6 months, earning 120,000 basic salary total.
    const result = calculate(120000)
    expect(result.thirteenthMonthPay).toBe(10000) // 120,000 / 12, not / 6
  })

  it('flags the portion over ₱90,000 as taxable', () => {
    const result = calculate(1200000) // 100,000/month
    expect(result.thirteenthMonthPay).toBe(100000)
    expect(result.isOverTaxExemptCeiling).toBe(true)
    expect(result.taxableAmount).toBe(10000)
    expect(result.taxExemptAmount).toBe(90000)
  })

  it('combines 13th month pay with other similar benefits against the ceiling', () => {
    const result = calculate(960000, 20000) // 80,000 13th month + 20,000 other benefits
    expect(result.thirteenthMonthPay).toBe(80000)
    expect(result.isOverTaxExemptCeiling).toBe(true)
    expect(result.taxableAmount).toBe(10000)
    expect(result.taxExemptAmount).toBe(90000)
  })
})
