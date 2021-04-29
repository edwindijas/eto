const files = [];
const cached_Files = ['/'];
const cache_name = 'eto_public_sw_2.6';

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cache_name).then(
            function (cache) {
                return cache.addAll(cached_Files);
            }
        )
    )
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(
            function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        console.log(response);
                        console.log(!response, !response.status !== 200, response.type !== 'basic');
                        return response;
                    }

                    const responseToChache = response.clone();
                    caches.open(cache_name).then(
                        function (cache) {
                            cache.put(event.request, responseToChache);
                        }
                    );
                    return response;
                })
            }
        )
    )
});

self.addEventListener("activate", function (event) {
    const allowList = [];
    console.log('activatred')
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {

                    if (cacheName !== cache_name) {
                        return caches.delete(cacheName);
                    }
                   
                    return cacheName;

                })
            )
        })
    )
}) 