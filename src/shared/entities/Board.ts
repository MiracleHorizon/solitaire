import { Card } from './Card.ts'
import { Deck } from './Deck.ts'
import { Column } from './Column.ts'
import { Foundation } from './Foundation.ts'

export class Board {
  private readonly TOTAL_COLUMNS: number = 7
  private readonly TOTAL_FOUNDATIONS: number = 4

  public readonly deck: Deck
  public columns: Column[] = []
  public foundations: Foundation[] = []

  constructor() {
    this.deck = new Deck()
    this.createColumns()
    this.createFoundations()
  }

  public get undealtCards(): Card[] {
    return this.deck.cards.filter(card => !card.wasDealt)
  }

  public reset(): void {
    this.deck.shuffle()
    this.createColumns()
    this.createFoundations()
  }

  private createColumns(): void {
    this.columns.length = 0

    const takenCards: Set<string> = new Set()

    for (let i = 1; i <= this.TOTAL_COLUMNS; i++) {
      const columnSize = i + 1 // Количество карт в столбце равняется его номеру на столе.
      const cards: Card[] = []

      this.deck.cards.forEach(card => {
        if (cards.length >= columnSize || takenCards.has(card.id)) return

        card.deal() // Отмечаем, что карта взята из колоды.
        card.setColumn(i)

        cards.push(card)
        takenCards.add(card.id)
      })

      const column = new Column({
        id: i,
        cards
      })
      this.columns.push(column)
    }
  }

  private createFoundations(): void {
    this.foundations.length = 0

    for (let i = 1; i <= this.TOTAL_FOUNDATIONS; i++) {
      const foundation = new Foundation(i)
      this.foundations.push(foundation)
    }
  }
}
