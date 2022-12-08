if (window?.navigator?.serviceWorker) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    // `then` callback recieves a `ServiceWorkerRegistration` object
    .then(reg => {
      console.log('service worker registered', reg)
    })
    .catch(err => {
      console.log('service worker not registered!', err)
    })
}
