import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Primary (solid violet) or outlined button.
// Renders as a react-router Link (to), an anchor (href), or a button (onClick).
// Lifts subtly on hover, per the animation guidance.
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  accent = 'violet',
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors'
  const palette =
    accent === 'terracotta'
      ? {
          solid: 'bg-terracotta text-white hover:bg-terracotta/90',
          outline: 'border border-terracotta/40 text-terracotta hover:bg-terracotta/10',
          // Soft warm fill with bold white text that jumps out.
          soft: 'bg-[#CB8A67] font-bold text-white hover:bg-[#C07E5A]',
        }
      : {
          solid: 'bg-violet text-white hover:bg-violet/90',
          outline: 'border border-violet/40 text-violet hover:bg-chip',
          // Soft violet fill with bold white text that jumps out.
          soft: 'bg-[#7B6FC7] font-bold text-white hover:bg-[#6E62B6]',
        }
  const styles = palette[variant] || palette.solid

  const classes = `${base} ${styles} ${className}`
  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0 },
    transition: { duration: 0.2 },
  }

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} {...rest}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} className={classes} {...motionProps} {...rest}>
      {children}
    </motion.button>
  )
}
