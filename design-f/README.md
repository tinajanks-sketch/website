# Version F refined — architecture and qualification imagery

The owner liked F and asked for a more modern, less generic refinement, pictures
for the qualifications and the original architectural imagery in the opening.
This review branch builds on F (`a74cf1f`) and retains the CTA-reduced production
base (`578947a`). It has not been deployed over the live website.

## Visual refinement

- Retain Geist, the cool near-white canvas, dark sections and original orange CTA.
  The Consultix logo and favicon are unchanged.
- Use a calmer black headline with less compressed tracking. Remove the grey
  second-line treatment and redundant decorative service/offer counters.
- Add the original `assets/architecture.svg` as a wide cropped image below the
  opening text. It is the existing architectural illustration, not a new stock
  photograph. Its angular façades carry the same geometry as the Consultix mark.
- Move the conceptual business diagram after the offers. Its three perspectives
  still work, while the opening contains one prominent visual idea.
- Keep the horizontal service gallery, its single useful position indicator,
  keyboard controls and all five service descriptions/deliverables.
- Use plainer offer headings and keep the business-type selector, About and direct
  email contact. There are no per-service enquiry links or new conversion buttons.
- Add four qualification pictures in a horizontal image rail. These are the
  existing subject illustrations, with exact qualification names and issuer
  captions. A visible note distinguishes illustrations from the credential itself.
  They are not official issuer badges or certificate scans. See `IMAGE-SOURCES.md`.
- The qualification rail supports touch, scrolling, Tab, ArrowLeft/Right and
  Home/End without adding more button clutter. It does not autoplay.

## Palette and fonts

| Role | Value |
| --- | --- |
| Near-white canvas | `#F8F9F5` |
| Near-black | `#171C18` |
| Secondary text | `#586158` |
| Dividers | `#D3D9D0` |
| Pale section background | `#E8EDE4` |
| Orange CTA | `#F47758` |
| Hover orange | `#FFA080` |

Geist is the new heading font. DM Sans remains the body font and Manrope is retained
for the original wordmark. All fonts are embedded, with their licences in the
build. No runtime dependency, font service, tracking or external asset is added.

The owner-selected orange/white CTA remains a documented text-contrast exception:
approximately 2.75:1 normally and 1.98:1 on hover. This exact pairing does not pass
AA. Automated checks exempt only that pairing on `.cta`; other findings still fail.

## Copy and feature boundaries

English and German use the existing shared `content.js` for all five services,
deliverables, offers, client types, About, qualification names and contact details.
The conceptual diagram, image descriptions and a few headings have concise bilingual copy local to F.
There are no new financial projections, client statistics, partner badges or
testimonials. The qualification wording is owner supplied; no independent
verification or company partner status is implied.

This is a design review prototype, as with E. It does not replace the production
challenge guide, accounting flow, KPI calculator, full enquiry form, complete
offer detail or legal/privacy presentation. Those existing features remain in the
unchanged production source and would be integrated when a direction is chosen.
Do not point Netlify's production publish folder at this preview.

## Build and preview

From the repository root:

```sh
node design-f/build.cjs
```

Open `design-f/dist/index.html` for English or `design-f/dist/de/index.html` for
German. Each file embeds its own styles, artwork, fonts and scripts. Language
links stay within the prototype. Email opens the visitor's mail app.

The builder writes only to `design-f/dist`. Root `npm run build`, production
`dist`, Netlify configuration, domain/email settings and noindex are unchanged.

## Verification completed

- All 494 independent refined-F checks pass across EN/DE at 320, 390, 768, 1024,
  1440 and 1920px: fonts, language paths, mobile menu/Escape/focus, map perspectives,
  service-gallery buttons/keyboard/bounds/status, business types, reduced CTAs,
  document order, images/captions, qualification-rail keyboard/focus and no-JS access.
- No page overflow, browser exceptions or external requests were found.
- Four axe scans (EN/DE, 390/1440px) pass apart from the documented exact
  orange/white CTA choice. No unrelated contrast finding is disabled.
- The original hero SVG is embedded unmodified. All four subject illustrations
  load, preserve their aspect ratio and retain readable qualification/issuer text.
- Screenshots include the hero, full page, services, offers, audiences and
  qualifications in both languages at 390 and 1440px and were visually reviewed.
- Production source comparison shows no change to main HTML/CSS, shared
  copy/app/calculations, build/server, Netlify configuration or favicon.
- The existing shared suites and production browser result are recorded in the
  review artifacts; the prototype does not modify the financial calculations.

Browser tools are outside the repository at `/tmp/consultix-f-tools`. The independent
QA helper is `/tmp/consultix-f-refined-qa.cjs`. Reports, screenshots, standalone
previews and the before/after comparison are under
`/workspace/exports/consultix-version-f-refined-2026-10-31/`.
