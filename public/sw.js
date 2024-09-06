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

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(SW_VERSION)
  await cache.addAll(resources)
}

const putInCache = async (request, response) => {
  const cache = await caches.open('v1')
  await cache.put(request, response)
}

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }

  // Next try to use the preloaded response, if it's there
  // NOTE: Chrome throws errors regarding preloadResponse, see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1420515
  // https://github.com/mdn/dom-examples/issues/145
  // To avoid those errors, remove or comment out this block of preloadResponse
  // code along with enableNavigationPreload() and the "activate" listener.
  const preloadResponse = await preloadResponsePromise
  if (preloadResponse) {
    console.info('using preload response', preloadResponse)
    putInCache(request, preloadResponse.clone())
    return preloadResponse
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

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload())
})

self.addEventListener('install', (event) => {
  // self.skipWaiting()
  event.waitUntil(
    addResourcesToCache(SW_CACHE_RESOURCE)
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: './gallery/myLittleVader.jpg',
    })
  )
})


addEventListener("message", (event) => {
  event.waitUntil(
    (async () => {
      console.log(`Message received: ${ event.data }`)
      // // Get the client.
      // if (!event.clientId) {
      //   console.log(`event.clientId not found`)
      //   return
      // }
      // const client = await self.clients.get(event.clientId)
      // // Exit early if we don't get the client.
      // // Eg, if it closed.
      // if (!client) {
      //   console.log(`client not found`)
      //   return
      // }
      // client.postMessage("This is a message from sw")
      const clients = await self.clients.matchAll()
      clients.forEach(function(client) {
        if (client.url.includes("/my-account")) {
          client.postMessage("Hi client: "+client.id);
      } });
      event.source.postMessage("This is a message from sw")
    })()
  )
})