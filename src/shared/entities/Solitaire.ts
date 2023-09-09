import { Board } from '@entities/Board.ts'
import type { Card } from '@entities/Card.ts'
import type { Column } from '@entities/Column.ts'
import type { Base } from '@entities/Base.ts'
import { Rank } from '@app-types/card'

export class Solitaire {
  public readonly board: Board

  public get bases(): Base[] {
    return this.board.bases
  }

  public get columns(): Column[] {
    return this.board.columns
  }

  public get reserve(): Card[] {
    return this.board.reserve
  }

  public get cards(): Card[] {
    return this.board.deck.cards
  }

  constructor() {
    this.board = new Board()
  }

  public addCardToBase(baseId: number, cardId: string): void {
    this.board.addCardToBase(baseId, cardId)
  }

  public addCardsToColumn(columnId: number, card: Card): void {
    if (columnId === card.column) return

    const cardId = card.id
    const cardColumn = card.column

    /**
     * Only one card can be transferred from the reserve or base.
     */
    if (!cardColumn) {
      return this.board.addOneCardToColumn(columnId, cardId)
    }

    /**
     * When transferred from another column, several cards can be transferred.
     * Based on this, a check is made to see if this is the last flipped card
     */
    const isLastFlipped = this.isCardLastFlippedInColumn(cardColumn, cardId)

    /**
     * If the card is not the last one, then all next cards are taken
     * and moved to the column.
     */
    if (!isLastFlipped) {
      const nextCards = this.getNextFlippedCardsInColumn(cardColumn, cardId)
      const nextCardsIds = nextCards.map(card => card.id)

      this.board.addManyCardsToColumn(columnId, nextCardsIds)
    } else {
      /**
       * Otherwise the map is transferred from one column to another.
       */
      this.board.addOneCardToColumn(columnId, cardId)
    }
  }

  public isDropToBaseAvailable(baseId: number, card: Card): boolean {
    if (card.column) {
      /**
       * Additional check is needed for the position of the card in column.
       */
      for (const column of this.columns) {
        if (column.id !== card.column) continue

        const flippedCards = column.cards.filter(card => card.isFlipped)
        const isFirstFlipped = this.isCardFirstFlippedInColumn(
          card.column,
          card.id
        )
        const isLastFlipped = this.isCardLastFlippedInColumn(
          card.column,
          card.id
        )

        /**
         * A card can be transferred from a column to the base only if it is
         * the last one turned over or if it is the first one, but provided
         * that it is the only one in the column.
         */
        if (!isLastFlipped || (isFirstFlipped && flippedCards.length > 1)) {
          return false
        }
      }
    }

    for (const base of this.bases) {
      if (base.id !== baseId) continue

      if (base.isEmpty) {
        /**
         * If the base is empty, then according to the rules you can only
         * place an ace on it, of any suit.
         */
        return card.rank === Rank.ACE
      }

      const upperCard = base.getUpperCardOrNull()

      /**
       * Additional verification is required for TypeScript.
       * If the base is not empty, upper card cannot be null.
       */
      if (!upperCard) {
        return card.rank === Rank.KING
      }

      /**
       * If there are already cards on the base, then according to the rules
       * we can put a card of the same suit and 1 rank higher on it.
       */
      const isRankAvailable = upperCard.rank + 1 === card.rank
      const isSuitAvailable = upperCard.suit === card.suit

      return isRankAvailable && isSuitAvailable
    }

    return false
  }

  public isDropToColumnAvailable(columnId: number, card: Card): boolean {
    for (const column of this.columns) {
      if (column.id !== columnId) continue

      if (column.isEmpty) {
        /**
         * If the column is empty, then according to the rules you can only
         * place a king on it, of any suit.
         */
        return card.rank === Rank.KING
      }

      const upperCard = column.getUpperCardOrNull()

      /**
       * Additional verification is required for TypeScript.
       * If the column is not empty, upper card cannot be null.
       */
      if (!upperCard) {
        return card.rank === Rank.KING
      }

      /**
       * If there are already cards in the column, then according to the rules
       * we can put a card of the opposite color and 1 rank lower on it.
       */
      const isRankAvailable = upperCard.rank - 1 === card.rank
      const isColorAvailable = upperCard.color !== card.color

      return isRankAvailable && isColorAvailable
    }

    return false
  }

  public getCardIndexInColumn(columnId: number, cardId: string): number {
    for (const column of this.columns) {
      if (column.id !== columnId) continue
      if (column.cards.length === 0) break

      const cardsIds = column.cards.map(card => card.id)
      return cardsIds.indexOf(cardId)
    }

    return -1
  }

  public getCardIndexInColumnFlippedCards(
    columnId: number,
    cardId: string
  ): number {
    for (const column of this.columns) {
      if (column.id !== columnId) continue

      const flippedCards = column.cards.filter(card => card.isFlipped)
      if (flippedCards.length === 0) break

      const cardsIds = flippedCards.map(card => card.id)
      return cardsIds.indexOf(cardId)
    }

    return -1
  }

  public getNextCardInColumn(columnId: number, cardId: string): Card | null {
    for (const column of this.columns) {
      if (column.id !== columnId) continue
      if (column.cards.length === 0) break

      const cardsIds = column.cards.map(card => card.id)
      const cardIndex = cardsIds.indexOf(cardId)
      const nextCard = column.cards[cardIndex + 1]

      if (!nextCard) break

      return nextCard
    }

    return null
  }

  private getNextFlippedCardsInColumn(
    columnId: number,
    cardId: string
  ): Card[] {
    const cardIndex = this.getCardIndexInColumnFlippedCards(columnId, cardId)

    if (cardIndex < 0) {
      return []
    }

    for (const column of this.columns) {
      if (column.id !== columnId) continue

      return column.cards.filter(card => card.isFlipped).slice(cardIndex)
    }

    return []
  }

  private isCardLastFlippedInColumn(columnId: number, cardId: string): boolean {
    for (const column of this.columns) {
      if (column.id !== columnId) continue

      const flippedCards = column.cards.filter(card => card.isFlipped)

      if (flippedCards.length === 0) {
        return false
      }

      return flippedCards[flippedCards.length - 1].id === cardId
    }

    return false
  }

  private isCardFirstFlippedInColumn(
    columnId: number,
    cardId: string
  ): boolean {
    for (const column of this.columns) {
      if (column.id !== columnId) continue

      const flippedCards = column.cards.filter(card => card.isFlipped)

      if (flippedCards.length === 0) {
        return false
      }

      return flippedCards[0].id === cardId
    }

    return false
  }

  public checkVictory(): boolean {
    /**
     * Victory occurs when all cards are laid out on the bases, from Ace to King.
     */
    return !this.bases.map(base => base.maxRank === Rank.KING).includes(false)
  }
}