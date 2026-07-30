#!/usr/bin/env node
// scaffold-campaign.mjs — copies templates/campaign-folder/*.tmpl into
// 2-work/campaigns/<slug>/, substituting {{PLACEHOLDER}} tokens.
//
// This is pure file scaffolding: no network calls, no credentials, no sending.
// It never touches data/ and never writes a venue address.
//
// Usage:
//   node .agents/skills/event-launch/scaffold-campaign.mjs \
//     --name "AIOS Onboarding — Canggu" \
//     --date 2026-09-02 \
//     --time "2:00-6:00pm WITA" \
//     --city "Canggu, Bali" \
//     --application-gated true \
//     [--slug aios-onboarding-canggu]

import { mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", "..");
const TEMPLATE_DIR = join(REPO_ROOT, "templates", "campaign-folder");

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        out[key] = true;
      } else {
        out[key] = next;
        i++;
      }
    }
  }
  return out;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function substitute(content, tokens) {
  let out = content;
  for (const [key, value] of Object.entries(tokens)) {
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}

function copyTemplateTree(srcDir, destDir, tokens) {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir)) {
    const srcPath = join(srcDir, entry);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      copyTemplateTree(srcPath, join(destDir, entry), tokens);
      continue;
    }
    const destName = entry.endsWith(".tmpl") ? entry.slice(0, -".tmpl".length) : entry;
    const destPath = join(destDir, destName);
    const raw = readFileSync(srcPath, "utf8");
    writeFileSync(destPath, substitute(raw, tokens));
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const required = ["name", "date", "time", "city"];
  const missing = required.filter((k) => !args[k]);
  if (missing.length) {
    console.error(`Missing required args: ${missing.map((m) => `--${m}`).join(", ")}`);
    console.error("Usage: node scaffold-campaign.mjs --name <name> --date <YYYY-MM-DD> --time <time> --city <city> [--application-gated true|false] [--slug <slug>]");
    process.exit(1);
  }

  const eventDate = args.date;
  const eventSlug = args.slug || slugify(args.name);
  const folderName = `${eventDate}-${eventSlug}`;
  const destDir = join(REPO_ROOT, "2-work", "campaigns", folderName);

  if (existsSync(destDir)) {
    console.error(`Campaign folder already exists: ${relative(REPO_ROOT, destDir)}`);
    process.exit(1);
  }

  const tokens = {
    EVENT_NAME: args.name,
    EVENT_DATE: eventDate,
    EVENT_TIME: args.time,
    EVENT_CITY: args.city,
    EVENT_SLUG: eventSlug,
    APPLICATION_GATED: String(args["application-gated"] ?? "true"),
  };

  copyTemplateTree(TEMPLATE_DIR, destDir, tokens);

  console.log(`Scaffolded campaign: ${relative(REPO_ROOT, destDir)}`);
  console.log("");
  console.log("Next steps:");
  console.log("  1. Confirm 0-context/brand/tone-of-voice.md and audience-segments.md still fit.");
  console.log("  2. Skill(copywriting) -> luma-listing.md");
  console.log("  3. Fill application-questions.md from templates/application-question-bank.md");
  console.log("  4. Skill(social-content) -> social/*.md");
  console.log("  5. Skill(email-sequence) -> email/drip-sequence.md");
  console.log("  6. Write the exact venue address ONLY to venue-address.md (gitignored) — never elsewhere.");
}

main();
