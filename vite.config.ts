import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Hero List',
    short_name: 'Hero List',
    start_url: '.',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: ['any', 'maskable'], // testing new type declaration
      },
    ],
  },
  // showMaximumFileSizeToCacheInBytesWarning: true,
  // workbox: {
  //   maximumFileSizeToCacheInBytes: 12000,
  // },
  devOptions: {
    enabled: process.env.NODE_ENV !== 'production', // 在环境变量启动开发模式
    // enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
    suppressWarnings: true,
  },
  workbox: {
    navigateFallbackDenylist: [/^\/stream/],
  },
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver()
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    VitePWA(pwaOptions),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
