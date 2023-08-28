import { Color, type ICardBase, Rank, Suit } from '@app-types/card'

interface ICard extends ICardBase {
  id: string
  wasDealt: boolean
  isFlipped: boolean
  column: number | null
  basis: number | null
}

export class Card implements ICard {
  public readonly id: string
  public readonly suit: Suit
  public readonly rank: Rank
  public readonly color: Color
  public readonly image: string
  public column: number | null
  public basis: number | null
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
    basis,
    column
  }: ICard) {
    this.id = id
    this.suit = suit
    this.rank = rank
    this.color = color
    this.image = image
    this.wasDealt = wasDealt
    this.isFlipped = isFlipped
    this.basis = basis
    this.column = column
  }

  public get inColumn(): boolean {
    return this.column !== null
  }

  public get inBasis(): boolean {
    return this.basis !== null
  }

  public setColumn(column: number | null): void {
    this.column = column
    this.basis = null
  }

  public setBasis(basis: number | null): void {
    this.basis = basis
    this.column = null
  }

  public deal(): void {
    this.wasDealt = true
  }

  public flip(): void {
    this.isFlipped = !this.isFlipped
  }
}
