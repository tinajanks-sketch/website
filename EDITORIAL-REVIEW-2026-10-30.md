# Consultix editorial refinement — review draft

The owner subsequently requested stronger section distinction, the visible
business-type guide and image-based qualifications near the end. The current
follow-up is documented in `STRUCTURE-REVIEW-2026-10-30.md`. The measurements and
captures below describe the previous editorial draft.

Prepared on `consultix-editorial-refinement`, based on published `main` commit `ba2bc7f`.
The owner requested more natural copy and better colour and page structure. This
draft has not been merged into `main` or published to the production website.

## What changed

- Replace abstract introductory language with specific situations: an outdated
  forecast, unreliable CRM stages, inconsistent reporting, margins and cash timing.
  Preserve the five agreed service names and order.
- Put services and ways of working before the explanatory guides. Navigation
  follows the services → offers → approach sequence.
- Present the engagement choices as a review, a defined project or ongoing help.
  The five project offers become compact editorial rows with expandable inclusions.
  State the project-fee arrangement once above the list instead of five times.
- Keep the detailed challenge finder, performance lens, revenue-to-finance flow,
  finance detail, KPI explorer and audience guide in one native, initially closed
  disclosure. Service links still reveal the relevant content. This disclosure
  also opens without JavaScript.
- Use warm ivory for the reading sections, slate for the hero/performance lens/
  footer, and mineral mist for the process and contact sections. Keep bright coral
  for primary actions. Remove decorative circles, floating-card shadows and hover
  movement; preserve selected states and visible keyboard focus.
- Update both English and formal German. Preserve fonts, logo, architecture,
  credentials, contact behaviour, financial calculations and all infrastructure.
  No testimonial, client-result or partnership claims have been added.

## Preview

Build with `npm run build`. The two standalone pages are `dist/index.html` and
`dist/de/index.html`. Run `npm run dev` for the source preview, or choose an unused
port with `PORT=3002 npm run dev`. A cloud localhost address is not a public link.

Before/after desktop and mobile captures, including both languages, are saved in
`/workspace/exports/editorial-refinement-2026-10-30/`. The `before.json` and
`after.json` records measure the rendered initial page with disclosures closed.
At 1440px the English page decreases from 12,650px to 7,508px (41% shorter) and
from 1,539 to 1,084 initially visible main-content words (30% fewer). German is
40% shorter at that width. These are layout measurements, not business results.

The initial 390px English page decreases from 18,185px to 11,271px (38% shorter);
German decreases from 19,500px to 11,944px (39% shorter). The content inside
disclosures remains available, so these are not claims about total content removal.

## Review boundary

This is a new editorial proposal. The earlier production approval covers the
previous homepage revision. Follow the repository's review workflow before
publishing this draft. No DNS, email, hosting, legal or indexing settings change.

The GitHub GraphQL API returns `Forbidden` in this environment, so a review branch
can be shared but a new PR URL or Netlify deploy preview must not be invented.

## Verification

Completed in this checkout:

- `npm run check`: syntax and 17 positioning/design/content-layout tests passed.
- `npm run build`: standalone English and German pages generated successfully.
- `npm run test:forecast`: 14 archived-model tests passed; the removed simulator
  remains offline.
- `npm run test:metrics`: all 11 active calculation tests passed.
- `npm run test:deploy`: all three deployment-helper tests passed; no API
  deployment was performed.
- `npm run test:browser` with screenshots: 223 functional checks passed, with
  desktop/mobile WCAG A/AA scans, no browser exceptions and no third-party requests.
  Coverage includes keyboard disclosure controls, deep links that reveal hidden
  guide content, both languages, no-JavaScript content and widths down to 320px.
- Reviewed desktop/mobile screenshots in English and German and the compact offer
  layout. No horizontal overflow appeared in the measured previews.

No new public preview URL or live-site deployment is claimed.
