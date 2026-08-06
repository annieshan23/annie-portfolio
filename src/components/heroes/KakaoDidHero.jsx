// Custom hero for the Kakao / Anipang causal inference project: a difference in
// differences divergence chart. Matched adopters and controls run parallel
// before the release marker, then the adopter line jumps while the matched
// control drifts up mildly; the remaining gap is the spillover. Self contained
// SVG (card chrome, eyebrow, title, caption drawn inside) so it doubles as the
// /data card thumbnail, matching the other heroes. Violet for adopters, rose for
// the matched control, dashed violet for the counterfactual.
export default function KakaoDidHero() {
  return (
    <svg width="100%" viewBox="0 0 760 384" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Difference in differences: adoption lifts engagement unevenly</title>
      <rect
        x="6"
        y="6"
        width="748"
        height="372"
        rx="18"
        fill="#F7F5FC"
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
        CAUSAL INFERENCE
      </text>
      <text x="40" y="78" fontFamily="Newsreader,serif" fontSize="19" fill="#241F38">
        Adoption lifts engagement, and not evenly
      </text>

      {/* The provided divergence chart, coordinates verbatim, placed and scaled
          to fit the card. */}
      <g transform="translate(-22, 80) scale(0.8)" fontFamily="Inter,sans-serif">
        <line x1="120" y1="40" x2="120" y2="270" stroke="#D8D2EC" strokeWidth="1.5" />
        <line x1="120" y1="270" x2="820" y2="270" stroke="#D8D2EC" strokeWidth="1.5" />
        <line
          x1="470"
          y1="55"
          x2="470"
          y2="270"
          stroke="#B9B1DA"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
        <text x="470" y="46" textAnchor="middle" fontSize="12.5" fill="#8B84A8">
          Anipang release
        </text>

        <polyline points="200,205 470,190 740,168" fill="none" stroke="#C98A98" strokeWidth="3" />
        <circle cx="200" cy="205" r="5" fill="#C98A98" />
        <circle cx="470" cy="190" r="5" fill="#C98A98" />
        <circle cx="740" cy="168" r="5" fill="#C98A98" />

        <polyline
          points="470,196 740,174"
          fill="none"
          stroke="#4A3F8F"
          strokeWidth="2"
          strokeDasharray="4 5"
          opacity="0.5"
        />

        <polyline
          points="200,211 470,196 740,96"
          fill="none"
          stroke="#4A3F8F"
          strokeWidth="3.5"
        />
        <circle cx="200" cy="211" r="5" fill="#4A3F8F" />
        <circle cx="470" cy="196" r="5" fill="#4A3F8F" />
        <circle cx="740" cy="96" r="6" fill="#4A3F8F" />

        <line
          x1="740"
          y1="96"
          x2="740"
          y2="174"
          stroke="#7E5C9E"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <rect x="748" y="112" width="150" height="46" rx="7" fill="#EFEAF7" />
        <text x="758" y="130" fontSize="12.5" fontWeight="600" fill="#4A3F8F">
          the spillover
        </text>
        <text x="758" y="147" fontSize="12" fill="#6B6670">
          effect on engagement
        </text>

        <text x="150" y="222" fontSize="13" fill="#4A3F8F" fontWeight="600">
          adopters
        </text>
        <text x="150" y="197" fontSize="13" fill="#C98A98" fontWeight="600">
          matched control
        </text>

        <text x="200" y="292" textAnchor="middle" fontSize="12.5" fill="#8B84A8">
          week before
        </text>
        <text x="740" y="292" textAnchor="middle" fontSize="12.5" fill="#8B84A8">
          week after
        </text>
        <text x="108" y="60" textAnchor="end" fontSize="12" fill="#B0AAC4">
          more
        </text>
        <text x="108" y="266" textAnchor="end" fontSize="12" fill="#B0AAC4">
          less
        </text>
      </g>

      <text x="42" y="350" fontFamily="Inter,sans-serif" fontSize="11" fill="#6B6670">
        Matched adopters and controls move together before the release, then diverge after. The gap
      </text>
      <text x="42" y="366" fontFamily="Inter,sans-serif" fontSize="11" fill="#6B6670">
        that remains, once shared time trends are removed, tracks adopting Anipang.
      </text>
    </svg>
  )
}
