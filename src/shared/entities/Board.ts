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

  private createColumns(): void {
    this.columns.length = 0

    const takenCards: Set<string> = new Set()

    for (let i = 1; i <= this.TOTAL_COLUMNS; i++) {
      const columnSize = i // Количество карт в столбце равняется его номеру на столе.
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

  public addCardToFoundation(foundationId: number, cardId: string): void {
    for (const card of this.deck.cards) {
      if (card.id !== cardId) continue

      // Если карта перемещается из столбца, то она из него исключается.
      if (card.inColumn) {
        for (const column of this.columns) {
          if (column.id !== card.column) continue

          column.removeCard(card.id)
          break
        }
      }

      for (const foundation of this.foundations) {
        // Если карта перемещается из другого основания, то она из него исключается.
        if (foundation.hasCard(card.id)) {
          foundation.removeCard(card.id)
        }

        // Добавляем карту на основание.
        if (foundation.id === foundationId) {
          foundation.addCard(card)
        }
      }

      // Если карта перемещается из резерва колоды, то "раздаем" ее.
      if (!card.wasDealt) {
        card.deal()
      }

      if (!card.isFlipped) {
        card.flip()
      }

      break
    }
  }

  public addOneCardToColumn(columnId: number, cardId: string): void {
    for (const card of this.deck.cards) {
      if (card.id !== cardId) continue

      // Если карта перемещается из основания, то она из него исключается.
      if (card.inFoundation) {
        for (const foundation of this.foundations) {
          if (foundation.id !== card.foundation) continue

          foundation.removeCard(card.id)
          break
        }
      }

      for (const column of this.columns) {
        // Если карта перемещается из другого столбца, то она из него исключается.
        if (column.hasCard(card.id)) {
          column.removeCard(card.id)
        }

        if (column.id === columnId) {
          column.addCard(card)
        }
      }

      // Если карта перемещается из резерва колоды, то "раздаем" ее.
      if (!card.wasDealt) {
        card.deal()
      }

      if (!card.isFlipped) {
        card.flip()
      }

      break
    }
  }

  public addManyCardsToColumn(columnId: number, cardsIds: string[]): void {
    const sortedByRank = this.deck.cards
      .slice(0)
      .sort((cardA, cardB) => cardB.rank - cardA.rank)

    for (const card of sortedByRank) {
      if (!cardsIds.includes(card.id)) continue
      this.addOneCardToColumn(columnId, card.id)
    }
  }
}
