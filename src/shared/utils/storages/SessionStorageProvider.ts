import { BrowserStorageProvider } from './BrowserStorageProvider'

class SessionStorageProvider extends BrowserStorageProvider {
  constructor() {
    super(sessionStorage)
  }
}

export const sessionStorageProvider = new SessionStorageProvider()
