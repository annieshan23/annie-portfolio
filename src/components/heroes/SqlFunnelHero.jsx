// Custom hero for the SQL e-commerce project: the conversion funnel on the left
// and the traffic to revenue flow on the right, joined by a hand drawn divider.
// Hand built SVG, near white background to blend with the page.
export default function SqlFunnelHero() {
  return (
    <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Conversion funnel and traffic to revenue flow</title>
      <rect x="4" y="4" width="672" height="292" rx="16" fill="#FBFAFE" stroke="rgba(74,63,143,0.1)" />
      <text x="34" y="40" fontFamily="Inter,sans-serif" fontSize="10" letterSpacing="2" fill="#4A3F8F">
        THE CONVERSION FUNNEL
      </text>
      <polygon points="40,64 300,64 262,96 78,96" fill="#4A3F8F" opacity="0.92" />
      <polygon points="78,102 262,102 232,134 108,134" fill="#7F77DD" opacity="0.86" />
      <polygon points="108,140 232,140 206,172 134,172" fill="#A99BD0" opacity="0.8" />
      <polygon points="134,178 206,178 182,210 158,210" fill="#C9A7C4" opacity="0.85" />
      <text
        x="170"
        y="84"
        textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontSize="10.5"
        fill="#fff"
        fontWeight="500"
      >
        Sessions
      </text>
      <text
        x="170"
        y="122"
        textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontSize="10.5"
        fill="#fff"
        fontWeight="500"
      >
        Product views
      </text>
      <text
        x="170"
        y="160"
        textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontSize="10"
        fill="#fff"
        fontWeight="500"
      >
        Add to cart
      </text>
      <text
        x="170"
        y="242"
        textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontSize="10.5"
        fill="#4A3F8F"
        fontWeight="500"
      >
        Orders · 2.8%
      </text>
      <line
        x1="170"
        y1="214"
        x2="170"
        y2="230"
        stroke="#C9A7C4"
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />
      <path
        d="M340 34 C 332 90, 348 130, 338 168 C 330 208, 346 240, 340 268"
        fill="none"
        stroke="#C7BFE6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <circle cx="340" cy="150" r="15" fill="#F1EFFA" stroke="#B7AEE4" strokeWidth="1.5" />
      <text
        x="340"
        y="154"
        textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontSize="11"
        fill="#4A3F8F"
        fontWeight="600"
      >
        &amp;
      </text>
      <text x="392" y="40" fontFamily="Inter,sans-serif" fontSize="10" letterSpacing="2" fill="#4A3F8F">
        TRAFFIC TO REVENUE
      </text>
      <g fontFamily="Inter,sans-serif">
        <rect x="392" y="60" width="96" height="30" rx="8" fill="#F4DDE1" stroke="rgba(122,62,76,0.18)" />
        <circle cx="408" cy="75" r="3.5" fill="#C26C7C" />
        <text x="418" y="79" fontSize="10.5" fill="#7A3E4C">
          gsearch
        </text>
        <rect x="392" y="98" width="96" height="30" rx="8" fill="#DCEBD7" stroke="rgba(63,90,58,0.18)" />
        <circle cx="408" cy="113" r="3.5" fill="#6F9466" />
        <text x="418" y="117" fontSize="10.5" fill="#3F5A3A">
          bsearch
        </text>
        <rect x="392" y="136" width="96" height="30" rx="8" fill="#E7E0F2" stroke="rgba(74,63,122,0.18)" />
        <circle cx="408" cy="151" r="3.5" fill="#8472BC" />
        <text x="418" y="155" fontSize="10.5" fill="#4A3F7A">
          direct
        </text>
        <rect x="392" y="174" width="96" height="30" rx="8" fill="#DEE5EC" stroke="rgba(58,74,90,0.18)" />
        <circle cx="408" cy="189" r="3.5" fill="#6E8298" />
        <text x="418" y="193" fontSize="10.5" fill="#3A4A5A">
          organic
        </text>
      </g>
      <path
        d="M488 75 C 540 75, 545 120, 592 128"
        fill="none"
        stroke="#C98A98"
        strokeWidth="2"
        opacity="0.8"
      />
      <path
        d="M488 113 C 540 113, 548 126, 592 132"
        fill="none"
        stroke="#8FB089"
        strokeWidth="2"
        opacity="0.8"
      />
      <path
        d="M488 151 C 540 151, 548 138, 592 138"
        fill="none"
        stroke="#A99BD0"
        strokeWidth="2"
        opacity="0.8"
      />
      <path
        d="M488 189 C 540 189, 548 150, 592 144"
        fill="none"
        stroke="#8FA0B4"
        strokeWidth="2"
        opacity="0.8"
      />
      <rect x="586" y="112" width="66" height="52" rx="10" fill="#F3F1FB" stroke="rgba(74,63,143,0.28)" />
      <text
        x="619"
        y="134"
        textAnchor="middle"
        fontFamily="Newsreader,serif"
        fontSize="12"
        fill="#2B2640"
        fontWeight="500"
      >
        Revenue
      </text>
      <path
        d="M602 148 L 611 142 L 620 146 L 636 136"
        fill="none"
        stroke="#4A3F8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="636" cy="136" r="2" fill="#4A3F8F" />
      <text x="392" y="234" fontFamily="Inter,sans-serif" fontSize="10" fill="#9089A0">
        Which channels actually pay off, not just draw clicks.
      </text>
    </svg>
  )
}
