import { motion } from 'framer-motion'
import Button from './Button.jsx'
import SmartImage from './SmartImage.jsx'

// PRESERVED original landing name card (single violet frame, grey status,
// three bullets). Kept as a clean rollback for the double-frame redesign.
// Not currently rendered; to revert, drop this back into Landing.jsx section 2
// in place of the new <NameCard/>.
export default function NameCardOld() {
  return (
    <div className="relative z-20 mx-auto -mt-[120px] max-w-content px-6 sm:-mt-[136px] lg:-mt-40 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
        className="rounded-2xl border border-violet/15 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(74,63,143,0.4)] md:p-8"
      >
        {/* Name header across the top of the card. */}
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-serif text-2xl text-ink">Annie (Xinhui) Shan</h2>
          <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
          <span className="text-sm text-ink-muted">based in chicago · open to work</span>
        </div>

        {/* Headshot on the left, bullets and buttons top-aligned beside it. */}
        <div className="mt-5 grid gap-6 md:grid-cols-[auto_1fr] md:items-start md:gap-8">
          <div className="w-32 shrink-0">
            <SmartImage
              src="/images/headshot.jpg"
              alt="Annie Shan"
              label="headshot"
              ratio="aspect-square"
              rounded="rounded-2xl"
            />
          </div>
          <div>
            <ul className="max-w-xl space-y-1 text-sm leading-snug text-ink-secondary">
              {[
                'A marketing and business analyst who bridges narrative and numbers',
                'A problem solver who finds clarity and scalable solutions in complex situations',
                'A lifelong learner and adventurer',
              ].map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
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
    </div>
  )
}
