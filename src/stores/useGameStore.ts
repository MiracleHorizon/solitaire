import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    movesCount: 0
  }),

  actions: {
    makeMove(): void {
      this.movesCount += 1
    }
  }
})
