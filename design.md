# Caldera — Style Reference (Customized)
> Earth & ember on deep charcoal. The canvas is grounded in dark neutral black (#0C0C0C), textured with rich botanic greens (Verdant & Sage), crisp off-white typography, and glowing Coral embers pressed into dark surfaces.

**Theme:** Dark (Default)

Caldera Dark runs on a rich deep Charcoal (`#0C0C0C`) canvas flooded with molten Coral (`#E76F51`) and botanic forest greens. The interface is flat and unshadowed, letting bold characterful typography in crisp Off-White (`#F3F3F3`) carry structural weight. A single vivid Coral acts as the primary action accent against deep dark tones, with Verdant (`#084D08`) reserved for high-contrast standalone cards and hero surfaces, and Sage (`#7DBA6F`) for badges and category tags. The visual language combines bold expressive display letterforms, clean geometric body copy, 40px corner radii on cards and containers, and 800px full-pill controls.

---

## Google Fonts Integration

To load the typography in HTML or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Or in CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Outfit:wght@300;400;500;600;700&display=swap');
```

---

## Tokens — Colors

| Name | Value | Token | Role & Specifications |
|------|-------|-------|------------------------|
| **Coral** | `#E76F51` | `--color-coral` | Primary action buttons, featured stat cards, key visual highlights — RGB `(231, 111, 81)`, HSB `(12, 65%, 91%)`, CMYK `(5, 70, 72, 0)`. The vivid warm chromatic accent. |
| **Verdant** | `#084D08` | `--color-verdant` | Deep forest accent, hero gradient base, high-contrast standalone cards — RGB `(8, 77, 8)`, HSB `(120, 90%, 30%)`, CMYK `(83, 42, 100, 46)`. |
| **Sage** | `#7DBA6F` | `--color-sage` | Tag and category badge backgrounds, secondary accents, highlight washes — RGB `(125, 186, 111)`, HSB `(109, 40%, 73%)`, CMYK `(55, 6, 74, 0)`. |
| **Onyx** | `#002200` | `--color-onyx` | Deep green-black container backgrounds, dark sections, high-contrast card fills — RGB `(0, 34, 0)`, HSB `(120, 100%, 13%)`, CMYK `(77, 54, 80, 76)`. |
| **Text On White** (Charcoal Ink) | `#0C0C0C` | `--color-text-on-white` | Primary text, headings, link text, borders on light backgrounds — RGB `(12, 12, 12)`, HSB `(0, 0%, 5%)`, CMYK `(74, 67, 66, 85)`. |
| **Text On Black** (Off-White) | `#F3F3F3` | `--color-text-on-black` | Light text on dark surfaces, input text, card surfaces on dark sections — RGB `(243, 243, 243)`, HSB `(0, 0%, 95%)`, CMYK `(3, 2, 2, 0)`. |
| **Limestone** (Card Surface) | `#F7F6F2` | `--color-limestone` | Card surfaces, content block backgrounds, secondary button fills. Lifts content cleanly off the canvas. |
| **Pumice** (Canvas) | `#EBEAE5` | `--color-pumice` | Dominant page background — warm light mineral neutral grounding every section without sterile pure white. |

---

## Tokens — Typography

### Hammersmith One Regular — Headings & Display
- **Role:** All headings and display text. A distinctive, broad sans-serif with subtle calligraphic flare and sign-painted charm that gives titles strong presence and editorial personality.
- **Font family:** `'Hammersmith One', sans-serif` · `--font-hammersmith-one`
- **Weights:** 400 (Regular)
- **Sizes:** 26px, 32px, 40px, 48px, 56px, 64px, 80px, 96px, up to 140px–180px
- **Line height:** 0.95–1.15
- **Letter spacing:** Normal to +0.01em (`0.3px` to `1px`)
- **Substitute:** Archivo Black, Syne, Cabinet Grotesk

### Outfit — Body Copy & UI Elements
- **Role:** Body copy, navigation links, button labels, supporting headings up to 24px, and form labels. A clean, balanced geometric sans-serif that complements the expressive display font.
- **Font family:** `'Outfit', sans-serif` · `--font-outfit`
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Sizes:** 14px, 16px, 18px, 20px
- **Line height:** 1.35–1.6
- **Substitute:** Inter, Plus Jakarta Sans, DM Sans

### System Sans-Serif — Microcopy & Meta
- **Role:** Captions, timestamps, dates, micro-labels, tags.
- **Font family:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` · `--font-system-sans-serif`
- **Weights:** 400, 500
- **Sizes:** 12px
- **Line height:** 1.20

### Type Scale

| Role | Size | Line Height | Letter Spacing | Font Family | Token |
|------|------|-------------|----------------|-------------|-------|
| caption | 12px | 1.2 | — | Outfit / System | `--text-caption` |
| body-sm | 15px | 1.3 | — | Outfit (500) | `--text-body-sm` |
| body | 18px | 1.6 | — | Outfit (400/500) | `--text-body` |
| body-lg | 20px | 1.55 | — | Outfit (400/500) | `--text-body-lg` |
| subheading | 26px | 1.2 | — | Hammersmith One | `--text-subheading` |
| heading-sm | 30px | 1.3 | — | Hammersmith One | `--text-heading-sm` |
| heading | 32px | 1.05 | 0.5px | Hammersmith One | `--text-heading` |
| heading-lg | 48px | 1.05 | — | Hammersmith One | `--text-heading-lg` |
| heading-2xl | 80px | 1.05 | — | Hammersmith One | `--text-heading-2xl` |
| heading-3xl | 96px | 0.98 | — | Hammersmith One | `--text-heading-3xl` |
| display | 140px–180px | 0.94 | — | Hammersmith One | `--text-display` |

---

## Tokens — Spacing & Shapes

**Density:** Comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 40px |
| pills (buttons, tags, nav) | 800px |
| inputs | 100px |
| medium | 20px |
| small | 16px |

### Layout Dimensions
- **Page max-width:** 1280px
- **Section gap:** 80px
- **Card padding:** 40px
- **Element gap:** 16px

---

## Components

### Primary CTA Button
- **Role:** Main conversion action
- **Styles:** Filled Coral (`#E76F51`) with Charcoal (`#0C0C0C`) or Off-White (`#F3F3F3`) text.
- **Border radius:** 800px (full pill).
- **Padding:** 14px vertical, 28px horizontal.
- **Typography:** Outfit 500/600 at 16px.
- **Shadow:** None (flat system).

### Secondary Pill Button
- **Role:** Alternative action or paired CTA
- **Styles:** Transparent background, 1.5px Charcoal (`#0C0C0C`) border, Charcoal text.
- **Border radius:** 800px (or 40px).
- **Padding:** 14px vertical, 24px horizontal.
- **Typography:** Outfit 500 at 16px.

### Outlined Ghost Link / Nav Item
- **Role:** Low-emphasis text link or navigation item
- **Styles:** Transparent background, Charcoal text.
- **Border radius:** 800px pill radius.
- **Padding:** 8px vertical, 16px horizontal.
- **Typography:** Outfit 500 at 16px.

### Stat Feature Card
- **Role:** Highlight key metrics (e.g. Years of Experience, Projects Shipped, Clients)
- **Styles:** Coral (`#E76F51`) solid background, Off-White (`#F3F3F3`) or Charcoal (`#0C0C0C`) text.
- **Border radius:** 40px.
- **Padding:** 40px on all sides. No shadow.
- **Typography:** Large metric in Hammersmith One at 80px+; label in Outfit 500 at 14–16px.

### Content Card
- **Role:** Portfolio case studies, articles, work entries
- **Styles:** Limestone (`#F7F6F2`) background, no border, no shadow.
- **Border radius:** 40px.
- **Padding:** 40px all sides.
- **Contains:** Category badge (Sage `#7DBA6F`), headline (Hammersmith One 26–32px in Charcoal `#0C0C0C`), and Outfit body/meta text.

### Standout Feature Card (Verdant / Onyx)
- **Role:** Featured project showcase or standout visual anchor
- **Styles:** Deep Verdant (`#084D08`) or Onyx (`#002200`) background with Off-White (`#F3F3F3`) text and Coral accents.
- **Border radius:** 40px.
- **Padding:** 40px all sides.

### Category Tag Badge
- **Role:** Label project categories, skills, or status tags
- **Styles:** Sage (`#7DBA6F`) background, Charcoal (`#0C0C0C`) text.
- **Border radius:** 800px (full pill).
- **Typography:** Outfit 500/600 at 12–14px.
- **Padding:** 4px–6px vertical, 12px–14px horizontal.

### Navigation Bar
- **Role:** Top-level site navigation
- **Styles:** Floats over Pumice (`#EBEAE5`) background inside a Limestone (`#F7F6F2`) pill container with 800px radius.
- **Items:** Charcoal (`#0C0C0C`) text in Outfit 500 at 16px. CTA button in Coral (`#E76F51`).

### Dark Input Field
- **Role:** Contact form / newsletter input in dark sections
- **Styles:** Transparent background on Onyx (`#002200`), 1.5px Off-White (`#F3F3F3`) border.
- **Border radius:** 100px.
- **Padding:** 18px vertical, 28px horizontal.
- **Text:** Off-White (`#F3F3F3`) in Outfit 500 at 16px.

### Dotted Divider
- **Role:** Section separator and structural accent
- **Styles:** 1.5px dotted line in Charcoal (`#0C0C0C`) or muted green.

---

## Brand Assets & Logos

The OYS Creative visual brand consists of a signature geometric monogram mark and the clean typographic lockup.

### Vector Files & Locations
| File | Path | Description | Recommended Context |
|------|------|-------------|---------------------|
| **Primary Full Logo** | `public/assets/logos/oys-logo-full.svg` | Sage Mark (`#7DBA6F`) + Charcoal Text (`#0C0C0C`) | Light backgrounds (Pumice canvas, Limestone cards, Chalk surfaces) |
| **Light Full Logo** | `public/assets/logos/oys-logo-full-light.svg` | Sage Mark (`#7DBA6F`) + Off-White Text (`#F3F3F3`) | Dark backgrounds (Onyx sections, Verdant feature cards) |
| **Monochrome White** | `public/assets/logos/oys-logo-white.svg` | All-white mark & text (`#FFFFFF`) | High-contrast single-color dark overlays |
| **Icon Mark SVG** | `public/assets/logos/oys-logo-mark.svg` | Standalone Sage geometric mark | Favicon, app icons, mobile collapsed header, social avatars |
| **Full PNG** | `public/assets/logos/oys-logo-full.png` | Raster backup (300×140) | OpenGraph previews, legacy platforms |
| **Mark PNG** | `public/assets/logos/oys-logo-mark.png` | Raster mark (114×102) | App icon, favicons |

*Note: The same files are also mirrored in `src/assets/logos/` for bundler imports (`import logo from '@/assets/logos/...'`).*

### Mark Geometry & Composition
The mark is constructed from four precise geometric elements separated by consistent negative space channels:
1. **Head (Circle):** Radius `17.2px`, centered at `(17.2, 17.2)`.
2. **Torso (Inverted Triangle):** Base width `32px` at `Y=42.5`, apex pointing down at `(17.2, 68.5)`.
3. **Stem (Diagonal Pillar):** Slanted parallelogram base `33px` wide from `(8.5, 101)` up to `(55, 18)`.
4. **Branch (Top-Right Parallelogram):** Horizontal top/bottom edges (`Y=18` to `Y=44`) with angled sides parallel to the stem.

### Rules for Logo Usage
- **Clear Space:** Maintain minimum clear space equal to the diameter of the mark's circle (`34px` relative) around the full logo.
- **Minimum Sizing:**
  - Full Logo: Minimum width `140px` for digital screens.
  - Mark Only: Minimum size `24px × 24px`.
- **Contrast Pairing:** Always use `oys-logo-full.svg` on light surfaces and `oys-logo-full-light.svg` on Onyx or Verdant containers.

---

## Do's and Don'ts

### Do
- Use **Hammersmith One** at 32px or larger for display headings and titles.
- Use **Outfit** (weights 400, 500, 600) for all body copy, UI buttons, and navigation.
- Apply **40px border-radius** to all cards, content blocks, and containers.
- Use **800px border-radius (full pill)** for buttons, tags, badges, and nav containers.
- Maintain flat surfaces with **zero drop shadows** — rely on color contrast (Pumice canvas → Limestone cards → Coral/Verdant features).
- Use **Sage (`#7DBA6F`)** for tags/badges and **Coral (`#E76F51`)** for action highlights.
- Keep dark feature sections in **Onyx (`#002200`)** with **Off-White (`#F3F3F3`)** text.

### Don't
- Do NOT add drop shadows or heavy blur glows — the aesthetic is grounded, tactile, and flat.
- Do NOT use rectangular (sharp 0–4px radius) buttons — pills (800px) and 40px cards are non-negotiable.
- Do NOT introduce uncoordinated neon accents — stay within Coral, Verdant, Sage, Onyx, Charcoal, and Off-White.
- Do NOT use thin weights (< 400) for body text; keep Outfit at 400–500 to balance against bold headings.

---

## Surfaces & Elevation (Dark Mode Default)

| Level | Name | Hex Value | Purpose |
|-------|------|-----------|---------|
| 0 | **Onyx Canvas** | `#002200` | Dominant page background — deep forest dark canvas grounding every view |
| 1 | **Elevated Dark Card** | `#062506` | Standard card surface, container blocks, subtle border `rgba(243, 243, 243, 0.08)` |
| 2 | **Verdant Standout** | `#084D08` | High-contrast showcase cards, hero visual blocks |
| 3 | **Coral Feature** | `#E76F51` | Primary CTA buttons, key stat cards, ember action highlights |
| 4 | **Sage Accent** | `#7DBA6F` | Category pills, skill badges, live status tags |

---

## Quick Start — CSS Custom Properties (Dark Mode)

```css
:root {
  /* Color Tokens */
  --bg-canvas: #002200;              /* Onyx page background */
  --bg-surface: #062506;             /* Elevated dark surface / card */
  --bg-surface-border: rgba(243, 243, 243, 0.08); /* Subtle card separator */
  --color-verdant: #084D08;          /* Rich forest feature accent */
  --color-coral: #E76F51;            /* Primary ember action highlight */
  --color-sage: #7DBA6F;             /* Secondary green badges & tags */
  --color-onyx: #002200;             /* Base dark */
  
  /* Text Tokens */
  --text-primary: #F3F3F3;           /* Primary text / headings (Off-White) */
  --text-muted: rgba(243, 243, 243, 0.72); /* Muted body & meta */
  --text-dark: #0C0C0C;              /* Text on Coral/Sage buttons */

  /* Typography Families */
  --font-display: 'Hammersmith One', sans-serif;
  --font-body: 'Outfit', sans-serif;
  --font-system: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography Scale */
  --text-caption: 12px;
  --text-body-sm: 14px;
  --text-body: 16px;
  --text-body-lg: 18px;
  --text-subheading: 26px;
  --text-heading-sm: 30px;
  --text-heading: 32px;
  --text-heading-lg: 48px;
  --text-heading-2xl: 80px;
  --text-heading-3xl: 96px;
  --text-display: 140px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;

  /* Border Radii */
  --radius-cards: 40px;
  --radius-pills: 800px;
  --radius-inputs: 100px;
  --radius-medium: 20px;
  --radius-small: 16px;

  /* Layout */
  --page-max-width: 1280px;
  --section-gap: 80px;
  --card-padding: 40px;
}
```

---

## Tailwind CSS v4 Theme Configuration

```css
@theme {
  /* Colors */
  --color-canvas: #002200;
  --color-surface: #062506;
  --color-onyx: #002200;
  --color-verdant: #084D08;
  --color-coral: #E76F51;
  --color-sage: #7DBA6F;
  --color-charcoal: #0C0C0C;
  --color-offwhite: #F3F3F3;

  /* Typography */
  --font-display: 'Hammersmith One', sans-serif;
  --font-body: 'Outfit', sans-serif;

  /* Border Radii */
  --radius-card: 40px;
  --radius-pill: 800px;
  --radius-input: 100px;
}
```
