self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('sashvini-store').then(function (cache) {
      return cache.addAll([
        '/',
        '/nsp.html',
        '/icon-192.png',
        '/icon-512.png',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
