# Consultix design comparison — A, B, C and D

31 October 2026. These alternatives share the existing business copy, five
services, paid offers, bilingual paths, contact routing and financial calculations.

## Publication status

Version A's approved corrections were pushed to production `main` at
`9ace170b5ce525c7980e0c1d903690f32508e272`. This restores the original bright orange
buttons with white labels, distinguishes the finance and About sections, and uses
the requested plural qualification labels. The environment's HTTPS proxy prevented
an independent check of Netlify's completed live deployment.

Versions B, C and D live on the separate `consultix-versions-c-d` review branch.
They are previews. The regular build, Netlify configuration, domain, email, logo
and favicon are unchanged. No alternative has replaced Version A.

## The four layouts

| Version | Presentation | Source |
| --- | --- | --- |
| A | Current editorial layout, alternating section colours, concise headings and optional detail | Root files |
| B | Swiss architectural layout: light split hero, asymmetric service panels and a sage accent | `design-v2/` |
| C | Split architectural hero, sticky service index, five working service tabs and a horizontal qualifications rail | `design-c/` |
| D | Current editorial hierarchy with a blurred scrolled header, restrained entry/hover motion and an accessible mobile drawer | `design-d/` |

Across all four, section labels use sentence case, redundant signposts are removed
and service keywords appear as plain text rather than decorative chips. Concrete
examples and the existing offer wording remain. There are no auto-playing number
counters, invented client statistics or new stock photographs. These are specific
editing choices, rather than a claim that authorship can be detected from a page.

A, C and D retain `#F47758` / white buttons with `#FFA080` on hover, as explicitly
chosen by the owner. This pairing has a known text-contrast exception: approximately
2.75:1 normally and 1.98:1 on hover. It must not be described as passing WCAG AA.
The browser checks exempt only this exact foreground/background pairing on
`.button`; every other accessibility finding still fails. B retains its separate
sage palette (`#1C604A`, hover `#154A39`) from the earlier alternative brief.

## Honest proof and preserved functions

- Qualification names and issuer captions remain owner supplied. The artwork is
  original category illustration, not an official badge or proof of partner status.
  See `assets/QUALIFICATION-ARTWORK.md`.
- Testimonials remain hidden because no approved quotations have been supplied.
  Browser fixtures used to test the carousel are not included as client feedback.
- No co-founder section or invented client logos, regional counts or results.
- English `/` and German `/de/`, deep links, audience/challenge guides, disclosures,
  enquiry topics and the email-draft form remain available. The form opens the
  visitor's mail app; it does not send from a backend.
- The optional KPI examples retain their labelled illustrative assumptions and
  calculation module. The owner-removed rolling P&L simulator remains offline.
- Legal copy, noindex, fonts, privacy settings and the production build are retained.

## Build and preview

From the repository root:

```sh
npm run build
npm run build:comparisons
```

Open one of the following built files. Each contains its own fonts, artwork,
styles, copy and scripts; German versions are in each build's `de/index.html`.

```text
dist/index.html
design-v2/dist/index.html
design-c/dist/index.html
design-d/dist/index.html
```

To export all four with a comparison page:

```sh
node design-experiments/export.cjs /tmp/consultix-comparison
```

If hero screenshots exist under the output's `a/`, `b/`, `c/` and `d/` folders,
the exporter embeds them in the comparison page. Otherwise it uses text previews.
This command never writes to production `dist` or changes Netlify's publish folder.

## Verification completed

- `npm run check`: syntax checks and all 17 shared positioning/design/layout tests.
- Comparison preservation tests: all 4 checks pass for copy, paths, enquiry topics,
  both built languages and production isolation.
- Shared browser suite: A and B each pass 236 functional checks; C and D each pass
  237. The suite exercises 320–1920px widths, languages, keyboard navigation,
  calculators, disclosures, routing, no-JavaScript reading and accessibility.
- All 163 dedicated C/D checks pass, covering service-tab keyboard control, direct tab links,
  language-switch persistence, drawer focus trapping/restoration, close and
  backdrop actions, reduced motion, scroll entry and no-JavaScript access.
- EN/DE desktop (1440px) and mobile (390px) screenshots captured and reviewed.
  The capture run reported no browser exceptions or horizontal page overflow.
- Source comparison confirms the production HTML/CSS, shared copy/app/calculations,
  base build/server, Netlify configuration and favicon match approved `main`.

The documented exact orange/white exception applies to A/C/D. The focused C/D
checks include an accessibility scan with the mobile drawer open. See
`design-experiments/interactions.test.cjs`. An additional 19 exported-preview and
comparison-page checks pass over local HTTP. Direct `file://` navigation was
blocked by Chromium's administrator policy in this environment; it was not
verified in this run. The standalone files retain the existing file-mode support.

Development-only browser dependencies may be installed outside the repository:

```sh
PLAYWRIGHT_MODULE=/tmp/consultix-v2-tools/node_modules/playwright \
AXE_CORE_PATH=/tmp/consultix-v2-tools/node_modules/axe-core/axe.min.js \
npm run test:interactions

CONSULTIX_BUILD_DIR=design-c/dist \
PLAYWRIGHT_MODULE=/tmp/consultix-v2-tools/node_modules/playwright \
AXE_CORE_PATH=/tmp/consultix-v2-tools/node_modules/axe-core/axe.min.js \
npm run test:browser
```

Use `design-v2/dist` or `design-d/dist` for the other alternatives. Publishing a
different layout requires choosing that version and approving its release.
