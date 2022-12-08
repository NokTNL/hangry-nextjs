const VERSION = '0.0.1'
const STATIC_CACHE_NAME = `hangry-nextjs-static-v${VERSION}`
const DYNAMIC_CACHE_NAME = `hangry-nextjs-dynamic-v${VERSION}`

self.addEventListener('install', event => {
  console.log('service worker installed', event)

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(async cache => {
      await cache.addAll([
        // TODO: cache shell assets
        // '/',
        // '/index.html',
      ])
      console.log('All shell assets cached')
    })
  )
})

self.addEventListener('activate', event => {
  console.log('service worker activated', event)
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE_NAME)
          .map(key => caches.delete(key))
      )
    })
  )
})

self.addEventListener('fetch', event => {
  console.log('fetch event', event)

  event.respondWith(
    caches.match(event.request).then(async response => {
      if (response) {
        console.log('Used cached assets', response)
        return response
      }
      // TODO: possibly dynamically cache?
      return await fetch(event.request)
      // return dynamicallyCache(event.request)
    })
  )
})

// TODO: unused for now
async function dynamicallyCache(request) {
  try {
    const response = await fetch(request)
    const dynamicCache = await caches.open(DYNAMIC_CACHE_NAME)
    if (request.url.startsWith('http')) {
      console.log(
        `Fetched new assets and stored in ${DYNAMIC_CACHE_NAME}`,
        response
      )
      await dynamicCache.put(request.url, response.clone())
    }
    return response
  } catch (err) {
    if (request.url.match(/\.html$/)) {
      return caches.match('/pages/fallback.html')
    } else throw err
  }
}
