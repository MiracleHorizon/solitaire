interface IBrowserStorageProvider {
  get length(): number
  set: (key: string, payload: NonNullable<unknown>) => void
  multiplySet: (data: StorageItem[]) => void
  get: (key: string) => unknown | null
  remove: (key: string) => void
  clear: VoidFunction
}

interface StorageItem {
  key: string
  value: NonNullable<unknown>
}

export abstract class BrowserStorageProvider
  implements IBrowserStorageProvider
{
  public get length(): number {
    return this.storage.length
  }

  protected constructor(private readonly storage: Storage) {}

  public set<T extends NonNullable<unknown>>(key: string, payload: T): void {
    const isObject = typeof payload === 'object' && payload !== null
    const value = isObject ? JSON.stringify(payload) : payload.toString()
    this.storage.setItem(key, value)
  }

  public multiplySet(data: StorageItem[]): void {
    data.forEach(({ key, value }) => this.set(key, value))
  }

  // @ts-expect-error: noImplicitReturns.
  public get(key: string): unknown | null {
    const item = this.storage.getItem(key)

    if (!item) {
      return null
    }

    try {
      return JSON.parse(item)
    } catch (error) {
      if (error instanceof SyntaxError) {
        return item
      }
    }
  }

  public remove(key: string): void {
    this.storage.removeItem(key)
  }

  public clear(): void {
    this.storage.clear()
  }
}
