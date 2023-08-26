import type { BrowserStorageHandler } from './types/BrowserStorageHandler.ts'

export class LocalStorageHandler implements BrowserStorageHandler {
  public set<T extends unknown>(fieldName: string, payload: T): void {
    localStorage.setItem(fieldName, JSON.stringify(payload))
  }

  public extract<T extends string>(fieldName: string): T | null {
    const item = localStorage.getItem(fieldName)
    return item ? JSON.parse(item) : null
  }

  public remove(fieldName: string): void {
    localStorage.removeItem(fieldName)
  }

  public clear(): void {
    localStorage.clear()
  }
}
