import { describe, expect, it } from '@jest/globals'

import { generateMockCard } from '__setup__/helpers/generateMockCard.ts'

describe('Card.ts', () => {
  it('should set the card column and reset card base', () => {
    const card = generateMockCard({
      base: 3
    })
    const columnId = 1

    expect(card.onBase).toBeTruthy()
    expect(card.inColumn).toBeFalsy()

    card.setColumn(columnId)
    expect(card.inColumn).toBeTruthy()
    expect(card.onBase).toBeFalsy()
    expect(card.base).toBeNull()
    expect(card.column).toBe(columnId)
  })

  it('should set the card base and reset card column', () => {
    const card = generateMockCard({
      column: 6
    })
    const baseId = 3

    expect(card.inColumn).toBeTruthy()
    expect(card.onBase).toBeFalsy()

    card.setBase(baseId)
    expect(card.onBase).toBeTruthy()
    expect(card.inColumn).toBeFalsy()
    expect(card.column).toBeNull()
    expect(card.base).toBe(baseId)
  })

  it('should return is card on the base', () => {
    const card = generateMockCard()
    expect(card.onBase).toBeFalsy()

    card.setBase(3)
    expect(card.onBase).toBeTruthy()
  })

  it('should return is card in the column', () => {
    const card = generateMockCard()
    expect(card.inColumn).toBeFalsy()

    card.setColumn(4)
    expect(card.inColumn).toBeTruthy()

    card.setColumn(0)
    expect(card.inColumn).toBeTruthy()
  })

  it('should toggle is card flipped and return field value', () => {
    const card = generateMockCard({
      isFlipped: true
    })
    expect(card.isFlipped).toBeTruthy()

    card.flip()
    expect(card.isFlipped).toBeFalsy()

    card.flip()
    expect(card.isFlipped).toBeTruthy()
  })

  it('should deal card and return field value', () => {
    const card = generateMockCard()
    expect(card.wasDealt).toBeFalsy()

    card.deal()
    expect(card.wasDealt).toBeTruthy()
  })
})
