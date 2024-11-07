// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);


const CACHE_NAME = "Alya";
const urlsToCache = [
  "/",
  "/script.js",
  "/style.css",
  '/images/alya.jpeg',
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
];

// Install event: PWA
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache:", error);
      })
  );
});

// Activate event: hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("Failed to activate:", error);
      })
  );
});

// Fetch event: static assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyB5cojTv5NMcVrH6Or8daHs17YhzBFIGz8",
    authDomain: "cv-alya.firebaseapp.com",
    projectId: "cv-alya",
    storageBucket: "cv-alya.firebasestorage.app",
    messagingSenderId: "1045703852496",
    appId: "1:1045703852496:web:ac3e331c782cd61959b9d5",
    measurementId: "G-S9LX0GFJ9S"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Website Portofolio";
  const notificationOptions = {
    body: "Notifikasi cv alya telah muncul.",
    icon: "/images/kucing.jpg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
