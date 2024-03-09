/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type {};
declare const self: ServiceWorkerGlobalScope;

const cacheName = "RS-serviceworker";
const version = "v0.0.1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName + version).then((cache) => {
      return cache.addAll(["/", "/offline"]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.indexOf(version) !== 0)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Always fetch non-GET requests from the network
  if (request.method !== "GET") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("/offline"),
      ) as Promise<Response>,
    );
    return;
  }

  // For HTML requests, try the network first, fall back to the cache,
  // finally the offline page
  if (
    request.headers.get("Accept")?.indexOf("text/html") !==
      -1 &&
    request.url.startsWith(self.origin)
  ) {
    // The request is text/html, so respond by caching the
    // item or showing the /offline offline
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Stash a copy of this page in the cache
          const copy = response.clone();
          caches
            .open(version + cacheName)
            .then(function (cache) {
              cache.put(request, copy);
            });
          return response;
        })
        .catch(() =>
          caches.match(request).then(function (response) {
            // return the cache response or the /offline page.
            return response || caches.match("/offline");
          }),
        ) as Promise<Response>,
    );
    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  if (
    request.headers.get("Accept")?.indexOf("text/plain") ===
      -1 &&
    request.url.startsWith(self.origin)
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (response ||
          fetch(request)
            .then((response) => {
              const copy = response.clone();

              if (
                copy.headers
                  .get("Content-Type")
                  ?.indexOf("text/plain") === -1
              ) {
                caches
                  .open(version + cacheName)
                  .then(function (cache) {
                    cache.put(request, copy);
                  });
              }
              return response;
            })
            .catch(() => {
              // you can return an image placeholder here with
              if (
                request.headers
                  .get("Accept")
                  ?.indexOf("image") !== -1
              ) {
              }
            })) as Promise<Response>;
      }),
    );
    return;
  }
});

self.addEventListener("push", (event) => {
  console.log("Push notification received", event);
  if (!event.data) return;

  const notification = event.data.json() as {
    title: string;
    body: string;
  };
  event.waitUntil(
    self.registration.showNotification(notification.title, {
      body: notification.body,
      actions: [
        {
          action: "open",
          title: "Open",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
    }),
  );
});
