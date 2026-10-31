# Codex agent instructions — Consultix Solutions

Read `CODEX-HANDOFF.md` before editing. It is the authoritative positioning, copy, technical, and QA brief. Read `POSITIONING-RESEARCH.md` for the research rationale and illustrative KPI boundaries. Read `DESIGN-SYSTEM-2026.md` for the proposed Mineral Slate & Copper design refresh. Read `README.md` and `PREVIEW.md` for the build and preview context.

## Current website
- Domain: https://consultix.solutions/
- Main source: `index.html`, `content.js` (English and German copy), `style.css`, `app.js`, `localise.js`, `build.js`.
- Host: Netlify via this GitHub repository. Email: Zoho, general@consultix.solutions. Domain registered at GoDaddy.
- Five service practices: (1) Financial Planning & Management Reporting, (2) Revenue Operations Management & CRM, (3) Business Intelligence & Data Analytics, (4) Revenue-to-Finance Alignment, (5) AI Enablement & Automation.
- The owner **approved both the five-practice positioning and the Mineral Slate & Copper editorial redesign for publication on 29 October 2026**. Subsequent independent changes require explicit approval before production deployment.

## Preserve
- Existing architectural hero, logo, Manrope and DM Sans. The current design system is Mineral Slate & Copper, with a brighter coral primary CTA, documented in `DESIGN-SYSTEM-2026.md`. Keep the existing website logo and favicon unchanged.
- English and formal-German pre-rendered HTML, language toggle and navigation.
- Existing business challenge guide, audience guide, revenue-to-finance flow, rolling P&L forecast and CSV export, metric explorer, contact routing and mailto form.
- The connected performance lens: progressive HTML details, usable without JavaScript.
- Privacy/legal copy, noindex setting, Netlify build configuration, DNS and email. No analytics/tracking additions.
- Testimonials must remain hidden until genuine approved quotes exist; never add fake performance results or credentials.
- Accounting distinction between bookings, recognised revenue, invoices, receivables and cash. Illustrative financial data is not client data.

## Design review status
The Mineral Slate & Copper and concise editorial layout refresh **has been explicitly approved by the owner for publication on 29 October 2026**. It was developed on `consultix-mineral-slate-copper-design` and is intended for `main`. Do not restore obsolete long-form defaults or earlier oversized/auto-hyphenated headings. Check desktop/mobile screenshots and the readable text/controls of the financial widgets before recommending release.

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
For future Codex tasks, start from the current `main` branch, read `DESIGN-SYSTEM-2026.md`, capture English/German desktop and mobile screenshots, and test all existing functions. Use a separate review PR for subsequent fixes. Avoid redesigning working interactions or changing domain/email infrastructure. Do not merge any follow-up PR without explicit approval.

## Editorial homepage revision
The review branch also simplifies copy and introduces progressive disclosure for the five practices, five offer cards, finance service detail, principles and illustrative briefs. Read `DESIGN-SYSTEM-2026.md` for the information hierarchy. The headline must stay moderately sized without mid-word hyphens. Keep all practice details accessible to keyboard and screen reader users, preserve direct enquiry links, and test English/German with and without JavaScript. Run `npm run test:content-layout` in addition to existing checks. This edition of the design and copy is owner-approved for production. Do not merge or deploy further revisions without approval.

## Latest owner request — 30 October 2026
The owner explicitly selected the illustrative rolling P&L forecast for removal from the homepage to reduce detail. Earlier preservation instructions for that widget and CSV export are superseded by this request. Preserve the finance consulting service and the other current interactions. The tested calculation module can remain offline; it must not be embedded or served to visitors. Check the remaining English/German layouts and links after the removal. Keep the existing review/approval workflow for publication.

The owner also supplied the exact Microsoft Certified: Power BI Data Analyst Associate and Certified Corporate FP&A Professional (FPAC) titles on 30 October for a compact qualifications strip. Preserve their exact names and issuer attribution. The owner asked to list HubSpot and Acumatica certification generically, without IDs or personal names. Do not invent certification levels, specialisms, partner status or badges.

## Publication approval — 30 October 2026
The owner reviewed the homepage-refinement draft and explicitly requested the labels “HubSpot certified” and “Acumatica certified”, the other discussed copy/layout tweaks and publication of the website update. This approval covers the current forecast removal, qualifications strip, shorter introductory copy, optional KPI disclosure and CTA arrow fix. No IDs or personal names are shown. GitHub PR APIs are unavailable from this environment; publish this approved revision through the existing Git-connected Netlify production workflow, preserve all infrastructure/indexing settings, and report source publication separately from verified deployment completion. Future independent revisions still follow the review/approval workflow above.

## Publication approval and separate Version 2 — 31 October 2026
The owner approved the complete editorial review, distinct section colours,
visible business-type guide, qualifications image carousel and Europe/US targeting,
asked to check white text on orange buttons, and explicitly said to publish.
Use white button text with a sufficiently deep orange for at least 4.5:1 contrast.
This supersedes the earlier dark-on-bright-coral button requirement only for the
primary buttons; preserve the existing logo and favicon. Publish this approved
Version 1 through the Git-connected Netlify main workflow after verification.
The owner also requested a separate, substantially redesigned Version 2 for
comparison. Keep that alternative out of the production build and do not replace
the approved live version with it without approval. Preserve core copy, offers,
bilingual paths and functionality in the alternative. No invented proof or badges.
