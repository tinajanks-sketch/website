# Consultix Solutions

Independent English/German business website for `consultix.solutions`, based on the supplied brand guidelines and reference screenshots. Domain registrar: GoDaddy. Email provider selected by the owner: Zoho Mail. Enquiry address supplied by the owner: `general@consultix.solutions`.

The site uses plain HTML, CSS and JavaScript. It has no production package dependencies, website-builder subscription or application server requirement. Hosting-provider free-plan limits still apply; domain registration and email are separate services.

## Mineral Slate & Copper design refresh (review only)

A website-wide editorial colour and typography update is prepared on `consultix-mineral-slate-copper-design`. It uses deep slate, warm ivory, mineral blue and restrained copper, improves the hero's typography and contrast, and refines the service, financial tool and contact styling. **This design branch is a preview, not a production deployment.** See `DESIGN-SYSTEM-2026.md` for the rationale and QA checklist.

## New five-practice positioning (review branch; not published)

The owner requested a new finance-led, commercially connected positioning on 29 October 2026 and **explicitly approved publication later that day**. The revision was prepared on `consultix-five-practices-2026-review` for merging into the existing GitHub-to-Netlify production workflow. New, unrelated changes still require approval before publication.

The five practices in order are:

1. Financial Planning & Management Reporting
2. Revenue Operations Management & CRM
3. Business Intelligence & Data Analytics
4. Revenue-to-Finance Alignment (strategic finance, profitability, revenue, collections and planning)
5. AI Enablement & Automation

A native HTML details-based 'connected performance' perspective explorer now explains how financial, commercial and operating decisions connect. The existing financial forecast, KPI calculator, challenge selector, business guide and revenue-to-finance flow remain in place. All new content is bilingual with pre-rendered German fallback. No fake testimonials, badges, or client results were added.

The review intentionally preserves the financial arithmetic, legal content, email settings, assets and Netlify settings. Follow up with `npm run check`, `npm run build`, `npm run test:forecast`, `npm run test:metrics`, `npm run test:browser`, `npm run test:deploy`, plus responsive and German language review before publication. The Netlify pull-request deploy-preview status succeeded. Full automated browser testing and screenshot inspection were not completed in this conversation; see `AGENTS.md` for the follow-up Codex QA task.

## Current review version

The 28 October 2026 update kit is implemented on `consultix-update-kit-review`, based on `a12fea7`. The owner approved publishing the updated version on 29 October 2026 after asking for the co-founder section to be removed. Publish through the existing GitHub-to-Netlify workflow after validation. This approval does not change DNS, email, legal content or search-indexing settings. No approved client quotations were supplied, so testimonials remain hidden on the live site; a separately labelled layout screenshot uses preview placeholders only.

See [PREVIEW.md](PREVIEW.md) for the simplest preview instructions, [REVIEW-NOTES.md](REVIEW-NOTES.md) for changes and verification, and [CODEX-HANDOFF.md](CODEX-HANDOFF.md) for the revised brief to share with Codex.

## Development

Use the existing checkout at `/workspace/website` with Node.js 24. Cloud tasks already have isolated workspaces; do not create a Git worktree unless explicitly requested.

```sh
npm run check
npm run dev
```

The development server listens on port 3000, with `PORT` available as an override. It serves only the website files and selected assets.

## Build

```sh
npm run build
```

This creates standalone English `dist/index.html` and German `dist/de/index.html` pages with the fonts, SVG architectural illustration, favicon, styles and JavaScript embedded. Each file opens directly in a browser. The hosted German address is `/de/`; language switching preserves interactive selections and updates the address. Core copy is rendered in each language before JavaScript runs. There are no third-party font/image requests, analytics or tracking scripts. Font licenses and exact package versions are retained under `assets`.

The output also retains the font license notices and contains Netlify headers and a redirect from the www domain to the chosen apex domain. Custom-domain configuration, DNS and HTTPS are separate steps. Search indexing stays disabled during review. When the site is ready for search indexing, build with `SITE_INDEXABLE=1 npm run build` before the corresponding deployment.

## Contact behavior

