import { useRef, useState } from 'react'
import Section from '../components/Section.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import SmartImage from '../components/SmartImage.jsx'

// OOO ("out of office") — life beyond work. Warm, on brand (violet accents,
// Newsreader headings, no dashes). Developed live with Annie.

// One passion block: a Newsreader title, body text, and a pair of photos.
// `flip` puts the photos in the left column (text on the right).
function Passion({ title, children, photos = [], flip = false }) {
  const text = (
    <div className="max-w-xl">
      <h2 className="font-serif text-3xl text-ink md:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 text-ink-secondary">{children}</div>
    </div>
  )

  const gallery = (
    <div className="grid grid-cols-2 gap-4">
      {photos.map((p, i) => (
        <figure key={p.src || i}>
          <SmartImage src={p.src} label={p.label} ratio={p.ratio || 'aspect-[3/4]'} />
          {p.caption && (
            <figcaption className="mt-2 text-center text-[11px] leading-snug text-ink-muted">
              {p.caption}
            </figcaption>
          )}
        </figure>
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

// "Things I'm into" — a warm cream + terracotta card grid. Each hand drawn SVG
// glyph is terracotta stroked (#B06A45) to match the section palette.
const hobbies = [
  {
    label: 'Running',
    caption: 'Training for the Chicago Half Marathon, back at it after a leg injury.',
    icon: (
      <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
        <circle cx="14" cy="16" r="8.5" fill="none" stroke="#B06A45" strokeWidth="1.6" />
        <line x1="14" y1="16" x2="18" y2="12.5" stroke="#B06A45" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="14" y1="5.5" x2="14" y2="7.5" stroke="#B06A45" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="11.3" y1="5" x2="16.7" y2="5" stroke="#B06A45" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Food',
    caption:
      "I'll happily cross a city for a good meal. Korean and French have my heart, and Chinese will always be home.",
    icon: (
      <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
        <line x1="8" y1="12" x2="8" y2="23" stroke="#B06A45" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="6" y1="5.5" x2="6" y2="10" stroke="#B06A45" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="5.5" x2="8" y2="10" stroke="#B06A45" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="5.5" x2="10" y2="10" stroke="#B06A45" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 10 Q 8 12.5 10 10" fill="none" stroke="#B06A45" strokeWidth="1.5" />
        <path d="M20 5.5 Q 23 9 20.5 14 L20 14 L20 23" fill="none" stroke="#B06A45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'On the water',
    caption:
      'The ocean keeps reeling me back, from surfing to getting PADI certified, and lately fumbling my way through sailing lessons.',
    icon: (
      <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
        <path d="M4 12 Q 7.5 8 11 12 T 18 12 T 24 12" fill="none" stroke="#B06A45" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 17.5 Q 7.5 13.5 11 17.5 T 18 17.5 T 24 17.5" fill="none" stroke="#B06A45" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Nintendo',
    caption: 'Zelda got me through the covid years and honestly never left.',
    icon: (
      <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
        <rect x="4.5" y="10" width="19" height="9.5" rx="4.75" fill="none" stroke="#B06A45" strokeWidth="1.6" />
        <line x1="9" y1="12.6" x2="9" y2="16.9" stroke="#B06A45" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6.8" y1="14.75" x2="11.2" y2="14.75" stroke="#B06A45" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="13.6" r="1.1" fill="#B06A45" />
        <circle cx="20.2" cy="16" r="1.1" fill="#B06A45" />
      </svg>
    ),
  },
]

// Count agnostic gallery: any images dropped into src/assets/funfacts-gallery
// are picked up in natural filename order at build time. Until then, a set of
// placeholder cards keep the carousel shape.
const galleryModules = import.meta.glob('../assets/funfacts-gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})
const galleryImages = Object.keys(galleryModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => galleryModules[k])

// Horizontal photo carousel. Each page is a 2x3 grid (three across on desktop,
// so six show at once); pages scroll left and right with snap. Any images
// dropped into the gallery folder fill the pages in order, six at a time; until
// then, two placeholder pages keep the carousel shape.
function GalleryCarousel() {
  const scroller = useRef(null)
  const [page, setPage] = useState(0)

  const images = galleryImages.length ? galleryImages : Array.from({ length: 12 }, () => null)
  const pages = []
  for (let i = 0; i < images.length; i += 6) pages.push(images.slice(i, i + 6))

  const goTo = (next) => {
    const el = scroller.current
    if (!el) return
    const clamped = Math.max(0, Math.min(pages.length - 1, next))
    const target = el.children[clamped]
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
    setPage(clamped)
  }

  // Keep the dots in sync when the user scrolls or swipes by hand. Snap to the
  // page whose left edge is nearest the current scroll position (accounts for
  // the gap between pages).
  const onScroll = () => {
    const el = scroller.current
    if (!el) return
    let nearest = 0
    let best = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const d = Math.abs(el.children[i].offsetLeft - el.scrollLeft)
      if (d < best) {
        best = d
        nearest = i
      }
    }
    setPage(nearest)
  }

  return (
    <div className="mt-10">
      <div className="relative">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {pages.map((cards, pi) => (
            <div
              key={pi}
              className="grid w-full shrink-0 snap-start grid-cols-2 gap-4 md:grid-cols-3"
            >
              {cards.map((src, i) => (
                <SmartImage
                  key={i}
                  src={src || undefined}
                  label="a moment"
                  ratio="aspect-[4/3]"
                  rounded="rounded-2xl"
                />
              ))}
            </div>
          ))}
        </div>

        {pages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous photos"
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-violet/20 bg-white/90 text-violet shadow-md backdrop-blur transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
            >
              <span className="-mt-0.5 text-xl leading-none">&#8249;</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === pages.length - 1}
              aria-label="More photos"
              className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-violet/20 bg-white/90 text-violet shadow-md backdrop-blur transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
            >
              <span className="-mt-0.5 text-xl leading-none">&#8250;</span>
            </button>
          </>
        )}
      </div>

      {pages.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {pages.map((_, pi) => (
            <button
              key={pi}
              type="button"
              onClick={() => goTo(pi)}
              aria-label={`Go to photo set ${pi + 1}`}
              className={`h-2 rounded-full transition-all ${
                pi === page ? 'w-6 bg-violet' : 'w-2 bg-violet/25 hover:bg-violet/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

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

      {/* Section 1: World traveler — photo left, text right. */}
      <Section bg="white">
        <Passion
          flip
          title="World traveler"
          photos={[
            { label: 'travel photo', src: '/images/funfacts/travel-1.jpg', caption: 'Skydiving in Barcelona' },
            { label: 'travel photo', src: '/images/funfacts/travel-2.jpg', caption: 'Earning my PADI diving certification in Costa Rica' },
          ]}
        >
          <p>
            There's a cliché story I keep telling people. Back in high school, a teacher
            asked what we wanted to do with our lives, and I said I wanted to leave my
            footprint on every corner of the world. Everyone laughed, because it didn't
            sound like a real career. But the dream had already taken root, and it never
            really left. 20+ countries later, I'm still always on the road.
          </p>
        </Passion>
      </Section>

      {/* Section 2: On foot and on the road — text left, photo right. */}
      <Section bg="base">
        <Passion
          title="On foot and on the road"
          photos={[
            { label: 'trail photo', src: '/images/funfacts/hike-1.jpg', caption: 'Solo backpacking trip in Switzerland' },
            { label: 'trail photo', src: '/images/funfacts/hike-2.jpg', caption: 'Hiking trip in Brazil' },
          ]}
        >
          <p>
            Of all the ways to move through a place, hiking and road trips are the two I
            love most. Both put you close to the wilderness, wind on your face, nowhere to
            be but the next mile. There's something about watching the dust kick up behind
            the wheels, or reaching a ridgeline on foot, that makes me feel completely
            alive. So far that's meant hiking across 4 continents and road tripping to 20+
            national parks, and the list keeps growing.
          </p>
        </Passion>
      </Section>

      {/* Section 3: Hobbies — warm cream + terracotta card grid. */}
      <Section bg="white" className="!bg-[#FBF8F2]">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="font-serif text-3xl text-[#2A2018] md:text-4xl">
            Of course, we're also welcome to talk about...
          </h2>
          <p className="mt-4 font-serif italic text-[#8A6E5A]">
            There's always something new I'm trying to get better at, and just as often
            something old I keep coming back to.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[820px] grid-cols-1 gap-[18px] sm:grid-cols-2">
          {hobbies.map((h) => (
            <div
              key={h.label}
              className="flex items-start gap-4 rounded-2xl border border-[#EFE7DB] bg-white px-6 py-[22px]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#F1E7DB]">
                {h.icon}
              </div>
              <div>
                <h3 className="font-serif text-[20px] leading-tight text-[#2A2018]">{h.label}</h3>
                <p className="mt-1.5 text-sm text-[#5C5248]">{h.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 4: The photo gallery — horizontal carousel. */}
      <Section bg="base">
        <h2 className="text-center font-serif text-3xl text-ink md:text-4xl">
          The photo gallery
        </h2>
        <GalleryCarousel />
      </Section>
    </>
  )
}
