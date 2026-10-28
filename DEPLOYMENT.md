# Put Consultix Solutions online

The final website address is **https://consultix.solutions/**. Netlify supplies a temporary address ending in `.netlify.app` before the custom domain is connected.

## What each account does

| Account | Its job |
| --- | --- |
| GitHub: tinajanks-sketch/website | Stores the website files |
| Netlify | Builds and hosts the website |
| GoDaddy | Keeps the domain registration and DNS |
| Zoho Mail | Handles general@consultix.solutions |

The owner has authorized the GitHub upload and Git-connected Netlify route. That route does not use a Netlify personal access token or require saving/publishing the cloud environment attached to this chat. This project has not purchased or cancelled any account or plan.

## Step 1: connect GitHub to Netlify

1. Open your Netlify dashboard: https://app.netlify.com/teams/kristina-janks/projects
2. Choose **Add new project** and the option to **import an existing project**.
3. Choose **GitHub**.
4. If GitHub asks for permission, authorize Netlify to access the `website` repository. Selecting only that repository is enough for this site.
5. Select **tinajanks-sketch/website**.

## Step 2: deploy the website

The repository includes `netlify.toml`, so Netlify should detect these values:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Base directory | Leave empty |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js | `24` |

Use an appropriate hosting plan, such as Netlify's Free plan within its current limits. Start the deployment and wait for Netlify to show a successful production deployment. Open the actual address Netlify gives you and check the homepage, mobile menu, English/German switch and contact options. Do not assume a particular `.netlify.app` name before Netlify assigns it.

## Step 3: attach consultix.solutions

1. Open the deployed project's domain settings in Netlify.
2. Choose the option to add a domain you already own.
3. Enter **consultix.solutions** and use it as the primary domain.
4. Include **www.consultix.solutions** as an alias if desired.
5. Use the exact DNS targets displayed by that configured project.

In GoDaddy, open **My Products → consultix.solutions → DNS** and apply those website records. The exact A/CNAME targets must come from Netlify's current instructions. Do not guess a project hostname or copy an old example IP address.

Keep all Zoho MX records and necessary verification, SPF, DKIM and DMARC TXT records. Website and mail records can coexist. Changing the website destination does not require replacing email records. If a nameserver migration is genuinely required, preserve and verify every required record as part of that separate migration.

## Step 4: check the real address

Allow the DNS changes to propagate, then confirm:

- https://consultix.solutions/ shows the new website with a valid HTTPS certificate.
- www redirects to the primary domain if configured.
- Both languages, mobile navigation and contact draft preparation work.
- A real test email can be received and answered through the Zoho mailbox.

The form prepares a draft in the visitor's email app; the visitor sends it from there. The website does not claim to deliver the message itself.

Search indexing is disabled in the review build. When public content and any applicable owner-supplied legal/privacy details are ready, set Netlify's build environment variable `SITE_INDEXABLE` to `1` and redeploy. This is a normal Netlify build setting, unrelated to the failed cloud-environment editor in this chat.

## Optional API route for developers

`tools/deploy-netlify.py` remains available for a future API workflow. It requires a securely injected `NETLIFY_AUTH_TOKEN` and appropriate network access. Its default behavior creates and verifies a preview; `--publish` additionally publishes that version. Unit tests simulate recovery and publication safeguards; no live API deployment has been performed. The token is not required for the Git-connected route described above.
