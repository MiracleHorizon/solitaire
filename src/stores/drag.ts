import { defineStore } from 'pinia'

import type { Card } from '@entities/Card'

interface State {
  card: Card | null
  baseId: number | null
  columnId: number | null
  initialCardX: number
  initialCardY: number
  initialCursorX: number
  initialCursorY: number
  moveOffsetX: number
  moveOffsetY: number
}

export const BASE_POSITION_VALUE = 0

export const useDragStore = defineStore('drag', {
  state: (): State => ({
    card: null,
    baseId: null,
    columnId: null,
    moveOffsetX: BASE_POSITION_VALUE,
    moveOffsetY: BASE_POSITION_VALUE,
    initialCardX: BASE_POSITION_VALUE,
    initialCardY: BASE_POSITION_VALUE,
    initialCursorX: BASE_POSITION_VALUE,
    initialCursorY: BASE_POSITION_VALUE
  }),

  actions: {
    setInitialCardCoords(x: number, y: number): void {
      this.initialCardX = x > 0 ? x : BASE_POSITION_VALUE
      this.initialCardY = y > 0 ? y : BASE_POSITION_VALUE
    },
    setInitialCursorCoords(x: number, y: number): void {
      this.initialCursorX = x > 0 ? x : BASE_POSITION_VALUE
      this.initialCursorY = y > 0 ? y : BASE_POSITION_VALUE
    },
    setMoveOffset(x: number, y: number): void {
      this.moveOffsetX = x > 0 ? x : BASE_POSITION_VALUE
      this.moveOffsetY = y > 0 ? y : BASE_POSITION_VALUE
    },

    setColumnId(columnId: number): void {
      if (columnId < 0) {
        return this.resetColumnId()
      }
      this.columnId = columnId
    },
    resetColumnId(): void {
      this.columnId = null
    },

    setBaseId(baseId: number): void {
      if (baseId < 0) {
        return this.resetBaseId()
      }
      this.baseId = baseId
    },
    resetBaseId(): void {
      this.baseId = null
    },

    setCard(card: Card): void {
      this.card = card
    },
    isCardDragging(cardId: string): boolean {
      return this.card?.id === cardId
    }
  }
})
