// Small pill for skills, tools, and tags. Light violet fill by default.
export default function Chip({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-chip px-3 py-1 text-sm font-medium text-violet border border-violet/15 ${className}`}
    >
      {children}
    </span>
  )
}
