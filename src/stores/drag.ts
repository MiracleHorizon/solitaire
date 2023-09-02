import { defineStore } from 'pinia'

import type { Card } from '@entities/Card.ts'

interface State {
  card: Card | null
  columnId: number | null
  baseId: number | null
  offsetX: number
  offsetY: number
}

export const useDragStore = defineStore('drag', {
  state: (): State => ({
    card: null,
    columnId: null,
    baseId: null,
    offsetY: 0,
    offsetX: 0
  }),

  actions: {
    setOffset(x: number, y: number): void {
      this.offsetX = x
      this.offsetY = y
    },
    resetOffset(): void {
      this.offsetX = 0
      this.offsetY = 0
    },

    setCard(card: Card): void {
      this.card = card
    },
    resetCard(): void {
      this.card = null
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
    }
  }
})
