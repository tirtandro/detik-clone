// Service Worker for ideguru PWA
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('ideguru-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/offline',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/offline');
      });
    })
  );
});
