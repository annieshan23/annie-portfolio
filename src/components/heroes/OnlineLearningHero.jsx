// Custom hero for the online learning platform project: a compact, on brand
// recreation of the dashboard's overview page (tab row, KPI strip, top courses
// bar chart, and course ratings donut). Hand built SVG, near white background so
// it blends with the page. Also doubles as the overview card thumbnail.
//
// Layout is intentionally narrower and a touch taller than a wide band, so the
// widgets sit close together and it reads as a compact card. Content hugs the
// left so it lines up with the project title above it.
export default function OnlineLearningHero() {
  return (
    <svg width="100%" viewBox="0 0 560 320" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Compact online learning overview dashboard</title>
      <rect x="4" y="4" width="552" height="312" rx="14" fill="#FBFAFE" stroke="rgba(74,63,143,0.1)" />
      {/* Shift all inner content down so the card has generous top and bottom padding. */}
      <g transform="translate(0, 20)">
        <text x="18" y="32" fontFamily="Newsreader,serif" fontSize="17" fontWeight="500" fill="#221E33">
          Overview
        </text>
        <g fontFamily="Inter,sans-serif" fontSize="8.5">
          <rect x="278" y="18" width="52" height="19" rx="5" fill="#4A3F8F" />
          <text x="304" y="31" fill="#fff" textAnchor="middle" fontWeight="500">
            Overview
          </text>
          <rect x="334" y="18" width="58" height="19" rx="5" fill="#EDEAF7" stroke="rgba(74,63,143,0.2)" />
          <text x="363" y="31" fill="#6B6670" textAnchor="middle">
            Engagement
          </text>
          <rect x="396" y="18" width="44" height="19" rx="5" fill="#EDEAF7" stroke="rgba(74,63,143,0.2)" />
          <text x="418" y="31" fill="#6B6670" textAnchor="middle">
            Cohorts
          </text>
          <rect x="444" y="18" width="42" height="19" rx="5" fill="#EDEAF7" stroke="rgba(74,63,143,0.2)" />
          <text x="465" y="31" fill="#6B6670" textAnchor="middle">
            Exams
          </text>
          <rect x="490" y="18" width="48" height="19" rx="5" fill="#EDEAF7" stroke="rgba(74,63,143,0.2)" />
          <text x="514" y="31" fill="#6B6670" textAnchor="middle">
            Learning
          </text>
        </g>
        <rect x="14" y="44" width="524" height="48" rx="9" fill="#fff" stroke="rgba(74,63,143,0.12)" />
        <g fontFamily="Inter,sans-serif">
          <circle cx="48" cy="68" r="13" fill="#ECEAF8" />
          <circle cx="48" cy="64" r="4" fill="#8B7EC8" />
          <path d="M40 74 Q48 67 56 74" fill="#8B7EC8" />
          <text x="72" y="64" fontSize="9" fill="#6B6670">
            Engaged Students
          </text>
          <text x="72" y="82" fontFamily="Newsreader,serif" fontSize="16" fontWeight="500" fill="#4A3F8F">
            19,332
          </text>
          <rect x="210" y="58" width="26" height="24" rx="5" fill="#ECEAF8" />
          <path d="M219 65 L 219 77 L 229 71 Z" fill="#8B7EC8" />
          <text x="250" y="64" fontSize="9" fill="#6B6670">
            Minutes / Student
          </text>
          <text x="250" y="82" fontFamily="Newsreader,serif" fontSize="16" fontWeight="500" fill="#4A3F8F">
            81.40
          </text>
          <rect x="388" y="57" width="23" height="26" rx="4" fill="#ECEAF8" />
          <circle cx="399" cy="78" r="5" fill="#A99BD0" />
          <text x="424" y="64" fontSize="9" fill="#6B6670">
            Certificates Issued
          </text>
          <text x="424" y="82" fontFamily="Newsreader,serif" fontSize="16" fontWeight="500" fill="#4A3F8F">
            3,683
          </text>
        </g>
        <rect x="14" y="102" width="316" height="176" rx="9" fill="#fff" stroke="rgba(74,63,143,0.12)" />
        <text x="30" y="122" fontFamily="Newsreader,serif" fontSize="12" fontWeight="500" fill="#221E33">
          Top courses by minutes watched
        </text>
        <g fontFamily="Inter,sans-serif" fontSize="8.5">
          <text x="30" y="146" fill="#4A463E">
            Intro Data Sci
          </text>
          <rect x="118" y="135" width="200" height="16" rx="3" fill="#4A3F8F" />
          <text x="313" y="147" fill="#fff" textAnchor="end">
            297k
          </text>
          <text x="30" y="170" fill="#4A463E">
            SQL
          </text>
          <rect x="118" y="159" width="145" height="16" rx="3" fill="#6A5DB0" />
          <text x="258" y="171" fill="#fff" textAnchor="end">
            216k
          </text>
          <text x="30" y="194" fill="#4A463E">
            Statistics
          </text>
          <rect x="118" y="183" width="134" height="16" rx="3" fill="#8B7EC8" />
          <text x="247" y="195" fill="#fff" textAnchor="end">
            199k
          </text>
          <text x="30" y="218" fill="#4A463E">
            Intro Excel
          </text>
          <rect x="118" y="207" width="131" height="16" rx="3" fill="#A99BD0" />
          <text x="244" y="219" fill="#4A2F5E" textAnchor="end">
            194k
          </text>
          <text x="30" y="242" fill="#4A463E">
            Python Boot
          </text>
          <rect x="118" y="231" width="102" height="16" rx="3" fill="#C6B9E0" />
          <text x="215" y="243" fill="#4A2F5E" textAnchor="end">
            151k
          </text>
        </g>
        <rect x="338" y="102" width="202" height="176" rx="9" fill="#fff" stroke="rgba(74,63,143,0.12)" />
        <text
          x="439"
          y="122"
          fontFamily="Newsreader,serif"
          fontSize="12"
          fontWeight="500"
          fill="#221E33"
          textAnchor="middle"
        >
          Course Ratings
        </text>
        <g transform="translate(439,188)">
          <circle r="40" fill="none" stroke="#4A3F8F" strokeWidth="18" />
          <circle r="40" fill="none" stroke="#8B7EC8" strokeWidth="18" strokeDasharray="38 252" transform="rotate(-90)" />
          <circle r="40" fill="none" stroke="#A99BD0" strokeWidth="18" strokeDasharray="9 252" transform="rotate(62)" />
          <text y="-3" fontFamily="Inter,sans-serif" fontSize="8" fill="#6B6670" textAnchor="middle">
            Avg
          </text>
          <text y="13" fontFamily="Newsreader,serif" fontSize="16" fontWeight="500" fill="#4A3F8F" textAnchor="middle">
            4.79
          </text>
        </g>
        <g fontFamily="Inter,sans-serif" fontSize="8" fill="#6B6670">
          <rect x="372" y="252" width="7" height="7" rx="2" fill="#4A3F8F" />
          <text x="382" y="258">
            5 star
          </text>
          <rect x="418" y="252" width="7" height="7" rx="2" fill="#8B7EC8" />
          <text x="428" y="258">
            4 star
          </text>
          <rect x="464" y="252" width="7" height="7" rx="2" fill="#A99BD0" />
          <text x="474" y="258">
            3 star
          </text>
        </g>
      </g>
    </svg>
  )
}
