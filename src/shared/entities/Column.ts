import type { Card } from './Card.ts'

interface IColumn {
  id: number
  cards: Card[]
}

export class Column implements IColumn {
  public readonly id: number
  public cards: Card[]

  constructor({ id, cards }: IColumn) {
    this.id = id
    this.cards = cards
    this.flipLastCard()
  }

  public get isEmpty(): boolean {
    return this.cards.length === 0
  }

  private flipLastCard(): void {
    for (const card of this.cards) {
      const lastCard = this.tryToGetLastCard()

      if (lastCard && lastCard.id === card.id && !lastCard.isFlipped) {
        card.flip()
      }
    }
  }

  public hasCard(cardId: string): boolean {
    return Boolean(this.cards.find(card => card.id === cardId))
  }

  public addCard(card: Card): void {
    card.setColumn(this.id)
    this.cards.push(card)
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card.id !== cardId)
    this.flipLastCard()
  }

  public tryToGetLastCard(): Card | null {
    return this.cards[this.cards.length - 1] ?? null
  }
}
