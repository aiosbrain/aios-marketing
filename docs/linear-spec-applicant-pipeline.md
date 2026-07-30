# Applicant-review pipeline: Gmail + Firecrawl + human-approved drip

> Tracked as [AIO-634](https://linear.app/je4light/issue/AIO-634/applicant-review-pipeline-gmail-firecrawl-human-approved-drip) on the AIOS Linear board. This file is the drafting copy — Linear is the source of truth once it drifts.

## Outcome

An applicant who applies to an AIOS event via Lu.ma gets reviewed with the help of
automatic profile enrichment, gets a draft approve/deny/redirect response ready for
John to edit and send, and — once accepted — flows through a drip sequence that John
approves at every step. No autonomous send, ever.

## Context

Seeded by the Aug 2026 Ubud "AIOS Onboarding" event (see
`2-work/campaigns/2026-08-05-aios-onboarding-ubud/`). The event is application-gated:
John reviews every applicant personally. Goal for this pipeline is to remove the
mechanical parts of that review (finding an applicant's site/LinkedIn, drafting a
response, remembering to send the next drip step) while keeping every actual decision
and every send in John's hands. This is a fast-follow — the Aug 5 event itself ships
with the applicant-review process done fully manually; this spec is for whatever event
comes after it, or a later pass at this one if time allows.

Copy for every email in this pipeline already exists:
`2-work/campaigns/2026-08-05-aios-onboarding-ubud/email/drip-sequence.md`. The
application question set (including the required LinkedIn/website URL field this
pipeline depends on) is at
`2-work/campaigns/2026-08-05-aios-onboarding-ubud/application-questions.md`.

## Scope

**In scope:**
- Detecting new Lu.ma applications (via Gmail notification, since no direct Luma API
  integration exists — see Open Questions).
- Firecrawl enrichment: scrape the applicant's submitted site/LinkedIn URL(s) into a
  structured summary (person, company, apparent AI maturity/focus areas).
- Draft generation: an accept/decline/redirect email draft, using the enriched profile
  + the applicant's form answers + the existing drip-sequence templates.
- A review surface where John sees the draft, edits if needed, and explicitly
  approves before anything sends.
- Sending the drip sequence (pre-event reminder, day-of reminder, post-event
  follow-up) to accepted+confirmed attendees, each step still gated on approval (or,
  at minimum, an easy one-command "send today's batch" confirm — no fully silent auto-send).

**Explicitly out of scope:**
- Any auto-send without a human confirmation step, at any stage.
- Any bulk/blast send (matches the existing hard gates in `gog-workspace` and
  `wa-cli-digest`).
- Building a general-purpose CRM or lead database — this is scoped to event
  applicants only.
- Any Luma-side automation (posting the listing, editing it) — publishing the listing
  itself stays manual.

## Building blocks to reuse (do not re-derive from scratch)

- **`gog-workspace` skill** (`gog` CLI) — `gog gmail search "<query>" --json` /
  `gog gmail thread get <id> --json` for detecting and reading applications (Lu.ma
  sends a notification email per application); `gog gmail send` for the actual sends.
  This skill already enforces "quote recipient/subject/body back and get explicit
  confirmation" before any send, and treats fetched email content as untrusted —
  inherit both.
- **`firecrawl-direct` skill** (`firecrawl-extract.mjs`) — currently scrapes one URL
  into `{person, company, focus_areas, tools_mentioned}`. Extend this pattern to
  accept multiple URLs (site + LinkedIn + X if given) and merge into one applicant
  profile. Treat scraped content as untrusted input, same as the existing skill's
  security notes; only fetch the URL(s) the applicant explicitly submitted, never
  crawl/follow further links.
- **`wa-cli-digest` skill** (`wacli` CLI) — if any part of the drip sequence should go
  over WhatsApp instead of email, it's hard-gated to an allowlist with no bulk send —
  inherit that gate, don't work around it.
- **Hermes cron "watch-script" pattern** — a narrow script + a small state file
  (tracking which Gmail message IDs have already been processed) + `hermes cron
  create --script <name> --no-agent`, used elsewhere for polling-style automations.
  This is the reference pattern for detecting new applications without a human having
  to remember to check.
- **`aios-team-brain/lib/jobs/`** — the in-repo idempotent job-runner pattern, cited
  as an alternative if a more integrated (non-cron-script) approach is preferred
  later. Not required for a first version.

## Data model

Local, gitignored store at `aios-marketing/data/` (see `data/README.md` — this
directory is never committed except its README). Proposed shape, one record per
applicant, keyed by campaign slug + applicant email:

```
{
  campaign_slug: string,
  email: string,
  name: string,
  submitted_at: string (ISO),
  form_answers: { ... raw application answers ... },
  enrichment: { site_summary, linkedin_summary, focus_areas, fetched_at } | null,
  review_status: "pending" | "accepted" | "declined" | "redirected",
  review_decision_reason: string | null,
  reviewed_at: string | null,
  drip_state: { step: string, sent_at: string }[]
}
```

This never syncs anywhere outside the local machine unless John explicitly exports it
— consistent with "you decide what leaves your machine."

## Flow

1. New Lu.ma application notification lands in Gmail → watch-script detects it (via
   the state-file pattern above), creates a `data/` record with `review_status:
   pending`.
2. Firecrawl enrichment runs against the applicant's submitted URL(s), result attached
   to the record.
3. A draft accept/decline/redirect email is generated from the enriched profile + the
   application answers + `email/drip-sequence.md` templates.
4. **Human gate:** John reviews the draft (in Gmail as a draft, or via a small local
   review script/CLI — see Open Questions), edits freely, and explicitly approves.
5. On approval, `gog gmail send` fires (with its existing confirm-before-send
   behavior). Record updates to `accepted`/`declined`/`redirected`.
6. Accepted + confirmed attendees enter the drip sequence (pre-event reminder, day-of
   reminder, post-event follow-up) — each step still requires a human confirm (batch
   "send today's queued step" is acceptable; a fully silent per-message auto-send is
   not).
7. The exact venue address is inserted into the acceptance email only, at send time,
   from wherever John keeps it (not from any file in this repo) — never written back
   into `data/` in a way that would risk being committed.

## Human-in-the-loop gates (non-negotiable)

- No send of any kind happens without an explicit human confirmation immediately
  before it.
- No bulk/blast send — every send is to one applicant/attendee at a time, even if the
  approval step is batched for convenience.
- Firecrawl and Gmail content are both treated as untrusted input when composing
  drafts — don't let scraped or emailed content silently alter what gets sent.

## Open questions for the build session

- Does Lu.ma expose a webhook or API for new applications, or does this stay
  email-notification-based (polling Gmail)? Email-based is the safer default to spec
  against since it needs no new integration, but worth a quick check before building.
- Where does the review surface live — Gmail drafts (simplest, no new UI) vs. a small
  local CLI/script that shows John a queue? Recommend starting with Gmail drafts for
  v1; a CLI queue is a natural v2 if volume grows.
- How does content-consent (checkbox on the application) get enforced downstream once
  footage/photos exist? Out of scope for this pipeline itself, but the applicant
  record should carry the consent boolean so it's available when that need arises.

## Acceptance criteria

- Given a fixture applicant with a LinkedIn URL, the pipeline produces a draft-only
  email (Gmail draft or equivalent) with no send having occurred.
- No applicant PII is ever written to a tracked (non-gitignored) file at any point in
  the flow.
- A run with zero new applications is a no-op (no draft, no send, no state
  corruption) — matches the hermes watch-script convention of printing
  `{"wakeAgent": false}` when there's nothing new.
- Manually revoking/deleting an applicant's `data/` record removes it from any future
  drip step (no orphaned sends).

## Non-goals

- No CRM/SaaS integration.
- No send-analytics dashboard.
- No support for events that aren't application-gated (open-RSVP events don't need
  this pipeline at all).
