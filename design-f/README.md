# Version F — modern consulting studio

The owner liked Version E and requested a new, more modern alternative. F is a
separate design prototype based on the current CTA-reduced `main` (`578947a`).
It has not been merged into production or deployed over the live website.

## Visual direction

- Geist sans-serif typography, a cool near-white canvas, near-black service/contact
  bands and the existing orange accent. The Consultix logo and favicon are retained.
- An offset hero: a small context column beside the headline, supporting copy below,
  and a broad conceptual diagram underneath. No serif, stock photograph, gradient,
  glass panel or architecture backdrop.
- A compact diagram explaining the revenue, operating and financial perspectives.
  Its three controls reveal different questions and information handoffs. It is
  explicitly conceptual; bookings, recognised revenue and cash remain distinct.
- A horizontal, swipeable service gallery rather than a five-card grid or repeated
  accordion index. Buttons, ArrowLeft/Right and Home/End work; the gallery does not
  autoplay. All five services and their current deliverables remain in the HTML.
- One paid review feature, two compact project/support descriptions, a business-type
  selector, a text-led qualifications area and a direct email ending.
- One prominent orange CTA in the hero. The desktop header and final email remain
  available; no per-service or per-project conversion links are added.

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
The conceptual diagram and a few headings have concise bilingual copy local to F.
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

- All 338 independent F checks pass across EN/DE at 320, 390, 768, 1024, 1440 and
  1920px: font loading, language paths, mobile menu/Escape/focus, all diagram
  perspectives, gallery buttons/keyboard/bounds/status, all business types,
  no-JavaScript access, no overflow, no browser exceptions or external requests.
- Four axe scans (EN/DE, 390/1440px) pass apart from the documented exact
  orange/white CTA choice. No unrelated contrast rule is disabled.
- Screenshots of the hero, full page, service gallery, offers and business types
  were captured in both languages at 390 and 1440px and visually reviewed.
- German mobile headings are sized to keep long words intact without clipping.
- Production source comparison shows no changes to the main HTML/CSS, shared
  content/app/calculations, build/server, Netlify configuration or favicon.
- Existing syntax and 17 positioning/design/layout tests pass, as do the 14
  archived-forecast tests, 11 KPI tests and 3 deployment-helper tests. The main
  site's browser result is reported separately in the review artifacts.

Browser tools were installed outside the repository at `/tmp/consultix-f-tools`.
The independent QA helper is `/tmp/consultix-f-qa.cjs`; its actual report and
screenshots are in `/workspace/exports/consultix-version-f-2026-10-31/`.
