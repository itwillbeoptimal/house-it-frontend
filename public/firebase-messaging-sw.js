self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const data = event.data?.json();

  if (!data?.notification) return;

  const { title, body } = data.notification;

  event.waitUntil(self.registration.showNotification(title, { body }));
});
