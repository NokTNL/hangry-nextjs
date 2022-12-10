const VERSION = '0.1.3'
const STATIC_CACHE_NAME = `hangry-nextjs-static-v${VERSION}`
const DYNAMIC_CACHE_NAME = `hangry-nextjs-dynamic-v${VERSION}`

self.addEventListener('install', event => {
  console.log('service worker installed', event)

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(async cache => {
      await cache.addAll(['/stores'])
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
      return fetch(event.request)
      // return dynamicallyCache(event.request)
    })
  )
})

// /** @param {Request} request */
// async function dynamicallyCache(request) {
// try {
// const response = await fetch(request)
// TODO: disables image caching for now, does not seem to work on installed apps
// const dynamicCache = await caches.open(DYNAMIC_CACHE_NAME)
// if (response.headers.get('Content-Type').match(/^image\//)) {
//   console.log(
//     `Fetched new image assets and stored in ${DYNAMIC_CACHE_NAME}`,
//     response
//   )
//   await dynamicCache.put(request.url, response.clone())
// }
// return response
// TODO: return fallback page data
// } catch (err) {
//   // Don't handle requests from brwoser extensions
//   if (request.url.startsWith('http')) {
//     return caches.match('/_offline')
//   } else throw err
// }
// }
