const cacheName = 'pwa-hello'
const contentToCache = [
    '/favicon.ico',
    '/index.html',
    '/index.js',
    '/style.css',
    '/images/icon48.png',
    '/images/icon128.png'
]

const install_handdler = async (cacheName) => {
    try {
        let cache = await caches.open(cacheName)
        console.log('[Service Worker] install_handdler cache open')
        try {
            let result = await cache.addAll(contentToCache)
            console.log('[Service Worker] install_handdler Caching all')
            return result
        } catch (err) {
            console.log("[Service Worker] install_handdler cache.addAll get error")
            console.log(err)
        }
    } catch (err) {
        console.log("[Service Worker] install_handdler caches.open get error")
        console.log(err)
        throw err
    }


}

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install')
    e.waitUntil(install_handdler(cacheName))
})

// self.addEventListener('install', (e) => {
//     console.log('[Service Worker] Install')
//     e.waitUntil(
//         caches.open(cacheName).then((cache) => {
//             console.log('[Service Worker] Caching all')
//             return cache.addAll(contentToCache).catch((err) => console.log(err))
//         })
//     )
// })

const catch_resource = async (cacheName, req, res) => {
    try {
        let cache = await caches.open(cacheName)
        console.log('[Service Worker] caches.open resource: ' + req.url)
        try {
            await cache.put(req, res)//异步存储
            console.log('[Service Worker] caches.put resource: ' + req.url)
        } catch (err) {
            console.log('[Service Worker] catch_resource caches.put error')
            console.log(err)
        }
    } catch (err) {
        console.log('[Service Worker] catch_resource caches.open error')
        console.log(err)
    }
}

const fetch_handdler = async (cacheName, e) => {
    try {
        let r = await caches.match(e.request)
        console.log('[Service Worker] fetch_handdler cache match check: ' + e.request.url)
        if (r) {
            console.log('[Service Worker] fetch_handdler get cache match: ' + e.request.url)
            return r
        } else {
            console.log('[Service Worker] fetch_handdler cache not match: ' + e.request.url)
            try {
                let response = await fetch(e.request)
                catch_resource(cacheName, e.request, response.clone())
                return response
            } catch (err) {
                console.log('[Service Worker] fetch_handdler fetch error')
                console.log(err)
            }
        }
    } catch (err) {
        console.log('[Service Worker] fetch_handdler get cache match error')
        console.log(err)
    }

}
self.addEventListener('fetch', (e) => {
    e.respondWith(fetch_handdler(cacheName, e))
})
// self.addEventListener('fetch', (e) => {
//     e.respondWith(
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: ' + e.request.url)
//             return r || fetch(e.request).then(function (response) {
//                 return caches.open(cacheName).then(function (cache) {
//                     console.log('[Service Worker] Caching new resource: ' + e.request.url)
//                     cache.put(e.request, response.clone())
//                     return response
//                 })
//             })
//         })
//     )
// })