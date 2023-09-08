import type { PlacementEntity } from '@app-types/PlacementEntity.ts'
import type { Card } from './Card.ts'

interface IColumn {
  id: number
  cards: Card[]
}

export class Column implements IColumn, PlacementEntity {
  public readonly id: number
  public cards: Card[]

  public get isEmpty(): boolean {
    return this.cards.length === 0
  }

  constructor({ id, cards }: IColumn) {
    this.id = id
    this.cards = cards
    this.flipUpperCard()
  }

  private flipUpperCard(): void {
    const upperCard = this.getUpperCardOrNull()
    if (!upperCard) return

    for (const card of this.cards) {
      if (upperCard.id !== card.id) continue
      if (!upperCard.isFlipped) card.flip()
    }
  }

  public addCard(card: Card): void {
    card.setColumn(this.id)
    this.cards.push(card)
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)
    this.flipUpperCard()
  }

  public clearCards(): void {
    this.cards.length = 0
  }

  public getUpperCardOrNull(): Card | null {
    const upperCard = this.cards[this.cards.length - 1]
    return upperCard ? upperCard : null
  }

  public isHasCardWithId(cardId: string): boolean {
    return Boolean(this.cards.find(card => card.id === cardId))
  }
}
