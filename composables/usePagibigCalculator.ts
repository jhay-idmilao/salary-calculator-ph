import { PAGIBIG_CONFIG } from '~/constants/rates2026'

export interface PagibigResult {
  employeeShare: number
  employerShare: number
  totalContribution: number
}

/**
 * Computes Pag-IBIG (HDMF) contributions: 2% employee + 2% employer of
 * monthly compensation, based on a ₱10,000 ceiling and capped at ₱200 per
 * side above that ceiling.
 */
export function usePagibigCalculator() {
  function calculate(monthlyCompensation: number): PagibigResult {
    const { compensationCeiling, employeeRate, employerRate, maxEmployeeContribution, maxEmployerContribution } =
      PAGIBIG_CONFIG

    const base = Math.min(Math.max(monthlyCompensation, 0), compensationCeiling)

    const employeeShare = Math.min(round2(base * employeeRate), maxEmployeeContribution)
    const employerShare = Math.min(round2(base * employerRate), maxEmployerContribution)

    return {
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
