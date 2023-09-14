import { afterEach, describe, expect, it } from '@jest/globals'

import { Solitaire } from '@entities/Solitaire.ts'
import { winSolitaire } from '__setup__/helpers/winSolitaire.ts'

describe('Solitaire.ts (root)', () => {
  const solitaire = new Solitaire()

  afterEach(() => {
    solitaire.moveAllCardsToReserve()
  })

  it('should return the correct length of all entities', () => {
    const TOTAL_BASES = 4
    const TOTAL_COLUMNS = 7
    const TOTAL_CARDS = 52

    expect(solitaire.bases.length).toBe(TOTAL_BASES)
    expect(solitaire.columns.length).toBe(TOTAL_COLUMNS)
    expect(solitaire.cards.length).toBe(TOTAL_CARDS)

    const cardsInColumns = solitaire.columns
      .map(column => column.cards.length)
      .reduce((acc, value) => acc + value, 0)
    expect(solitaire.reserve.length).toBe(TOTAL_CARDS - cardsInColumns)

    solitaire.moveAllCardsToReserve()
    expect(solitaire.reserve.length).toBe(TOTAL_CARDS)
  })

  it('should check if the player has won', () => {
    expect(solitaire.checkVictory()).toBeFalsy()
    winSolitaire(solitaire)
    expect(solitaire.checkVictory()).toBeTruthy()
  })
})
