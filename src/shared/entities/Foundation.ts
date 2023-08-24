import { Card } from './Card.ts'
import { Suit } from '@app-types/card'
import type { IFoundation } from '@app-types/Foundation.ts'

export class Foundation implements IFoundation {
  public suit: Suit | null = null
  public cards: Card[] = []

  constructor(public readonly id: number) {}

  public get isEmpty(): boolean {
    return this.cards.length === 0
  }

  public setSuit(suit: Suit): void {
    this.suit = suit
  }

  public removeSuit(): void {
    this.suit = null
  }

  public addCard(card: Card): void {
    if (!this.suit) {
      this.setSuit(card.suit)
    }

    card.setFoundation(this.id)
    card.setColumn(null)
    this.cards.push(card)
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)

    if (this.cards.length === 0) {
      this.removeSuit()
    }
  }

  public tryToGetLastCard(): Card | null {
    return this.cards[this.cards.length - 1] ?? null
  }
}
