// Custom hero for the Relay retention project: two Kaplan Meier survival curves
// diverging by email engagement. Hand built SVG, near white background to blend
// with the page.
export default function KaplanMeierHero() {
  return (
    <svg width="100%" viewBox="0 0 680 360" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Kaplan Meier survival curves by email engagement</title>
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
      <text
        x="42"
        y="44"
        fontFamily="Inter,sans-serif"
        fontSize="11"
        letterSpacing="3"
        fill="#4A3F8F"
      >
        SURVIVAL ANALYSIS
      </text>
      <text x="40" y="78" fontFamily="Newsreader,serif" fontSize="19" fill="#241F38">
        Email keeps customers alive
      </text>
      <line x1="70" y1="110" x2="70" y2="300" stroke="#C9C3D6" strokeWidth="1" />
      <line x1="70" y1="300" x2="620" y2="300" stroke="#C9C3D6" strokeWidth="1" />
      <g fontFamily="Inter,sans-serif" fill="#9A93A0" fontSize="9.5">
        <text x="44" y="116">100%</text>
        <text x="52" y="208">50%</text>
        <text x="58" y="300">0%</text>
        <text x="58" y="316">day 0</text>
        <text x="620" y="316" textAnchor="end">
          tenure
        </text>
      </g>
      <line x1="70" y1="115" x2="620" y2="115" stroke="#ECEAF3" strokeWidth="0.5" />
      <line x1="70" y1="208" x2="620" y2="208" stroke="#ECEAF3" strokeWidth="0.5" />
      <path
        d="M70 116 L 180 118 L 320 121 L 460 124 L 560 127 L 620 129 L 620 300 L 70 300 Z"
        fill="#4A3F8F"
        opacity="0.05"
      />
      <path
        d="M70 116 L 180 118 L 320 121 L 460 124 L 560 127 L 620 129"
        fill="none"
        stroke="#4A3F8F"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 116 L 110 150 L 150 192 L 200 232 L 260 263 L 330 281 L 420 290 L 520 295 L 620 297"
        fill="none"
        stroke="#C98A98"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="620" cy="129" r="3.5" fill="#4A3F8F" />
      <circle cx="620" cy="297" r="3.5" fill="#C98A98" />
      <g fontFamily="Inter,sans-serif">
        <rect x="408" y="150" width="150" height="40" rx="9" fill="#ECEAF8" />
        <circle cx="426" cy="170" r="4" fill="#4A3F8F" />
        <text x="438" y="167" fontSize="11" fontWeight="500" fill="#3B3270">
          High email
        </text>
        <text x="438" y="181" fontSize="9" fill="#6B5F99">
          stays retained
        </text>
        <rect x="150" y="240" width="150" height="40" rx="9" fill="#F6E7EB" />
        <circle cx="168" cy="260" r="4" fill="#C26C7C" />
        <text x="180" y="257" fontSize="11" fontWeight="500" fill="#7A3E4C">
          Low email
        </text>
        <text x="180" y="271" fontSize="9" fill="#9B6B75">
          churns early
        </text>
      </g>
      <text x="42" y="338" fontFamily="Inter,sans-serif" fontSize="10.5" fill="#9A938A">
        The gap between the curves is the strategy: consistent email keeps customers from churning.
      </text>
    </svg>
  )
}
