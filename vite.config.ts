import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

interface Alias {
  find: string | RegExp
  path: string
}

const aliases: Alias[] = [
  { find: '@', path: './' },
  { find: '@public', path: './public' },
  { find: '@pages', path: './src/pages' },
  { find: '@layouts', path: './src/layouts' },
  { find: '@components', path: './src/components' },
  { find: '@ui', path: './src/components/ui' },
  { find: '@router', path: './src/router' },
  { find: '@stores', path: './src/stores' },
  { find: '@assets', path: './src/assets' },
  { find: '@images', path: './src/assets/images' },
  { find: '@styles', path: './src/assets/styles' },
  { find: '@shared', path: './src/shared' },
  { find: '@utils', path: './src/shared/utils' },
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
