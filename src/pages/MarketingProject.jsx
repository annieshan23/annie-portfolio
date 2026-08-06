import { useParams, Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import Button from '../components/Button.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { getMarketingProject } from '../data/projects.js'

// One deck slide, rendered at its natural proportion so nothing is cropped.
// Until the PNG is dropped in, SmartImage shows a numbered placeholder so the
// arrangement stays visible. Files are named 1.png .. N.png in the folder.
function Slide({ folder, n }) {
  return (
    <div className="overflow-hidden rounded-xl border-[0.5px] border-terracotta/20 bg-white">
      <SmartImage
        src={`${folder}/${n}.png`}
        alt={`Slide ${n}`}
        label={String(n).padStart(2, '0')}
        natural
        ratio="aspect-[16/9]"
        rounded="rounded-xl"
      />
    </div>
  )
}

// Numbered deck: slide 1 alone on a full width row (the title page), slides 2..N
// two per row in number order.
function SlideDeck({ folder, count }) {
  const numbers = Array.from({ length: count }, (_, i) => i + 1)
  const [first, ...rest] = numbers
  return (
    <div className="space-y-6">
      {first && <Slide folder={folder} n={first} />}
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((n) => (
          <Slide key={n} folder={folder} n={n} />
        ))}
      </div>
    </div>
  )
}

export default function MarketingProject() {
  const { slug } = useParams()
  const project = getMarketingProject(slug)

  if (!project) {
    return (
      <Section bg="base" innerClassName="pt-32">
        <h1 className="font-serif text-3xl text-ink">Project not found</h1>
        <div className="mt-6">
          <Button to="/marketing">back to marketing</Button>
        </div>
      </Section>
    )
  }

  const { meta, links, detail } = project

  // Graceful fallbacks so every marketing project renders a complete page even
  // before its full detail content is written.
  const description = detail?.description || project.brief
  const skills = detail?.skills
  const intro = detail?.intro
  const slides = detail?.slides

  return (
    <>
      {/* Hero: cream, terracotta accents. Left text block, right slim project
          card (three fields only, no team, no role). */}
      <Section bg="cream" innerClassName="pt-28 pb-12">
        <Link to="/marketing" className="text-sm font-semibold text-terracotta hover:opacity-80">
          &larr; back to marketing
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_260px]">
          <div>
            <Eyebrow accent="terracotta">{project.tag}</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-ink md:text-5xl">
              {project.title}
            </h1>
            {description && (
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-secondary">
                {description}
              </p>
            )}
            {skills && (
              <p className="mt-9 max-w-2xl text-sm leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">Key skills demonstrated: </span>
                {skills}
              </p>
            )}
          </div>

          {/* Slim project card. */}
          <aside className="space-y-4 self-start rounded-xl border-[0.5px] border-terracotta/25 bg-white p-6">
            {meta?.type && <SideMeta label="project type" value={meta.type} />}
            {meta?.date && <SideMeta label="date" value={meta.date} />}
            {meta?.tools && <SideMeta label="tools" value={meta.tools} />}
          </aside>
        </div>
      </Section>

      {/* 01 / Intro. Supports a simple paragraph list (default) plus an optional
          lead paragraph and labeled subsections (a plain text block, or a spaced
          execution list of label + description items). */}
      {intro && (
        <Section bg="white" innerClassName="pt-14 pb-4">
          <Eyebrow accent="terracotta">01 / intro</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-ink md:text-4xl">
            {intro.heading}
          </h2>
          {(intro.lead || intro.paragraphs) && (
            <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-ink-secondary">
              {intro.lead && <p>{intro.lead}</p>}
              {intro.paragraphs?.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
          {intro.sections && (
            <div className="mt-10 max-w-3xl space-y-8">
              {intro.sections.map((section, i) => (
                <div key={i}>
                  <p className="text-[0.95rem] font-semibold text-ink">{section.label}</p>
                  {section.text && (
                    <p className="mt-3 leading-relaxed text-ink-secondary">{section.text}</p>
                  )}
                  {section.items && (
                    <div className="mt-5 space-y-5">
                      {section.items.map((it, j) => (
                        <div key={j} className="border-l-2 border-terracotta/40 pl-4">
                          <p className="font-semibold text-ink">{it.label}</p>
                          <p className="mt-1 leading-relaxed text-ink-secondary">{it.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Slides: numbered deck, no captions. */}
      {slides && (
        <Section bg="white" innerClassName="pt-8 pb-20">
          <SlideDeck folder={slides.folder} count={slides.count} />
        </Section>
      )}

      {links?.deck && (
        <Section bg="white" innerClassName="pb-20">
          <Button href={links.deck} variant="outline">
            view full deck
          </Button>
        </Section>
      )}
    </>
  )
}

function SideMeta({ label, value }) {
  return (
    <div>
      <p className="eyebrow text-terracotta">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  )
}
