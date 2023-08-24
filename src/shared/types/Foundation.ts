import { Suit } from '@app-types/card'
import { Card } from '@entities/Card.ts'

export interface IFoundation {
  id: number
  suit: Suit
  cards: Card[]
}
