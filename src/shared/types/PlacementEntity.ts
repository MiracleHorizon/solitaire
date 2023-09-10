import type { Card } from '@entities/Card.ts'

/* eslint no-unused-vars: 0 */
export interface PlacementEntity {
  get isEmpty(): boolean
  addCard(card: Card): void
  removeCard(cardId: string): void
  isHasCardWithId(cardId: string): boolean
  getUpperCardOrNull(): Card | null
}
