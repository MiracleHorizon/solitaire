import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

function createFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: createFilePath('./src')
      },
      {
        find: '@public',
        replacement: createFilePath('./public')
      },
      {
        find: '@components',
        replacement: createFilePath('./src/components')
      },
      {
        find: '@stores',
        replacement: createFilePath('./src/stores')
      },
      {
        find: '@assets',
        replacement: createFilePath('./src/assets')
      },
      {
        find: '@styles',
        replacement: createFilePath('./src/assets/styles')
      }
    ]
  }
})
