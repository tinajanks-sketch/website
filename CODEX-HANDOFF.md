# Consultix Solutions — five-practice positioning and design handoff
Updated: 31 October 2026. **The owner approved publication of the full editorial Version 1, including white text on accessible orange buttons.** A separate Version 2 was requested for comparison only; future independent production changes still require approval.

Website: https://consultix.solutions/
Repository: https://github.com/tinajanks-sketch/website
Source review branch: `consultix-editorial-refinement` (approved for publication to main on 31 October 2026)
Business email: general@consultix.solutions

## Latest publication approval — 31 October 2026
The owner approved the complete editorial review, restored business-type guide, distinct backgrounds, illustrated qualifications carousel and Europe/US targeting, then asked for white button text and publication. Use white on `#C25032`, with hover `#AC432A` (at least 4.5:1 contrast). Preserve the logo/favicon and hosting, email, legal and indexing settings. Publish Version 1 through the existing Git-connected Netlify route after checks. Version 2 is a separate design preview and is not authorised to replace production.

## Approved final refinement — 30 October 2026
The owner requested “HubSpot certified” and “Acumatica certified” with no IDs or personal names, the other discussed simplifications, and an update to the website. Shorter English/German hero, audience and finance copy removes repetition. The remaining KPI examples stay available inside a native disclosure that starts collapsed, opens with keyboard or pointer, and preserves its state across language switching. The large rolling P&L example remains removed. Keep the current design, five practices, offers, contact and other interactions. The owner has approved publishing this scope; no additional confirmation is needed for these changes.

## Owner-requested removal — 30 October 2026
The owner selected the illustrative rolling P&L forecast for removal to simplify the homepage. Remove the entire widget and its controls, chart, variance/table views, CSV download, no-script fallback and client runtime in English and German. Keep the five service practices and current slate-and-copper identity. This latest request supersedes earlier instructions to preserve the interactive forecast. It does not authorise unrelated copy cuts or claims about credentials/partnerships.

## Owner-supplied qualifications — 30 October 2026
The owner supplied Microsoft Certified: Power BI Data Analyst Associate (Microsoft) and Certified Corporate FP&A Professional (FPAC), Association for Financial Professionals, and asked to show credentials. A compact text-only strip uses those exact titles. The owner requested generic HubSpot/Acumatica certification descriptions without IDs or personal names; no level, specialism or company partner status is implied. Do not infer certified-partner/company status, invent badges or attribute a qualification to a specific person without the supplied details.

## Context and purpose
This handoff supersedes the old October 2026 copy specification where service names, practice order and offer descriptions differ. Work from the current files on the review branch, not from old screenshots or prior plans. Preserve the existing branding and functioning features.

Consultix is an independent, finance-led boutique consultancy working at the intersection of financial planning, commercial operations, business intelligence and practical implementation. It does not present itself as an accounting audit firm, certified technology partner, outsourced CFO with unverified track record or an AI product vendor.

## The five practices — required order
1. **Financial Planning & Management Reporting.** Budgeting, rolling forecasts, financial KPIs, cash assumptions, profitability, budget-versus-actual commentary and management packs. Distinct value: decision support and forecasting based on financial drivers.
2. **Revenue Operations Management & CRM.** Lifecycle and pipeline architecture, lead qualification/routing, handoffs across marketing, sales and customer-facing teams, HubSpot/CRM administration, GTM process improvement, forecasting inputs, documentation and adoption. Distinct value: reliable commercial processes and systems; don't collapse RevOps into CRM alone.
3. **Business Intelligence & Data Analytics.** Connect CRM/pipeline, customer, financial and operational data through consistent definitions, quality checks, investigation, dashboards and reporting. Distinct value: uncovering performance drivers across the business; don't market dashboards as the entire service.
4. **Revenue-to-Finance Alignment.** Strategic planning across sales commitments, bookings, delivery, recognition, receivables, margins and collections, including forecast assumptions and ownership. Distinct value: explain how growth turns into revenue, margin and cash. Respect applicable accounting policies; never treat bookings, recognition, invoices and cash as identical.
5. **AI Enablement & Automation.** Assess readiness, scope an appropriate use case, run a controlled pilot, measure time/quality/cost/adoption, document and hand over with human oversight.

