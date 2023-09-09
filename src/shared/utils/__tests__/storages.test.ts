import { beforeEach, describe, expect, it } from '@jest/globals'

import { BrowserStorageProvider } from '@utils/storages/BrowserStorageProvider.ts'
import { localStorageProvider } from '@utils/storages/LocalStorageProvider.ts'
import { sessionStorageProvider } from '@utils/storages/SessionStorageProvider.ts'

const createTests = (storage: Storage, provider: BrowserStorageProvider) => {
  const KEY = 'foo'
  const stringItem = 'foo'
  const objectItem = { bar: 'baz' }
  const objectItemJson = JSON.stringify(objectItem)
  const arrayItem = ['foo', 'bar', 'baz']
  const arrayItemJson = JSON.stringify(arrayItem)

  beforeEach(() => {
    expect(storage.__STORE__).toBeDefined()
    storage.clear()
  })

  it('should set item to the {{ storage }}', () => {
    provider.set(KEY, stringItem)
    expect(storage.setItem).toHaveBeenLastCalledWith(KEY, stringItem)
    expect(storage.getItem(KEY)).toBe(stringItem)

    provider.set(KEY, objectItem)
    expect(storage.setItem).toHaveBeenLastCalledWith(KEY, objectItemJson)
    expect(storage.getItem(KEY)).toBe(objectItemJson)

    provider.set(KEY, arrayItem)
    expect(storage.setItem).toHaveBeenLastCalledWith(KEY, arrayItemJson)
    expect(storage.getItem(KEY)).toBe(arrayItemJson)
  })

  it('should set multiply items to the {{ storage }}', () => {
    const items = [
      { key: 'foo', value: stringItem },
      { key: 'bar', value: objectItem },
      { key: 'baz', value: arrayItem }
    ]

    expect(storage.length).toBe(0)
    provider.multiplySet(items)

    expect(storage.length).toBe(items.length)
    expect(provider.get(items[0].key)).toStrictEqual(items[0].value)
    expect(provider.get(items[1].key)).toStrictEqual(items[1].value)
  })

  it('should get item from the {{ storage }}', () => {
    provider.set(KEY, stringItem)
    expect(storage.__STORE__[KEY]).toBe(stringItem)
    expect(provider.get(KEY)).toBe(stringItem)

    provider.set(KEY, objectItem)
    expect(storage.__STORE__[KEY]).toBe(objectItemJson)
    expect(provider.get(KEY)).toStrictEqual(objectItem)

    provider.set(KEY, arrayItem)
    expect(storage.__STORE__[KEY]).toBe(arrayItemJson)
    expect(provider.get(KEY)).toStrictEqual(arrayItem)

    expect(storage.__STORE__['empty_value']).toBeUndefined()
    expect(provider.get('empty_value')).toBeNull()
  })

  it('should remove item from the {{ storage }}', () => {
    provider.set(KEY, stringItem)
    expect(storage.__STORE__[KEY]).toBe(stringItem)
    provider.remove(KEY)
    expect(storage.__STORE__[KEY]).not.toBeDefined()

    provider.set(KEY, objectItem)
    expect(storage.__STORE__[KEY]).toBe(objectItemJson)
    provider.remove(KEY)
    expect(storage.__STORE__[KEY]).not.toBeDefined()
  })

  it('should clear the {{ storage }}', () => {
    provider.set(KEY, stringItem)
    expect(storage.__STORE__[KEY]).toBe(stringItem)
    expect(provider.length).toBe(1)

    provider.clear()
    expect(provider.length).toBe(0)
  })
}

describe('utils/storages/*', () => {
  createTests(localStorage, localStorageProvider)
  createTests(sessionStorage, sessionStorageProvider)
})
