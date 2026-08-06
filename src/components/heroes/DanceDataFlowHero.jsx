// Custom hero for the dance nonprofit project: four platforms (ticketing,
// enrollment, donations, historical reference) flowing into one unified
// dashboard. Hand built SVG, background near white to blend with the page.
export default function DanceDataFlowHero() {
  return (
    <svg
      width="100%"
      viewBox="0 0 680 360"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <title>Four platforms flowing into one unified dashboard</title>
      <rect
        x="6"
        y="6"
        width="668"
        height="348"
        rx="18"
        fill="#FBFAFE"
        stroke="rgba(74,63,143,0.12)"
        strokeWidth="1"
      />
      <path
        d="M70 330 C 240 300, 200 70, 470 60"
        fill="none"
        stroke="#4A3F8F"
        strokeWidth="1"
        opacity="0.10"
      />
      <path
        d="M60 60 C 260 90, 230 320, 600 320"
        fill="none"
        stroke="#4A3F8F"
        strokeWidth="1"
        opacity="0.08"
      />
      <text x="42" y="44" fontFamily="Inter,sans-serif" fontSize="11" letterSpacing="3" fill="#4A3F8F">
        DATA ARCHITECTURE
      </text>
      <path
        d="M188 96 C 300 96, 330 168, 452 172"
        fill="none"
        stroke="#C98A98"
        strokeWidth="2.2"
        opacity="0.85"
        strokeLinecap="round"
      />
      <path
        d="M188 152 C 300 152, 350 178, 452 182"
        fill="none"
        stroke="#8FB089"
        strokeWidth="2.2"
        opacity="0.85"
        strokeLinecap="round"
      />
      <path
        d="M188 208 C 300 208, 350 200, 452 196"
        fill="none"
        stroke="#A99BD0"
        strokeWidth="2.2"
        opacity="0.85"
        strokeLinecap="round"
      />
      <path
        d="M188 264 C 300 264, 350 214, 452 206"
        fill="none"
        stroke="#8FA0B4"
        strokeWidth="2.2"
        opacity="0.85"
        strokeLinecap="round"
      />
      <circle cx="322" cy="120" r="2.6" fill="#C98A98" />
      <circle cx="356" cy="165" r="2.6" fill="#8FB089" />
      <circle cx="356" cy="203" r="2.6" fill="#A99BD0" />
      <circle cx="334" cy="238" r="2.6" fill="#8FA0B4" />
      <g fontFamily="Inter,sans-serif">
        <rect x="48" y="76" width="140" height="40" rx="10" fill="#F4DDE1" />
        <circle cx="68" cy="96" r="4" fill="#C26C7C" />
        <text x="84" y="93" fontSize="13" fontWeight="500" fill="#7A3E4C">
          DRT
        </text>
        <text x="84" y="106" fontSize="10" fill="#9B6B75">
          ticketing
        </text>
        <rect x="48" y="132" width="140" height="40" rx="10" fill="#DCEBD7" />
        <circle cx="68" cy="152" r="4" fill="#6F9466" />
        <text x="84" y="149" fontSize="13" fontWeight="500" fill="#3F5A3A">
          iClassPro
        </text>
        <text x="84" y="162" fontSize="10" fill="#5E7A57">
          enrollment
        </text>
        <rect x="48" y="188" width="140" height="40" rx="10" fill="#E7E0F2" />
        <circle cx="68" cy="208" r="4" fill="#8472BC" />
        <text x="84" y="205" fontSize="13" fontWeight="500" fill="#4A3F7A">
          Neon CRM
        </text>
        <text x="84" y="218" fontSize="10" fill="#6B5F99">
          donations
        </text>
        <rect x="48" y="244" width="140" height="40" rx="10" fill="#DEE5EC" />
        <circle cx="68" cy="264" r="4" fill="#6E8298" />
        <text x="84" y="261" fontSize="13" fontWeight="500" fill="#3A4A5A">
          Classbug
        </text>
        <text x="84" y="274" fontSize="10" fill="#5A6A7A">
          historical reference
        </text>
      </g>
      <rect
        x="466"
        y="130"
        width="166"
        height="120"
        rx="14"
        fill="#F3F1FB"
        stroke="rgba(74,63,143,0.28)"
        strokeWidth="0.5"
      />
      <text x="484" y="160" fontFamily="Newsreader,serif" fontSize="16" fill="#2B2640">
        Unified dashboard
      </text>
      <text x="484" y="177" fontFamily="Inter,sans-serif" fontSize="10.5" fill="#6B6670">
        KPIs and growth insights
      </text>
      <rect x="484" y="196" width="18" height="34" rx="3" fill="#C7BFE6" />
      <rect x="508" y="206" width="18" height="24" rx="3" fill="#A99BD0" />
      <rect x="532" y="190" width="18" height="40" rx="3" fill="#4A3F8F" />
      <path
        d="M560 220 L 576 210 L 592 216 L 612 198"
        fill="none"
        stroke="#4A3F8F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="612" cy="198" r="2.5" fill="#4A3F8F" />
      <text x="42" y="328" fontFamily="Inter,sans-serif" fontSize="10.5" fill="#9A938A">
        Four separate systems, no shared key, reconciled into one source of truth.
      </text>
    </svg>
  )
}
