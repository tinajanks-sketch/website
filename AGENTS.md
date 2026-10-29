# Codex agent instructions — Consultix Solutions

Read `CODEX-HANDOFF.md` before editing. It is the authoritative positioning, copy, technical, and QA brief. Read `POSITIONING-RESEARCH.md` for the research rationale and illustrative KPI boundaries. Read `DESIGN-SYSTEM-2026.md` for the proposed Mineral Slate & Copper design refresh. Read `README.md` and `PREVIEW.md` for the build and preview context.

## Current website
- Domain: https://consultix.solutions/
- Main source: `index.html`, `content.js` (English and German copy), `style.css`, `app.js`, `localise.js`, `build.js`.
- Host: Netlify via this GitHub repository. Email: Zoho, general@consultix.solutions. Domain registered at GoDaddy.
- Five service practices: (1) Financial Planning & Management Reporting, (2) Revenue Operations Management & CRM, (3) Business Intelligence & Data Analytics, (4) Revenue-to-Finance Alignment, (5) AI Enablement & Automation.
- The owner **approved publication of the five-practice repositioning on 29 October 2026**. New work beyond that approved revision still requires explicit approval before being pushed or deployed.

## Preserve
- Existing architectural hero, logo, Manrope and DM Sans. The current review branch proposes a Mineral Slate & Copper visual system, documented in `DESIGN-SYSTEM-2026.md`; do not revert it to the older bright-coral palette.
- English and formal-German pre-rendered HTML, language toggle and navigation.
- Existing business challenge guide, audience guide, revenue-to-finance flow, rolling P&L forecast and CSV export, metric explorer, contact routing and mailto form.
- The connected performance lens: progressive HTML details, usable without JavaScript.
- Privacy/legal copy, noindex setting, Netlify build configuration, DNS and email. No analytics/tracking additions.
- Testimonials must remain hidden until genuine approved quotes exist; never add fake performance results or credentials.
- Accounting distinction between bookings, recognised revenue, invoices, receivables and cash. Illustrative financial data is not client data.

## Design review status
The Mineral Slate & Copper changes (with the original website logo/favicons preserved, smaller hero headline and brighter coral primary buttons) are on a **separate review branch**, not yet approved for production. Do not merge or deploy this redesign until the owner explicitly approves it. Check desktop/mobile screenshots and the readable text/controls of the financial widgets before recommending release.

## Required verification
Run the test suite in the actual checkout:

```sh
npm run check
npm run test:design
npm run build
npm run test:positioning
npm run test:forecast
npm run test:metrics
npm run test:browser
npm run test:deploy
```

Then test the actual English and German pages, direct URLs, mobile down to 320 px, keyboard and reduced-motion interactions, financial calculations, form topic selection and CSV behaviour. Inspect for console errors, accessibility findings and visual overflow. Report **actual results** and any environment limitations. Do not imply checks passed if they were not run.

## Codex continuation task
For this specific colour/typography refresh, work from `consultix-mineral-slate-copper-design` and review `DESIGN-SYSTEM-2026.md`; capture English/German desktop and mobile screenshots and test all existing functions. Use a separate review PR for subsequent fixes. Avoid redesigning working interactions or changing domain/email infrastructure. Do not merge any follow-up PR without explicit approval.

## Editorial homepage revision
The review branch also simplifies copy and introduces progressive disclosure for the five practices, five offer cards, finance service detail, principles and illustrative briefs. Read `DESIGN-SYSTEM-2026.md` for the information hierarchy. The headline must stay moderately sized without mid-word hyphens. Keep all practice details accessible to keyboard and screen reader users, preserve direct enquiry links, and test English/German with and without JavaScript. Run `npm run test:content-layout` in addition to existing checks. Do not publish this review branch without separate explicit approval.
