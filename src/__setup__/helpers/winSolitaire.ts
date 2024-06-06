import { Suit } from '@app-types/card'
import type { Solitaire } from '@entities/Solitaire'

export const winSolitaire = (solitaire: Solitaire): void => {
  solitaire.moveAllCardsToReserve()

  const spades = solitaire.cards.filter(card => card.suit === Suit.SPADES)
  const clubs = solitaire.cards.filter(card => card.suit === Suit.CLUBS)
  const diamonds = solitaire.cards.filter(card => card.suit === Suit.DIAMONDS)
  const hearts = solitaire.cards.filter(card => card.suit === Suit.HEARTS)

  const cards = [spades, clubs, diamonds, hearts].map(cardsSet =>
    cardsSet.sort((a, b) => a.rank - b.rank)
  )

  for (let i = 0; i < solitaire.bases.length; i++) {
    const base = solitaire.bases[i]
    const cardsForBase = cards[i]

    for (let j = 0; j < cardsForBase.length; j++) {
      base.addCard(cardsForBase[j])
    }
  }
}
