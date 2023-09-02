import { Color, type ICardBase, Rank, Suit } from '@app-types/card'

interface ICard extends ICardBase {
  id: string
  wasDealt: boolean
  isFlipped: boolean
  column: number | null
  base: number | null
}

export class Card implements ICard {
  public readonly id: string
  public readonly suit: Suit
  public readonly rank: Rank
  public readonly color: Color
  public readonly image: string
  public column: number | null
  public base: number | null
  public wasDealt: boolean
  public isFlipped: boolean

  public get inColumn(): boolean {
    return this.column !== null
  }

  public get inBase(): boolean {
    return this.base !== null
  }

  constructor({
    id,
    suit,
    rank,
    color,
    image,
    wasDealt,
    isFlipped,
    base,
    column
  }: ICard) {
    this.id = id
    this.suit = suit
    this.rank = rank
    this.color = color
    this.image = image
    this.wasDealt = wasDealt
    this.isFlipped = isFlipped
    this.base = base
    this.column = column
  }

  public setColumn(column: number | null): void {
    this.column = column
    this.base = null
  }

  public setBase(base: number | null): void {
    this.base = base
    this.column = null
  }

  public deal(): void {
    this.wasDealt = true
  }

  public flip(): void {
    this.isFlipped = !this.isFlipped
  }
}
