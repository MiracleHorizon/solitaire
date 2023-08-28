import { v4 } from 'uuid'

import { Card } from './Card.ts'
import { cardsStatic } from '@static/cards.ts'
import type { ICardBase } from '@app-types/card'

export class Deck {
  public cards: Card[] = []

  constructor() {
    this.create()
  }

  private create(): void {
    this.cards = cardsStatic
      .map(cardsList => cardsList.map(this.createCard))
      .reduce((acc, cardsList) => acc.concat(cardsList), [])
  }

  private createCard(cardBase: ICardBase): Card {
    return new Card({
      id: v4(),
      wasDealt: false,
      isFlipped: false,
      basis: null,
      column: null,
      ...cardBase
    })
  }
}
