import type { ICardBase } from './CardBase.ts'

export interface ICard extends ICardBase {
  id: string
  wasDealt: boolean
  isFlipped: boolean
  column: number | null
  foundation: number | null
}
