import { Rank, Suit } from '@app-types/card'

export const PUBLIC_IMAGES_PATH = '/images/cards'

export const getBasicCardImagePath = (suit: Suit, rank: Rank): string => {
  const rankPathEntry = Object.entries(Rank)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => [key.toLowerCase(), value])
    .find(([, value]) => value === rank)

  return `${PUBLIC_IMAGES_PATH}/${suit}/${suit}_${rankPathEntry![0]}`
}
