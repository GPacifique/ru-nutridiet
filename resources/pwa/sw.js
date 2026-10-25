const CACHE_NAME = 'runutridiet-pwa-v2';
const PRECACHE_URLS = [
    '/offline.html',
    '/site.webmanifest',
    '/images/pwa-icon-192.png',
    '/images/pwa-icon-512.png',
    '/images/logoru.jpg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((key) => key.startsWith('runutridiet-pwa-') && key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== 'GET' || url.origin !== self.location.origin) return;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).catch(async () => (
                await caches.match('/offline.html')
                || new Response('You are offline. Please reconnect and try again.', {
                    status: 503,
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
                })
            ))
        );
        return;
    }

    const isStaticAsset = url.pathname.startsWith('/build/assets/')
        || url.pathname.startsWith('/images/')
        || url.pathname === '/site.webmanifest'
        || url.pathname === '/favicon.ico';

    if (!isStaticAsset) return;

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        if (cached) return cached;

        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
    })());
});
