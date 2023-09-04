import { defineStore } from 'pinia'

import { LocalStorageHandler } from '@utils/storages/LocalStorageHandler.ts'
import { SessionStorageHandler } from '@utils/storages/SessionStorageHandler.ts'
import { RECORD_FIELD_NAME } from '@shared/constants/storages.ts'
import victorySound from '@assets/audio/victory.mp3'

import { Board } from '@entities/Board.ts'
import type { Card } from '@entities/Card.ts'
import type { Column } from '@entities/Column.ts'
import type { Base } from '@entities/Base.ts'
import { Rank } from '@app-types/card'

interface State {
  board: Board
  movesCount: number
  sessionRecord: number | null
  personalRecord: number | null
  isVictory: boolean
}

const sessionStorageHandler = new SessionStorageHandler()
const localStorageHandler = new LocalStorageHandler()

const getDefaultState = (): State => {
  const sessionRecordItem = sessionStorageHandler.extract(RECORD_FIELD_NAME)
  const personalRecordItem = localStorageHandler.extract(RECORD_FIELD_NAME)

  return {
    board: new Board(),
    movesCount: 0,
    sessionRecord: sessionRecordItem ? Number(sessionRecordItem) : null,
    personalRecord: personalRecordItem ? Number(personalRecordItem) : null,
    isVictory: false
  }
}

