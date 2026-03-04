const CACHE_NAME = 'dishara-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/pages/restaurants.html',
  '/pages/menu.html',
  '/pages/cart.html',
  '/pages/dashboard.html',
  '/pages/login.html',
  '/pages/register.html',
  '/pages/orders.html',
  '/css/style.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/app.js',
  '/js/data.js',
  '/js/particles.js',
  '/js/animations.js',
  '/js/restaurants.js',
  '/js/menu.js',
  '/js/cart.js',
  '/js/dashboard.js',
  '/js/auth.js',
  '/js/orders.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(err => console.warn('[SW] Cache failed for some assets:', err));
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first with cache fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match('/Dishara/')))
  );
});

// Push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'Dishara', body: 'Your order update is here!' };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Dishara', {
      body: data.body || 'Check your order status',
      icon: '/Dishara/icons/icon-192.png',
      badge: '/Dishara/icons/icon-96.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/Dishara/pages/orders.html' }
    })
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
