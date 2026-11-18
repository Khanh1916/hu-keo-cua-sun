// Single source of truth for the cache/asset version.
// When bumping: change ASSET_VERSION here AND every "?v=" in index.html to the same number.
const ASSET_VERSION = "60";
const CACHE_NAME = `hu-keo-sun-v${ASSET_VERSION}`;
// Google Fonts (Pixelify Sans + Quicksand) live in their own cache that survives version bumps:
// the font files never change for a given URL, and without them offline mode falls back to system fonts.
const FONT_CACHE = "hu-keo-sun-fonts";
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
const q = `?v=${ASSET_VERSION}`;
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.svg",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  `./css/style.css${q}`,
  `./js/data.js${q}`,
  `./js/lunar.js${q}`,
  `./js/weather.js${q}`,
  `./js/audio.js${q}`,
  `./js/sprites.js${q}`,
  `./js/room.js${q}`,
  `./js/minigame.js${q}`,
  `./js/game_crossing.js${q}`,
  `./js/game_flappy.js${q}`,
  `./js/game_nonla.js${q}`,
  `./js/game_memory.js${q}`,
  `./js/chinese.js${q}`,
  `./js/english.js${q}`,
  `./js/app.js${q}`
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== FONT_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Stale-while-revalidate for Google Fonts: answer from cache instantly (works offline), refresh in the background.
// The stylesheet is requested no-cors by <link>, so its response is opaque (status 0); that is still cacheable.
function handleFont(event) {
  event.respondWith(
    caches.open(FONT_CACHE).then((cache) =>
      cache.match(event.request).then((hit) => {
        const network = fetch(event.request)
          .then((res) => {
            if (res && (res.ok || res.type === "opaque")) cache.put(event.request, res.clone());
            return res;
          })
          .catch(() => hit || Response.error());
        return hit || network;
      })
    )
  );
}

// Network-first for same-origin assets so updates arrive immediately when online,
// while falling back cleanly to cache when offline (bus/train/no 4G).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (FONT_HOSTS.includes(url.hostname)) {
    handleFont(event);
    return;
  }
  if (url.origin !== self.location.origin) return;

  const isNavigate = event.request.mode === "navigate";

  event.respondWith(
    fetch(isNavigate ? new Request(event.request, { cache: "no-store" }) : event.request)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(event.request).then((hit) => {
          if (hit) return hit;
          // Only pages may fall back to index.html; serving HTML for a missing .js/.css breaks parsing.
          if (isNavigate) return caches.match("./index.html");
          return Response.error();
        })
      )
  );
});
