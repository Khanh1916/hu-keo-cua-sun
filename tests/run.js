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
  const { open: i, end } = balancedRange(src, marker);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${src.slice(i, end)});`)();
}

// Source text of a whole function declaration, e.g. extractFunction(src, "pickQuizTargets").
function extractFunction(src, name) {
  const marker = `function ${name}(`;
  return src.slice(src.indexOf(marker), balancedRange(src, marker).end);
}

// From `marker`, find the first { or [ and its matching close (string-aware). Returns { at, open, end }.
function balancedRange(src, marker) {
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
        return { at, open: i, end: k + 1 };
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
const viewport = (html.match(/<meta name="viewport" content="([^"]*)"/) || [])[1] || "";
const css = read("css/style.css");
check("page can be pinch-zoomed, game canvases cannot", [
  !viewport && "viewport meta not found",
  /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?/.test(viewport) && `viewport blocks zoom: ${viewport}`,
  !/\.minigame-canvas-wrap\s*\{[^}]*touch-action:\s*none/.test(css) && ".minigame-canvas-wrap lost touch-action: none",
  !/html\s*\{[^}]*touch-action:\s*manipulation/.test(css) && "html lost touch-action: manipulation (double-tap zoom on buttons)"]);
check("font cache survives activate", /k !== FONT_CACHE/.test(sw) ? null : "activate deletes FONT_CACHE");

// ---------------------------------------------------------------------------------------------------------------
console.log("\nAudio");
const audio = read("js/audio.js");
const noteTable = extractLiteral(audio, "const N =");
const usedNotes = [...new Set([...audio.matchAll(/\bN\.([A-G]\d)\b/g)].map((m) => m[1]))];
check("every N.<note> used in a tune is defined", usedNotes.filter((n) => !(n in noteTable)).map((n) => `N.${n} is undefined (silent)`));

// ---------------------------------------------------------------------------------------------------------------
console.log("\nNón Lá voice matching");
check("voice mode needs the words in the right order (extra words allowed)", (() => {
  const src = read("js/game_nonla.js");
  const a = src.indexOf("function normalizeVN");
  const b = src.indexOf("const usedTargets");
  const c = src.indexOf("function matchesTarget");
  const d = src.indexOf("function handleSpeechResults");
  if (a < 0 || b < 0 || c < 0 || d < 0) return ["could not locate the matching functions"];
  const match = new Function(`${src.slice(a, b)}\n${src.slice(c, d)}\nreturn matchesTarget;`)();
  const cases = [
    [["lại cứ chìm sâu"], "lại cứ chìm sâu", true],
    [["ừm lại cứ chìm sâu nha"], "lại cứ chìm sâu", true],   // extra words around
    [["lại chìm cứ sâu"], "lại cứ chìm sâu", false],          // same words, wrong order
    [["sâu chìm cứ lại"], "lại cứ chìm sâu", false],
    [["nại cứ chìm sâu"], "lại cứ chìm sâu", false],          // L↔N confusion must still fail
    [["Nhớ lắm"], "nhớ lắm", true]
  ];
  return cases.filter(([heard, target, want]) => match(heard, target) !== want).map(([h, t, w]) => `heard "${h}" vs "${t}" should be ${w}`);
})());

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
check("Ngọc is drawn in the room and has tap dialogue",
  [!/function drawNgoc\(/.test(sprites) && "sprites.js lacks drawNgoc", !room.includes("PixelSprites.drawNgoc(") && "room.js never draws Ngọc",
   !(Array.isArray(data.ngocCompliments) && data.ngocCompliments.length) && "GAME_DATA.ngocCompliments missing/empty"]);
check("hug uses the combined face-to-face sprite",
  [!/function drawHugCouple\(/.test(sprites) && "sprites.js lacks drawHugCouple", !room.includes("PixelSprites.drawHugCouple(") && "room.js never draws the hug sprite",
   !/drawHugCouple\([^)]*flip/.test(sprites) && "drawHugCouple lost its flip (left-side) variant", /ctx\.scale\(-1, ?1\)/.test(room) && "room.js mirrors the hug with ctx.scale again"]);
check("Ngọc reacts to the room: pets Bông, watches the rain, gets sleepy at night",
  [!/mode === "toBong"/.test(room) && "room.js lacks the pet-Bông behaviour", !/mode === "watch"/.test(room) && "room.js lacks the rain-watching behaviour",
   !/"sleepy"/.test(room) && "room.js never sets Ngọc's sleepy state", !/state === "sleepy"/.test(sprites) && "drawNgoc lacks the sleepy pose",
   !/kind === "z"/.test(room) && "room.js cannot draw the sleep particle"]);
check("pronunciation fallback tells the player when it cannot play (offline / error)",
  ["js/chinese.js", "js/english.js"].flatMap((f) => {
    const s = read(f);
    const fb = s.slice(s.indexOf("function playStreamFallback"), s.indexOf("const safetyTimer"));
    return [!/function notifySpeechUnavailable/.test(s) && `${f} lacks notifySpeechUnavailable`,
      !/navigator\.onLine === false/.test(fb) && `${f}: fallback does not check navigator.onLine`,
      !/onerror = fail/.test(fb) && `${f}: audio error is silent`, !/catch\(fail\)/.test(fb) && `${f}: play() rejection is silent`];
  }));
check("study quizzes bring wrong / due words back first (max 3 of 5)", ["js/chinese.js", "js/english.js"].flatMap((f) => {
  const src = read(f);
  const isZh = f.includes("chinese");
  const key = isZh ? "hanzi" : "word";
  let pick;
  try {
    pick = new Function("getSRSMap", "shuffleArray",
      `${extractFunction(src, "isWeakSRS")}
${extractFunction(src, "pickQuizTargets")}
return pickQuizTargets;`);
  } catch (e) {
    return [`${f}: cannot load isWeakSRS/pickQuizTargets (${e.message})`];
  }
  const list = Array.from({ length: 12 }, (_, i) => ({ [key]: `w${i}` }));
  const day = 86400000;
  const now = Date.now();
  const wrong = isZh ? { repetition: 0, mistakes: 1, dueDate: now + day } : { reps: 0, due: now + day, mistakes: 1 };
  const learned = isZh ? { repetition: 3, mistakes: 0, dueDate: now + 7 * day } : { reps: 3, due: now + 7 * day };
  const due = isZh ? { repetition: 2, mistakes: 0, dueDate: now - 1000 } : { reps: 2, due: now - 1000 };
  const srs = { w0: wrong, w1: wrong, w2: due, w3: wrong, w4: learned, w5: learned };
  const out = pick(() => srs, (a) => [...a])(list, 5);
  const problems = [];
  if (out.length !== 5) problems.push(`${f}: picked ${out.length} targets, want 5`);
  const reviews = out.filter((o) => o.review).map((o) => o.word[key]);
  if (reviews.length !== 3) problems.push(`${f}: ${reviews.length} review words, want 3`);
  if (reviews.some((w) => !["w0", "w1", "w2", "w3"].includes(w))) problems.push(`${f}: a review word is not wrong/due (${reviews})`);
  const allWords = out.map((o) => o.word[key]);
  if (new Set(allWords).size !== allWords.length) problems.push(`${f}: duplicate quiz target`);
  if (pick(() => ({}), (a) => [...a])(list.slice(0, 3), 5).length !== 3) problems.push(`${f}: short list should give all its words`);
  if (!/pickQuizTargets\((list|eligible|list\.filter\(quizEligible\(quizMode\)\)), 5\)/.test(extractFunction(src, "startQuiz"))) problems.push(`${f}: startQuiz does not use pickQuizTargets`);
  return problems;
}));
check("room decor does not overlap fixed furniture", (() => {
  // Bounding boxes of the fixed furniture drawn in room.js (bed frame, candy jar) vs decor anchors in sprites.js
  const num = (re) => { const m = sprites.match(re); return m ? [Number(m[1]), Number(m[2])] : null; };
  const lamp = num(/const lx = (\d+), ly = (\d+);/);
  const tree = num(/const cx = (\d+), cy = (\d+);/);
  const out = [];
  if (!lamp || !tree) return ["could not find the lamp / cat tree anchors"];
  // lamp body x lx+1..lx+9; candy jar glass x 196..215, y 95..115
  if (lamp[0] + 9 > 196 && lamp[0] + 1 < 216 && lamp[1] + 13 > 95 && lamp[1] < 116) out.push(`moon lamp at ${lamp} sits inside the candy jar`);
  // cat tree x cx-2..cx+17; bed frame x 8..63, y 114..145
  if (tree[0] - 2 <= 63 && tree[1] + 3 <= 145) out.push(`cat tree at ${tree} overlaps the bed`);
  if (!/drawDecor\(ctx, id, frame, placed/.test(sprites)) out.push("drawDecor lost its placed argument");
  if (!/drawDecor\(ctx, "couple_mugs", frame, placed\)/.test(room)) out.push("room.js does not pass placed to drawDecor");
  return out;
})());
check("Ngọc dances to the vinyl and reads by the bookshelf",
  [!/mode === "dance"/.test(room) && "room.js lacks the dance behaviour", !/ngoc\.mode = "dance"/.test(room.slice(room.indexOf("function triggerVinylSpin"))) && "tapping the vinyl doesn't start the dance",
   !/mode === "read"/.test(room) && "room.js lacks the reading behaviour", !/includes\("bookshelf"\)/.test(room) && "reading isn't tied to the bookshelf",
   !/state === "dance"/.test(sprites) && "drawNgoc lacks the dance pose", !/state === "read"/.test(sprites) && "drawNgoc lacks the reading pose"]);
check("special days: one shared calendar, right dates, data and decor for each", (() => {
  const win = {};
  // eslint-disable-next-line no-new-func
  Function("window", read("js/lunar.js"))(win);
  const get = (d) => win.SpecialDays.getActive(new Date(`${d}T12:00:00`));
  const want = { "2026-02-11": "anniversary", "2026-02-14": "valentine", "2026-02-17": "tet", "2026-03-08": "women83",
    "2026-10-20": "women2010", "2026-09-25": "trungthu", "2027-09-15": "trungthu", "2026-09-24": null, "2026-12-24": "noel",
    "2026-04-15": "ngoc", "2026-06-01": "khanh", "2026-11-24": null };
  const out = Object.entries(want).filter(([d, k]) => get(d) !== k).map(([d, k]) => `${d}: got ${get(d)}, want ${k}`);
  const keys = [...new Set(Object.values(want).filter(Boolean))];
  keys.forEach((k) => {
    const ev = data.specialDays[k];
    if (!ev) return out.push(`GAME_DATA.specialDays.${k} missing`);
    ["banner", "speech", "speaker", "giftLabel"].forEach((f) => { if (!ev[f]) out.push(`specialDays.${k}.${f} missing`); });
    if (!(ev.giftCandy > 0)) out.push(`specialDays.${k}.giftCandy missing`);
    if (!room.includes(`specialDay === "${k}"`)) out.push(`room.js draws nothing for ${k}`);
  });
  [["js/app.js", app], ["js/room.js", room]].forEach(([f, s]) => {
    const fn = extractFunction(s, "getActiveSpecialDay");
    if (!/SpecialDays\.getActive\(\)/.test(fn) || /getMonth/.test(fn)) out.push(`${f} keeps its own copy of the special-day rules`);
  });
  return out;
})());
check("meeting countdown: day maths, wall calendar, no candy door", (() => {
  const win = {};
  // eslint-disable-next-line no-new-func
  Function("window", read("js/lunar.js"))(win);
  const sd = win.SpecialDays;
  const now = new Date(2026, 10, 24, 23, 30); // late evening, local time
  const cases = [["2026-11-24", 0], ["2026-11-25", 1], ["2026-12-06", 12], ["2027-11-24", 365], ["2026-11-23", null],
    ["", null], ["24/11/2026", null]];
  const out = cases.filter(([d, want]) => sd.daysUntil(d, now) !== want).map(([d, want]) => `daysUntil(${d}) = ${sd.daysUntil(d, now)}, want ${want}`);
  if (sd.localDateKey(new Date(2026, 0, 5, 1, 0)) !== "2026-01-05") out.push("localDateKey is not the local day");
  if (!/function drawWallCalendar\(/.test(room)) out.push("room.js lacks the wall calendar");
  if (!/onInteractFn\("calendar"\)/.test(room) || !/who === "calendar"/.test(app)) out.push("tapping the calendar does nothing");
  if (/addRewards/.test(extractFunction(app, "checkMeetDay"))) out.push("meeting day pays candy (player-set date = farmable)");
  ["far", "soon", "tomorrow", "today"].forEach((k) => { if (!(data.meetLines && data.meetLines[k] && data.meetLines[k].length)) out.push(`meetLines.${k} empty`); });
  return out;
})());
check("daily question + mood log: data, saved state, safe text, one reward a day", (() => {
  const out = [];
  const qs = data.dailyQuestions || [];
  if (qs.length < 30) out.push(`only ${qs.length} daily questions`);
  qs.filter((q, i) => qs.indexOf(q) !== i).forEach((q) => out.push(`duplicate question: ${q}`));
  if (!(data.dailyQuestionReplies || []).length) out.push("dailyQuestionReplies empty");
  const nested = app.match(/const NESTED_KEYS = \[([^\]]*)\]/);
  ["dailyAnswers", "moodLog"].forEach((k) => {
    if (!nested || !nested[1].includes(`"${k}"`)) out.push(`${k} not in NESTED_KEYS (reset / restore would break it)`);
  });
  ["renderDailyQuestion", "renderMoodStrip"].forEach((fn) => {
    if (/innerHTML/.test(extractFunction(app, fn))) out.push(`${fn} uses innerHTML for saved text`);
  });
  const save = extractFunction(app, "saveDailyAnswer");
  if (!/const first = !state\.dailyAnswers\[key\]/.test(save) || !/if \(first\) \{\s*addRewards/.test(save)) out.push("saveDailyAnswer must pay only the first answer of the day");
  if (!/state\.moodLog\[/.test(extractFunction(app, "drawNoteFromJar"))) out.push("opening a mood jar does not log the mood");
  if (/showSpeech/.test(save)) out.push("saveDailyAnswer replies in the room bubble, which the modal hides");
  const share = extractFunction(app, "shareDailyAnswer");
  if (!/dailyQSharePanel"\)\.classList\.remove\("hidden"\)/.test(share)) out.push("Gửi cho anh must always show the message box (it looked dead when the share sheet did not open)");
  return out;
})());
check("window scene follows the real clock only (owner removed the manual picker)",
  [/timeOverride/.test(room) && "room.js still reads timeOverride", /id="timeModes"/.test(read("index.html")) && "index.html still has the time picker",
   !/getHours\(\)/.test(extractFunction(room, "getActiveTimeOfDay")) && "getActiveTimeOfDay no longer uses the clock"]);
check("economy: decor affordable in ~2–3 months, mini-game candy capped per day", (() => {
  const out = [];
  const prices = data.decorItems.map((d) => d.price);
  const total = prices.reduce((a, b) => a + b, 0);
  if (total < 4000 || total > 7000) out.push(`decor costs ${total} in total; ~40–70 candy/day means it should be 4,000–7,000`);
  prices.forEach((p, i) => { if (i && p < prices[i - 1]) out.push(`${data.decorItems[i].id} (${p}) is cheaper than the item before it`); });
  // Run the real handleArcadeGameOver + arcadeCandyLeft against stub state/DOM
  const el = () => ({ textContent: "", innerHTML: "", classList: { add() {}, remove() {} } });
  const els = {};
  const doc = { getElementById: (id) => (els[id] = els[id] || el()) };
  const st = { bestScore: 999, dailyInteractions: { arcadeCandy: 0 }, dailyQuests: { gameDone: true } };
  let paid = 0;
  let run;
  try {
    run = new Function("document", "state", "addRewards",
      `const ARCADE_META = { catch: { bestKey: "bestScore" } };
${(app.match(/const ARCADE_MAX_CANDY = \d+;/) || [""])[0]} const ARCADE_MIN_SCORE_FOR_REWARD = 10;
${(app.match(/const ARCADE_DAILY_CANDY = \d+;/) || [""])[0]}
function syncDailyReset() {} function saveState() {} function updateQuestDot() {}
${extractFunction(app, "arcadeCandyLeft")}
${(() => { const m = "function handleArcadeGameOver(gameKey, { score, candies, hitPoop, reason })"; return app.slice(app.indexOf(m), balancedRange(app, m).end); })()}
return handleArcadeGameOver;`)(doc, st, (xp, c) => { paid += c; });
  } catch (e) {
    return [...out, `cannot load handleArcadeGameOver/arcadeCandyLeft (${e.message})`];
  }
  const cap = Number((app.match(/const ARCADE_DAILY_CANDY = (\d+);/) || [])[1]);
  if (!(cap >= 20 && cap <= 60)) out.push(`ARCADE_DAILY_CANDY = ${cap}, keep it 20–60 (decor pacing)`);
  for (let i = 0; i < 40; i++) run("catch", { score: 100, candies: 9 });
  if (paid !== cap) out.push(`40 big runs paid ${paid}, want the daily cap of ${cap}`);
  if (st.dailyInteractions.arcadeCandy !== cap) out.push(`dailyInteractions.arcadeCandy = ${st.dailyInteractions.arcadeCandy}, want ${cap}`);
  if (!/cap|đủ/.test(els.mgResultBox.innerHTML)) out.push("the result screen doesn't say the daily game candy is used up");
  if (!/arcadeCandy: 0/.test(app.slice(app.indexOf("dailyInteractions: {"), app.indexOf("dailyStudy: {")))) out.push("arcadeCandy missing from DEFAULT_STATE.dailyInteractions (daily reset)");
  return out;
})());
check("study candy: one STUDY_CANDY table per module, used by every reward and its text", ["js/chinese.js", "js/english.js"].flatMap((f) => {
  const s = read(f);
  const out = [];
  const m = s.match(/const STUDY_CANDY = (\{[^}]*\});/);
  if (!m) return [`${f} lacks STUDY_CANDY`];
  // eslint-disable-next-line no-new-func
  const t = Function(`return (${m[1]});`)();
  ["daily", "quiz", "match"].forEach((k) => { if (!(t[k] >= 1 && t[k] <= 8)) out.push(`${f}: STUDY_CANDY.${k} = ${t[k]}, keep 1–8`); });
  [...s.matchAll(/grantStudyReward\("(\w+)", \d+, ([^)]+)\)/g)].forEach(([, kind, candy]) => {
    if (candy.trim() !== `STUDY_CANDY.${kind}`) out.push(`${f}: ${kind} reward pays ${candy} instead of STUDY_CANDY.${kind}`);
  });
  (s.match(/\+\d+ 🍬/g) || []).forEach((x) => out.push(`${f}: hard-coded "${x}" in a reward text (use STUDY_CANDY)`));
  return out;
}));
check("wardrobe: every outfit has a look, saved state is safe, room draws what is worn", (() => {
  const out = [];
  const win = {};
  // eslint-disable-next-line no-new-func
  Function("window", sprites)(win);
  const looks = win.PixelSprites.OUTFIT_IDS || [];
  const outfits = data.outfits || [];
  outfits.forEach((o) => {
    if (!looks.includes(o.id)) out.push(`${o.id} has no look in sprites.js OUTFITS`);
    if (!["ngoc", "khanh", "bong"].includes(o.who)) out.push(`${o.id}: who = ${o.who}`);
    if (!(o.price > 0)) out.push(`${o.id}: no price`);
  });
  looks.filter((id) => !outfits.some((o) => o.id === id)).forEach((id) => out.push(`sprites.js look ${id} is not sold`));
  ids(outfits).forEach((id) => out.push(`duplicate outfit id ${id}`));
  if (!/const ARRAY_KEYS = \[[^\]]*"ownedOutfits"/.test(app)) out.push("ownedOutfits not in ARRAY_KEYS (reset would keep purchases)");
  if (!/const NESTED_KEYS = \[[^\]]*"wornOutfits"/.test(app)) out.push("wornOutfits not in NESTED_KEYS");
  ["drawKhanh(ctx, khanh.x, khanh.y, khanh.state, frame, worn.khanh)", "drawNgoc(ctx, ngoc.x, ngoc.y, ngoc.dir, ngoc.state, frame, worn.ngoc)",
    "frame, worn.bong)", "side < 0, worn.khanh, worn.ngoc)"].forEach((call) => { if (!room.includes(call)) out.push(`room.js does not pass outfits: ${call}`); });
  return out;
})());
check("shared plant: stages ascend, visits counted once per day, drawn and tappable", (() => {
  const out = [];
  const st = data.plantStages || [];
  if (!st.length || st[0].days !== 0) out.push("plantStages must start at 0 days");
  st.forEach((s, i) => { if (i && s.days <= st[i - 1].days) out.push(`plantStage ${s.name} (${s.days}) not after ${st[i - 1].name}`); });
  const reset = extractFunction(app, "syncDailyReset");
  if (!/state\.lastVisitDate !== visitKey/.test(reset) || !/state\.visitDays = \(state\.visitDays \|\| 0\) \+ 1/.test(reset)) out.push("syncDailyReset does not count one visit per day");
  if (!/drawSharedPlant\(state, specialDay\)/.test(room)) out.push("room.js does not draw the plant");
  if (!/onInteractFn\("plant"\)/.test(room) || !/who === "plant"/.test(app)) out.push("tapping the plant does nothing");
  if (/addRewards/.test(extractFunction(app, "speakPlant"))) out.push("the plant pays rewards (visits already pay via quests)");
  return out;
})());
check("photo wall: on-device only, safe captions, hung in the room", (() => {
  const src = read("js/photos.js");
  const out = [];
  if (/innerHTML/.test(src)) out.push("photos.js uses innerHTML (captions are user text)");
  if (/fetch\(|XMLHttpRequest|sendBeacon/.test(src)) out.push("photos.js talks to the network (photos must stay on the device)");
  if (!/indexedDB\.open\(/.test(src)) out.push("photos.js does not use IndexedDB");
  if (!/drawPhotoString\(\)/.test(room) || !/PhotoWall\.getRoomThumbs\(\)/.test(room)) out.push("room.js does not hang the photos");
  if (!/onInteractFn\("photos"\)/.test(room) || !/PhotoWall\.open\(\)/.test(app)) out.push("tapping the photo string does nothing");
  return out;
})());
check("new-feature achievements are re-checked on paths that pay no rewards", (() => {
  const out = [];
  if (!/if \(newVisit\) checkAchievements\(\)/.test(extractFunction(app, "syncDailyReset"))) out.push("a new visit day does not re-check achievements (visit_7, plant_bloom)");
  if (!/saveState\(\);\s*checkAchievements\(\); \/\/ wardrobe_trio/.test(app)) out.push("wearing an outfit does not re-check achievements");
  if (!/saveState\(\);\s*checkAchievements\(\); \/\/ meet_set/.test(app)) out.push("saving the meeting date does not re-check achievements");
  if (!/GameState\.checkAchievements\(\)/.test(extractFunction(read("js/photos.js"), "refresh"))) out.push("photos.js does not re-check achievements after the wall changes");
  return out;
})());
check("letters only require decor counts that exist",
  data.secretLetters.filter((l) => (l.reqDecor || 0) > data.decorItems.length).map((l) => l.id));
check("tone quiz: three wrong pinyin per word, differing from the answer only in tone marks", (() => {
  const zh = read("js/chinese.js");
  let fns;
  try {
    // eslint-disable-next-line no-new-func
    fns = new Function("shuffleArray", `${zh.match(/const TONE_VOWELS = [^;]+;/)[0]}
${extractFunction(zh, "toneMarks")}
${extractFunction(zh, "toneVariants")}
return { toneMarks, toneVariants };`)((a) => [...a].sort(() => Math.random() - 0.5));
  } catch (e) {
    return [`cannot load toneMarks/toneVariants (${e.message})`];
  }
  const plain = (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const out = [];
  hskAll.filter((w) => w.lvl !== "love").forEach((w) => {
    const n = fns.toneMarks(w.pinyin).length;
    if (n < 1 || n > 4) return;
    for (let r = 0; r < 5; r++) {
      const v = fns.toneVariants(w.pinyin, 3);
      if (v.length !== 3 || new Set(v).size !== 3) out.push(`${w.hanzi} ${w.pinyin}: got ${JSON.stringify(v)}`);
      if (v.includes(w.pinyin)) out.push(`${w.hanzi}: a wrong option equals the answer`);
      if (v.some((x) => plain(x) !== plain(w.pinyin))) out.push(`${w.hanzi}: a variant changed more than the tone (${v.join(", ")})`);
    }
  });
  const toneable = hskAll.filter((w) => w.lvl !== "love" && fns.toneMarks(w.pinyin).length >= 1 && fns.toneMarks(w.pinyin).length <= 4).length;
  if (toneable < 100) out.push(`only ${toneable} HSK words can be tone questions`);
  return [...new Set(out)];
})());
check("English fill-in quiz finds the word (or its inflection) in every example", (() => {
  let cloze;
  try {
    // eslint-disable-next-line no-new-func
    cloze = new Function(`${extractFunction(read("js/english.js"), "clozeParts")} return clozeParts;`)();
  } catch (e) {
    return [`cannot load clozeParts (${e.message})`];
  }
  return enAll.filter((w) => {
    const c = cloze(w);
    return !c || !c.answer || `${c.before}${c.answer}${c.after}` !== w.example;
  }).map((w) => `${w.lvl}: ${w.word} → ${w.example}`);
})());
check("Ôn hôm nay lists only words that need review, and quiz modes share one quiz reward", ["js/chinese.js", "js/english.js"].flatMap((f) => {
  const src = read(f);
  const isZh = f.includes("chinese");
  const out = [];
  if ((src.match(/grantStudyReward\("quiz"/g) || []).length !== 1) out.push(`${f}: quiz modes must pay through one grantStudyReward("quiz") call`);
  if (!/data-tab="review"/.test(read("index.html").slice(read("index.html").indexOf(isZh ? "chinese-tabs-nav" : "english-tabs-nav")))) out.push(`${f}: no Ôn hôm nay tab in index.html`);
  if (!/tabKey === "review"\) renderReviewTab\(\)/.test(src)) out.push(`${f}: switchTab doesn't open the review tab`);
  const key = isZh ? "hanzi" : "word";
  const levels = isZh ? { hsk1: [], hsk2: [], love: [] } : { b1: [], b2: [], c1: [] };
  const lvlKeys = Object.keys(levels).filter((k) => k !== "love");
  for (let i = 0; i < 8; i++) levels[lvlKeys[i % lvlKeys.length]].push({ [key]: `w${i}`, meaning: `m${i}` });
  levels.love && levels.love.push({ [key]: "w0love" });
  const day = 86400000;
  const now = Date.now();
  const wrong = isZh ? { repetition: 0, mistakes: 2, dueDate: now + day } : { reps: 0, due: now + day, mistakes: 2 };
  const learned = isZh ? { repetition: 3, mistakes: 0, dueDate: now + 7 * day } : { reps: 3, due: now + 7 * day };
  const due = isZh ? { repetition: 2, mistakes: 0, dueDate: now - 1000 } : { reps: 2, due: now - 1000 };
  const srs = { w0: wrong, w1: learned, w2: due, w3: learned, w0love: wrong };
  try {
    // eslint-disable-next-line no-new-func
    const get = new Function(isZh ? "HSK_DATA" : "ENGLISH_DATA", "getSRSMap", `${extractFunction(src, "isWeakSRS")}
${extractFunction(src, "getReviewWords")}
return getReviewWords;`)(levels, () => srs);
    const got = get().map((w) => w[key]);
    if (got.join() !== "w0,w2") out.push(`${f}: review list = ${JSON.stringify(got)}, want ["w0","w2"] (wrong first, learned/new/love left out)`);
  } catch (e) {
    out.push(`${f}: cannot load getReviewWords (${e.message})`);
  }
  return out;
}));
check("study modules never pay rewards directly",
  ["js/chinese.js", "js/english.js"].flatMap((f) => {
    const s = read(f);
    return [/\.candy\s*[+-]?=/.test(s) && `${f} edits state.candy`, /window\.addRewards/.test(s) && `${f} calls window.addRewards`];
  }));

console.log(`\n${passes} passed, ${failures} failed\n`);
process.exit(failures ? 1 : 0);
