import { describe, expect, it } from '@jest/globals'

import { Base } from '@entities/Base'
import { generateMockCards } from '__setup__/helpers/generateMockCards'

describe('shared/entities/Base', () => {
  const base = new Base(3)
  const { spadesAce, spadesDeuce, diamondsKing } = generateMockCards()

  it('should add a card to the base', () => {
    expect(base.suit).toBeNull()
    expect(base.maxRank).toBeNull()
    expect(base.isEmpty).toBeTruthy()

    base.addCard(spadesAce)
    expect(base.suit).toBe(spadesAce.suit)
    expect(base.maxRank).toBe(spadesAce.rank)
    expect(base.cards).toContainEqual(spadesAce)
    expect(base.isEmpty).toBeFalsy()

    const currentSuit = base.suit
    const currentMaxRank = base.maxRank

    /**
     * There is an attempt to add a card with a different suit.
     */
    base.addCard(diamondsKing)
    expect(base.suit).toBe(currentSuit)
    expect(base.maxRank).toBe(currentMaxRank)
    expect(base.cards.length).toBe(1)
    expect(base.cards).not.toContainEqual(diamondsKing)

    base.addCard(spadesDeuce)
    expect(base.maxRank).toBe(spadesDeuce.rank)
    expect(base.cards.length).toBe(2)
    expect(base.cards).toContainEqual(spadesAce)
    expect(base.cards).toContainEqual(spadesDeuce)
  })

  it('should remove the card from the base', () => {
    base.removeCard(spadesAce.id)
    expect(base.cards).not.toContainEqual(spadesAce)
    expect(base.cards).toContainEqual(spadesDeuce)

    base.removeCard(spadesDeuce.id)
    expect(base.suit).toBeNull()
    expect(base.maxRank).toBeNull()
    expect(base.isEmpty).toBeTruthy()
  })

  it('should return the upper card of the base or null if there is none', () => {
    base.clearCards()
    expect(base.getUpperCardOrNull()).toBeNull()

    base.addCard(spadesAce)
    expect(base.getUpperCardOrNull()).toBeDefined()
    expect(base.getUpperCardOrNull()?.id).toBe(spadesAce.id)
  })

  it('should return there is a card with the specified identifier at the base', () => {
    expect(base.isEmpty).toBeFalsy()
    expect(base.isHasCardWithId(spadesAce.id)).toBeTruthy()
    expect(base.isHasCardWithId(diamondsKing.id)).toBeFalsy()
  })
})
