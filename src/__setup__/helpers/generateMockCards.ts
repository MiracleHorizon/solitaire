import { generateMockCard } from './generateMockCard'
import { Rank, Suit } from '@app-types/card'

export const generateMockCards = () => {
  const spadesAce = generateMockCard({
    rank: Rank.ACE,
    suit: Suit.SPADES
  })
  const spadesDeuce = generateMockCard({
    rank: Rank.DEUCE,
    suit: Suit.SPADES
  })
  const diamondsKing = generateMockCard({
    rank: Rank.KING,
    suit: Suit.DIAMONDS
  })

  return {
    spadesAce,
    spadesDeuce,
    diamondsKing
  }
}
