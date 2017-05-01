self.addEventListener('install', event => event.waitUntil(
    caches.open('ith-v1-core')
        .then(cache => cache.addAll([
            '/offline/index.html',
            '/offline/app.js',
            '/css/main.css',
            '/css/bootstrap-grid.css',
            '/images/logo.png'
        ]))
        .then(self.skipWaiting())
));

self.addEventListener('fetch', event => {
    const request = event.request;
    event.respondWith(
        fetch(request)
            .catch(err => fetchCoreFile(request.url))
            .catch(err => fetchCoreFile('/offline/index.html'))
    );
});

function fetchCoreFile(url) {
    return caches.open('ith-v1-core')
        .then(cache => cache.match(url))
        .then(response => response ? response : Promise.reject());
}