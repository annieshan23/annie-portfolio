import { useLayoutEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import Chip from '../components/Chip.jsx'
import Badge from '../components/Badge.jsx'
import Button from '../components/Button.jsx'
import Placeholder from '../components/Placeholder.jsx'
import SmartImage from '../components/SmartImage.jsx'
import CountUp from '../components/CountUp.jsx'
import { heroes } from '../components/heroes/registry.js'
import { getDataProject } from '../data/projects.js'

// Tableau Public renders fixed-size dashboards at their native pixel width and
// simply clips anything wider than the iframe. To show the whole thing, we
// render the iframe at native size and scale it down to fit the container,
// preserving the dashboard's aspect ratio. Each dashboard passes its own native
// size; over estimate the width slightly so the right edge never clips.
//   dance extension (portrait): derived from the viz's static image
//     (2560x3200, ratio 0.8) at its intended ~1300px display width.
//   online learning (landscape): the 5 tab overview workbook, authored at the
//     standard 1366x768 desktop layout, plus ~25px for the Tableau toolbar row.
const TABLEAU_NATIVE = { w: 1300, h: 1625 }
const ONLINE_DASHBOARD_NATIVE = { w: 1366, h: 820 }

function TableauEmbed({ src, native = TABLEAU_NATIVE }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(null)

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / native.w)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [native.w])

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{
        height: scale ? native.h * scale : undefined,
        aspectRatio: scale ? undefined : `${native.w} / ${native.h}`,
      }}
    >
      <iframe
        title="Tableau dashboard"
        src={src}
        loading="lazy"
        allowFullScreen
        className="absolute left-0 top-0 origin-top-left border-0"
        style={{
          width: native.w,
          height: native.h,
          transform: scale ? `scale(${scale})` : undefined,
        }}
      />
    </div>
  )
}

function BackLink() {
  return (
    <Link to="/data" className="text-sm font-semibold text-violet hover:opacity-80">
      &larr; back to data work
    </Link>
  )
}

function NotFound() {
  return (
    <Section bg="base" innerClassName="pt-32">
      <h1 className="font-serif text-3xl text-ink">Project not found</h1>
      <p className="mt-3 text-ink-secondary">This project does not exist yet.</p>
      <div className="mt-6">
        <Button to="/data">back to data work</Button>
      </div>
    </Section>
  )
}

// One pillar of The Work. Annie led pillars show a star and sit first.
function Pillar({ pillar, index }) {
  return (
    <div className="rounded-2xl border border-violet/12 bg-white p-6 shadow-[0_16px_44px_-34px_rgba(74,63,143,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <span className="font-serif text-lg text-violet/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        {pillar.led && (
          <span className="text-lg text-violet" title="Annie led" aria-label="Annie led">
            &#9733;
          </span>
        )}
      </div>
      <h3 className="mt-2 font-serif text-xl text-ink">{pillar.title}</h3>
      <p className="mt-3 text-sm font-medium italic text-ink-secondary">{pillar.question}</p>
      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <p className="text-ink-secondary">
          <span className="eyebrow text-ink-muted">method</span>
          <span className="mt-1 block">{pillar.method}</span>
        </p>
        <p className="rounded-xl bg-violetTint px-4 py-3 text-ink">
          <span className="eyebrow text-violet">finding</span>
          <span className="mt-1 block">{pillar.finding}</span>
        </p>
      </div>
    </div>
  )
}

