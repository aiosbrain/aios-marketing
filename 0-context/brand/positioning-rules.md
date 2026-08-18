---
status: final
owner: john
type: Deliverable
---

# Positioning rules

Distilled from `aios-website/docs/ENGINEERING-CONSTITUTION.md` §1 and
`aios-website/CLAUDE.md`. These apply to every piece of copy this repo produces —
event listings, social posts, emails, decks, everything.

## Hard rules

1. **Document only the current tagged release.** No unreleased capabilities, no
   roadmap items presented as available today. If a feature isn't shipped, don't
   imply it is — "coming" is fine, "here" is not.
2. **No engagement/participant stats.** Never cite attendee counts, "X companies,"
   user counts, or similar numbers in public copy — regardless of whether the number
   is technically true or impressive. This is a hard rule, not a judgment call.
3. **"Two repos, one system," never three.** The product is `aios-workspace` (the
   individual workspace toolkit) + `aios-team-brain` (the one shared hub). Don't
   describe a third moving part as core to the pitch — `aios-website` and
   `aios-design` are infrastructure around the product, not the product itself.
4. **Comparison stays generic.** Frame value against "plain tools" or "what you'd do
   without AIOS" — never name or benchmark against specific competing products.
5. **Honesty over overselling.** AIOS's own pitch deck has an explicit "unsolved
   problems" slide (context overload, contribution incentives, governance, trust in
   autonomous agents, schema/staleness). Marketing copy should carry that same
   ethos — admit limits, don't oversell. This builds more trust with a technical
   audience than a polished, gap-free pitch would.
6. **Open source, self-hosted, "you decide what leaves your machine."** This is the
   core trust proposition — no cloud lock-in, no forced data sharing. Keep this
   framing intact whenever describing what AIOS is.

   **Lead with the guarantee, not the licence name.** The promise is *you keep
   everything, we can't take it away*. "Open source" and "self-hosted" carry that;
   a licence name is supporting evidence, not the pitch. Say "open source" by
   default and name the licence only where someone is actually asking what the
   terms are.

   **When you do name it: the server is AGPL-3.0, the SDKs and connectors are
   Apache-2.0.** Never write "MIT-licensed" — that was true until the relicense and
   is now false. Two things to say alongside it, because they are what the name
   makes people wonder: **running AIOS inside your company is completely
   unrestricted**, and if a company's policy bans AGPL there is a **free commercial
   licence for internal use** (cn@fluora.ai). An AGPL ban should never be why
   someone can't try AIOS.

   AGPL is OSI-approved and FSF-listed as free software. It is open source and we
   say so plainly — that is precisely why we chose it over BUSL or SSPL.

## What this means for event copy specifically

- An event listing can say "come build with people doing this for real" — it can't
  say "join 40 founders already using AIOS" (stat) or "the only AI onboarding event
  in Bali" (unverifiable superlative).
- Application-gating language should read as selective-for-quality ("we want to keep
  this small and hands-on"), not exclusionary or hype-driven ("elite founders only").
- Never present the applicant-review/drip pipeline described in
  `docs/linear-spec-applicant-pipeline.md` as built or live until it actually is.
