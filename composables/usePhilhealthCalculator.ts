import { PHILHEALTH_CONFIG } from '~/constants/rates2026'

export interface PhilhealthResult {
  /** The monthly salary actually used as the contribution base (after floor/ceiling). */
  contributionBase: number
  employeeShare: number
  employerShare: number
  totalContribution: number
}

/**
 * Computes PhilHealth contributions: 5% of monthly basic salary, split evenly
 * (2.5% employee / 2.5% employer), floored at ₱10,000 and capped at ₱100,000.
 */
export function usePhilhealthCalculator() {
  function calculate(monthlyBasicSalary: number): PhilhealthResult {
    const { salaryFloor, salaryCeiling, employeeRate, employerRate } = PHILHEALTH_CONFIG

    const clamped = Math.min(
      Math.max(monthlyBasicSalary, 0) < salaryFloor ? salaryFloor : monthlyBasicSalary,
      salaryCeiling
    )

    const employeeShare = round2(clamped * employeeRate)
    const employerShare = round2(clamped * employerRate)

    return {
      contributionBase: clamped,
      employeeShare,
      employerShare,
      totalContribution: round2(employeeShare + employerShare)
    }
  }

  return { calculate }
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
