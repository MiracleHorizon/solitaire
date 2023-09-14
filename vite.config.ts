import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

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
  { find: '@router', path: './src/router' },
  { find: '@stores', path: './src/stores' },
  // Components
  { find: '@pages', path: './src/pages' },
  { find: '@layouts', path: './src/layouts' },
  { find: '@components', path: './src/components' },
  { find: '@ui', path: './src/components/ui' },
  // Assets
  { find: '@assets', path: './src/assets' },
  { find: '@images', path: './src/assets/images' },
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
  plugins: [vue()],
  resolve: {
    alias: aliases.map(alias => createAlias(alias))
  },
  server: {
    port: 3000,
    strictPort: false
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
})
