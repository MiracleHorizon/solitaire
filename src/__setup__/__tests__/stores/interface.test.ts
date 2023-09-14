import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { createPinia, setActivePinia } from 'pinia'

import { DEFAULT_SOUND_STATUS, useInterfaceStore } from '@stores/interface.ts'
import { localStorageProvider } from '@utils/storages/LocalStorageProvider.ts'
import { SOUND_FIELD_NAME } from '@shared/constants/storages.ts'

describe('interface.ts', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageProvider.clear()
    jest.clearAllMocks()
  })

  it('should return toggle sound status (local storage initially clear)', () => {
    const interfaceStore = useInterfaceStore()

    expect(interfaceStore.isSoundEnabled).toBe(DEFAULT_SOUND_STATUS)

    interfaceStore.toggleSound()
    expect(interfaceStore.isSoundEnabled).toBe(!DEFAULT_SOUND_STATUS)

    interfaceStore.$reset()
    expect(interfaceStore.isSoundEnabled).toBe(!DEFAULT_SOUND_STATUS)
  })

  it('should return toggle sound status (sound status stored initially)', () => {
    const soundStatus = false
    localStorageProvider.set(SOUND_FIELD_NAME, { enabled: soundStatus })

    const interfaceStore = useInterfaceStore()

    expect(interfaceStore.isSoundEnabled).toBe(soundStatus)

    interfaceStore.toggleSound()
    expect(interfaceStore.isSoundEnabled).toBe(!soundStatus)

    interfaceStore.toggleSound()
    expect(interfaceStore.isSoundEnabled).toBe(soundStatus)

    interfaceStore.$reset()
    expect(interfaceStore.isSoundEnabled).toBe(soundStatus)
  })
})
