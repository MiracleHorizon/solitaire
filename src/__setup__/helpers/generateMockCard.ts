import { v4 } from 'uuid'

import { Card } from '@entities/Card.ts'
import { Color, Rank, Suit } from '@app-types/card'

interface Arguments extends DynamicFields {
  rank?: Rank
  suit?: Suit
}

interface DynamicFields {
  wasDealt?: boolean
  isFlipped?: boolean
  column?: number | null
  base?: number | null
}

export const generateMockCard = (args?: Arguments): Card =>
  new Card({
    id: v4(),
    wasDealt: false,
    isFlipped: false,
    base: null,
    column: null,
    rank: Rank.ACE,
    suit: Suit.SPADES,
    color: Color.RED,
    ...args
  })
