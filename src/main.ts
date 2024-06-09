import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from '@router/router'
import '@styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error)
      })
  })
}

app.use(pinia)
app.use(router)
app.mount('#app')
