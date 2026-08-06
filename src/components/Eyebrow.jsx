// Section label: clean sans caps, wide tracking, in the accent color.
// Defaults to violet; pass accent="terracotta" inside the Marketing section.
export default function Eyebrow({ children, accent = 'violet', className = '' }) {
  const color = accent === 'terracotta' ? 'text-terracotta' : 'text-violet'
  return <p className={`eyebrow ${color} ${className}`}>{children}</p>
}
