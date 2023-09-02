import { Rank, Suit } from '@app-types/card'
import type { PlacementEntity } from '@app-types/PlacementEntity.ts'
import type { Card } from './Card.ts'

export interface IBase {
  id: number
  suit: Suit | null
  maxRank: Rank | null
  cards: Card[]
}

export class Base implements IBase, PlacementEntity {
  public suit: Suit | null = null
  public maxRank: Rank | null = null
  public cards: Card[] = []

  public get isEmpty(): boolean {
    return this.cards.length === 0
  }

  constructor(public readonly id: number) {}

  public addCard(card: Card): void {
    if (!this.suit) {
      this.setSuit(card.suit)
    }

    if (!this.maxRank || this.maxRank < card.rank) {
      this.setMaxRank(card.rank)
    }

    card.setBase(this.id)
    this.cards.push(card)
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)

    if (this.cards.length === 0) {
      this.removeSuit()
      this.removeMaxRank()
    }
  }

  public getUpperCard(): Card {
    return this.cards[this.cards.length - 1]
  }

  public isHasCardWithId(cardId: string): boolean {
    return Boolean(this.cards.find(card => card.id === cardId))
  }

  private setSuit(suit: Suit): void {
    this.suit = suit
  }

  private removeSuit(): void {
    this.suit = null
  }

  private setMaxRank(rank: Rank): void {
    this.maxRank = rank
  }

  private removeMaxRank(): void {
    this.maxRank = null
  }
}