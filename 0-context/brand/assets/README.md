# Brand assets — copies, not originals

Every `.svg` here is a verbatim copy of `@aios-alpha/design/brand/*`. The design system owns
them; this repo keeps a local copy because campaign artwork is built with plain HTML and a
headless browser, with no npm install in the loop.

**Read `../visual-identity.md` before using any of them.** The one rule that matters: the logo is
monochrome, and the prism gradient is allowed on the bare mark only.

To resync after an `aios-design` release, copy `dist/brand/*.svg` from that repo over this
directory. Do not edit an SVG here, and do not add a new one — if you need artwork this set
doesn't cover, that is a change to `aios-design/brand/src/`.

| File | Use |
|---|---|
| `aios-lockup-white.svg` / `-black.svg` | **Default.** Horizontal mark + wordmark, for wide artwork, video lower-thirds, slide masters. |
| `aios-lockup-stacked-white.svg` / `-black.svg` | Square-ish canvases — event covers, social tiles, title cards. |
| `aios-mark-white.svg` / `-black.svg` | The symbol alone, where "AIOS" is already in adjacent type. |
| `aios-app-icon.svg` | Square prism app icon — profile pictures, favicons, avatars. |
| `aios-mark-prism.svg` | The bare gradient mark, ≥48px. The only sanctioned colour treatment. |
| `*.svg` without an ink suffix | `currentColor` versions — for inline SVG and CSS masks only; they render black through `<img>`. |
