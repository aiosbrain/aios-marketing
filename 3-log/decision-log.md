# Decision log

| # | Date | Decision | Rationale | Decided By | Impact | Type | Audience |
|---|------|----------|-----------|------------|--------|------|----------|
| 3 | 2026-07-30 | Repo created private initially, flips to public after John reviews tone/persona docs | Cheap insurance against an NDA/PII slip before it's on a public GitHub history, which is hard to truly scrub | John + agent | One extra `gh repo edit --visibility public` step before the repo is discoverable | 2 | team |
| 2 | 2026-07-30 | Applicant-review automation is spec-only for this pass — captured as Linear issue AIO-634, not built | 6-day runway to the Aug 5 event; ships copy + reusable system now, automation as a fast-follow so the event announcement isn't blocked on infra work | John | Aug 5 event's application review happens fully manually; pipeline gets built against a documented spec afterward | 2 | team |
| 1 | 2026-07-30 | Created `aios-marketing` as a new public sibling repo with a numbered spine, rather than folding this into `aios-workspace` or `aios-website` | Seeds a reusable, systematic content-marketing system for future AIOS events, not a one-off; keeps event/marketing ops separate from the product toolkit and the docs site | John | New repo to maintain; establishes the pattern every future event campaign follows via the `event-launch` skill | 2 | team |
