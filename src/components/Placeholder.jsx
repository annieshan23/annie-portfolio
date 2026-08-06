// A labeled block that stands in for an image that does not exist yet.
// Drop the real file into public/images and swap the placeholder for an <img>.
export default function Placeholder({ label = 'image', className = '', ratio = 'aspect-[4/3]' }) {
  return (
    <div
      className={`${ratio} w-full overflow-hidden rounded-xl border border-violet/15 bg-chip flex items-center justify-center ${className}`}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <div className="flex flex-col items-center gap-2 text-violet/60">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 17l4.5 4.5L14 12l6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="eyebrow text-violet/60">{label}</span>
      </div>
    </div>
  )
}
