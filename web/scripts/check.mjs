import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { tokenize } from "../src/lib/highlight.js";

let failed = false;
const fail = (m) => {
  console.error("FAIL:", m);
  failed = true;
};

const bash = tokenize('gh-opp scan serde-rs/serde --json # hello\n', "bash");
const hasFlag = bash.some((t) => t.cls === "f" && t.text === "--json");
const hasComment = bash.some((t) => t.cls === "c" && t.text === "# hello");
const plain = bash.filter((t) => t.cls === null).map((t) => t.text).join("");
const hasCmd = plain.includes("gh-opp") && plain.includes("serde-rs/serde");
const noBadFlag = !bash.some((t) => t.cls === "f" && t.text.startsWith("-o"));
if (!hasFlag || !hasComment || !hasCmd || !noBadFlag) {
  fail("tokenizer: bash tokens wrong: " + JSON.stringify(bash));
}

const json = tokenize('{"repo":"rust-lang/rust","limit":10}', "json");
if (!json.some((t) => t.cls === "k" && t.text === '"repo"')) fail("tokenizer: json key");
if (!json.some((t) => t.cls === "s")) fail("tokenizer: json string");
if (!json.some((t) => t.cls === "n")) fail("tokenizer: json number");

const toml = tokenize('weight = 0.3\n# comment\nprovider = "openai"', "toml");
if (!toml.some((t) => t.cls === "k" && t.text === "weight")) fail("tokenizer: toml key");
if (!toml.some((t) => t.cls === "n" && t.text === "0.3")) fail("tokenizer: toml number");

const srcDir = join(process.cwd(), "src");
const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : join(d, e.name)
  );
const files = walk(srcDir).filter((f) => /\.(jsx|js)$/.test(f));

for (const f of files) {
  const src = readFileSync(f, "utf8");
  const em = src.indexOf("\u2014");
  const en = src.indexOf("\u2013");
  if (em >= 0 || en >= 0) {
    fail(`${f}: em/en dash at index ${Math.max(em, en)}`);
  }
}

const data = readFileSync(join(srcDir, "docs", "data.js"), "utf8");
const slugs = [...data.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const pages = readFileSync(join(srcDir, "docs", "pages.jsx"), "utf8");
for (const s of slugs) {
  if (!pages.includes(`\n  ${s}: (`)) fail(`doc page missing for slug "${s}"`);
}

if (failed) {
  process.exit(1);
}
console.log(`OK: tokenizer + ${files.length} files clean, ${slugs.length} doc slugs resolved, zero em/en dashes.`);
