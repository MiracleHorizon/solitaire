import { Card } from './Card.ts'
import type { IColumn } from '@app-types/Column.ts'

export class Column implements IColumn {
  public readonly id: number
  public cards: Card[]

  constructor({ id, cards }: IColumn) {
    this.id = id
    this.cards = cards
    this.flipLastCard()
  }

  private flipLastCard(): void {
    for (const card of this.cards) {
      const lastCard = [...this.cards].pop()
      if (lastCard && lastCard.id === card.id) card.flip()
    }
  }

  public isEmpty(): boolean {
    return this.cards.length === 0
  }

  public addCard(card: Card): void {
    card.setColumn(this.id)
    card.setFoundation(null)
    this.cards.push(card)
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)
    const lastCard = [...this.cards].pop()
    if (!lastCard) return
    for (const card of this.cards) {
      if (card.id === lastCard.id) {
        card.flip()
      }
    }
  }
}
