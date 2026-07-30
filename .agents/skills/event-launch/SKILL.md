---
name: event-launch
description: Scaffold a new AIOS event or campaign folder from the reusable templates in templates/campaign-folder/. Use whenever launching a new event, workshop, or public campaign — "new AIOS event," "launch a new event," "scaffold a campaign," "/event-launch." Produces the working folder and prints the content-generation checklist; does not write copy itself.
version: 1.0.0
access: team
triggers:
  - new AIOS event
  - launch a new event
  - scaffold a campaign
  - /event-launch
---

# event-launch

Scaffolds `2-work/campaigns/<date>-<slug>/` from `templates/campaign-folder/*.tmpl` so
every campaign starts from the same structure instead of a hand-copied folder. Pure
file scaffolding — no external credentials, no network calls, no sending, never
touches `data/`.

## Usage

```bash
node .agents/skills/event-launch/scaffold-campaign.mjs \
  --name "AIOS Onboarding — Canggu" \
  --date 2026-09-02 \
  --time "2:00-6:00pm WITA" \
  --city "Canggu, Bali" \
  --application-gated true \
  [--slug aios-onboarding-canggu]
```

Required: `--name`, `--date` (`YYYY-MM-DD`), `--time`, `--city`. Optional:
`--application-gated` (defaults `true`), `--slug` (defaults to a slugified `--name`).
Refuses to run if the destination folder already exists.

## What it creates

```
2-work/campaigns/<date>-<slug>/
├── campaign.yaml
├── luma-listing.md          # placeholder — fill via Skill(copywriting)
├── application-questions.md # placeholder — fill from templates/application-question-bank.md
├── social/{whatsapp,linkedin,x,community-outreach}.md   # placeholders — Skill(social-content)
└── email/drip-sequence.md   # placeholder — Skill(email-sequence)
```

`venue-address.md` is **not** created by this skill — add it by hand once you have a
real address, directly in the campaign folder. It's gitignored by filename pattern
(`**/venue-address.md`) so it can never be committed by accident.

## After scaffolding — content sequence

1. Confirm `0-context/brand/tone-of-voice.md`, `positioning-rules.md`,
   `personas/anonymized-archetypes.md`, and `audience-segments.md` still describe this
   event's context. Update them only if something durable has actually changed — don't
   fork brand voice per campaign.
2. `Skill(copywriting)` → `luma-listing.md`, seeded with the `0-context/` docs + this
   event's facts.
3. Fill `application-questions.md` from `templates/application-question-bank.md`,
   adapted to the current `audience-segments.md`. The exact venue/address is never a
   form field.
4. `Skill(social-content)` → `social/*.md`.
5. `Skill(email-sequence)` → `email/drip-sequence.md`.
6. Log the launch decision in `3-log/decision-log.md`.

## When this skill is wrong

If you're editing an *existing* campaign folder, don't re-run this — it refuses to
overwrite anyway. If you're changing the reusable structure itself (adding a new
template file, changing a placeholder), edit `templates/campaign-folder/` directly,
not a stamped campaign folder — same "edit the template, not a copy" discipline the
rest of AIOS uses.
