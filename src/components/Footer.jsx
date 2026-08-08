import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'about' },
  { to: '/resume', label: 'resume' },
  { to: '/data', label: 'data' },
  { to: '/marketing', label: 'marketing' },
  { to: '/funfacts', label: 'OOO' },
]

export default function Footer() {
  return (
    <footer className="border-t border-violet/10 bg-white">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-serif text-lg text-ink">Data-driven storyteller</p>
        </div>
        <ul className="flex flex-wrap gap-5 text-sm text-ink-secondary">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="transition-colors hover:text-violet">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-ink-muted">
          Built by Annie Shan and her Claude
        </p>
      </div>
    </footer>
  )
}
