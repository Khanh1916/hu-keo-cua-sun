# AGENTS.md — Hũ Kẹo Của Sún

Notes for any coding agent (Claude, Codex, Cursor, Copilot, …) working on this repo.
Read this before editing; **append to the "Change log" at the bottom whenever you change behaviour.**

`CLAUDE.md` and `GEMINI.md` only contain `@AGENTS.md` (import), so this is the single source of truth — edit this file, not those.

## What this is
Static PWA (no build step, no dependencies): a pixel-art room game with a cat (Bông), a message jar, secret letters,
a shop, daily quests, 5 canvas mini-games, plus Chinese and English study modules. Hosted as static files (GitHub Pages,
`.nojekyll` present). UI text is Vietnamese — keep it Vietnamese.

## Layout
| Path | Role |
|---|---|
| `index.html` | Single page; loads every script with `defer` and `?v=N` |
| `sw.js` | Service worker (offline cache). **Version lives here too** |
| `css/style.css` | All styles |
| `js/app.js` | Main controller: state/save (`localStorage` key `hu_keo_cua_sun_save_v1`), rewards, arcade hub, modals |
| `js/room.js`, `sprites.js`, `audio.js`, `weather.js`, `lunar.js`, `data.js` | Room scene, pixel sprites, audio, weather, lunar calendar, content data |
| `js/minigame.js` | Hứng Kẹo (catch) |
| `js/game_crossing.js` | Bông Sang Đường |
| `js/game_flappy.js` | Bông Bay Tìm Kẹo |
| `js/game_nonla.js` | Nón Lá L-N (speech recognition + quiet multiple-choice mode) |
| `js/game_memory.js` | Ghép Cặp Kỷ Niệm |
| `js/chinese.js`, `js/english.js` | Study modules (large data files) |

Each mini-game is an IIFE on `window` exposing `init/start/stop/isRunning` (Memory and Nón Lá also `suspend/resume`).
All five share one `<canvas id="miniGameCanvas" width="240" height="280">`. `app.js` (`ARCADE_META`, `handleArcadeGameOver`)
wires them to the HUD and rewards.

## Rules that are easy to break
1. **Version bump = two places.** Change `ASSET_VERSION` in `sw.js` *and* every `?v=` in `index.html` to the same number.
   `sw.js` builds its precache list from `ASSET_VERSION`, so a mismatch silently breaks offline use.
2. **New JS/CSS file** → add it to `CORE_ASSETS` in `sw.js` and to `index.html`.
3. **Game timing must be fixed-step (60 Hz).** Use the `FIXED_STEP` accumulator pattern (see `game_flappy.js`, `game_memory.js`).
   Never count frames inside `requestAnimationFrame`/render — 120 Hz phones run it twice as fast.
4. **`render()`/`draw()` must be side-effect free**; timers and motion go in `update()`.
5. **Tracked timeouts.** Any `setTimeout` that can end or mutate a game must be cleared in `start()`/`stop()`
   (see `later()` / `clearTimers()` in `game_memory.js`), otherwise it fires into another screen.
6. **Global key handlers** (`window` keydown) must check the game's `running` flag, or they swallow typing elsewhere.
7. **Rewards are capped centrally** in `handleArcadeGameOver` (`ARCADE_MAX_CANDY`, `ARCADE_MIN_SCORE_FOR_REWARD`).
   The HUD candy counter is capped to match. Don't add a per-game payout path around it.
8. **Nón Lá data** (`CHALLENGES`): the sentence with `___` replaced by `right` must read correctly, and `wrong` is the L↔N
   confusion of the same syllable. `target`/`ngong` are only used in voice mode.

## Testing
No test suite or build. Check syntax with `for f in js/*.js sw.js; do node --check "$f"; done`, then play each game in a
browser (desktop keyboard + mobile touch/emulation, and ideally a 120 Hz display). For service-worker changes, test with
DevTools → Application → "Offline" after one online load.

## Known gaps / ideas (not done)
- `user-scalable=no` in the viewport tag hurts accessibility.
- Crossing: `lanes` grows without bound in very long runs; swipes that end outside the canvas leave a stale `touchStart`.
- Nón Lá voice mode: bag-of-words matching accepts words in any order; recognizer restarts may beep on some Android builds.
- No daily cap on arcade XP (only a minimum score of 10 per run).

## Change log
### 2026-11-17 — bug-fix pass (asset version 39 → 40)
- **sw.js**: precache listed `?v=36` while `index.html` used `?v=39`, so offline-after-first-visit could fail. Version is now a
  single `ASSET_VERSION`; non-navigation requests no longer fall back to `index.html` offline. Bumped to **v40**
  (`index.html` updated to match).
- **game_memory.js**: peek/banner/particle timing is now fixed 60 Hz (was per-frame → ~0.9 s peek on 120 Hz); status banner
  moved to the strip below the grid (it used to cover row 2 cards during the peek); running out of turns after a *successful*
  match now ends the game; all `setTimeout`s tracked and cleared on `start()/stop()`; a victory/defeat that comes due while
  suspended is delivered on `resume()`; defeat/victory payout never below the HUD candy count.
- **game_flappy.js**: 50/100/160 milestones are one-shot per run (they were range checks and paid twice); holding Space no
  longer auto-flaps (`e.repeat` ignored).
- **minigame.js**: held-key state is cleared on window blur, tab hide and `start()` (basket no longer drifts after focus loss).
- **game_nonla.js**: fixed quiet-mode questions "ngọt lịm", "nhớ lắm", "nũng nịu" (answer duplicated a word / sentence made no sense).
- **app.js**: HUD candy counter capped at 3 to match payout; runs scoring < 10 earn no XP/candy (anti-farm).
