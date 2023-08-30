import type { RouteRecordRaw } from 'vue-router'

import HomePage from '@pages/home.vue'
import GamePage from '@pages/game.vue'

export enum Routes {
  HOME = '/',
  GAME = '/game'
}

export const routes: readonly RouteRecordRaw[] = [
  { path: Routes.HOME, component: HomePage },
  { path: Routes.GAME, component: GamePage }
]
