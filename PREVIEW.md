# Preview the Consultix update

This version is saved on `consultix-update-kit-review`. It has not been published. Opening a preview does not change consultix.solutions.

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

## Publish later, after approval

The existing Netlify project already builds GitHub's `main` branch. No new project, domain registration, token or DNS change is needed.

After the owner explicitly approves this version:

1. Commit and merge the reviewed changes into `main`, then push `main` to the existing GitHub repository.
2. In the existing Netlify project's **Deploys**, wait for that commit's production build to show **Published**. Its settings remain `npm run build`, `dist`, Node.js 24.
3. Open `https://consultix.solutions/` and `/de/`, then check the mobile menu, languages, tools and contact draft. On Windows, press **Ctrl+F5** if an older copy appears.

Do not drag the preview ZIP into the live Netlify project before approval: a manual production upload can replace the live website. Search indexing, legal/footer content, contact address and domain settings are outside this update's publishing approval.
