# Preview the Consultix update

## Latest section and carousel review — 30 October 2026

Continue on `consultix-editorial-refinement`. The owner requested distinct section
colours, the business-type guide visible on the main page and image-based
qualifications near the end. See `STRUCTURE-REVIEW-2026-10-30.md`. Screenshots are in
`/workspace/exports/structured-review-2026-10-30/`. Run `npm run build` for current
standalone English/German HTML. Qualification pictures are original editorial
illustrations; actual issuer badges have not been supplied or retrieved. This is
still a review draft; `main` and the live site have not been changed.

## Latest editorial review draft — 30 October 2026

The current review branch `consultix-editorial-refinement` proposes more natural
English/German copy, compact project rows, services and offers earlier in the page,
and optional detailed guides. The existing palette has clearer section roles,
with fewer decorative effects. The production branch remains unchanged. See
`EDITORIAL-REVIEW-2026-10-30.md` for changes, before/after measurements and review
instructions. Screenshots are in
`/workspace/exports/editorial-refinement-2026-10-30/`. Run `npm run build` to create
the standalone English and German preview pages.

## Approved homepage simplification — 30 October 2026

Prepared on `remove-homepage-forecast`, starting from published commit `73a4ee9`. The owner requested removal of the large rolling P&L example and supplied Microsoft and FPAC qualification titles for a compact credentials strip. The current build removes that complete widget from both languages, uses “HubSpot certified” and “Acumatica certified”, shortens repeated introductory text and keeps the remaining KPI examples behind an optional disclosure. It preserves the latest slate-and-copper design and finance service details. It also corrects the primary-button arrow so it does not depend on a system-font glyph.

Build with `npm run build`. Open `dist/index.html` or `dist/de/index.html`, or use `npm run dev` and the workspace’s port-3000 preview. A localhost address on your own Windows computer does not reach the cloud workspace.

Screenshots for this revision are in `/workspace/exports/approved-homepage-2026-10-30/`. There is no new public deploy-preview URL until a real GitHub pull request and successful Netlify preview build are confirmed. Do not reuse the older PR-3 preview link as though it contains this change.

The remaining finance-service disclosure, challenge finder, performance lens, revenue flow, audience guide, metric explorer and contact draft should remain usable in both languages. No approved client quotations have been supplied. The qualifications strip includes the owner-supplied Microsoft Certified: Power BI Data Analyst Associate and Certified Corporate FP&A Professional (FPAC) titles. HubSpot and Acumatica certification are listed generically at the owner’s request, without IDs, names or unconfirmed levels. No company partnership status or recreated issuer badges are shown.

## Publication

The owner explicitly approved publishing this refinement on 30 October. Keep the existing Netlify project, domain/DNS, Zoho records, contact email and indexing configuration. GitHub PR APIs remain unavailable here; the approved update uses the existing Git-connected production route. Verify the pushed commit and report Netlify/live verification separately. Do not claim a successful deployment from the source push alone.
