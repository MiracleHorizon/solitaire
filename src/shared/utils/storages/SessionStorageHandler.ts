import type { BrowserStorageHandler } from './types/BrowserStorageHandler.ts'

export class SessionStorageHandler implements BrowserStorageHandler {
  public set<T extends unknown>(fieldName: string, payload: T): void {
    sessionStorage.setItem(fieldName, JSON.stringify(payload))
  }

  public extract<T extends string>(fieldName: string): T | null {
    const item = sessionStorage.getItem(fieldName)
    return item ? JSON.parse(item) : null
  }

  public remove(fieldName: string): void {
    sessionStorage.removeItem(fieldName)
  }

  public clear(): void {
    sessionStorage.clear()
  }
}
