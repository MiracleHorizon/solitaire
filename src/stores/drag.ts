import { defineStore } from 'pinia'

import type { Card } from '@entities/Card.ts'

interface State {
  card: Card | null
  columnId: number | null
  baseId: number | null
  moveOffsetX: number
  moveOffsetY: number
  initialCardX: number
  initialCardY: number
  initialCursorX: number
  initialCursorY: number
}

export const useDragStore = defineStore('drag', {
  state: (): State => ({
    card: null,
    columnId: null,
    baseId: null,
    moveOffsetX: 0,
    moveOffsetY: 0,
    initialCardX: 0,
    initialCardY: 0,
    initialCursorX: 0,
    initialCursorY: 0
  }),

  actions: {
    setMoveOffset(x: number, y: number): void {
      this.moveOffsetX = x
      this.moveOffsetY = y
    },
    setInitialCoords(x: number, y: number): void {
      this.initialCardX = x
      this.initialCardY = y
    },
    setInitialCursorCoords(x: number, y: number): void {
      this.initialCursorX = x
      this.initialCursorY = y
    },
    setCard(card: Card): void {
      this.card = card
    },

    setColumnId(id: number): void {
      this.columnId = id
    },
    resetColumnId(): void {
      this.columnId = null
    },

    setBaseId(id: number): void {
      this.baseId = id
    },
    resetBaseId(): void {
      this.baseId = null
    },

    isCardDragging(cardId: string): boolean {
      return this.card?.id === cardId
    }
  }
})
