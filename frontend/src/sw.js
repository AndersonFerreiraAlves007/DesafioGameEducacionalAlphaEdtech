var cacheName = 'pc-v2'; 

self.addEventListener('install',  function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/index.html',
          '/game.html',
          '/assets/background-images/cartoon-set-of-kitchen-counter-with-appliances-fridge-microwave-oven-kettle-blender/1819.jpg',
          '/assets/background-images/modern-bathroom-interior-with-furniture-cartoon/304.jpg',
          '/assets/background-images/vector-cartoon-illustration-of-empty-kindergarten-room-with-furniture-and-toys-for-young-children-n/1926.jpg',
        ]
      );
    })
  ); 
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (e) {
 
});
