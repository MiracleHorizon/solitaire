import type { Card } from '@entities/Card.ts'

export interface PlacementEntity {
  get isEmpty(): boolean
  addCard(card: Card): void
  removeCard(cardId: string): void
  isHasCardWithId(cardId: string): boolean
  getUpperCard(): Card
}
