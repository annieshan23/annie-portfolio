import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import Chip from '../components/Chip.jsx'
import Button from '../components/Button.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { heroes } from '../components/heroes/registry.js'
import { landingDataProjects, landingMarketingProjects } from '../data/projects.js'

// Shared stagger variants for thumbnail grids.
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// Brand stories share the /marketing mosaic arrangement. Look up a project by
// slug (only landing-ranked projects are in this list).
const mkt = (slug) => landingMarketingProjects.find((p) => p.slug === slug)

// A mosaic tile: the thumbnail (which carries its own title) fills the cell. On
// md+ the top mosaic cells have a fixed row height, so `imgRatio` switches to
// h-full there; on mobile it falls back to an aspect ratio and stacks.
function BrandMosaicTile({ project, className = '', imgRatio = 'aspect-[16/9]' }) {
  if (!project) return null
  return (
    <motion.div variants={item} className={`min-h-0 ${className}`}>
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="h-full">
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
          {/* Title reveal on hover: soft gradient fades in and the title slides up. */}
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
    </motion.div>
  )
}

// Languages and Analysis/visualization render as tool logos with a tiny
// caption under each; Core methods stays as text chips. Drop the logo files
// into public/images/logos/tools/ and they appear automatically (SmartImage
// falls back to a labeled placeholder until then, and auto-tries other file
// extensions, so .png here still resolves a .svg/.jpg on disk).
const toolkitGroups = [
  {
    title: 'Languages',
    logos: [
      { name: 'SQL', logo: '/images/logos/tools/mysql.png' },
      { name: 'Python', logo: '/images/logos/tools/python.png' },
      { name: 'R', logo: '/images/logos/tools/r.png' },
    ],
  },
  {
    title: 'Analysis and visualization',
    logos: [
      { name: 'Tableau', logo: '/images/logos/tools/tableau.png' },
      { name: 'Excel', logo: '/images/logos/tools/excel.png', size: 'h-10 w-10' },
      { name: 'PowerBI', logo: '/images/logos/tools/powerbi.png', size: 'h-14 w-14' },
      { name: 'Looker', logo: '/images/logos/tools/looker.png' },
    ],
  },
  {
    title: 'Core methods',
    items: [
      'Exploratory Data Analysis',
      'Regression',
      'A/B Testing',
      'Segmentation',
      'Marketing Mix Modeling',
    ],
  },
]

const advancedModeling = [
  'Survival Analysis',
  'PSM',
  'LASSO',
  'Random Forest',
  'Clustering',
  'PCA',
  'SVM',
  'Uplift Modeling',
]

const educatedAt = [
  { name: 'New York University', logo: '/images/logos/nyu.png' },
  { name: 'Northwestern', logo: '/images/logos/northwestern.png' },
]
// Tint a keyword violet inside body copy.
function V({ children }) {
  return <span className="font-medium text-violet">{children}</span>
}

