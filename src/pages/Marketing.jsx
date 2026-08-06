import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Eyebrow from '../components/Eyebrow.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { marketingProjects } from '../data/projects.js'

// Warm creative motif that mirrors the data overview's DataMotif, but in the
// marketing palette: a story ribbon flowing into a small burst of dots, with a
// lighter echo curve behind it and a terracotta spark.
function StoryRibbon() {
  return (
    <svg
      viewBox="0 0 280 240"
      width="100%"
      className="max-w-[230px]"
      role="img"
      aria-label="Flowing ribbon reaching a burst of dots, with a creative spark"
    >
      <path d="M22,140 C 95,85 150,175 250,70" fill="none" stroke="#C98A5E" strokeWidth="1.4" strokeLinecap="round" opacity=".4" />
      <path d="M20,180 C 85,80 150,215 255,80" fill="none" stroke="#D6A184" strokeWidth="2" strokeLinecap="round" opacity=".65" />
      <path d="M20,165 C 70,55 140,205 260,95" fill="none" stroke="#B06A45" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="165" r="4" fill="#B06A45" />
      <circle cx="260" cy="95" r="5.5" fill="#B06A45" />
      <circle cx="275" cy="80" r="3" fill="#C9A24E" />
      <circle cx="249" cy="110" r="2.6" fill="#D6A184" />
      <circle cx="274" cy="106" r="2.1" fill="#B06A45" />
      <circle cx="243" cy="84" r="2.1" fill="#C9A24E" />
      <circle cx="266" cy="118" r="1.7" fill="#D6A184" />
      <path d="M66,44 L69,55 L80,58 L69,61 L66,72 L63,61 L52,58 L63,55 Z" fill="#B06A45" />
      <circle cx="112" cy="40" r="2" fill="#D6A184" opacity=".7" />
      <circle cx="182" cy="150" r="2.4" fill="#C9A24E" opacity=".6" />
    </svg>
  )
}

const bySlug = (slug) => marketingProjects.find((p) => p.slug === slug)

// A mosaic tile: the thumbnail (which carries its own title) fills the cell. On
// md+ the top mosaic cells have a fixed row height, so `imgRatio` switches to
// h-full there; on mobile each tile falls back to an aspect ratio and stacks.
function MosaicTile({ project, className = '', imgRatio = 'aspect-[16/10] md:h-full' }) {
  if (!project) return null
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`min-h-0 ${className}`}
    >
      <Link
        to={`/marketing/${project.slug}`}
        className="group relative block h-full overflow-hidden rounded-xl"
      >
        <SmartImage
          src={project.image}
          alt={project.title}
          label={project.imageLabel}
          ratio={imgRatio}
          position={project.imagePosition}
          className="h-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Title reveal: a soft dark gradient fades in on hover and the title
            slides up, so each thumbnail names itself only when hovered. */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/75 via-ink/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="translate-y-2 p-5 transition-transform duration-300 group-hover:translate-y-0">
            {project.tag && (
              <p className="mb-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-white/75">
                {project.tag}
              </p>
            )}
            <p className="font-serif text-lg leading-snug text-white md:text-xl">
              {project.title}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Marketing() {
  return (
    <>
      {/* Editorial header band, cream with terracotta accents. Mirrors the data
          overview hero: eyebrow, heading, one intro paragraph, a short divider,
          and the creative motif beside the heading. */}
      <section className="bg-cream pt-28">
        <div className="mx-auto max-w-content px-6 pb-12 md:px-8">
          <div className="grid items-center gap-x-10 gap-y-4 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <Eyebrow accent="terracotta">marketing and strategy</Eyebrow>
              <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                Dive into the world of marketing
              </h1>
              <p className="mt-6 text-ink-secondary">
                A collection of marketing strategy, campaign execution, and brand storytelling
                work spanning 5 years across NYU and Northwestern. From designing digital media
                strategies for global retailers to running social media campaigns for theatre
                productions, each project reflects a curiosity for how data, creativity, and
                audience insight intersect to drive real world impact.
              </p>
              <div className="mt-[32px] h-[3px] w-14 rounded-full bg-terracotta" aria-hidden="true" />
            </div>
            <div className="flex justify-center md:justify-end">
              <StoryRibbon />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery: every project as a 16:9 tile, two side by side per row.
          Row 1 Sainsbury's + Starbucks, row 2 Xfinity + NYC food guide,
          row 3 Confession + Theatre PR launch. */}
      <div className="mx-auto grid max-w-content grid-cols-1 gap-6 px-6 py-16 md:grid-cols-2 md:gap-8 md:px-8">
        <MosaicTile project={bySlug('sainsburys')} imgRatio="aspect-[16/9]" />
        <MosaicTile project={bySlug('starbucks')} imgRatio="aspect-[16/9]" />
        <MosaicTile project={bySlug('xfinity')} imgRatio="aspect-[16/9]" />
        <MosaicTile project={bySlug('nyc-food-guide')} imgRatio="aspect-[16/9]" />
        <MosaicTile project={bySlug('confession-film')} imgRatio="aspect-[16/9]" />
        <MosaicTile project={bySlug('trapped-in-the-flash')} imgRatio="aspect-[16/9]" />
      </div>
    </>
  )
}
