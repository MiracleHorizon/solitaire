import { Deck } from './Deck.ts'
import { Column } from './Column.ts'
import { Basis } from './Basis.ts'
import type { Card } from './Card.ts'

export class Board {
  private readonly TOTAL_BASES: number = 4
  private readonly TOTAL_COLUMNS: number = 7

  public readonly deck: Deck
  public readonly bases: Basis[] = []
  public readonly columns: Column[] = []

  constructor() {
    this.deck = new Deck()
    this.createBases()
    this.createColumns()
  }

  public get cardsReserve(): Card[] {
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

  private createBases(): void {
    this.bases.length = 0

    for (let i = 1; i <= this.TOTAL_BASES; i++) {
      const basis = new Basis(i)
      this.bases.push(basis)
    }
  }

  public addCardToBasis(basisId: number, cardId: string): void {
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

      for (const basis of this.bases) {
        // Если карта перемещается из другого основания, то она из него исключается.
        if (basis.hasCard(card.id)) {
          basis.removeCard(card.id)
        }

        // Добавляем карту на основание.
        if (basis.id === basisId) {
          basis.addCard(card)
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
      if (card.inBasis) {
        for (const basis of this.bases) {
          if (basis.id !== card.basis) continue

          basis.removeCard(card.id)
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
