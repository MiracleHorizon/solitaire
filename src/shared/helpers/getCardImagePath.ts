import { getBasicCardImagePath } from '@helpers/getBasicCardImagePath.ts'
import type { GameCardStyle } from '@stores/interface.ts'
import type { Rank, Suit } from '@app-types/card'

export const getCardImagePath = (
  suit: Suit,
  rank: Rank,
  style: GameCardStyle
): string => {
  const basePath = getBasicCardImagePath(suit, rank)

  return `${basePath}_v${style}.png`
}
