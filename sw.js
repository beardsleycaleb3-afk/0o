const NAME = '0o-v2';
const CACHE_LIST = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png',
  'https://esm.sh/three@0.177.0'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(NAME).then((c) => c.addAll(CACHE_LIST)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(
    ks.filter(k => k !== NAME).map(k => caches.delete(k))
  )));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
