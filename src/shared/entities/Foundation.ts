import { Card } from './Card.ts'
import { Rank, Suit } from '@app-types/card'
import type { IFoundation } from '@app-types/Foundation.ts'

export class Foundation implements IFoundation {
  public maxRank: Rank | null = null
  public suit: Suit | null = null
  public cards: Card[] = []

  constructor(public readonly id: number) {}

  public get isEmpty(): boolean {
    return this.cards.length === 0
  }

  public hasCard(cardId: string): boolean {
    return Boolean(this.cards.find(card => card.id === cardId))
  }

  public addCard(card: Card): void {
    if (!this.suit) {
      this.setSuit(card.suit)
    }
    if (!this.maxRank || this.maxRank < card.rank) {
      this.setMaxRank(card.rank)
    }

    card.setFoundation(this.id)
    card.setColumn(null)

    this.cards.push(card)
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)

    if (this.cards.length === 0) {
      this.removeSuit()
      this.removeMaxRank()
    }
  }

  private setSuit(suit: Suit): void {
    this.suit = suit
  }

  private setMaxRank(rank: Rank): void {
    this.maxRank = rank
  }

  private removeSuit(): void {
    this.suit = null
  }

  private removeMaxRank(): void {
    this.maxRank = null
  }

  public tryToGetLastCard(): Card | null {
    return this.cards[this.cards.length - 1] ?? null
  }
}
