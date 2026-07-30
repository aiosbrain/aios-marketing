# AIOS Marketing — operating manual

**Skill/doc routing: see `RESOLVER.md`** — gates (public-repo PII/address/persona
gates, worktree convention) and the Functional Areas table.

> Monorepo context: this repo sits beside `aios-workspace`, `aios-team-brain`,
> `aios-website`, and `aios-design` under the AIOS context-monorepo root
> (`../CLAUDE.md`). This file governs the marketing/content-ops repo specifically.

---

## 1. What this repo is

The reusable content-marketing system for AIOS: durable brand voice, anonymized
audience personas, and a repeatable campaign scaffold (`.agents/skills/event-launch`)
for launching events and other public-facing pushes. It is **not** a personal
workspace (not scaffolded via `aios-workspace/scripts/scaffold-project.sh`, which is
scoped to per-person IC repos) and **not** the product itself — it's the marketing
layer, same relationship `aios-design` has to the product's visual layer.

---

## 2. This repo is public from day one

Every file here is world-readable. Treat it that way before writing it, not after.

**Hard gates — never violate these:**

- **Never commit applicant or attendee PII.** Names, emails, phone numbers, LinkedIn
  URLs tied to real people, Firecrawl lookup output — all of it lives only in `data/`,
  which is gitignored except for `data/README.md`.
- **Never commit the exact venue address.** Public copy says only the neighborhood
  (e.g. "Mas, Ubud"). The precise address is disclosed exclusively via a private
  one-to-one channel (email/WhatsApp) after an applicant is accepted — never written
  to any file that gets committed. Any `venue-address.*` file is gitignored by
  filename pattern; don't rename around that.
- **Personas are anonymized-archetype-only.** Where source personas trace back to a
  real (possibly NDA-embargoed) engagement, strip every name, company detail,
  location, and case-study figure. Keep only decision style, objections, and what
  convinces them. If in doubt, generalize further, not less.
- **Positioning rules apply to every piece of copy.** No participant/engagement
  stats, "two repos, one system" framing (not three), comparison angle stays generic
  ("plain tools" vs "AIOS," never named competitors), honesty ethos (admit unsolved
  problems rather than oversell) — full detail in
  `0-context/brand/positioning-rules.md`, distilled from
  `aios-website/docs/ENGINEERING-CONSTITUTION.md`. Don't document AIOS features that
  aren't in the current tagged release.

**Enforcement layer:** there's no brain-sync tier engine here (no `access:`
frontmatter rejection like the workspace toolkit has). The only real protection is
**path-level exclusion** (`.gitignore`) plus `scripts/leak-gate.sh` (ported from
`aios-workspace/scripts/leak-gate.sh`, unmodified) run locally before every push and
in CI (`.github/workflows/leak-gate.yml`). Don't rely on remembering — rely on the
gitignore and the gate.

---

## 3. Worktree convention — one documented exception

This repo follows the AIOS-wide rule: every commit happens in a dedicated `git
worktree`, never as a branch in the primary checkout
(`aios worktree add feat/<task>`, see the hub `CLAUDE.md`).

**The sole exception**: the very first commit of this repo (genesis) was made
directly in the primary checkout, because no `origin/main` existed yet to branch
from. That was a one-time bootstrap step — every commit after it uses a worktree like
normal.

---

## 4. Repo map

| Path | What |
|------|------|
| `0-context/` | Durable brand truth — tone of voice, positioning rules, anonymized personas, audience segments. Rarely rewritten; every campaign draws from it, never forks it. |
| `1-inbox/` | Raw inputs. `research/` (anonymized research pulls, safe to commit) vs. `raw-transcripts/` (gitignored — unfiltered planning notes that may carry PII/NDA risk before review). |
| `2-work/campaigns/<date>-<slug>/` | One folder per campaign — the working unit. Scaffolded by the `event-launch` skill. |
| `3-log/` | `decision-log.md` — append-only, dated, with rationale (same convention as the workspace toolkit). |
| `4-shared/` | Promoted, review-final copy — a soft "this is done" signal since the whole repo is already public. |
| `5-personal/` | Private scratch — gitignored wholesale. |
| `templates/` | Event-agnostic, `{{PLACEHOLDER}}`-driven campaign scaffolding the `event-launch` skill copies from. |
| `data/` | Applicant/attendee runtime data — gitignored except `data/README.md`. |
| `.agents/skills/` | Real skill files (`.claude/skills/` holds symlinks — same convention as `aios-workspace`). |
| `docs/` | Working specs, e.g. `linear-spec-applicant-pipeline.md` (drafting copy before/after it's pushed to Linear). |

---

## 5. Automation is spec-only for now

The applicant-review pipeline (Gmail watch, Firecrawl profile lookups,
semi-automated approve/deny drafts, drip sender) is **not implemented**. It's
captured as a Linear issue spec (see `docs/linear-spec-applicant-pipeline.md` and
`.agents/skills/applicant-pipeline/SKILL.md`) for a fast-follow build. Do not wire up
pieces of this ad hoc — build against the spec, or update the spec first.

---

## 6. Do not

- **Do not** commit anything under `data/`, `1-inbox/raw-transcripts/`, `5-personal/`,
  or any `venue-address.*` file.
- **Do not** use a real person's name, company, or location in any persona,
  case-study, or testimonial content without explicit written clearance.
- **Do not** state participant/engagement stats or claim features not in AIOS's
  current tagged release.
- **Do not** commit directly to the primary checkout except for the one documented
  genesis commit.
