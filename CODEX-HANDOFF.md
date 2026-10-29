# Consultix Solutions — five-practice positioning and design handoff
Updated: 29 October 2026. **Review only. Do not deploy or merge without the owner's explicit approval.**

Website: https://consultix.solutions/
Repository: https://github.com/tinajanks-sketch/website
Review branch: `consultix-five-practices-2026-review`
Business email: general@consultix.solutions

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
- Preserve the architectural hero illustration, logo, Manrope/DM Sans, ink, warm ivory, restrained coral and editorial spacing.
- The new **Connected Performance Lens** uses three native expandable perspectives (financial, commercial and operational). Keep it accessible by keyboard and without JS, mobile-friendly down to 320px, and compatible with reduced motion. It is an explanatory interaction, not a personalised diagnosis.
- Preserve and improve the existing challenge finder, audience guide, interactive revenue-to-finance flow, rolling financial forecast with CSV, metric explorer, contact form and bilingual language toggle. Avoid gimmicky animated dashboards or redundant widgets.
- Keep emphasis on typography, precise hierarchy, interactive states, focus visibility and sensible whitespace. Reuse existing components and avoid new runtime dependencies, marketing trackers or third-party assets.
- Existing testimonial data must stay empty; no fictional quotes, invented clients or statistics. The earlier co-founder section was removed at the owner's request and must not be restored.

## Technical and legal boundaries
- Keep GoDaddy registration, Netlify hosting/DNS and Zoho email settings unchanged. Preserve `netlify.toml`, build `npm run build`, publish `dist` and Node 24.
- Retain the published site's noindex configuration until separately approved. Do not change legal/privacy content or send form data to the URL. The form prepares a mailto draft; direct email must remain available.
- Do not change financial model calculations or hypothetical values. Revenue/operating result is not cash flow; IFRS 15 recognition depends on the applicable contracts and policies. Retain existing forecast boundary handling, German labels and CSV/reset behaviour.
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
Then manually test English and German directly at root and /de/, with and without JavaScript, and desktop/mobile widths including 320px. Check all five practice/offer cards, enquiry selection, details toggles, focus handling, reduced motion, accessibility, every forecast input and CSV download. Verify the built preview independently before sharing screenshots. These checks **have not yet been run** against the new review branch in this conversation.

Stop before publishing. Present the reviewed preview and exact test results for approval.
