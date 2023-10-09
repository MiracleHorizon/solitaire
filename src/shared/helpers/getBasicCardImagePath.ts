import { Rank, Suit } from '@app-types/card'

export const IMAGES_PATH = '/src/assets/images/cards'
export const getBasicCardImagePath = (suit: Suit, rank: Rank): string => {
  const rankPathEntry = Object.entries(Rank)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => [key.toLowerCase(), value])
    .find(([, value]) => value === rank)

  return `${IMAGES_PATH}/${suit}/${suit}_${rankPathEntry![0]}`
}
