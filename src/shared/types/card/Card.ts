import { Rank } from './Rank.ts'
import { Suit } from './Suit.ts'
import { Color } from './Color.ts'

export interface ICard {
  id: string
  rank: Rank
  suit: Suit
  color: Color
  image: string
  isFolded: boolean
  isFlipped: boolean
}
