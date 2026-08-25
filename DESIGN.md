# Design Aesthetic — manjilshrestha.online

A one-page reference for the visual language used across the site, pulled directly from `style.css`.

## Overview

**Dark, editorial "digital ID card" aesthetic** — a fixed sidebar profile card next to a tabbed content pane, on a near-black canvas lit by soft floating violet gradient blobs. Think "developer portfolio template" energy (frosted cards, monospace-adjacent geometric sans, ion-icon line icons) reskinned in a single confident accent color instead of the usual blue/green. Content is organized as distinct floating panels rather than one continuous page — every section is its own rounded, bordered card sitting on the dark backdrop, so the eye reads the page as a stack of physical cards rather than flowing text.

## Color Palette

Everything is HSL-based and shares the same violet hue family (~258–291°), which is what makes the whole palette feel cohesive even though it spans backgrounds, borders, and accents.

| Token | Value | Used for |
|---|---|---|
| `--smoky-black` | `hsl(261, 25%, 6%)` | Page background |
| `--eerie-black-1/2` | `hsl(260, 12–13%, 12–13%)` | Card backgrounds |
| `--onyx` | `hsl(262, 10%, 18%)` | Pills, subtle fills |
| `--jet` | `hsl(262, 8%, 23%)` | Borders, dividers, skill-tag pills |
| `--violet-crayola` | `hsl(266, 91%, 73%)` | **Primary accent** — links, active states, icons, progress fill |
| `--royal-purple` | `hsl(280, 60%, 68%)` | Secondary accent — timeline dates |
| `--text-gradient-violet` | `hsl(266,91%,73%) → hsl(291,70%,66%)` | Underlines, avatar rings, progress bars, star ratings |
| `--white-1/2` | near-white | Headings |
| `--light-gray` / `-70` | `hsl(258, 12%, 85%)` | Body text |
| `--bittersweet-shimmer` | `hsl(0, 43%, 51%)` | Error/invalid states only |

No pure grays or blacks — every neutral is tinted ~260° violet, which is why the dark surfaces feel warm/purple rather than flat charcoal.

## Typography

- **Typeface:** Poppins (Google Fonts), weights 300/400/500/600 — a geometric, rounded-terminal sans that reads friendly rather than corporate.
- **Scale:** fluid via CSS custom properties, jumping from a mobile scale (`--fs-1: 24px` down to `--fs-8: 11px`) to a larger desktop scale at the 580px breakpoint (`--fs-1: 32px`, etc.) — not a `clamp()`-based fluid scale, but discrete breakpoint steps.
- **Headings** are native `<h2>`–`<h5>`, left bold by browser default (no explicit `font-weight` overrides), always `text-transform: capitalize`.
- **Section titles** get a signature treatment: a short 30–40px gradient bar (`--text-gradient-violet`) sitting directly under the heading as an underline accent, instead of a border or divider line.

## Layout System

- **Structure:** persistent left sidebar (photo, name, title pill, contact list, socials) + a tabbed content pane (About / Resume / Projects / Contact) that swaps via JS `display` toggling, not page navigation — an SPA-style single-file experience.
- **Responsive behavior:** mobile stacks sidebar above content with a bottom tab bar; ≥1024px the sidebar becomes `position: sticky` alongside the content in a flex row; ≥1250px the whole layout centers with a `max-width: 1200px` container.
- **Cards everywhere:** almost every visual block — the sidebar, each page article, service items, skill category cards, project tiles, testimonial cards — shares one recurring shape language: `border-radius` 14–20px, a 1px hairline border, and a soft drop shadow (`--shadow-1` through `--shadow-5`, all pure black at low opacity, no color tinting).
- **The "gradient border" trick:** most cards aren't solid-filled. They use a gradient background (`--border-gradient-onyx`) with a `::before` pseudo-element inset by 1px filled with a darker gradient (`--bg-gradient-jet`) — this fakes a subtle glowing gradient border/edge-light effect without an actual `border-image`.

## Motion & Interaction

- **Timing:** two transition speeds only — `0.25s ease` for hovers/toggles, `0.5s ease-in-out` for larger state changes. Nothing bouncy or spring-based; everything eases smoothly.
- **Page/tab transitions:** content fades in (`opacity 0→1`, 0.5s) when a tab becomes active; project cards scale in from 0.5→1 on filter.
- **Hover language:** cards lift slightly (`translateY(-3px)`) and their shadow deepens; buttons and pills swap their gradient border for the violet accent gradient; project thumbnails zoom 1.1x under a darkening overlay with a centered "eye" icon.
- **Skill bars:** animate from 0 → target width on scroll-into-view via `IntersectionObserver`, staggered 150ms apart, `1.4s cubic-bezier(0.65,0,0.35,1)` — the one deliberately choreographed moment on the page.
- **Ambient background:** three large, softly blurred (90px) violet/indigo radial gradient "blobs" drift slowly and continuously (24–32s loops) behind the content via CSS `@keyframes`, plus a near-invisible SVG noise-grain overlay for texture. Respects `prefers-reduced-motion`.

## Iconography & Imagery

- **Icons:** [Ionicons](https://ionic.io/ionicons) outline set exclusively — thin-stroke, rounded, monochrome (always tinted the violet accent). No filled icons, no multi-color icon sets.
- **Photography:** a single black-and-white portrait as the identity anchor, framed in a rounded-square avatar box.
- **Project art:** in place of real screenshots, custom flat SVG "banner" placeholders — a dark violet gradient field, a thin ringed circle, a simple two-tone line icon, and centered Poppins title/subtitle text. Keeps the same restrained, single-accent-color illustration style as the rest of the UI rather than introducing photography or multi-color graphics.

## Personality Summary

If this design were a sentence: **confident, quiet-dark, single-accent-color minimalism with just enough motion to feel alive** — a portfolio that behaves more like a product/app UI (cards, pills, tabs, icon language) than a traditional scrolling brochure site.
