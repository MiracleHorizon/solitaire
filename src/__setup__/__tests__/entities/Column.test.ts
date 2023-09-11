import { describe, expect, it, beforeAll } from '@jest/globals'

import { Column } from '@entities/Column.ts'
import { getMockCards } from '__setup__/helpers/getMockCards.ts'

describe('Column.ts', () => {
  const column = new Column({
    id: 1,
    cards: []
  })
  const { spadesAce, spadesDeuce, diamondsKing } = getMockCards()

  beforeAll(() => {
    expect(column.isEmpty).toBeTruthy()
  })

  it('should add a card to the column', () => {
    let addCount = 0

    column.addCard(spadesDeuce)
    addCount += 1

    expect(column.isEmpty).toBeFalsy()
    expect(column.cards).toContainEqual(spadesDeuce)

    column.addCard(spadesAce)
    addCount += 1
    column.addCard(diamondsKing)
    addCount += 1

    expect(column.cards.length).toBe(addCount)
    expect(column.cards).toContainEqual(spadesAce)
    expect(column.cards).toContainEqual(diamondsKing)
  })

  it('should remove the card from the column', () => {
    expect(column.cards).toContainEqual(spadesAce)
    column.removeCard(spadesAce.id)
    expect(column.cards).not.toContainEqual(spadesAce)
  })

  it('should return the upper card of the column or null if there is none', () => {
    column.clearCards()

    expect(column.isEmpty).toBeTruthy()
    expect(column.getUpperCardOrNull()).toBeNull()

    column.addCard(diamondsKing)
    expect(column.getUpperCardOrNull()).toBeDefined()
    expect(column.getUpperCardOrNull()?.id).toBe(diamondsKing.id)

    column.addCard(spadesDeuce)
    expect(column.getUpperCardOrNull()).toBeDefined()
    expect(column.getUpperCardOrNull()?.id).not.toBe(diamondsKing.id)
    expect(column.getUpperCardOrNull()?.id).toBe(spadesDeuce.id)
  })

  it('should return there is a card with the specified identifier at the column', () => {
    column.clearCards()
    expect(column.isEmpty).toBeTruthy()

    column.addCard(diamondsKing)
    expect(column.isHasCardWithId(diamondsKing.id)).toBeTruthy()

    column.addCard(spadesDeuce)
    expect(column.isHasCardWithId(spadesDeuce.id)).toBeTruthy()

    column.removeCard(spadesDeuce.id)
    expect(column.isHasCardWithId(spadesDeuce.id)).toBeFalsy()
  })
})
