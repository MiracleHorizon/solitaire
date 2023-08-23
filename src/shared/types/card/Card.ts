import type { ICardBase } from './CardBase.ts'

export interface ICard extends ICardBase {
  id: string
  isFolded: boolean
  isFlipped: boolean
  column: number | null
  foundation: number | null
}
