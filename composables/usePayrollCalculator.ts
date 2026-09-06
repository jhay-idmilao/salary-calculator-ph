import type { PayFrequency } from '~/constants/rates2026'
import { PAY_PERIODS_PER_YEAR } from '~/constants/rates2026'
import { useSssCalculator, type SssResult } from '~/composables/useSssCalculator'
import { usePhilhealthCalculator, type PhilhealthResult } from '~/composables/usePhilhealthCalculator'
import { usePagibigCalculator, type PagibigResult } from '~/composables/usePagibigCalculator'
import { useWithholdingTax, type WithholdingTaxResult } from '~/composables/useWithholdingTax'

export interface PayrollResult {
  frequency: PayFrequency
  /** The gross amount as entered by the user, for the selected pay period. */
  grossPerPeriod: number
  /** Gross normalized to a full month, used as the base for statutory contributions. */
  monthlyEquivalentGross: number
  sss: SssResult
  philhealth: PhilhealthResult
  pagibig: PagibigResult
  withholdingTax: WithholdingTaxResult
  totalEmployeeDeductionsPerPeriod: number
  netPayPerPeriod: number
  totalEmployerContributionsPerMonth: number
}

/**
 * Orchestrates the individual statutory-contribution composables into a
 * single payroll computation for one pay period (monthly or semi-monthly).
 *
 * SSS / PhilHealth / Pag-IBIG are all defined on a *monthly* compensation
 * basis, so a semi-monthly gross is first normalized to its monthly
 * equivalent (× 2) to look up the correct contribution amounts, then the
 * employee-side deductions are split back down to the per-period amount
 * actually withheld from that specific pay run.
 */
export function usePayrollCalculator() {
  const sssCalculator = useSssCalculator()
  const philhealthCalculator = usePhilhealthCalculator()
  const pagibigCalculator = usePagibigCalculator()
  const withholdingTaxCalculator = useWithholdingTax()

  function calculate(grossPerPeriod: number, frequency: PayFrequency): PayrollResult {
    const safeGross = Math.max(grossPerPeriod, 0)
    const periodsPerYear = PAY_PERIODS_PER_YEAR[frequency]
    const periodsPerMonth = periodsPerYear / 12

    const monthlyEquivalentGross = round2(safeGross * periodsPerMonth)

    const sss = sssCalculator.calculate(monthlyEquivalentGross)
    const philhealth = philhealthCalculator.calculate(monthlyEquivalentGross)
    const pagibig = pagibigCalculator.calculate(monthlyEquivalentGross)

    const monthlyEmployeeContributions = round2(
      sss.employeeShare + philhealth.employeeShare + pagibig.employeeShare
    )

    // Contributions are computed monthly, then divided back into this
    // specific pay period's share.
    const employeeContributionsPerPeriod = round2(monthlyEmployeeContributions / periodsPerMonth)

    const monthlyTaxableIncome = round2(monthlyEquivalentGross - monthlyEmployeeContributions)
    const taxableIncomePerPeriod = round2(monthlyTaxableIncome / periodsPerMonth)

    const withholdingTax = withholdingTaxCalculator.calculate(taxableIncomePerPeriod, frequency)

    const totalEmployeeDeductionsPerPeriod = round2(employeeContributionsPerPeriod + withholdingTax.periodTax)
    const netPayPerPeriod = round2(safeGross - totalEmployeeDeductionsPerPeriod)

    const totalEmployerContributionsPerMonth = round2(
      sss.totalEmployerShare + philhealth.employerShare + pagibig.employerShare
    )

    return {
      frequency,
      grossPerPeriod: safeGross,
      monthlyEquivalentGross,
      sss,
      philhealth,
      pagibig,
      withholdingTax,
      totalEmployeeDeductionsPerPeriod,
      netPayPerPeriod,
      totalEmployerContributionsPerMonth
    }
  }

  return { calculate }
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
