import { defineStore } from 'pinia'

import { Board } from '@entities/Board.ts'
import type { Card } from '@entities/Card.ts'
import type { Column } from '@entities/Column.ts'
import type { Foundation } from '@entities/Foundation.ts'

export const useGameStore = defineStore('game', {
  state: () => ({
    board: new Board(),
    movesCount: 0
  }),

  getters: {
    columns: state => state.board.columns as Column[],
    foundations: state => state.board.foundations as Foundation[],
    undealtCards: state => state.board.undealtCards as Card[]
  },

  actions: {
    addCardToFoundation(foundationId: number, cardId: string): void {
      this.board.addCardToFoundation(foundationId, cardId)
      this.makeMove()
    },

    addOneCardToColumn(columnId: number, cardId: string): void {
      this.board.addOneCardToColumn(columnId, cardId)
      this.makeMove()
    },

    addManyCardsToColumn(columnId: number, cardsIds: string[]) {
      this.board.addManyCardsToColumn(columnId, cardsIds)
      this.makeMove()
    },

    makeMove(): void {
      this.movesCount += 1
    },

    makeManyMoves(movesCount: number): void {
      this.movesCount += movesCount
    }
  }
})
