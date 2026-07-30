---
resolver: v1
scope: aios-marketing
parent: ../CLAUDE.md
skills_roots: [.agents/skills, .claude/skills]
fixtures: .claude/resolver-fixtures.yaml
---

# AIOS Marketing — Resolver

Router for this repo. `CLAUDE.md` is the entrypoint; this file decides which skill,
doc, or gate applies. Read the target before acting. Gates always apply. Parent gates
(AIOS hub, Tessera root) apply in addition.

Skill layout: real files in `.agents/skills/`, symlinks in `.claude/skills/`.

## Always-On Gates

| Trigger | Load |
|---|---|
| Any file about to be created or edited anywhere in this repo | This repo is **public** — never-commit-PII gate + address gate + persona-anonymization gate (below) apply before writing anything |
| Any applicant, attendee, email address, LinkedIn URL, or reviewer note | Must land only in `data/` (gitignored) or `1-inbox/raw-transcripts/` (gitignored) — never in `2-work/`, `4-shared/`, `templates/`, or any other tracked path |
| Any mention of the venue/address | Generic neighborhood only ("Mas, Ubud") in anything committed; the exact address goes only through a private one-to-one channel, post-acceptance |
| Any persona or archetype content | Fully anonymized generic archetype only — zero names, company details, locations, or case-study figures, even if the source material is a real (possibly NDA-embargoed) engagement |
| Any marketing copy | `0-context/brand/positioning-rules.md` gate: no participant/engagement stats, "two repos, one system," generic plain-vs-AIOS comparison, honesty over overselling, no unreleased-feature claims |
| Any commit | Worktrees are REQUIRED, never a branch in the primary checkout — one documented exception: the repo-genesis first commit (see `CLAUDE.md` §3) |

## Functional Areas

| Trigger | Skill |
|---|---|
| New event/campaign to launch | `.agents/skills/event-launch/SKILL.md` |
| Questions about the applicant-review/drip automation | `.agents/skills/applicant-pipeline/SKILL.md` (spec-only stub → Linear issue, not implemented) |
| Writing or rewriting any copy | Global skills — `copywriting`, `email-sequence`, `social-content`, `content-strategy`, `customer-research` — not vendored here, invoke the user's existing global skills |
| PM/board work referencing this repo's automation spec | Global `aios-linear` skill (team **AIO**) |

## Sub-Repo Delegation

None — this is a leaf repo. One cross-repo pointer: content documenting released AIOS
product features must never outrun `aios-website`'s tagged-release rule
(`aios-website/CLAUDE.md`) — check there before claiming a capability exists.

## Disambiguation

1. Durable brand truth lives in `0-context/`; campaign-specific copy lives in
   `2-work/campaigns/<slug>/`. Never fork brand voice per campaign — apply it.
2. A new campaign always starts via `event-launch`, never a hand-copied folder — that's
   what keeps this system reusable instead of one-off.
3. If content touches both marketing copy and an actual product claim (a feature,
   a number, a release status), the AIOS hub's tagged-release gate wins over local
   marketing enthusiasm.
