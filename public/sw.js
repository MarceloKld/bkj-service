// Service worker de BKJ service.
// Pour vider les caches de tous les visiteurs apres une grosse modification, change VERSION.
const VERSION = "v1";
const STATIC_CACHE = `bkj-static-${VERSION}`;
const PAGES_CACHE = `bkj-pages-${VERSION}`;
const IMAGES_CACHE = `bkj-images-${VERSION}`;
const OFFLINE_CACHE = `bkj-offline-${VERSION}`;
const OFFLINE_URL = "/offline.html";
const MAX_PAGES = 40;
const MAX_IMAGES = 80;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(OFFLINE_CACHE)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = [STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE, OFFLINE_CACHE];
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => name.startsWith("bkj-") && !keep.includes(name)).map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    await Promise.all(keys.slice(0, keys.length - max).map((key) => cache.delete(key)));
  }
}

// Pages : reseau d'abord. Si la connexion tarde (3 s) et que la page est en memoire, on la sert tout de suite.
async function pageStrategy(request, event) {
  const cache = await caches.open(PAGES_CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });

  const network = fetch(request).then(async (response) => {
    if (response.ok && !response.redirected) {
      await cache.put(request, response.clone());
      trim(PAGES_CACHE, MAX_PAGES);
    }
    return response;
  });
  event.waitUntil(network.catch(() => undefined));

  try {
    if (cached) {
      const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), 3000));
      return await Promise.race([network, timeout]);
    }
    return await network;
  } catch (error) {
    return cached || (await caches.match(OFFLINE_URL)) || Response.error();
  }
}

// Fichiers du site (noms uniques) : memoire d'abord
async function staticStrategy(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

// Images : on sert la version en memoire et on la rafraichit en arriere-plan
async function imageStrategy(request) {
  const cache = await caches.open(IMAGES_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
        trim(IMAGES_CACHE, MAX_IMAGES);
      }
      return response;
    })
    .catch(() => cached || Response.error());
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(pageStrategy(request, event));
  } else if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(staticStrategy(request));
  } else if (
    url.pathname.startsWith("/_next/image") ||
    /\.(?:webp|png|jpe?g|svg|avif|gif|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(imageStrategy(request));
  }
});

// Le site demande de memoriser les pages principales apres le chargement
self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "CACHE_URLS") return;
  const urls = Array.isArray(event.data.urls) ? event.data.urls : [];

  event.waitUntil(
    (async () => {
      const cache = await caches.open(PAGES_CACHE);
      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (response.ok && !response.redirected) await cache.put(url, response);
        } catch (error) {
          // page ignoree, on continue
        }
      }
      await trim(PAGES_CACHE, MAX_PAGES);
    })(),
  );
});