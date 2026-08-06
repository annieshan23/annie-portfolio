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
    summary:
      "On Lenovo's Data and UX team, I work on an agent orchestrated pipeline that pairs deterministic Python with LLM reasoning to streamline analytics. Alongside it, we run voice of customer EDA on 60K+ feedback records to surface recurring product patterns.",
  },
  {
    dates: 'Feb 2026 to May 2026',
    role: 'Business Analytics Consultant',
    company: 'Hyde Park School of Dance',
    location: 'Chicago, US',
    summary:
      'Consolidated data from 4 platforms into a single source of truth, then built enrollment dashboards tracking KPIs like retention and tenure. The analysis surfaced acquisition gaps across 15+ dance programs and lifted 40% in cross selling opportunities.',
  },
  {
    dates: 'June 2024 to Aug 2024',
    role: 'Media Relations Intern',
    company: 'Antenna',
    location: 'New York, US',
    summary:
      'Over 3 months at Antenna, I managed campaign dashboards and secured 20+ placements across national and industry publications. Relationships built with 15+ outlets including Fox News and USA Today lifted client visibility by 40%.',
  },
  {
    dates: 'July 2023 to Aug 2023',
    role: 'Analytics and Consumer Insights Intern',
    company: 'Ogilvy',
    location: 'Shanghai, China',
    summary:
      'My proudest work at Ogilvy was a data-driven healthcare campaign, with Tableau consumer insight dashboards that drove 50K+ impressions post launch. It also spanned A/B tests on ecommerce creative and a brand audit across three channels.',
  },
  {
    dates: 'Oct 2021 to Dec 2021',
    role: 'Marketing Analytics Intern',
    company: 'Accenture',
    location: 'Shanghai, China',
    summary:
      'At Accenture, I was in charge of social campaign performance across platforms that surfaced a strategy that drove roughly 130% growth in UGC. Also conducted daily social listening reports that tracked brand mentions and trends for brand health monitoring.',
  },
]

const leadership = [
  {
    dates: 'Oct 2023 to April 2024',
    role: 'Marketing Director',
    company: 'Trapped in the Flash',
    location: 'New York',
    summary:
      'Leading a 9 person team, I marketed an Off Off Broadway production that drew 300+ attendees, owning the content calendar and weekly execution. Our omni channel campaign strategy reached 20K+ views and 4K+ interactions across four social sites.',
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
      <p className="text-sm text-ink-secondary">{item.summary}</p>
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
