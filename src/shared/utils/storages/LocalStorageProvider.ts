import { BrowserStorageProvider } from './BrowserStorageProvider.ts'

class LocalStorageProvider extends BrowserStorageProvider {
  constructor() {
    super(localStorage)
  }
}

export const localStorageProvider = new LocalStorageProvider()