### Prevent overlap in site copy
Finance plans and evaluates financial scenarios. RevOps optimises commercial work. BI examines information from different functions. Revenue-to-Finance reconciles commercial activity with financial outcomes and timing. AI improves selected processes where it is justified. An engagement can combine practices, but the website must explain why each is independently useful.

## Offers and client journey
Use one clearly scoped **paid Business Performance & Planning Review** as a diagnostic entry point, not a free audit. Follow with five clearly defined project offers in this order:
1. Financial Planning & Management Reporting — planning model, scenarios, variance reporting and usable update routine.
2. Revenue Operations & CRM Improvement — RevOps/CRM review, lifecycle, pipeline, data quality, routing, workflows, reporting and adoption.
3. Business Intelligence & Data Analytics — KPI definitions, source/data quality map, analysis, dashboard or reporting pack, documentation.
4. Revenue-to-Finance Alignment — commercial-to-finance ownership map, metric definitions, forecast assumptions, margin/collection analysis and practical reporting improvements.
5. Practical AI & Workflow Pilot — scoped use case, baseline, review and quality checks, cost analysis, documentation.

Keep a startup planning variant and scoped monthly support. All offers use existing enquiry routing with the correct `data-engagement` topic; do not invent prices or outcomes. The client journey is: discuss the need → agree scope/fee → analyse and prioritise → implement where contracted → test, document and hand over.

## Copy and brand voice
Write naturally, with connected sentences rather than exaggerated slogans, isolated fragments or technology hype. Address tangible decisions and constraints; explain deliverables as things the buyer can actually use. Keep the English and formal German ('Sie') versions equally substantive. Use `content.js` as the common bilingual source and keep text-only fallbacks in `index.html` consistent. Publish German content in the initial HTML, not only after JavaScript.

## Visual direction
- Preserve the architectural hero illustration, logo, Manrope/DM Sans and editorial spacing. The colour/typography refresh proposed on `consultix-mineral-slate-copper-design` uses Mineral Slate & Copper; see `DESIGN-SYSTEM-2026.md` for exact design tokens, dark/light section treatment and accessibility constraints.
- The new **Connected Performance Lens** uses three native expandable perspectives (financial, commercial and operational). Keep it accessible by keyboard and without JS, mobile-friendly down to 320px, and compatible with reduced motion. It is an explanatory interaction, not a personalised diagnosis.
- Preserve and improve the existing challenge finder, audience guide, interactive revenue-to-finance flow, metric explorer, contact form and bilingual language toggle. Avoid gimmicky animated dashboards or redundant widgets.
- Keep emphasis on typography, precise hierarchy, interactive states, focus visibility and sensible whitespace. Reuse existing components and avoid new runtime dependencies, marketing trackers or third-party assets.
- Existing testimonial data must stay empty; no fictional quotes, invented clients or statistics. The earlier co-founder section was removed at the owner's request and must not be restored.

## Technical and legal boundaries
- Keep GoDaddy registration, Netlify hosting/DNS and Zoho email settings unchanged. Preserve `netlify.toml`, build `npm run build`, publish `dist` and Node 24.
- Retain the published site's noindex configuration until separately approved. Do not change legal/privacy content or send form data to the URL. The form prepares a mailto draft; direct email must remain available.
- Do not change financial model calculations or hypothetical values. Revenue/operating result is not cash flow; IFRS 15 recognition depends on the applicable contracts and policies. The earlier rolling P&L example was explicitly removed on 30 October; retain the calculation module as offline reference only, and do not restore the widget or CSV controls.
- No guaranteed AI savings, false accreditation, client results, partner badges or regulated tax/audit/investment advice.

## Verification before launch
Run in the actual repository checkout:
```sh
npm run check
npm run build
npm run test:positioning
npm run test:forecast
npm run test:metrics
npm run test:browser
npm run test:deploy
```
Then manually test English and German directly at root and /de/, with and without JavaScript, and desktop/mobile widths including 320px. Check all five practice/offer cards, enquiry selection, details toggles, focus handling, reduced motion, accessibility, the absence of the removed forecast, the remaining metric controls and their reset behaviour. Verify the built preview independently before sharing screenshots. Record the actual check results for the final revision; do not reuse historical results for changed code.

Publication of this specific refinement has been approved on 30 October. The review branch is available for inspection. GitHub PR APIs are blocked in this environment, so use the existing Git publishing route for this approved revision and report deployment-verification limits. Future independent updates still need their applicable review and approval. See `AGENTS.md` for the post-publication Codex continuation task.
