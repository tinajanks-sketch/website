# Fewer repeated calls to action

The owner asked to reduce unnecessary CTAs on the published site and in the new
design preview. This change is intended for the current live layout; it does not
publish the separate Version E redesign.

## Current website

Removed 22 repeated enquiry links:

- Five “Discuss this service” links under the practices.
- Five project-specific “Discuss…” links in the offers list.
- Three enquiry links in the business-type guide.
- Five repeated review requests in the optional challenge guide.
- The startup, ongoing-support, revenue-to-finance and financial-planning enquiry
  links that duplicated the main contact routes.

The header contact action (desktop/mobile alternatives), hero action, one paid
review request and final contact section remain. Links targeting `#contact` are
reduced from 26 to 4 in the HTML; the two header links are responsive alternatives
for the same placement. All nine enquiry topics remain selectable in the form,
and the paid-review button still preselects its topic.

Useful navigation and controls remain: links to more detailed service information,
native service/offer disclosures, business/challenge selectors, the flow guide,
KPI examples, qualifications carousel, language controls, email copy and form
submission. Service copy, offers, financial calculations, legal/privacy text,
noindex, fonts, branding and Netlify/domain/email settings are unchanged.

## Version E

The separate mockup uses the same restrained contact hierarchy. Five service email
links and the additional ongoing-support email link are removed. Its hero/header,
one review request and final email link remain. The new design remains a preview.

## Verification

The shared syntax and 17 positioning/design/layout checks pass, as do 14 archived
forecast tests, 11 KPI tests and 3 deployment-helper tests. All 241 browser checks
pass. The browser suite checks
the remaining review action, all nine form topics, draft encoding, both languages,
responsive layouts, navigation, disclosures and existing interactive features.

Focused EN/DE desktop/mobile screenshots confirm the cleaned-up practices, offers
and business guide have no repeated enquiry links or page overflow. Version E's
132 focused checks pass at 320–1920px. The existing owner-selected orange/white
contrast exception remains documented; no broader accessibility rule is disabled.

Production publication uses the existing GitHub main → Netlify workflow. Public
HTTPS checks from this environment are blocked by its proxy (403), so source
publication and independently verified Netlify completion must be reported
separately.

Review artifacts: `/workspace/exports/consultix-fewer-ctas-2026-10-31/`.
