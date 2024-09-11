importScripts('foo.js')

console.log(`get bar ${Bar}`)
const addResourcesToCache = async () => {
  const SW_VERSION = "v1"
  const SW_CACHE_RESOURCE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './image-list.js',
    './star-wars-logo.jpg',
    './gallery/bountyHunters.jpg',
    './gallery/myLittleVader.jpg',
    './gallery/snowTroopers.jpg',
  ]
  const cache = await caches.open(SW_VERSION)
  await cache.addAll(SW_CACHE_RESOURCE)
}

const putInCache = async (request, response) => {
  if (request.url.startsWith('http')) {
    const cache = await caches.open('v1')
    await cache.put(request, response)
  }
}

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }
  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request.clone())
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl)
    if (fallbackResponse) {
      return fallbackResponse
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable()
  }
}

self.addEventListener('activate', async (event) => {
  console.log("activate ok")
  if ('sync' in self.registration){
    self.registration.sync.register("say-bye") 
  }
  // const tags = await self.registration.sync.getTags()
  // console.log(tags)
  event.waitUntil((async () => {
    await enableNavigationPreload()
  })())
})

self.addEventListener('install', (event) => {
  // self.skipWaiting()
  event.waitUntil(
    addResourcesToCache()
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: './gallery/myLittleVader.jpg',
    })
  )
})

addEventListener("message", (event) => {
  event.waitUntil(
    (async () => {
      console.log(`Message from ${ event.source.id } received: ${ event.data }`)
      event.source.postMessage("This is a message from sw")
      const clients = await self.clients.matchAll()
      clients.forEach(function (client) {
        if (client.url.includes("/my-account")) {
          client.postMessage({

          })
        }
      })
    })()
  )
})


addEventListener("sync", (event) => {
  console.log(`get sync event ${ event.tag }`)
  if (event.tag === "say-hello") {
    console.log("say-hello ok")
  }
  if (event.tag === "say-bye") {
    console.log("say-bye ok")
  }
})
addEventListener("periodicsync", (event) => {
  console.log(`get periodicSync event ${ event.tag }`)
})