# AIOS visual identity — for marketing work

Sibling to `tone-of-voice.md` (how AIOS sounds) and `positioning-rules.md` (what AIOS may claim).
This is how AIOS **looks**, for campaign covers, social tiles, decks, and video.

**Authority:** `DESIGN.md` § Brand & Logo in `@aios-alpha/design` (source: the `aios-design` repo).
Where this file and that contract disagree, the contract wins and this file is stale — fix it.
Local copies of every asset live in `assets/`.

---

## The one rule

**The wordmark is never coloured.** One flat ink, always, in every context. No exceptions.

What varies is the *mark*, and only by context:

- **Product UI and chrome** — the app, the website, docs, anything a user works past — is
  **fully monochrome**. That's the product's job, not ours, but know the rule so you don't
  hand a designer the wrong asset.
- **Brand artwork** — what this repo makes: event covers, social tiles, post images, decks,
  video. Here the mark carries the **prism gradient** beside a flat-ink wordmark. That's the
  **display lockup**. On a black field it reads as a brand rather than as UI furniture.

The wordmark rule exists because it kept going wrong. A multicolour wordmark (gradient `A`, lime
`I`, white `OS`) was circulating on the link-preview card, a hand-drawn stroked chevron was used
on this repo's own campaign covers, and neither matched the site. All of it is retired.

## What to reach for

| Artwork | Asset |
|---|---|
| Wide canvas — banner, slide master, video lower-third, email header | `assets/aios-lockup-display-white.svg` (or `-black` on light) |
| Square-ish canvas — event cover, social tile, title card | `assets/aios-lockup-stacked-display-white.svg` |
| Somewhere the colour would fight the artwork — a busy photo, a coloured plate | the mono `assets/aios-lockup-white.svg` / `-stacked-white.svg` |
| Avatar, profile picture, favicon | `assets/aios-app-icon.svg` |
| A hero or sting where the logo is the whole image, ≥48px | `assets/aios-mark-prism.svg` |
| The symbol alone, where "AIOS" already appears in type nearby | `assets/aios-mark-white.svg` |

Use the `-white` / `-black` files in HTML, video editors, and anything that loads the SVG as an
image. The suffix-less files are `currentColor` and will render **black** through an `<img>` tag —
they're for inline SVG and CSS masks only.

## Type and colour

- **Instrument Serif**, weight 400 only — display headlines. Never faux-bolded, never the wordmark.
- **Instrument Sans** — body, UI, and the wordmark (600).
- **JetBrains Mono** — eyebrows, dates, metadata, labels.
- Canvas is matte near-black `#0b0b0b` (dark) or off-white `#fafaf8` (light). Never pure `#000`.
- Colour is rationed. A campaign asset should be greyscale plus, at most, one accent —
  a lime status dot, a violet ambient wash. If it needs a second, it doesn't.

## Video

- Lower-third and end card: `aios-lockup-display-white.svg` — gradient mark, flat white
  wordmark. No glow, no drop shadow, and **no animated gradient sweep across the letterforms**;
  the wordmark stays one flat ink even in motion.
- If you want the gradient in motion, it's the **bare mark** that carries it, alone, on a dark
  field — a sting, then cut. Not a gradient wipe over type.
- Keep one mark per frame. Mark plus wordmark plus a repeated mark in the corner is three logos.

## Don't

- Don't recolour the wordmark, per-letter or otherwise. The gradient belongs to the mark.
- Don't use a display lockup in a product screenshot or UI mockup — interfaces are monochrome.
- Don't redraw the mark. There is no situation where hand-drawing a chevron is correct.
- Don't set `AIOS` in Instrument Serif as a wordmark — that's a headline face, not the logo.
- Don't put the logo on a busy photo without a solid or scrimmed plate behind it.
- Don't add glow, drop shadow, outline, or stroke to any brand asset.
- Don't generate a logo with an image model. Composite the real vector over generated artwork.

## Clear space and minimum size

One mark-height of empty space on all four sides. Nothing enters it. Minimum: lockup 96px wide,
bare mark 16px, prism mark 48px (the app icon is exempt — it's drawn for small raster sizes).
