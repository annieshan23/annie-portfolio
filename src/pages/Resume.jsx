import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'

const education = [
  {
    dates: 'Expected Dec 2026',
    degree: 'Master of Integrated Marketing Communications',
    school: 'Northwestern University',
    location: 'Evanston, United States',
  },
  {
    dates: 'Jan 2022 to May 2025',
    degree: 'Bachelor of Science in Media, Culture and Communication',
    school: 'New York University',
    location: 'New York, United States',
  },
]

const experience = [
  {
    dates: 'June 2026 to Now',
    role: 'Data Analytics and UX Graduate Intern',
    company: 'Lenovo',
    location: 'Chicago, US',
    bullets: [
      'Agent orchestrated Python and LLM analytics pipeline',
      'Conducted EDA on 60K+ Lenovo VoC feedback records',
    ],
  },
  {
    dates: 'Feb 2026 to May 2026',
    role: 'Business Analytics Consultant',
    company: 'Hyde Park School of Dance',
    location: 'Chicago, US',
    bullets: [
      'Integrated 4 platforms and 30+ exports data into one source of truth',
      'Built KPI dashboards; surfaced 40% cross selling upside',
    ],
  },
  {
    dates: 'June 2024 to Aug 2024',
    role: 'Media Relations Intern',
    company: 'Antenna',
    location: 'New York, US',
    bullets: [
      'Secured 20+ media placements in national and industry press',
      'Built 15+ outlet ties (Fox News, USA Today), +40% brand visibility',
    ],
  },
  {
    dates: 'July 2023 to Aug 2023',
    role: 'Analytics and Consumer Insights Intern',
    company: 'Ogilvy',
    location: 'Shanghai, China',
    bullets: [
      'Data-driven healthcare campaign that garnered 50K+ impressions via Tableau',
      'A/B tests on ecommerce creative; brand audit across 3 channels',
    ],
  },
  {
    dates: 'Oct 2021 to Dec 2021',
    role: 'Marketing Analytics Intern',
    company: 'Accenture',
    location: 'Shanghai, China',
    bullets: [
      'Social strategy across 4 platforms; +130% UGC growth',
      'Daily social listening on mentions, sentiment, trends',
    ],
  },
]

const leadership = [
  {
    dates: 'Oct 2023 to April 2024',
    role: 'Marketing Director',
    company: 'Trapped in the Flash',
    location: 'New York',
    bullets: [
      'Led 9 person team for an Off Off Broadway show that drew 300+ attendees',
      'Designed omni channel campaign that captured 20K+ views, 4K+ interactions',
    ],
  },
]

const skills = [
  {
    label: 'Languages',
    items: 'Fluent in English and Mandarin, Conversational in Portuguese',
  },
  {
    label: 'Software and Tools',
    items: 'SQL, Tableau, Power BI, Python, R, Advanced Excel, SPSS, Canva',
  },
  {
    label: 'Analytical Skills',
    items: 'EDA, Data Mining, Dashboarding, Database Management, A/B Testing, Machine Learning',
  },
]

const CARD = 'rounded-2xl bg-white p-6'

function SectionHeading({ children }) {
  return <h2 className="mb-6 font-serif text-2xl text-ink">{children}</h2>
}

function EducationCard({ item }) {
  return (
    <div className={CARD}>
      <p className="text-sm text-ink-muted">{item.dates}</p>
      <p className="mt-1 whitespace-nowrap font-serif text-lg text-ink">{item.degree}</p>
      <p className="mt-1 text-[16px] font-semibold" style={{ color: '#9E5730' }}>
        {item.school}
      </p>
      <p className="text-sm text-ink-muted">{item.location}</p>
    </div>
  )
}

function RoleCard({ item }) {
  return (
    <div className={`grid gap-x-8 gap-y-3 ${CARD} md:grid-cols-[0.8fr_1.2fr]`}>
      <div>
        <p className="text-sm text-ink-muted">{item.dates}</p>
        <p className="mt-1 font-serif text-lg text-ink">{item.role}</p>
        <p className="mt-1 text-[16px] font-semibold" style={{ color: '#9E5730' }}>
          {item.company}
        </p>
        <p className="text-sm text-ink-muted">{item.location}</p>
      </div>
      <ul className="space-y-[9px] text-sm">
        {item.bullets.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: '#9E5730' }}
              aria-hidden="true"
            />
            <span style={{ color: '#4F4A57' }}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkillCard({ item }) {
  return (
    <div className={`grid gap-x-8 gap-y-2 ${CARD} md:grid-cols-[0.8fr_1.2fr]`}>
      <p className="font-serif text-lg text-terracotta">{item.label}</p>
      <p className="text-ink-secondary">{item.items}</p>
    </div>
  )
}

export default function Resume() {
  return (
    <Section bg="base" innerClassName="pt-28">
      <h1 className="text-center font-serif text-4xl text-ink md:text-5xl">Resume</h1>

      <div className="mt-12 flex items-start justify-end">
        <Button href="/cv/annie-shan-cv.pdf">Download CV</Button>
      </div>

      <div className="mt-8">
        <SectionHeading>Education</SectionHeading>
        <div className="space-y-5">
          {education.map((item, i) => (
            <EducationCard key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <SectionHeading>Professional Experience</SectionHeading>
        <div className="space-y-5">
          {experience.map((item, i) => (
            <RoleCard key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <SectionHeading>Leadership</SectionHeading>
        <div className="space-y-5">
          {leadership.map((item, i) => (
            <RoleCard key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <SectionHeading>Skill Set</SectionHeading>
        <div className="space-y-5">
          {skills.map((item, i) => (
            <SkillCard key={i} item={item} />
          ))}
        </div>
      </div>
    </Section>
  )
}
