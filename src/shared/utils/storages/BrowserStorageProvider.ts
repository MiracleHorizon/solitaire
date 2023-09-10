interface StorageItem {
  key: string
  value: NonNullable<unknown>
}

export abstract class BrowserStorageProvider {
  private readonly storage: Storage

  public get length(): number {
    return this.storage.length
  }

  protected constructor(storage: Storage) {
    this.storage = storage
  }

  public set<T extends NonNullable<unknown>>(key: string, payload: T): void {
    const isObject = typeof payload === 'object' && payload !== null
    const value = isObject ? JSON.stringify(payload) : payload.toString()
    this.storage.setItem(key, value)
  }

  public multiplySet(data: StorageItem[]): void {
    data.forEach(({ key, value }) => this.set(key, value))
  }

  /* @ts-expect-error: noImplicitReturns */
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
