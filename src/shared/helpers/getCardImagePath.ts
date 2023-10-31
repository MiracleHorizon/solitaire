import { Rank, type Suit } from '@app-types/card'
import type { GameCardStyle } from '@stores/interface.ts'

export const PUBLIC_IMAGES_PATH = '/images/cards'

export const getCardImagePath = (
  suit: Suit,
  rank: Rank,
  styleVariant: GameCardStyle
): string => {
  const rankPathEntry = Object.entries(Rank)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => [key.toLowerCase(), value])
    .find(([, value]) => value === rank)

  const basePath = `${PUBLIC_IMAGES_PATH}/${suit}/${suit}_${rankPathEntry![0]}`

  return `${basePath}_v${styleVariant}.png`.toLowerCase()
}
