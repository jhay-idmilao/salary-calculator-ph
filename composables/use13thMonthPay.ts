import { THIRTEENTH_MONTH_CONFIG } from '~/constants/rates2026'

export interface ThirteenthMonthResult {
  totalBasicSalaryEarned: number
  thirteenthMonthPay: number
  taxExemptAmount: number
  taxableAmount: number
  isOverTaxExemptCeiling: boolean
}

/**
 * Computes 13th month pay per DOLE rules:
 *   13th month pay = total basic salary actually earned for the year ÷ 12
 * This is always divided by 12 — never by the number of months actually
 * worked — even for employees who worked only part of the year.
 *
 * `totalBasicSalaryEarned` should include only base pay and paid leave pay;
 * it should exclude overtime, night differential, holiday premiums,
 * allowances, and discretionary bonuses.
 *
 * `otherBenefits` lets the caller include other "13th-month-pay-like"
 * benefits (e.g. Christmas bonus, cash gifts) that share the same combined
 * ₱90,000 tax-exempt ceiling under the NIRC/TRAIN rules.
 */
export function use13thMonthPay() {
  function calculate(totalBasicSalaryEarned: number, otherBenefits = 0): ThirteenthMonthResult {
    const safeTotal = Math.max(totalBasicSalaryEarned, 0)
    const safeOtherBenefits = Math.max(otherBenefits, 0)

    const thirteenthMonthPay = round2(safeTotal / THIRTEENTH_MONTH_CONFIG.monthsInYear)
    const combined = thirteenthMonthPay + safeOtherBenefits
    const ceiling = THIRTEENTH_MONTH_CONFIG.taxExemptCeiling

    const isOverTaxExemptCeiling = combined > ceiling
    const taxableAmount = isOverTaxExemptCeiling ? round2(combined - ceiling) : 0
    const taxExemptAmount = round2(combined - taxableAmount)

    return {
      totalBasicSalaryEarned: safeTotal,
      thirteenthMonthPay,
      taxExemptAmount,
      taxableAmount,
      isOverTaxExemptCeiling
    }
  }

  return { calculate }
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
