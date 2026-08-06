// Design tokens — the single source of truth for color.
// Change a value here and it updates across Tailwind and any inline SVG usage.
// (Fonts are declared in tailwind.config.js and loaded in index.html.)

export const colors = {
  // Page and section backgrounds
  base: '#FBFAF7', // warm off white page background
  white: '#FFFFFF', // white sections
  violetTint: '#F5F3FB', // very light violet section tint
  cream: '#FBF7F1', // warm cream, marketing sections only

  // Accents
  violet: '#4A3F8F', // primary accent, used site wide
  terracotta: '#B06A45', // secondary accent, marketing section only

  // Text
  ink: '#221E33', // primary text
  inkSecondary: '#4F4A57', // secondary text
  muted: '#6B6670', // muted text
  muted2: '#7A7486', // muted text, alternate

  // Chips and borders
  chip: '#ECEAF8', // light violet chip fill
  violetBorder: 'rgba(74, 63, 143, 0.2)', // violet border baseline

  // Badges
  ndaBg: '#FBF3E2', // NDA gold badge background
  ndaText: '#8A6E3A', // NDA gold badge text
  publicBg: '#E3F2EA', // public dataset green badge background
  publicText: '#3F6E56', // public dataset green badge text

  // Data source colors (used by the data flow hero)
  source: {
    rose: '#C98A98',
    sage: '#8FB089',
    lavender: '#A99BD0',
    slate: '#8FA0B4',
  },
}

// Convenience helper for violet borders at a chosen opacity (0.15 to 0.3).
export const violetBorder = (opacity = 0.2) => `rgba(74, 63, 143, ${opacity})`
