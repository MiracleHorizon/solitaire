import { defineStore } from 'pinia'

import { localStorageProvider } from '@utils/storages/LocalStorageProvider'
import { GAME_CARD_STYLE_KEY, SOUND_KEY } from '@shared/constants/storages'
import type { ExtractedStorageItem } from '@app-types/ExtractedStorageItem'

interface State {
  isSoundEnabled: boolean
  gameCardStyle: GameCardStyle
}

export const enum GameCardStyle {
  /* eslint no-unused-vars: 0 */
  V1 = 1,
  V2 = 2,
  V3 = 3
}

type SoundItem = ExtractedStorageItem<{ enabled: boolean }>
type GameCardStyleItem = ExtractedStorageItem<GameCardStyle>

export const DEFAULT_SOUND_STATUS = true
export const DEFAULT_CARD_STYLE = GameCardStyle.V1

const getInitialState = (): State => {
  const soundItem = localStorageProvider.get(SOUND_KEY) as SoundItem
  const gameCardStyleItem = localStorageProvider.get(
    GAME_CARD_STYLE_KEY
  ) as GameCardStyleItem

  return {
    isSoundEnabled: soundItem ? soundItem.enabled : DEFAULT_SOUND_STATUS,
    gameCardStyle: gameCardStyleItem || DEFAULT_CARD_STYLE
  }
}

export const useInterfaceStore = defineStore('ui', {
  state: (): State => getInitialState(),

  actions: {
    toggleSound(): void {
      this.isSoundEnabled = !this.isSoundEnabled
      localStorageProvider.set(SOUND_KEY, {
        enabled: this.isSoundEnabled
      })
    },
    setGameCardStyle(style: GameCardStyle): void {
      this.gameCardStyle = style
      localStorageProvider.set(GAME_CARD_STYLE_KEY, style)
    }
  }
})
