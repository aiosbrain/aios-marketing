# AIOS Marketing

The content-marketing system for AIOS events and launches — sibling to
[`aios-workspace`](https://github.com/aiosbrain/aios-workspace),
[`aios-team-brain`](https://github.com/aiosbrain/aios-team-brain),
[`aios-website`](https://github.com/aiosbrain/aios-alpha.github.io), and
[`aios-design`](https://github.com/aiosbrain/aios-design) under the AIOS context
monorepo.

This repo holds the durable brand voice, audience personas, and a repeatable campaign
system (`.agents/skills/event-launch`) for launching AIOS onboarding events and other
public-facing campaigns — starting with the Aug 2026 Ubud onboarding event.

**Skill/doc routing: see `RESOLVER.md`.** Full conventions: `CLAUDE.md`.

## Structure

| Path | Holds |
|------|-------|
| `0-context/` | Durable brand truth: tone of voice, positioning rules, anonymized personas, audience segments |
| `1-inbox/` | Raw research inputs (`research/` committed, `raw-transcripts/` gitignored) |
| `2-work/campaigns/<date>-<slug>/` | One folder per campaign — the working unit |
| `3-log/` | Decision log |
| `4-shared/` | Promoted, review-final copy |
| `5-personal/` | Private scratch (gitignored) |
| `templates/` | Reusable, placeholder-driven campaign scaffolding |
| `data/` | Applicant/attendee data at runtime — gitignored, never committed |
| `.agents/skills/` | `event-launch` (scaffold a new campaign), `applicant-pipeline` (spec stub) |

## This repo is public

Nothing in `data/`, `1-inbox/raw-transcripts/`, `5-personal/`, or any
`venue-address.*` file is ever committed. See `CLAUDE.md` for the full gate list.
