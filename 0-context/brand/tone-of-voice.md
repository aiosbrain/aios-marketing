---
status: final
owner: john
type: Deliverable
---

# AIOS tone of voice

No AIOS voice guide existed before this one. It's reverse-engineered from the actual
public copy — the homepage hero, the deck, and John's blog posts — not invented from a
generic startup-voice template. Read `positioning-rules.md` alongside this; that file
sets the hard content constraints, this one sets how it sounds.

## Who's speaking

A founder-operator, not a marketing department. The blog posts are signed and written
in first person ("I transform companies into AI organizations for a living"). Even the
homepage and deck read like one person explaining a thing they built, not a brand
voice committee. Keep that. Copy for this repo should sound like John (or Chetan)
talking to someone they respect, not like "AIOS" as an abstract entity talking to "you."

## Tone descriptors

**Do:**
- **Honest about limits.** The pitch deck has a whole slide admitting unsolved
  problems. The blog admits "the better I got at agents, the worse I got at focus."
  Say what doesn't work yet as readily as what does.
- **Technical-credible, not jargon-proud.** Uses real terms (tier, spine, orchestration,
  agentic, push/pull) without over-explaining them to death, but never reaches for a
  buzzword when a plain verb works ("ships," "runs," "breaks down," not "leverages,"
  "unlocks," "streamlines").
- **Concrete over vague.** "Cap concurrency (five top-level sessions, not fifteen)," not
  "manage your workload effectively." A number and a mechanism beat an adjective.
  "Context bloats. Tools entangle. The speed gap widens." — short, diagnosable claims,
  not "teams face challenges."
- **Dry, understated wit where it fits.** "Not a very expensive notification handler."
  Never forced, never an exclamation point.
- **Confident, not hyped.** States what AIOS does plainly, then moves on. Doesn't stack
  adjectives in front of nouns.

**Don't:**
- Don't write "revolutionize," "seamless," "unlock," "supercharge," "game-changing,"
  or any word that could appear on a SaaS landing page from any company.
- Don't use exclamation points.
- Don't claim a feature exists before it's shipped (see `positioning-rules.md` §1).
- Don't cite participant/attendee numbers, ever (see `positioning-rules.md` §2).
- Don't oversell urgency or scarcity theatrically ("last chance," "don't miss out").

## Sentence-level habits

- **Short declarative sentences carry the argument; longer ones fill in mechanism.**
  "Working with agents on your own is amazing. In a team, it breaks down fast." Then a
  bulleted list unpacks *how* it breaks down, each bullet a short diagnosable claim
  starting with a bolded 2-3 word label ("**Context bloats.**").
  "The team drifts. People tunnel into execution and lose the thread on OKRs and
  customers."
- **First person, present tense, active voice.** "We built AIOS by helping companies
  become AI-native organizations," not "AIOS was built to help companies..."
- **Rhetorical framing when introducing a problem.** "You used to have flow... Now you
  have tabs." Set up the before, land the after, no transition padding.
- **Bold sparingly, for the term being defined or the key mechanism**, not for
  emphasis on adjectives.
- **Lists over paragraphs** when there's more than one parallel idea — the blog leans on
  bullets and short tables (e.g. the severity table in "How I Run My Day").

## Sounds like us / doesn't sound like us

| Sounds like us | Doesn't sound like us |
|---|---|
| "Open source and self-hosted. You decide what leaves your machine." | "Enterprise-grade security you can trust." |
| "It's two repos, one system. There is no third moving part to manage." | "A comprehensive, all-in-one platform for modern teams." |
| "Working with agents on your own is amazing. In a team, it breaks down fast." | "Unlock the full potential of agentic collaboration." |
| "A few concrete pieces are live today." | "We're thrilled to announce our revolutionary new features!" |
| "The parts that are still rough will show up here too." | (silence about limitations) |
| "Cap concurrency (five top-level sessions, not fifteen)." | "Optimize your agent workflow for maximum efficiency." |

## How it flexes by format

The voice stays recognizable across formats — same person, same honesty, same
concreteness — but the register shifts:

- **Event copy** (Lu.ma listings, invites): slightly warmer and more logistical than
  the blog — still first person, still no hype, but oriented toward "here's what
  happens and why it's worth your afternoon" rather than argument-building. Fine to be
  a little more personal/inviting here than on the product site, and to land the value
  in one paragraph rather than building a slow argument.
- **Social (LinkedIn/X/WhatsApp)**: shorter sentences, faster pace, still zero hype
  words. WhatsApp in particular should read like a message from a person to a group
  chat, not a broadcast — casual, low-formality, still specific.
- **Email (drip sequences)**: closest to the blog's rhythm — can afford a short
  personal anecdote or a diagnosable-problem opening ("You used to have flow...") before
  getting to the point. One idea per email.
- **What never changes**: the honesty habit (admit what's unfinished), the ban on
  participant stats and hype words, and first-person founder voice over "AIOS" as an
  abstract corporate narrator.
