import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

interface Alias {
  find: string | RegExp
  path: string
}

export const aliases: Alias[] = [
  { find: '@', path: './' },
  { find: '@public', path: './public' },
  { find: '@images', path: './public/images' },
  { find: '@components', path: './src/components' },
  { find: '@stores', path: './src/stores' },
  { find: '@assets', path: './src/assets' },
  { find: '@styles', path: './src/assets/styles' },
  { find: '@shared', path: './src/shared' },
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
  }
})
