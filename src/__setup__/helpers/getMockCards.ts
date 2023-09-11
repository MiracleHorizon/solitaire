import { generateCard } from './generateCard.ts'
import { Rank, Suit } from '@app-types/card'

export const getMockCards = () => {
  const spadesAce = generateCard({
    rank: Rank.ACE,
    suit: Suit.SPADES
  })
  const spadesDeuce = generateCard({
    rank: Rank.DEUCE,
    suit: Suit.SPADES
  })
  const diamondsKing = generateCard({
    rank: Rank.KING,
    suit: Suit.DIAMONDS
  })

  return {
    spadesAce,
    spadesDeuce,
    diamondsKing
  }
}
