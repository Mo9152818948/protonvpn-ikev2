self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("vpn-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/offline.html"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then((resp) => resp || caches.match("offline.html")))
  );
});
