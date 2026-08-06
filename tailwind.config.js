import { colors } from './src/styles/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: colors.base,
        violetTint: colors.violetTint,
        cream: colors.cream,
        violet: colors.violet,
        terracotta: colors.terracotta,
        ink: {
          DEFAULT: colors.ink,
          secondary: colors.inkSecondary,
          muted: colors.muted,
          muted2: colors.muted2,
        },
        chip: colors.chip,
        nda: {
          bg: colors.ndaBg,
          text: colors.ndaText,
        },
        dataset: {
          bg: colors.publicBg,
          text: colors.publicText,
        },
        source: colors.source,
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.16em',
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
}
