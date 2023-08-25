import { defineStore } from 'pinia'

import type { Card } from '@entities/Card.ts'

interface State {
  card: Card | null
  cards: Card[]
  columnId: number | null
  foundationId: number | null
}

export const useDragStore = defineStore('drag', {
  state: (): State => ({
    card: null,
    cards: [],
    columnId: null,
    foundationId: null
  }),

  actions: {
    setCard(card: Card): void {
      this.card = card
    },
    resetCard(): void {
      this.card = null
    },

    setCards(cards: Card[]): void {
      this.cards = cards
    },
    resetCards(): void {
      this.cards.length = 0
    },

    setColumnId(id: number): void {
      this.columnId = id
    },

    resetColumnId(): void {
      this.columnId = null
    },

    setFoundationId(id: number): void {
      this.foundationId = id
    },
    resetFoundationId(): void {
      this.foundationId = null
    }
  }
})
