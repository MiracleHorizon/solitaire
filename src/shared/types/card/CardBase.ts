import { Rank } from './Rank'
import { Suit } from './Suit'
import { Color } from './Color'

export interface ICardBase {
  rank: Rank
  suit: Suit
  color: Color
}
