import { Card } from '@entities/Card.ts'

export interface IColumn {
  id: number
  cards: Card[]
}
