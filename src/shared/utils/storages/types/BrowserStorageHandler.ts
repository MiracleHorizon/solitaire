export interface BrowserStorageHandler {
  set: (fieldName: string, payload: unknown) => void
  remove: (fieldName: string) => void
  extract: (fieldName: string) => unknown | null
  clear: VoidFunction
}
