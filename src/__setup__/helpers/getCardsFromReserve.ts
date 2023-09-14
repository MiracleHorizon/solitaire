import { Rank, Suit } from '@app-types/card'
import type { Card } from '@entities/Card.ts'
import type { Solitaire } from '@entities/Solitaire.ts'

export const getCardsFromReserve = (solitaire: Solitaire) => {
  solitaire.moveAllCardsToReserve()

  const spadesAce = solitaire.reserve.find(
    card => card.rank === Rank.ACE && card.suit === Suit.SPADES
  ) as Card
  const spadesDeuce = solitaire.reserve.find(
    card => card.rank === Rank.DEUCE && card.suit === Suit.SPADES
  ) as Card
  const diamondsAce = solitaire.reserve.find(
    card => card.rank === Rank.ACE && card.suit === Suit.DIAMONDS
  ) as Card
  const diamondsKing = solitaire.reserve.find(
    card => card.rank === Rank.KING && card.suit === Suit.DIAMONDS
  ) as Card

  return {
    spadesAce,
    spadesDeuce,
    diamondsAce,
    diamondsKing
  }
}
