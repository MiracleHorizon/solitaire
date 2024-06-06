import { BrowserStorageProvider } from './BrowserStorageProvider'

class LocalStorageProvider extends BrowserStorageProvider {
  constructor() {
    super(localStorage)
  }
}

export const localStorageProvider = new LocalStorageProvider()
