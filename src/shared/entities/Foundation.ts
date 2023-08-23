import { Card } from './Card.ts'
import type { IFoundation } from '@app-types/Foundation.ts'

export class Foundation implements IFoundation {
  public cards: Card[] = []

  constructor(public readonly id: number) {}

  public addCard(card: Card): void {
    card.setFoundation(this.id)
    card.setColumn(null)
    this.cards.push(card)
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)
  }
}
