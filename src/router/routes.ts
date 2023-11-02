import type { RouteRecordRaw } from 'vue-router'

import HomePage from '@pages/home.vue'
import GamePage from '@pages/game.vue'
import SettingsPage from '@pages/settings.vue'

export const enum Routes {
  /* eslint no-unused-vars: 0 */
  HOME = '/',
  GAME = '/game',
  SETTINGS = '/settings'
}

export const routes: readonly RouteRecordRaw[] = [
  { path: Routes.HOME, component: HomePage },
  { path: Routes.GAME, component: GamePage },
  { path: Routes.SETTINGS, component: SettingsPage }
]
