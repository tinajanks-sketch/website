# Homepage refinement review — 30 October 2026

Base: published commit `73a4ee9`. Review branch: `remove-homepage-forecast`.

- Removed the entire rolling P&L simulator, monthly comparison table, CSV/reset controls, model runtime and unused styles from both language pages. Financial consulting services remain available through their existing disclosure. The calculation module/tests remain offline only.
- Updated links and captions that referred to the removed example. The independent metric explorer and current slate-and-copper design remain.
- Added a compact, text-only qualifications strip using the owner's exact Microsoft Power BI and AFP FPAC titles. At the owner’s request, no individual names or IDs are displayed. HubSpot and Acumatica use generic certification descriptions without an invented level or specialism. No issuer badges or company-partner claims are invented.
- Fixed the primary CTA arrow rendering as a missing-font square by drawing it in CSS.
- Passed 42 Node checks/tests (positioning, design, content layout, archived forecast model and active metric calculations), 3 Python deployment-helper tests and 212 functional browser checks with desktop/mobile WCAG 2/2.1 A/AA scans. The build and syntax checks pass. Browser checks cover both languages, direct German pages, no-script service access, controls, contact draft and 320–1920px page widths. Screenshots were inspected for the compact finance section, credentials and CTA arrow.
- Current screenshots: `/workspace/exports/homepage-refinement-2026-10-30/`.
- Fresh access to the requested reference, https://www.therevopscompany.com/, and issuer pages is blocked by the environment proxy (403). No claim is made to have inspected their current content or verified the qualifications independently.
- The repository requires a separate review PR before production publication. The GitHub GraphQL and REST PR-list endpoints are also blocked. This change remains a review update; live main, DNS/email, indexing, logo and Netlify configuration have not been changed.

---

# Consultix update-kit review — updated 29 October 2026

Starting version: `a12fea7`. Review branch: `consultix-update-kit-review`.

## Implemented

- Preserved logo, architecture illustration, typefaces, ink/ivory/coral palette, existing navigation, challenge finder, forecasting model, CSV export, contact draft and illustrative engagements.
- Updated the five services to the brief's exact conceptual boundaries. CRM is a standalone service; business analysis, RevOps and GTM processes are explicit within Operations.
- Reworked the service and offer copy around business challenges, deliverables and decisions. Added CRM/HubSpot and scoped AI pilot offers alongside the paid review, projects, startup planning and defined ongoing support.
- Clarified pipeline, bookings, delivery/revenue recognition, invoices/receivables and cash/financial planning in the existing interactive flow.
- Added a three-segment guide and a metric explorer with editable inputs, formulas, calculated examples, proportional bars and boundary-case explanations.
- Retained and verified the forecast's existing calculations, current actual-overhead baseline, annualised growth, variance bridge, loss scenarios and CSV.
- Removed the co-founder section and its bilingual content/styles at the owner’s request on 29 October. The company About section remains.
- Prepared an accessible manual carousel for genuine approved bilingual feedback, including disclosure of pre-Consultix work. It stays hidden because the kit's approved-testimonial file is empty.
- Added pre-rendered `/de/` content and direct-URL language selection without changing Netlify configuration. The standalone HTML previews also support language switching.
- Prevented no-JavaScript form submission from placing personal details in a page URL. Core content, direct email and no-script navigation remain available.

## Facts not supplied

No approved client quotations, verified founder specialisms, client statistics, partner credentials or confirmed platform capability list were supplied. None were invented. Platform support is described as scoped work, without accreditation claims or a partner-logo row.

## Verification

All 25 calculation checks passed: 14 forecast tests and 11 metric tests. All 247 functional browser checks passed, along with desktop/mobile WCAG 2/2.1 A/AA automated scans. Every challenge-finder and revenue-flow panel is exercised in both languages at 320, 768 and 1440px, in addition to the existing full-page 320–1920px checks. Calculation checks cover the rolling forecast and three new metrics. Browser checks cover both languages, 320–1920px layouts, all new selector panels, keyboard navigation, accessible carousel bounds, source/quotation safeguards, CSV, form validation, direct German URLs, static German copy, no-script fallback and reduced motion. Both standalone builds are checked for embedded assets and tested over local HTTP. This managed Chromium blocks file:// navigation, so direct double-click launching could not be verified here. WCAG 2/2.1 A/AA automated accessibility scans are included; they supplement manual layout review, not a claim of complete accessibility certification.

Desktop and mobile screenshots are saved separately under `/workspace/exports/launch-review-2026-10-29/`.

## Review status

The owner explicitly approved publication on 29 October 2026. The validated revision is submitted through the existing GitHub main → Netlify workflow. No domain/email changes were made. `netlify.toml`, the www redirect, search-indexing directives and the configured contact address were preserved. Direct HTTP access to the live site remains blocked by the environment proxy (403); a successful source push does not independently verify Netlify build completion or live output.

No approved quotations were supplied. The live carousel stays hidden. A separately labelled screenshot uses unmistakable design placeholders and is never included in the production build. The revised complete brief for sharing with Codex is CODEX-HANDOFF.md.

For preview and later deployment instructions, see PREVIEW.md.
