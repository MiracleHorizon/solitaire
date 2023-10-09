import { describe, expect, it } from '@jest/globals'

import { generateMockCards } from '__setup__/helpers/generateMockCards.ts'
import {
  getBasicCardImagePath,
  IMAGES_PATH
} from '@helpers/getBasicCardImagePath.ts'

describe('getBasicCardImagePath.ts', () => {
  it('should return the base path to the game card image based on rank and suit', () => {
    const { diamondsKing, spadesAce, spadesDeuce } = generateMockCards()

    expect(getBasicCardImagePath(diamondsKing.suit, diamondsKing.rank)).toBe(
      `${IMAGES_PATH}/diamonds/diamonds_king`
    )
    expect(getBasicCardImagePath(spadesAce.suit, spadesAce.rank)).toBe(
      `${IMAGES_PATH}/spades/spades_ace`
    )
    expect(getBasicCardImagePath(spadesDeuce.suit, spadesDeuce.rank)).toBe(
      `${IMAGES_PATH}/spades/spades_deuce`
    )
  })
})
