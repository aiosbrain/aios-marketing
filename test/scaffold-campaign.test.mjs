// scaffold-campaign.test.mjs — the one executable in this repo.
//
// This repo is ~90% Markdown, SVG and campaign copy; there is exactly one script, and it
// is the thing every future campaign folder is built by. So it gets tests and the prose
// does not. Bulk unit tests over content would be theatre; this is not content.
//
// Run: npm test        Coverage: npm run test:coverage

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  parseArgs,
  slugify,
  substitute,
  copyTemplateTree,
  campaignFolderName,
} from "../.agents/skills/event-launch/scaffold-campaign.mjs";

// ── parseArgs ────────────────────────────────────────────────────────────────

test("parseArgs reads --key value pairs", () => {
  assert.deepEqual(parseArgs(["--name", "AIOS Onboarding", "--city", "Canggu, Bali"]), {
    name: "AIOS Onboarding",
    city: "Canggu, Bali",
  });
});

test("parseArgs treats a flag with no value as boolean true", () => {
  assert.deepEqual(parseArgs(["--dry-run", "--name", "x"]), { "dry-run": true, name: "x" });
});

test("parseArgs treats a trailing flag as boolean true", () => {
  assert.deepEqual(parseArgs(["--name", "x", "--gated"]), { name: "x", gated: true });
});

test("parseArgs ignores positional arguments", () => {
  assert.deepEqual(parseArgs(["stray", "--name", "x"]), { name: "x" });
});

// ── slugify ──────────────────────────────────────────────────────────────────

test("slugify lowercases and hyphenates", () => {
  assert.equal(slugify("AIOS Onboarding — Canggu"), "aios-onboarding-canggu");
});

test("slugify trims leading and trailing separators", () => {
  assert.equal(slugify("  --Ubud!!  "), "ubud");
});

test("slugify strips path separators and dots", () => {
  // The property that matters: nothing slugify returns can traverse a directory.
  assert.equal(slugify("../../4-shared/oops"), "4-shared-oops");
  assert.equal(slugify("a/b/../c"), "a-b-c");
});

// ── campaignFolderName — the path-containment regression ─────────────────────

test("campaignFolderName slugifies an auto-derived slug", () => {
  const { folderName } = campaignFolderName({ name: "AIOS Onboarding — Canggu", date: "2026-09-02" });
  assert.equal(folderName, "2026-09-02-aios-onboarding-canggu");
});

test("campaignFolderName slugifies an EXPLICIT --slug too", () => {
  // Regression: an explicit --slug used to bypass slugify entirely.
  const { folderName } = campaignFolderName({ slug: "My Slug", name: "ignored", date: "2026-09-02" });
  assert.equal(folderName, "2026-09-02-my-slug");
});

test("campaignFolderName cannot escape the campaigns directory via --slug", () => {
  const { folderName } = campaignFolderName({ slug: "../../4-shared/oops", date: "2026-09-02" });
  assert.ok(!folderName.includes("/"), `folder name must not contain a separator: ${folderName}`);
  assert.ok(!folderName.includes(".."), `folder name must not contain "..": ${folderName}`);
  assert.equal(folderName, "2026-09-02-4-shared-oops");
});

test("campaignFolderName prefers --slug over --name", () => {
  assert.equal(campaignFolderName({ slug: "canggu", name: "Ubud", date: "2026-09-02" }).eventSlug, "canggu");
});

// ── substitute ───────────────────────────────────────────────────────────────

test("substitute replaces every occurrence of a token", () => {
  assert.equal(substitute("{{A}} and {{A}} and {{B}}", { A: "x", B: "y" }), "x and x and y");
});

test("substitute leaves unknown tokens untouched rather than emptying them", () => {
  // An unreplaced {{TOKEN}} is visible in review; an empty string silently ships a hole.
  assert.equal(substitute("{{KNOWN}}/{{UNKNOWN}}", { KNOWN: "v" }), "v/{{UNKNOWN}}");
});

test("substitute does not treat token values as patterns", () => {
  assert.equal(substitute("{{A}}", { A: "$& and $1" }), "$& and $1");
});

// ── copyTemplateTree ─────────────────────────────────────────────────────────

