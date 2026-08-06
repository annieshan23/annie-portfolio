import { useState } from 'react'
import Placeholder from './Placeholder.jsx'

// Build the list of srcs to try: the given path first, then the same path with
// other common image extensions swapped in. This means a path written as
// ".png" still resolves if the real file is a ".jpg" (or webp/svg), so asset
// paths never have to match the exact extension on disk.
const EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'svg']
function buildCandidates(src) {
  if (!src) return []
  const match = src.match(/^(.*)\.(png|jpe?g|webp|svg)$/i)
  if (!match) return [src]
  const base = match[1]
  const original = src
  const alternates = EXTENSIONS.map((ext) => `${base}.${ext}`).filter((c) => c !== original)
  return [original, ...alternates]
}

// Renders a real image when the file exists, and falls back to a labeled
// placeholder block when the src is missing or fails to load. This lets us
// wire the final asset paths now and have them appear the moment the files
// are dropped into public/images.
export default function SmartImage({
  src,
  alt = '',
  label,
  ratio = 'aspect-[4/3]',
  className = '',
  fit = 'cover',
  rounded = 'rounded-xl',
  natural = false,
  position = '',
}) {
  const candidates = buildCandidates(src)
  // Index into `candidates`; advance on each load error until one works or we
  // run out and fall back to the placeholder.
  const [index, setIndex] = useState(0)
  const currentSrc = candidates[index]
  const failed = !currentSrc

  const handleError = () => setIndex((i) => i + 1)

  if (failed) {
    return <Placeholder label={label || alt || 'image'} ratio={ratio} className={`${rounded} ${className}`} />
  }

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  // Natural mode: render the image at its own aspect ratio (full width, height
  // follows the image) so nothing is cropped. Used by the hero.
  if (natural) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        className={`block h-auto w-full ${fitClass} ${rounded} ${className}`}
      />
    )
  }

  return (
    <div className={`${ratio} w-full overflow-hidden ${rounded} ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className={`h-full w-full ${fitClass} ${position}`}
      />
    </div>
  )
}
