# Consultix Solutions — Mineral Slate & Copper design system
Date: 29 October 2026
Status: review proposal; not live until approved and merged.

## Intent
A premium, contemporary editorial direction suitable for a boutique consultancy spanning financial planning, Revenue Operations, business intelligence, strategic revenue-to-finance work and practical automation. The identity should feel thoughtful, precise and human rather than generic corporate or excessively futuristic.

## Core palette
| Role | Hex | Usage |
|---|---|---|
| Ink / dark background | `#1B2D37` | Primary type, dark hero and major sections |
| Warm ivory | `#F7F5F0` | Main site canvas |
| Mineral blue | `#42647A` | Secondary chart and UI colour |
| Muted copper | `#AC5A42` | Primary CTAs, selected accents and forecast line |
| Mineral mist | `#E6EDED` | Alternating section backgrounds |
| Graphite blue-grey | `#536873` | Secondary body copy |
| Soft slate line | `#D9E0DF` | Borders and quiet dividers |
| Light copper | `#E9A894` | Emphasis on dark backgrounds |
| White | `#FFFFFF` | Cards and text on copper buttons |

Use copper sparingly, with slate and ivory carrying the majority of the experience. Copper must not be the sole cue for an interaction or chart state. White-on-copper buttons, ivory-on-slate headings and light-copper-on-slate labels are intended to meet normal-size text contrast requirements. Copper body copy over ivory is close to the threshold; use deeper `#974A33` for small text on light surfaces.

## Typography
- Keep licensed Manrope for headings and DM Sans for body, UI and numerical labels.
- Reduce desktop hero headline to a cap of **94px**, preserving its three-line editorial structure.
- Use approximately 21px max body text in the hero, a narrower reading measure and improved paragraph leading.
- At small widths scale down gently, without clipping or horizontal overflow; preserve visible focus and readable line lengths.

## Architectural imagery
Keep the existing architectural hero asset. Make it a subtle structural texture by reducing opacity, softening saturation and adding a stronger directional slate overlay. This preserves existing licensed/project imagery without introducing external requests or low-quality stock photographs. If the owner later wants a new background asset, obtain approval and assess the mobile crop before replacing it.

## Page-wide changes
- Hero: richer slate gradient, quieter architecture, smaller heading, legible paragraph and warmer accent details.
- Navigation: translucent ivory scrolled state with copper-accent hover and clear mobile menu.
- Services: airy white canvas, refined separators, soft tags and subtle focus/hover highlighting.
- Business challenge and audience sections: mineral mist backgrounds with dark ink content.
- Revenue-to-Finance & Connected Performance: consistent slate and ivory surfaces, high-contrast interaction states.
- Financial forecast: mineral-tinted controls, warm forecast highlight, consistent line colours, easy-to-read KPI blocks.
- KPI explorer: mineral-tinted input area, restrained bar colours and clear numeric hierarchy.
- Offers/contact: white paper-like cards, slightly softer radii, more deliberate borders and elevated hover feedback.
- Footer: deep dark slate.
- Touch and keyboard: controls remain functional, focus remains visible and reduced motion is respected.

## Implementation boundaries
This is a **CSS-focused redesign**. Do not change the five-practice copy/order, service pricing, calculator formulas, bilingual behaviour, legal/privacy information, Netlify DNS, tracking, contact address, noindex or testimonials. Keep production testimonials empty and hidden. No new fonts, stock images, runtime libraries or external widgets.

## Review checklist
1. Compare hero at desktop widths 1920/1440/1024 and at 768/390/375/320.
2. Verify navigation on dark hero, translucent sticky state and mobile menu.
3. Confirm all five practices, offers and current interactive tools still work in English and German.
4. Check forecast positive/negative data states, graph, controls, CSV and scrolling table.
5. Check focus and pointer states, form inputs and readable contrast across light/dark backgrounds.
6. Check 320px horizontal overflow, clipping, layout jumps and reduced-motion styles.
7. Run `npm run check`, `npm run build`, `npm run test:design`, forecast/metrics/browser/deploy tests.
8. Get owner approval for merging; Netlify deploy-preview success alone is not production publication.

## Codex follow-up
When continuing in Codex, begin from `consultix-mineral-slate-copper-design` and read this file plus `AGENTS.md` and `CODEX-HANDOFF.md`. Prepare bilingual desktop and mobile screenshots and report any discovered problems before proposing a merge.
