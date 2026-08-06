import { motion } from 'framer-motion'

// Section wrapper that fades and rises into view on scroll.
// bg: 'base' | 'white' | 'violet' | 'cream'  (violet is the light violet tint)
const backgrounds = {
  base: 'bg-base',
  white: 'bg-white',
  violet: 'bg-violetTint',
  cream: 'bg-cream',
}

export default function Section({
  children,
  bg = 'base',
  className = '',
  innerClassName = '',
  id,
}) {
  return (
    <section id={id} className={`${backgrounds[bg] || backgrounds.base} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`mx-auto w-full max-w-content px-6 py-20 md:px-8 ${innerClassName}`}
      >
        {children}
      </motion.div>
    </section>
  )
}
