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

// Centered "things I'm into" list.
const hobbies = [
  'A beginning runner, currently training for the Chicago Half Marathon after coming back from a leg injury',
  'Picking up tennis, very much in the enthusiastic beginner phase',
  'An ocean person at heart, a surfer and a PADI certified diver',
  'A Nintendo fan, with a soft spot for Zelda above all',
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

// Two row photo grid: three across on desktop, so six show at once. Any images
// dropped into the gallery folder fill it in order; until then, six placeholder
// cards keep the shape.
function GalleryGrid() {
  const cards = galleryImages.length ? galleryImages : Array.from({ length: 6 }, () => null)

  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
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
            { label: 'travel photo', src: '/images/funfacts/travel-1.jpg' },
            { label: 'travel photo', src: '/images/funfacts/travel-2.jpg' },
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
            { label: 'trail photo', src: '/images/funfacts/hike-1.jpg' },
            { label: 'trail photo', src: '/images/funfacts/hike-2.jpg' },
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

      {/* Section 3: Hobbies — centered, text only. */}
      <Section bg="white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Of course, we're also welcome to talk about
          </h2>
          <p className="mt-4 text-[#4F4A57]">
            There's always something new I'm trying to get better at,
            <br />
            and just as often something old I keep coming back to.
          </p>
        </div>
        <ul className="mx-auto mt-8 w-fit space-y-4 text-left">
          {hobbies.map((item) => (
            <li key={item} className="flex gap-3 text-ink-secondary md:whitespace-nowrap">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Section 4: The photo gallery — horizontal carousel. */}
      <Section bg="base">
        <h2 className="text-center font-serif text-3xl text-ink md:text-4xl">
          The photo gallery
        </h2>
        <GalleryGrid />
      </Section>
    </>
  )
}
