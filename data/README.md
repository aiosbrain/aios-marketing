# `data/` — never committed

This directory holds runtime data for the applicant-review pipeline once it's built
(see the Linear issue linked from `docs/linear-spec-applicant-pipeline.md`): applicant
records, Firecrawl lookup results, review decisions, drip-sequence send logs.

This file is the **only** tracked file in this directory. Everything else under
`data/` is gitignored — this repo is public, and applicant PII (names, emails,
LinkedIn URLs, review notes) must never enter git history.

Planned shape (subject to change when the pipeline is actually built): one JSON or
SQLite record per applicant, keyed by campaign slug (e.g.
`2026-08-05-aios-onboarding-ubud`), never synced anywhere outside this machine unless
John explicitly exports it.
