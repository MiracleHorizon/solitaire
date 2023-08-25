import { Rank, Suit } from '@app-types/card'
import { Card } from '@entities/Card.ts'

export interface IFoundation {
  id: number
  maxRank: Rank | null
  suit: Suit | null
  cards: Card[]
}
