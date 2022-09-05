import * as core from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

core.skipWaiting()
core.clientsClaim()

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					console.log('cacheName', cacheName)

					return caches.delete(cacheName)
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				})
			)
		})
	)
})

precacheAndRoute(self.__WB_MANIFEST)
