import type { RouteRecordRaw } from 'vue-router'

export const enum Route {
  /* eslint no-unused-vars: 0 */
  HOME = '/',
  GAME = '/game',
  SETTINGS = '/settings'
}

export const routes: readonly RouteRecordRaw[] = [
  {
    path: Route.HOME,
    component: () => import('@pages/home.vue')
  },
  {
    path: Route.GAME,
    component: () => import('@pages/game.vue')
  },
  {
    path: Route.SETTINGS,
    component: () => import('@pages/settings.vue')
  }
]
