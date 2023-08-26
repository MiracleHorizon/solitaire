import { v4 } from 'uuid'

import { Card } from './Card.ts'
import { Shuffler } from '@utils/Shuffler.ts'
import { cardsStatic } from '@static/cards.ts'
import type { ICardBase } from '@app-types/card'

export class Deck {
  private readonly shuffler: Shuffler = new Shuffler()
  public cards: Card[] = []

  constructor() {
    this.create()
    this.shuffle()
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
      foundation: null,
      column: null,
      ...cardBase
    })
  }

  private shuffle(): void {
    this.cards = this.shuffler.shuffle(this.cards)
  }
}
