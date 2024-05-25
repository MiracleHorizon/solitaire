import { describe, expect, it } from '@jest/globals'

import { getCardImagePath } from '@helpers/getCardImagePath.ts'
import { generateMockCards } from '__setup__/helpers/generateMockCards.ts'
import { GameCardStyle } from '@stores/interface.ts'
import { Rank, Suit } from '@app-types/card'

const { spadesDeuce, spadesAce } = generateMockCards()

describe('getCardImagePath.ts', () => {
  it('should return the correct image path for a v1 style', () => {
    const { suit, rank } = spadesDeuce
    const styleVariant = GameCardStyle.V1

    const imagePath = getCardImagePath(suit, rank, styleVariant)
    const expectedPath = '/images/cards/spades/spades_deuce_v1.png'

    expect(imagePath).toBe(expectedPath)
  })

  it('should return the correct image path for another style variant', () => {
    const { suit, rank } = spadesAce
    const styleVariant = GameCardStyle.V2

    const imagePath = getCardImagePath(suit, rank, styleVariant)
    const expectedPath = '/images/cards/spades/spades_ace_v2.png'

    expect(imagePath).toBe(expectedPath)
  })

  it('should handle different case for suit correctly', () => {
    const suit = 'diAmOnds'
    const styleVariant = GameCardStyle.V3

    const imagePath = getCardImagePath(suit as Suit, Rank.SIX, styleVariant)
    const expectedPath = '/images/cards/diamonds/diamonds_six_v3.png'

    expect(imagePath).toBe(expectedPath)
  })
})