// Template A: analysis and consulting spine (Question, Setup, Work, Payoff).
function TemplateA({ project }) {
  const { meta, links, detail } = project
  const Hero = detail?.hero ? heroes[detail.hero] : null

  return (
    <>
      {/* Header. */}
      <Section bg="base" innerClassName="pt-28 pb-10">
        <BackLink />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Eyebrow>{project.tag}</Eyebrow>
          <Badge variant="nda">{project.badgeLabel}</Badge>
        </div>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink md:text-5xl">
          {project.title}
        </h1>
        <div className="mt-6 grid gap-x-10 gap-y-4 text-sm text-ink-secondary sm:grid-cols-2">
          {meta.role && <Meta label="role" value={meta.role} />}
          {meta.tools && <Meta label="tools" value={meta.tools} />}
          {meta.timeline && <Meta label="timeline" value={meta.timeline} />}
          {meta.team && <Meta label="team" value={meta.team} />}
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl">
          {Hero ? <Hero /> : <Placeholder label={project.imageLabel} ratio="aspect-[21/9]" />}
        </div>
      </Section>

      {/* The Question. */}
      <Section bg="white" innerClassName="py-14">
        <Eyebrow>01 / the question</Eyebrow>
        <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-ink md:text-3xl">
          {detail.question.heading}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
          {detail.question.body}
        </p>
      </Section>

      {/* The Setup. */}
      <Section bg="violet" innerClassName="py-14">
        <Eyebrow>02 / the setup</Eyebrow>
        <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">
          Four sources, one messy picture
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{detail.setup.intro}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detail.setup.sources.map((source) => (
            <div key={source.name} className="rounded-2xl border border-violet/12 bg-white p-5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: source.color }}
                aria-hidden="true"
              />
              <p className="mt-3 font-serif text-lg text-ink">{source.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{source.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 max-w-3xl rounded-2xl border border-violet/15 bg-white p-6">
          <span className="eyebrow text-violet">the matching challenge</span>
          <p className="mt-2 leading-relaxed text-ink-secondary">{detail.setup.challenge}</p>
        </div>
      </Section>

      {/* The Work. */}
      <Section bg="white" innerClassName="py-14">
        <Eyebrow>03 / the work</Eyebrow>
        <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">Five pillars of the analysis</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
          Each pillar pairs a business question with a method and a finding.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {detail.pillars.map((pillar, i) => (
            <Pillar key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </Section>

      {/* Insights reporting: four slide excerpts from the final report. */}
      {detail.reporting && (
        <Section bg="base" innerClassName="py-14">
          <Eyebrow>04 / insights reporting</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-2xl text-ink md:text-3xl">
            {detail.reporting.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
            {detail.reporting.body}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {detail.reporting.images.map((img) => (
              <div
                key={img.src}
                className="overflow-hidden rounded-2xl border border-violet/12 bg-white"
              >
                <SmartImage src={img.src} alt={img.label} label={img.label} ratio="aspect-[16/10]" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Extension: unified Tableau dashboard on simulated data. */}
      {detail.extension && (
        <Section bg="violet" innerClassName="py-14">
          <Eyebrow>extension</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">
            {detail.extension.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
            {detail.extension.body}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-violet/15 bg-white">
            {detail.extension.embedUrl ? (
              <TableauEmbed src={detail.extension.embedUrl} />
            ) : (
              <Placeholder label="live Tableau dashboard" ratio="aspect-[16/9]" />
            )}
          </div>
        </Section>
      )}

      <ProjectLinks links={links} />
    </>
  )
}

// A single slide block: a labeled image placeholder plus a one line caption.
// Swap in an exported PNG by adding an `image` path to the slide in projects.js.
function SlideBlock({ slide, ratio = 'aspect-[16/9]' }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-violet/12 bg-white">
        <SmartImage src={slide.image} alt={slide.label} label={slide.label} ratio={ratio} />
      </div>
      {slide.caption && (
        <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary">
          {slide.caption}
        </figcaption>
      )}
    </figure>
  )
}

// Small line icons for the behavioral lever cards, keyed by lever.icon. Drawn
// in white to sit on the colored icon tile.
function LeverIcon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  if (name === 'cart') {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2 3h2.5l2.2 12.3a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.2L21.5 7H6" />
      </svg>
    )
  }
  if (name === 'refresh') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-2.6-6.3" />
        <path d="M21 4v5h-5" />
      </svg>
    )
  }
  if (name === 'link') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M9 13a4 4 0 0 0 5.7.5l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" />
        <path d="M15 11a4 4 0 0 0-5.7-.5l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" />
      </svg>
    )
  }
  if (name === 'swap') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 8h14" />
        <path d="M15 5l3 3-3 3" />
        <path d="M20 16H6" />
        <path d="M9 13l-3 3 3 3" />
      </svg>
    )
  }
  if (name === 'layers') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    )
  }
  // mail (default)
  return (
    <svg {...common} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  )
}

// A colored behavioral lever card: tinted background, colored top border, an
// icon tile, a colored heading, a one line description, and the raw variable
// names shown as monospace chips so they read as data fields. Colors come from
// the lever data. Falls back to a plain card if no colors are supplied.
function LeverCard({ lever }) {
  if (!lever.bg) {
    return (
      <div className="rounded-2xl border border-violet/12 bg-white p-5">
        <p className="font-serif text-lg text-ink">{lever.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{lever.text}</p>
      </div>
    )
  }
  return (
    <div
      className="rounded-2xl border-t-4 p-6"
      style={{ backgroundColor: lever.bg, borderTopColor: lever.border }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: lever.iconTile }}
      >
        <LeverIcon name={lever.icon} />
      </div>
      <p className="mt-4 font-serif text-lg" style={{ color: lever.heading }}>
        {lever.name}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{lever.text}</p>
      {lever.vars && (
        <div className="mt-4 flex flex-wrap gap-2">
          {lever.vars.map((v) => (
            <span
              key={v}
              className="rounded-md px-2 py-1 font-mono text-xs"
              style={{ backgroundColor: lever.chipBg, color: lever.chipText }}
            >
              {v}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Violet intro block: opens a modeling step by naming the method. Eyebrow in
// violet over a light violet field with a colored left border.
function IntroBlock({ eyebrow, children }) {
  return (
    <div
      className="rounded-2xl border-l-4 p-6"
      style={{ backgroundColor: '#EFEAF7', borderLeftColor: '#7E5C9E' }}
    >
      <span className="eyebrow text-base" style={{ color: '#7E5C9E' }}>
        {eyebrow}
      </span>
      <p className="mt-3 leading-relaxed text-ink-secondary">{children}</p>
    </div>
  )
}

// A progression of question "beats" with deliberately varying treatment, so the
// section reads as a build rather than four identical boxes. Variants, quietest
// to loudest: `lead` (plain prose), `rule` (a thin violet left rule with an
// eyebrow), `intro` (the filled violet IntroBlock), `highlight` (a bordered
// violet-tint card with larger Newsreader body for the payoff beat).
function QuestionBeats({ beats }) {
  return (
    <div className="mt-6 max-w-2xl space-y-6">
      {beats.map((beat, i) => {
        if (beat.variant === 'intro') {
          return (
            <IntroBlock key={i} eyebrow={beat.eyebrow}>
              {beat.body}
            </IntroBlock>
          )
        }
        if (beat.variant === 'rule') {
          return (
            <div key={i} className="border-l-2 border-violet/40 pl-5">
              {beat.eyebrow && <span className="eyebrow text-violet">{beat.eyebrow}</span>}
              <p className="mt-1 leading-relaxed text-ink-secondary">{beat.body}</p>
            </div>
          )
        }
        if (beat.variant === 'highlight') {
          return (
            <div key={i} className="rounded-2xl border border-violet/20 bg-violetTint p-7 md:p-8">
              {beat.eyebrow && <span className="eyebrow text-violet">{beat.eyebrow}</span>}
              <p className="mt-3 font-serif text-xl leading-snug text-ink md:text-2xl">
                {beat.body}
              </p>
            </div>
          )
        }
        // lead (default): plain prose.
        return (
          <p key={i} className="leading-relaxed text-ink-secondary">
            {beat.body}
          </p>
        )
      })}
    </div>
  )
}

// Teal marketing implication callout: closes a step with the so what. Light
// teal field, teal left border, teal eyebrow. The eyebrow defaults to
// "marketing implication" but can be overridden (e.g. "implication one · depth").
function ImplicationCallout({ children, eyebrow = 'marketing implication' }) {
  return (
    <div
      className="rounded-2xl border-l-4 p-6"
      style={{ backgroundColor: '#E8F1EF', borderLeftColor: '#4E8F86' }}
    >
      <span className="eyebrow" style={{ color: '#2E5B54' }}>
        {eyebrow}
      </span>
      <p className="mt-2 leading-relaxed text-ink">{children}</p>
    </div>
  )
}

// A key and value list of the model's variables. Each value is a sequence of
// inline segments: a {code} segment renders as a mono chip, a {text} segment as
// plain prose, so variable names read as data fields inside a sentence.
function VariablesBlock({ variables }) {
  return (
    <div className="mt-8 max-w-3xl rounded-2xl border border-violet/15 bg-white p-6">
      <dl className="space-y-4">
        {variables.rows.map((row) => (
          <div key={row.label} className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="eyebrow text-violet">{row.label}</dt>
            <dd className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-secondary sm:mt-0">
              {row.value.map((seg, i) =>
                seg.code ? (
                  <span
                    key={i}
                    className="rounded-md bg-violetTint px-2 py-0.5 font-mono text-xs text-violet"
                  >
                    {seg.code}
                  </span>
                ) : (
                  <span key={i}>{seg.text}</span>
                ),
              )}
            </dd>
          </div>
        ))}
      </dl>
      {variables.footnote && (
        <p className="mt-5 border-t border-violet/10 pt-4 text-sm leading-relaxed text-ink-muted">
          {variables.footnote}
        </p>
      )}
    </div>
  )
}

// A step's media: a list of blocks, each either a full width slide or a pair of
// slides side by side (with captions). Used inside a modeling step.
function StepMedia({ blocks }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === 'pair' ? (
          <div key={i} className="grid gap-6 md:grid-cols-2">
            {block.slides.map((s) => (
              <SlideBlock key={s.label} slide={s} />
            ))}
          </div>
        ) : (
          <SlideBlock key={i} slide={block} />
        ),
      )}
    </>
  )
}

// Template B: modeling on public data, slide driven. Reused across the ML
// projects; every section renders only when its data is present.
function TemplateB({ project }) {
  const { meta, links, detail } = project
  const Hero = detail?.hero ? heroes[detail.hero] : null

  return (
    <>
      {/* Header. */}
      <Section bg="base" innerClassName="pt-28 pb-10">
        <BackLink />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Eyebrow>{project.tag}</Eyebrow>
          <Badge variant="dataset">{project.badgeLabel || 'public dataset'}</Badge>
        </div>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink md:text-5xl">
          {project.title}
        </h1>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm text-ink-secondary">
          {meta.tools && <Meta label="tools" value={meta.tools} />}
        </div>
        {meta.models && (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.models.map((m) => (
              <Chip key={m}>{m}</Chip>
            ))}
          </div>
        )}
        {/* Hero kept compact (max-w-2xl) and flush left so its edge lines up
            with the title above it. */}
        <div className="mt-8 max-w-2xl overflow-hidden rounded-2xl">
          {Hero ? <Hero /> : <Placeholder label={project.imageLabel} ratio="aspect-[21/9]" />}
        </div>
      </Section>

      {/* The Question. */}
      {detail?.question && (
        <Section bg="white" innerClassName="py-14">
          <Eyebrow>01 / the question</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-ink md:text-3xl">
            {detail.question.heading}
          </h2>
          {detail.question.beats ? (
            <QuestionBeats beats={detail.question.beats} />
          ) : (
            <>
              {detail.question.body && (
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
                  {detail.question.body}
                </p>
              )}
              {detail.question.points && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {detail.question.points.map((point) => (
                    <div
                      key={point.label}
                      className="rounded-2xl border border-violet/12 bg-white p-6"
                    >
                      <span className="eyebrow text-violet">{point.label}</span>
                      <p className="mt-2 leading-relaxed text-ink-secondary">{point.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Section>
      )}

      {/* The Setup. */}
      {detail?.setup && (
        <Section bg="violet" innerClassName="py-14">
          <Eyebrow>{detail.setup.eyebrow || '02 / the setup'}</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-2xl text-ink md:text-3xl">
            {detail.setup.heading || 'The data and the levers'}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{detail.setup.intro}</p>
          {detail.setup.stats && (
            <div className="mt-8 flex flex-wrap gap-10">
              {detail.setup.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-violet">
                    <CountUp to={stat.number} />
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
          {detail.setup.levers && (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {detail.setup.levers.map((lever) => (
                <LeverCard key={lever.name} lever={lever} />
              ))}
            </div>
          )}
          {detail.setup.variables && <VariablesBlock variables={detail.setup.variables} />}
          {detail.setup.blocks && (
            <div className="mt-10 space-y-12">
              {detail.setup.blocks.map((block) => (
                <div key={block.heading}>
                  <h3 className="font-serif text-lg text-ink md:text-xl">{block.heading}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-secondary">{block.text}</p>
                  {block.slide && (
                    <div className="mt-6">
                      <SlideBlock slide={block.slide} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* The Work: a sequence of modeling steps, each opened by a violet intro
          block, followed by its slides, and closed by a teal implication. */}
      {detail?.work && (
        <Section bg="white" innerClassName="py-14">
          <Eyebrow>{detail.work.eyebrow || '03 / the work'}</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-2xl text-ink md:text-3xl">
            {detail.work.heading || 'The work'}
          </h2>
          {detail.work.intro && (
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{detail.work.intro}</p>
          )}
          {detail.work.steps && (
            <div className="mt-10 space-y-14">
              {detail.work.steps.map((step, i) => (
                <div key={i} className="space-y-6">
                  <IntroBlock eyebrow={step.introEyebrow}>{step.introBody}</IntroBlock>
                  {step.blocks && <StepMedia blocks={step.blocks} />}
                  {step.takeaway && (
                    <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {step.takeaway}
                    </p>
                  )}
                  {step.implication && <ImplicationCallout>{step.implication}</ImplicationCallout>}
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Marketing implication (renamed from The Payoff): the summary and the
          strategy slides. */}
      {detail?.payoff && (
        <Section bg="violet" innerClassName="py-14">
          <Eyebrow>{detail.payoff.eyebrow || '04 / marketing implication'}</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-2xl text-ink md:text-3xl">
            {detail.payoff.heading || 'What the models mean for marketing'}
          </h2>
          {detail.payoff.summary && (
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
              {detail.payoff.summary}
            </p>
          )}
          {detail.payoff.implications && (
            <div className="mt-8 space-y-10">
              {detail.payoff.implications.map((imp) => (
                <div key={imp.eyebrow} className="space-y-6">
                  <ImplicationCallout eyebrow={imp.eyebrow}>{imp.body}</ImplicationCallout>
                  {imp.slide && <SlideBlock slide={imp.slide} />}
                </div>
              ))}
            </div>
          )}
          {detail.payoff.slides && (
            <div className="mt-8 space-y-10">
              {detail.payoff.slides.map((slide) => (
                <SlideBlock key={slide.label} slide={slide} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* The code. Dark code panel to match the SQL code sections. */}
      {detail?.code && (
        <Section bg="base" innerClassName="py-14">
          <Eyebrow>the code</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">A look at the modeling code</h2>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-[#1E1B2E] p-5 text-sm leading-relaxed text-[#E7E3F5] shadow-[0_18px_50px_-30px_rgba(30,27,46,0.9)]">
            <code>{detail.code.snippet}</code>
          </pre>
          <div className="mt-6 flex flex-wrap gap-3">
            {links?.githubR && (
              <Button href={links.githubR} variant="outline">
                R repo
              </Button>
            )}
          </div>
        </Section>
      )}
    </>
  )
}

// SQL keywords and functions that get the blue highlight.
const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'GROUP', 'ORDER', 'BY', 'HAVING', 'LIMIT', 'DISTINCT',
  'CREATE', 'TEMPORARY', 'TABLE', 'AS', 'ON', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AND', 'OR', 'NOT', 'IS', 'NULL', 'IN', 'BETWEEN',
  'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'UNION', 'ALL', 'WITH',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'YEAR', 'MONTH', 'DAY',
])

// Lightweight SQL syntax highlighting: keywords in blue, comments muted, strings
// green. Tokenizes the source while preserving all whitespace and newlines.
const SQL_TOKEN_RE = /(--[^\n]*)|('(?:[^']|'')*')|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\s])/g

function highlightSql(code) {
  const out = []
  let match
  let i = 0
  SQL_TOKEN_RE.lastIndex = 0
  while ((match = SQL_TOKEN_RE.exec(code)) !== null) {
    const [text, comment, string, word] = match
    if (comment) {
      out.push(
        <span key={i++} className="text-[#7E7A99] italic">
          {comment}
        </span>,
      )
    } else if (string) {
      out.push(
        <span key={i++} className="text-[#B6D98F]">
          {string}
        </span>,
      )
    } else if (word && SQL_KEYWORDS.has(word.toUpperCase())) {
      out.push(
        <span key={i++} className="font-semibold text-[#82AAFF]">
          {word}
        </span>,
      )
    } else {
      out.push(text)
    }
  }
  return out
}

// A styled read-only code block on a dark background with SQL highlighting.
function CodeBlock({ code }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#1E1B2E] p-5 text-sm leading-relaxed text-[#E7E3F5] shadow-[0_18px_50px_-30px_rgba(30,27,46,0.9)]">
      <code>{highlightSql(code)}</code>
    </pre>
  )
}

// A featured analysis in Template C: question, approach, a short code skeleton,
// and the finding it revealed.
function FeaturedAnalysis({ analysis }) {
  return (
    <div className="rounded-2xl border border-violet/12 bg-white p-6 shadow-[0_16px_44px_-34px_rgba(74,63,143,0.5)]">
      <div className="flex items-center gap-2.5">
        <span className="h-5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
        <h3 className="font-serif text-xl text-violet">{analysis.title}</h3>
      </div>
      <p className="mt-3 text-sm font-medium italic text-ink-secondary">{analysis.question}</p>
      <div className="mt-4 text-sm leading-relaxed text-ink-secondary">
        <span className="eyebrow text-ink-muted">approach</span>
        <p className="mt-1">{analysis.approach}</p>
      </div>
      <CodeBlock code={analysis.code} />
      <p className="mt-4 rounded-xl bg-violetTint px-4 py-3 text-sm text-ink">
        <span className="eyebrow text-violet">finding</span>
        <span className="mt-1 block leading-relaxed">{analysis.finding}</span>
      </p>
    </div>
  )
}

// Template C: SQL and analysis project (the Question, Setup, Work, Takeaways
// rhythm with code blocks). Content is data driven; each section renders only
// when present, so future analysis projects slot in by adding a `detail`.
function TemplateC({ project }) {
  const { meta, links, detail } = project
  const Hero = detail?.hero ? heroes[detail.hero] : null

  return (
    <>
      {/* Header. */}
      <Section bg="base" innerClassName="pt-28 pb-10">
        <BackLink />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Eyebrow>{project.tag}</Eyebrow>
          <Badge variant="dataset">{project.badgeLabel || 'public dataset'}</Badge>
        </div>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink md:text-5xl">
          {project.title}
        </h1>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm text-ink-secondary">
          {meta.tools && <Meta label="tools" value={meta.tools} />}
          {meta.methods && <Meta label="methods" value={meta.methods} />}
        </div>
        <div className="mt-8 max-w-3xl overflow-hidden rounded-2xl">
          {Hero ? <Hero /> : <Placeholder label={project.imageLabel} ratio="aspect-[21/9]" />}
        </div>
      </Section>

      {/* The Question. */}
      {detail?.question && (
        <Section bg="white" innerClassName="py-14">
          <Eyebrow>01 / the question</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-ink md:text-3xl">
            {detail.question.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{detail.question.body}</p>
        </Section>
      )}

      {/* The Setup. */}
      {detail?.setup && (
        <Section bg="violet" innerClassName="py-14">
          <Eyebrow>02 / the setup</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">{detail.setup.heading}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{detail.setup.body}</p>
          {detail.setup.tables && (
            <div className="mt-6 flex flex-wrap gap-2">
              {detail.setup.tables.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* The Work. */}
      {detail?.work && (
        <Section bg="white" innerClassName="py-14">
          <Eyebrow>03 / the work</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">{detail.work.heading}</h2>
          {detail.work.subhead && (
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{detail.work.subhead}</p>
          )}
          {links?.github && (
            <div className="mt-6">
              <Button href={links.github} variant="outline">
                view full SQL on GitHub
              </Button>
            </div>
          )}
          {detail.work.featured && (
            <div className="mt-8 space-y-6">
              {detail.work.featured.map((analysis) => (
                <FeaturedAnalysis key={analysis.title} analysis={analysis} />
              ))}
            </div>
          )}
          {detail.work.cards && (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {detail.work.cards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-violet/12 bg-white p-6 shadow-[0_16px_44px_-34px_rgba(74,63,143,0.5)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
                    <h3 className="font-serif text-lg text-violet">{card.title}</h3>
                  </div>
                  {card.question && (
                    <p className="mt-3 text-sm font-medium italic text-ink-secondary">
                      {card.question}
                    </p>
                  )}
                  <div className="mt-4 text-sm leading-relaxed text-ink-secondary">
                    <span className="eyebrow text-ink-muted">technique</span>
                    <p className="mt-1">{card.technique}</p>
                  </div>
                  <p className="mt-4 rounded-xl bg-violetTint px-4 py-3 text-sm text-ink">
                    <span className="eyebrow text-violet">finding</span>
                    <span className="mt-1 block leading-relaxed">{card.finding}</span>
                  </p>
                  {links?.github && (
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet hover:opacity-80"
                    >
                      view on GitHub
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      )}
    </>
  )
}

// Template D: end to end SQL and Tableau project (the Question, Extraction,
// Dashboard, Reveals rhythm). SQL extracts pair a business question with a short
// code skeleton; the dashboard section embeds the live multi tab Tableau viz.
// Content is data driven; each section renders only when present.
function TemplateD({ project }) {
  const { meta, links, detail } = project
  const Hero = detail?.hero ? heroes[detail.hero] : null

  return (
    <>
      {/* Header. */}
      <Section bg="base" innerClassName="pt-28 pb-10">
        <BackLink />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Eyebrow>{project.tag}</Eyebrow>
          <Badge variant="dataset">{project.badgeLabel || 'public dataset'}</Badge>
        </div>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink md:text-5xl">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{project.subtitle}</p>
        )}
        <div className="mt-6 grid gap-x-10 gap-y-4 text-sm text-ink-secondary sm:grid-cols-3">
          {meta.tools && <Meta label="tools" value={meta.tools} />}
          {meta.scope && <Meta label="scope" value={meta.scope} />}
          {meta.dataset && <Meta label="dataset" value={meta.dataset} />}
        </div>
        {/* Slight negative left margin pulls the card's left edge flush with the
            title above it; max-w-2xl keeps the now taller, narrower hero compact. */}
        <div className="mt-8 -ml-1 max-w-2xl overflow-hidden rounded-2xl">
          {Hero ? <Hero /> : <Placeholder label={project.imageLabel} ratio="aspect-[21/9]" />}
        </div>
      </Section>

      {/* 01 The Question. */}
      {detail?.question && (
        <Section bg="white" innerClassName="py-14">
          <Eyebrow>01 / the question</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-ink md:text-3xl">
            {detail.question.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">{detail.question.body}</p>
        </Section>
      )}

      {/* 02 The Extraction: featured SQL extracts, then the full repo. */}
      {detail?.extraction && (
        <Section bg="violet" innerClassName="py-14">
          <Eyebrow>02 / the extraction</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">
            {detail.extraction.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
            {detail.extraction.intro}
          </p>
          {detail.extraction.featured && (
            <div className="mt-8 space-y-6">
              {detail.extraction.featured.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-violet/12 bg-white p-6 shadow-[0_16px_44px_-34px_rgba(74,63,143,0.5)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
                    <h3 className="font-serif text-xl text-violet">{item.title}</h3>
                  </div>
                  <div className="mt-4 text-sm leading-relaxed text-ink-secondary">
                    <span className="eyebrow text-ink-muted">approach</span>
                    <p className="mt-1">{item.approach}</p>
                  </div>
                  <CodeBlock code={item.code} />
                </div>
              ))}
            </div>
          )}
          {links?.github && (
            <div className="mt-8">
              <Button href={links.github} variant="outline">
                view all 12 SQL extracts on GitHub
              </Button>
            </div>
          )}
        </Section>
      )}

      {/* 03 The Dashboard: the live, interactive multi tab Tableau embed. */}
      {detail?.dashboard && (
        <Section bg="white" innerClassName="py-14">
          <Eyebrow>03 / the dashboard</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">
            {detail.dashboard.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-secondary">
            {detail.dashboard.body}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-violet/15 bg-white">
            {detail.dashboard.embedUrl ? (
              <TableauEmbed src={detail.dashboard.embedUrl} native={ONLINE_DASHBOARD_NATIVE} />
            ) : (
              <Placeholder label="live Tableau dashboard" ratio="aspect-[4/3]" />
            )}
          </div>
          {links?.dashboard && (
            <div className="mt-6">
              <Button href={links.dashboard} variant="outline">
                open full dashboard on Tableau Public
              </Button>
            </div>
          )}
        </Section>
      )}

      {/* 04 What the dashboard reveals: one insight per view, as color blocks. */}
      {detail?.reveals && (
        <Section bg="violet" innerClassName="py-14">
          <Eyebrow>04 / what the dashboard reveals</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl text-ink md:text-3xl">{detail.reveals.heading}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {detail.reveals.blocks.map((block) => (
              <div
                key={block.title}
                className={`rounded-2xl border-l-4 p-6 ${block.full ? 'md:col-span-2' : ''}`}
                style={{ backgroundColor: block.bg, borderLeftColor: block.border }}
              >
                <h3 className="font-serif text-lg text-ink">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{block.text}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="eyebrow text-ink-muted">{label}</p>
      <p className="mt-1 whitespace-pre-line text-ink">{value}</p>
    </div>
  )
}

function ProjectLinks({ links }) {
  if (!links) return null
  return (
    <Section bg="base" innerClassName="py-12">
      <div className="flex flex-wrap gap-3">
        {links.deck && <Button href={links.deck}>view deck</Button>}
        {links.dashboard && (
          <Button href={links.dashboard} variant="outline">
            open dashboard
          </Button>
        )}
        {links.github && (
          <Button href={links.github} variant="outline">
            view on GitHub
          </Button>
        )}
      </div>
    </Section>
  )
}

export default function DataProject() {
  const { slug } = useParams()
  const project = getDataProject(slug)
  if (!project) return <NotFound />
  if (project.template === 'A') return <TemplateA project={project} />
  if (project.template === 'C') return <TemplateC project={project} />
  if (project.template === 'D') return <TemplateD project={project} />
  return <TemplateB project={project} />
}
