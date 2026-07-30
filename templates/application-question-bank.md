---
status: final
owner: john
type: Deliverable
---

# Application question bank

Reusable categories for any future application-gated AIOS event. Pick the ones that
fit, adjust the specific wording (segments, dates, location) per campaign — see
`campaign-folder/application-questions.md.tmpl` for the fill-in-the-blank version, and
`2-work/campaigns/2026-08-05-aios-onboarding-ubud/application-questions.md` for a
filled example.

## Categories (in the order they usually work best)

1. **Identity** — name, email.
2. **Firecrawl-enabling identity** — a required LinkedIn or website URL. Required, not
   optional, if the applicant-pipeline (see `docs/linear-spec-applicant-pipeline.md`)
   is going to enrich the application before review.
3. **Technical-bar / segment self-ID** — a multiple-choice question mapping to
   `0-context/audience-segments.md`'s current segments for the event in question,
   plus an open "other, tell us why" catch-all. Never hard-gate at the form level —
   screening happens in review.
4. **Motivation** (open text) — "what are you hoping to walk away with?" Doubles as
   future testimonial/recap material (subject to the content-consent question below).
5. **Current state** (open text) — what they're already doing in the relevant problem
   space. Calibrates the session and is useful signal for AIOS itself.
6. **Referral source** — where they heard about it, as a short list of the actual
   channels used for that campaign plus "other."
7. **Content consent** (checkbox, required to submit) — explicit, plainly worded,
   never implied or buried. Required if there's any intent to photograph/film/quote.
8. **Attendance confirmation** — yes/no for the actual date/time/format, before any
   private logistics (address, dial-in, etc.) are ever disclosed.
9. **Access/logistics needs** (open text, optional) — dietary, accessibility, or
   equivalent, scoped to what the event actually involves.

## Hard rule

**The exact private venue/location is never a form field.** It's disclosed only after
acceptance, through a private one-to-one channel, and it never gets written into any
file that's committed to this repo.
