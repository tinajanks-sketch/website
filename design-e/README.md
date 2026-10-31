# Version E — modern editorial design mockup

The owner asked to see a clearly different desktop and mobile direction before a
full implementation. This is that reviewable prototype, built from fresh HTML/CSS.
It is not a production replacement and has not been deployed.

## What changes visually

- One broad ivory opening with expressive Instrument Serif typography; no split
  hero, architectural background, bento tiles or right-hand feature panel.
- A compact masthead, fine rules, full-width service index and native expandable
  service details. Descriptions sit beside the headings on desktop and move into
  the expansion on mobile.
- A separate charcoal feature for the paid Business Performance & Planning Review.
- Audience guidance as editorial rows, a pale olive support section, a text-led
  qualifications area and a warm sand contact section.
- The original logo, favicon and bright-orange/white CTA choice are retained.

## Palette and typography

| Role | Value |
| --- | --- |
| Warm ivory | `#F5F2E9` |
| Charcoal | `#242923` |
| Secondary text | `#555C53` |
| Fine rules | `#C9CCC1` |
| Orange CTA | `#F47758` |
| Orange hover | `#FFA080` |
| Pale olive | `#E8E9E0` |
| Warm sand | `#E5D9C9` |

Instrument Serif is used for headings, DM Sans for body text and the existing
Manrope logotype is retained. Fonts are embedded and their licences are included.
No remote font, stock-photo or tracking request is needed.

## Scope of this preview

English and German are built from the current shared `content.js`, with a small
set of new headings for this direction. All five consulting services remain in
the agreed order. The paid review, focused projects, ongoing support, client types,
About, supplied qualification labels and contact details are represented.

Service disclosures, language links, mobile navigation, in-page links and email
links work. This prototype shows the visual hierarchy; it does not yet reimplement
the production site's challenge guide, finance/metric examples, complete enquiry
form, all offer detail or full legal/privacy presentation. Those existing features
are untouched in the main site and would be integrated after the direction is
chosen. This preview must not be substituted into Netlify's production build.

No fabricated testimonials, client logos, statistics, partner badges or co-founder
section have been added. The testimonial content remains absent until approved
quotations exist. No illustrative financial results are introduced here.

The exact owner-selected orange/white CTA has a known text-contrast limitation:
approximately 2.75:1 normally and 1.98:1 on hover. It is retained intentionally and
must not be described as passing AA. Other accessibility findings are checked.

## Build

From the repository root, run:

```sh
node design-e/build.cjs
```

Open `design-e/dist/index.html` or `design-e/dist/de/index.html`. Both are standalone
files with embedded assets. Relative language links stay within this prototype.
The builder writes only inside `design-e/dist`; the production build command,
`dist`, Netlify configuration, domain and email settings are unchanged.

## Verification

- 132 focused browser checks passed across EN/DE at 320, 390, 768, 1440 and 1920px:
  correct language, new font loading, five service disclosures, language navigation,
  mobile menu/Escape, no page overflow, no browser errors and no external requests.
- Desktop/mobile screenshots captured in both languages and reviewed for the hero,
  service index, review feature and audience guidance.
- Four axe scans (EN/DE, 390/1440px) report no violations after exempting only the
  exact retained orange/white `.cta` combination. No broader rule is disabled.
- Without JavaScript, mobile navigation and service details remain accessible and
  the German page fits a 320px viewport.
- The unchanged production source also passes the existing syntax/design/layout,
  financial calculation and deployment-helper suites. See the session report for
  its browser-suite result.

Review artifacts are in `/workspace/exports/consultix-version-e-2026-10-31/`.
