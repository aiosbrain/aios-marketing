---
name: applicant-pipeline
description: Spec-only stub for the applicant-review automation (Gmail watch, Firecrawl profile lookups, semi-automated approve/deny drafts, drip sender). NOT IMPLEMENTED. Use when asked about automating event application review, Firecrawl lookups on applicants, or sending the drip sequence automatically — this skill points to the spec, it does not do the work.
version: 0.1.0
access: team
triggers:
  - applicant pipeline
  - application review automation
  - automate event applications
---

# applicant-pipeline (spec-only stub)

**This skill is not implemented.** The applicant-review pipeline — watching Gmail for
new Lu.ma applications, enriching each one via Firecrawl (site + LinkedIn + X),
generating a draft approve/deny response for John to review and edit, and sending the
drip sequence with a human-approval gate at every step — is captured as a full spec in
`docs/linear-spec-applicant-pipeline.md` and tracked as
[AIO-634](https://linear.app/je4light/issue/AIO-634/applicant-review-pipeline-gmail-firecrawl-human-approved-drip)
on the AIOS Linear board.

**Do not wire any piece of this up ad hoc.** If you're asked to build part of it,
build against the spec (or update the spec first if it's wrong/incomplete), and check
whether a Linear issue already tracks it before creating a new one.

Building blocks the spec calls for reusing (see the spec for the full detail): the
`gog-workspace` skill's confirm-before-send Gmail flow, the `firecrawl-direct` skill's
extraction pattern extended to multi-URL lookups, the `wa-cli-digest` skill's
allowlist-gated `wacli` for any WhatsApp touches, and the hermes cron "watch-script"
pattern for polling. None of these are connected to each other yet.

When this pipeline is eventually built, replace this file with the real skill and move
this stub's content into a "status: implemented" note or delete it.
