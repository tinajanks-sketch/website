# Consultix update-kit review — 28 October 2026

Starting version: `a12fea7`. Review branch: `consultix-update-kit-review`.

## Implemented

- Preserved logo, architecture illustration, typefaces, ink/ivory/coral palette, existing navigation, challenge finder, forecasting model, CSV export, contact draft and illustrative engagements.
- Updated the five services to the brief's exact conceptual boundaries. CRM is a standalone service; business analysis, RevOps and GTM processes are explicit within Operations.
- Reworked the service and offer copy around business challenges, deliverables and decisions. Added CRM/HubSpot and scoped AI pilot offers alongside the paid review, projects, startup planning and defined ongoing support.
- Clarified pipeline, bookings, delivery/revenue recognition, invoices/receivables and cash/financial planning in the existing interactive flow.
- Added a three-segment guide and a metric explorer with editable inputs, formulas, calculated examples, proportional bars and boundary-case explanations.
- Retained and verified the forecast's existing calculations, current actual-overhead baseline, annualised growth, variance bridge, loss scenarios and CSV.
- Made the founder section text only, using confirmed names and Co-founder titles.
- Prepared an accessible manual carousel for genuine approved bilingual feedback, including disclosure of pre-Consultix work. It stays hidden because the kit's approved-testimonial file is empty.
- Added pre-rendered `/de/` content and direct-URL language selection without changing Netlify configuration. The standalone HTML previews also support language switching.
- Prevented no-JavaScript form submission from placing personal details in a page URL. Core content, direct email and no-script navigation remain available.

## Facts not supplied

No approved client quotations, verified founder specialisms, client statistics, partner credentials or confirmed platform capability list were supplied. None were invented. Platform support is described as scoped work, without accreditation claims or a partner-logo row.

## Verification

All 25 calculation checks passed: 14 forecast tests and 11 metric tests. All 190 functional browser checks passed, along with desktop/mobile WCAG 2/2.1 A/AA automated scans. Calculation checks cover the rolling forecast and three new metrics. Browser checks cover both languages, 320–1920px layouts, all new selector panels, keyboard navigation, accessible carousel bounds, source/quotation safeguards, CSV, form validation, direct German URLs, static German copy, no-script fallback and reduced motion. Both standalone builds are checked for embedded assets and tested over local HTTP. This managed Chromium blocks file:// navigation, so direct double-click launching could not be verified here. WCAG 2/2.1 A/AA automated accessibility scans are included; they supplement manual layout review, not a claim of complete accessibility certification.

Desktop and mobile screenshots are saved separately under `/workspace/exports/update-kit-review/`.

## Review status

No GitHub push, Netlify deployment or domain/email changes were made. `netlify.toml`, the www redirect, search-indexing directives and the configured contact address were preserved. Direct HTTP comparison with the live site was blocked by the environment proxy (403), so this is a review of the current repository and local builds, not a claim of independently verified live output.

For preview and later deployment instructions, see PREVIEW.md.
