import { defineStore } from 'pinia'

import { LocalStorageHandler } from '@utils/storages/LocalStorageHandler.ts'
import { SessionStorageHandler } from '@utils/storages/SessionStorageHandler.ts'
import { RECORD_FIELD_NAME } from '@shared/constants/storages.ts'
import victorySound from '@public/audio/victory.mp3'

import { Board } from '@entities/Board.ts'
import type { Card } from '@entities/Card.ts'
import type { Column } from '@entities/Column.ts'
import type { Basis } from '@entities/Basis.ts'
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
    bases: state => state.board.bases as Basis[],
    cardsReserve: state => state.board.cardsReserve as Card[]
  },

  actions: {
    addCardToBasis(basisId: number, cardId: string): void {
      this.board.addCardToBasis(basisId, cardId)
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

    isDropToBasisAvailable(basisId: number, card: Card): boolean {
      for (const basis of this.bases) {
        if (basis.id !== basisId) continue

        const upperCard = basis.tryToGetLastCard()

        if (!upperCard) {
          return card.rank === Rank.ACE
        }

        const isRankAvailable = upperCard.rank + 1 === card.rank
        const isSuitAvailable = upperCard.suit === card.suit

        return isRankAvailable && isSuitAvailable
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
        .map(basis => basis.maxRank === Rank.KING)
        .includes(false)

      if (!isVictory) return

      this.isVictory = true
      this._updateSessionRecord()
      this._updatePersonalRecord()
      this._playVictorySound()
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