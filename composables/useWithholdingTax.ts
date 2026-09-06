import { BIR_ANNUAL_TAX_BRACKETS, PAY_PERIODS_PER_YEAR, type PayFrequency } from '~/constants/rates2026'

export interface WithholdingTaxResult {
  annualTaxableIncome: number
  annualTax: number
  /** Tax for the given pay period (annual tax ÷ periods per year). */
  periodTax: number
  bracket: (typeof BIR_ANNUAL_TAX_BRACKETS)[number]
}

/**
 * Computes BIR withholding tax (TRAIN law) for one pay period by
 * annualizing the period's taxable income, applying the annual bracket
 * table, then de-annualizing the resulting tax back to the pay period.
 */
export function useWithholdingTax() {
  function calculateAnnualTax(annualTaxableIncome: number): { tax: number; bracket: (typeof BIR_ANNUAL_TAX_BRACKETS)[number] } {
    const income = Math.max(annualTaxableIncome, 0)

    const bracket =
      BIR_ANNUAL_TAX_BRACKETS.find((b) => income > b.min && (b.max === null || income <= b.max)) ??
      BIR_ANNUAL_TAX_BRACKETS[0]

    const excess = income - bracket.min
    const tax = bracket.baseTax + excess * bracket.rate

    return { tax: round2(tax), bracket }
  }

  function calculate(periodTaxableIncome: number, frequency: PayFrequency): WithholdingTaxResult {
    const periodsPerYear = PAY_PERIODS_PER_YEAR[frequency]
    const annualTaxableIncome = round2(Math.max(periodTaxableIncome, 0) * periodsPerYear)

    const { tax: annualTax, bracket } = calculateAnnualTax(annualTaxableIncome)
    const periodTax = round2(annualTax / periodsPerYear)

    return { annualTaxableIncome, annualTax, periodTax, bracket }
  }

  return { calculate, calculateAnnualTax }
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
