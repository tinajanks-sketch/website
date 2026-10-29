# Preview the Consultix update

## Mineral Slate & Copper review preview — 29 October 2026

This review branch proposes a site-wide colour and typography update. It has **not** been merged into the live website.

- English preview: https://deploy-preview-3--consultixsolutions.netlify.app/
- German preview: https://deploy-preview-3--consultixsolutions.netlify.app/de/
- Review PR: https://github.com/tinajanks-sketch/website/pull/3
- Design documentation: [DESIGN-SYSTEM-2026.md](DESIGN-SYSTEM-2026.md)

Netlify reported a **successful deploy-preview** build for this branch. Source-level colour, contrast and structural checks passed. Full visual/browser accessibility testing and mobile screenshots have not been completed and should be checked before approval. The live domain remains unchanged by this preview.

Review both languages, the smaller desktop hero headline, the original Consultix logo, the brighter coral action button and 320px mobile layout, and try the forecast, KPI explorer, challenge selector and contact form. The new dark slate, warm ivory and muted copper scheme should feel consistent across all sections.

The update was prepared on `consultix-update-kit-review`; the owner approved publication on 29 October 2026. Opening the supplied preview files does not change consultix.solutions. The co-founder section is removed. A separate, clearly labelled testimonial-layout screenshot is a design preview, not published client feedback.

## Open the ready-made files

1. Open the supplied preview folder or ZIP. On Windows, extract the ZIP first.
2. Double-click `index.html` to open the English website in Chrome or Edge.
3. Use **DE** at the top to switch to German. You can also open `de/index.html` directly.
4. Try the challenge selector, business-type guide, metric examples, forecast controls and CSV download.

Keep the extension **.html**, not `.txt`. The files contain their own fonts, illustration, styles and scripts, so you do not need Node.js, a terminal or a paid website builder to view them. The testimonial section is intentionally absent because no approved quotations were supplied. Its code is ready for real feedback.

The enquiry form prepares an email draft; your email app sends it. Some browsers restrict clipboard actions on local files, so the visible email address can be selected and copied instead.

## Preview inside the development workspace

From `/workspace/website`:

```sh
npm run dev
```

The server uses port **3000**. Open that port in your workspace's preview interface, if available. The English path is `/` and the German path is `/de/`. A localhost address on your own Windows computer does not reach this cloud workspace.

To regenerate the standalone files after source edits, run `npm run build`. Use `dist/index.html` or `dist/de/index.html`.

## Approved publishing workflow

The existing Netlify project already builds GitHub's `main` branch. No new project, domain registration, token or DNS change is needed.

The owner approved this version on 29 October 2026. To publish it:

1. Commit and merge the reviewed changes into `main`, then push `main` to the existing GitHub repository.
2. In the existing Netlify project's **Deploys**, wait for that commit's production build to show **Published**. Its settings remain `npm run build`, `dist`, Node.js 24.
3. Open `https://consultix.solutions/` and `/de/`, then check the mobile menu, languages, tools and contact draft. On Windows, press **Ctrl+F5** if an older copy appears.

Use the existing Git workflow; the preview ZIP is for offline review. Search indexing, legal/footer content, contact address and domain settings are outside this update's publishing approval.

## Shorter-copy and editorial structure review
The same design preview now includes an additional editorial revision: shorter visible text, five expandable service summaries, scoped project-detail disclosures, shorter standard headings and no automatic heading hyphenation. Examine a long service title on desktop and on 320px mobile; verify that text wraps between words rather than breaking one in half. Open a service's *Scope and deliverables* panel and an offer's *What the project includes* panel to confirm all supporting information remains accessible. The interactive financial forecast and Revenue-to-Finance visual should still function independently of these panels. Do not publish this branch without approval.
