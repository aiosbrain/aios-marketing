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

## Default: 3-5 questions, not more

Every question is friction. Default to the 5 core categories below; only add from the
"situational" list if the campaign genuinely needs it — don't reach for the full bank
just because it exists.

## Core (use these five, cut nothing further without a reason)

1. **Identity** — name, email.
2. **Firecrawl-enabling identity** — a required LinkedIn or website URL. Required, not
   optional, if the applicant-pipeline (see `docs/linear-spec-applicant-pipeline.md`)
   is going to enrich the application before review.
3. **Technical-bar / segment self-ID** — a multiple-choice question mapping to
   `0-context/audience-segments.md`'s current segments for the event in question,
   plus an open "other, tell us why" catch-all. Never hard-gate at the form level —
   screening happens in review.
4. **Motivation** (open text) — "what are you hoping to walk away with?" Let this one
   question carry motivation, current-state, and future-testimonial signal at once
   (people naturally reveal what they're doing today when they say what they want
   next) — don't split it into three questions.
5. **Content consent** (checkbox, required to submit) — explicit, plainly worded,
   never implied or buried. Required if there's any intent to photograph/film/quote.

## Situational — add only if the campaign specifically needs it

- **Referral source** — only if you're running enough parallel channels that you
  genuinely need to know which one worked; otherwise trust Lu.ma's own traffic
  source and skip the field.
- **Attendance confirmation** — usually redundant (applying to a dated event already
  implies availability); add only for an unusually long-lead or loosely-scoped event.
- **Access/logistics needs** (dietary, accessibility) — ask this in the *acceptance*
  email to the smaller confirmed group, not on the application form every applicant
  has to fill out.

## Hard rule

**The exact private venue/location is never a form field.** It's disclosed only after
acceptance, through a private one-to-one channel, and it never gets written into any
file that's committed to this repo.
