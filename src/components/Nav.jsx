import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/', label: 'about', end: true },
  { to: '/resume', label: 'resume' },
  { to: '/data', label: 'data' },
  { to: '/marketing', label: 'marketing' },
  { to: '/funfacts', label: 'OOO' },
]

// Top nav. Overlaid and transparent on the landing hero, sticky elsewhere.
// When overlaid, it gains a solid backing once the page is scrolled.
export default function Nav({ overlay = false }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!overlay) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overlay])

  const solid = !overlay || scrolled
  const positioning = overlay ? 'fixed' : 'sticky'
  const shell = solid
    ? 'bg-base/90 backdrop-blur border-b border-violet/10 text-ink'
    : 'bg-transparent text-white'

  return (
    <header className={`${positioning} top-0 left-0 right-0 z-50 transition-colors duration-300 ${shell}`}>
      <nav className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8">
        <NavLink
          to="/"
          className="shrink-0 whitespace-nowrap font-serif text-lg font-medium tracking-tight"
        >
          Annie Shan
        </NavLink>
        {/* On mobile the links stay visible in a single row that can scroll
            sideways if they don't all fit (scrollbar hidden); on md+ they space
            out normally. min-w-0 lets the row shrink inside the flex parent. */}
        <ul className="no-scrollbar flex min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap text-sm sm:gap-5 md:gap-7">
          {links.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative pb-1 transition-opacity hover:opacity-100 ${
                    isActive
                      ? 'opacity-100 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:rounded-full ' +
                        (solid ? 'after:bg-violet' : 'after:bg-white')
                      : 'opacity-70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
