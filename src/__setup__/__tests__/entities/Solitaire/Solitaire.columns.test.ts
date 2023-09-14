import { beforeEach, describe, expect, it } from '@jest/globals'

import { Solitaire } from '@entities/Solitaire.ts'
import { getCardsFromReserve } from '__setup__/helpers/getCardsFromReserve.ts'

describe('Solitaire.ts (columns)', () => {
  const solitaire = new Solitaire()

  beforeEach(() => {
    solitaire.moveAllCardsToReserve()
  })

  it('should move one card from the reserve to the empty column', () => {
    const { spadesDeuce: card } = getCardsFromReserve(solitaire)
    const column = solitaire.columns[0]

    solitaire.addCardsToColumn(column.id, card)
    expect(column.cards).toContainEqual(card)
    expect(card.column).toBe(column.id)
  })

  it('should move one card to one column from another', () => {
    const { diamondsKing: card } = getCardsFromReserve(solitaire)
    const columnFrom = solitaire.columns[0]
    const columnTo = solitaire.columns[1]

    solitaire.board.addOneCardToColumn(columnFrom.id, card.id)
    expect(columnFrom.cards).toContainEqual(card)
    expect(card.column).toBe(columnFrom.id)

    solitaire.addCardsToColumn(columnTo.id, card)
    expect(columnTo.cards).toContainEqual(card)
    expect(card.column).toBe(columnTo.id)
    expect(columnFrom.isEmpty).toBeTruthy()
  })

  it('should move multiple cards from one column to another', () => {
    const { spadesDeuce, diamondsAce } = getCardsFromReserve(solitaire)
    const columnFrom = solitaire.columns[0]
    const columnTo = solitaire.columns[1]

    solitaire.board.addManyCardsToColumn(columnFrom.id, [
      diamondsAce.id,
      spadesDeuce.id
    ])

    expect(columnFrom.isHasCardWithId(diamondsAce.id)).toBeTruthy()
    expect(diamondsAce.column).toBe(columnFrom.id)

    expect(columnFrom.isHasCardWithId(spadesDeuce.id)).toBeTruthy()
    expect(spadesDeuce.column).toBe(columnFrom.id)

    solitaire.addCardsToColumn(columnTo.id, spadesDeuce)
    expect(diamondsAce.column).toBe(columnTo.id)
    expect(spadesDeuce.column).toBe(columnTo.id)
    expect(columnTo.cards.length).toBe(2)
    expect(columnFrom.isEmpty).toBeTruthy()
  })

  it('should return if drop card from column to the base available', () => {
    const { spadesAce, spadesDeuce, diamondsAce } =
      getCardsFromReserve(solitaire)
    const base = solitaire.bases[0]
    const column = solitaire.columns[0]

    solitaire.addCardsToColumn(column.id, spadesAce)
    expect(column.cards).toContainEqual(spadesAce)
    expect(spadesAce.column).toBe(column.id)
    expect(solitaire.isDropToBaseAvailable(base.id, spadesAce)).toBeTruthy()

    solitaire.moveAllCardsToReserve()
    solitaire.addCardsToColumn(column.id, spadesDeuce)
    solitaire.addCardsToColumn(column.id, diamondsAce)
    expect(column.cards.length).toBe(2)
    expect(column.getUpperCardOrNull()).toBe(diamondsAce)

    expect(base.isEmpty).toBeTruthy()
    expect(solitaire.isDropToBaseAvailable(base.id, spadesDeuce)).toBeFalsy()
  })

  it('should return if drop card from reserve to the column available', () => {
    const { spadesAce, spadesDeuce, diamondsAce, diamondsKing } =
      getCardsFromReserve(solitaire)
    const column = solitaire.columns[0]

    expect(
      solitaire.isDropToColumnAvailable(column.id, diamondsKing)
    ).toBeTruthy()
    expect(
      solitaire.isDropToColumnAvailable(column.id, spadesDeuce)
    ).toBeFalsy()
    expect(
      solitaire.isDropToColumnAvailable(column.id, diamondsAce)
    ).toBeFalsy()
    expect(solitaire.isDropToColumnAvailable(column.id, spadesAce)).toBeFalsy()
  })

  it('should return if drop card to not empty column is available', () => {
    const { spadesDeuce, diamondsAce, diamondsKing, spadesAce } =
      getCardsFromReserve(solitaire)
    const column = solitaire.columns[0]

    solitaire.addCardsToColumn(column.id, spadesDeuce)
    expect(column.cards).toContainEqual(spadesDeuce)

    expect(
      solitaire.isDropToColumnAvailable(column.id, diamondsAce)
    ).toBeTruthy()
    expect(
      solitaire.isDropToColumnAvailable(column.id, diamondsKing)
    ).toBeFalsy()
    expect(solitaire.isDropToColumnAvailable(column.id, spadesAce)).toBeFalsy()
  })
})

describe('Solitaire.ts (work with card indexes)', () => {
  const solitaire = new Solitaire()
  const { spadesDeuce, diamondsAce, diamondsKing } =
    getCardsFromReserve(solitaire)
  const column = solitaire.columns[0]
  expect(column.isEmpty).toBeTruthy()

  solitaire.addCardsToColumn(column.id, spadesDeuce)
  solitaire.addCardsToColumn(column.id, diamondsAce)

  expect(column.cards.length).toBe(2)
  expect(column.cards[0]).toStrictEqual(spadesDeuce)
  expect(column.cards[1]).toStrictEqual(diamondsAce)

  it('should return the index of the card in the column', () => {
    expect(solitaire.getCardIndexInColumn(column.id, spadesDeuce.id)).toBe(0)
    expect(solitaire.getCardIndexInColumn(column.id, diamondsAce.id)).toBe(1)
    expect(solitaire.getCardIndexInColumn(column.id, diamondsKing.id)).toBe(-1)
  })

  it('should return the next card in the column', () => {
    expect(solitaire.getNextCardInColumn(column.id, diamondsAce.id)).toBeNull()
    expect(
      solitaire.getNextCardInColumn(column.id, spadesDeuce.id)
    ).toStrictEqual(diamondsAce)
  })
})
