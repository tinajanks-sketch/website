# Version D — restrained interaction polish

This version retains the current editorial layout while adding a blurred navbar
after scrolling, small hover shifts and progressive scroll entry. Motion respects
the visitor's reduced-motion preference and content remains readable without
JavaScript.

The mobile slide-out menu includes an explicit close button, backdrop dismissal,
Escape support, focus trapping/restoration and an inert background while open.
Mobile primary CTAs fill their row and form controls have generous touch targets.

All shared copy, offers, original brand assets, bilingual paths, calculations and
contact routing are preserved. There are no invented statistics or testimonials.

```sh
npm run build:d
```

Open `design-d/dist/index.html` or `design-d/dist/de/index.html`. This alternative
does not change the production build or Netlify configuration. Read
`../DESIGN-COMPARISON.md` for verification and the documented owner-selected
white-on-bright-orange contrast exception.
