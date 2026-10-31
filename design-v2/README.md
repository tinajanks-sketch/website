# Consultix Solutions — Version 2

**Swiss architectural / asymmetric bento. Comparison design only.**

Version 1 was approved and pushed to production `main` at
`1a8a33adb6f827ad13f002a7fe3ae465484b6987` on 31 October 2026. The live-site fetch
was blocked by the environment proxy, so final Netlify deployment completion was
not independently confirmed. This Version 2 does not replace it.

## Design direction

A light editorial hero, a restrained architectural service index and asymmetric
service panels give the site a different hierarchy without rewriting the offer.
The existing Consultix mark and favicon are retained. No stock photos, fabricated
client logos, business statistics or testimonials are introduced.

| Role | Hex |
| --- | --- |
| Main canvas / off-white | `#F4F2EC` |
| Near-black / rich bands | `#151A18` |
| Accent / deep sage | `#1C604A` |
| Accent hover | `#154A39` |
| Tint of the accent | `#E8EEE8` |
| Secondary text | `#4C5C54` |
| Borders | `#CCD4CD` |
| Paper surfaces | `#FFFFFF` |

Typography uses the existing licensed, self-hosted **Manrope** for geometric
headings and **DM Sans** for readable body text. The contrast comes from weight,
scale and spacing: the desktop hero ranges from 54–92px, section headings from
34–54px and body text is generally 16–18px. Mobile headings scale down to 37–64px,
with clear line lengths and no automatic heading hyphenation. No external font
requests or additional production dependencies are needed.

## Code and build

- `index.html`: full source, from navigation to footer, preserving existing IDs,
  translation keys, form fields and enquiry routing.
- `style.css`: the new design layer, with numbered component sections. Shared
  component foundations and fonts come from the root `style.css`.
- `build.cjs`: embeds CSS, images, fonts and the shared bilingual copy, metric
  calculations and interactions into two standalone HTML files.
- `check.test.cjs`: guards copy, anchor, enquiry and production-build preservation.

From the repository root:

```sh
npm run build:v2
npm run test:v2
```

Open `design-v2/dist/index.html` for English or `design-v2/dist/de/index.html` for
German. Each built file contains its own assets and scripts. Hosted paths remain
`/` and `/de/`. Form submission still opens a draft in the visitor's mail app.

The regular `npm run build`, Netlify configuration and production `dist` are
unchanged. Do not change Netlify to publish the alternative without approval.

## Layout, navigation through footer

```html
<header id="site-header">Logo, navigation, language switch, contact</header>
<main id="main">
  <section id="intro">Split hero, one primary CTA, architectural service index</section>
  <section id="who-we-help">Near-black audience band; Europe and the US</section>
  <section id="practices">Five services in a 12-column asymmetric bento</section>
  <section id="business-guide">Startup / SaaS / services guide with a side rail</section>
  <section id="engagements">Paid review, five projects, startup and ongoing support</section>
  <section id="approach">Three numbered steps in editorial rows</section>
  <details id="working-examples">
    <section id="challenge-finder">Business challenge selector</section>
    <section id="performance-lens">Financial, commercial and operational views</section>
    <section id="revenue-finance">Pipeline to cash, with accounting distinctions</section>
    <section id="strategic-finance">Planning and reporting detail</section>
    <section id="metric-explorer">Optional illustrative KPI calculator</section>
  </details>
  <section id="about">About and expandable principles</section>
  <section id="example-engagements">Clearly labelled illustrative briefs</section>
  <section id="qualifications">Manual image-based qualification carousel</section>
  <section id="testimonials" hidden>Reserved for genuine approved feedback</section>
  <section id="contact">Contact details and email-draft form</section>
</main>
<footer class="site-footer">Brand, scope, copyright, back-to-top</footer>
```

The service index is intentionally omitted at smaller widths because the same
services remain available directly below. The business guide becomes horizontal
choices on mobile. Without JavaScript its three panels form a readable document.
Micro-interactions use border/colour feedback and respect reduced motion.

## Trust and demonstrations

The real owner-supplied qualification names are retained. The current qualification
images are editorial category illustrations, not official issuer badges. They are
presented in monochrome to match the second design. See
`../assets/QUALIFICATION-ARTWORK.md`. No testimonial becomes visible without genuine
approved data. The rolling P&L simulator remains removed, and KPI calculations and
their illustrative assumptions are unchanged.

## Browser verification

The shared end-to-end suite can target the alternative build:

```sh
CONSULTIX_BUILD_DIR=design-v2/dist \
PLAYWRIGHT_MODULE=/tmp/consultix-v2-tools/node_modules/playwright \
AXE_CORE_PATH=/tmp/consultix-v2-tools/node_modules/axe-core/axe.min.js \
npm run test:browser
```

Verification completed in the actual checkout:

- `npm run check`: all 17 shared positioning/design/content tests pass.
- `npm run build:v2` and `npm run test:v2`: both language files build and all four
  copy/path/production-isolation checks pass.
- Shared browser suite against Version 2: **235 functional checks pass**, including
  English/German, 320–1920px layouts, mobile navigation, keyboard, enquiry routing,
  calculator edge cases, no-JavaScript content, accessibility and no external
  asset requests. No browser exceptions were reported.
- Screenshots reviewed at desktop/mobile in both languages. No horizontal
  overflow was found. The hero's small arrows use CSS lines instead of depending
  on an installed system-font glyph.
- Final build: 12 additional checks pass for stacked no-JavaScript business panels,
  white button text, sage list markers, the arrow rendering and an accessibility
  scan after the last visual refinements.
- The production HTML/CSS, shared copy, app, financial calculations, base build,
  server, Netlify configuration and favicon are unchanged from approved Version 1.

The browser test now accepts an alternative build directory and waits for the
carousel's scheduled state update before checking its controls; no interaction
logic was changed for this design.

Screenshots and standalone review artifacts are under
`/workspace/exports/version-2-swiss-2026-10-31/`. A ready-to-open preview and a full
source package are provided there. Version 2 has not been published over Version 1.