export default function Landing() {
  return (
    <>
      {/* 1. Hero: full Chicago skyline at natural proportion, nothing cropped.
          Any empty space around the photo shows the cream page background. */}
      <section className="relative w-full overflow-hidden bg-base pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <SmartImage
            natural
            fit="contain"
            src="/images/chicago-skyline.jpg"
            alt="Chicago skyline"
            label="chicago skyline"
            ratio="aspect-[16/7]"
            rounded=""
            className="border-0"
          />
        </motion.div>

        {/* Legibility wash at top, soft fade to the page background at the
            bottom. The fade resolves to base (the same color as the page and
            the section below), so the skyline dissolves seamlessly into the
            page with no visible warm band. The pb-20 gives it room to finish. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-base/85 to-base" />

        {/* Overlaid hero text, sitting high on the skyline. */}
        <div className="absolute inset-0 z-10">
          <div className="mx-auto flex h-full max-w-content flex-col justify-start px-6 pt-16 sm:pt-20 md:px-8 md:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              <Eyebrow className="text-sm text-white/90 [text-shadow:_0_1px_12px_rgba(0,0,0,0.35)] md:text-lg">
                Hi, I'm Annie, and
              </Eyebrow>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight text-white [text-shadow:_0_2px_24px_rgba(0,0,0,0.35)] md:text-7xl">
                I tell stories with data.
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Name card overlapping into the lower third of the hero photo.
          Double violet frame, translucent so the skyline fade shows through.
          The original single-frame card is preserved in NameCardOld.jsx and in
          git (commit before this redesign) for a clean rollback. */}
      <div className="relative z-20 mx-auto -mt-[120px] max-w-content px-6 sm:-mt-[136px] lg:-mt-40 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
          className="rounded-2xl border border-violet/15 bg-white px-6 py-4 shadow-[0_20px_60px_-30px_rgba(74,63,143,0.4)] md:px-8 md:py-6"
        >
          {/* Name header across the top of the card. */}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-2xl text-ink">Annie (Xinhui) Shan</h2>
          </div>

          {/* Headshot on the left, bullets and buttons top-aligned beside it. */}
          <div className="mt-3 grid gap-6 md:grid-cols-[auto_1fr] md:items-stretch md:gap-8">
          <div className="w-32 shrink-0">
            <SmartImage
              src="/images/headshot.jpg"
              alt="Annie Shan"
              label="headshot"
              ratio="aspect-square"
              rounded="rounded-2xl"
            />
          </div>
          <div className="flex h-full flex-col">
            {/* Two columns of two: bullets 1/2 left, 3/4 right, split by a thin
                violet divider. Each bullet stays on one line (whitespace-nowrap);
                on narrow screens the columns stack but bullets still stay single
                line. */}
            <div className="mt-auto flex flex-col gap-[10px] text-sm leading-snug text-[#3B3650] sm:flex-row sm:gap-0">
              {[
                ['Business analyst who bridges narrative and numbers', 'Problem solver who finds scalable solutions in complexity'],
                ['AI powered architect of end-to-end workflows', 'Lifelong learner and adventurer'],
              ].map((column, i) => (
                <ul
                  key={i}
                  className={`flex flex-col gap-[10px] sm:px-[26px] ${
                    i === 0 ? 'sm:pl-0 sm:border-r sm:border-[#EAE6F3]' : 'sm:pr-0'
                  }`}
                >
                  {column.map((point) => (
                    <li key={point} className="flex gap-2.5 whitespace-nowrap italic">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            {/* Pushed to the bottom of the column so they align with the bottom
                of the headshot on desktop. */}
            <div className="mb-3 flex flex-wrap gap-3 pt-4">
              <Button to="/resume">resume</Button>
              <Button to="/data" variant="outline">
                data work
              </Button>
              <Button to="/marketing" variant="outline">
                marketing
              </Button>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Contact strip: slim centered row below the card, outside the frame. */}
        <div className="mb-7 mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13.5px] md:mb-11">
          <span>
            <span className="font-semibold text-violet">email</span>{' '}
            <a
              href="mailto:annieshan2026@u.northwestern.edu"
              className="text-ink-secondary no-underline transition-colors hover:text-violet"
            >
              annieshan2026@u.northwestern.edu
            </a>
          </span>
          <span>
            <span className="font-semibold text-violet">phone</span>{' '}
            <span className="text-ink-secondary">+1 (347) 226 0388</span>
          </span>
          <a
            href="https://www.linkedin.com/in/annie-shan-1234b4257/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-violet no-underline transition-opacity hover:opacity-70"
          >
            linkedin
          </a>
          <a
            href="https://github.com/annieshan23"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-violet no-underline transition-opacity hover:opacity-70"
          >
            github
          </a>
        </div>
      </div>

      {/* 3. About paragraph. */}
      <Section bg="base">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <h2 className="font-serif text-2xl leading-snug text-ink md:text-3xl">
            But first, a little story about me
          </h2>
          <div className="space-y-4 leading-relaxed text-ink-secondary">
            <p>
              I didn't plan on falling for spreadsheets and <V>SQL</V> queries, but somewhere between
              marketing campaigns and data dashboards, that's exactly what happened.
            </p>
            <p>
              My marketing degree from <V>New York University</V> gave me the business sense to ask
              the right questions, and <V>Northwestern IMC</V> gave me the analytical tools to answer
              them. These days I live in the space between the two, identifying growth opportunities,
              designing solutions, and turning messy data into decisions that drive meaningful
              engagement.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. Trained at. */}
      <Section bg="white">
        <div className="space-y-10">
          <div>
            <Eyebrow>educated at</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-8">
              {educatedAt.map((org) => (
                <div key={org.name} className="flex items-center gap-3">
                  <div className="h-12 w-12">
                    <SmartImage
                      src={org.logo}
                      alt={org.name}
                      label="logo"
                      ratio="h-12 w-12"
                      rounded="rounded-lg"
                      fit="contain"
                    />
                  </div>
                  <span className="font-serif text-lg text-violet">{org.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>experience at</Eyebrow>
            {/* Flat, bottom-anchored crop clips the blank sky at the top of the
                artwork so the mountain peak sits near the "experience at" row
                and the illustration takes less vertical space. Tune via the
                aspect ratio below. */}
            <div className="mt-4">
              <SmartImage
                src="/images/career-climb.png"
                alt="A winding trail past Ogilvy, Accenture, Lenovo, Antenna, and Hyde Park School of Dance"
                label="experience mountain trail illustration"
                ratio="aspect-[5/2]"
                fit="cover"
                position="object-bottom"
                rounded="rounded-none"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Toolkit. The whole section sits inside a rounded violet-tint name
          card (rather than a full-bleed band), stretching a little wider than
          the content column via the negative margins. The advanced-modeling
          white card nests inside it. */}
      <Section bg="white" innerClassName="pt-4 md:pt-6">
        <div className="rounded-3xl bg-violetTint px-6 py-14 sm:px-10 md:-mx-8 md:px-14 md:py-16 lg:-mx-14">
        <Eyebrow>toolkit</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
          The skills behind the scene
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {toolkitGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-ink">{group.title}</p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`mt-3 flex flex-wrap ${group.logos ? 'gap-3' : 'gap-2'}`}
              >
                {group.logos
                  ? group.logos.map((tool) => (
                      <motion.div
                        key={tool.name}
                        variants={item}
                        className="flex h-14 w-14 items-center justify-center"
                      >
                        <div className={tool.size || 'h-12 w-12'}>
                          <SmartImage
                            src={tool.logo}
                            alt={tool.name}
                            label={tool.name}
                            ratio={tool.size || 'h-12 w-12'}
                            rounded="rounded-lg"
                            fit="contain"
                          />
                        </div>
                      </motion.div>
                    ))
                  : group.items.map((label) => (
                      <motion.div key={label} variants={item}>
                        <Chip>{label}</Chip>
                      </motion.div>
                    ))}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-2xl border border-violet/25 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(74,63,143,0.5)]"
        >
          <Eyebrow>advanced modeling</Eyebrow>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {advancedModeling.map((label) => (
              <motion.div key={label} variants={item}>
                <Chip>{label}</Chip>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-secondary">
            From predicting churn to measuring true campaign impact, these are the tools I use to
            answer questions marketing instinct alone can't.
          </p>
        </motion.div>
        </div>
      </Section>

      {/* 6. Data project thumbnails, no white card backing. */}
      <Section bg="base">
        <Eyebrow>selected data work</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
          Leveraging data to uncover insights
        </h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {landingDataProjects.map((project) => {
            const Hero = project.detail?.hero ? heroes[project.detail.hero] : null
            return (
              <motion.div key={project.slug} variants={item}>
                <ProjectCard
                  to={`/data/${project.slug}`}
                  tag={project.tag}
                  title={project.title}
                  brief={project.brief}
                  image={project.image}
                  imageLabel={project.imageLabel}
                  thumb={Hero ? <Hero /> : undefined}
                  liveDashboard={project.liveDashboard}
                />
              </motion.div>
            )
          })}
        </motion.div>
        <div className="mt-14 flex justify-start">
          <Button to="/data" variant="outline">
            view all data projects
          </Button>
        </div>
      </Section>

      {/* 7. Marketing gallery, mixed size tiles. */}
      <Section bg="cream">
        <Eyebrow accent="terracotta">selected brand work</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
          …and tell great brand stories
        </h2>
        {/* Four featured brand projects as 16:9 tiles, two per row. */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        >
          <BrandMosaicTile project={mkt('sainsburys')} />
          <BrandMosaicTile project={mkt('starbucks')} />
          <BrandMosaicTile project={mkt('xfinity')} />
          <BrandMosaicTile project={mkt('nyc-food-guide')} />
        </motion.div>
        <div className="mt-14 flex justify-start">
          <Button to="/marketing" variant="outline" accent="terracotta">
            view all marketing projects
          </Button>
        </div>
      </Section>
    </>
  )
}
