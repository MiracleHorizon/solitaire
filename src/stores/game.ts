import { defineStore } from 'pinia'

import { sessionStorageProvider } from '@utils/storages/SessionStorageProvider'
import { localStorageProvider } from '@utils/storages/LocalStorageProvider'
import { RECORD_KEY } from '@shared/constants/storages'

import { Solitaire } from '@entities/Solitaire'
import type { Card } from '@entities/Card'
import type { Column } from '@entities/Column'
import type { Base } from '@entities/Base'

interface State {
  solitaire: Solitaire
  movesCount: number
  sessionRecord: number | null
  personalRecord: number | null
  isVictory: boolean
}

const getInitialState = (): State => {
  const sessionRecordItem = sessionStorageProvider.get(RECORD_KEY)
  const personalRecordItem = localStorageProvider.get(RECORD_KEY)

  return {
    solitaire: new Solitaire(),
    movesCount: 0,
    sessionRecord: sessionRecordItem ? Number(sessionRecordItem) : null,
    personalRecord: personalRecordItem ? Number(personalRecordItem) : null,
    isVictory: false
  }
}

/**
 * Private actions are marked with an underscore ( _ )
 */
export const useGameStore = defineStore('game', {
  state: (): State => getInitialState(),

  getters: {
    bases: state => state.solitaire.bases as Base[],
    columns: state => state.solitaire.columns as Column[],
    reserve: state => state.solitaire.reserve as Card[],
    cards: state => state.solitaire.cards as Card[]
  },

  actions: {
    addCardToBase(baseId: number, card: Card): void {
      this.solitaire.addCardToBase(baseId, card)
      this._makeOneMove()
    },

    addCardsToColumn(columnId: number, card: Card): void {
      this.solitaire.addCardsToColumn(columnId, card)
      this._makeOneMove()
    },

    isDropToBaseAvailable(baseId: number, card: Card): boolean {
      return this.solitaire.isDropToBaseAvailable(baseId, card)
    },

    isDropToColumnAvailable(columnId: number, card: Card): boolean {
      return this.solitaire.isDropToColumnAvailable(columnId, card)
    },

    flipCard(cardId: string): void {
      for (const card of this.cards) {
        if (card.id !== cardId || card.isFlipped) continue

        card.flip()
        this._makeOneMove()

        break
      }
    },

    flipReserve(): void {
      for (const card of this.reserve) {
        if (card.isFlipped) card.flip()
      }
      this._makeManyMoves(this.reserve.length)
    },

    _makeOneMove(): void {
      this.movesCount += 1
      this._checkGameState()
    },

    _makeManyMoves(movesCount: number): void {
      this.movesCount += movesCount
      this._checkGameState()
    },

    _checkGameState(): void {
      const isVictory = this.solitaire.checkVictory()

      if (!isVictory) return

      this.isVictory = true
      this._updateSessionRecord()
      this._updatePersonalRecord()
    },

    _updateSessionRecord(): void {
      if (!this.sessionRecord || this.sessionRecord > this.movesCount) {
        this._setSessionRecord()
      }
    },

    _setSessionRecord(): void {
      this.sessionRecord = this.movesCount
      sessionStorageProvider.set(RECORD_KEY, this.sessionRecord)
    },

    _updatePersonalRecord(): void {
      if (!this.personalRecord || this.personalRecord > this.movesCount) {
        this._setPersonalRecord()
      }
    },

    _setPersonalRecord(): void {
      this.personalRecord = this.movesCount
      localStorageProvider.set(RECORD_KEY, this.personalRecord)
    }
  }
})
