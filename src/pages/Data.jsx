import { useState } from 'react'
import { motion } from 'framer-motion'
import Eyebrow from '../components/Eyebrow.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { heroes } from '../components/heroes/registry.js'
import { dataTabs, dataProjects } from '../data/projects.js'

// Expanded data motif for the header: layered bars, a rising violet trend line
// with a soft fill, data points, and a small rose arc accent.
function DataMotif() {
  return (
    <svg
      viewBox="0 0 260 240"
      width="100%"
      className="max-w-[230px]"
      role="img"
      aria-label="Data motif with bars and a rising trend line"
    >
      <line x1="24" y1="150" x2="244" y2="150" stroke="#E4E0F1" strokeWidth="1" />
      <line x1="24" y1="100" x2="244" y2="100" stroke="#EFEDF7" strokeWidth="1" />
      <rect x="44" y="118" width="26" height="72" rx="3" fill="#CFC7EC" />
      <rect x="90" y="96" width="26" height="94" rx="3" fill="#C0B6E4" />
      <rect x="136" y="110" width="26" height="80" rx="3" fill="#CFC7EC" />
      <rect x="182" y="74" width="26" height="116" rx="3" fill="#B7ABDF" />
      <polygon
        points="57,120 103,96 149,88 195,58 195,190 57,190"
        fill="#4A3F8F"
        opacity=".08"
      />
      <polyline
        points="57,120 103,96 149,88 195,58"
        fill="none"
        stroke="#4A3F8F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="57" cy="120" r="4.5" fill="#4A3F8F" />
      <circle cx="103" cy="96" r="4.5" fill="#4A3F8F" />
      <circle cx="149" cy="88" r="4.5" fill="#4A3F8F" />
      <circle cx="195" cy="58" r="5.5" fill="#4A3F8F" />
      <path
        d="M210 40 a20 20 0 1 1 -14 34"
        fill="none"
        stroke="#C98A98"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Three capability rows shown under the heading in the header band.
export default function Data() {
  const [activeTab, setActiveTab] = useState(dataTabs[0].id)
  const visible = dataProjects.filter((p) => p.tabs.includes(activeTab))

  return (
    <>
      {/* Header band. */}
      <section className="bg-violetTint pt-24">
        <div className="mx-auto max-w-content px-6 pb-8 md:px-8">
          {/* Top row: heading + intro on the left, the motif on the right. */}
          <div className="grid items-center gap-x-10 gap-y-4 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <Eyebrow>data and analytics</Eyebrow>
              <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                Turning questions into decisions
              </h1>
              <p className="mt-4 text-ink-secondary">
                My work spans end to end analytics, turning raw data into decisions
                <br />
                that drive growth and engagement.
              </p>
              <div className="mt-10 h-0.5 w-16 rounded-full bg-violet" aria-hidden="true" />
            </div>
            <div className="flex justify-center md:justify-end">
              <DataMotif />
            </div>
          </div>
        </div>

        {/* Sub tabs. */}
        <div className="border-t border-violet/10">
          <div className="mx-auto flex max-w-content gap-8 px-6 md:px-8">
            {dataTabs.map((tab) => {
              const active = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative py-4 text-left"
                >
                  <span
                    className={`block text-sm font-semibold ${
                      active ? 'text-violet' : 'text-ink-secondary'
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span className="block text-xs text-ink-muted">{tab.tools}</span>
                  {active && (
                    <motion.span
                      layoutId="data-tab-underline"
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-violet"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project cards under the active tab. */}
      <div className="mx-auto max-w-content px-6 pt-24 pb-24 md:px-8">
        <div className="space-y-20">
          {visible.map((project, i) => {
            const Hero = project.detail?.hero ? heroes[project.detail.hero] : null
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCard
                  layout="horizontal"
                  to={`/data/${project.slug}`}
                  tag={project.tag}
                  title={project.title}
                  brief={project.brief}
                  image={project.image}
                  imageLabel={project.imageLabel}
                  thumb={Hero ? <Hero /> : undefined}
                  badge={project.badge}
                  badgeLabel={project.badgeLabel}
                  liveDashboard={project.liveDashboard}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
