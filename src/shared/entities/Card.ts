import { Color, type ICard, Rank, Suit } from '@app-types/card'

export class Card implements ICard {
  public readonly id: string
  public readonly suit: Suit
  public readonly rank: Rank
  public readonly color: Color
  public readonly image: string
  public column: number | null
  public foundation: number | null
  public isFolded: boolean
  public isFlipped: boolean

  constructor({
    id,
    suit,
    rank,
    color,
    image,
    isFolded,
    isFlipped,
    foundation,
    column
  }: ICard) {
    this.id = id
    this.suit = suit
    this.rank = rank
    this.color = color
    this.image = image
    this.isFolded = isFolded
    this.isFlipped = isFlipped
    this.foundation = foundation
    this.column = column
  }

  public setColumn(column: number | null): void {
    this.column = column
  }

  public setFoundation(foundation: number | null): void {
    this.foundation = foundation
  }

  public fold(): void {
    this.isFolded = !this.isFlipped
  }

  public flip(): void {
    this.isFlipped = !this.isFlipped
  }
}
