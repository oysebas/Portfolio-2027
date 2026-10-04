# Design System Rule — Portfolio 2027 (Dark Mode Default)

This workspace enforces strict design consistency based on [`design.md`](../../design.md). The site is **Dark Mode by default**.

## Core Directives for Agent Code Generation:
1. **Default Theme & Surfaces:**
   - Canvas/Body Background: Deep Charcoal (`#0C0C0C`)
   - Card Surfaces: Elevated dark (`#141414`) with subtle border `rgba(243, 243, 243, 0.08)`
   - Feature Containers: Verdant (`#084D08`)
2. **Typography & Text Colors:**
   - Display/Headings: `'Hammersmith One', sans-serif` in Off-White (`#F3F3F3`)
   - Body/UI/Buttons: `'Outfit', sans-serif` at 18px base (`--text-body: 18px`) in Off-White (`#F3F3F3`) or Muted (`rgba(243, 243, 243, 0.72)`)
   - Embed URL: `https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Outfit:wght@300;400;500;600;700&display=swap`
3. **Palette & Accents:**
   - Primary Action / CTA Accent: Coral (`#E76F51`)
   - Feature Surface / Secondary: Verdant (`#084D08`)
   - Tags & Badges: Sage (`#7DBA6F`) with dark or light text
   - Base Dark: Deep Charcoal (`#0C0C0C`)
4. **Geometry & Tactile Rules:**
   - Always 0px drop shadow (completely flat aesthetic).
   - 800px full pill radius for buttons, tags, and nav containers.
   - 40px radius for cards and major containers.
   - 100px radius for form inputs.
5. **Logos & Brand Identity:**
   - Default Header Logo: `public/assets/logos/oys-logo-full-light.svg` (Sage mark + Off-White text)
   - Inverted / Light Surface Logo: `public/assets/logos/oys-logo-full.svg`
   - Standalone Icon SVG: `public/assets/logos/oys-logo-mark.svg`
   - Never alter the Sage green (`#7DBA6F`) color of the geometric mark.
6. **Image Color Space & Ingestion (Never Washed Out):**
   - Web browsers require **sRGB** (`sRGB IEC61966-2.1`).
   - CMYK print images (`U.S. Web Coated SWOP`) render washed-out and grey in browsers.
   - All newly ingested images must be verified via `sips -g space` and auto-converted to sRGB using `./scripts/ensure-srgb.sh` or `sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc"`.
   - Never apply destructive compression or downsampling. Always mirror `public/` to `src/`.
7. **Punctuation & Editorial Tone (No Em Dashes):**
   - Do NOT use em dashes (`—` or `&mdash;`) in titles, headings, descriptions, or body copy.
   - Always use commas (`, `) and/or periods (`. `) instead.



