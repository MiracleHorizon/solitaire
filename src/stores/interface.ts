import { defineStore } from 'pinia'

import { LocalStorageHandler } from '@utils/storages/LocalStorageHandler.ts'
import { SOUND_FIELD_NAME } from '@shared/constants/storages.ts'
import type { ExtractedStorageItem } from '@app-types/ExtractedStorageItem.ts'

interface State {
  isSoundEnabled: boolean
}

type SoundItem = ExtractedStorageItem<{ enabled: boolean }>

const localStorageHandler = new LocalStorageHandler()

const getInitialState = (): State => {
  const soundItem = localStorageHandler.extract(SOUND_FIELD_NAME) as SoundItem

  return {
    isSoundEnabled: soundItem ? soundItem.enabled : true
  }
}

export const useInterfaceStore = defineStore('ui', {
  state: (): State => getInitialState(),

  actions: {
    toggleSound(): void {
      this.isSoundEnabled = !this.isSoundEnabled
      localStorageHandler.set(SOUND_FIELD_NAME, {
        sound: this.isSoundEnabled
      })
    }
  }
})
