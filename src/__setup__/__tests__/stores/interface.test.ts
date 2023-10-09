import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { createPinia, setActivePinia } from 'pinia'

import {
  useInterfaceStore,
  DEFAULT_SOUND_STATUS,
  DEFAULT_CARD_STYLE,
  GameCardStyle
} from '@stores/interface.ts'
import { localStorageProvider } from '@utils/storages/LocalStorageProvider.ts'
import { GAME_CARD_STYLE_KEY, SOUND_KEY } from '@shared/constants/storages.ts'

describe('interface.ts', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageProvider.clear()
    jest.clearAllMocks()
  })

  it('should toggle sound status (local storage initially clear)', () => {
    const interfaceStore = useInterfaceStore()

    expect(interfaceStore.isSoundEnabled).toBe(DEFAULT_SOUND_STATUS)

    interfaceStore.toggleSound()
    expect(interfaceStore.isSoundEnabled).toBe(!DEFAULT_SOUND_STATUS)

    interfaceStore.$reset()
    expect(interfaceStore.isSoundEnabled).toBe(!DEFAULT_SOUND_STATUS)
  })

  it('should toggle sound status (sound status stored initially)', () => {
    const soundStatus = false
    localStorageProvider.set(SOUND_KEY, { enabled: soundStatus })

    const interfaceStore = useInterfaceStore()

    expect(interfaceStore.isSoundEnabled).toBe(soundStatus)

    interfaceStore.toggleSound()
    expect(interfaceStore.isSoundEnabled).toBe(!soundStatus)

    interfaceStore.toggleSound()
    expect(interfaceStore.isSoundEnabled).toBe(soundStatus)

    interfaceStore.$reset()
    expect(interfaceStore.isSoundEnabled).toBe(soundStatus)
  })

  it('should set game card style (local storage initially clear)', () => {
    const interfaceStore = useInterfaceStore()

    expect(interfaceStore.gameCardStyle).toBe(DEFAULT_CARD_STYLE)

    interfaceStore.setGameCardStyle(GameCardStyle.V2)
    expect(interfaceStore.gameCardStyle).toBe(GameCardStyle.V2)

    interfaceStore.setGameCardStyle(GameCardStyle.V3)
    expect(interfaceStore.gameCardStyle).toBe(GameCardStyle.V3)

    interfaceStore.$reset()
    expect(interfaceStore.gameCardStyle).toBe(GameCardStyle.V3)
  })

  it('should set game card style (style stored initially)', () => {
    const initialStyle = GameCardStyle.V2
    localStorageProvider.set(GAME_CARD_STYLE_KEY, initialStyle)

    const interfaceStore = useInterfaceStore()
    expect(interfaceStore.gameCardStyle).toBe(initialStyle)

    interfaceStore.$reset()
    expect(interfaceStore.gameCardStyle).toBe(initialStyle)
  })
})
