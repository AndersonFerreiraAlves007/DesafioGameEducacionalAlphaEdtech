// *******************************************   p-cache.js    ***********************************************
// What it does: it caches all requests a site makes (css, js, html, etc.) and when the app is offline it loads the cached version.
// On the Developer Tools' Network tab, if Disable cache is checked, requests will go to the network instead of the Service Worker. Uncheck that.
// Incognito mode skips the service worker as well!

var cacheName = 'pc-v2'; 

// Installing Service Worker
// "https://legends.io/index.html"
self.addEventListener('install',  function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("CACHING /INDEX.HTML");
      return cache.addAll(
        [
          '/index.html' // == https://legends.io
        ]
      );
    })
  ); 
  console.log('[Service Worker] Install');   
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// FETCH PROXY & CACHING
// 1.) try get resource from cache else fetch and update cache else --> error
self.addEventListener('fetch', function (e) {
  console.log('network or cache: ' + e.request.url);
  /* e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          console.log('Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      }).catch(function(err){console.log(err);});
    })
  ); */
});