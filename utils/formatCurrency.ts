const PESO_FORMATTER = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return PESO_FORMATTER.format(0)
  return PESO_FORMATTER.format(value)
}
