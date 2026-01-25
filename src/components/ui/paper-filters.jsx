/**
 * PaperFilters - SVG filter definitions for papercraft edge and texture effects
 *
 * Render once at app root. Filters can be used via CSS:
 * - .edge-deckled { filter: url(#edge-deckled); }
 * - .edge-torn { filter: url(#edge-torn); }
 */

export function PaperFilters() {
  return (
    <svg
      className="paper-filters"
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* ========================================
            EDGE FILTERS
            ======================================== */}

        {/* Deckled: Subtle, premium feel */}
        <filter id="edge-deckled" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            seed="1"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Handmade: Medium organic edge */}
        <filter id="edge-handmade" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="4"
            seed="42"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Torn: Visible, dramatic edge */}
        <filter id="edge-torn" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="5"
            seed="15"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Torn Dramatic: Maximum displacement */}
        <filter id="edge-torn-dramatic" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="6"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ========================================
            TEXTURE FILTERS (Optional Use)
            ======================================== */}

        {/* Bond Paper: Very smooth, nearly invisible */}
        <filter id="texture-bond">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>

        {/* Cotton Rag: Medium organic texture */}
        <filter id="texture-cotton">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.4"
            numOctaves="5"
            stitchTiles="stitch"
          />
        </filter>

        {/* Kraft Paper: Coarse, visible grain */}
        <filter id="texture-kraft">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.25"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>

        {/* Watercolor: Heavy tooth texture */}
        <filter id="texture-watercolor">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.15"
            numOctaves="6"
            stitchTiles="stitch"
          />
        </filter>

        {/* Paper Texture with Lighting (for bump effect) */}
        <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feDiffuseLighting
            in="noise"
            lightingColor="#ffffff"
            surfaceScale="2"
            result="lit"
          >
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
        </filter>
      </defs>
    </svg>
  );
}

export default PaperFilters;
