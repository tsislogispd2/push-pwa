importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAY6hxVbTaR_y4TAjE5x48yFfp2JvdF1NA",
  authDomain: "notification-logis.firebaseapp.com",
  projectId: "notification-logis",
  storageBucket: "notification-logis.firebasestorage.app",
  messagingSenderId: "769100859721",
  appId: "1:769100859721:web:d0aab12924931c423c3298",
  measurementId: "G-T6EC07JZLB"
});

const messaging = firebase.messaging();

// ข้อความแบบ data-only → เราสร้างการแจ้งเตือนเอง
messaging.onBackgroundMessage((payload) => {
  const d = payload.data || {};
  return self.registration.showNotification(d.title || 'แจ้งเตือน', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: d.url || '' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || self.registration.scope;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) { c.focus(); if (url) c.navigate(url).catch(() => {}); return; }
      }
      return clients.openWindow(url);
    })
  );
});