export const useGameStore = defineStore('game', {
  state: (): State => getDefaultState(),

  getters: {
    columns: state => state.board.columns as Column[],
    bases: state => state.board.bases as Base[],
    cards: state => state.board.deck.cards as Card[],
    cardsReserve: state => state.board.cardsReserve as Card[]
  },

  actions: {
    addCardToBase(baseId: number, cardId: string): void {
      this.board.addCardToBase(baseId, cardId)
      this.makeMove()
    },

    addCardsToColumn(columnId: number, dragCard: Card): void {
      if (columnId === dragCard.column) return // TODO: посмотреть

      const cardId = dragCard.id
      const cardColumn = dragCard.column

      if (!cardColumn) {
        // Если переносится с основания или из резерва
        // Может быть только одна карта
        this.board.addOneCardToColumn(columnId, cardId)
        this.makeMove()
        return
      }

      // Если переносится из другого столбца
      // Может быть несколько карт
      const isCardLastFlipped = this._isCardLastFlippedInColumn(
        cardColumn,
        cardId
      )

      if (!isCardLastFlipped) {
        const nextFlippedCards = this._getNextFlippedCardsInColumn(
          cardColumn,
          cardId
        )
        const nextFlippedCardsIds = nextFlippedCards.map(card => card.id)

        this.board.addManyCardsToColumn(columnId, nextFlippedCardsIds)
      } else {
        this.board.addOneCardToColumn(columnId, cardId)
      }

      this.makeMove()
    },

    _isCardLastFlippedInColumn(columnId: number, cardId: string): boolean {
      for (const column of this.columns) {
        if (column.id !== columnId) continue

        const flipped = column.cards.filter(card => card.isFlipped)

        if (flipped.length === 0) {
          return false
        }

        return flipped[flipped.length - 1].id === cardId
      }

      return false
    },

    _isCardFirstFlippedInColumn(columnId: number, cardId: string): boolean {
      for (const column of this.columns) {
        if (column.id !== columnId) continue

        const flipped = column.cards.filter(card => card.isFlipped)

        if (flipped.length === 0) {
          return false
        }

        return flipped[0].id === cardId
      }

      return false
    },

    _getNextFlippedCardsInColumn(columnId: number, cardId: string): Card[] {
      const cardIndex = this.getCardIndexInColumnFlipped(columnId, cardId)

      if (cardIndex === null) {
        return []
      }

      for (const column of this.columns) {
        if (column.id !== columnId) continue

        return column.cards.filter(card => card.isFlipped).slice(cardIndex)
      }

      return []
    },

    getNextCardInColumn(colId: number, cardId: string): Card | null {
      let result = null

      for (const column of this.columns) {
        if (column.id !== colId) continue
        if (column.cards.length === 0) break

        const cardsIds = column.cards.map(card => card.id)
        const cardIndex = cardsIds.indexOf(cardId)
        const nextCard = column.cards[cardIndex + 1]

        if (!nextCard) break

        result = nextCard
      }

      return result
    },

    getCardIndexInColumn(colId: number, cardId: string): number | null {
      for (const column of this.columns) {
        if (column.id !== colId) continue
        if (column.cards.length === 0) break

        const cardsIds = column.cards.map(card => card.id)

        return cardsIds.indexOf(cardId)
      }

      return null
    },

    getCardIndexInColumnFlipped(colId: number, cardId: string): number | null {
      for (const column of this.columns) {
        if (column.id !== colId) continue

        const flippedCards = column.cards.filter(card => card.isFlipped)

        if (flippedCards.length === 0) break

        const cardsIds = flippedCards.map(card => card.id)

        return cardsIds.indexOf(cardId)
      }

      return null
    },

    isDropToBaseAvailable(baseId: number, card: Card): boolean {
      if (card.column) {
        const column = this.columns.find(col => col.id === card.column)

        const isCardFirstFlippedInColumn = this._isCardFirstFlippedInColumn(
          card.column,
          card.id
        )

        const isCardLastFlippedInColumn = this._isCardLastFlippedInColumn(
          card.column,
          card.id
        )

        if (
          column &&
          column.cards.filter(card => card.isFlipped).length > 1 &&
          isCardFirstFlippedInColumn
        ) {
          return false
        }

        if (!isCardLastFlippedInColumn) {
          return false
        }
      }

      for (const base of this.bases) {
        if (base.id !== baseId) continue

        if (base.isEmpty) {
          return card.rank === Rank.ACE
        }

        const upperCard = base.getUpperCard()
        const isRankAvailable = upperCard.rank + 1 === card.rank
        const isSuitAvailable = upperCard.suit === card.suit

        return isRankAvailable && isSuitAvailable
      }

      return false
    },

    isDropToColumnAvailable(columnId: number, card: Card): boolean {
      for (const column of this.columns) {
        if (column.id !== columnId) continue

        // Если пустой
        if (column.isEmpty) {
          return card.rank === Rank.KING
        }

        // Если не пустой
        const upperCard = column.getUpperCard()
        const isRankAvailable = upperCard.rank - 1 === card.rank
        const isColorAvailable = upperCard.color !== card.color

        return isColorAvailable && isRankAvailable
      }

      return false
    },

    makeMove(): void {
      this.movesCount += 1
      this._checkGameState()
    },

    makeManyMoves(movesCount: number): void {
      this.movesCount += movesCount
      this._checkGameState()
    },

    _checkGameState(): void {
      const isVictory = !this.bases
        .map(base => base.maxRank === Rank.KING)
        .includes(false)

      if (!isVictory) return

      this.isVictory = true
      this._updateSessionRecord()
      this._updatePersonalRecord()
      this._playVictorySound()

      for (const card of this.cards) {
        Object.freeze(card)
      }
    },

    _playVictorySound(): void {
      const victoryAudio = new Audio(victorySound)
      victoryAudio.play()
    },

    _updateSessionRecord(): void {
      if (!this.sessionRecord || this.sessionRecord > this.movesCount) {
        this._setSessionRecord()
      }
    },

    _setSessionRecord(): void {
      this.sessionRecord = this.movesCount
      sessionStorageHandler.set(RECORD_FIELD_NAME, this.sessionRecord)
    },

    _updatePersonalRecord(): void {
      if (!this.personalRecord || this.personalRecord > this.movesCount) {
        this._setPersonalRecord()
      }
    },

    _setPersonalRecord(): void {
      this.personalRecord = this.movesCount
      localStorageHandler.set(RECORD_FIELD_NAME, this.personalRecord)
    }
  }
})
