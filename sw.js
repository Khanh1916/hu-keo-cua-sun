const CACHE_NAME = "hu-keo-sun-v17";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.svg",
  "./icon-180.png",
  "./icon-512.png",
  "./css/style.css?v=17",
  "./js/data.js?v=17",
  "./js/lunar.js?v=17",
  "./js/weather.js?v=17",
  "./js/audio.js?v=17",
  "./js/sprites.js?v=17",
  "./js/room.js?v=17",
  "./js/minigame.js?v=17",
  "./js/game_crossing.js?v=17",
  "./js/game_flappy.js?v=17",
  "./js/game_nonla.js?v=17",
  "./js/app.js?v=17"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for same-origin assets so updates arrive immediately when online,
// while falling back cleanly to cache when offline (bus/train/no 4G).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request.mode === "navigate" ? new Request(event.request, { cache: "no-store" }) : event.request)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((hit) => hit || caches.match("./index.html")))
  );
});
