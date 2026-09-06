import { SSS_BRACKETS, SSS_CONFIG } from '~/constants/rates2026'

export interface SssResult {
  msc: number
  employeeShare: number
  employerShare: number
  employerEcContribution: number
  totalEmployerShare: number
  totalContribution: number
}

/**
 * Finds the Monthly Salary Credit for a given monthly compensation using the
 * SSS bracket table (not a flat percentage of raw salary).
 */
export function findMonthlySalaryCredit(monthlyCompensation: number): number {
  const salary = Math.max(monthlyCompensation, 0)

  for (const bracket of SSS_BRACKETS) {
    if (bracket.max === null || salary <= bracket.max) {
      if (salary >= bracket.min) return bracket.msc
    }
  }

  // Fallback — should not happen since the last bracket has max === null.
  return SSS_CONFIG.mscCeiling
}

/**
 * Computes SSS contributions (employee + employer + EC) for a given monthly
 * compensation, based on the bracketed Monthly Salary Credit.
 */
export function useSssCalculator() {
  function calculate(monthlyCompensation: number): SssResult {
    const msc = findMonthlySalaryCredit(monthlyCompensation)

    const employeeShare = round2(msc * SSS_CONFIG.employeeRate)
    const employerShare = round2(msc * SSS_CONFIG.employerRate)
    const employerEcContribution =
      msc < SSS_CONFIG.ecThreshold ? SSS_CONFIG.ecLowMsc : SSS_CONFIG.ecHighMsc
    const totalEmployerShare = round2(employerShare + employerEcContribution)
    const totalContribution = round2(employeeShare + totalEmployerShare)

    return {
      msc,
      employeeShare,
      employerShare,
      employerEcContribution,
      totalEmployerShare,
      totalContribution
    }
  }

  return { calculate }
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
