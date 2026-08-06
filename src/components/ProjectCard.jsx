import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmartImage from './SmartImage.jsx'
import Badge from './Badge.jsx'

// One shared aspect ratio for every project thumbnail (data cards + landing),
// so the thumbnails all line up at the same width and height.
const CARD_RATIO = 'aspect-[16/9]'

// Reusable project card. Two layouts:
//   layout="horizontal" → thumbnail beside text (data section cards)
//   layout="stacked"    → thumbnail above text (landing thumbnails)
// Pass image to render a real <img>, otherwise a labeled placeholder shows.
export default function ProjectCard({
  to = '#',
  tag,
  title,
  brief,
  image,
  imageLabel = 'project',
  thumb,
  badge,
  badgeLabel,
  accent = 'violet',
  liveDashboard = false,
  layout = 'stacked',
  className = '',
}) {
  const accentText = accent === 'terracotta' ? 'text-terracotta' : 'text-violet'
  const horizontal = layout === 'horizontal'

  // Every card thumbnail shares one fixed box so the cards line up. A real
  // uploaded image (project.image) takes priority and fills the box cropped;
  // otherwise a custom thumb node (a project's SVG hero) is centered to fit
  // inside the same box; otherwise a labeled placeholder shows.
  const thumbNode = image ? (
    <SmartImage src={image} alt={title} label={imageLabel} ratio={CARD_RATIO} fit="cover" />
  ) : thumb ? (
    <div
      className={`${CARD_RATIO} flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#FBFAFE] [&>svg]:h-full [&>svg]:w-full`}
    >
      {thumb}
    </div>
  ) : (
    <SmartImage src={image} alt={title} label={imageLabel} ratio={CARD_RATIO} />
  )

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={className}
    >
      <Link
        to={to}
        className={`group block ${
          horizontal ? 'grid gap-6 md:grid-cols-[minmax(0,0.75fr)_1.25fr] md:items-center' : ''
        }`}
      >
        <div className="relative overflow-hidden rounded-xl">
          {thumbNode}
          {liveDashboard && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-dataset-bg px-2.5 py-1 text-xs font-semibold text-dataset-text">
              <span className="h-1.5 w-1.5 rounded-full bg-dataset-text" aria-hidden="true" />
              live dashboard
            </span>
          )}
        </div>

        <div className={horizontal ? '' : 'pt-4'}>
          {tag && <p className={`eyebrow ${accentText}`}>{tag}</p>}
          <h3 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-violet">
            {title}
          </h3>
          {badgeLabel && (
            <div className="mt-2">
              <Badge variant={badge}>{badgeLabel}</Badge>
            </div>
          )}
          {brief && <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{brief}</p>}
          <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${accentText}`}>
            learn more
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              &rarr;
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
