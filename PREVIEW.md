# Preview the Consultix update

## Homepage forecast removal — 30 October 2026

Prepared on `remove-homepage-forecast`, starting from published commit `73a4ee9`. The owner requested removal of the large rolling P&L example and supplied Microsoft and FPAC qualification titles for a compact credentials strip. The current build removes that complete widget from both languages, while preserving the latest slate-and-copper design and the remaining finance service details. It also corrects the primary-button arrow so it does not depend on a system-font glyph.

Build with `npm run build`. Open `dist/index.html` or `dist/de/index.html`, or use `npm run dev` and the workspace’s port-3000 preview. A localhost address on your own Windows computer does not reach the cloud workspace.

Screenshots for this revision are in `/workspace/exports/homepage-refinement-2026-10-30/`. There is no new public deploy-preview URL until a real GitHub pull request and successful Netlify preview build are confirmed. Do not reuse the older PR-3 preview link as though it contains this change.

The remaining finance-service disclosure, challenge finder, performance lens, revenue flow, audience guide, metric explorer and contact draft should remain usable in both languages. No approved client quotations have been supplied. The qualifications strip uses only the exact Microsoft Certified: Power BI Data Analyst Associate and Certified Corporate FP&A Professional (FPAC) titles supplied by the owner. Credential holders and the exact HubSpot/Acumatica titles remain pending. No company partnership status or recreated issuer badges are shown.

## Publication

Keep the existing Netlify project, domain/DNS, Zoho records, contact email and indexing configuration. Use the repository’s separate review-PR workflow. Report the actual PR and build status; do not claim the live site has changed before publication is confirmed.
