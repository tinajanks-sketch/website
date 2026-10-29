# Codex agent instructions — Consultix Solutions

Read `CODEX-HANDOFF.md` before editing. It is the authoritative positioning, copy, technical, and QA brief. Read `POSITIONING-RESEARCH.md` for the research rationale and illustrative KPI boundaries. Read `README.md` and `PREVIEW.md` for the build and preview context.

## Current website
- Domain: https://consultix.solutions/
- Main source: `index.html`, `content.js` (English and German copy), `style.css`, `app.js`, `localise.js`, `build.js`.
- Host: Netlify via this GitHub repository. Email: Zoho, general@consultix.solutions. Domain registered at GoDaddy.
- Five service practices: (1) Financial Planning & Management Reporting, (2) Revenue Operations Management & CRM, (3) Business Intelligence & Data Analytics, (4) Revenue-to-Finance Alignment, (5) AI Enablement & Automation.
- The owner **approved publication of the five-practice repositioning on 29 October 2026**. New work beyond that approved revision still requires explicit approval before being pushed or deployed.

## Preserve
- Existing architectural hero, logo, editorial ink/ivory/coral design, Manrope and DM Sans.
- English and formal-German pre-rendered HTML, language toggle and navigation.
- Existing business challenge guide, audience guide, revenue-to-finance flow, rolling P&L forecast and CSV export, metric explorer, contact routing and mailto form.
- The connected performance lens: progressive HTML details, usable without JavaScript.
- Privacy/legal copy, noindex setting, Netlify build configuration, DNS and email. No analytics/tracking additions.
- Testimonials must remain hidden until genuine approved quotes exist; never add fake performance results or credentials.
- Accounting distinction between bookings, recognised revenue, invoices, receivables and cash. Illustrative financial data is not client data.

## Required verification
Run the test suite in the actual checkout:

```sh
npm run check
npm run build
npm run test:positioning
npm run test:forecast
npm run test:metrics
npm run test:browser
npm run test:deploy
```

Then test the actual English and German pages, direct URLs, mobile down to 320 px, keyboard and reduced-motion interactions, financial calculations, form topic selection and CSV behaviour. Inspect for console errors, accessibility findings and visual overflow. Report **actual results** and any environment limitations. Do not imply checks passed if they were not run.

## Codex continuation task
Conduct post-publication QA on the current `main` branch; audit the five practices and offers for consistent English/German content and accessibility; capture desktop and mobile screenshots; propose fixes on a separate PR. Avoid redesigning working interactions or changing domain/email infrastructure. Do not merge any follow-up PR without explicit approval.