The displayed email address and direct mail links point to `general@consultix.solutions`. Without JavaScript the enquiry form stays hidden and direct email links remain available. This prevents the browser from submitting personal details as a page URL. With JavaScript, the enquiry form validates the inputs and prepares a `mailto` draft. Sending takes place in the visitor's email app. The site does not claim that a message has been delivered or submit personal data to a form backend. Email delivery and the owner's Zoho configuration require separate real-account checks.

## Validation

```sh
npm run check
npm run test:forecast
npm run test:metrics
npm run test:deploy
```

Browser checks exercise the built site over HTTP: both languages, 320–1920px layouts, mobile navigation and keyboard interaction, enquiry validation and encoded draft contents, clipboard behavior, language persistence, accessibility scans and absence of third-party requests. They also exercise the business-challenge finder, revenue-to-finance information flow, offer-to-enquiry links, genuine-feedback rendering safeguards and the forecasting interface. Forecast checks cover fixed actuals and budgets, rolling periods, current overhead continuity, annualised growth, variance breakdowns, loss scenarios and CSV export.

## Services and offers

The five public practices are Financial Planning & Management Reporting; Revenue Operations Management & CRM; Business Intelligence & Data Analytics; Revenue-to-Finance Alignment; and AI Enablement & Automation. RevOps now has its own full practice alongside CRM, not merely a subset of general operations. Business intelligence includes cross-functional finance, pipeline, customer and capacity information; the strategic Revenue-to-Finance practice addresses bookings, delivery, margins, recognised revenue, receivables, collections and forecast assumptions without offering regulated accounting or assurance services.

The paid entry offer is a Business Performance & Planning Review, with inputs, scope and fixed fee agreed before work begins. Focused offers now follow the five-practice order: Financial Planning & Management Reporting, Revenue Operations & CRM Improvement, Business Intelligence & Data Analytics, Revenue-to-Finance Alignment, and Practical AI & Workflow Pilot. Startup planning and ongoing support remain available with separately agreed scope.

No free audit, invented price, unverified certifications, guaranteed savings, statutory tax/investment/audit advice, or broad outsourced-CFO credentials are advertised. The challenge finder, audience guide, financial simulator, metric explorer, and revenue-to-finance flow remain available with hypothetical figures distinguished from outcomes.

## Bilingual content

`content.js` is the shared English/German copy source for `data-i` elements. `localise.js` renders both language pages at build time. `index.html` retains readable English template text; keep this consistent with `content.js` when changing the structure or copy. Calculator-specific copy remains in `forecast.js` and `metrics.js`. German uses formal Sie. An owner-arranged native-language editorial review remains useful before approving publication.

## Client feedback

The owner requested removal of the co-founder section on 29 October 2026. It is removed from the page, both language dictionaries and the associated styles. Do not restore the section from an older brief.

`approvedTestimonials` in `app.js` remains empty because the kit supplies no approved quotations. The entire section stays hidden until genuine approved records exist. Its manual carousel supports up to five records, one visible at a time, previous/next bounds, ArrowLeft/ArrowRight and Home/End navigation, translated status, reduced motion and stable selection across language changes. It does not auto-advance.

Each entry requires `approved: true`, `name`, bilingual `quote.en/de`, `context.en/de`, `source.label.en/de` and an explicit boolean `predatesConsultix`. Approval must cover the exact quotation, attribution, source, engagement context and both translations. Optional `title.en/de`, `company`, `source.url` and an actual integer `rating` from 1 to 5 are supported. A record about earlier founder work displays an explicit pre-Consultix label and still needs permission. Source links accept HTTPS only. Quotations and attributions use textContent. No default stars or platform badges are added.

Visible example engagement cards remain clearly labelled illustrative scopes. Transient automated-test fixtures never ship as website content.

## Metric explorer

`metrics.js` adds three independent, hypothetical EUR examples: gross margin, net revenue retention and cash runway. Inputs stay in the browser and never change the rolling forecast. Each example includes its formula, evaluated arithmetic, proportional input bars and limitations. Percentage results and months display to one decimal; calculations retain precision until formatting.

