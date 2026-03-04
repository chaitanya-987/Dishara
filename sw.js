const CACHE_NAME = 'dishara-v1';
const STATIC_ASSETS = [
  '/Dishara/',
  '/Dishara/index.html',
  '/Dishara/pages/restaurants.html',
  '/Dishara/pages/menu.html',
  '/Dishara/pages/cart.html',
  '/Dishara/pages/dashboard.html',
  '/Dishara/pages/login.html',
  '/Dishara/pages/register.html',
  '/Dishara/pages/orders.html',
  '/Dishara/css/style.css',
  '/Dishara/css/animations.css',
  '/Dishara/css/responsive.css',
  '/Dishara/js/app.js',
  '/Dishara/js/data.js',
  '/Dishara/js/particles.js',
  '/Dishara/js/animations.js',
  '/Dishara/js/restaurants.js',
  '/Dishara/js/menu.js',
  '/Dishara/js/cart.js',
  '/Dishara/js/dashboard.js',
  '/Dishara/js/auth.js',
  '/Dishara/js/orders.js',
  '/Dishara/manifest.json',
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
