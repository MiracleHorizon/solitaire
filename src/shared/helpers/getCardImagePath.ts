import { Rank, type Suit } from '@app-types/card'
import { IMAGES_ASSETS_PATH, pathForAssets } from '@site/config'
import type { GameCardStyle } from '@stores/interface'

interface Parameters {
  suit: Suit
  rank: Rank
  styleVariant: GameCardStyle
}

export const getCardImagePath = ({
  suit,
  rank,
  styleVariant
}: Parameters): string => {
  const rankPathEntry = Object.entries(Rank)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => [key.toLowerCase(), value])
    .find(([, value]) => value === rank)

  const imagesPath = pathForAssets(IMAGES_ASSETS_PATH)
  const cardPath = `${suit}/${suit}_${rankPathEntry![0]}`
  const variantPath = `v${styleVariant}`
  const imageType = 'png'

  return `${imagesPath}/${cardPath}_${variantPath}.${imageType}`.toLowerCase()
}
