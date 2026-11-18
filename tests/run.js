#!/usr/bin/env node
/*
 * Hũ Kẹo Của Sún — zero-dependency checks. Run: `node tests/run.js` (or `npm test`).
 * Catches the classes of bugs found so far: syntax errors, asset-version drift between sw.js and index.html,
 * silent (undefined) audio notes, broken Nón Lá questions, duplicated / mismatched vocabulary, data ↔ code drift.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const exists = (f) => fs.existsSync(path.join(ROOT, f));

let failures = 0;
let passes = 0;
function check(name, problems) {
  const list = (Array.isArray(problems) ? problems : [problems]).filter(Boolean);
  if (list.length === 0) {
    passes++;
    console.log(`  ok   ${name}`);
  } else {
    failures++;
    console.log(`  FAIL ${name}`);
    list.slice(0, 15).forEach((p) => console.log(`         - ${p}`));
    if (list.length > 15) console.log(`         … and ${list.length - 15} more`);
  }
}

// Extract a JS object/array literal that follows `marker` (string-aware brace matching), then evaluate it.
function extractLiteral(src, marker) {
  const at = src.indexOf(marker);
  if (at < 0) throw new Error(`marker not found: ${marker}`);
  let i = at + marker.length;
  while (src[i] !== "{" && src[i] !== "[") i++;
  const open = src[i];
  const close = open === "{" ? "}" : "]";
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let k = i; k < src.length; k++) {
    const c = src[k];
    if (quote) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") {
      depth--;
      if (depth === 0) {
        if (c !== close) throw new Error("unbalanced literal");
        // eslint-disable-next-line no-new-func
        return Function(`"use strict"; return (${src.slice(i, k + 1)});`)();
      }
    }
  }
  throw new Error(`unterminated literal after ${marker}`);
}

const jsFiles = fs.readdirSync(path.join(ROOT, "js")).filter((f) => f.endsWith(".js")).map((f) => `js/${f}`);

// ---------------------------------------------------------------------------------------------------------------
console.log("\nSyntax");
check("all scripts parse (node --check)", [...jsFiles, "sw.js", "tests/run.js"].map((f) => {
  try {
    execFileSync(process.execPath, ["--check", path.join(ROOT, f)], { stdio: "pipe" });
    return null;
  } catch (e) {
    return `${f}: ${String(e.stderr || e.message).split("\n").find((l) => l.trim()) || "syntax error"}`;
  }
}));

// ---------------------------------------------------------------------------------------------------------------
console.log("\nOffline cache / versions");
const sw = read("sw.js");
const html = read("index.html");
const manifest = JSON.parse(read("manifest.json"));
const version = (sw.match(/const ASSET_VERSION = "(\d+)"/) || [])[1];
check("sw.js declares ASSET_VERSION", version ? null : "ASSET_VERSION not found");
const htmlVersions = [...html.matchAll(/\?v=(\d+)/g)].map((m) => m[1]);
check(`every ?v= in index.html equals ASSET_VERSION (${version})`,
  htmlVersions.filter((v) => v !== version).map((v) => `found ?v=${v}`).concat(htmlVersions.length ? [] : ["no ?v= found"]));
const coreBlock = sw.slice(sw.indexOf("const CORE_ASSETS"), sw.indexOf("];", sw.indexOf("const CORE_ASSETS")));
const coreFiles = [...coreBlock.matchAll(/["`]\.\/([^"`$?]*)(?:\$\{q\})?["`]/g)].map((m) => m[1]).filter(Boolean);
const htmlAssets = [...html.matchAll(/(?:src|href)="((?:js|css)\/[^"?]+)\?v=/g)].map((m) => m[1]);
check("every versioned script/style in index.html is precached", htmlAssets.filter((f) => !coreFiles.includes(f)));
check("every precached file exists", coreFiles.filter((f) => !exists(f)));
check("every manifest icon exists and is precached",
  manifest.icons.flatMap((ic) => [!exists(ic.src) && `${ic.src} missing`, !coreFiles.includes(ic.src) && `${ic.src} not in CORE_ASSETS`]));
check("font cache survives activate", /k !== FONT_CACHE/.test(sw) ? null : "activate deletes FONT_CACHE");

// ---------------------------------------------------------------------------------------------------------------
console.log("\nAudio");
const audio = read("js/audio.js");
const noteTable = extractLiteral(audio, "const N =");
const usedNotes = [...new Set([...audio.matchAll(/\bN\.([A-G]\d)\b/g)].map((m) => m[1]))];
check("every N.<note> used in a tune is defined", usedNotes.filter((n) => !(n in noteTable)).map((n) => `N.${n} is undefined (silent)`));

// ---------------------------------------------------------------------------------------------------------------
console.log("\nNón Lá L-N questions");
const challenges = extractLiteral(read("js/game_nonla.js"), "const CHALLENGES =");
const lnFold = (s) => s.toLowerCase().normalize("NFC").replace(/l/g, "n");
check("each question has exactly one ___", challenges.filter((c) => (c.blank.match(/___/g) || []).length !== 1).map((c) => c.target));
check("right and wrong differ", challenges.filter((c) => c.right.toLowerCase() === c.wrong.toLowerCase()).map((c) => c.target));
check("wrong answer is an L↔N swap of the right one",
  challenges.filter((c) => lnFold(c.right) !== lnFold(c.wrong)).map((c) => `${c.target}: ${c.right} / ${c.wrong}`));
check("right answer contains an L or N", challenges.filter((c) => !/[ln]/i.test(c.right)).map((c) => `${c.target}: ${c.right}`));
check("voice target and ngọng version differ", challenges.filter((c) => c.target === c.ngong).map((c) => c.target));
check("tiers are 1–3", challenges.filter((c) => ![1, 2, 3].includes(c.tier)).map((c) => `${c.target}: ${c.tier}`));
const targets = challenges.map((c) => c.target);
check("targets are unique", targets.filter((t, i) => targets.indexOf(t) !== i));
check("filled sentence has no doubled word (e.g. 'lịm lịm')", challenges.map((c) => {
  const words = c.blank.replace("___", c.right).toLowerCase().split(/\s+/);
  const legit = c.target.toLowerCase().split(/\s+/);
  for (let i = 1; i < words.length; i++) {
    if (words[i] === words[i - 1] && !(legit.includes(words[i]) && c.target.toLowerCase().includes(`${words[i]} ${words[i]}`))) {
      return `${c.target}: "${words[i - 1]} ${words[i]}"`;
    }
  }
  return null;
}));

// ---------------------------------------------------------------------------------------------------------------
console.log("\nVocabulary");
const hsk = extractLiteral(read("js/chinese.js"), "const HSK_DATA =");
const hskAll = Object.entries(hsk).flatMap(([lvl, list]) => list.map((w) => ({ ...w, lvl })));
check("HSK entries have hanzi/pinyin/meaning", hskAll.filter((w) => !w.hanzi || !w.pinyin || !w.meaning).map((w) => `${w.lvl}: ${w.hanzi}`));
const hanziLevels = {};
hskAll.filter((w) => w.lvl !== "love").forEach((w) => (hanziLevels[w.hanzi] = hanziLevels[w.hanzi] || []).push(w.lvl));
check("each HSK word appears in one level only",
  Object.entries(hanziLevels).filter(([, l]) => l.length > 1).map(([h, l]) => `${h} (${l.join(", ")})`));
check("HSK examples contain their word", hskAll.filter((w) => w.example && !w.example.includes(w.hanzi)).map((w) => `${w.lvl}: ${w.hanzi} → ${w.example}`));
// The name "Ngọc" may appear inside a Chinese sentence; any other Vietnamese text means a broken example.
check("HSK examples are Chinese (no Vietnamese text besides the name Ngọc)",
  hskAll.filter((w) => w.example && /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(w.example.replace(/Ngọc/g, "")))
    .map((w) => `${w.lvl}: ${w.hanzi}`));

const english = extractLiteral(read("js/english.js"), "const ENGLISH_DATA =");
// Word levels only (b1/b2/c1); other keys such as "love" hold quotes, not vocabulary.
const enAll = Object.entries(english)
  .filter(([, list]) => Array.isArray(list) && list.length && typeof list[0] === "object" && "word" in list[0])
  .flatMap(([lvl, list]) => list.map((w) => ({ ...w, lvl })));
check("English entries have word/ipa/type/meaning", enAll.filter((w) => !w.word || !w.ipa || !w.type || !w.meaning).map((w) => `${w.lvl}: ${w.word}`));
const enWords = enAll.map((w) => w.word.toLowerCase());
check("each English word appears once", enWords.filter((w, i) => enWords.indexOf(w) !== i));
// allow inflections: "cherish" matches "cherished", "ephemeral" matches "ephemerality"
const stem = (w) => w.toLowerCase().replace(/(e|y|ies|es|s|ed|ing)$/, "").slice(0, Math.max(4, w.length - 3));
check("English examples contain their word (or an inflection)",
  enAll.filter((w) => w.example && !w.example.toLowerCase().includes(stem(w.word))).map((w) => `${w.lvl}: ${w.word} → ${w.example}`));
check("IPA is wrapped in slashes", enAll.filter((w) => !/^\/.+\/$/.test(w.ipa)).map((w) => `${w.lvl}: ${w.word} ${w.ipa}`));
const enMeanings = {};
enAll.forEach((w) => (enMeanings[`${w.lvl}|${w.meaning.trim().toLowerCase()}`] = (enMeanings[`${w.lvl}|${w.meaning.trim().toLowerCase()}`] || 0) + 1));
check("no two English words in a level share a meaning (quiz ambiguity)",
  Object.entries(enMeanings).filter(([, n]) => n > 1).map(([k]) => k));

// ---------------------------------------------------------------------------------------------------------------
console.log("\nGame data ↔ code");
const dataSrc = read("js/data.js");
const data = (() => {
  const win = {};
  // data.js only assigns window.GAME_DATA
  // eslint-disable-next-line no-new-func
  Function("window", dataSrc)(win);
  return win.GAME_DATA;
})();
const app = read("js/app.js");
const checksBlock = app.slice(app.indexOf("const checks = {"), app.indexOf("};", app.indexOf("const checks = {")));
const checkKeys = [...checksBlock.matchAll(/^\s*(\w+):/gm)].map((m) => m[1]);
check("every achievement has an unlock check in app.js", data.achievements.filter((a) => !checkKeys.includes(a.id)).map((a) => a.id));
check("every unlock check has an achievement", checkKeys.filter((k) => !data.achievements.some((a) => a.id === k)));
const room = read("js/room.js");
const sprites = read("js/sprites.js");
check("every decor item is drawn in the room", data.decorItems.filter((d) => !room.includes(`placed.includes("${d.id}")`)).map((d) => d.id));
check("every decor item has a sprite", data.decorItems.filter((d) => !sprites.includes(`"${d.id}"`)).map((d) => d.id));
const ids = (list) => list.map((x) => x.id).filter((id, i, a) => a.indexOf(id) !== i);
check("ids are unique (letters, decor, foods, achievements)",
  [...ids(data.secretLetters), ...ids(data.decorItems), ...ids(data.foods), ...ids(data.achievements)]);
check("letters only require decor counts that exist",
  data.secretLetters.filter((l) => (l.reqDecor || 0) > data.decorItems.length).map((l) => l.id));
check("study modules never pay rewards directly",
  ["js/chinese.js", "js/english.js"].flatMap((f) => {
    const s = read(f);
    return [/\.candy\s*[+-]?=/.test(s) && `${f} edits state.candy`, /window\.addRewards/.test(s) && `${f} calls window.addRewards`];
  }));

console.log(`\n${passes} passed, ${failures} failed\n`);
process.exit(failures ? 1 : 0);
