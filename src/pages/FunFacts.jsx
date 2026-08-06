import Section from '../components/Section.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import Placeholder from '../components/Placeholder.jsx'

// Warm, playful, on brand. Developed live during the build.
const facts = [
  { emoji: '☕', text: 'Placeholder fun fact one.' },
  { emoji: '📸', text: 'Placeholder fun fact two.' },
  { emoji: '🎭', text: 'Placeholder fun fact three.' },
  { emoji: '🌆', text: 'Placeholder fun fact four.' },
]

export default function FunFacts() {
  return (
    <Section bg="cream" innerClassName="pt-28">
      <Eyebrow accent="terracotta">off the clock</Eyebrow>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">A few fun facts</h1>
      <p className="mt-4 max-w-xl text-ink-secondary">
        A little about life outside the data. This page grows during the build.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {facts.map((fact, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-2xl border border-terracotta/20 bg-white p-6"
          >
            <span className="text-2xl" aria-hidden="true">
              {fact.emoji}
            </span>
            <p className="text-ink-secondary">{fact.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Placeholder label="candid photo" ratio="aspect-[16/9]" />
      </div>
    </Section>
  )
}