function withTempTree(fn) {
  const root = mkdtempSync(join(tmpdir(), "aios-marketing-test-"));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("copyTemplateTree strips .tmpl, recurses, and substitutes", () => {
  withTempTree((root) => {
    const src = join(root, "src");
    mkdirSync(join(src, "social"), { recursive: true });
    writeFileSync(join(src, "campaign.yaml.tmpl"), "slug: {{EVENT_SLUG}}\ncity: {{EVENT_CITY}}\n");
    writeFileSync(join(src, "social", "x.md.tmpl"), "Join {{EVENT_NAME}} on {{EVENT_DATE}}.\n");

    const dest = join(root, "dest");
    copyTemplateTree(src, dest, {
      EVENT_SLUG: "canggu",
      EVENT_CITY: "Canggu, Bali",
      EVENT_NAME: "AIOS Onboarding",
      EVENT_DATE: "2026-09-02",
    });

    assert.deepEqual(readdirSync(dest).sort(), ["campaign.yaml", "social"]);
    assert.deepEqual(readdirSync(join(dest, "social")), ["x.md"]);
    assert.equal(readFileSync(join(dest, "campaign.yaml"), "utf8"), "slug: canggu\ncity: Canggu, Bali\n");
    assert.equal(
      readFileSync(join(dest, "social", "x.md"), "utf8"),
      "Join AIOS Onboarding on 2026-09-02.\n"
    );
  });
});

test("copyTemplateTree copies a non-.tmpl file through under its own name", () => {
  withTempTree((root) => {
    const src = join(root, "src");
    mkdirSync(src, { recursive: true });
    writeFileSync(join(src, "cover.css"), "body { color: {{EVENT_CITY}}; }");
    const dest = join(root, "dest");
    copyTemplateTree(src, dest, { EVENT_CITY: "red" });
    assert.deepEqual(readdirSync(dest), ["cover.css"]);
    assert.equal(readFileSync(join(dest, "cover.css"), "utf8"), "body { color: red; }");
  });
});

// ── the real templates/ tree ─────────────────────────────────────────────────

test("every token in templates/campaign-folder is one the scaffolder supplies", () => {
  // Catches the actual failure mode: someone adds {{VENUE_ADDRESS}} to a template and the
  // scaffolded campaign ships a literal {{VENUE_ADDRESS}} to a public folder.
  const supplied = new Set([
    "EVENT_NAME",
    "EVENT_DATE",
    "EVENT_TIME",
    "EVENT_CITY",
    "EVENT_SLUG",
    "APPLICATION_GATED",
  ]);
  const repoRoot = new URL("..", import.meta.url).pathname;
  const templateDir = join(repoRoot, "templates", "campaign-folder");

  const unknown = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p);
        continue;
      }
      for (const [, token] of readFileSync(p, "utf8").matchAll(/\{\{([A-Z0-9_]+)\}\}/g)) {
        if (!supplied.has(token)) unknown.add(`${entry.name}: {{${token}}}`);
      }
    }
  };
  walk(templateDir);
  assert.deepEqual([...unknown], [], "template tokens with no value in scaffold-campaign.mjs");
});

// ── the CLI's rejection paths (subprocess: no args means nothing is written) ──

import { execFileSync } from "node:child_process";

const SCRIPT = new URL("../.agents/skills/event-launch/scaffold-campaign.mjs", import.meta.url)
  .pathname;

function runCli(args) {
  try {
    return { status: 0, stderr: "", stdout: execFileSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8" }) };
  } catch (e) {
    return { status: e.status, stderr: e.stderr ?? "", stdout: e.stdout ?? "" };
  }
}

test("CLI exits 1 and names every missing required arg", () => {
  const { status, stderr } = runCli(["--name", "AIOS Onboarding"]);
  assert.equal(status, 1);
  // Assert on the "Missing required args:" LINE only — the Usage line below it names every
  // flag, so a whole-stderr substring check would pass no matter what was reported missing.
  const missingLine = stderr.split("\n").find((l) => l.startsWith("Missing required args:"));
  assert.ok(missingLine, `no "Missing required args:" line in: ${stderr}`);
  assert.equal(missingLine, "Missing required args: --date, --time, --city");
});

test("CLI refuses to overwrite an existing campaign folder", () => {
  // 2026-08-05-aios-onboarding-ubud is committed, so this exercises the collision guard
  // without creating anything.
  const { status, stderr } = runCli([
    "--name", "AIOS Onboarding Ubud",
    "--slug", "aios-onboarding-ubud",
    "--date", "2026-08-05",
    "--time", "2:00-6:00pm WITA",
    "--city", "Mas, Ubud",
  ]);
  assert.equal(status, 1);
  assert.match(stderr, /Campaign folder already exists/);
});
