// import { clientsClaim } from 'workbox-core'; //自动更新需要
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import {BroadcastUpdatePlugin} from 'workbox-broadcast-update'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches() //清除过期缓存

precacheAndRoute(self.__WB_MANIFEST) // 预缓存静态文件

// 自动更新设置
// self.skipWaiting();
// clientsClaim();

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})

registerRoute(
    ({ request }) => request.destination === 'image',// 也可以和`generateSW`模式下一样用re
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
            }),
            new BroadcastUpdatePlugin()
        ], // 使用插件实现特定功能
    }), // 指定操作策略
    "GET", //指定匹配的http方法
)