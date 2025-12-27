// Service Worker for Push Notifications
// This file will be served from /sw.js

const CACHE_NAME = 'careconnect-v1'
const urlsToCache = [
  '/',
  '/medications',
  '/appointments',
  '/vitals',
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  )
})

// Push event - handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const title = data.title || 'CareConnect 24/7'
  const options = {
    body: data.body || 'You have a reminder',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'careconnect-reminder',
    requireInteraction: data.requireInteraction || false,
    data: data.url || '/',
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  )
})


