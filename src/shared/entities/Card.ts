import { Color, type ICard, Rank, Suit } from '@app-types/card'

export class Card implements ICard {
  public readonly id: string
  public readonly suit: Suit
  public readonly rank: Rank
  public readonly color: Color
  public readonly image: string
  public column: number | null
  public foundation: number | null
  public wasDealt: boolean
  public isFlipped: boolean

  constructor({
    id,
    suit,
    rank,
    color,
    image,
    wasDealt,
    isFlipped,
    foundation,
    column
  }: ICard) {
    this.id = id
    this.suit = suit
    this.rank = rank
    this.color = color
    this.image = image
    this.wasDealt = wasDealt
    this.isFlipped = isFlipped
    this.foundation = foundation
    this.column = column
  }

  public get inColumn(): boolean {
    return this.column !== null
  }

  public get inFoundation(): boolean {
    return this.foundation !== null
  }

  public setColumn(column: number | null): void {
    this.column = column
  }

  public setFoundation(foundation: number | null): void {
    this.foundation = foundation
  }

  public deal(): void {
    this.wasDealt = true
  }

  public flip(): void {
    this.isFlipped = !this.isFlipped
  }
}
