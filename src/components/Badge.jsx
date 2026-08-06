// Status badge for project detail headers.
// variant="nda"    → gold, for real client work anonymized under NDA
// variant="dataset" → green, for projects built on a public dataset
export default function Badge({ children, variant = 'nda', className = '' }) {
  const styles =
    variant === 'dataset'
      ? 'bg-dataset-bg text-dataset-text'
      : 'bg-nda-bg text-nda-text'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />
      {children}
    </span>
  )
}
