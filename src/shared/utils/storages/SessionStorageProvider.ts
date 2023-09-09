import { BrowserStorageProvider } from './BrowserStorageProvider.ts'

class SessionStorageProvider extends BrowserStorageProvider {
  constructor() {
    super(sessionStorage)
  }
}

export const sessionStorageProvider = new SessionStorageProvider()
