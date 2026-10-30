# Preview the Consultix update

## Approved homepage simplification — 30 October 2026

Prepared on `remove-homepage-forecast`, starting from published commit `73a4ee9`. The owner requested removal of the large rolling P&L example and supplied Microsoft and FPAC qualification titles for a compact credentials strip. The current build removes that complete widget from both languages, uses “HubSpot certified” and “Acumatica certified”, shortens repeated introductory text and keeps the remaining KPI examples behind an optional disclosure. It preserves the latest slate-and-copper design and finance service details. It also corrects the primary-button arrow so it does not depend on a system-font glyph.

Build with `npm run build`. Open `dist/index.html` or `dist/de/index.html`, or use `npm run dev` and the workspace’s port-3000 preview. A localhost address on your own Windows computer does not reach the cloud workspace.

Screenshots for this revision are in `/workspace/exports/approved-homepage-2026-10-30/`. There is no new public deploy-preview URL until a real GitHub pull request and successful Netlify preview build are confirmed. Do not reuse the older PR-3 preview link as though it contains this change.

The remaining finance-service disclosure, challenge finder, performance lens, revenue flow, audience guide, metric explorer and contact draft should remain usable in both languages. No approved client quotations have been supplied. The qualifications strip includes the owner-supplied Microsoft Certified: Power BI Data Analyst Associate and Certified Corporate FP&A Professional (FPAC) titles. HubSpot and Acumatica certification are listed generically at the owner’s request, without IDs, names or unconfirmed levels. No company partnership status or recreated issuer badges are shown.

## Publication

The owner explicitly approved publishing this refinement on 30 October. Keep the existing Netlify project, domain/DNS, Zoho records, contact email and indexing configuration. GitHub PR APIs remain unavailable here; the approved update uses the existing Git-connected production route. Verify the pushed commit and report Netlify/live verification separately. Do not claim a successful deployment from the source push alone.
