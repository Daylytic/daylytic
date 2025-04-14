/* eslint-disable no-undef */
self.addEventListener("push", (event) => {
  try {
    let data = { title: "Daylytic", body: "New notification" };

    if (event.data) {
      data = JSON.parse(event.data.text());
    }

    const options = {
      body: data.body,
      data: data.timestamp,
      icon: "/web-app-manifest-192x192.png",
      badge: "/favicon-96x96.png",
      vibrate: [100, 50, 100],
      timestamp: new Date(data.timestamp).getTime(),
      renotify: false,
      requireInteraction: true,
      tag: "daylytic-notification",
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } catch (error) {
    console.error("Error showing notification:", error);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow("https://daylytic.com"));
});
