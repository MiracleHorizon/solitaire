import type { RouteRecordRaw } from 'vue-router'

export const enum Routes {
  /* eslint no-unused-vars: 0 */
  HOME = '/',
  GAME = '/game',
  SETTINGS = '/settings'
}

export const routes: readonly RouteRecordRaw[] = [
  { path: Routes.HOME, component: () => import('@pages/home.vue') },
  { path: Routes.GAME, component: () => import('@pages/game.vue') },
  { path: Routes.SETTINGS, component: () => import('@pages/settings.vue') }
]
