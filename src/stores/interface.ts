import { defineStore } from 'pinia'

import { localStorageProvider } from '@utils/storages/LocalStorageProvider.ts'
import { SOUND_FIELD_NAME } from '@shared/constants/storages.ts'
import type { ExtractedStorageItem } from '@app-types/ExtractedStorageItem.ts'

interface State {
  isSoundEnabled: boolean
}

type SoundItem = ExtractedStorageItem<{ enabled: boolean }>

export const DEFAULT_SOUND_STATUS = true

const getInitialState = (): State => {
  const soundItem = localStorageProvider.get(SOUND_FIELD_NAME) as SoundItem

  return {
    isSoundEnabled: soundItem ? soundItem.enabled : DEFAULT_SOUND_STATUS
  }
}

export const useInterfaceStore = defineStore('ui', {
  state: (): State => getInitialState(),

  actions: {
    toggleSound(): void {
      this.isSoundEnabled = !this.isSoundEnabled
      localStorageProvider.set(SOUND_FIELD_NAME, {
        sound: this.isSoundEnabled
      })
    }
  }
})
