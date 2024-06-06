import { v4 } from 'uuid'

import { Card } from './Card'
import { cardsStatic } from '@shared/cards'
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
    // TODO: BaseCard
    return new Card({
      id: v4(),
      wasDealt: false,
      isFlipped: false,
      base: null,
      column: null,
      ...cardBase
    })
  }
}
