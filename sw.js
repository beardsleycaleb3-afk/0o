/**
 * 0o - Service Worker
 * Purpose: Cache-Lock & Offline Persistence
 */

const CACHE_NAME = '0o-v3';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './manifest.json',
    './assets/icon.png',
    './assets/icon192.png',
    './modules/kernel.js',
    './modules/ppu.js',
    './modules/audio.js',
    './modules/clock.js',
    './modules/rdram.js',
    './modules/linker.js',
    './src/manager.js',
    './src/grid.js',
    './src/canvas.js',
    './src/renderer.js',
    './src/fileconverter.js',
    './src/base.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
