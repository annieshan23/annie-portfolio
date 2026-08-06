// Custom hero for the TikTok creator emotion project: an honest "faint signal"
// chart. Joy is one clear positive bar, most other features barely move, and
// larger creator tiers dip slightly negative. Self contained SVG (card chrome,
// eyebrow, title, caption drawn inside) so it doubles as the /data card
// thumbnail, matching the other heroes. Violet for the strong positive, lavender
// for weak positives, rose for the negative.
export default function TiktokSignalHero() {
  return (
    <svg width="100%" viewBox="0 0 760 384" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Feature effects on admiration: one clear signal, mostly quiet elsewhere</title>
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
        MACHINE LEARNING
      </text>
      <text x="40" y="78" fontFamily="Newsreader,serif" fontSize="19" fill="#241F38">
        One clear signal, mostly quiet elsewhere
      </text>

      {/* The feature effects chart. The zero line sits at x=330 and labels sit in
          a left gutter ending at x=250, so the negative "larger creators" bar
          (which extends left of zero) clears its own caption. */}
      <g transform="translate(-60, 55) scale(0.86)" fontFamily="Inter,sans-serif">
        <line x1="330" y1="58" x2="330" y2="292" stroke="#D8D2EC" strokeWidth="1.5" />
        <text x="330" y="312" textAnchor="middle" fontSize="12" fill="#B0AAC4">
          0
        </text>
        <text x="580" y="312" textAnchor="middle" fontSize="12.5" fill="#8B84A8">
          effect on admiration
        </text>

        {/* joy: strong positive */}
        <rect x="330" y="76" width="450" height="28" rx="4" fill="#4A3F8F" />
        <text x="250" y="94" textAnchor="end" fontSize="14" fontWeight="600" fill="#4A3F8F">
          joy
        </text>
        <rect x="792" y="78" width="126" height="42" rx="7" fill="#EFEAF7" />
        <text x="802" y="95" fontSize="12" fontWeight="600" fill="#4A3F8F">
          the one clear
        </text>
        <text x="802" y="111" fontSize="12" fill="#6B6670">
          signal
        </text>

        {/* transcript length: small positive */}
        <rect x="330" y="120" width="74" height="22" rx="4" fill="#A99BD0" />
        <text x="250" y="136" textAnchor="end" fontSize="13" fill="#6B6670">
          transcript length
        </text>

        {/* follower count: small positive */}
        <rect x="330" y="156" width="60" height="22" rx="4" fill="#A99BD0" />
        <text x="250" y="172" textAnchor="end" fontSize="13" fill="#6B6670">
          follower count
        </text>

        {/* larger tiers: small negative, extends left of the zero line */}
        <rect x="266" y="192" width="64" height="22" rx="4" fill="#C98A98" />
        <text x="250" y="208" textAnchor="end" fontSize="13" fill="#6B6670">
          larger creators
        </text>

        {/* most other features: near zero, faint */}
        <rect x="330" y="228" width="20" height="22" rx="4" fill="#D9D3EC" />
        <text x="250" y="244" textAnchor="end" fontSize="13" fill="#9A93B8">
          most other features
        </text>
      </g>

      <text x="42" y="348" fontFamily="Inter,sans-serif" fontSize="11" fill="#6B6670">
        Across four models, most video features barely move audience admiration. Joy is the one
      </text>
      <text x="42" y="364" fontFamily="Inter,sans-serif" fontSize="11" fill="#6B6670">
        signal that holds up, and bigger creators tend to earn a little less than small ones.
      </text>
    </svg>
  )
}
