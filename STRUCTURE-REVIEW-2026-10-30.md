# Section structure, business-type guide and qualification carousel

Review branch: `consultix-editorial-refinement`.
The owner approved publication of this editorial Version 1 on 31 October 2026,
with white text on deeper-orange buttons. The owner asked for more distinction between sections, the visible
business-type explanation, image-based qualifications near the end and a modern,
professional presentation similar in polish to a Wix design.

The owner's subsequent geographic edit replaces Germany/the Balkans with
**Europe and the US** throughout the English audience copy and **Europa und die
USA** in German, including the optional audience closing text.

## Current page structure

1. Slate architectural hero; existing logo and fonts.
2. Mineral-blue **Who we help** band, with a link to business-type support.
3. White **What we do** section; the five service names and order are preserved.
4. Mineral-mist **How we help your type of business**, visible on the main page.
   Startup, SaaS and service-business/SME choices retain their questions, potential
   work, deliverables, measures and relevant enquiry routing.
5. Ivory offers: paid review, focused project and ongoing support.
6. Slate process section.
7. Optional deeper guides and examples, followed by About and sample briefs.
8. White image-based professional qualifications carousel, near the end.
9. Contact and footer. Genuine testimonials remain hidden until supplied.

The former text-only qualification strip no longer separates audience and services.
The business-type guide is no longer hidden inside the optional guide disclosure.
Without JavaScript all three business-type panels can be read, while inactive
selector controls are hidden.

## Qualification artwork

The carousel uses the four exact owner-supplied qualification descriptions with
original editorial illustrations. The illustrations are not official badges,
issuer logos or certificate scans. No IDs, individual holders, certification
levels, company partnerships or results have been added.

Attempts to retrieve official Microsoft, AFP, HubSpot and Acumatica artwork were
blocked by the environment proxy (`Tunnel connection failed: 403 Forbidden`).
Actual owner-provided badge/certificate images can replace these illustrations.
See `assets/QUALIFICATION-ARTWORK.md` for the asset boundary.

The carousel supports previous/next buttons, horizontal touch/trackpad scrolling,
ArrowLeft/ArrowRight and Home/End keys. It has a translated visible-range status,
no autoplay, reduced-motion handling and an accessible scrollable fallback without
JavaScript. Qualification images, fonts and other artwork are embedded in both
standalone production builds; no external assets or runtime libraries are added.

## Preview

Run `npm run build`; open `dist/index.html` or `dist/de/index.html`.
The current review captures are in
`/workspace/exports/structured-review-2026-10-30/`, including desktop/mobile
English/German full pages, the three business-type states and qualification cards.
The earlier 40%/30% editorial measurements describe the previous draft, before
restoring the prominent guide and adding the image carousel.

The source preview server now allowlists the four new SVGs. Netlify settings,
noindex, DNS, email, legal text and financial calculation modules are unchanged.

## Verification

Completed for this revision:

- `npm run check`: syntax and all 17 positioning/design/content-layout tests pass.
- `npm run build`: standalone English and German pages include all four SVGs.
- `npm run test:forecast`: 14 archived-model tests pass; the simulator stays offline.
- `npm run test:metrics`: all 11 active calculation tests pass.
- `npm run test:deploy`: all three helper tests pass, without a live deployment.
- `npm run test:browser` with screenshots: **235 functional checks pass**, with
  desktop/mobile WCAG A/AA scans, no browser exceptions and no external requests.
  Coverage includes distinct backgrounds, guide visibility, decoded images,
  carousel boundaries, keyboard operation, language preservation and all three
  business types without JavaScript.
- Additional browser checks: **31 pass** for carousel controls, Home/End,
  horizontal-wheel scrolling, overflow and status across 320/390/768px in both
  languages, plus the normal-motion transition.
- Desktop and mobile English/German screenshots reviewed for the audience band,
  business-type guide and qualifications carousel. The screenshot review reports
  no page errors or horizontal overflow.

The approved source is published through GitHub main → Netlify. Verify and report the remote main commit separately from a finished Netlify/live deployment. A separate Version 2 has been requested for comparison, not production replacement.
