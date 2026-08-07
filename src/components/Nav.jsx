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
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-8">
        <NavLink to="/" className="font-serif text-lg font-medium tracking-tight">
          Annie Shan
        </NavLink>
        <ul className="flex items-center gap-5 text-sm md:gap-7">
          {links.map((link) => (
            <li key={link.to}>
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