- Gross margin = (revenue − direct delivery costs) / revenue × 100. Default: (120,000 − 48,000) / 120,000 = 60.0%. Zero revenue is undefined; negative margins are allowed.
- NRR = (opening cohort MRR + expansion − contraction − churn) / opening MRR × 100. Default: (50,000 + 8,000 − 2,000 − 4,000) / 50,000 = 104.0%. New customers are excluded. Zero opening MRR and cohort losses above the opening base show explanations.
- Runway = available cash / (monthly cash payments − monthly cash receipts), only for positive, reasonably stable net burn. Default: 150,000 / (75,000 − 50,000) = 6.0 months. Zero/negative burn shows an explanation rather than an infinite or negative runway. This estimate does not replace a cash-flow forecast.

## Illustrative rolling forecast

The Strategic Finance section includes a dependency-free example in `forecast.js`. All data is hypothetical. Its selectable reporting cutoffs are March, June and September 2026; each selection shows three recent actual months and the next twelve forecast months, including the following calendar year. Summary cards distinguish year-to-date actuals from the twelve-month outlook.

The original budget starts with January 2026 revenue of EUR 100,000, 2% monthly growth, variable costs of 40% and monthly fixed overheads of EUR 42,000. Historical actuals are a separate fixed dataset. Forecasts start from the selected cutoff's actual revenue and apply adjustable monthly growth, variable-cost share and fixed-overhead adjustment. The overhead baseline is the latest actual month: EUR 42,500 in March, EUR 43,000 in June and EUR 44,000 in September. A zero adjustment carries that cost forward. The baseline and annualised growth are displayed beside the inputs. Scenario controls never revise actuals or the original budget. Values round to whole euros monthly.

Operating result is revenue minus variable costs and fixed overheads. The simplified example holds adjusted overheads constant and does not model seasonality, hiring, capacity constraints, cash collection/payment timing, financing or taxes. It must not be described as cash flow or a full client forecast. A real client model needs business-specific drivers. The interactive example includes a revenue/result chart, monthly budget variances and a variance breakdown for year-to-date actuals or the forward twelve months. Revenue effects add to the budget result; higher costs reduce it. Calculation notes and a CSV disclose the assumptions and latest actual cost baseline. The model runs entirely in the browser and does not collect or upload financial data. Without JavaScript, the service description remains available and the inactive example is hidden with an explanatory note.

`npm run test:forecast` checks the calculation module against independently calculated reference figures, horizon changes, cost/loss scenarios, overhead continuity, annualised growth, variance reconciliation, immutable actuals and budgets, invalid assumptions and CSV contents. Use a review branch while preparing changes and follow the owner's publishing authorisation. Keep the existing review `noindex,nofollow` setting until separately authorised to change it.

For optional browser validation, install the tools outside the checkout:

```sh
npm install --prefix /tmp/consultix-tools --cache /tmp/consultix-npm-cache --no-save --no-package-lock --no-audit --no-fund playwright axe-core
PLAYWRIGHT_MODULE=/tmp/consultix-tools/node_modules/playwright AXE_CORE_PATH=/tmp/consultix-tools/node_modules/axe-core/axe.min.js npm run test:browser
```

The tests use `/usr/bin/chromium` by default. `CHROMIUM_PATH` can select another installed Chromium executable. `CONSULTIX_SCREENSHOTS` can specify a screenshot output directory.

## Publishing

See [DEPLOYMENT.md](DEPLOYMENT.md). Earlier versions were published to `tinajanks-sketch/website` and connected to Netlify. The owner approved publication of this revision on 29 October 2026. Subsequent unrelated changes need their own applicable authorisation. Import the existing GitHub repository in Netlify, use branch `main`, build command `npm run build` and publish directory `dist`. The included `netlify.toml` already supplies those settings and Node.js 24. This route does not require a Netlify API token or activation of this chat's cloud-environment settings. A source-code upload alone does not configure hosting, DNS or HTTPS.

An optional API uploader is retained under `tools` for separately authorized API deployments. It uses the official `@netlify/open-api` 2.63.0 protocol. Unit tests simulate recovery and publication safeguards; they are not a live Netlify deployment test.

## Content for launch

No client statistics, testimonials, partnership credentials, legal entity details or team biographies are fabricated. The owner has chosen Consultix Solutions as the name; no independent trademark/name clearance is claimed. Add any applicable owner-supplied legal/privacy information before commercial launch. The requested contact address is configured, but its mailbox and delivery have not been verified from this workspace.
