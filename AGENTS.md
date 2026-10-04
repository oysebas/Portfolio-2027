# Workspace Agent Guidelines — Portfolio 2027

## Project Overview
This repository contains the source code for **Portfolio 2027**. The site is an editorial, high-craft portfolio designed in **Dark Mode** as the default experience, built around an earthy, tactile aesthetic: deep Onyx green-black canvas, rich Verdant and Sage botanicals, glowing Coral embers, and crisp off-white typography.

---

## 🎨 Mandatory Design & Style Compliance
> **CRITICAL RULE**: The site is **DARK MODE BY DEFAULT**. Whenever generating or editing UI components, styling, HTML, CSS, Tailwind classes, or layout structure, you **MUST** strictly follow [`design.md`](./design.md) and [`.agents/rules/design-system.md`](./.agents/rules/design-system.md).

### 1. Typography Hierarchy
- **Display & Headings:** Use **Hammersmith One** (`'Hammersmith One', sans-serif`).
  - Google Fonts: `family=Hammersmith+One`
  - Color: Off-White (`#F3F3F3`) at 26px to 140px+ for structural impact.
- **Body & UI Controls:** Use **Outfit** (`'Outfit', sans-serif`).
  - Google Fonts: `family=Outfit:wght@300;400;500;600;700`
  - Base body font size: **18px** (`--text-body: 18px`).
  - Color: Off-White (`#F3F3F3`) or Muted (`rgba(243, 243, 243, 0.72)`).
  - Always use Medium (500) or SemiBold (600) for buttons and labels; Regular (400) or Medium (500) for body copy.

### 2. Dark Mode Color Palette & Surface Roles
- **Canvas / Page Background (`#0C0C0C`):** Deep charcoal neutral black grounds all views.
- **Card Surfaces (`#062506`):** Elevated dark container surfaces with subtle border `rgba(243, 243, 243, 0.08)`.
- **Coral (`#E76F51`):** Primary action buttons, key CTA highlights, featured stat cards.
- **Verdant (`#084D08`):** Rich deep forest green for standout hero elements and feature cards.
- **Sage (`#7DBA6F`):** Category tags, status pills, secondary badges.
- **Text Primary / Headings (`#F3F3F3`):** Off-White high-contrast text against dark canvas.
- **Text Muted / Meta (`rgba(243, 243, 243, 0.72)`):** Secondary labels and supporting body text.
- **Text on Coral / Sage Buttons (`#0C0C0C` or `#F3F3F3`):** High-contrast text on action fills.

### 3. Surface & Shape Rules
- **No Drop Shadows:** The visual language is strictly flat and tactile. Never apply drop shadows (`shadow-md`, `box-shadow`, etc.). Surface elevation is established purely through color contrast, subtle opacity borders, and generous corner radii.
- **Pill Radius (`800px` / `rounded-full`):** Non-negotiable for all buttons, navigation bars, and category tag badges.
- **Card Radius (`40px`):** Used on all cards, project previews, and container blocks.
- **Input Radius (`100px`):** Used on form inputs.

### 4. Brand Logos & Assets
- Vector SVGs and raster PNGs are stored in `public/assets/logos/` (and mirrored in `src/assets/logos/`).
- **Primary Header Logo:** `public/assets/logos/oys-logo-full-light.svg` (Sage mark + Off-White text — default for dark canvas).
- **Secondary / Inverted Logo:** `public/assets/logos/oys-logo-full.svg` (Sage mark + Charcoal text for rare light card overlays).
- **Mark Only:** `public/assets/logos/oys-logo-mark.svg` (Sage geometric icon for avatars/favicons/mobile).
- **Monochrome White:** `public/assets/logos/oys-logo-white.svg`.

---

## 📁 Folder Structure Conventions
```text
Portfolio 2027/
├── .agents/
│   └── rules/
│       └── design-system.md    # Discovered automatically by Antigravity as a workspace rule
├── AGENTS.md                   # Primary instructions loaded for all agent sessions
├── design.md                   # Complete source-of-truth style reference & design tokens
├── public/
│   └── assets/
│       └── logos/
│           ├── oys-logo-full.svg          # Primary lockup (Dark text)
│           ├── oys-logo-full-light.svg    # Light text lockup for Onyx sections
│           ├── oys-logo-mark.svg          # Standalone geometric mark
│           ├── oys-logo-white.svg         # Monochrome white lockup
│           ├── oys-logo-full.png          # PNG version
│           └── oys-logo-mark.png          # PNG mark
├── src/                        # Application source code
│   ├── assets/
│   │   └── logos/              # Bundled logo assets (mirrored from public)
│   ├── components/             # Reusable UI components (buttons, cards, nav)
│   ├── styles/                 # Global styles, font imports, custom properties
│   └── ...
└── ...
```

---

## 🛠️ Development Guidelines
- Always ensure responsive design (Mobile `< 640px`, Tablet `640px–1024px`, Desktop `> 1024px`).
- Retain semantic HTML (`<main>`, `<nav>`, `<header>`, `<article>`, `<section>`, `<footer>`).
- Keep components modular, accessible (WCAG AA contrast maintained), and clean.
- Use `oys-logo-full.svg` for light navigation headers and `oys-logo-full-light.svg` for dark footers.
- **Punctuation & Editorial Tone (No Em Dashes):** Never use em dashes (`—` or `&mdash;`) in page titles, headings, captions, or body copy. Always use commas (`, `) and/or periods (`. `) instead.

---

## 📸 Mandatory Image Ingestion & Web Color Profile Rule (Zero Washed-Out Images)
> **CRITICAL RULE**: Web browsers natively render images using the **sRGB** color space. Many client and portfolio source files (especially from Illustrator, Photoshop, or InDesign print packages) are exported in **CMYK** (`U.S. Web Coated (SWOP) v2`). If served directly to the browser, CMYK images render as **flat, washed-out, greyed, and desaturated**.
>
> **Every agent handling or adding images MUST follow this workflow:**
> 1. **Inspect Color Space:** Check the image's space using `sips -g space "<image-path>"`.
> 2. **Auto-Normalize CMYK Assets:** If the image is `CMYK` or tagged with a print profile, convert it to standard sRGB:
>    ```bash
>    ./scripts/ensure-srgb.sh "<image-path>"
>    # Or directly via macOS ColorSync:
>    sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" "<image-path>"
>    ```
> 3. **Preserve Pixel Clarity & Dimensions:** Never downsample, crush, or destructively compress user-provided master assets.
> 4. **Mirror to Source:** Always keep `public/assets/...` and `src/assets/...` in sync.

