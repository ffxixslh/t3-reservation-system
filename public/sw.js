self.addEventListener("install", (event) => {
  console.log("Service Worker has been installed");
});

self.addEventListener("activate", (event) => {
  console.log('Service Worker has been activated');
});

self.addEventListener('push', (event) => {
  if (!event.data) return;

  /**
   * @type {{title: string, options: NotificationOptions}} notification
   */
  const notification = event.data.json();

  event.waitUntil(
    self.registration.showNotification(
      notification.title,
      notification.options,
    )
  );
});

self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('pushsubscriptionchange event: ', event);

  event.waitUntil(
    fetch(`${window.location.origin}/api/pushsubscriptionchange}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        old_endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
        new_endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
        new_p256dh: event.newSubscription ? event.newSubscription.toJSON().keys.p256dh : null,
        new_auth: event.newSubscription ? event.newSubscription.toJSON().keys.auth : null
      })
    })
  );
})

self.addEventListener('notificationclick', (event) => {
  const action = event.action;

  event.notification.close();
})