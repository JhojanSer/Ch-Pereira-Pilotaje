// Service Worker — CHP Pilotaje
// Estrategia: "network-first" para el HTML de la app (para que siempre
// cargues la versión más reciente cuando hay internet), con respaldo en
// caché solo cuando no hay conexión. Los íconos se sirven de caché directo.
// Todo lo que no es del mismo origen (Firebase, Google Fonts, CDNs) se deja
// pasar sin tocar — el service worker nunca interfiere con Firestore/Auth.

const CACHE_NAME = "chp-pilotaje-shell-v1";
const APP_SHELL = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Nunca intervenir peticiones fuera de nuestro propio origen
  // (Firebase Auth/Firestore, Google Fonts, CDNs de React/Tailwind/Chart.js, etc.)
  if (url.origin !== self.location.origin) return;
  if (req.method !== "GET") return;

  // Navegación / HTML: red primero, caché como respaldo sin conexión
  if (req.mode === "navigate" || url.pathname.endsWith("index.html") || url.pathname === "/" ) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Resto de archivos propios (íconos, manifest): caché primero, red de respaldo
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
