import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import stylelint from 'vite-plugin-stylelint'

interface Alias {
  find: string | RegExp
  path: string
}

const aliases: Alias[] = [
  // Root
  { find: '@', path: './' },
  { find: '@public', path: './public' },
  // Base
  { find: '__setup__', path: './src/__setup__' },
  { find: '@site', path: './src/site' },
  { find: '@router', path: './src/router' },
  { find: '@stores', path: './src/stores' },
  // Components
  { find: '@pages', path: './src/pages' },
  { find: '@modules', path: './src/modules' },
  { find: '@components', path: './src/components' },
  { find: '@ui', path: './src/components/ui' },
  // Assets
  { find: '@assets', path: './src/assets' },
  { find: '@audio', path: './src/assets/images' },
  { find: '@styles', path: './src/assets/styles' },
  // Shared
  { find: '@shared', path: './src/shared' },
  { find: '@utils', path: './src/shared/utils' },
  { find: '@helpers', path: './src/shared/helpers' },
  { find: '@entities', path: './src/shared/entities' },
  { find: '@app-types', path: './src/shared/types' }
]

const createAlias = ({ find, path }: Alias) => ({
  find,
  replacement: fileURLToPath(new URL(path, import.meta.url))
})

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              ['document', 'script', 'style', 'image', 'font'].includes(request.destination) ||
              url.pathname.includes('/assets/images/cards/'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days.
              }
            }
          }
        ]
      }
    }),
    stylelint({
      include: ['src/**/*.{scss,vue}'],
      fix: true,
      dev: true,
      build: false
    })
  ],
  resolve: {
    alias: aliases.map(createAlias)
  },
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
})
