import Section from '../components/Section.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import Chip from '../components/Chip.jsx'
import SmartImage from '../components/SmartImage.jsx'

// Fun Facts — warm, playful, on brand (violet accents, Newsreader headings,
// no dashes). Leans into the adventurer motif from the landing page.
// Developed live with Annie; copy and photos are hers to edit.

// One passion block: heading, paragraph, a row of little detail chips, and a
// pair of photo placeholders. `flip` puts the photos on the left.
function Passion({ eyebrow, title, children, chips = [], photos = [], flip = false }) {
  const text = (
    <div className="max-w-xl">
      <Eyebrow accent="violet">{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 text-ink-secondary">{children}</div>
      {chips.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      )}
    </div>
  )

  const gallery = (
    <div className="grid grid-cols-2 gap-4">
      {photos.map((p) => (
        <SmartImage key={p.label} src={p.src} label={p.label} ratio={p.ratio || 'aspect-[3/4]'} />
      ))}
    </div>
  )

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      {flip ? (
        <>
          <div className="order-2 md:order-1">{gallery}</div>
          <div className="order-1 md:order-2">{text}</div>
        </>
      ) : (
        <>
          {text}
          {gallery}
        </>
      )}
    </div>
  )
}

// Closing photo gallery: a few candid moments in a light mosaic.
const moments = [
  { label: 'a moment', src: '/images/funfacts/moment-1.jpg', span: 'md:col-span-2', ratio: 'aspect-[16/9]' },
  { label: 'a moment', src: '/images/funfacts/moment-2.jpg', ratio: 'aspect-square' },
  { label: 'a moment', src: '/images/funfacts/moment-3.jpg', ratio: 'aspect-square' },
  { label: 'a moment', src: '/images/funfacts/moment-4.jpg', ratio: 'aspect-square' },
  { label: 'a moment', src: '/images/funfacts/moment-5.jpg', ratio: 'aspect-square' },
  { label: 'a moment', src: '/images/funfacts/moment-6.jpg', span: 'md:col-span-2', ratio: 'aspect-[16/9]' },
]

export default function FunFacts() {
  return (
    <>
      {/* Hero: full-bleed photo band with the eyebrow + title overlaid on it,
          the nav sitting transparently on top (see App.jsx overlayNav). */}
      <section className="relative w-full overflow-hidden bg-violetTint">
        <div className="w-full">
          <SmartImage
            src="/images/funfacts/hero.jpg"
            label="hero photo"
            ratio="aspect-[32/9]"
            rounded=""
            position="object-[center_70%]"
          />
        </div>
        {/* Legibility wash so the white text reads over any photo. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/35" />
        {/* Overlaid text, bottom-left. */}
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="mx-auto w-full max-w-content px-6 pb-10 md:px-8 md:pb-14">
            <Eyebrow className="text-white/90 [text-shadow:_0_1px_12px_rgba(0,0,0,0.35)]">
              out of office
            </Eyebrow>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-white [text-shadow:_0_2px_24px_rgba(0,0,0,0.35)] md:text-5xl">
              Life beyond work
            </h1>
          </div>
        </div>
      </section>

      {/* Passion one: travel */}
      <Section bg="white">
        <Passion
          eyebrow="always exploring"
          title="Chasing the next place"
          chips={['new cities', 'road trips', 'window seats', 'local food']}
          photos={[
            { label: 'travel photo', src: '/images/funfacts/travel-1.jpg' },
            { label: 'travel photo', src: '/images/funfacts/travel-2.jpg' },
          ]}
        >
          <p>
            I collect places the way some people collect playlists. A new city means a
            morning with no plan, a map I half ignore, and a list of small spots to find on
            foot. I love the messy first hour in a place I have never been, when everything
            is a question and the answers are just around the next corner.
          </p>
          <p>
            Wherever I land, the food comes first. The best afternoons start with a
            recommendation from someone who actually lives there.
          </p>
        </Passion>
      </Section>

      {/* Passion two: hiking */}
      <Section bg="base">
        <Passion
          flip
          eyebrow="happiest on a trail"
          title="Up where the view earns itself"
          chips={['switchbacks', 'summit coffee', 'golden hour', 'good boots']}
          photos={[
            { label: 'trail photo', src: '/images/funfacts/hike-1.jpg' },
            { label: 'trail photo', src: '/images/funfacts/hike-2.jpg' },
          ]}
        >
          <p>
            There is a kind of quiet you only find a few hours up a trail. No notifications,
            no dashboards, just the next step and the sound of your own breathing. Hiking is
            where I do my clearest thinking, which is funny, because the whole point is to
            stop thinking for a while.
          </p>
          <p>
            The view at the top is the reward, but honestly it is the climb I keep coming
            back for. A long trail is really just a problem you solve with your legs.
          </p>
        </Passion>
      </Section>

      {/* Closing gallery */}
      <Section bg="white">
        <div className="text-center">
          <Eyebrow accent="violet" className="text-center">
            the photo dump
          </Eyebrow>
          <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">A few favorite moments</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {moments.map((m, i) => (
            <SmartImage
              key={i}
              src={m.src}
              label={m.label}
              ratio={m.ratio}
              className={m.span || ''}
            />
          ))}
        </div>
        <p className="mt-10 text-center text-ink-secondary">
          Thanks for scrolling all the way here. If any of this resonates, I would love to
          swap trail recommendations sometime.
        </p>
      </Section>
    </>
  )
}
