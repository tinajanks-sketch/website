# Consultix Solutions

Independent English/German business website for `consultix.solutions`, based on the supplied brand guidelines and reference screenshots. Domain registrar: GoDaddy. Email provider selected by the owner: Zoho Mail. Enquiry address supplied by the owner: `general@consultix.solutions`.

The site uses plain HTML, CSS and JavaScript. It has no production package dependencies, website-builder subscription or application server requirement. Hosting-provider free-plan limits still apply; domain registration and email are separate services.

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

This creates a standalone `dist/index.html` with the fonts, SVG architectural illustration, favicon, styles and JavaScript embedded. There are no third-party font/image requests, analytics or tracking scripts. Font licenses and exact package versions are retained under `assets`.

The output also retains the font license notices and contains Netlify headers and a redirect from the www domain to the chosen apex domain. Custom-domain configuration, DNS and HTTPS are separate steps. Search indexing stays disabled during review. When the site is ready for search indexing, build with `SITE_INDEXABLE=1 npm run build` before the corresponding deployment.

## Contact behavior

The displayed email address and direct mail links point to `general@consultix.solutions`. The enquiry form validates the inputs and prepares a `mailto` draft. Sending takes place in the visitor's email app. The site does not claim that a message has been delivered or submit personal data to a form backend. Email delivery and the owner's Zoho configuration require separate real-account checks.

## Validation

```sh
npm run check
npm run test:forecast
npm run test:deploy
```

Browser checks exercise the built site over HTTP: both languages, 320–1920px layouts, mobile navigation and keyboard interaction, enquiry validation and encoded draft contents, clipboard behavior, language persistence, accessibility scans and absence of third-party requests. Forecast checks cover keyboard controls, fixed historical actuals, rolling periods, budget comparisons, loss scenarios, language switching and CSV export.

## Illustrative rolling forecast

The Strategic Finance section includes a dependency-free example in `forecast.js`. All data is hypothetical. Its selectable reporting cutoffs are March, June and September 2026; each selection shows three recent actual months and the next twelve forecast months, including the following calendar year. Summary cards distinguish year-to-date actuals from the twelve-month outlook.

The original budget starts with January 2026 revenue of EUR 100,000, 2% monthly growth, variable costs of 40% and monthly fixed overheads of EUR 42,000. Historical actuals are a separate fixed dataset. Forecasts start from the selected cutoff's actual revenue and apply adjustable monthly growth, variable-cost share and fixed-overhead adjustment. Scenario controls never revise actuals or the original budget. Values round to whole euros monthly.

Operating result is revenue minus variable costs and fixed overheads. It does not model cash collection/payment timing, financing or taxes, and must not be described as cash flow. The interactive example includes a revenue/result chart, monthly budget variances, calculation notes and a CSV containing the displayed monthly data and the selected assumptions. The model runs entirely in the browser and does not collect or upload financial data. Without JavaScript, the service description remains available and the inactive example is hidden with an explanatory note.

`npm run test:forecast` checks the calculation module against independently calculated reference figures, horizon changes, cost/loss scenarios, immutable actuals and budgets, invalid assumptions and CSV contents. The finance changes are prepared on a review branch; publishing this update requires the owner's approval. Keep the existing review `noindex,nofollow` setting until separately authorised to change it.

For optional browser validation, install the tools outside the checkout:

```sh
npm install --prefix /tmp/consultix-tools --cache /tmp/consultix-npm-cache --no-save --no-package-lock --no-audit --no-fund playwright axe-core
PLAYWRIGHT_MODULE=/tmp/consultix-tools/node_modules/playwright AXE_CORE_PATH=/tmp/consultix-tools/node_modules/axe-core/axe.min.js npm run test:browser
```

The tests use `/usr/bin/chromium` by default. `CHROMIUM_PATH` can select another installed Chromium executable. `CONSULTIX_SCREENSHOTS` can specify a screenshot output directory.

## Publishing

See [DEPLOYMENT.md](DEPLOYMENT.md). The owner has authorized publishing the source to `tinajanks-sketch/website` and connecting that repository to Netlify. Import the existing GitHub repository in Netlify, use branch `main`, build command `npm run build` and publish directory `dist`. The included `netlify.toml` already supplies those settings and Node.js 24. This route does not require a Netlify API token or activation of this chat's cloud-environment settings. A source-code upload alone does not configure hosting, DNS or HTTPS.

An optional API uploader is retained under `tools` for separately authorized API deployments. It uses the official `@netlify/open-api` 2.63.0 protocol. Unit tests simulate recovery and publication safeguards; they are not a live Netlify deployment test.

## Content for launch

No client statistics, testimonials, partnership credentials, legal entity details or team biographies are fabricated. The owner has chosen Consultix Solutions as the name; no independent trademark/name clearance is claimed. Add any applicable owner-supplied legal/privacy information before commercial launch. The requested contact address is configured, but its mailbox and delivery have not been verified from this workspace.
